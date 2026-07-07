import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import Code from "@/lib/models/Code";
import { SESSION_TYPES } from "@/lib/booking-config";
import { sendBookingConfirmation } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ZURICH = "Europe/Zurich";
const LOCALES = { fr: "fr-CH", en: "en-GB", de: "de-CH" };
const AT_WORD = { fr: "à", en: "at", de: "um" };

/** Verify Calendly's webhook signature header (if a signing key is set). */
function verifySignature(rawBody, header) {
  const key = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!key) return true; // not configured yet → skip (dev)
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=").map((s) => s.trim()))
  );
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) return false;
  const expected = crypto
    .createHmac("sha256", key)
    .update(`${t}.${rawBody}`)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
  } catch (e) {
    return false;
  }
}

/** ISO start time → { slotDate: "YYYY-MM-DD", slotHour, dateTime string } in Zurich. */
function localizeSlot(startIso, lang) {
  const start = new Date(startIso);
  const slotDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: ZURICH,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(start);
  const slotHour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: ZURICH,
      hour: "2-digit",
      hour12: false,
    }).format(start)
  );
  const locale = LOCALES[lang] || LOCALES.fr;
  const dstr = new Intl.DateTimeFormat(locale, {
    timeZone: ZURICH,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(start);
  const tstr = new Intl.DateTimeFormat(locale, {
    timeZone: ZURICH,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(start);
  return { slotDate, slotHour, dateTime: `${dstr} ${AT_WORD[lang] || "à"} ${tstr}` };
}

export async function POST(request) {
  // Shared-secret check: the callback URL registered with Calendly carries
  // ?token=... which only Calendly (and us) knows.
  const expectedToken = process.env.CALENDLY_WEBHOOK_TOKEN;
  if (expectedToken) {
    const token = new URL(request.url).searchParams.get("token");
    if (token !== expectedToken) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
  }

  const raw = await request.text();
  if (!verifySignature(raw, request.headers.get("calendly-webhook-signature"))) {
    return NextResponse.json({ error: "BAD_SIGNATURE" }, { status: 401 });
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch (e) {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  const eventType = body?.event;
  const payload = body?.payload || {};

  try {
    await connectDB();

    if (eventType === "invitee.created") {
      const bookingId = payload?.tracking?.utm_content || "";
      const startIso = payload?.scheduled_event?.start_time;
      const eventUri = payload?.scheduled_event?.uri || "";

      // Find the pending booking created by our form (linked via utm_content).
      let booking = null;
      if (bookingId && mongoose.isValidObjectId(bookingId)) {
        booking = await Booking.findById(bookingId);
      }
      // Fallback: if utm_content didn't come through, link the most recent
      // not-yet-scheduled booking for this email.
      if (!booking && payload?.email) {
        booking = await Booking.findOne({
          contactEmail: payload.email.trim().toLowerCase(),
          calendlyEventUri: "",
        }).sort({ createdAt: -1 });
      }

      const lang = booking?.lang || "fr";
      const slot = startIso ? localizeSlot(startIso, lang) : null;

      let remaining = null;
      let total = null;

      if (booking) {
        if (slot) {
          booking.slotDate = slot.slotDate;
          booking.slotHour = slot.slotHour;
        }
        booking.calendlyEventUri = eventUri;
        booking.calendlyStart = startIso ? new Date(startIso) : null;
        // The Calendly slot is now scheduled → the booking is confirmed,
        // regardless of payment method.
        booking.status = "confirmed";

        // Deduct one pack-code session NOW (the slot is actually booked).
        // Plain read-modify-write: easy to trace, runs schema validators,
        // and avoids any aggregation-pipeline-update edge cases.
        if (booking.paymentMethod === "code" && booking.code && !booking.codeConsumed) {
          const redeemer = booking.contactEmail || "";
          const codeDoc = await Code.findOne({ code: booking.code });
          if (
            codeDoc &&
            codeDoc.status === "active" &&
            codeDoc.usedSessions < codeDoc.totalSessions &&
            (!codeDoc.clientEmail || codeDoc.clientEmail === redeemer)
          ) {
            if (!codeDoc.clientEmail) codeDoc.clientEmail = redeemer;
            codeDoc.usedSessions = codeDoc.usedSessions + 1;
            codeDoc.remaining = Math.max(
              0,
              codeDoc.totalSessions - codeDoc.usedSessions
            );
            await codeDoc.save();

            booking.codeConsumed = true;
            booking.status = "confirmed";
            remaining = codeDoc.remaining;
            total = codeDoc.totalSessions;
          }
        }
        await booking.save();
      } else {
        // Direct Calendly booking (not started from our form) — create a record.
        const fullName = (payload?.name || "").trim();
        const parts = fullName.split(/\s+/).filter(Boolean);
        booking = await Booking.create({
          sessionType: "solo",
          participants: [
            {
              firstName: payload?.first_name || parts[0] || fullName || "—",
              lastName: payload?.last_name || parts.slice(1).join(" ") || "",
              email: payload?.email || "",
              phone: "",
            },
          ],
          contactEmail: (payload?.email || "").trim().toLowerCase(),
          paymentMethod: "transfer",
          status: "pending",
          lang,
          slotDate: slot?.slotDate || "",
          slotHour: slot?.slotHour ?? null,
          calendlyEventUri: eventUri,
          calendlyStart: startIso ? new Date(startIso) : null,
        });
      }

      // Send our branded confirmation email with the real date/time.
      // Email must never fail the webhook — the booking/deduction already
      // succeeded, and a non-200 makes Calendly retry (double-processing).
      const to = booking.participants?.[0]?.email || payload?.email;
      if (to && slot) {
        try {
          await sendBookingConfirmation({
            to,
            name: booking.participants?.[0]?.firstName || payload?.first_name || "",
            lang,
            sessionLabel: SESSION_TYPES[booking.sessionType]?.label || "",
            dateTime: slot.dateTime,
            remaining,
            total,
          });
        } catch (mailErr) {
          console.error("webhook: email send failed:", mailErr?.message);
        }
      }
      return NextResponse.json({ ok: true });
    }

    if (eventType === "invitee.canceled") {
      const eventUri = payload?.scheduled_event?.uri || "";
      const bookingId = payload?.tracking?.utm_content || "";
      let booking = null;
      if (bookingId && mongoose.isValidObjectId(bookingId)) {
        booking = await Booking.findById(bookingId);
      }
      if (!booking && eventUri) {
        booking = await Booking.findOne({ calendlyEventUri: eventUri });
      }
      if (booking) {
        booking.status = "cancelled";
        await booking.save();
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true, ignored: eventType });
  } catch (err) {
    console.error("webhook error:", err?.stack || err?.message);
    // Diagnostic: surface the message so live failures are traceable.
    return NextResponse.json(
      { error: "SERVER_ERROR", message: err?.message || String(err) },
      { status: 500 }
    );
  }
}

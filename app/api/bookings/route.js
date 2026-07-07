import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import Code from "@/lib/models/Code";
import {
  SESSION_TYPES,
  participantsFor,
  PAYMENT_METHODS,
  PACKS,
} from "@/lib/booking-config";
import { parseDateKey } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanParticipant(p) {
  return {
    firstName: (p?.firstName || "").trim(),
    lastName: (p?.lastName || "").trim(),
    email: (p?.email || "").trim().toLowerCase(),
    phone: (p?.phone || "").trim(),
  };
}

/**
 * POST /api/bookings
 * { sessionType, participants:[{firstName,lastName,email,phone}], paymentMethod, code? }
 *
 * - Validates the session type + participant count.
 * - For paymentMethod "code": atomically validates + consumes 1 session
 *   (confirmed instantly). For "transfer"/"cash": booking is saved as pending.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionType, paymentMethod } = body || {};
    const participants = Array.isArray(body?.participants)
      ? body.participants.map(cleanParticipant)
      : [];

    // --- validation ---
    if (!SESSION_TYPES[sessionType]) {
      return NextResponse.json({ error: "INVALID_SESSION_TYPE" }, { status: 400 });
    }
    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return NextResponse.json({ error: "INVALID_PAYMENT_METHOD" }, { status: 400 });
    }
    // Pack codes (Pack 5 / Pack 10) are for one person → Solo sessions only.
    if (paymentMethod === "code" && sessionType !== "solo") {
      return NextResponse.json({ error: "CODE_SOLO_ONLY" }, { status: 400 });
    }

    const expected = participantsFor(sessionType);
    if (participants.length !== expected) {
      return NextResponse.json(
        { error: "PARTICIPANT_COUNT", expected, got: participants.length },
        { status: 400 }
      );
    }
    for (const p of participants) {
      if (!p.firstName || !p.lastName || !p.phone || !/.+@.+\..+/.test(p.email)) {
        return NextResponse.json({ error: "PARTICIPANT_FIELDS" }, { status: 400 });
      }
    }

    // --- slot (optional — the time slot is chosen on Calendly) ---
    const hasSlot = Boolean(body?.slot?.date);
    let slotDate = "";
    let slotHour = null;
    let slotDateObj = null;
    if (hasSlot) {
      slotDate = (body.slot.date || "").trim();
      slotHour = Number(body.slot.hour);
      slotDateObj = parseDateKey(slotDate);
      if (!slotDateObj || Number.isNaN(slotHour)) {
        return NextResponse.json({ error: "MISSING_SLOT" }, { status: 400 });
      }
    }

    await connectDB();

    let status = "pending";
    let usedCode = null;
    let remaining = null;
    let codePack = null; // pack info taken from the code (authoritative)

    if (paymentMethod === "code") {
      const raw = (body?.code || "").trim().toUpperCase();
      if (!raw) {
        return NextResponse.json({ error: "MISSING_CODE" }, { status: 400 });
      }
      // A code belongs to ONE person → identified by email. Email is required.
      const redeemer = (participants[0].email || "").trim().toLowerCase();
      if (!redeemer) {
        return NextResponse.json({ error: "CODE_EMAIL_REQUIRED" }, { status: 400 });
      }

      // VALIDATE only — the session is deducted later, once the Calendly slot
      // is actually booked (handled by the webhook).
      const doc = await Code.findOne({ code: raw });
      if (!doc || doc.status !== "active") {
        return NextResponse.json(
          { error: doc && doc.status !== "active" ? "CODE_DISABLED" : "INVALID_CODE" },
          { status: 400 }
        );
      }
      if (doc.clientEmail && doc.clientEmail !== redeemer) {
        return NextResponse.json({ error: "CODE_WRONG_PERSON" }, { status: 400 });
      }
      if (doc.remaining <= 0) {
        return NextResponse.json({ error: "NO_SESSIONS_LEFT" }, { status: 400 });
      }

      usedCode = doc.code;
      // The code is the source of truth for the pack size.
      codePack = { type: doc.packType, sessions: doc.totalSessions };
      // status stays "pending" — confirmed + deducted on the webhook.
    }

    const lang = ["fr", "en", "de"].includes(body?.lang) ? body.lang : "fr";
    // Pack info: prefer the code's pack; otherwise the pack clicked on Promotion.
    const clickedPack = PACKS[body?.pack];
    const packType = codePack ? codePack.type : clickedPack ? body.pack : "";
    const packSessions = codePack
      ? codePack.sessions
      : clickedPack
      ? clickedPack.sessions
      : null;

    const booking = await Booking.create({
      sessionType,
      participants,
      contactEmail: participants[0].email,
      contactPhone: participants[0].phone,
      paymentMethod,
      code: usedCode || "",
      lang,
      pack: packType,
      packSessions,
      status,
      slotDate,
      slotHour,
    });

    // The confirmation email (with the real date/time) is sent by the Calendly
    // webhook once the invitee picks their slot. Calendly also sends its own.

    return NextResponse.json(
      {
        ok: true,
        bookingId: booking._id,
        status,
        ...(remaining !== null ? { remaining } : {}),
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Absence from "@/lib/models/Absence";
import Booking from "@/lib/models/Booking";
import { availableHours, parseDateKey, isHourBlocked } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/slots?date=YYYY-MM-DD
 * Returns the bookable hours for that date:
 *   base weekly hours − blocked (admin) − already booked − past hours (today).
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateKey = searchParams.get("date");
    const date = parseDateKey(dateKey);
    if (!date) {
      return NextResponse.json({ error: "INVALID_DATE" }, { status: 400 });
    }

    // Reject past dates outright.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return NextResponse.json({ hours: [] });

    await connectDB();

    let hours = availableHours(date.getDay());

    // Remove admin-blocked hours.
    const absence = await Absence.findOne({ dateKey });
    if (absence) {
      if (absence.value === "all") return NextResponse.json({ hours: [] });
      hours = hours.filter((h) => !isHourBlocked(absence.value, h));
    }

    // Remove already-booked hours (any non-cancelled booking).
    const taken = await Booking.find({
      slotDate: dateKey,
      status: { $ne: "cancelled" },
    })
      .select("slotHour")
      .lean();
    const takenSet = new Set(taken.map((b) => b.slotHour));
    hours = hours.filter((h) => !takenSet.has(h));

    // Remove past hours if the date is today.
    const now = new Date();
    const isToday = date.getTime() === today.getTime();
    if (isToday) hours = hours.filter((h) => h > now.getHours());

    return NextResponse.json({ hours });
  } catch (err) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

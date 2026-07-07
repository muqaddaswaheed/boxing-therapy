import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/bookings — recent bookings with participants. */
export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  await connectDB();
  // Only confirmed bookings matter — a booking becomes confirmed the moment
  // the client schedules their Calendly slot. Pending (started but not yet
  // scheduled) rows are not shown.
  const bookings = await Booking.find({ status: "confirmed" })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  return NextResponse.json({ bookings });
}

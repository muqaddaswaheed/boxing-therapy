import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Absence from "@/lib/models/Absence";
import { isAdmin } from "@/lib/admin-auth";
import { availableHours, parseDateKey } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/absences — list all blocked dates. */
export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  await connectDB();
  const absences = await Absence.find().sort({ dateKey: 1 }).lean();
  return NextResponse.json({ absences });
}

/**
 * POST /api/admin/absences  { dateKey, mode, hour? }
 *  mode = "blockDay"  → block the whole day
 *  mode = "unblock"   → remove all blocks for the day
 *  mode = "toggleHour"→ toggle a single hour
 */
export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  try {
    const { dateKey, mode, hour } = await request.json();
    const date = parseDateKey(dateKey);
    if (!date) {
      return NextResponse.json({ error: "INVALID_DATE" }, { status: 400 });
    }
    await connectDB();

    if (mode === "blockDay") {
      await Absence.findOneAndUpdate(
        { dateKey },
        { dateKey, value: "all" },
        { upsert: true }
      );
    } else if (mode === "unblock") {
      await Absence.deleteOne({ dateKey });
    } else if (mode === "toggleHour") {
      const h = Number(hour);
      const dayHours = availableHours(date.getDay());
      const current = await Absence.findOne({ dateKey });
      let arr;
      if (!current) arr = [h];
      else if (current.value === "all") arr = dayHours.filter((x) => x !== h);
      else if (Array.isArray(current.value))
        arr = current.value.includes(h)
          ? current.value.filter((x) => x !== h)
          : [...current.value, h];
      else arr = [h];

      if (arr.length === 0) await Absence.deleteOne({ dateKey });
      else
        await Absence.findOneAndUpdate(
          { dateKey },
          { dateKey, value: arr },
          { upsert: true }
        );
    } else {
      return NextResponse.json({ error: "INVALID_MODE" }, { status: 400 });
    }

    const absences = await Absence.find().sort({ dateKey: 1 }).lean();
    return NextResponse.json({ ok: true, absences });
  } catch (e) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

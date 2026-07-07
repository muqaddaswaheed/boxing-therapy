import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Code from "@/lib/models/Code";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { code, email } = await request.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, error: "MISSING_CODE" },
        { status: 400 }
      );
    }

    await connectDB();
    const doc = await Code.findOne({ code: code.trim().toUpperCase() });

    if (!doc || doc.status !== "active") {
      return NextResponse.json({ valid: false, error: "INVALID_CODE" });
    }
    const rem = doc.remaining ?? doc.totalSessions - doc.usedSessions;
    if (rem <= 0) {
      return NextResponse.json({
        valid: false,
        error: "NO_SESSIONS_LEFT",
        remaining: 0,
      });
    }
    // A code belongs to one person. If already bound and this email differs, reject.
    const redeemer = (email || "").trim().toLowerCase();
    if (doc.clientEmail && redeemer && doc.clientEmail !== redeemer) {
      return NextResponse.json({ valid: false, error: "CODE_WRONG_PERSON" });
    }

    return NextResponse.json({
      valid: true,
      packType: doc.packType,
      remaining: rem,
      total: doc.totalSessions,
    });
  } catch (err) {
    return NextResponse.json(
      { valid: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}

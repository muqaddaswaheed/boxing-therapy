import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Code from "@/lib/models/Code";
import { PACKS } from "@/lib/booking-config";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function randomCode() {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000); // 4 digits
  return `BTP-${year}-${n}`;
}

async function generateUniqueCode() {
  for (let i = 0; i < 20; i++) {
    const candidate = randomCode();
    const exists = await Code.exists({ code: candidate });
    if (!exists) return candidate;
  }
  throw new Error("CODE_GENERATION_FAILED");
}

/** GET /api/admin/codes — list all codes with remaining sessions. */
export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  await connectDB();
  const codes = await Code.find().sort({ createdAt: -1 }).lean({ virtuals: true });
  return NextResponse.json({ codes });
}

/**
 * POST /api/admin/codes  { packType, clientName?, clientEmail? }
 * Generates a unique code (BTP-YYYY-NNNN) for a Pack 5 / Pack 10.
 */
export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  try {
    const { packType, clientName = "", clientEmail = "" } = await request.json();
    const pack = PACKS[packType];
    if (!pack) {
      return NextResponse.json({ error: "INVALID_PACK" }, { status: 400 });
    }
    // Email is required — the code is bound to this client (one person per code).
    if (!/.+@.+\..+/.test((clientEmail || "").trim())) {
      return NextResponse.json({ error: "EMAIL_REQUIRED" }, { status: 400 });
    }

    await connectDB();
    const code = await generateUniqueCode();
    const doc = await Code.create({
      code,
      packType,
      totalSessions: pack.sessions,
      usedSessions: 0,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim().toLowerCase(),
      status: "active",
    });

    return NextResponse.json(
      { ok: true, code: doc.code, packType: doc.packType, total: doc.totalSessions },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

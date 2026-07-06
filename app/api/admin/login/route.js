import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/login { email, password }
 * Verifies against an Admin document in MongoDB (hashed password).
 * Falls back to ADMIN_EMAIL/ADMIN_PASSWORD env vars if no admin exists in DB.
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const secret = process.env.ADMIN_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "NOT_CONFIGURED" }, { status: 500 });
    }

    const emailNorm = (email || "").trim().toLowerCase();
    let ok = false;

    await connectDB();
    const admin = await Admin.findOne({ email: emailNorm });
    if (admin) {
      ok = await bcrypt.compare(password || "", admin.passwordHash);
    } else if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      // Fallback to env credentials (only used when no DB admin is seeded).
      ok =
        emailNorm === process.env.ADMIN_EMAIL.toLowerCase() &&
        password === process.env.ADMIN_PASSWORD;
    }

    if (!ok) {
      return NextResponse.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, secret, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

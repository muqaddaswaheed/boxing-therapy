import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/me → { authed: boolean } */
export async function GET(request) {
  return NextResponse.json({ authed: isAdmin(request) });
}

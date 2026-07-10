import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canCreate } from "@/lib/roles";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const downloads = await db.download.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, downloads });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!canCreate(session.role)) {
    return NextResponse.json({ ok: false, error: "forbidden", message: "Viewers cannot create downloads." }, { status: 403 });
  }
  try {
    const body = await req.json();
    const download = await db.download.create({ data: body });
    return NextResponse.json({ ok: true, download });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "create_failed", details: String(err) }, { status: 400 });
  }
}

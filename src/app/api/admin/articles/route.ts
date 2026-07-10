import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canCreate } from "@/lib/roles";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const articles = await db.article.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, articles });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canCreate(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Viewers cannot create articles." }, { status: 403 });
  try {
    const body = await req.json();
    const article = await db.article.create({ data: body });
    return NextResponse.json({ ok: true, article });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "create_failed", details: String(err) }, { status: 400 });
  }
}

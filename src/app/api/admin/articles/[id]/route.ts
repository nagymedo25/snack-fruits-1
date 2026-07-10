import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canEdit, canDelete } from "@/lib/roles";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canEdit(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Viewers cannot edit." }, { status: 403 });
  try {
    const { id } = await params;
    const body = await req.json();
    const article = await db.article.update({ where: { id }, data: body });
    return NextResponse.json({ ok: true, article });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "update_failed", details: String(err) }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canDelete(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Only admins can delete." }, { status: 403 });
  try {
    const { id } = await params;
    await db.article.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "delete_failed", details: String(err) }, { status: 400 });
  }
}

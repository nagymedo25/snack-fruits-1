import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canEdit, canDelete } from "@/lib/roles";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!canEdit(session.role)) {
    return NextResponse.json({ ok: false, error: "forbidden", message: "Viewers cannot edit leads." }, { status: 403 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const allowed: Record<string, unknown> = {};
    if (body.status) allowed.status = body.status;
    if (body.quality) allowed.quality = body.quality;
    if (body.notes !== undefined) allowed.notes = body.notes;
    const lead = await db.lead.update({ where: { id }, data: allowed });
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "update_failed", details: String(err) }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!canDelete(session.role)) {
    return NextResponse.json({ ok: false, error: "forbidden", message: "Only admins can delete leads." }, { status: 403 });
  }
  try {
    const { id } = await params;
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "delete_failed", details: String(err) }, { status: 400 });
  }
}

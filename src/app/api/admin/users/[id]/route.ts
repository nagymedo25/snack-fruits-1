import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canManageUsers } from "@/lib/roles";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canManageUsers(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Only admins can edit users." }, { status: 403 });
  try {
    const { id } = await params;
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.email) data.email = String(body.email).toLowerCase().trim();
    if (body.name !== undefined) data.name = body.name;
    if (body.role && ["admin", "editor", "viewer"].includes(body.role)) data.role = body.role;
    if (body.password) data.password = await bcrypt.hash(String(body.password), 10);
    const user = await db.adminUser.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "update_failed", details: String(err) }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canManageUsers(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Only admins can delete users." }, { status: 403 });
  try {
    const { id } = await params;
    const target = await db.adminUser.findUnique({ where: { id } });
    if (target?.email === session.email) {
      return NextResponse.json({ ok: false, error: "cannot_delete_self" }, { status: 400 });
    }
    await db.adminUser.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "delete_failed", details: String(err) }, { status: 400 });
  }
}

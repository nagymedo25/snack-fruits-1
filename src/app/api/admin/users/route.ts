import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canManageUsers } from "@/lib/roles";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canManageUsers(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Only admins can manage users." }, { status: 403 });
  const users = await db.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ ok: true, users });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canManageUsers(session.role)) return NextResponse.json({ ok: false, error: "forbidden", message: "Only admins can create users." }, { status: 403 });
  try {
    const { email, name, password, role } = await req.json();
    if (!email || !password) return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    const hashed = await bcrypt.hash(String(password), 10);
    const user = await db.adminUser.create({
      data: {
        email: String(email).toLowerCase().trim(),
        name: name ? String(name) : null,
        password: hashed,
        role: ["admin", "editor", "viewer"].includes(role) ? role : "viewer",
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "create_failed", details: String(err) }, { status: 400 });
  }
}

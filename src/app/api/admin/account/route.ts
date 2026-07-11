import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import bcrypt from "bcryptjs";

/**
 * GET /api/admin/account
 * Returns the current admin user's profile (email, name, role).
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );

  const user = await db.adminUser.findUnique({
    where: { email: session.email },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  if (!user)
    return NextResponse.json(
      { ok: false, error: "user_not_found" },
      { status: 404 }
    );

  return NextResponse.json({ ok: true, user });
}

/**
 * PUT /api/admin/account
 * Update the current admin user's profile.
 * Requires `currentPassword` when changing the password.
 */
export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );

  try {
    const body = await req.json();
    const { name, email, currentPassword, newPassword } = body;

    const user = await db.adminUser.findUnique({
      where: { email: session.email },
    });

    if (!user)
      return NextResponse.json(
        { ok: false, error: "user_not_found" },
        { status: 404 }
      );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {};

    // Update name if provided
    if (name !== undefined) {
      data.name = String(name).trim() || null;
    }

    // Update email if provided and different
    if (email && String(email).toLowerCase().trim() !== user.email) {
      const newEmail = String(email).toLowerCase().trim();
      // Check if email is already taken
      const existing = await db.adminUser.findUnique({
        where: { email: newEmail },
      });
      if (existing) {
        return NextResponse.json(
          { ok: false, error: "email_taken", message: "This email is already in use." },
          { status: 400 }
        );
      }
      data.email = newEmail;
    }

    // Update password if provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          {
            ok: false,
            error: "current_password_required",
            message: "Current password is required to change password.",
          },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          {
            ok: false,
            error: "invalid_current_password",
            message: "Current password is incorrect.",
          },
          { status: 400 }
        );
      }

      if (String(newPassword).length < 6) {
        return NextResponse.json(
          {
            ok: false,
            error: "password_too_short",
            message: "New password must be at least 6 characters.",
          },
          { status: 400 }
        );
      }

      data.password = await bcrypt.hash(String(newPassword), 10);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ ok: true, message: "No changes." });
    }

    const updated = await db.adminUser.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, user: updated });
  } catch (err) {
    console.error("Account update error:", err);
    return NextResponse.json(
      { ok: false, error: "update_failed" },
      { status: 500 }
    );
  }
}

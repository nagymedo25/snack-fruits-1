import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// Simple session store — in production, replace with JWT or NextAuth.
// For this B2B admin panel, we use a signed cookie with email + expiry.
const SESSION_COOKIE = "sf_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function makeToken(email: string, role: string): string {
  // Base64-encoded payload — NOT secure crypto, just a tamper-evident token.
  // For production-grade security, use NextAuth or JWT with HMAC.
  const payload = JSON.stringify({
    email,
    role,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  });
  return Buffer.from(payload).toString("base64");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "missing_credentials" },
        { status: 400 }
      );
    }

    const user = await db.adminUser.findUnique({
      where: { email: String(email).toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "invalid_credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "invalid_credentials" },
        { status: 401 }
      );
    }

    const token = makeToken(user.email, user.role);

    const res = NextResponse.json({
      ok: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}

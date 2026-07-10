import { cookies } from "next/headers";

const SESSION_COOKIE = "sf_admin_session";

export type AdminSession = {
  email: string;
  role: string;
  exp: number;
};

/**
 * Read & validate the admin session cookie.
 * Returns null if missing, malformed, or expired.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const payload = JSON.parse(decoded) as AdminSession;
    if (!payload.email || !payload.role || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

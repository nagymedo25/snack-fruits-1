import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public endpoint — returns all site text strings for frontend use.
// No caching — always returns fresh data so admin edits reflect instantly.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const texts = await db.siteText.findMany();
    // Build a reverse-lookup map using originalEn as key (which NEVER changes).
    // The t() function in LanguageProvider passes the hardcoded English string,
    // which matches originalEn. The returned value is the current editable valueEn/valueAr.
    const byValue: Record<string, { en: string; ar: string }> = {};
    for (const t of texts) {
      if (t.originalEn) {
        byValue[t.originalEn] = {
          en: t.valueEn || t.originalEn,
          ar: t.valueAr || t.valueEn || t.originalEn,
        };
      }
    }
    const res = NextResponse.json({ ok: true, byValue });
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
    return res;
  } catch {
    return NextResponse.json({ ok: true, byValue: {} });
  }
}

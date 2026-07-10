import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public settings endpoint — returns only non-sensitive settings
// for use by client components (WhatsApp number, social links, etc.)
export async function GET() {
  try {
    const settings = await db.setting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value || "";

    // Return only public-safe settings
    return NextResponse.json({
      ok: true,
      settings: {
        whatsappNumber: map.whatsappNumber || "201039007939",
        whatsappDisplay: map.whatsappDisplay || "+20 103 900 7939",
        officialEmail: map.officialEmail || "",
        facebook: map.facebook || "",
        linkedin: map.linkedin || "",
        instagram: map.instagram || "",
        snapchat: map.snapchat || "",
        location: map.location || "Egypt — serving GCC",
        workingHours: map.workingHours || "Sun–Thu · 9:00–18:00 EET",
      },
    });
  } catch {
    // DB unavailable — return defaults
    return NextResponse.json({
      ok: true,
      settings: {
        whatsappNumber: "201039007939",
        whatsappDisplay: "+20 103 900 7939",
        officialEmail: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        snapchat: "",
        location: "Egypt — serving GCC",
        workingHours: "Sun–Thu · 9:00–18:00 EET",
      },
    });
  }
}

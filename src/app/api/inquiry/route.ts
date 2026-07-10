import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ===== Simple in-memory rate limiting (per IP) =====
// 5 inquiries per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateWhatsApp(phone: string): boolean {
  // Strip all non-digits, must have at least 8 digits
  const digits = phone.replace(/[^0-9]/g, "");
  return digits.length >= 8;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // ===== 1. Rate limiting =====
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "rate_limited", message: "Too many inquiries. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // ===== 2. Honeypot check (spam protection) =====
    // If "website" field is filled, it's a bot
    if (body.website && body.website.trim() !== "") {
      // Pretend success so bots don't retry
      return NextResponse.json({ ok: true, message: "Inquiry received" });
    }

    // ===== 3. Validate required fields =====
    const required = ["name", "company", "country", "whatsapp", "email"];
    const missing = required.filter((f) => !body[f] || String(body[f]).trim() === "");
    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: "missing_fields", fields: missing },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 }
      );
    }

    if (!validateWhatsApp(body.whatsapp)) {
      return NextResponse.json(
        { ok: false, error: "invalid_whatsapp" },
        { status: 400 }
      );
    }

    // ===== 4. Determine lead quality heuristically =====
    let quality = "general";
    const msg = (body.message || "").toLowerCase();
    const qty = (body.quantity || "").toLowerCase();
    if (
      /\b(ton|tons|tonne|tonnes|kg|kilogram|container|carton| pallet|truck)\b/.test(qty) ||
      /\b(price|quote|quotation|contract|order|supply|shipment|destination port)\b/.test(msg)
    ) {
      quality = "serious";
    } else if (/\b(broker|agent|intermediary|commission)\b/.test(msg)) {
      quality = "broker";
    }

    // ===== 5. Save lead to database =====
    const lead = await db.lead.create({
      data: {
        name: String(body.name).trim().slice(0, 200),
        company: String(body.company).trim().slice(0, 200),
        country: String(body.country).trim().slice(0, 100),
        whatsapp: String(body.whatsapp).trim().slice(0, 50),
        email: String(body.email).trim().slice(0, 200),
        product: body.product ? String(body.product).slice(0, 200) : null,
        quantity: body.quantity ? String(body.quantity).slice(0, 200) : null,
        packing: body.packing ? String(body.packing).slice(0, 200) : null,
        port: body.port ? String(body.port).slice(0, 200) : null,
        useCase: body.useCase ? String(body.useCase).slice(0, 200) : null,
        message: body.message ? String(body.message).slice(0, 5000) : null,
        status: "new",
        quality,
      },
    });

    // ===== 6. Trigger email notification (optional — needs env var) =====
    // We attempt to send an email via a configured webhook/SMTP if available,
    // but silently skip if not configured (so the lead is still saved).
    const emailWebhook = process.env.INQUIRY_EMAIL_WEBHOOK;
    if (emailWebhook) {
      try {
        await fetch(emailWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: lead.id,
            name: lead.name,
            company: lead.company,
            country: lead.country,
            whatsapp: lead.whatsapp,
            email: lead.email,
            product: lead.product,
            quantity: lead.quantity,
            message: lead.message,
            quality: lead.quality,
            createdAt: lead.createdAt,
          }),
        });
      } catch {
        // Email failed but lead is saved — admin can see it in /admin/leads
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Inquiry received",
      leadId: lead.id,
    });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}

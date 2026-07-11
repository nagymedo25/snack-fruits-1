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

type PhoneRule = {
  code: string;
  minDigits: number;
  maxDigits: number;
  prefix?: string;
};

const PHONE_RULES: PhoneRule[] = [
  { code: "+966", minDigits: 9, maxDigits: 9, prefix: "5" },
  { code: "+971", minDigits: 9, maxDigits: 9, prefix: "5" },
  { code: "+965", minDigits: 8, maxDigits: 8 },
  { code: "+974", minDigits: 8, maxDigits: 8 },
  { code: "+968", minDigits: 8, maxDigits: 8 },
  { code: "+973", minDigits: 8, maxDigits: 8 },
  { code: "+20",  minDigits: 10, maxDigits: 10, prefix: "1" },
  { code: "+962", minDigits: 9, maxDigits: 9 },
  { code: "+964", minDigits: 10, maxDigits: 10 },
  { code: "+213", minDigits: 9, maxDigits: 9 },
  { code: "+212", minDigits: 9, maxDigits: 9 },
  { code: "+216", minDigits: 8, maxDigits: 8 },
  { code: "+218", minDigits: 9, maxDigits: 10 },
  { code: "+249", minDigits: 9, maxDigits: 9 },
  { code: "+961", minDigits: 7, maxDigits: 8 },
  { code: "+970", minDigits: 9, maxDigits: 9 },
  { code: "+963", minDigits: 9, maxDigits: 9 },
  { code: "+967", minDigits: 9, maxDigits: 9 },
];

function validateWhatsApp(phoneWithCode: string): boolean {
  if (!phoneWithCode) return false;
  
  // Find matching rule based on prefix
  const rule = PHONE_RULES.find(r => phoneWithCode.startsWith(r.code + " "));
  if (!rule) return false; // Must have a valid country code

  // Get just the digits part
  const numberPart = phoneWithCode.substring(rule.code.length + 1);
  const digits = numberPart.replace(/[^0-9]/g, "");
  
  if (digits.length < rule.minDigits) return false;
  if (digits.length > rule.maxDigits) return false;
  if (rule.prefix && !digits.startsWith(rule.prefix)) return false;
  
  return true;
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

    // ===== 6. Trigger email notification (Brevo Transactional Email API) =====
    const brevoApiKey = process.env.BREVO_API_KEY;
    const emailTo   = process.env.EMAIL_TO   || "info@snack-fruits.com";
    const senderName  = "Snack Fruits Co.";
    const senderEmail = process.env.EMAIL_FROM || "info@snack-fruits.com";

    const qualityColor = lead.quality === "serious" ? "#0d9488" : lead.quality === "broker" ? "#d97706" : "#4b5563";
    const qualityLabel = lead.quality === "serious" ? "Serious Client" : lead.quality === "broker" ? "Broker / Intermediary" : "General Inquiry";

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "snack-fruits.com";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const cleanProto = proto.split(",")[0].trim();
    const origin = `${cleanProto}://${host}`;

    const adminMailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #0d9488; margin: 0; font-size: 24px;">New Lead Inquiry</h2>
          <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Snack Fruits Website</p>
        </div>
        <div style="margin-bottom: 20px;">
          <span style="display: inline-block; padding: 6px 12px; border-radius: 9999px; background-color: ${qualityColor}15; color: ${qualityColor}; font-weight: bold; font-size: 12px; text-transform: uppercase; border: 1px solid ${qualityColor}30;">
            ${qualityLabel}
          </span>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; font-weight: bold; color: #4b5563; width: 150px;">Name:</td>
            <td style="padding: 10px 0; color: #1f2937;">${lead.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Company:</td>
            <td style="padding: 10px 0; color: #1f2937;">${lead.company}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Country:</td>
            <td style="padding: 10px 0; color: #1f2937;">${lead.country}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">WhatsApp:</td>
            <td style="padding: 10px 0; color: #1f2937;">
              <a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}" style="color: #25d366; text-decoration: none; font-weight: bold;">
                ${lead.whatsapp} 💬
              </a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Email:</td>
            <td style="padding: 10px 0; color: #1f2937;">
              <a href="mailto:${lead.email}" style="color: #0d9488; text-decoration: none;">${lead.email}</a>
            </td>
          </tr>
          ${lead.product ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Product:</td><td style="padding: 10px 0; color: #1f2937;">${lead.product}</td></tr>` : ''}
          ${lead.quantity ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Quantity:</td><td style="padding: 10px 0; color: #1f2937;">${lead.quantity}</td></tr>` : ''}
          ${lead.packing ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Packing:</td><td style="padding: 10px 0; color: #1f2937;">${lead.packing}</td></tr>` : ''}
          ${lead.port ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Target Port:</td><td style="padding: 10px 0; color: #1f2937;">${lead.port}</td></tr>` : ''}
          ${lead.useCase ? `<tr style="border-bottom: 1px solid #f3f4f6;"><td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Use Case:</td><td style="padding: 10px 0; color: #1f2937;">${lead.useCase}</td></tr>` : ''}
        </table>
        ${lead.message ? `<div style="margin-top: 15px; padding: 15px; border-radius: 8px; background-color: #f9fafb; border: 1px solid #f3f4f6;"><h4 style="margin: 0 0 10px 0; color: #374151;">Message:</h4><p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${lead.message}</p></div>` : ''}
        <div style="text-align: center; margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <a href="${origin}/admin/leads" style="display: inline-block; padding: 10px 20px; background-color: #0d9488; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
            View on Lead Manager CRM
          </a>
        </div>
      </div>
    `;

    const clientMailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #0d9488; margin: 0; font-size: 24px;">Thank You for Reaching Out!</h2>
          <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Snack Fruits Co.</p>
        </div>
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">Dear ${lead.name},</p>
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">
          Thank you for contacting <strong>Snack Fruits Co.</strong>! We have successfully received your inquiry and our team is currently reviewing your requirements.
        </p>
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">
          One of our trade specialists will contact you shortly via <strong>Email</strong> or <strong>WhatsApp</strong> (at <span style="font-weight: bold;">${lead.whatsapp}</span>) to provide you with pricing and product specifications.
        </p>
        <div style="margin: 25px 0; padding: 15px; border-radius: 8px; background-color: #f9fafb; border: 1px solid #f3f4f6;">
          <h4 style="margin: 0 0 10px 0; color: #374151; font-size: 14px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Your Inquiry Details:</h4>
          <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 13px; line-height: 1.7;">
            <li><strong>Company:</strong> ${lead.company}</li>
            <li><strong>Country:</strong> ${lead.country}</li>
            ${lead.product ? `<li><strong>Requested Product:</strong> ${lead.product}</li>` : ''}
            ${lead.quantity ? `<li><strong>Quantity:</strong> ${lead.quantity}</li>` : ''}
            ${lead.packing ? `<li><strong>Packing:</strong> ${lead.packing}</li>` : ''}
            ${lead.port ? `<li><strong>Target Port:</strong> ${lead.port}</li>` : ''}
          </ul>
        </div>
        <p style="color: #374151; font-size: 15px; line-height: 1.6;">
          Should you have any immediate questions, feel free to reply directly to this email or reach us on WhatsApp.
        </p>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 25px; color: #6b7280; font-size: 12px; text-align: center;">
          <strong>Snack Fruits Co.</strong><br>
          Premium Frozen Fruits &amp; Vegetables Exporter<br>
          <a href="mailto:info@snack-fruits.com" style="color: #0d9488; text-decoration: none;">info@snack-fruits.com</a> | <a href="https://snack-fruits.com" style="color: #0d9488; text-decoration: none;">www.snack-fruits.com</a>
        </div>
      </div>
    `;

    if (brevoApiKey) {
      // ── Brevo Transactional Email API ──
      const brevoHeaders = {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      };

      // A. Internal alert to admin
      try {
        console.log("[Brevo] Sending admin alert to:", emailTo);
        const adminRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: brevoHeaders,
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: emailTo }],
            subject: `🔔 New Inquiry: ${lead.name} (${lead.company})`,
            htmlContent: adminMailHtml,
          }),
        });
        const adminData = await adminRes.json();
        if (!adminRes.ok) {
          console.error("❌ [Brevo] Admin email failed:", JSON.stringify(adminData, null, 2));
        } else {
          console.log("✅ [Brevo] Admin email sent, messageId:", adminData.messageId);
        }
      } catch (err) {
        console.error("🚨 [Brevo] Admin email exception:", err);
      }

      // B. Auto-reply to the client
      try {
        console.log("[Brevo] Sending auto-reply to client:", lead.email);
        const clientRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: brevoHeaders,
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: lead.email, name: lead.name }],
            subject: `Thank you for your inquiry - Snack Fruits Co.`,
            htmlContent: clientMailHtml,
          }),
        });
        const clientData = await clientRes.json();
        if (!clientRes.ok) {
          console.error("❌ [Brevo] Client auto-reply failed:", JSON.stringify(clientData, null, 2));
        } else {
          console.log("✅ [Brevo] Client auto-reply sent, messageId:", clientData.messageId);
        }
      } catch (err) {
        console.error("🚨 [Brevo] Client auto-reply exception:", err);
      }
    } else {
      console.warn("⚠️ [Email] BREVO_API_KEY is not set. No email was sent.");
    }

    // Trigger webhook if available
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
        // Webhook failed but lead is saved
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

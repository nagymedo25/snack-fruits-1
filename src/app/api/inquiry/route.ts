import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

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

    // ===== 6. Trigger email notification (SMTP and/or Webhook) =====
    // Send SMTP emails if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM || smtpUser || "info@snack-fruits.com";
    const smtpTo = process.env.SMTP_TO || "info@snack-fruits.com";

    if (smtpHost && smtpUser && smtpPassword) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for 465, false for 587 or other ports
          auth: {
            user: smtpUser,
            pass: smtpPassword,
          },
        });

        const qualityColor = lead.quality === "serious" ? "#0d9488" : lead.quality === "broker" ? "#d97706" : "#4b5563";
        const qualityLabel = lead.quality === "serious" ? "Serious Client" : lead.quality === "broker" ? "Broker / Intermediary" : "General Inquiry";

        // A. Send internal alert to info@snack-fruits.com
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
              ${lead.product ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Product:</td>
                <td style="padding: 10px 0; color: #1f2937;">${lead.product}</td>
              </tr>` : ''}
              ${lead.quantity ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Quantity:</td>
                <td style="padding: 10px 0; color: #1f2937;">${lead.quantity}</td>
              </tr>` : ''}
              ${lead.packing ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Packing:</td>
                <td style="padding: 10px 0; color: #1f2937;">${lead.packing}</td>
              </tr>` : ''}
              ${lead.port ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Target Port:</td>
                <td style="padding: 10px 0; color: #1f2937;">${lead.port}</td>
              </tr>` : ''}
              ${lead.useCase ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Use Case:</td>
                <td style="padding: 10px 0; color: #1f2937;">${lead.useCase}</td>
              </tr>` : ''}
            </table>

            ${lead.message ? `
            <div style="margin-top: 15px; padding: 15px; border-radius: 8px; background-color: #f9fafb; border: 1px solid #f3f4f6;">
              <h4 style="margin: 0 0 10px 0; color: #374151;">Message:</h4>
              <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${lead.message}</p>
            </div>` : ''}

            <div style="text-align: center; margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <a href="${req.nextUrl.origin}/admin/leads" style="display: inline-block; padding: 10px 20px; background-color: #0d9488; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                View on Lead Manager CRM
              </a>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: smtpFrom,
          to: smtpTo,
          subject: `🔔 New Inquiry: ${lead.name} (${lead.company})`,
          html: adminMailHtml,
        });

        // B. Send professional auto-reply email to customer
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
              Premium Frozen Fruits & Vegetables Exporter<br>
              <a href="mailto:info@snack-fruits.com" style="color: #0d9488; text-decoration: none;">info@snack-fruits.com</a> | <a href="https://snack-fruits.com" style="color: #0d9488; text-decoration: none;">www.snack-fruits.com</a>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: smtpFrom,
          to: lead.email,
          subject: `Thank you for your inquiry - Snack Fruits Co.`,
          html: clientMailHtml,
        });
      } catch (smtpErr) {
        console.error("SMTP sending error:", smtpErr);
      }
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

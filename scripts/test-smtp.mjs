// SMTP Test Script — run with: node scripts/test-smtp.mjs
import nodemailer from "nodemailer";

const config = {
  host: process.env.SMTP_HOST || "mail.spacemail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true, // 465 = SSL
  auth: {
    user: process.env.SMTP_USER || "info@snack-fruits.com",
    pass: process.env.SMTP_PASSWORD || "",
  },
  // More debug info
  debug: true,
  logger: true,
};

console.log("🔌 Testing SMTP connection...");
console.log("Host:", config.host);
console.log("Port:", config.port);
console.log("User:", config.auth.user);
console.log("---");

const transporter = nodemailer.createTransport(config);

// 1. Verify connection
try {
  await transporter.verify();
  console.log("✅ SMTP Connection OK!");
} catch (err) {
  console.error("❌ SMTP Connection FAILED:", err.message);
  process.exit(1);
}

// 2. Send a test email
try {
  const info = await transporter.sendMail({
    from: `"Snack Fruits Test" <${config.auth.user}>`,
    to: config.auth.user, // send to self to verify
    subject: "✅ SMTP Test — Snack Fruits",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #0d9488; border-radius: 8px; max-width: 500px;">
        <h2 style="color: #0d9488;">SMTP Test Successful!</h2>
        <p>This is a test email confirming that the SMTP configuration for <strong>info@snack-fruits.com</strong> is working correctly.</p>
        <p style="color: #6b7280; font-size: 12px;">Sent from: ${config.host}:${config.port}</p>
      </div>
    `,
  });
  console.log("✅ Test email sent! Message ID:", info.messageId);
  console.log("Response:", info.response);
} catch (err) {
  console.error("❌ Send test email FAILED:", err.message);
  console.error("Full error:", err);
}

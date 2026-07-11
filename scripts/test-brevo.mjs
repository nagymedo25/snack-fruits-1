import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const brevoApiKey = process.env.BREVO_API_KEY;
const emailTo = process.env.EMAIL_TO || "info@snack-fruits.com";
const senderEmail = process.env.EMAIL_FROM || "info@snack-fruits.com";

console.log("Loading settings...");
console.log("BREVO_API_KEY:", brevoApiKey ? `Found (${brevoApiKey.substring(0, 15)}...)` : "Not found");
console.log("EMAIL_TO:", emailTo);
console.log("EMAIL_FROM:", senderEmail);

if (!brevoApiKey) {
  console.error("Error: BREVO_API_KEY is not defined in .env");
  process.exit(1);
}

async function test() {
  try {
    console.log("Sending test email via Brevo...");
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Snack Fruits Co. Test", email: senderEmail },
        to: [{ email: emailTo }],
        subject: "Brevo API Test",
        htmlContent: "<h3>If you receive this, Brevo is working 100% correct!</h3>"
      })
    });

    const data = await res.json();
    console.log("Response status:", res.status);
    console.log("Response data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch Exception:", err);
  }
}

test();

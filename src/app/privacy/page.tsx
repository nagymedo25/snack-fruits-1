import type { Metadata } from "next";
import { BreadcrumbSchema as BreadcrumbSchemaData } from "@/components/schema";

export const metadata: Metadata = {
  title: "Privacy Policy — Snack Fruits",
  description:
    "Privacy policy for Snack Fruits website. How we collect, use, and protect your personal data when you submit an inquiry.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {BreadcrumbSchemaData([
        { name: "Home", url: "/" },
        { name: "Privacy Policy", url: "/privacy" },
      ])}

      <article className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-xs font-mono text-orange font-bold uppercase tracking-widest mb-3">
          Legal
        </div>
        <h1 className="font-serif-display text-4xl font-bold leading-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="prose prose-teal max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              1. Information we collect
            </h2>
            <p>
              When you submit an inquiry through our contact form, we collect:
              your name, company, country, WhatsApp number, email address,
              product interest, target quantity, packing type, destination
              port, target use, and any message you provide. We may also
              collect anonymous analytics data (page views, traffic sources)
              via Google Analytics 4 if enabled.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              2. How we use your information
            </h2>
            <p>
              Your inquiry data is used exclusively to: (a) respond to your
              inquiry with specifications, indicative pricing, and next
              steps; (b) qualify you as a serious buyer, general inquiry, or
              broker; (c) follow up via WhatsApp or email; (d) maintain an
              internal record of the conversation. We do not sell, rent, or
              share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              3. Data retention
            </h2>
            <p>
              Inquiry records are retained for a minimum of 24 months for
              commercial follow-up. You may request deletion of your data at
              any time by contacting our export team via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              4. Cookies
            </h2>
            <p>
              This website uses essential cookies for theme and language
              preferences. If Google Analytics is enabled, analytics cookies
              may be set. No third-party advertising cookies are used.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              5. Your rights
            </h2>
            <p>
              You have the right to: access the personal data we hold about
              you, request correction or deletion, and opt out of
              communications at any time. To exercise these rights, contact
              us via the WhatsApp number listed on our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              6. Security
            </h2>
            <p>
              All form submissions are transmitted over HTTPS. Inquiry data
              is stored in a secured database. Spam protection (honeypot and
              rate limiting) is applied to the contact form.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              7. Contact
            </h2>
            <p>
              For privacy-related questions, contact our export team via
              WhatsApp at the number listed on the website footer.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

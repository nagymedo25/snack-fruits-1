import type { Metadata } from "next";
import { BreadcrumbSchema as BreadcrumbSchemaData } from "@/components/schema";

export const metadata: Metadata = {
  title: "Terms of Use — Snack Fruits",
  description:
    "Terms of use for the Snack Fruits website. Rules for accessing and using our website content and inquiry services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {BreadcrumbSchemaData([
        { name: "Home", url: "/" },
        { name: "Terms of Use", url: "/terms" },
      ])}

      <article className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-xs font-mono text-orange font-bold uppercase tracking-widest mb-3">
          Legal
        </div>
        <h1 className="font-serif-display text-4xl font-bold leading-tight mb-6">
          Terms of Use
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              1. Acceptance of terms
            </h2>
            <p>
              By accessing this website, you agree to be bound by these
              Terms of Use. If you do not agree, please discontinue use of
              the site.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              2. Use of the website
            </h2>
            <p>
              This website is intended for B2B buyers — importers,
              distributors, food factories, HoReCa partners, and private
              label brands — located in GCC markets. You agree not to use
              the site for any unlawful purpose, to submit false
              information, or to attempt to disrupt site operations.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              3. Inquiries and quotations
            </h2>
            <p>
              Submitting an inquiry through our contact form does not
              constitute a binding order. Quotations provided by our export
              team are indicative and subject to product availability,
              specification confirmation, and shipping terms. A formal
              quotation is issued only after specification confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              4. Product information
            </h2>
            <p>
              Product specifications (cut size, variety, packing, storage,
              shelf life) are provided in good faith and may vary based on
              seasonal availability and supplier confirmation. We do not
              list certifications we do not hold. Any HACCP, ISO, or SFDA
              certificate will be presented only when actually available.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              5. Intellectual property
            </h2>
            <p>
              All content on this website — including the Snack Fruits
              brand, logo, product descriptions, photography, and page
              design — is the property of Snack Fruits and may not be
              reproduced without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              6. Limitation of liability
            </h2>
            <p>
              Snack Fruits is not liable for any indirect, incidental, or
              consequential damages arising from the use of this website or
              reliance on information provided herein. Commercial
              transactions are governed by separate sales contracts.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              7. Governing law
            </h2>
            <p>
              These Terms are governed by the laws of the Arab Republic of
              Egypt. Any disputes shall be resolved in Egyptian courts
              unless otherwise agreed in a formal sales contract.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-xl font-bold text-foreground mb-2">
              8. Changes to terms
            </h2>
            <p>
              We may update these Terms at any time. Continued use of the
              website after changes constitutes acceptance of the revised
              Terms.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

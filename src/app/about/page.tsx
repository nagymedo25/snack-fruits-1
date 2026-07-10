import type { Metadata } from "next";
import { BreadcrumbSchema as BreadcrumbSchemaData } from "@/components/schema";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, RefreshCw, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Snack Fruits — Egypt-based IQF Frozen Fruits Export Company",
  description:
    "Snack Fruits is an Egypt-based IQF frozen fruits export company focused on serving GCC buyers with premium frozen fruit products, clear specifications, reliable communication and export-ready cold-chain handling.",
  keywords: [
    "Snack Fruits company",
    "IQF exporter Egypt",
    "frozen fruits company",
    "GCC fruit supplier",
  ],
  openGraph: {
    title: "About Snack Fruits — Premium IQF Fruits Export",
    description:
      "Egypt-based IQF frozen fruits export company serving GCC buyers with reliable supply and export-ready cold-chain handling.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {BreadcrumbSchemaData([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ])}

      {/* HERO */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-teal/12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-mono text-orange font-bold uppercase tracking-widest mb-3">
            About Snack Fruits
          </div>
          <h1 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
            Egypt-based IQF frozen fruits export company serving GCC buyers
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Snack Fruits is an Egypt-based IQF frozen fruits export company
            focused on serving GCC buyers with premium frozen fruit products,
            clear specifications, reliable communication and export-ready
            cold-chain handling.
          </p>
        </div>
      </section>

      {/* COMPANY POSITION */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-3xl bg-card border border-teal/15 p-8 lg:p-12 shadow-sm">
            <div className="text-xs font-mono text-teal font-bold uppercase tracking-widest mb-3">
              Company Position
            </div>
            <h2 className="font-serif-display text-3xl font-bold leading-tight mb-4">
              Specialized IQF export supplier — not a fruit shop
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We are a specialized IQF frozen fruits export supplier — not a
              fresh fruit retailer. Our entire operation is built around the
              needs of serious B2B buyers: importers, distributors, food
              factories, HoReCa partners, private label brands, and retail
              chains across the Gulf.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Every decision we make — sourcing, freezing, packing, shipping —
              is calibrated for export-grade consistency. We don't promise
              what we can't deliver, and we don't decorate our process with
              claims. Our reputation is built on stable supply, clear
              specifications, and a cold chain that holds at ≤ -18°C from
              freezing to GCC arrival.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 lg:py-24 bg-teal/3 border-y border-teal/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono text-teal font-bold uppercase tracking-widest mb-3">
              Our Values
            </div>
            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight">
              Quality · Clarity · Consistency · Responsiveness
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Quality",
                desc: "IQF-frozen at peak freshness. Sorted, inspected, and packaged to export standards. Every batch matters.",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Clarity",
                desc: "Clear specifications, honest documentation, and upfront pricing. No inflated claims, no surprises.",
              },
              {
                icon: <RefreshCw className="w-6 h-6" />,
                title: "Consistency",
                desc: "Stable supply across seasons. Same cut size, same packing, same cold-chain discipline — every shipment.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Responsiveness",
                desc: "Inquiries answered within one business day. WhatsApp follow-up. Export team you can reach directly.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-2xl bg-card border border-teal/12 p-6 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-serif-display text-lg font-bold mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif-display text-2xl lg:text-3xl font-bold leading-tight mb-4">
            What we don&apos;t do
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We don&apos;t fabricate founding dates, inflate production
            volumes, or list certifications we don&apos;t hold. We don&apos;t
            promise seasonal fruits that aren&apos;t available. We don&apos;t
            treat your inquiry as a lead in a funnel — we treat it as a
            serious commercial conversation between two businesses.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-teal/3 border-t border-teal/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif-display text-3xl font-bold leading-tight mb-4">
            Ready to talk specifications?
          </h2>
          <p className="text-base text-muted-foreground mb-7 leading-relaxed">
            Send us your product, quantity, destination port, and packing
            requirements — we respond within one business day with specs and
            indicative pricing.
          </p>
          <Link
            href="/#contact"
            className="shine-hover inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
          >
            Request a Quotation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { BreadcrumbSchema as BreadcrumbSchemaData } from "@/components/schema";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Articles & Insights — Snack Fruits IQF Export",
  description:
    "Practical articles on IQF technology, cold chain handling, private label packaging, and GCC market insights from the Snack Fruits export team.",
  keywords: [
    "IQF technology",
    "cold chain",
    "frozen fruits export",
    "private label",
    "GCC market insights",
  ],
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let articles: Array<{
    slug: string;
    titleEn: string;
    excerptEn: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
  }> = [];

  try {
    articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        titleEn: true,
        excerptEn: true,
        coverImage: true,
        publishedAt: true,
      },
    });
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <main className="min-h-screen bg-background">
      {BreadcrumbSchemaData([
        { name: "Home", url: "/" },
        { name: "Articles", url: "/blog" },
      ])}

      {/* HERO */}
      <section className="relative pt-24 pb-12 border-b border-teal/12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-mono text-orange font-bold uppercase tracking-widest mb-3">
            Articles &amp; Insights
          </div>
          <h1 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
            Practical B2B insights on IQF, cold chain, and GCC export
          </h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
            Short, practical articles from the Snack Fruits export team —
            covering IQF technology, cold-chain discipline, private label
            packaging, and what GCC buyers actually look for.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-5">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="font-serif-display text-xl font-bold mb-2">
                Articles coming soon
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                We&apos;re preparing practical articles on IQF technology,
                cold chain, and GCC export. Check back shortly, or follow us
                on social media for updates.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark transition-colors"
              >
                Send us an inquiry instead
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group rounded-2xl bg-card border border-teal/12 overflow-hidden hover-lift"
                >
                  {a.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={a.coverImage}
                        alt={a.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {a.publishedAt && (
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        {new Date(a.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    )}
                    <h2 className="font-serif-display text-lg font-bold leading-tight mb-2 group-hover:text-teal transition-colors">
                      {a.titleEn}
                    </h2>
                    {a.excerptEn && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {a.excerptEn}
                      </p>
                    )}
                    <div className="mt-4 text-xs font-semibold text-teal group-hover:text-orange transition-colors">
                      Read article →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

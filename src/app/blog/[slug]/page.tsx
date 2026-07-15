import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BreadcrumbSchema as BreadcrumbSchemaData } from "@/components/schema";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await db.article.findUnique({ where: { slug } });
    if (!article) return { title: "Article not found" };
    return {
      title: `${article.titleEn} — Snack Fruits`,
      description: article.excerptEn || undefined,
      openGraph: {
        title: article.titleEn,
        description: article.excerptEn || undefined,
        images: article.coverImage ? [{ url: article.coverImage }] : undefined,
        type: "article",
      },
    };
  } catch {
    return { title: "Article not found" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: Awaited<ReturnType<typeof db.article.findUnique>> = null;

  try {
    article = await db.article.findUnique({ where: { slug } });
  } catch {
    // DB unavailable
  }

  if (!article) {
    notFound();
  }

  // Render simple markdown (paragraphs + headings)
  const renderContent = (content: string | null) => {
    if (!content) return null;
    const lines = content.split("\n");
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("### ")) {
        return <h3 key={i} className="font-serif-display text-xl font-bold mt-6 mb-2">{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith("## ")) {
        return <h2 key={i} className="font-serif-display text-2xl font-bold mt-8 mb-3">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith("# ")) {
        return <h1 key={i} className="font-serif-display text-3xl font-bold mt-8 mb-4">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith("- ")) {
        return <li key={i} className="text-sm text-muted-foreground ml-6 mb-1 list-disc">{trimmed.slice(2)}</li>;
      }
      return <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">{trimmed}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {BreadcrumbSchemaData([
        { name: "Home", url: "/" },
        { name: "Articles", url: "/blog" },
        { name: article!.titleEn, url: `/blog/${slug}` },
      ])}

      {/* Hero */}
      <section className="relative pt-24 pb-8 border-b border-teal/12">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="text-xs font-mono text-teal font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-1.5 hover:text-orange transition-colors"
          >
            ← Back to articles
          </Link>
          {article!.publishedAt && (
            <div className="text-xs text-muted-foreground mb-3">
              {new Date(article!.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          <h1 className="font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
            {article!.titleEn}
          </h1>
          {article!.excerptEn && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {article!.excerptEn}
            </p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {article!.coverImage && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img
              src={article!.coverImage}
              alt={article!.titleEn}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {renderContent(article!.contentEn)}
      </article>

      {/* CTA */}
      <section className="py-16 border-t border-teal/12 bg-teal/3">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif-display text-2xl font-bold mb-4">
            Interested in our IQF products?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark transition-colors"
          >
            Request a Quotation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

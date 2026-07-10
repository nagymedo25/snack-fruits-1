import { db } from "@/lib/db";
import { Inbox, Package, Download, FileText, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats = {
    newLeads: 0,
    totalLeads: 0,
    products: 0,
    downloads: 0,
    articles: 0,
    seriousLeads: 0,
  };
  let recentLeads: Array<{
    id: string;
    name: string;
    company: string;
    country: string;
    quality: string;
    status: string;
    createdAt: Date;
  }> = [];

  try {
    const [leads, products, downloads, articles] = await Promise.all([
      db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      db.product.count(),
      db.download.count(),
      db.article.count(),
    ]);
    const totalLeads = await db.lead.count();
    const newLeads = await db.lead.count({ where: { status: "new" } });
    const seriousLeads = await db.lead.count({
      where: { quality: "serious" },
    });
    stats = {
      newLeads,
      totalLeads,
      products,
      downloads,
      articles,
      seriousLeads,
    };
    recentLeads = leads;
  } catch {
    // DB unavailable
  }

  const cards = [
    {
      label: "New Leads",
      value: stats.newLeads,
      icon: <Inbox className="w-5 h-5" />,
      color: "bg-orange/10 text-orange",
      href: "/admin/leads?status=new",
    },
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-teal/10 text-teal",
      href: "/admin/leads",
    },
    {
      label: "Serious Buyers",
      value: stats.seriousLeads,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-blue-500/10 text-blue-500",
      href: "/admin/leads?quality=serious",
    },
    {
      label: "Products",
      value: stats.products,
      icon: <Package className="w-5 h-5" />,
      color: "bg-purple-500/10 text-purple-500",
      href: "/admin/products",
    },
    {
      label: "Downloads",
      value: stats.downloads,
      icon: <Download className="w-5 h-5" />,
      color: "bg-pink-500/10 text-pink-500",
      href: "/admin/downloads",
    },
    {
      label: "Articles",
      value: stats.articles,
      icon: <FileText className="w-5 h-5" />,
      color: "bg-amber-500/10 text-amber-500",
      href: "/admin/articles",
    },
  ];

  return (
    <div>
      <h1 className="font-serif-display text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Overview of your Snack Fruits website activity
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cards.map((c, i) => (
          <Link
            key={i}
            href={c.href}
            className="rounded-2xl bg-card border border-teal/12 p-5 hover-lift"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.color}`}
            >
              {c.icon}
            </div>
            <div className="text-3xl font-bold tabular-nums">{c.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              {c.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div className="rounded-2xl bg-card border border-teal/12 overflow-hidden">
        <div className="p-5 border-b border-teal/10 flex items-center justify-between">
          <h2 className="font-serif-display text-lg font-bold">
            Recent Inquiries
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-teal hover:text-orange"
          >
            View all →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No inquiries yet. Submit a test inquiry from the contact form to
            see it here.
          </div>
        ) : (
          <div className="divide-y divide-teal/8">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href="/admin/leads"
                className="flex items-center gap-4 p-4 hover:bg-teal/3 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {lead.name}{" "}
                    <span className="text-muted-foreground font-normal">
                      · {lead.company}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lead.country}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lead.quality === "serious" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange/15 text-orange font-semibold uppercase">
                      Serious
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal font-semibold uppercase">
                    {lead.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

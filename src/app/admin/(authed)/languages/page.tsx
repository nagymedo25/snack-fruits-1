"use client";

import * as React from "react";
import { toast } from "sonner";
import { Save, Search, Globe, Eye, Lock } from "lucide-react";
import { useAdminRole } from "../../_components/admin-role-context";
import { invalidateContentCache } from "@/components/use-db-content";

type SiteText = {
  id: string;
  section: string;
  key: string;
  label: string;
  valueEn: string | null;
  valueAr: string | null;
  updatedAt: string;
};

const SECTION_LABELS: Record<string, string> = {
  trustStrip: "Trust Strip (top bar)",
  nav: "Navigation",
  hero: "Hero Section",
  promo: "Promo Video",
  products: "Products Section",
  quality: "Quality & Cold Chain",
  gcc: "GCC Markets",
  process: "Export Process",
  privateLabel: "Private Label",
  industries: "Industries Served",
  gallery: "Gallery",
  contact: "Contact / Inquiry",
  footer: "Footer",
  cta: "Call to Action",
};

export default function AdminLanguagesPage() {
  const { canEdit, isReadOnly } = useAdminRole();
  const [texts, setTexts] = React.useState<SiteText[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [activeSection, setActiveSection] = React.useState<string>("all");
  const [tab, setTab] = React.useState<"en" | "ar">("en");
  const [dirty, setDirty] = React.useState<Set<string>>(new Set());

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    if (data.ok) setTexts(data.texts);
    setLoading(false);
  };

  React.useEffect(() => { load(); }, []);

  const sections = Array.from(new Set(texts.map((t) => t.section)));

  const filtered = texts.filter((t) => {
    if (activeSection !== "all" && t.section !== activeSection) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.key.toLowerCase().includes(q) ||
      t.label.toLowerCase().includes(q) ||
      (t.valueEn || "").toLowerCase().includes(q) ||
      (t.valueAr || "").includes(q)
    );
  });

  const handleFieldChange = (id: string, field: "valueEn" | "valueAr", value: string) => {
    setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
    setDirty((prev) => new Set(prev).add(id));
  };

  const handleSave = async (id: string) => {
    const item = texts.find((t) => t.id === id);
    if (!item) return;
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, valueEn: item.valueEn, valueAr: item.valueAr }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("Text saved — changes are live");
      // Invalidate the public content cache so the live site picks up changes
      invalidateContentCache();
      setDirty((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      toast.error(data.message || data.error || "Save failed");
    }
  };

  const handleSaveAll = async () => {
    const dirtyItems = texts.filter((t) => dirty.has(t.id));
    if (dirtyItems.length === 0) {
      toast.info("No unsaved changes");
      return;
    }
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dirtyItems.map((t) => ({ id: t.id, valueEn: t.valueEn, valueAr: t.valueAr }))),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success(`${dirtyItems.length} texts saved — all changes are live`);
      invalidateContentCache();
      setDirty(new Set());
    } else {
      toast.error("Save failed");
    }
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold mb-1">Languages</h1>
          <p className="text-sm text-muted-foreground">
            Manage all website text in English & Arabic — changes go live instantly
          </p>
        </div>
        {canEdit && dirty.size > 0 && (
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark"
          >
            <Save className="w-4 h-4" />
            Save all ({dirty.size})
          </button>
        )}
      </div>

      {/* Read-only banner for viewers */}
      {isReadOnly && (
        <div className="rounded-xl bg-orange/8 border border-orange/25 p-4 mb-4 flex items-center gap-3">
          <Eye className="w-5 h-5 text-orange shrink-0" />
          <p className="text-sm text-muted-foreground">
            You are a <strong className="text-orange">viewer</strong>. You can browse all text but cannot edit. Ask an admin or editor to make changes.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Section filter */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search text…"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-teal/15 text-sm"
          />
        </div>
        {/* EN/AR tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setTab("en")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              tab === "en" ? "bg-card text-teal shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="w-3 h-3" /> English
          </button>
          <button
            onClick={() => setTab("ar")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              tab === "ar" ? "bg-card text-teal shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="w-3 h-3" /> العربية
          </button>
        </div>
      </div>

      {/* Section pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveSection("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            activeSection === "all" ? "bg-teal text-teal-foreground" : "bg-card border border-teal/15 text-muted-foreground hover:text-teal"
          }`}
        >
          All ({texts.length})
        </button>
        {sections.map((s) => {
          const count = texts.filter((t) => t.section === s).length;
          return (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeSection === s ? "bg-teal text-teal-foreground" : "bg-card border border-teal/15 text-muted-foreground hover:text-teal"
              }`}
            >
              {SECTION_LABELS[s] || s} ({count})
            </button>
          );
        })}
      </div>

      {/* Text items grouped by section */}
      <div className="space-y-8">
        {sections
          .filter((s) => activeSection === "all" || activeSection === s)
          .map((section) => {
            const sectionTexts = filtered.filter((t) => t.section === section);
            if (sectionTexts.length === 0) return null;
            return (
              <div key={section}>
                <h2 className="font-serif-display text-lg font-bold mb-3 text-teal border-b border-teal/12 pb-2">
                  {SECTION_LABELS[section] || section}
                </h2>
                <div className="space-y-3">
                  {sectionTexts.map((t) => (
                    <div key={t.id} className="rounded-xl bg-card border border-teal/12 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {t.label}
                        </label>
                        <div className="flex items-center gap-2">
                          {dirty.has(t.id) && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange/15 text-orange font-semibold">
                              Unsaved
                            </span>
                          )}
                          {canEdit ? (
                            <button
                              onClick={() => handleSave(t.id)}
                              disabled={!dirty.has(t.id)}
                              className="text-xs font-semibold text-teal hover:text-orange disabled:text-muted-foreground disabled:cursor-not-allowed"
                            >
                              Save
                            </button>
                          ) : (
                            <Lock className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      {tab === "en" ? (
                        <textarea
                          value={t.valueEn || ""}
                          onChange={(e) => handleFieldChange(t.id, "valueEn", e.target.value)}
                          disabled={!canEdit}
                          rows={2}
                          dir="ltr"
                          className={`w-full px-3 py-2 rounded-lg border text-sm resize-none transition-colors ${
                            canEdit
                              ? "bg-secondary/60 border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none"
                              : "bg-muted/40 border-teal/8 text-muted-foreground cursor-not-allowed"
                          }`}
                        />
                      ) : (
                        <textarea
                          value={t.valueAr || ""}
                          onChange={(e) => handleFieldChange(t.id, "valueAr", e.target.value)}
                          disabled={!canEdit}
                          rows={2}
                          dir="rtl"
                          className={`w-full px-3 py-2 rounded-lg border text-sm resize-none transition-colors ${
                            canEdit
                              ? "bg-secondary/60 border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none"
                              : "bg-muted/40 border-teal/8 text-muted-foreground cursor-not-allowed"
                          }`}
                        />
                      )}
                      {/* Show the other language as reference */}
                      <div className="mt-1.5 text-[11px] text-muted-foreground/60">
                        {tab === "en" ? (t.valueAr || "—") : (t.valueEn || "—")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

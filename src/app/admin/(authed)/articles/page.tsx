"use client";

import * as React from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

type Article = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string | null;
  excerptAr: string | null;
  contentEn: string | null;
  contentAr: string | null;
  coverImage: string | null;
  tags: string | null;
  published: boolean;
  publishedAt: string | null;
};

const EMPTY: Partial<Article> = {
  slug: "",
  titleEn: "",
  titleAr: "",
  excerptEn: "",
  excerptAr: "",
  contentEn: "",
  contentAr: "",
  coverImage: "",
  tags: "",
  published: false,
  publishedAt: null,
};

export default function AdminArticlesPage() {
  const [items, setItems] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState<Partial<Article> | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/articles");
    const data = await res.json();
    if (data.ok) setItems(data.articles);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.slug || !editing.titleEn) {
      toast.error("Slug and English title are required");
      return;
    }
    const patch = { ...editing };
    if (patch.published && !patch.publishedAt) {
      patch.publishedAt = new Date().toISOString();
    }
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id
      ? `/api/admin/articles/${editing.id}`
      : "/api/admin/articles";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success(editing.id ? "Article updated" : "Article created");
      setEditing(null);
      load();
    } else {
      toast.error(data.error || "Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    }
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold mb-1">Articles</h1>
          <p className="text-sm text-muted-foreground">
            SEO blog articles (IQF, cold chain, GCC insights)
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark"
        >
          <Plus className="w-4 h-4" /> New article
        </button>
      </div>

      <div className="space-y-2">
        {items.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-teal/12"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm flex items-center gap-2">
                {a.titleEn}
                {!a.published && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">Draft</span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                /{a.slug} · {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : "unpublished"}
              </div>
            </div>
            <button onClick={() => setEditing(a)} className="w-9 h-9 rounded-lg border border-teal/15 flex items-center justify-center hover:bg-teal/10">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(a.id)} className="w-9 h-9 rounded-lg border border-orange/20 flex items-center justify-center hover:bg-orange/10 text-orange">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-card rounded-2xl border border-teal/15 w-full max-w-2xl mx-auto my-8">
            <div className="sticky top-0 bg-card border-b border-teal/12 p-5 flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold">
                {editing.id ? "Edit article" : "New article"}
              </h2>
              <button onClick={() => setEditing(null)} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <Input label="Slug" value={editing.slug || ""} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="iqf-vs-cold-storage" />
              <Input label="Title (EN)" value={editing.titleEn || ""} onChange={(v) => setEditing({ ...editing, titleEn: v })} />
              <Input label="Title (AR)" value={editing.titleAr || ""} onChange={(v) => setEditing({ ...editing, titleAr: v })} />
              <Input label="Cover image URL" value={editing.coverImage || ""} onChange={(v) => setEditing({ ...editing, coverImage: v })} />
              <Input label="Tags (comma-separated)" value={editing.tags || ""} onChange={(v) => setEditing({ ...editing, tags: v })} placeholder="IQF, cold chain, GCC" />
              <TextArea label="Excerpt (EN)" value={editing.excerptEn || ""} onChange={(v) => setEditing({ ...editing, excerptEn: v })} rows={2} />
              <TextArea label="Excerpt (AR)" value={editing.excerptAr || ""} onChange={(v) => setEditing({ ...editing, excerptAr: v })} rows={2} />
              <TextArea label="Content (EN) — Markdown supported" value={editing.contentEn || ""} onChange={(v) => setEditing({ ...editing, contentEn: v })} rows={8} />
              <TextArea label="Content (AR) — Markdown supported" value={editing.contentAr || ""} onChange={(v) => setEditing({ ...editing, contentAr: v })} rows={8} />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published ?? false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm">Published</span>
              </label>
            </div>
            <div className="sticky bottom-0 bg-card border-t border-teal/12 p-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="h-10 px-4 rounded-full border border-teal/15 text-sm font-semibold hover:bg-muted">Cancel</button>
              <button onClick={handleSave} className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-orange text-white text-sm font-semibold hover:bg-orange-dark">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm font-mono resize-none" />
    </div>
  );
}

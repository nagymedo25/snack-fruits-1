"use client";

import * as React from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

type Download = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string | null;
  descriptionAr: string | null;
  fileUrl: string;
  fileType: string;
  version: string | null;
  gated: boolean;
  published: boolean;
};

const EMPTY: Partial<Download> = {
  slug: "",
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  fileUrl: "/downloads/",
  fileType: "pdf",
  version: "",
  gated: true,
  published: true,
};

export default function AdminDownloadsPage() {
  const [items, setItems] = React.useState<Download[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState<Partial<Download> | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/downloads");
    const data = await res.json();
    if (data.ok) setItems(data.downloads);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.slug || !editing.titleEn || !editing.fileUrl) {
      toast.error("Slug, title, and file URL are required");
      return;
    }
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id
      ? `/api/admin/downloads/${editing.id}`
      : "/api/admin/downloads";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success(editing.id ? "Download updated" : "Download created");
      setEditing(null);
      load();
    } else {
      toast.error(data.error || "Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this download?")) return;
    const res = await fetch(`/api/admin/downloads/${id}`, { method: "DELETE" });
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
          <h1 className="font-serif-display text-3xl font-bold mb-1">
            Downloads
          </h1>
          <p className="text-sm text-muted-foreground">
            Managed PDF resources (product list, specs, company profile)
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark"
        >
          <Plus className="w-4 h-4" /> Add download
        </button>
      </div>

      <div className="space-y-2">
        {items.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-teal/12"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm flex items-center gap-2">
                {d.titleEn}
                {!d.published && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Draft
                  </span>
                )}
                {d.gated && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange/15 text-orange">
                    Gated
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                /{d.slug} · {d.fileType.toUpperCase()} · {d.version || "no version"}
              </div>
            </div>
            <button
              onClick={() => setEditing(d)}
              className="w-9 h-9 rounded-lg border border-teal/15 flex items-center justify-center hover:bg-teal/10"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(d.id)}
              className="w-9 h-9 rounded-lg border border-orange/20 flex items-center justify-center hover:bg-orange/10 text-orange"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-card rounded-2xl border border-teal/15 w-full max-w-lg mx-auto my-8">
            <div className="sticky top-0 bg-card border-b border-teal/12 p-5 flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold">
                {editing.id ? "Edit download" : "New download"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <Input label="Slug" value={editing.slug || ""} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Input label="Title (EN)" value={editing.titleEn || ""} onChange={(v) => setEditing({ ...editing, titleEn: v })} />
              <Input label="Title (AR)" value={editing.titleAr || ""} onChange={(v) => setEditing({ ...editing, titleAr: v })} />
              <Input label="File URL" value={editing.fileUrl || ""} onChange={(v) => setEditing({ ...editing, fileUrl: v })} placeholder="/downloads/product-list.pdf" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="File type" value={editing.fileType || "pdf"} onChange={(v) => setEditing({ ...editing, fileType: v })} />
                <Input label="Version" value={editing.version || ""} onChange={(v) => setEditing({ ...editing, version: v })} placeholder="v1.0 — 2026" />
              </div>
              <Input label="Description (EN)" value={editing.descriptionEn || ""} onChange={(v) => setEditing({ ...editing, descriptionEn: v })} />
              <Input label="Description (AR)" value={editing.descriptionAr || ""} onChange={(v) => setEditing({ ...editing, descriptionAr: v })} />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.gated ?? true} onChange={(e) => setEditing({ ...editing, gated: e.target.checked })} className="w-4 h-4" />
                <span className="text-sm">Gated (requires lead capture)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4" />
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
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm"
      />
    </div>
  );
}

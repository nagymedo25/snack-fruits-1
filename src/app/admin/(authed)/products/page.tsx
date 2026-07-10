"use client";

import * as React from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Save, Globe, Eye, Lock } from "lucide-react";
import { useAdminRole } from "../../_components/admin-role-context";

type Product = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  shortEn: string;
  shortAr: string;
  usesEn: string | null;
  usesAr: string | null;
  tagsEn: string | null;
  tagsAr: string | null;
  ctaEn: string | null;
  ctaAr: string | null;
  cutsEn: string | null;
  cutsAr: string | null;
  varietiesEn: string | null;
  varietiesAr: string | null;
  packingEn: string | null;
  packingAr: string | null;
  storage: string | null;
  shelfLife: string | null;
  imageUrl: string | null;
  loadingQty: string | null;
  order: number;
  published: boolean;
};

const EMPTY: Partial<Product> = {
  slug: "",
  nameEn: "",
  nameAr: "",
  shortEn: "",
  shortAr: "",
  usesEn: "",
  usesAr: "",
  tagsEn: "[]",
  tagsAr: "[]",
  ctaEn: "Request Specs",
  ctaAr: "اطلب المواصفات",
  cutsEn: "[]",
  cutsAr: "[]",
  varietiesEn: "[]",
  varietiesAr: "[]",
  packingEn: "[]",
  packingAr: "[]",
  storage: "≤ -18°C",
  shelfLife: "24 months from production",
  imageUrl: "",
  loadingQty: "",
  order: 0,
  published: true,
};

export default function AdminProductsPage() {
  const { canCreate, canEdit, canDelete, isReadOnly } = useAdminRole();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState<Partial<Product> | null>(null);
  const [tab, setTab] = React.useState<"en" | "ar">("en");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    if (data.ok) setProducts(data.products);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.slug || !editing.nameEn) {
      toast.error("Slug and English name are required");
      return;
    }
    try {
      const method = editing.id ? "PUT" : "POST";
      const url = editing.id
        ? `/api/admin/products/${editing.id}`
        : "/api/admin/products";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!data.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success(editing.id ? "Product updated" : "Product created");
      setEditing(null);
      load();
    } catch {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      load();
    } else {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading products…</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold mb-1">
            Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your IQF product catalog
          </p>
        </div>
        <button
          onClick={() => {
            if (isReadOnly) { toast.info("You are a viewer — ask an admin or editor to add products."); return; }
            setEditing({ ...EMPTY });
          }}
          className={`inline-flex items-center gap-2 h-10 px-4 rounded-full font-semibold text-sm transition-colors ${
            canCreate
              ? "bg-orange text-white hover:bg-orange-dark"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {canCreate ? <Plus className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          Add product
        </button>
      </div>

      {/* Product list */}
      <div className="space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-teal/12"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm flex items-center gap-2">
                {p.nameEn}
                <span className="text-muted-foreground font-normal text-xs">
                  / {p.nameAr}
                </span>
                {!p.published && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Draft
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                /{p.slug} · order: {p.order}
              </div>
            </div>
            <button
              onClick={() => {
                if (!canEdit) { toast.info("You are a viewer — ask an admin or editor to edit products."); return; }
                setEditing(p);
                setTab("en");
              }}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                canEdit ? "border-teal/15 hover:bg-teal/10" : "border-muted text-muted-foreground cursor-not-allowed opacity-50"
              }`}
            >
              {canEdit ? <Pencil className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                if (!canDelete) { toast.info("Only admins can delete products."); return; }
                handleDelete(p.id);
              }}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                canDelete ? "border-orange/20 hover:bg-orange/10 text-orange" : "border-muted text-muted-foreground cursor-not-allowed opacity-50"
              }`}
            >
              {canDelete ? <Trash2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-card rounded-2xl border border-teal/15 w-full max-w-2xl mx-auto my-8">
            <div className="sticky top-0 bg-card border-b border-teal/12 p-5 flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold">
                {editing.id ? "Edit product" : "New product"}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
                <button
                  onClick={() => setTab("en")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 ${
                    tab === "en" ? "bg-card text-teal" : "text-muted-foreground"
                  }`}
                >
                  <Globe className="w-3 h-3" /> English
                </button>
                <button
                  onClick={() => setTab("ar")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 ${
                    tab === "ar" ? "bg-card text-teal" : "text-muted-foreground"
                  }`}
                >
                  <Globe className="w-3 h-3" /> العربية
                </button>
              </div>

              {/* Common fields */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Slug (URL)"
                  value={editing.slug || ""}
                  onChange={(v) => setEditing({ ...editing, slug: v })}
                  placeholder="mango-cubes"
                />
                <Field
                  label="Order"
                  type="number"
                  value={String(editing.order ?? 0)}
                  onChange={(v) =>
                    setEditing({ ...editing, order: parseInt(v) || 0 })
                  }
                />
              </div>

              <Field
                label={tab === "en" ? "Name (EN)" : "Name (AR)"}
                value={tab === "en" ? editing.nameEn || "" : editing.nameAr || ""}
                onChange={(v) =>
                  setEditing({
                    ...editing,
                    [tab === "en" ? "nameEn" : "nameAr"]: v,
                  })
                }
              />

              <Textarea
                label={tab === "en" ? "Short description (EN)" : "Short description (AR)"}
                value={tab === "en" ? editing.shortEn || "" : editing.shortAr || ""}
                onChange={(v) =>
                  setEditing({
                    ...editing,
                    [tab === "en" ? "shortEn" : "shortAr"]: v,
                  })
                }
              />

              <Field
                label={tab === "en" ? "Uses (EN)" : "Uses (AR)"}
                value={tab === "en" ? editing.usesEn || "" : editing.usesAr || ""}
                onChange={(v) =>
                  setEditing({
                    ...editing,
                    [tab === "en" ? "usesEn" : "usesAr"]: v,
                  })
                }
              />

              <Field
                label={tab === "en" ? "CTA text (EN)" : "CTA text (AR)"}
                value={tab === "en" ? editing.ctaEn || "" : editing.ctaAr || ""}
                onChange={(v) =>
                  setEditing({
                    ...editing,
                    [tab === "en" ? "ctaEn" : "ctaAr"]: v,
                  })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Storage"
                  value={editing.storage || ""}
                  onChange={(v) => setEditing({ ...editing, storage: v })}
                />
                <Field
                  label="Shelf life"
                  value={editing.shelfLife || ""}
                  onChange={(v) => setEditing({ ...editing, shelfLife: v })}
                />
              </div>

              <Field
                label="Image URL (CDN)"
                value={editing.imageUrl || ""}
                onChange={(v) => setEditing({ ...editing, imageUrl: v })}
                placeholder="https://images.unsplash.com/photo-..."
              />

              {/* Image preview */}
              {editing.imageUrl && (
                <div className="rounded-lg overflow-hidden border border-teal/15 max-w-xs">
                  <img
                    src={editing.imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              <Field
                label="Loading quantity (per container)"
                value={editing.loadingQty || ""}
                onChange={(v) => setEditing({ ...editing, loadingQty: v })}
                placeholder="1,800 cartons / 20ft container"
              />

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  {tab === "en" ? "Tags (JSON array EN)" : "Tags (JSON array AR)"}
                </label>
                <textarea
                  value={
                    tab === "en" ? editing.tagsEn || "" : editing.tagsAr || ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      [tab === "en" ? "tagsEn" : "tagsAr"]: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-xs font-mono"
                  placeholder='["Bulk", "HoReCa"]'
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  {tab === "en" ? "Cuts (JSON array EN)" : "Cuts (JSON array AR)"}
                </label>
                <textarea
                  value={
                    tab === "en" ? editing.cutsEn || "" : editing.cutsAr || ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      [tab === "en" ? "cutsEn" : "cutsAr"]: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-xs font-mono"
                  placeholder='["8mm cubes", "10mm cubes"]'
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  {tab === "en" ? "Varieties (JSON EN)" : "Varieties (JSON AR)"}
                </label>
                <textarea
                  value={
                    tab === "en" ? editing.varietiesEn || "" : editing.varietiesAr || ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      [tab === "en" ? "varietiesEn" : "varietiesAr"]: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-xs font-mono"
                  placeholder='["Seddika", "Ewais"]'
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  {tab === "en" ? "Packing (JSON EN)" : "Packing (JSON AR)"}
                </label>
                <textarea
                  value={
                    tab === "en" ? editing.packingEn || "" : editing.packingAr || ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      [tab === "en" ? "packingEn" : "packingAr"]: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-xs font-mono"
                  placeholder='["10kg cartons", "1kg retail"]'
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.published ?? true}
                  onChange={(e) =>
                    setEditing({ ...editing, published: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Published (visible on website)</span>
              </label>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-teal/12 p-5 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="h-10 px-4 rounded-full border border-teal/15 text-sm font-semibold hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-orange text-white text-sm font-semibold hover:bg-orange-dark"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm resize-none"
      />
    </div>
  );
}

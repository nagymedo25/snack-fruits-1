"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Trash2,
  X,
  Search,
  Filter,
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  company: string;
  country: string;
  whatsapp: string;
  email: string;
  product: string | null;
  quantity: string | null;
  packing: string | null;
  port: string | null;
  useCase: string | null;
  message: string | null;
  status: string;
  quality: string;
  notes: string | null;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-orange/15 text-orange",
  contacted: "bg-blue-500/15 text-blue-500",
  quoted: "bg-purple-500/15 text-purple-500",
  closed: "bg-teal/15 text-teal",
};

const QUALITY_COLORS: Record<string, string> = {
  serious: "bg-orange/15 text-orange",
  general: "bg-muted text-muted-foreground",
  broker: "bg-blue-500/15 text-blue-500",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<Lead | null>(null);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [qualityFilter, setQualityFilter] = React.useState("");

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (qualityFilter) params.set("quality", qualityFilter);
    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    if (data.ok) setLeads(data.leads);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, [statusFilter, qualityFilter]);

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q)
    );
  });

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      toast.success("Lead updated");
      load();
      if (selected?.id === id) {
        setSelected({ ...selected, ...patch });
      }
    } else {
      toast.error("Update failed");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Lead deleted");
      setSelected(null);
      load();
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading leads…</div>;
  }

  return (
    <div>
      <h1 className="font-serif-display text-3xl font-bold mb-1">Leads</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Inquiries from your contact form
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, country, email…"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-teal/15 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-card border border-teal/15 text-sm"
        >
          <option value="">All status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quoted">Quoted</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={qualityFilter}
          onChange={(e) => setQualityFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-card border border-teal/15 text-sm"
        >
          <option value="">All quality</option>
          <option value="serious">Serious</option>
          <option value="general">General</option>
          <option value="broker">Broker</option>
        </select>
      </div>

      {/* Leads table */}
      <div className="rounded-2xl bg-card border border-teal/12 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No leads found.
          </div>
        ) : (
          <div className="divide-y divide-teal/8">
            {filtered.map((lead) => (
              <button
                key={lead.id}
                onClick={() => setSelected(lead)}
                className="w-full flex items-center gap-3 p-4 hover:bg-teal/3 text-left transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {lead.name}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      · {lead.company}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {lead.country} · {lead.email}
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                    QUALITY_COLORS[lead.quality] || "bg-muted"
                  }`}
                >
                  {lead.quality}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                    STATUS_COLORS[lead.status] || "bg-muted"
                  }`}
                >
                  {lead.status}
                </span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lead detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-teal/15 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-teal/12 p-5 flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold">
                {selected.name}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-sm">
              <InfoRow icon={<Mail className="w-4 h-4" />} value={selected.email} />
              <InfoRow
                icon={<Phone className="w-4 h-4" />}
                value={selected.whatsapp}
              />
              <InfoRow
                icon={<MapPin className="w-4 h-4" />}
                value={`${selected.company} · ${selected.country}`}
              />
              {selected.product && (
                <InfoRow
                  icon={<Filter className="w-4 h-4" />}
                  value={`Product: ${selected.product}`}
                />
              )}
              {selected.quantity && (
                <div className="text-xs text-muted-foreground">
                  Quantity: {selected.quantity}
                </div>
              )}
              {selected.packing && (
                <div className="text-xs text-muted-foreground">
                  Packing: {selected.packing}
                </div>
              )}
              {selected.port && (
                <div className="text-xs text-muted-foreground">
                  Port: {selected.port}
                </div>
              )}
              {selected.useCase && (
                <div className="text-xs text-muted-foreground">
                  Use: {selected.useCase}
                </div>
              )}
              {selected.message && (
                <div className="pt-3 border-t border-teal/10">
                  <div className="text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-lg">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Status / Quality controls */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-teal/10">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Status
                  </label>
                  <select
                    value={selected.status}
                    onChange={(e) =>
                      updateLead(selected.id, { status: e.target.value })
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-secondary/60 border border-teal/15 text-xs"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Quality
                  </label>
                  <select
                    value={selected.quality}
                    onChange={(e) =>
                      updateLead(selected.id, { quality: e.target.value })
                    }
                    className="w-full px-2 py-1.5 rounded-lg bg-secondary/60 border border-teal/15 text-xs"
                  >
                    <option value="serious">Serious</option>
                    <option value="general">General</option>
                    <option value="broker">Broker</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Internal notes
                </label>
                <textarea
                  value={selected.notes || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, notes: e.target.value })
                  }
                  onBlur={(e) =>
                    updateLead(selected.id, { notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Add private notes about this lead…"
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-xs resize-none"
                />
              </div>

              <div className="pt-3 border-t border-teal/10 flex justify-between items-center">
                <a
                  href={`https://wa.me/${selected.whatsapp.replace(
                    /[^0-9]/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1FB855]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <button
                  onClick={() => deleteLead(selected.id)}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-orange/20 text-orange text-xs font-semibold hover:bg-orange/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

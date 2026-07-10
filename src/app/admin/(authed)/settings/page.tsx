"use client";

import * as React from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    if (data.ok) setSettings(data.settings);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("Settings saved");
    } else {
      toast.error("Save failed");
    }
    setSaving(false);
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  const fields = [
    { key: "whatsappNumber", label: "WhatsApp number (international, no +)", placeholder: "201039007939" },
    { key: "whatsappDisplay", label: "WhatsApp display", placeholder: "+20 103 900 7939" },
    { key: "officialEmail", label: "Official email (after domain)", placeholder: "export@snackfruits.com" },
    { key: "ga4MeasurementId", label: "Google Analytics 4 ID", placeholder: "G-XXXXXXXXXX" },
    { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/..." },
    { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
    { key: "snapchat", label: "Snapchat URL", placeholder: "https://snapchat.com/..." },
    { key: "location", label: "Location", placeholder: "Egypt — serving GCC" },
    { key: "workingHours", label: "Working hours", placeholder: "Sun–Thu · 9:00–18:00 EET" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Site-wide settings (contact, social, analytics)
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="rounded-2xl bg-card border border-teal/12 p-6 space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-semibold mb-1.5">
              {f.label}
            </label>
            <input
              type="text"
              value={settings[f.key] || ""}
              onChange={(e) =>
                setSettings({ ...settings, [f.key]: e.target.value })
              }
              placeholder={f.placeholder}
              className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-teal/5 border border-teal/15 p-4 text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Note:</strong> Changes to WhatsApp
        number and social links will reflect on the public website after
        redeployment. GA4 ID must also be set as{" "}
        <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">
          NEXT_PUBLIC_GA4_ID
        </code>{" "}
        environment variable for the analytics script to load.
      </div>
    </div>
  );
}

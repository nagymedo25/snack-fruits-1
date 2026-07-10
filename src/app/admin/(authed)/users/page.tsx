"use client";

import * as React from "react";
import { toast } from "sonner";
import { Plus, Trash2, X, Save, Shield, Eye, Pencil } from "lucide-react";
import { useAdminRole } from "../../_components/admin-role-context";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
};

const ROLE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  admin: { bg: "bg-orange/15", text: "text-orange", label: "Admin" },
  editor: { bg: "bg-teal/15", text: "text-teal", label: "Editor" },
  viewer: { bg: "bg-muted", text: "text-muted-foreground", label: "Viewer" },
};

export default function AdminUsersPage() {
  const { canManageUsers } = useAdminRole();
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [creating, setCreating] = React.useState(false);
  const [form, setForm] = React.useState({ email: "", name: "", password: "", role: "viewer" });

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (data.ok) setUsers(data.users);
    setLoading(false);
  };

  React.useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password) { toast.error("Email and password required"); return; }
    const res = await fetch("/api/admin/users", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.ok) { toast.success("User created"); setCreating(false); setForm({ email: "", name: "", password: "", role: "viewer" }); load(); }
    else { toast.error(data.error === "forbidden" ? "Only admins can create users" : data.error || "Create failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("User deleted"); load(); }
    else { const data = await res.json(); toast.error(data.message || data.error || "Delete failed"); }
  };

  const handleRoleChange = async (id: string, role: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (res.ok) { toast.success("Role updated"); load(); }
    else { const data = await res.json(); toast.error(data.message || data.error || "Update failed"); }
  };

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>;

  if (!canManageUsers) {
    return (
      <div className="rounded-2xl bg-orange/8 border border-orange/25 p-8 text-center">
        <Eye className="w-10 h-10 text-orange mx-auto mb-3" />
        <h2 className="font-serif-display text-xl font-bold mb-2">Read-only access</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          You are signed in as a <strong>viewer</strong>. You can see the user list but cannot create, edit, or delete users. Contact an admin to make changes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold mb-1">Users</h1>
          <p className="text-sm text-muted-foreground">Manage admin panel access and permissions</p>
        </div>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark">
          <Plus className="w-4 h-4" /> Add user
        </button>
      </div>

      {/* Role legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange" /> <span className="font-semibold">Admin</span> <span className="text-muted-foreground">— full access</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal" /> <span className="font-semibold">Editor</span> <span className="text-muted-foreground">— edit products & leads</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground" /> <span className="font-semibold">Viewer</span> <span className="text-muted-foreground">— read-only</span></div>
      </div>

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-teal/12">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ROLE_STYLES[u.role]?.bg || "bg-muted"}`}>
              <Shield className={`w-5 h-5 ${ROLE_STYLES[u.role]?.text || "text-muted-foreground"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{u.name || u.email}</div>
              <div className="text-xs text-muted-foreground">{u.email}</div>
            </div>
            {/* Styled role selector */}
            <div className="relative">
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-card border border-teal/20 text-xs font-semibold cursor-pointer hover:border-teal/40 transition-colors focus:outline-none focus:ring-2 focus:ring-teal/20"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <button onClick={() => handleDelete(u.id)} className="w-9 h-9 rounded-lg border border-orange/20 flex items-center justify-center hover:bg-orange/10 text-orange">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
          <div className="bg-card rounded-2xl border border-teal/15 w-full max-w-md mx-auto my-8">
            <div className="border-b border-teal/12 p-5 flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold">New user</h2>
              <button onClick={() => setCreating(false)} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-sm" placeholder="user@snackfruits.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-sm" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-teal/15 text-sm" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["admin", "editor", "viewer"] as const).map((r) => (
                    <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                        form.role === r
                          ? r === "admin" ? "border-orange bg-orange/10 text-orange" : r === "editor" ? "border-teal bg-teal/10 text-teal" : "border-muted-foreground bg-muted text-muted-foreground"
                          : "border-teal/15 text-muted-foreground hover:border-teal/30"
                      }`}>
                      <div className="flex flex-col items-center gap-1">
                        {r === "admin" ? <Shield className="w-4 h-4" /> : r === "editor" ? <Pencil className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span className="capitalize">{r}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-teal/12 p-5 flex justify-end gap-2">
              <button onClick={() => setCreating(false)} className="h-10 px-4 rounded-full border border-teal/15 text-sm font-semibold hover:bg-muted">Cancel</button>
              <button onClick={handleCreate} className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-orange text-white text-sm font-semibold hover:bg-orange-dark">
                <Save className="w-4 h-4" /> Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

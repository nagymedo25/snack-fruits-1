"use client";

import * as React from "react";
import { toast } from "sonner";
import { Save, User, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Shield } from "lucide-react";

export default function AdminAccountPage() {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [showCurrentPw, setShowCurrentPw] = React.useState(false);
  const [showNewPw, setShowNewPw] = React.useState(false);
  const [showConfirmPw, setShowConfirmPw] = React.useState(false);

  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    role: "",
  });
  const [passwords, setPasswords] = React.useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/account");
        const data = await res.json();
        if (data.ok) {
          setProfile({
            name: data.user.name || "",
            email: data.user.email || "",
            role: data.user.role || "viewer",
          });
        }
      } catch {
        toast.error("Failed to load account data");
      }
      setLoading(false);
    })();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};

    if (!profile.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      e.email = "Please enter a valid email address";
    }

    if (passwords.new || passwords.current || passwords.confirm) {
      if (!passwords.current) e.currentPassword = "Current password is required to change password";
      if (!passwords.new) e.newPassword = "New password is required";
      else if (passwords.new.length < 6) e.newPassword = "Minimum 6 characters";
      if (passwords.new !== passwords.confirm) e.confirmPassword = "Passwords do not match";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    setSaved(false);
    try {
      const body: Record<string, string> = {
        name: profile.name,
        email: profile.email,
      };
      if (passwords.new) {
        body.currentPassword = passwords.current;
        body.newPassword = passwords.new;
      }

      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.ok) {
        toast.success("Account updated successfully");
        setPasswords({ current: "", new: "", confirm: "" });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const msgMap: Record<string, string> = {
          email_taken: "This email is already in use by another account.",
          current_password_required: "Please enter your current password.",
          invalid_current_password: "Current password is incorrect.",
          password_too_short: "New password must be at least 6 characters.",
        };
        toast.error(msgMap[data.error] || data.message || "Update failed");
      }
    } catch {
      toast.error("Failed to update — check connection");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
      </div>
    );
  }

  const roleStyle = profile.role === "admin"
    ? "bg-orange/15 text-orange border-orange/25"
    : profile.role === "editor"
    ? "bg-teal/15 text-teal border-teal/25"
    : "bg-muted text-muted-foreground border-muted-foreground/25";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold mb-1">Account</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal account settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center gap-2 h-10 px-5 rounded-full font-semibold text-sm transition-all disabled:opacity-60 ${
            saved
              ? "bg-teal text-teal-foreground"
              : "bg-orange text-white hover:bg-orange-dark"
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Save changes"}
            </>
          )}
        </button>
      </div>

      {/* Role badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${roleStyle}`}>
          <Shield className="w-3.5 h-3.5" />
          {profile.role}
        </div>
      </div>

      {/* Profile section */}
      <div className="rounded-2xl bg-card border border-teal/12 p-6 mb-6">
        <h2 className="font-serif-display text-lg font-bold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-teal" />
          Profile Information
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="admin@snackfruits.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border outline-none text-sm transition-colors ${
                  errors.email
                    ? "border-orange/50 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20"
                }`}
              />
            </div>
            {errors.email && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-orange">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Password section */}
      <div className="rounded-2xl bg-card border border-teal/12 p-6">
        <h2 className="font-serif-display text-lg font-bold mb-1 flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal" />
          Change Password
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Leave blank if you don't want to change your password.
        </p>

        <div className="space-y-4 max-w-md">
          {/* Current password */}
          <div>
            <label className="block text-xs font-semibold mb-1.5">
              Current password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showCurrentPw ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/60 border outline-none text-sm transition-colors ${
                  errors.currentPassword
                    ? "border-orange/50 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-orange">
                <AlertCircle className="w-3 h-3" />
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New password */}
          <div>
            <label className="block text-xs font-semibold mb-1.5">
              New password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showNewPw ? "text" : "password"}
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/60 border outline-none text-sm transition-colors ${
                  errors.newPassword
                    ? "border-orange/50 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-orange">
                <AlertCircle className="w-3 h-3" />
                {errors.newPassword}
              </p>
            )}
            {passwords.new && passwords.new.length >= 6 && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-teal">
                <CheckCircle2 className="w-3 h-3" />
                Password strength: OK
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-semibold mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showConfirmPw ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/60 border outline-none text-sm transition-colors ${
                  errors.confirmPassword
                    ? "border-orange/50 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    : passwords.confirm && passwords.new === passwords.confirm
                    ? "border-teal/50 focus:border-teal focus:ring-2 focus:ring-teal/20"
                    : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-orange">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword}
              </p>
            )}
            {passwords.confirm && passwords.new === passwords.confirm && !errors.confirmPassword && (
              <p className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-teal">
                <CheckCircle2 className="w-3 h-3" />
                Passwords match
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-teal/5 border border-teal/15 p-4 text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Note:</strong> If you change your email,
        you will need to use the new email to sign in next time. Password changes
        take effect immediately.
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const logoSrc = mounted && resolvedTheme === "dark" ? "/dark-logo.webp" : "/light-logo.webp";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }
      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Login failed — check connection");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo — theme-aware */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <img
              src={logoSrc}
              alt="Snack Fruits"
              className="h-16 w-auto mx-auto mb-3 hover:opacity-80 transition-opacity"
            />
          </Link>
          <h1 className="font-serif-display text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage your website
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-teal/15 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm"
                placeholder="admin@snackfruits.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-full bg-orange text-white font-semibold text-sm hover:bg-orange-dark transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>


      </div>
    </div>
  );
}

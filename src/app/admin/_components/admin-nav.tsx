"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  Inbox,
  Download,
  FileText,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Globe,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/admin/products", label: "Products", icon: <Package className="w-4 h-4" /> },
  { href: "/admin/leads", label: "Leads", icon: <Inbox className="w-4 h-4" /> },
  { href: "/admin/downloads", label: "Downloads", icon: <Download className="w-4 h-4" /> },
  { href: "/admin/articles", label: "Articles", icon: <FileText className="w-4 h-4" /> },
  { href: "/admin/languages", label: "Languages", icon: <Globe className="w-4 h-4" /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="w-4 h-4" />, adminOnly: true },
  { href: "/admin/users", label: "Users", icon: <Users className="w-4 h-4" />, adminOnly: true },
];

export function AdminNav({
  user,
}: {
  user: { email: string; role: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const logoSrc = mounted && resolvedTheme === "dark" ? "/dark-logo.webp" : "/light-logo.webp";
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    toast.success("Signed out");
    router.push("/admin/login");
    router.refresh();
  };

  const filteredNav = NAV.filter((n) => !n.adminOnly || user.role === "admin");

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-card border-b border-teal/12 px-4 h-14 flex items-center justify-between">
        <Link href="/admin" className="font-serif-display font-bold">
          Snack Fruits
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="w-9 h-9 rounded-lg border border-teal/15 flex items-center justify-center"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-screen bg-card border-r border-teal/12 flex flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-teal/12">
          <img
            src={logoSrc}
            alt="Snack Fruits"
            className="h-12 w-auto"
          />
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 font-bold">
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-teal text-teal-foreground"
                    : "text-foreground/75 hover:bg-teal/10 hover:text-teal"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-teal/12 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/75 hover:bg-teal/10 hover:text-teal transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View website
          </a>
          <div className="px-3 py-2 text-[11px] text-muted-foreground">
            <div className="font-semibold text-foreground truncate">
              {user.email}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`inline-block w-2 h-2 rounded-full ${
                user.role === "admin" ? "bg-orange" : user.role === "editor" ? "bg-teal" : "bg-muted-foreground"
              }`} />
              <span className="capitalize font-semibold text-foreground">{user.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/75 hover:bg-orange/10 hover:text-orange transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

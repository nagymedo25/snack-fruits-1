"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNav, type PageId } from "./nav-provider";
import { useContent } from "./content";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLang } from "./language-provider";
import { Menu, X, Snowflake, Phone, Lock } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { page, navigate } = useNav();
  const c = useContent();
  const { dir } = useLang();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark ? "/dark-logo.webp" : "/light-logo.webp";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const scaleX = useSpring(scrollY, { stiffness: 120, damping: 30, restDelta: 0.001 });

  React.useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return () => unsub();
  }, [scrollY]);

  const items: { id: PageId; label: string }[] = [
    { id: "home", label: c.nav.home },
    { id: "products", label: c.nav.products },
    { id: "quality", label: c.nav.quality },
    { id: "gcc", label: c.nav.gcc },
    { id: "process", label: c.nav.process },
    { id: "private-label", label: c.nav.privateLabel },
    { id: "gallery", label: c.nav.gallery },
    { id: "contact", label: c.nav.contact },
  ];

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal via-orange to-teal origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Trust strip */}
      <div className="hidden md:block bg-teal text-white text-[11px] tracking-[0.18em] uppercase">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Snowflake className="w-3 h-3 animate-pulse" />
            <span>{c.trustStrip}</span>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-light animate-pulse" />
              -18°C
            </span>
            <span>Sun–Thu · 9:00–18:00 EET</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-teal/10 shadow-[0_8px_32px_-12px_rgba(31,111,95,0.15)]"
            : "bg-background/30 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => navigate("home")}
              className="group flex items-center gap-3"
              aria-label="Snack Fruits home"
            >
              <span className="relative overflow-hidden rounded-xl transition-transform group-hover:scale-105">
                <img
                  src={logoSrc}
                  alt="Snack Fruits logo"
                  width={154}
                  height={91}
                  className="h-12 lg:h-14 w-auto block"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <motion.span
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"
                  initial={{ x: "-150%", skewX: "-20deg" }}
                  whileHover={{ x: "150%" }}
                  transition={{ duration: 0.6 }}
                />
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {items.map((item) => {
                const active = page === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-teal"
                        : "text-foreground/75 hover:text-teal"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-orange rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => navigate("contact")}
                className="hidden sm:inline-flex shine-hover items-center gap-1.5 px-3 lg:px-4 h-9 rounded-full bg-orange text-orange-foreground font-semibold text-xs lg:text-sm shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
              >
                <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5" strokeWidth={2.4} />
                <span className="truncate">{c.nav.requestQuote}</span>
              </button>
              {/* Admin access — subtle icon, only visible on desktop */}
              <a
                href="/admin"
                aria-label="Admin panel"
                className="hidden lg:flex w-9 h-9 rounded-full border border-teal/20 items-center justify-center text-teal/40 hover:text-teal hover:border-teal/40 transition-colors"
                title="Admin"
              >
                <Lock className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                className="lg:hidden w-10 h-10 rounded-full border border-teal/25 flex items-center justify-center text-teal"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-teal/12"
          >
            <div className="px-4 py-4 space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.id);
                    setOpen(false);
                  }}
                  className={`w-full text-${dir === "rtl" ? "right" : "left"} px-4 py-3 rounded-lg text-sm font-medium ${
                    page === item.id
                      ? "bg-teal/10 text-teal"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  navigate("contact");
                  setOpen(false);
                }}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-orange text-orange-foreground font-semibold text-sm"
              >
                {c.nav.requestQuote}
              </button>
              <a
                href="/admin"
                onClick={() => setOpen(false)}
                className="w-full mt-1 px-4 py-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                Admin panel
              </a>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}

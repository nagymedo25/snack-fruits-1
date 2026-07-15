"use client";

import * as React from "react";
import { useNav, type PageId } from "./nav-provider";
import { useContent } from "./content";
import { useLang } from "./language-provider";
import { Snowflake, MapPin, Clock, Linkedin, Instagram, Facebook, MessageCircle, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSiteSettings } from "./use-site-settings";

export function Footer() {
  const { navigate } = useNav();
  const c = useContent();
  const { dir } = useLang();
  const { resolvedTheme } = useTheme();
  const siteSettings = useSiteSettings();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark ? "/dark-logo.webp" : "/light-logo.webp";

  const quickLinks: { id?: PageId; label: string; href?: string }[] = [
    { id: "products", label: c.nav.products },
    { id: "quality", label: c.nav.quality },
    { id: "gcc", label: c.nav.gcc },
    { id: "process", label: c.nav.process },
    { id: "contact", label: c.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="relative mt-auto bg-gradient-to-br from-[#F0EEE8] via-[#EDE9DF] to-[#E8E4D7] dark:from-[#131F1A] dark:via-[#0F1814] dark:to-[#0B1411] text-foreground overflow-hidden border-t border-teal/15">
      {/* Top wave divider */}
      <svg
        className="absolute top-0 left-0 right-0 -translate-y-px w-full h-12 text-background"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden
      >
        <path d="M0,30 C240,60 480,0 720,20 C960,40 1200,10 1440,30 L1440,0 L0,0 Z" />
      </svg>

      {/* Decorative teal tint dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal/30"
            style={{ left: `${(i * 9.3) % 100}%`, top: `${(i * 13.7) % 100}%` }}
            animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={logoSrc}
              alt="Snack Fruits logo"
              width={154}
              height={91}
              className="h-14 lg:h-16 w-auto mb-4"
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              {c.footer.summary}
            </p>
            <div className="flex items-center gap-2 mt-5 flex-wrap">
              {siteSettings.linkedin && <SocialIcon icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" href={siteSettings.linkedin} />}
              {siteSettings.instagram && <SocialIcon icon={<Instagram className="w-4 h-4" />} label="Instagram" href={siteSettings.instagram} />}
              {siteSettings.facebook && <SocialIcon icon={<Facebook className="w-4 h-4" />} label="Facebook" href={siteSettings.facebook} />}
              {siteSettings.snapchat && <SocialIcon icon={<MessageCircle className="w-4 h-4" />} label="Snapchat" href={siteSettings.snapchat} />}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif-display text-sm font-semibold uppercase tracking-wider mb-4 text-teal">
              {c.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.id ?? l.href}>
                  {l.href ? (
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-orange transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => l.id && navigate(l.id)}
                      className="text-sm text-muted-foreground hover:text-orange transition-colors text-left"
                    >
                      {l.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif-display text-sm font-semibold uppercase tracking-wider mb-4 text-teal">
              {c.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal" />
                <span dir="ltr">{siteSettings.whatsappDisplay}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#1a8842] font-semibold">
                  {dir === "rtl" ? "واتساب" : "WhatsApp"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal" />
                <span>{siteSettings.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal" />
                <span>{siteSettings.workingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal" />
                <a href="mailto:info@snack-fruits.com" className="hover:text-orange transition-colors">
                  info@snack-fruits.com
                </a>
              </li>
            </ul>
          </div>

          {/* Trust note */}
          <div>
            <h3 className="font-serif-display text-sm font-semibold uppercase tracking-wider mb-4 text-teal">
              {dir === "rtl" ? "ثقة" : "Trust"}
            </h3>
            <div className="rounded-xl bg-teal/8 border border-teal/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Snowflake className="w-4 h-4 text-orange" />
                <span className="text-sm font-semibold text-foreground">-18°C Cold Chain</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{c.footer.trust}</p>
            </div>
            <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-teal transition-colors">
                  · {dir === "rtl" ? "من نحن" : "About Us"}
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-teal transition-colors">
                  · {dir === "rtl" ? "مقالات" : "Articles"}
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-teal transition-colors">
                  · {c.footer.privacy}
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-teal transition-colors">
                  · {c.footer.terms}
                </a>
              </li>
              <li>· © {new Date().getFullYear()} Snack Fruits · {c.footer.rights}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const cls = "w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-teal/10 hover:bg-teal text-teal hover:text-teal-foreground";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cls}
      >
        {icon}
      </a>
    );
  }
  return (
    <span aria-label={label} className={cls}>
      {icon}
    </span>
  );
}

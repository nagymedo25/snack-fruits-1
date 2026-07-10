"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { useContent } from "./content";
import { useLang } from "./language-provider";
import { useSiteSettings } from "./use-site-settings";

// WhatsApp official brand glyph
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// Egyptian WhatsApp number — read from DB settings at runtime
export function WhatsAppFloat() {
  const c = useContent();
  const { dir } = useLang();
  const siteSettings = useSiteSettings();
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const msg = encodeURIComponent(c.whatsapp.msg);
  const href = `https://wa.me/${siteSettings.whatsappNumber}?text=${msg}`;

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.9 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-1 left-16 w-72 rounded-2xl bg-card border border-teal/15 shadow-2xl overflow-hidden"
          >
            <div className="bg-[#25D366] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">{c.whatsapp.label}</div>
                <div className="text-[11px] opacity-90" dir="ltr">{siteSettings.whatsappDisplay}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-4">
              <div className="bg-muted rounded-xl rounded-tl-none p-3 text-xs leading-relaxed">
                {c.whatsapp.msg}
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 h-10 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1FB855] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {dir === "rtl" ? "ابدأ المحادثة" : "Start chat"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={
          hovered
            ? { y: [0, -10, 0, -6, 0], rotate: [0, -8, 8, -4, 0] }
            : { y: 0, rotate: 0 }
        }
        transition={
          hovered
            ? { duration: 0.6, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/50 flex items-center justify-center"
        aria-label={c.whatsapp.label}
      >
        {/* Pulsing ring (gentle, runs always) */}
        {!hovered && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
            />
          </>
        )}
        <WhatsAppIcon className="w-7 h-7 relative z-10" />
      </motion.button>
    </div>
  );
}

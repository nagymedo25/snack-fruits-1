"use client";

import { useLang } from "./language-provider";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="relative px-3 h-10 rounded-full border border-teal/25 bg-background/60 hover:bg-teal/10 transition-colors flex items-center gap-2 overflow-hidden group"
    >
      <Languages className="w-4 h-4 text-teal" strokeWidth={2.2} />
      <motion.span
        key={lang}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 14, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="text-xs font-semibold tracking-wide text-foreground"
      >
        {lang === "en" ? "العربية" : "EN"}
      </motion.span>
    </button>
  );
}

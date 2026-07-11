"use client";

import * as React from "react";
import { useDBContent, getDBOverride, invalidateContentCache } from "./use-db-content";

export type Lang = "en" | "ar";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  dir: "ltr" | "rtl";
  t: (en: string, ar: string) => string;
};

const LanguageContext = React.createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");
  const dbContent = useDBContent();

  React.useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("sf-lang")) as Lang | null;
    if (saved === "en" || saved === "ar") {
      setLangState(saved);
    }
  }, []);

  React.useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (typeof window !== "undefined") localStorage.setItem("sf-lang", lang);
  }, [lang]);

  const setLang = React.useCallback((l: Lang) => setLangState(l), []);
  const toggle = React.useCallback(() => setLangState((p) => (p === "en" ? "ar" : "en")), []);

  // The `t()` function checks DB overrides first, then falls back to hardcoded values.
  // This makes admin edits in the Languages page reflect live on the site.
  const t = React.useCallback(
    (en: string, ar: string) => {
      // Check if there's a DB override for this string
      const dbValue = getDBOverride(dbContent, en, lang);
      if (dbValue !== null) return dbValue;
      // Fall back to hardcoded value
      return lang === "ar" ? ar : en;
    },
    [lang, dbContent]
  );

  const value = React.useMemo(
    () => ({ lang, setLang, toggle, dir: (lang === "ar" ? "rtl" : "ltr") as "ltr" | "rtl", t }),
    [lang, setLang, toggle, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export { invalidateContentCache };

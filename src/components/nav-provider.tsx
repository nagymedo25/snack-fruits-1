"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type PageId =
  | "home"
  | "products"
  | "quality"
  | "gcc"
  | "process"
  | "private-label"
  | "gallery"
  | "contact";

type NavCtx = {
  page: PageId;
  navigate: (p: PageId) => void;
};

const Ctx = createContext<NavCtx | null>(null);

export function useNav() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useNav must be used inside NavProvider");
  return c;
}

export function NavProvider({ children, floating }: { children: ReactNode; floating?: ReactNode }) {
  const [page, setPage] = useState<PageId>("home");

  const navigate = useCallback((p: PageId) => {
    setPage(p);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => {
      const hash = window.location.hash.replace("#", "") as PageId;
      if (hash) setPage(hash);
    };
    window.addEventListener("hashchange", onPop);
    return () => window.removeEventListener("hashchange", onPop);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${page}`);
    }
  }, [page]);

  return (
    <Ctx.Provider value={{ page, navigate }}>
      {/* No motion wrapper — page transitions cause stacking-context issues
          and visual glitches on mobile GPUs. Plain div keeps things clean. */}
      <div key={page}>
        {children}
      </div>
      {/* Floating elements — kept OUTSIDE so position:fixed stays anchored
          to the viewport. */}
      {floating}
    </Ctx.Provider>
  );
}

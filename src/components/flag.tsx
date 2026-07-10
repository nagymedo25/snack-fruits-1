"use client";

import * as React from "react";

type FlagCode = "SA" | "AE" | "KW" | "QA" | "BH" | "OM" | "EG";

// Map ISO 3166 alpha-2 codes to local official flag SVG files
// (downloaded from flagcdn.com — the open-source mirror of official
// vector flags from Wikipedia Commons, accurate to official spec).
const FLAG_PATH: Record<FlagCode, string> = {
  SA: "/flags/sa.svg",
  AE: "/flags/ae.svg",
  KW: "/flags/kw.svg",
  QA: "/flags/qa.svg",
  BH: "/flags/bh.svg",
  OM: "/flags/om.svg",
  EG: "/flags/eg.svg",
};

const FLAG_LABEL: Record<FlagCode, string> = {
  SA: "Kingdom of Saudi Arabia flag",
  AE: "United Arab Emirates flag",
  KW: "State of Kuwait flag",
  QA: "State of Qatar flag",
  BH: "Kingdom of Bahrain flag",
  OM: "Sultanate of Oman flag",
  EG: "Arab Republic of Egypt flag",
};

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  const common = "block w-full h-full object-cover";
  const cls = className ?? common;
  const path = FLAG_PATH[code];
  const label = FLAG_LABEL[code];

  return (
    <img
      src={path}
      alt={label}
      className={cls}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

export const FLAG_CODES: FlagCode[] = ["SA", "AE", "KW", "QA", "BH", "OM"];

"use client";

import * as React from "react";

/**
 * Fetches all site text content from the DB via /api/content.
 * Uses a reverse-lookup map (byValue) so the t() function can find
 * DB overrides by matching the hardcoded English string.
 * Cache is invalidated every time the admin saves content.
 */

type ContentByValue = Record<string, { en: string; ar: string }>;

let cachedByValue: ContentByValue | null = null;
let fetchVersion = 0; // bumped to force re-fetch

/** Force a re-fetch of content on next render cycle */
export function invalidateContentCache() {
  cachedByValue = null;
  fetchVersion++;
}

export function useDBContent() {
  const [content, setContent] = React.useState<ContentByValue>(cachedByValue || {});
  const versionRef = React.useRef(fetchVersion);

  React.useEffect(() => {
    // If cache was invalidated, re-fetch
    if (cachedByValue && versionRef.current === fetchVersion) {
      setContent(cachedByValue);
      return;
    }

    let cancelled = false;
    // Add a cache-busting param to bypass any HTTP caching
    fetch(`/api/content?_v=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok && data.byValue) {
          cachedByValue = data.byValue as ContentByValue;
          versionRef.current = fetchVersion;
          setContent(cachedByValue);
        }
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [fetchVersion]);

  return content;
}

/**
 * Look up a DB override for a given English string.
 * Returns the DB value if found, null otherwise.
 */
export function getDBOverride(
  content: ContentByValue,
  en: string,
  lang: "en" | "ar"
): string | null {
  if (!content || Object.keys(content).length === 0) return null;
  const entry = content[en];
  if (entry) {
    return lang === "ar" ? (entry.ar || entry.en) : (entry.en || en);
  }
  return null;
}

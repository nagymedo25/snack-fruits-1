"use client";

import Script from "next/script";
import * as React from "react";

/**
 * Google Analytics 4 — reads Measurement ID from NEXT_PUBLIC_GA4_ID env var.
 * If not set, the script is skipped (no console errors).
 *
 * To enable: set NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX in your environment.
 * To get an ID: https://analytics.google.com/ → Admin → Create Property → GA4.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Type the gtag function on window
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname + window.location.hash,
          });
        `}
      </Script>
    </>
  );
}

// === Event tracking helpers ===
// Call these from buttons/links to track key conversions.

export function trackEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.gtag || !GA_ID) return;
  window.gtag("event", event, params);
}

// Pre-built events matching the PDF's KPI requirements
export const analytics = {
  ctaClick: (ctaName: string, location: string) =>
    trackEvent("cta_click", { cta_name: ctaName, location }),
  videoPlay: () => trackEvent("video_play", { video_name: "promo" }),
  formSubmit: (product?: string) =>
    trackEvent("form_submit", { form: "inquiry", product }),
  download: (fileName: string, fileType: string) =>
    trackEvent("file_download", { file_name: fileName, file_type: fileType }),
  languageToggle: (lang: string) =>
    trackEvent("language_toggle", { language: lang }),
  themeToggle: (theme: string) => trackEvent("theme_toggle", { theme }),
  navClick: (page: string) => trackEvent("navigation", { page }),
  whatsappClick: () => trackEvent("whatsapp_click", { source: "float_button" }),
};

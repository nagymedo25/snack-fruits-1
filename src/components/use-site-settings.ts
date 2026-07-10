"use client";

import * as React from "react";

export type SiteSettings = {
  whatsappNumber: string;
  whatsappDisplay: string;
  officialEmail: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  snapchat: string;
  location: string;
  workingHours: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "201039007939",
  whatsappDisplay: "+20 103 900 7939",
  officialEmail: "",
  facebook: "https://www.facebook.com/profile.php?id=61591565991093",
  linkedin: "https://www.linkedin.com/in/snack-fruits-01a562419/",
  instagram: "https://www.instagram.com/snack_fruits_ksa",
  snapchat: "https://accounts.snapchat.com/v2/welcome",
  location: "Egypt — serving GCC",
  workingHours: "Sun–Thu · 9:00–18:00 EET",
};

// Cache the fetched settings so we only hit the API once
let cachedSettings: SiteSettings | null = null;
let fetchPromise: Promise<SiteSettings> | null = null;

export function useSiteSettings() {
  const [settings, setSettings] = React.useState<SiteSettings>(
    cachedSettings || DEFAULT_SETTINGS
  );

  React.useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data.ok && data.settings) {
            cachedSettings = { ...DEFAULT_SETTINGS, ...data.settings };
            return cachedSettings;
          }
          return DEFAULT_SETTINGS;
        })
        .catch(() => DEFAULT_SETTINGS);
    }

    fetchPromise.then((s) => setSettings(s));
  }, []);

  return settings;
}

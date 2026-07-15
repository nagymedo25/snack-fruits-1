import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://snackfruits.com";
  const now = new Date();

  const routes = [
    { url: `${base}/`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/#products`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/#quality`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/#gcc`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/#process`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/#private-label`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/#gallery`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/blog`, priority: 0.6, changeFrequency: "weekly" as const },
  ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

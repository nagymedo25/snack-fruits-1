import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin", "/api/inquiry"],
      },
    ],
    sitemap: "https://snackfruits.com/sitemap.xml",
    host: "https://snackfruits.com",
  };
}

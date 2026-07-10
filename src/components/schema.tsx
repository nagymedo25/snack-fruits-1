import { db } from "@/lib/db";

/**
 * JSON-LD structured data for SEO (Organization, Product, FAQ, Breadcrumb).
 * Rendered server-side and injected into the page as <script type="application/ld+json">.
 * This boosts Google rich results eligibility per the PDF's SEO requirements.
 */

const SITE_URL = "https://snackfruits.com";

export async function OrganizationSchema() {
  let whatsapp = "+201039007939";
  let linkedin = "https://www.linkedin.com/in/snack-fruits-01a562419/";
  let instagram = "https://www.instagram.com/snack_fruits_ksa";
  let facebook = "https://www.facebook.com/profile.php?id=61591565991093";
  let snapchat = "https://accounts.snapchat.com/v2/welcome";

  try {
    const settings = await db.setting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value || "";
    if (map.whatsappNumber) whatsapp = map.whatsappNumber;
    if (map.linkedin) linkedin = map.linkedin;
    if (map.instagram) instagram = map.instagram;
    if (map.facebook) facebook = map.facebook;
    if (map.snapchat) snapchat = map.snapchat;
  } catch {
    // DB not available in some build contexts — use defaults above
  }

  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Snack Fruits",
    url: SITE_URL,
    logo: `${SITE_URL}/light-logo.webp`,
    description:
      "Egypt-based IQF frozen fruits export company serving GCC buyers with premium frozen fruit products, clear specifications, reliable communication and export-ready cold-chain handling.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressRegion: "Egypt",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${whatsapp}`,
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [linkedin, instagram, facebook, snapchat].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export async function ProductSchema() {
  let products: Array<{
    slug: string;
    nameEn: string;
    shortEn: string;
    storage: string | null;
  }> = [];

  try {
    products = await db.product.findMany({
      where: { published: true },
      select: { slug: true, nameEn: true, shortEn: true, storage: true },
    });
  } catch {
    // DB unavailable
  }

  const json = products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nameEn,
    description: p.shortEn,
    brand: { "@type": "Brand", name: "Snack Fruits" },
    category: "Frozen Food",
    url: `${SITE_URL}/#products`,
    additionalProperty: p.storage
      ? [{ "@type": "PropertyValue", name: "Storage", value: p.storage }]
      : [],
  }));

  if (json.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function FAQSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is IQF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IQF stands for Individually Quick Frozen — a method that freezes each piece of fruit separately, preserving natural taste, color and texture without clumping.",
        },
      },
      {
        "@type": "Question",
        name: "What products does Snack Fruits export?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IQF Mango Cubes, IQF Mango Slices, IQF Strawberry, Mixed Fruits blends, and Seasonal Fruits — all sourced and frozen in Egypt, exported to GCC markets.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cold chain temperature?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All products are kept at ≤ -18°C throughout the cold chain: IQF freezing → cold storage → reefer loading → temperature-controlled shipping → GCC arrival.",
        },
      },
      {
        "@type": "Question",
        name: "Which GCC markets do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We serve all six GCC markets: Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Bahrain, and Oman.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer private label packaging?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we offer bulk cartons, retail packs, custom pack sizes, and Arabic/English labels under your own brand, suitable for GCC modern trade.",
        },
      },
      {
        "@type": "Question",
        name: "How do I request a quotation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the contact form on our website, send product type, quantity, destination port, packing type, and target use. Our export team responds within one business day with specs and indicative pricing.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function BreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

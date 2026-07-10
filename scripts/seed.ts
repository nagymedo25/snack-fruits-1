/**
 * Seed script — creates default admin user + default products.
 * Run with: bun run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ===== 1. Create default admin user =====
  const adminEmail = "admin@snackfruits.com";
  const adminPassword = "admin12345";
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Snack Fruits Admin",
      password: hashed,
      role: "admin",
    },
  });
  console.log(`✅ Admin user created: ${adminEmail} / ${adminPassword}`);

  // ===== 2. Create default products =====
  const products = [
    {
      slug: "mango-cubes",
      nameEn: "IQF Mango Cubes",
      nameAr: "مكعبات مانجو IQF",
      shortEn: "Premium Egyptian mango cubes for juices, smoothies, dairy and bakeries.",
      shortAr: "مكعبات مانجو مصرية فاخرة للعصائر والسموذي والألبان والمخبوزات.",
      usesEn: "Juices · Smoothies · Desserts · Bakeries · Dairy",
      usesAr: "عصائر · سموذي · حلويات · مخبوزات · ألبان",
      tagsEn: JSON.stringify(["Bulk", "HoReCa", "Retail"]),
      tagsAr: JSON.stringify(["جملة", "HoReCa", "تجزئة"]),
      ctaEn: "Request Specs",
      ctaAr: "اطلب المواصفات",
      cutsEn: JSON.stringify(["8mm cubes", "10mm cubes", "12mm cubes", "Custom cut"]),
      cutsAr: JSON.stringify(["8mm مكعبات", "10mm مكعبات", "12mm مكعبات", "حسب الطلب"]),
      varietiesEn: JSON.stringify(["Seddika", "Ewais", "Alphonso (subject to availability)"]),
      varietiesAr: JSON.stringify(["Seddika", "Ewais", "Alphonso (حسب التوفر)"]),
      packingEn: JSON.stringify(["10kg cartons", "1kg retail bags", "2kg HoReCa bags", "Custom packing"]),
      packingAr: JSON.stringify(["كراتين 10kg", "أكياس 1kg تجزئة", "أكياس 2kg HoReCa", "تعبئة مخصصة"]),
      storage: "≤ -18°C",
      shelfLife: "24 months from production",
      imageUrl: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=800&q=70",
      loadingQty: "1,800 cartons / 20ft container",
      order: 1,
    },
    {
      slug: "mango-slices",
      nameEn: "IQF Mango Slices",
      nameAr: "شرائح مانجو IQF",
      shortEn: "Selected slices prepared for distributors, food service and private-label buyers.",
      shortAr: "شرائح مختارة للموزعين وخدمات الأغذية والمشترين بعلامة خاصة.",
      usesEn: "Hotels · Restaurants · Desserts · Retail packs",
      usesAr: "فنادق · مطاعم · حلويات · عبوات تجزئة",
      tagsEn: JSON.stringify(["Food Service", "Private Label"]),
      tagsAr: JSON.stringify(["خدمات أغذية", "علامة خاصة"]),
      ctaEn: "Request Specs",
      ctaAr: "اطلب المواصفات",
      cutsEn: JSON.stringify(["Thin slices", "Medium slices", "Thick slices"]),
      cutsAr: JSON.stringify(["شرائح رفيعة", "شرائح متوسطة", "شرائح سميكة"]),
      varietiesEn: JSON.stringify(["Seddika", "Ewais"]),
      varietiesAr: JSON.stringify(["Seddika", "Ewais"]),
      packingEn: JSON.stringify(["10kg cartons", "500g retail packs", "2kg HoReCa packs"]),
      packingAr: JSON.stringify(["كراتين 10kg", "عبوات تجزئة 500g", "عبوات HoReCa 2kg"]),
      storage: "≤ -18°C",
      shelfLife: "24 months from production",
      imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=70",
      loadingQty: "1,800 cartons / 20ft container",
      order: 2,
    },
    {
      slug: "strawberry",
      nameEn: "IQF Strawberry",
      nameAr: "فراولة IQF",
      shortEn: "Whole, halves, slices or diced — for dairy, bakery, juice and ice cream partners.",
      shortAr: "كاملة، أنصاف، شرائح أو مكعبات — لشركاء الألبان والمخبوزات والعصائر والآيس كريم.",
      usesEn: "Dairy · Pastry · Juice · Ice Cream · Frozen Desserts",
      usesAr: "ألبان · معجنات · عصائر · آيس كريم · حلويات مجمدة",
      tagsEn: JSON.stringify(["Industrial", "HoReCa"]),
      tagsAr: JSON.stringify(["صناعي", "HoReCa"]),
      ctaEn: "Request Specs",
      ctaAr: "اطلب المواصفات",
      cutsEn: JSON.stringify(["Whole", "Halves", "Slices", "Diced"]),
      cutsAr: JSON.stringify(["كاملة", "أنصاف", "شرائح", "مكعبات"]),
      varietiesEn: JSON.stringify(["Fortuna", "Camarosa (seasonal)"]),
      varietiesAr: JSON.stringify(["Fortuna", "Camarosa (حسب الموسم)"]),
      packingEn: JSON.stringify(["10kg industrial cartons", "1kg retail", "500g HoReCa"]),
      packingAr: JSON.stringify(["كراتين 10kg صناعية", "1kg تجزئة", "500g HoReCa"]),
      storage: "≤ -18°C",
      shelfLife: "24 months from production",
      imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=70",
      loadingQty: "1,800 cartons / 20ft container",
      order: 3,
    },
    {
      slug: "mixed-fruits",
      nameEn: "Mixed Fruits Blend",
      nameAr: "خلطات فواكه",
      shortEn: "Custom blends for restaurants, supermarkets, and private label.",
      shortAr: "خلطات مخصصة للمطاعم والسوبرماركت والعلامة الخاصة.",
      usesEn: "Restaurants · Supermarkets · Private Label",
      usesAr: "مطاعم · سوبرماركت · علامة خاصة",
      tagsEn: JSON.stringify(["Custom Blends"]),
      tagsAr: JSON.stringify(["خلطات مخصصة"]),
      ctaEn: "Discuss Custom Mix",
      ctaAr: "ناقش خلطة مخصصة",
      cutsEn: JSON.stringify(["Custom ratios", "Uniform cut size"]),
      cutsAr: JSON.stringify(["نسب مخصصة", "حجم قطع موحد"]),
      varietiesEn: JSON.stringify(["Mango + strawberry", "Red fruits", "Tropical blends", "Seasonal"]),
      varietiesAr: JSON.stringify(["مانجو + فراولة", "فواكه حمراء", "خلطات استوائية", "حسب الموسم"]),
      packingEn: JSON.stringify(["10kg cartons", "Custom packing"]),
      packingAr: JSON.stringify(["كراتين 10kg", "تعبئة مخصصة"]),
      storage: "≤ -18°C",
      shelfLife: "24 months from production",
      imageUrl: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=800&q=70",
      order: 4,
    },
    {
      slug: "seasonal-fruits",
      nameEn: "Seasonal Fruits",
      nameAr: "فواكه موسمية",
      shortEn: "Seasonal supply — flexible options based on availability and demand.",
      shortAr: "توريد موسمي — خيارات مرنة حسب التوفر والطلب.",
      usesEn: "All channels — subject to availability",
      usesAr: "كل القنوات — حسب التوفر",
      tagsEn: JSON.stringify(["Seasonal"]),
      tagsAr: JSON.stringify(["موسمي"]),
      ctaEn: "Request Seasonal Availability",
      ctaAr: "اطلب التوفر الموسمي",
      cutsEn: JSON.stringify(["Subject to season"]),
      cutsAr: JSON.stringify(["حسب الموسم"]),
      varietiesEn: JSON.stringify(["Subject to availability — no overpromising"]),
      varietiesAr: JSON.stringify(["حسب التوفر — بدون وعود زائدة"]),
      packingEn: JSON.stringify(["Subject to product and quantity"]),
      packingAr: JSON.stringify(["حسب المنتج والكمية"]),
      storage: "≤ -18°C",
      shelfLife: "24 months from production",
      imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=70",
      order: 5,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✅ ${products.length} products seeded`);

  // ===== 3. Create default downloads =====
  const downloads = [
    {
      slug: "product-list",
      titleEn: "Product List",
      titleAr: "قائمة المنتجات",
      descriptionEn: "Complete list of available IQF products with general info.",
      descriptionAr: "قائمة كاملة بالمنتجات المتاحة مع معلومات عامة.",
      fileUrl: "/downloads/product-list.pdf",
      fileType: "pdf",
      version: "v1.0 — 2026",
      gated: true,
    },
    {
      slug: "company-profile",
      titleEn: "Company Profile",
      titleAr: "الملف التعريفي للشركة",
      descriptionEn: "Short PDF sent to buyers after inquiry.",
      descriptionAr: "نسخة مختصرة ترسل للمشترين بعد الاستفسار.",
      fileUrl: "/downloads/company-profile.pdf",
      fileType: "pdf",
      version: "v1.0 — 2026",
      gated: true,
    },
    {
      slug: "packaging-options",
      titleEn: "Packaging Options",
      titleAr: "خيارات التعبئة",
      descriptionEn: "PDF showing bulk/retail/private label options.",
      descriptionAr: "ملف يوضح خيارات الجملة/التجزئة/العلامة الخاصة.",
      fileUrl: "/downloads/packaging-options.pdf",
      fileType: "pdf",
      version: "v1.0 — 2026",
      gated: true,
    },
  ];

  for (const d of downloads) {
    await prisma.download.upsert({
      where: { slug: d.slug },
      update: d,
      create: d,
    });
  }
  console.log(`✅ ${downloads.length} downloads seeded`);

  // ===== 4. Create default settings =====
  const settings = [
    { key: "siteName", value: "Snack Fruits" },
    { key: "whatsappNumber", value: "201039007939" },
    { key: "whatsappDisplay", value: "+20 103 900 7939" },
    { key: "facebook", value: "https://www.facebook.com/profile.php?id=61591565991093" },
    { key: "linkedin", value: "https://www.linkedin.com/in/snack-fruits-01a562419/" },
    { key: "instagram", value: "https://www.instagram.com/snack_fruits_ksa" },
    { key: "snapchat", value: "https://accounts.snapchat.com/v2/welcome" },
    { key: "ga4MeasurementId", value: "" },
    { key: "emailService", value: "" },
    { key: "officialEmail", value: "" },
    { key: "location", value: "Egypt — serving GCC" },
    { key: "workingHours", value: "Sun–Thu · 9:00–18:00 EET" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log(`✅ ${settings.length} settings seeded`);

  console.log("\n🎉 Seed complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin login:");
  console.log("  URL: /admin");
  console.log("  Email: admin@snackfruits.com");
  console.log("  Password: admin12345");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

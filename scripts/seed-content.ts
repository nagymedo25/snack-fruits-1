/**
 * Seed SiteText table with key translatable strings from the website.
 * Run with: bun run scripts/seed-content.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const texts: Array<{ section: string; key: string; label: string; originalEn: string; valueEn: string; valueAr: string }> = [
  // === Trust Strip ===
  { section: "trustStrip", key: "trustStrip.text", label: "Trust Strip Text", originalEn: "Export-ready IQF fruits from Egypt to GCC markets", valueEn: "Export-ready IQF fruits from Egypt to GCC markets", valueAr: "فواكه IQF مجمدة جاهزة للتصدير من مصر إلى أسواق الخليج" },

  // === Nav ===
  { section: "nav", key: "nav.home", label: "Nav: Home", originalEn: "Home", valueEn: "Home", valueAr: "الرئيسية" },
  { section: "nav", key: "nav.products", label: "Nav: Products", originalEn: "Products", valueEn: "Products", valueAr: "المنتجات" },
  { section: "nav", key: "nav.quality", label: "Nav: Quality", originalEn: "Quality & Cold Chain", valueEn: "Quality & Cold Chain", valueAr: "الجودة وسلسلة التبريد" },
  { section: "nav", key: "nav.gcc", label: "Nav: GCC Markets", originalEn: "GCC Markets", valueEn: "GCC Markets", valueAr: "أسواق الخليج" },
  { section: "nav", key: "nav.process", label: "Nav: Export Process", originalEn: "Export Process", valueEn: "Export Process", valueAr: "عملية التصدير" },
  { section: "nav", key: "nav.privateLabel", label: "Nav: Private Label", originalEn: "Private Label", valueEn: "Private Label", valueAr: "العلامة الخاصة" },
  { section: "nav", key: "nav.gallery", label: "Nav: Gallery", originalEn: "Gallery", valueEn: "Gallery", valueAr: "المعرض" },
  { section: "nav", key: "nav.contact", label: "Nav: Contact", originalEn: "Contact", valueEn: "Contact", valueAr: "تواصل" },
  { section: "nav", key: "nav.requestQuote", label: "Nav: Request Quote CTA", originalEn: "Request a Quotation", valueEn: "Request a Quotation", valueAr: "اطلب عرض سعر" },

  // === Hero ===
  { section: "hero", key: "hero.badge", label: "Hero Badge", originalEn: "Egypt → GCC · B2B Export", valueEn: "Egypt → GCC · B2B Export", valueAr: "مصر → الخليج · تصدير B2B" },
  { section: "hero", key: "hero.title1", label: "Hero Title Line 1", originalEn: "Premium IQF Fruits", valueEn: "Premium IQF Fruits", valueAr: "فواكه IQF مجمدة" },
  { section: "hero", key: "hero.title2", label: "Hero Title Line 2", originalEn: "Exported from Egypt to GCC", valueEn: "Exported from Egypt to GCC", valueAr: "من مصر إلى اسواق" },
  { section: "hero", key: "hero.subtitle", label: "Hero Subtitle", originalEn: "Mango cubes, slices, strawberries and seasonal fruits — frozen at peak freshness, packaged for serious B2B buyers across the Gulf.", valueEn: "Mango cubes, slices, strawberries and seasonal fruits — frozen at peak freshness, packaged for serious B2B buyers across the Gulf.", valueAr: "مكعبات وشرائح مانجو، فراولة، وفواكه موسمية — مجمدة في قمة نضجها، معبأة للمشترين الجادين في الخليج." },
  { section: "hero", key: "hero.cta1", label: "Hero CTA 1", originalEn: "Request a Quotation", valueEn: "Request a Quotation", valueAr: "اطلب عرض سعر" },
  { section: "hero", key: "hero.cta2", label: "Hero CTA 2", originalEn: "Watch Company Intro", valueEn: "Watch Company Intro", valueAr: "شاهد تعريف الشركة" },
  { section: "hero", key: "hero.proof1", label: "Hero Proof 1", originalEn: "-18°C Cold Chain", valueEn: "-18°C Cold Chain", valueAr: "سلسلة تبريد -18°C" },
  { section: "hero", key: "hero.proof2", label: "Hero Proof 2", originalEn: "6 GCC Markets", valueEn: "6 GCC Markets", valueAr: "6 أسواق خليجية" },
  { section: "hero", key: "hero.proof3", label: "Hero Proof 3", originalEn: "Bulk & Private Label", valueEn: "Bulk & Private Label", valueAr: "تعبئة جملة وعلامة خاصة" },

  // === Products ===
  { section: "products", key: "products.kicker", label: "Products Kicker", originalEn: "Product range", valueEn: "Product range", valueAr: "نطاق المنتجات" },
  { section: "products", key: "products.title", label: "Products Title", originalEn: "Frozen at peak, exported with precision", valueEn: "Frozen at peak, exported with precision", valueAr: "تجميد في القمة، تصدير بدقة" },
  { section: "products", key: "products.desc", label: "Products Description", originalEn: "Every product is IQF-frozen to preserve natural taste, color and texture. Specify cut size, packing and quantity — we'll quote accordingly.", valueEn: "Every product is IQF-frozen to preserve natural taste, color and texture. Specify cut size, packing and quantity — we'll quote accordingly.", valueAr: "كل منتج يُجمد بتقنية IQF للحفاظ على الطعم واللون والملمس الطبيعي. حدد حجم القطع والتعبئة والكمية — وسنرسل عرض السعر." },

  // === Quality ===
  { section: "quality", key: "quality.kicker", label: "Quality Kicker", originalEn: "Quality & cold chain", valueEn: "Quality & cold chain", valueAr: "الجودة وسلسلة التبريد" },
  { section: "quality", key: "quality.title", label: "Quality Title", originalEn: "Controlled from field to reefer", valueEn: "Controlled from field to reefer", valueAr: "تحكم من المزرعة إلى الكونتينر المبرد" },
  { section: "quality", key: "quality.desc", label: "Quality Description", originalEn: "Quality is not a slogan — it's a documented chain. Sourcing control, sorting, IQF freezing, export packaging, and temperature-monitored shipping all the way to GCC arrival.", valueEn: "Quality is not a slogan — it's a documented chain. Sourcing control, sorting, IQF freezing, export packaging, and temperature-monitored shipping all the way to GCC arrival.", valueAr: "الجودة ليست شعاراً — هي سلسلة موثقة. تحكم في المصادر، فرز، تجميد IQF، تعبئة تصدير، وشحن مراقب الحرارة حتى الوصول للخليج." },

  // === GCC ===
  { section: "gcc", key: "gcc.kicker", label: "GCC Kicker", originalEn: "GCC coverage", valueEn: "GCC coverage", valueAr: "التغطية الخليجية" },
  { section: "gcc", key: "gcc.title", label: "GCC Title", originalEn: "One supplier from Egypt serving all six GCC markets", valueEn: "One supplier from Egypt serving all six GCC markets", valueAr: "مورد واحد من مصر يخدم كل أسواق الخليج الستة" },
  { section: "gcc", key: "gcc.desc", label: "GCC Description", originalEn: "From Jeddah to Muscat, Dubai to Doha — we understand GCC importers: fast communication, consistent quality, English/Arabic labeling and reefer logistics.", valueEn: "From Jeddah to Muscat, Dubai to Doha — we understand GCC importers: fast communication, consistent quality, English/Arabic labeling and reefer logistics.", valueAr: "من جدة إلى مسقط، دبي إلى الدوحة — نحن نفهم المستوردين الخليجيين: تواصل سريع، جودة ثابتة، تعبئة إنجليزية/عربية، ولوجستيات مبردة." },
  { section: "gcc", key: "gcc.cta", label: "GCC CTA", originalEn: "Select your country and send inquiry", valueEn: "Select your country and send inquiry", valueAr: "اختر دولتك وأرسل استفسارك" },

  // === Process ===
  { section: "process", key: "process.kicker", label: "Process Kicker", originalEn: "How we work", valueEn: "How we work", valueAr: "كيف نعمل" },
  { section: "process", key: "process.title", label: "Process Title", originalEn: "Six steps from inquiry to shipping", valueEn: "Six steps from inquiry to shipping", valueAr: "ست خطوات من الاستفسار إلى الشحن" },
  { section: "process", key: "process.desc", label: "Process Description", originalEn: "Clear process reduces hesitation. Here is exactly how a Snack Fruits export deal moves — from your first message to a loaded reefer.", valueEn: "Clear process reduces hesitation. Here is exactly how a Snack Fruits export deal moves — from your first message to a loaded reefer.", valueAr: "عملية واضحة تقلل التردد. هكذا تتحرك صفقة تصدير مع Snack Fruits — من رسالتك الأولى حتى تحميل الكونتينر المبرد." },

  // === Private Label ===
  { section: "privateLabel", key: "privateLabel.kicker", label: "Private Label Kicker", originalEn: "Private label & packaging", valueEn: "Private label & packaging", valueAr: "العلامة الخاصة والتعبئة" },
  { section: "privateLabel", key: "privateLabel.title", label: "Private Label Title", originalEn: "Your brand on premium IQF fruits", valueEn: "Your brand on premium IQF fruits", valueAr: "علامتك على فواكه IQF فاخرة" },
  { section: "privateLabel", key: "privateLabel.cta", label: "Private Label CTA", originalEn: "Discuss packaging options", valueEn: "Discuss packaging options", valueAr: "ناقش خيارات التعبئة" },

  // === Gallery ===
  { section: "gallery", key: "gallery.kicker", label: "Gallery Kicker", originalEn: "Gallery & media", valueEn: "Gallery & media", valueAr: "المعرض والوسائط" },
  { section: "gallery", key: "gallery.title", label: "Gallery Title", originalEn: "Real export, real cold chain, real crates", valueEn: "Real export, real cold chain, real crates", valueAr: "تصدير حقيقي، سلسلة تبريد حقيقية، كراتين حقيقية" },
  { section: "gallery", key: "gallery.desc", label: "Gallery Description", originalEn: "No cheap stock. Frozen product shots, packing, cold storage, reefer containers — clean lighting, teal/cream backgrounds, no over-filtered images.", valueEn: "No cheap stock. Frozen product shots, packing, cold storage, reefer containers — clean lighting, teal/cream backgrounds, no over-filtered images.", valueAr: "بدون صور ستوك رخيصة. لقطات منتج مجمد، تعبئة، مخزن مبرد، كونتينر — إضاءة نظيفة، خلفيات teal/cream، بدون فلاتر مبالغة." },

  // === Contact ===
  { section: "contact", key: "contact.kicker", label: "Contact Kicker", originalEn: "B2B inquiry", valueEn: "B2B inquiry", valueAr: "استفسار B2B" },
  { section: "contact", key: "contact.title", label: "Contact Title", originalEn: "Send a qualified inquiry", valueEn: "Send a qualified inquiry", valueAr: "أرسل استفسار مؤهل" },
  { section: "contact", key: "contact.desc", label: "Contact Description", originalEn: "We need enough info to qualify you — not endless fields. Our export team responds with specs, indicative pricing and next steps.", valueEn: "We need enough info to qualify you — not endless fields. Our export team responds with specs, indicative pricing and next steps.", valueAr: "نحتاج معلومات كافية لتأهيلك — ليس حقول لا تنتهي. فريق التصدير يرد بالمواصفات والسعر المبدئي والخطوات التالية." },
  { section: "contact", key: "contact.form.submit", label: "Form Submit Button", originalEn: "Send Inquiry", valueEn: "Send Inquiry", valueAr: "أرسل الاستفسار" },
  { section: "contact", key: "contact.form.name", label: "Form: Name", originalEn: "Full name *", valueEn: "Full name *", valueAr: "الاسم الكامل *" },
  { section: "contact", key: "contact.form.company", label: "Form: Company", originalEn: "Company *", valueEn: "Company *", valueAr: "الشركة *" },
  { section: "contact", key: "contact.form.country", label: "Form: Country", originalEn: "Country *", valueEn: "Country *", valueAr: "الدولة *" },
  { section: "contact", key: "contact.form.whatsapp", label: "Form: WhatsApp", originalEn: "WhatsApp (with country code) *", valueEn: "WhatsApp (with country code) *", valueAr: "واتساب (مع رمز الدولة) *" },
  { section: "contact", key: "contact.form.email", label: "Form: Email", originalEn: "Email *", valueEn: "Email *", valueAr: "البريد *" },

  // === Industries ===
  { section: "industries", key: "industries.kicker", label: "Industries Kicker", originalEn: "Industries we serve", valueEn: "Industries we serve", valueAr: "الصناعات التي نخدمها" },
  { section: "industries", key: "industries.title", label: "Industries Title", originalEn: "Built for B2B, not for retail scrolling", valueEn: "Built for B2B, not for retail scrolling", valueAr: "مصمم لـ B2B، ليس لتمرير التجزئة" },

  // === Footer ===
  { section: "footer", key: "footer.summary", label: "Footer Summary", originalEn: "Supplying premium IQF frozen fruits from Egypt to GCC buyers.", valueEn: "Supplying premium IQF frozen fruits from Egypt to GCC buyers.", valueAr: "نوفر فواكه IQF مجمدة فاخرة من مصر لمشتري الخليج." },
  { section: "footer", key: "footer.trust", label: "Footer Trust Note", originalEn: "Export inquiries are handled by our dedicated export team.", valueEn: "Export inquiries are handled by our dedicated export team.", valueAr: "استفسارات التصدير يديرها فريق التصدير المخصص." },

  // === Promo Video ===
  { section: "promo", key: "promo.kicker", label: "Promo Kicker", originalEn: "Trust before sales", valueEn: "Trust before sales", valueAr: "الثقة قبل البيع" },
  { section: "promo", key: "promo.title", label: "Promo Title", originalEn: "From Egypt's fields to Gulf reefer containers", valueEn: "From Egypt's fields to Gulf reefer containers", valueAr: "من حقول مصر إلى كونتينر الخليج المبرد" },
  { section: "promo", key: "promo.cta", label: "Promo CTA", originalEn: "Request Product List", valueEn: "Request Product List", valueAr: "اطلب قائمة المنتجات" },

  // === CTA Section ===
  { section: "cta", key: "cta.ready", label: "CTA: Ready to start?", originalEn: "Ready to start?", valueEn: "Ready to start?", valueAr: "جاهز للبدء؟" },
  { section: "cta", key: "cta.desc", label: "CTA Description", originalEn: "Send a qualified inquiry — our export team responds with specs, indicative pricing and next steps within one business day.", valueEn: "Send a qualified inquiry — our export team responds with specs, indicative pricing and next steps within one business day.", valueAr: "أرسل استفسارك مؤهلاً — فريق التصدير لدينا سيرد بالمواصفات والسعر المبدئي خلال يوم عمل واحد." },
];

async function main() {
  console.log("🌱 Seeding site text content...");
  for (const t of texts) {
    await prisma.siteText.upsert({
      where: { key: t.key },
      update: {},
      create: t,
    });
  }
  console.log(`✅ ${texts.length} text strings seeded across ${new Set(texts.map(t => t.section)).size} sections`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

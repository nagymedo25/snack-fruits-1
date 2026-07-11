"use client";

import { useLang } from "./language-provider";

// Centralized i18n content. Every visible UI string passes through here.
export function useContent() {
  const { t, lang } = useLang();

  return {
    brand: {
      name: t("Snack Fruits", "Snack Fruits"),
      tagline: t("fresh · natural · healthy", "fresh · natural · healthy"),
      promise: t("We deliver taste… and guarantee quality", "نوصل الطعم… ونضمن الجودة"),
    },
    nav: {
      home: t("Home", "الرئيسية"),
      products: t("Products", "المنتجات"),
      quality: t("Quality & Cold Chain", "الجودة وسلسلة التبريد"),
      gcc: t("GCC Markets", "أسواق الخليج"),
      process: t("Export Process", "عملية التصدير"),
      privateLabel: t("Private Label", "العلامة الخاصة"),
      gallery: t("Gallery", "المعرض"),
      contact: t("Contact", "تواصل"),
      requestQuote: t("Request a Quotation", "اطلب عرض سعر"),
      langToggle: t("العربية", "English"),
    },
    trustStrip: t(
      "Export-ready IQF fruits from Egypt to GCC markets",
      "فواكه IQF مجمدة جاهزة للتصدير من مصر إلى أسواق الخليج"
    ),
    hero: {
      badge: t("Egypt → GCC · B2B Export", "مصر → الخليج · تصدير B2B"),
      title1: t("Premium IQF Fruits", "فواكه IQF مجمدة"),
      title2: t("Exported from Egypt to GCC", "من مصر إلى اسواق"),
      subtitle: t(
        "Mango cubes, slices, strawberries and seasonal fruits — frozen at peak freshness, packaged for serious B2B buyers across the Gulf.",
        "مكعبات وشرائح مانجو، فراولة، وفواكه موسمية — مجمدة في قمة نضجها، معبأة للمشترين الجادين في الخليج."
      ),
      cta1: t("Request a Quotation", "اطلب عرض سعر"),
      cta2: t("Watch Company Intro", "شاهد تعريف الشركة"),
      proof1: t("-18°C Cold Chain", "سلسلة تبريد -18°C"),
      proof2: t("6 GCC Markets", "6 أسواق خليجية"),
      proof3: t("Bulk & Private Label", "تعبئة جملة وعلامة خاصة"),
    },
    promo: {
      kicker: t("Trust before sales", "الثقة قبل البيع"),
      title: t("From Egypt's fields to Gulf reefer containers", "من حقول مصر إلى كونتينر الخليج المبرد"),
      desc: t(
        "A 60-second look at how we source, freeze, pack and ship IQF fruits to importers, distributors, factories and HoReCa partners across Saudi Arabia, the UAE, Kuwait, Qatar, Bahrain and Oman.",
        "نظرة 60 ثانية على كيفية فرز وتجميد وتعبئة وشحن فواكه IQF للمستوردين والموزعين والمصانع وشركاء HoReCa عبر السعودية والإمارات والكويت وقطر والبحرين وعُمان."
      ),
      cta: t("Request Product List", "اطلب قائمة المنتجات"),
      poster: t("Cold storage & export crates with Snack Fruits brand", "مخزن تبريد وكراتين تصدير بعلامة Snack Fruits"),
      play: t("Play 60s intro", "شغل فيديو 60 ثانية"),
    },
    products: {
      kicker: t("Product range", "نطاق المنتجات"),
      title: t("Frozen at peak, exported with precision", "تجميد في القمة، تصدير بدقة"),
      desc: t(
        "Every product is IQF-frozen to preserve natural taste, color and texture. Specify cut size, packing and quantity — we'll quote accordingly.",
        "كل منتج يُجمد بتقنية IQF للحفاظ على الطعم واللون والملمس الطبيعي. حدد حجم القطع والتعبئة والكمية — وسنرسل عرض السعر."
      ),
      items: [
        {
          id: "mango-cubes",
          name: t("IQF Mango Cubes", "مكعبات مانجو IQF"),
          short: t(
            "Premium Egyptian mango cubes for juices, smoothies, dairy and bakeries.",
            "مكعبات مانجو مصرية فاخرة للعصائر والسموذي والألبان والمخبوزات."
          ),
          tags: [t("Bulk", "جملة"), t("HoReCa", "HoReCa"), t("Retail", "تجزئة")],
          uses: t("Juices · Smoothies · Desserts · Bakeries · Dairy", "عصائر · سموذي · حلويات · مخبوزات · ألبان"),
          cta: t("Request Specs", "اطلب المواصفات"),
        },
        {
          id: "mango-slices",
          name: t("IQF Mango Slices", "شرائح مانجو IQF"),
          short: t(
            "Selected slices prepared for distributors, food service and private-label buyers.",
            "شرائح مختارة للموزعين وخدمات الأغذية والمشترين بعلامة خاصة."
          ),
          tags: [t("Food Service", "خدمات أغذية"), t("Private Label", "علامة خاصة")],
          uses: t("Hotels · Restaurants · Desserts · Retail packs", "فنادق · مطاعم · حلويات · عبوات تجزئة"),
          cta: t("Request Specs", "اطلب المواصفات"),
        },
        {
          id: "strawberry",
          name: t("IQF Strawberry", "فراولة IQF"),
          short: t(
            "Whole, halves, slices or diced — for dairy, bakery, juice and ice cream partners.",
            "كاملة، أنصاف، شرائح أو مكعبات — لشركاء الألبان والمخبوزات والعصائر والآيس كريم."
          ),
          tags: [t("Industrial", "صناعي"), t("HoReCa", "HoReCa")],
          uses: t("Dairy · Pastry · Juice · Ice Cream · Frozen Desserts", "ألبان · معجنات · عصائر · آيس كريم · حلويات مجمدة"),
          cta: t("Request Specs", "اطلب المواصفات"),
        },
        {
          id: "mixed",
          name: t("Mixed Fruits Blend", "خلطات فواكه"),
          short: t(
            "Custom blends for restaurants, supermarkets, and private label.",
            "خلطات مخصصة للمطاعم والسوبرماركت والعلامة الخاصة."
          ),
          tags: [t("Custom Blends", "خلطات مخصصة")],
          uses: t("Restaurants · Supermarkets · Private Label", "مطاعم · سوبرماركت · علامة خاصة"),
          cta: t("Discuss Custom Mix", "ناقش خلطة مخصصة"),
        },
        {
          id: "seasonal",
          name: t("Seasonal Fruits", "فواكه موسمية"),
          short: t(
            "Seasonal supply — flexible options based on availability and demand.",
            "توريد موسمي — خيارات مرنة حسب التوفر والطلب."
          ),
          tags: [t("Seasonal", "موسمي")],
          uses: t("All channels — subject to availability", "كل القنوات — حسب التوفر"),
          cta: t("Request Seasonal Availability", "اطلب التوفر الموسمي"),
        },
      ],
    },
    quality: {
      kicker: t("Quality & cold chain", "الجودة وسلسلة التبريد"),
      title: t("Controlled from field to reefer", "تحكم من المزرعة إلى الكونتينر المبرد"),
      desc: t(
        "Quality is not a slogan — it's a documented chain. Sourcing control, sorting, IQF freezing, export packaging, and temperature-monitored shipping all the way to GCC arrival.",
        "الجودة ليست شعاراً — هي سلسلة موثقة. تحكم في المصادر، فرز، تجميد IQF، تعبئة تصدير، وشحن مراقب الحرارة حتى الوصول للخليج."
      ),
      pillars: [
        {
          title: t("Sourcing Control", "تحكم المصادر"),
          desc: t("Suppliers and fruits selected against commercial specs.", "اختيار الموردين والثمار حسب المواصفات التجارية."),
        },
        {
          title: t("Sorting & Inspection", "الفرز والتفتيش"),
          desc: t("Pre-freeze sorting, visual inspection, non-conforming rejection.", "فرز قبل التجميد، فحص بصري، استبعاد غير المطابق."),
        },
        {
          title: t("Freezing Consistency", "ثبات التجميد"),
          desc: t("IQF preserves shape, taste and texture consistently.", "IQF يحافظ على الشكل والطعم والملمس بثبات."),
        },
        {
          title: t("Packaging Control", "تحكم التعبئة"),
          desc: t("Export-grade packing for storage and reefer shipping.", "تعبئة بمستوى التصدير للتخزين والشحن المبرد."),
        },
        {
          title: t("Documentation", "المستندات"),
          desc: t("Export docs prepared per deal and destination country.", "مستندات تصدير حسب الصفقة والدولة."),
        },
        {
          title: t("Traceability", "التتبع"),
          desc: t("Batch-level traceability per internal system.", "تتبع على مستوى الدفعات حسب النظام الداخلي."),
        },
      ],
      chain: [
        { step: "01", title: t("IQF Freezing", "تجميد IQF"), temp: "≤ -18°C" },
        { step: "02", title: t("Cold Storage", "مخزن مبرد"), temp: "≤ -18°C" },
        { step: "03", title: t("Reefer Loading", "تحميل مبرد"), temp: "≤ -18°C" },
        { step: "04", title: t("Temp-Controlled Shipping", "شحن مراقب الحرارة"), temp: "≤ -18°C" },
        { step: "05", title: t("GCC Arrival", "الوصول للخليج"), temp: "≤ -18°C" },
      ],
      certs: {
        title: t("Certifications & documents — honest, not inflated", "الشهادات والمستندات — صادقة وليست مبالغة"),
        desc: t(
          "We work with qualified production and packing partners that follow export-oriented procedures. We only list certificates we actually hold.",
          "نعمل مع شركاء إنتاج وتعبئة مؤهلين يتبعون إجراءات تصديرية. نذكر فقط الشهادات التي نمتلكها فعلاً."
        ),
        docs: t("Commercial invoice · Packing list · Certificate of origin · Health certificate (when applicable)", "فاتورة تجارية · بوليصة شحن · شهادة منشأ · شهادة صحية (عند التطبيق)"),
        cta: t("Request Export Documents", "اطلب المستندات المتاحة"),
      },
    },
    gcc: {
      kicker: t("GCC coverage", "التغطية الخليجية"),
      title: t("One supplier from Egypt serving all six GCC markets", "مورد واحد من مصر يخدم كل أسواق الخليج الستة"),
      desc: t(
        "From Jeddah to Muscat, Dubai to Doha — we understand GCC importers: fast communication, consistent quality, English/Arabic labeling and reefer logistics.",
        "من جدة إلى مسقط، دبي إلى الدوحة — نحن نفهم المستوردين الخليجيين: تواصل سريع، جودة ثابتة، تعبئة إنجليزية/عربية، ولوجستيات مبردة."
      ),
      countries: [
        { code: "SA", name: t("Saudi Arabia", "السعودية"), cities: t("Jeddah · Dammam · Riyadh", "جدة · الدمام · الرياض"), focus: t("Importers · Wholesalers · Food factories · HoReCa · Retail chains", "مستوردون · تجار جملة · مصانع أغذية · HoReCa · سلاسل تجزئة") },
        { code: "AE", name: t("United Arab Emirates", "الإمارات"), cities: t("Dubai · Abu Dhabi", "دبي · أبوظبي"), focus: t("Importers · Distributors · HoReCa · Private label", "مستوردون · موزعون · HoReCa · علامة خاصة") },
        { code: "KW", name: t("Kuwait", "الكويت"), cities: t("Kuwait City · Shuwaikh", "الكويت · الشويخ"), focus: t("Distributors · Supermarkets · Food companies", "موزعون · سوبرماركت · شركات أغذية") },
        { code: "QA", name: t("Qatar", "قطر"), cities: t("Doha · Hamad Port", "الدوحة · ميناء حمد"), focus: t("HoReCa · Retail · Special projects", "HoReCa · تجزئة · مشاريع خاصة") },
        { code: "BH", name: t("Bahrain", "البحرين"), cities: t("Manama · Khalifa Bin Salman", "المنامة · خليفة بن سلمان"), focus: t("Focused orders · Long-term partnerships", "طلبات مركزة · شراكات طويلة الأمد") },
        { code: "OM", name: t("Oman", "عُمان"), cities: t("Muscat · Salalah", "مسقط · صلالة"), focus: t("Distributors · Regional trade", "موزعون · تجارة إقليمية") },
      ],
      cta: t("Select your country and send inquiry", "اختر دولتك وأرسل استفسارك"),
    },
    industries: {
      kicker: t("Industries we serve", "الصناعات التي نخدمها"),
      title: t("Built for B2B, not for retail scrolling", "مصمم لـ B2B، ليس لتمرير التجزئة"),
      items: [
        { name: t("Food Factories", "مصانع الأغذية"), desc: t("Technical specs, stable volumes, industrial packs.", "مواصفات فنية، أحجام ثابتة، عبوات صناعية.") },
        { name: t("Juice Producers", "منتجو العصائر"), desc: t("Mango and strawberry for juices and smoothies.", "مانجو وفراولة للعصائر والسموذي.") },
        { name: t("Dairy & Dessert", "ألبان وحلويات"), desc: t("Strawberry and mango for dairy, ice cream, desserts.", "فراولة ومانجو للألبان والآيس كريم والحلويات.") },
        { name: t("Hotels & Restaurants", "فنادق ومطاعم"), desc: t("Easy-to-use products with consistent quality.", "منتجات سهلة الاستخدام بجودة ثابتة.") },
        { name: t("Catering", "تموين"), desc: t("Recurring needs, bulk packs, fast supply.", "احتياجات متكررة، عبوات جملة، توريد سريع.") },
        { name: t("Retail Brands", "علامات تجزئة"), desc: t("Private label and consumer-ready packs.", "علامة خاصة وعبوات جاهزة للمستهلك.") },
      ],
    },
    process: {
      kicker: t("How we work", "كيف نعمل"),
      title: t("Six steps from inquiry to shipping", "ست خطوات من الاستفسار إلى الشحن"),
      desc: t(
        "Clear process reduces hesitation. Here is exactly how a Snack Fruits export deal moves — from your first message to a loaded reefer.",
        "عملية واضحة تقلل التردد. هكذا تتحرك صفقة تصدير مع Snack Fruits — من رسالتك الأولى حتى تحميل الكونتينر المبرد."
      ),
      steps: [
        { n: "01", title: t("Inquiry", "استفسار"), desc: t("You send product, quantity, country, port and packing type.", "ترسل المنتج والكمية والدولة والميناء ونوع التعبئة.") },
        { n: "02", title: t("Specification", "مواصفات"), desc: t("We confirm available specs, weight, pack size and indicative price.", "نؤكد المواصفات المتاحة والوزن وحجم العبوة والسعر المبدئي.") },
        { n: "03", title: t("Quotation", "عرض سعر"), desc: t("Clear quote with payment terms, shipping terms and lead time.", "عرض واضح بشروط الدفع والشحن وفترة التجهيز.") },
        { n: "04", title: t("Sample", "عينة"), desc: t("Samples sent when needed, with a clear mechanism.", "عينات تُرسل عند الحاجة بآلية واضحة.") },
        { n: "05", title: t("Order", "الطلب"), desc: t("Order confirmed, prepared, inspected and packed.", "تأكيد الطلب، التجهيز، الفحص، والتعبئة.") },
        { n: "06", title: t("Shipping", "الشحن"), desc: t("Reefer loading, documents, tracking until arrival.", "تحميل مبرد، مستندات، متابعة حتى الوصول.") },
      ],
    },
    privateLabel: {
      kicker: t("Private label & packaging", "العلامة الخاصة والتعبئة"),
      title: t("Your brand on premium IQF fruits", "علامتك على فواكه IQF فاخرة"),
      desc: t(
        "Bulk cartons for industry, retail packs for supermarkets, Arabic/English labels for the GCC market, and custom pack sizes built around your volume and channel.",
        "كراتين جملة للصناعة، عبوات تجزئة للسوبرماركت، ملصقات إنجليزية/عربية لسوق الخليج، وأحجام عبوات مخصصة حسب حجمك وقناتك."
      ),
      options: [
        { name: t("Bulk Cartons", "كراتين جملة"), desc: t("For factories, distributors and HoReCa.", "للمصانع والموزعين و HoReCa.") },
        { name: t("Retail Packs", "عبوات تجزئة"), desc: t("For retail and supermarkets, subject to MOQ.", "للتجزئة والسوبرماركت حسب الحد الأدنى.") },
        { name: t("Arabic / English Labels", "ملصقات إنجليزية/عربية"), desc: t("GCC-ready, modern trade compatible.", "مناسبة للخليج وقنوات البيع الحديثة.") },
        { name: t("Custom Pack Size", "حجم عبوة مخصص"), desc: t("Based on volume, product and client needs.", "حسب الحجم والمنتج واحتياج العميل.") },
        { name: t("Design Support", "دعم التصميم"), desc: t("Direction support — execution per agreement.", "دعم اتجاهات — التنفيذ حسب الاتفاق.") },
        { name: t("MOQ Guidance", "إرشاد الحد الأدنى"), desc: t("Clear minimums per SKU and pack type.", "حدود دقيقة لكل منتج ونوع عبوة.") },
      ],
      cta: t("Discuss packaging options", "ناقش خيارات التعبئة"),
    },
    gallery: {
      kicker: t("Gallery & media", "المعرض والوسائط"),
      title: t("Real export, real cold chain, real crates", "تصدير حقيقي، سلسلة تبريد حقيقية، كراتين حقيقية"),
      desc: t(
        "No cheap stock. Frozen product shots, packing, cold storage, reefer containers — clean lighting, teal/cream backgrounds, no over-filtered images.",
        "بدون صور ستوك رخيصة. لقطات منتج مجمد، تعبئة، مخزن مبرد، كونتينر — إضاءة نظيفة، خلفيات teal/cream، بدون فلاتر مبالغة."
      ),
      categories: [t("All", "الكل"), t("Products", "منتجات"), t("Packaging", "تعبئة"), t("Cold Storage", "مخزن مبرد"), t("Logistics", "لوجستيات"), t("Process", "عملية")],
    },
    contact: {
      kicker: t("B2B inquiry", "استفسار B2B"),
      title: t("Send a qualified inquiry", "أرسل استفسار مؤهل"),
      desc: t(
        "We need enough info to qualify you — not endless form fields. Our export team responds with specs, indicative pricing and next steps.",
        "نحتاج معلومات كافية لتأهيلك — ليس حقول لا تنتهي. فريق التصدير يرد بالمواصفات والسعر المبدئي والخطوات التالية."
      ),
      form: {
        name: t("Full name *", "الاسم الكامل *"),
        company: t("Company *", "الشركة *"),
        country: t("Country *", "الدولة *"),
        whatsapp: t("WhatsApp (with country code) *", "واتساب (مع رمز الدولة) *"),
        email: t("Email *", "البريد *"),
        product: t("Product type", "نوع المنتج"),
        quantity: t("Target quantity", "الكمية المستهدفة"),
        packing: t("Packing type", "نوع التعبئة"),
        port: t("Destination port", "ميناء الوجهة"),
        use: t("Target use", "الاستخدام"),
        message: t("Message (specs, samples, anything)", "رسالة (مواصفات، عينات، أي شيء)"),
        submit: t("Send Inquiry", "أرسل الاستفسار"),
        successTitle: t("Inquiry received", "تم استلام الاستفسار"),
        successDesc: t(
          "Our export team will reach you on WhatsApp within 1 business day.",
          "فريق التصدير سيتواصل معك على واتساب خلال يوم عمل واحد."
        ),
        sendAnother: t("Send another inquiry", "أرسل استفسار آخر"),
      },
      channels: {
        whatsapp: t("WhatsApp Export Team", "فريق التصدير واتساب"),
        email: t("Official Email", "البريد الرسمي"),
        location: t("Egypt — serving GCC", "مصر — نخدم الخليج"),
        hours: t("Sun–Thu · 9:00–18:00 EET", "الأحد–الخميس · 9:00–18:00 EET"),
      },
      flow: {
        title: t("What happens after you submit", "ماذا يحدث بعد الإرسال"),
        steps: [
          t("Website inquiry captured", "استفسار الموقع مسجل"),
          t("Email notification to export team", "إشعار بالبريد لفريق التصدير"),
          t("Lead registered in our system", "تسجيل العميل في نظامنا"),
          t("WhatsApp follow-up", "متابعة واتساب"),
          t("Quotation record", "تسجيل عرض السعر"),
        ],
      },
    },
    footer: {
      summary: t("Supplying premium IQF frozen fruits from Egypt to GCC buyers.", "نوفر فواكه IQF مجمدة فاخرة من مصر لمشتري الخليج."),
      quickLinks: t("Quick links", "روابط سريعة"),
      contact: t("Contact", "تواصل"),
      legal: t("Legal", "قانوني"),
      privacy: t("Privacy policy", "سياسة الخصوصية"),
      terms: t("Terms", "الشروط"),
      trust: t("Export inquiries are handled by our dedicated export team.", "استفسارات التصدير يديرها فريق التصدير المخصص."),
      rights: t("All rights reserved.", "جميع الحقوق محفوظة."),
    },
    whatsapp: {
      label: t("Chat with export team", "تحدث مع فريق التصدير"),
      msg: "Hello Snack Fruits export team, I'd like to discuss IQF fruits supply for our GCC business.",
    },
  };
}

export type Content = ReturnType<typeof useContent>;

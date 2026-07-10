"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useContent } from "../content";
import { useNav } from "../nav-provider";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Kicker, AnimatedUnderline, Marquee, Magnetic,
} from "../anim";
import { IMAGES } from "../images";
import { ArrowRight, ArrowLeft, Download, FileText, Snowflake as SnowIcon, Beaker, Package2, CheckCircle2, ArrowUpRight, Truck } from "lucide-react";

export function ProductsPage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [active, setActive] = React.useState(0);

  const productDetails = [
    {
      cuts: dir === "rtl" ? ["8mm مكعبات", "10mm مكعبات", "12mm مكعبات", "حسب الطلب"] : ["8mm cubes", "10mm cubes", "12mm cubes", "Custom cut"],
      varieties: dir === "rtl" ? ["Seddika", "Ewais", "Alphonso (حسب التوفر)"] : ["Seddika", "Ewais", "Alphonso (subject to availability)"],
      packing: dir === "rtl" ? ["كراتين 10kg", "أكياس 1kg تجزئة", "أكياس 2kg HoReCa", "تعبئة مخصصة"] : ["10kg cartons", "1kg retail bags", "2kg HoReCa bags", "Custom packing"],
      storage: "≤ -18°C",
      shelfLife: dir === "rtl" ? "24 شهراً من الإنتاج" : "24 months from production",
      uses: dir === "rtl"
        ? ["عصائر فاكهة", "سموذي", "حلويات ومخبوزات", "ألبان وزبادي", "آيس كريم"]
        : ["Fruit juices", "Smoothies", "Desserts & bakery", "Dairy & yogurt", "Ice cream"],
    },
    {
      cuts: dir === "rtl" ? ["شرائح رفيعة", "شرائح متوسطة", "شرائح سميكة"] : ["Thin slices", "Medium slices", "Thick slices"],
      varieties: dir === "rtl" ? ["Seddika", "Ewais"] : ["Seddika", "Ewais"],
      packing: dir === "rtl" ? ["كراتين 10kg", "عبوات تجزئة 500g", "عبوات HoReCa 2kg"] : ["10kg cartons", "500g retail packs", "2kg HoReCa packs"],
      storage: "≤ -18°C",
      shelfLife: dir === "rtl" ? "24 شهراً من الإنتاج" : "24 months from production",
      loadingQty: dir === "rtl" ? "1800 كرتونة/20ft" : "1,800 cartons / 20ft container",
      uses: dir === "rtl"
        ? ["فنادق ومطاعم", "حلويات", "عبوات تجزئة", "علامة خاصة"]
        : ["Hotels & restaurants", "Desserts", "Retail packs", "Private label"],
    },
    {
      cuts: dir === "rtl" ? ["كاملة", "أنصاف", "شرائح", "مكعبات"] : ["Whole", "Halves", "Slices", "Diced"],
      varieties: dir === "rtl" ? ["Fortuna", "Camarosa (حسب الموسم)"] : ["Fortuna", "Camarosa (seasonal)"],
      packing: dir === "rtl" ? ["كراتين 10kg صناعية", "1kg تجزئة", "500g HoReCa"] : ["10kg industrial cartons", "1kg retail", "500g HoReCa"],
      storage: "≤ -18°C",
      shelfLife: dir === "rtl" ? "24 شهراً من الإنتاج" : "24 months from production",
      uses: dir === "rtl"
        ? ["ألبان ولبن", "معجنات ومخبوزات", "عصائر", "آيس كريم", "حلويات مجمدة"]
        : ["Dairy", "Pastry & bakery", "Juices", "Ice cream", "Frozen desserts"],
    },
    {
      cuts: dir === "rtl" ? ["خلطات حسب الطلب", "نسب مخصصة", "حجم قطع موحد"] : ["Custom blends", "Custom ratios", "Uniform cut size"],
      varieties: dir === "rtl" ? ["مانجو + فراولة", "فواكه حمراء", "خلطات استوائية", "حسب الموسم"] : ["Mango + strawberry", "Red fruits", "Tropical blends", "Seasonal"],
      packing: dir === "rtl" ? ["كراتين 10kg", "تعبئة مخصصة"] : ["10kg cartons", "Custom packing"],
      storage: "≤ -18°C",
      shelfLife: dir === "rtl" ? "24 شهراً من الإنتاج" : "24 months from production",
      uses: dir === "rtl"
        ? ["مطاعم", "سوبرماركت", "علامة خاصة", "وجبات جاهزة"]
        : ["Restaurants", "Supermarkets", "Private label", "Ready meals"],
    },
    {
      cuts: dir === "rtl" ? ["حسب الموسم"] : ["Subject to season"],
      varieties: dir === "rtl" ? ["حسب التوفر — بدون وعود زائدة"] : ["Subject to availability — no overpromising"],
      packing: dir === "rtl" ? ["حسب المنتج والكمية"] : ["Subject to product and quantity"],
      storage: "≤ -18°C",
      shelfLife: dir === "rtl" ? "24 شهراً من الإنتاج" : "24 months from production",
      uses: dir === "rtl"
        ? ["كل القنوات — حسب التوفر"]
        : ["All channels — subject to availability"],
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <FrostField count={18} className="opacity-50" />
        <FloatingShape shape="leaf" className="absolute top-24 right-[10%] text-teal/25 hidden md:block" size={64} delay={0.2} />
        <FloatingShape shape="drop" className="absolute bottom-16 left-[8%] text-orange/25 hidden lg:block" size={48} delay={0.5} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal>
              <Kicker>{c.products.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                <span className="block text-foreground">{c.products.title.split(",")[0]}</span>
                <span className="block text-gradient-teal mt-2">{c.products.title.split(",")[1]}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <AnimatedUnderline className="mt-6 w-32" />
              <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {c.products.desc}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {[
              "IQF = Individually Quick Frozen", "≤ -18°C always", "Egyptian origin",
              "B2B only", "Bulk + Retail + Private Label", "No additives", "No preservatives",
            ].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5 text-sm font-mono text-teal">
                <SnowIcon className="w-3 h-3 text-orange" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* PRODUCT NAV */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/85 backdrop-blur-md border-y border-teal/12 py-3">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto">
          {c.products.items.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActive(i);
                document.getElementById(`prod-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                active === i
                  ? "bg-teal text-teal-foreground"
                  : "bg-card border border-teal/15 text-foreground hover:bg-teal/10"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* DETAILED PRODUCT SECTIONS */}
      <div>
        {c.products.items.map((p, i) => {
          const detail = productDetails[i];
          const isReversed = i % 2 === 1;
          return (
            <section
              key={p.id}
              id={`prod-${i}`}
              className="relative py-16 lg:py-24 border-b border-teal/10"
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className={`grid lg:grid-cols-12 gap-10 items-center`}>
                  {/* Visual */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}>
                    <Reveal>
                      <div className="relative aspect-square rounded-3xl overflow-hidden border border-teal/15">
                        {/* Real CDN product photo */}
                        <motion.img
                          src={[
                            IMAGES.products.mangoCubes,
                            IMAGES.products.mangoSlices,
                            IMAGES.products.strawberry,
                            IMAGES.products.mixedFruit,
                            IMAGES.products.mixedFruit,
                          ][i]}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ scale: 1.05 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-teal-dark/30" />
                        <div className="absolute inset-0 bg-grid-teal opacity-20 mix-blend-overlay" />

                        {/* Rotating snowflake icon */}
                        <motion.div
                          className="absolute top-6 right-6 text-white/50"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <SnowIcon className="w-10 h-10" />
                        </motion.div>

                        {/* Tags overlay */}
                        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-1.5">
                          {p.tags.map((tag, ti) => (
                            <span key={ti} className="bg-white/90 backdrop-blur-sm text-teal text-[10px] px-2.5 py-1 rounded-full font-semibold">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Number */}
                        <div className="absolute top-5 left-5 font-serif-display text-5xl font-bold text-white/30">
                          0{i + 1}
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Details */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : ""}`}>
                    <Reveal>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-orange font-bold">IQF / 0{i + 1}</span>
                        <span className="h-px w-12 bg-orange/40" />
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                          {dir === "rtl" ? "منتج تصديري" : "Export product"}
                        </span>
                      </div>
                      <h2 className="font-serif-display text-3xl lg:text-5xl font-bold leading-tight text-balance">
                        {p.name}
                      </h2>
                      <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                        {p.short}
                      </p>
                    </Reveal>

                    {/* Spec grid */}
                    <Reveal delay={0.15}>
                      <div className="mt-8 grid sm:grid-cols-2 gap-4">
                        <SpecBlock title={dir === "rtl" ? "أحجام القطع" : "Cut sizes"} icon={<Beaker className="w-4 h-4" />} items={detail.cuts} />
                        <SpecBlock title={dir === "rtl" ? "الأصناف" : "Varieties"} icon={<FileText className="w-4 h-4" />} items={detail.varieties} />
                        <SpecBlock title={dir === "rtl" ? "التعبئة" : "Packing"} icon={<Package2 className="w-4 h-4" />} items={detail.packing} />
                        <SpecBlock title={dir === "rtl" ? "الاستخدامات" : "Use cases"} icon={<CheckCircle2 className="w-4 h-4" />} items={detail.uses} />
                      </div>
                    </Reveal>

                    {/* Storage + Shelf life + Loading quantity */}
                    <Reveal delay={0.25}>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20">
                          <SnowIcon className="w-4 h-4 text-teal" />
                          <span className="text-xs font-semibold">{dir === "rtl" ? "التخزين" : "Storage"}: <span className="font-mono">{detail.storage}</span></span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20">
                          <Package2 className="w-4 h-4 text-orange" />
                          <span className="text-xs font-semibold">{dir === "rtl" ? "الصلاحية" : "Shelf life"}: {detail.shelfLife}</span>
                        </div>
                        {detail.loadingQty && (
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                            <Truck className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-semibold">{dir === "rtl" ? "التحميل" : "Loading"}: {detail.loadingQty}</span>
                          </div>
                        )}
                      </div>
                    </Reveal>

                    {/* CTAs */}
                    <Reveal delay={0.35}>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Magnetic strength={0.15}>
                          <button
                            onClick={() => navigate("contact")}
                            className="shine-hover inline-flex items-center gap-2 h-11 px-5 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
                          >
                            {p.cta}
                            <Arrow className="w-4 h-4" />
                          </button>
                        </Magnetic>
                        <button
                          onClick={() => navigate("quality")}
                          className="inline-flex items-center gap-2 h-11 px-5 rounded-full border-2 border-teal text-teal font-semibold hover:bg-teal hover:text-teal-foreground transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          {dir === "rtl" ? "تحميل المواصفات" : "Download spec sheet"}
                        </button>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* PACKAGING TEASER */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-transparent via-teal/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal to-teal-dark overflow-hidden p-8 relative">
                  {/* Real CDN photo of pallet/cartons */}
                  <img
                    src={IMAGES.privateLabel.cartonHero}
                    alt="Bulk cartons and pallets"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-dark/80 via-teal/40 to-teal-dark/70" />
                  <div className="absolute inset-0 bg-grid-teal opacity-20 mix-blend-overlay" />
                  <div className="absolute top-5 left-5 text-white/80 text-xs font-mono">PACKAGING</div>
                  <div className="absolute bottom-5 right-5 text-white text-sm font-serif-display font-bold">Bulk · Retail · Private Label</div>
                </div>
              </div>
            </Reveal>

            <div>
              <Kicker>{c.privateLabel.kicker}</Kicker>
              <h2 className="mt-4 font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
                {c.privateLabel.title}
              </h2>
              <AnimatedUnderline className="mt-5 w-20" />
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {c.privateLabel.desc}
              </p>
              <StaggerGroup className="mt-6 grid grid-cols-2 gap-3">
                {c.privateLabel.options.slice(0, 4).map((o, i) => (
                  <motion.div key={i} variants={staggerItem} className="p-3 rounded-xl bg-card border border-teal/12">
                    <div className="text-xs font-semibold text-teal">{o.name}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{o.desc}</div>
                  </motion.div>
                ))}
              </StaggerGroup>
              <Reveal delay={0.3}>
                <button
                  onClick={() => navigate("private-label")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-orange transition-colors"
                >
                  {c.privateLabel.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 lg:py-20 bg-teal/5 border-t border-teal/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "حدد المنتج وأرسل استفسارك" : "Pick a product, send your inquiry"}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "كل منتج قابل للتخصيص حسب الكمية والتعبئة والدولة. أرسل التفاصيل وسنرد بالمواصفات والسعر المبدئي."
                : "Every product is customizable by quantity, packing and destination. Send details — we respond with specs and indicative pricing."}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
            >
              {c.nav.requestQuote}
              <Arrow className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function SpecBlock({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-teal/12">
      <div className="flex items-center gap-2 text-teal mb-2.5">
        {icon}
        <h4 className="text-xs font-bold uppercase tracking-wider">{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-orange mt-1.5 shrink-0" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

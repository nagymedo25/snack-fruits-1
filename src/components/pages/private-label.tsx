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
import {
  ArrowRight, ArrowLeft, Package2, ShoppingBag, Tag, Ruler, Palette, Layers,
  Snowflake as SnowIcon, Languages, Boxes,
} from "lucide-react";

export function PrivateLabelPage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const optionIcons = [Boxes, ShoppingBag, Languages, Ruler, Palette, Tag];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <FrostField count={20} className="opacity-50" />
        <FloatingShape shape="cube" className="absolute top-24 right-[10%] text-orange/25 hidden lg:block" size={56} delay={0.2} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal><Kicker>{c.privateLabel.kicker}</Kicker></Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                  <span className="block text-foreground">{c.privateLabel.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="block text-gradient-teal mt-2">{c.privateLabel.title.split(" ").slice(2).join(" ")}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <AnimatedUnderline className="mt-6 w-32" />
                <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {c.privateLabel.desc}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={0.15}>
                    <button
                      onClick={() => { window.location.href = "/contact" }}
                      className="shine-hover inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
                    >
                      {c.privateLabel.cta}
                      <Arrow className="w-4 h-4" />
                    </button>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-cream via-card to-orange/8 border border-teal/15 overflow-hidden">
                  {/* Real CDN photo of pallet/cartons */}
                  <img
                    src={IMAGES.privateLabel.cartonHero}
                    alt="Bulk packaging cartons and pallets for IQF fruits export"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/70 via-transparent to-cream/30" />
                  <div className="absolute inset-0 bg-grid-teal opacity-20 mix-blend-overlay" />

                  {/* Rotating snowflake icon */}
                  <motion.div
                    className="absolute top-5 right-5 text-white/60"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <SnowIcon className="w-10 h-10" />
                  </motion.div>

                  {/* Floating tags */}
                  {[
                    { label: "IQF", pos: "top-6 left-6", color: "bg-teal text-teal-foreground" },
                    { label: "B2B", pos: "bottom-6 left-6", color: "bg-orange text-orange-foreground" },
                    { label: "Private Label", pos: "bottom-6 right-6", color: "bg-card border border-teal/30 text-teal" },
                  ].map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }}
                      className={`absolute ${t.pos} ${t.color} text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}
                    >
                      {t.label}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {[
              "Bulk cartons", "Retail packs", "Arabic / English labels",
              "Custom pack sizes", "Design support", "MOQ guidance", "GCC-ready",
            ].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5 text-sm font-serif-display font-semibold text-teal">
                <Package2 className="w-3.5 h-3.5 text-orange" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* OPTIONS GRID */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <Kicker>{dir === "rtl" ? "خيارات التعبئة" : "Packaging options"}</Kicker>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "ست طرق لتعبئة فواكهك بعلامتك" : "Six ways to pack fruits under your brand"}
            </h2>
            <AnimatedUnderline className="mt-5 w-24" />
          </div>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.privateLabel.options.map((o, i) => {
              const Icon = optionIcons[i];
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="group relative p-6 rounded-2xl bg-card border border-teal/12 hover:border-teal/30 hover-lift overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange/5 transition-transform group-hover:scale-150 duration-700" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center group-hover:bg-orange group-hover:text-orange-foreground transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif-display text-3xl font-bold text-teal/15 tabular-nums">0{i + 1}</span>
                    </div>
                    <h3 className="font-serif-display text-lg font-bold">{o.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* PACKAGING MOCKUPS */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-transparent via-teal/5 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Kicker>{dir === "rtl" ? "نماذج التعبئة" : "Packaging mockups"}</Kicker></div>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "ثلاث قنوات تعبئة جاهزة" : "Three packaging channels ready"}
            </h2>
            <AnimatedUnderline className="mt-5 w-24 mx-auto" />
          </div>

          <StaggerGroup className="grid lg:grid-cols-3 gap-5">
            {/* Bulk */}
            <motion.div variants={staggerItem} className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal/8 via-card to-teal/5 border border-teal/15 p-8 hover-lift">
              <div className="absolute inset-0 bg-grid-teal opacity-30" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-widest text-orange font-bold mb-2">Channel 01</div>
                <h3 className="font-serif-display text-2xl font-bold mb-3">{dir === "rtl" ? "كراتين جملة" : "Bulk Cartons"}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {dir === "rtl" ? "كراتين 10kg للمصانع والموزعين و HoReCa. تعبئة صناعية متينة." : "10kg cartons for factories, distributors and HoReCa. Industrial-grade packing."}
                </p>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <img src={IMAGES.privateLabel.bulk} alt="Bulk cartons" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">10kg</span>
                  <span className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">Industrial</span>
                  <span className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">B2B</span>
                </div>
              </div>
            </motion.div>

            {/* Retail */}
            <motion.div variants={staggerItem} className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange/8 via-card to-orange/5 border border-teal/15 p-8 hover-lift">
              <div className="absolute inset-0 bg-grid-teal opacity-30" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-widest text-teal font-bold mb-2">Channel 02</div>
                <h3 className="font-serif-display text-2xl font-bold mb-3">{dir === "rtl" ? "عبوات تجزئة" : "Retail Packs"}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {dir === "rtl" ? "عبوات 500g و 1kg للسوبرماركت والتجزئة. تصميم عصري وجذاب." : "500g & 1kg packs for supermarkets and retail. Modern attractive design."}
                </p>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <img src={IMAGES.privateLabel.retail} alt="Retail packs" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">500g · 1kg</span>
                  <span className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">Retail</span>
                  <span className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">MOQ</span>
                </div>
              </div>
            </motion.div>

            {/* Private label */}
            <motion.div variants={staggerItem} className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal via-teal-dark to-teal p-8 hover-lift text-teal-foreground">
              <div className="absolute inset-0 bg-grid-teal opacity-20" />
              <FrostField count={8} className="opacity-30" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-widest text-orange-light font-bold mb-2">Channel 03</div>
                <h3 className="font-serif-display text-2xl font-bold mb-3">{dir === "rtl" ? "العلامة الخاصة" : "Private Label"}</h3>
                <p className="text-sm text-teal-foreground/85 leading-relaxed mb-6">
                  {dir === "rtl" ? "عبوات بعلامتك التجارية، ملصقات إنجليزية/عربية، جاهزة لسوق الخليج." : "Packs with your brand, Arabic/English labels, GCC-ready."}
                </p>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/15">
                  <img src={IMAGES.privateLabel.privateLabel} alt="Private label pack" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-transparent" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white/15">Your brand</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white/15">AR / EN</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-orange">GCC-ready</span>
                </div>
              </div>
            </motion.div>
          </StaggerGroup>
        </div>
      </section>

      {/* ARABIC / ENGLISH LABEL SHOWCASE */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cream to-teal/8 border border-teal/15 p-8">
                {/* Label preview */}
                <div className="relative aspect-[3/4] rounded-2xl bg-card border border-teal/15 p-6 shadow-xl">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="font-serif-display text-2xl font-bold text-teal">Snack<span className="text-orange">Fruits</span></div>
                      <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-0.5">fresh · natural · healthy</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-teal text-teal-foreground flex items-center justify-center font-serif-display text-base font-bold">SF</div>
                  </div>

                  {/* Product title */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Product</div>
                    <div className="font-serif-display text-2xl font-bold mt-1">IQF Mango Cubes</div>
                    <div className="font-serif-display text-base text-muted-foreground mt-1" dir="rtl">مكعبات مانجو مجمدة</div>
                  </div>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <Spec label="Net Wt" value="1 kg" />
                    <Spec label="Origin" value="Egypt" />
                    <Spec label="Storage" value="≤ -18°C" />
                    <Spec label="Shelf life" value="24 months" />
                  </div>

                  {/* Barcode */}
                  <div className="mt-5 pt-5 border-t border-teal/10">
                    <div className="flex items-end gap-px h-10">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <span
                          key={i}
                          className="bg-foreground"
                          style={{ width: 2, height: i % 3 === 0 ? "100%" : i % 2 === 0 ? "70%" : "40%" }}
                        />
                      ))}
                    </div>
                    <div className="mt-1.5 flex justify-between text-[9px] font-mono text-muted-foreground">
                      <span>6 22xxxx 00000</span>
                      <span>IQF · -18°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Kicker>{dir === "rtl" ? "ملصقات إنجليزية/عربية" : "Arabic / English labels"}</Kicker>
              <h2 className="mt-4 font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
                {dir === "rtl" ? "ملصقات جاهزة لسوق الخليج" : "GCC-ready bilingual labels"}
              </h2>
              <AnimatedUnderline className="mt-5 w-20" />
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {dir === "rtl"
                  ? "ملصقات ثنائية اللغة، تصميم عصري، معلومات فنية واضحة، وباركود صناعي — كل ما يحتاجه المستورد الخليجي."
                  : "Bilingual labels, modern design, clear technical info, and industrial barcodes — everything a GCC importer needs."}
              </p>
              <StaggerGroup className="mt-7 space-y-2.5">
                {[
                  dir === "rtl" ? "اسم المنتج بالإنجليزية والعربية" : "Product name in English & Arabic",
                  dir === "rtl" ? "مواصفات فنية واضحة" : "Clear technical specs",
                  dir === "rtl" ? "باركود صناعي قياسي" : "Standard industrial barcode",
                  dir === "rtl" ? "شعار علامتك التجارية" : "Your brand logo",
                  dir === "rtl" ? "معلومات التخزين والصلاحية" : "Storage & shelf life info",
                ].map((s, i) => (
                  <motion.div key={i} variants={staggerItem} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-orange" />
                    </span>
                    {s}
                  </motion.div>
                ))}
              </StaggerGroup>
              <Reveal delay={0.3}>
                <button
                  onClick={() => { window.location.href = "/contact" }}
                  className="mt-7 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
                >
                  {c.privateLabel.cta}
                  <Arrow className="w-4 h-4" />
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
              {dir === "rtl" ? "حدد نوع التعبئة وكميتك" : "Pick your pack type and volume"}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "أرسل لنا نوع العبوة، الحجم، الكمية، والدولة — نرد باقتراح تعبئة و MOQ مفصل."
                : "Send us pack type, size, volume and country — we respond with a detailed packing proposal and MOQ."}
            </p>
            <button
              onClick={() => { window.location.href = "/contact" }}
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

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 rounded-lg bg-muted/40">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-xs font-semibold mt-0.5">{value}</div>
    </div>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../content";
import { useNav } from "../nav-provider";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Kicker, AnimatedUnderline, Marquee,
} from "../anim";
import { IMAGES } from "../images";
import { ArrowRight, ArrowLeft, Image as ImageIcon, Snowflake as SnowIcon, Boxes, Truck, Factory, X } from "lucide-react";

type GalleryItem = {
  id: number;
  category: number;
  titleEn: string;
  titleAr: string;
  bg: string;
  img: string;
};

export function GalleryPage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir, t } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [active, setActive] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const [imgError, setImgError] = React.useState<Record<number, boolean>>({});

  const items: GalleryItem[] = [
    { id: 1, category: 1, titleEn: "IQF Mango Cubes — close-up", titleAr: "مكعبات مانجو IQF — لقطة قريبة", bg: "from-orange/20 to-orange/5", img: IMAGES.gallery.g1.url },
    { id: 2, category: 1, titleEn: "IQF Mango Slices — premium cut", titleAr: "شرائح مانجو IQF — قطع فاخر", bg: "from-orange/15 to-cream", img: IMAGES.gallery.g2.url },
    { id: 3, category: 1, titleEn: "IQF Strawberry — whole", titleAr: "فراولة IQF — كاملة", bg: "from-rose-500/15 to-cream", img: IMAGES.gallery.g3.url },
    { id: 4, category: 1, titleEn: "Mixed Fruits blend", titleAr: "خلطات فواكه", bg: "from-teal/15 to-orange/10", img: IMAGES.gallery.g4.url },
    { id: 5, category: 2, titleEn: "Bulk carton 10kg", titleAr: "كرتونة جملة 10kg", bg: "from-amber-200/30 to-cream", img: IMAGES.gallery.g5.url },
    { id: 6, category: 2, titleEn: "Retail pack 1kg", titleAr: "عبوة تجزئة 1kg", bg: "from-teal/15 to-cream", img: IMAGES.gallery.g6.url },
    { id: 7, category: 3, titleEn: "Cold storage at -18°C", titleAr: "مخزن مبرد -18°C", bg: "from-teal via-teal-dark to-teal", img: IMAGES.gallery.g7.url },
    { id: 8, category: 3, titleEn: "Cold room interior", titleAr: "داخل المخزن المبرد", bg: "from-cyan-700/30 to-teal", img: IMAGES.gallery.g8.url },
    { id: 9, category: 4, titleEn: "Reefer container loading", titleAr: "تحميل الكونتينر المبرد", bg: "from-teal/20 to-orange/10", img: IMAGES.gallery.g9.url },
    { id: 10, category: 4, titleEn: "Reefer en route to GCC", titleAr: "الكونتينر في طريق الخليج", bg: "from-orange/20 to-teal/15", img: IMAGES.gallery.g10.url },
    { id: 11, category: 5, titleEn: "Sorting & inspection", titleAr: "الفرز والتفتيش", bg: "from-teal/10 to-cream", img: IMAGES.gallery.g11.url },
    { id: 12, category: 5, titleEn: "IQF freezing line", titleAr: "خط التجميد IQF", bg: "from-orange/15 to-teal/10", img: IMAGES.gallery.g12.url },
  ];

  const filtered = active === 0 ? items : items.filter((it) => it.category === active);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <FrostField count={20} className="opacity-50" />
        <FloatingShape shape="star" className="absolute top-24 right-[10%] text-teal/25 hidden lg:block" size={56} delay={0.2} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal><Kicker>{c.gallery.kicker}</Kicker></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                <span className="block text-foreground">{c.gallery.title.split(" ").slice(0, 3).join(" ")}</span>
                <span className="block text-gradient-teal mt-2">{c.gallery.title.split(" ").slice(3).join(" ")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <AnimatedUnderline className="mt-6 w-32" />
              <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {c.gallery.desc}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {[
              dir === "rtl" ? "صور حقيقية" : "Real photography",
              dir === "rtl" ? "إضاءة نظيفة" : "Clean lighting",
              dir === "rtl" ? "خلفيات teal/cream" : "Teal/cream backgrounds",
              dir === "rtl" ? "بدون فلاتر مبالغة" : "No over-filters",
              dir === "rtl" ? "تعليقات واضحة" : "Clear captions",
            ].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-6 text-sm font-serif-display font-semibold text-teal">
                <ImageIcon className="w-3.5 h-3.5 text-orange" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/85 backdrop-blur-md border-y border-teal/12 py-3">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto">
          {c.gallery.categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                active === i
                  ? "bg-teal text-teal-foreground"
                  : "bg-card border border-teal/15 text-foreground hover:bg-teal/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setLightbox(item.id)}
                  className={`group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${item.bg} border border-teal/15 hover-lift text-left`}
                >
                  {/* Real CDN photo */}
                  {!imgError[item.id] && (
                    <motion.img
                      src={item.img}
                      alt={dir === "rtl" ? item.titleAr : item.titleEn}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      onError={() => setImgError((p) => ({ ...p, [item.id]: true }))}
                    />
                  )}

                  {/* Background pattern fallback (also visible over image) */}
                  <div className="absolute inset-0 bg-grid-teal opacity-10 mix-blend-overlay" />

                  {/* Color tint overlay for brand cohesion */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-40 mix-blend-multiply`} />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-card/85 backdrop-blur-sm text-teal">
                      {c.gallery.categories[item.category]}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-card/85 backdrop-blur-sm">
                      #{String(item.id).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                    <div className="text-xs font-semibold text-white">
                      {dir === "rtl" ? item.titleAr : item.titleEn}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-teal/0 group-hover:bg-teal/10 transition-colors" />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground text-sm">
              {dir === "rtl" ? "لا توجد صور في هذا القسم" : "No images in this category"}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES OVERVIEW */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-transparent via-teal/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Kicker>{dir === "rtl" ? "كل الأقسام" : "All categories"}</Kicker></div>
            <h2 className="mt-4 font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "خمس فئات من المحتوى الحقيقي" : "Five categories of real content"}
            </h2>
            <AnimatedUnderline className="mt-5 w-20 mx-auto" />
          </div>

          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { cat: 1, icon: <SnowIcon className="w-5 h-5" />, label: dir === "rtl" ? "منتجات" : "Products" },
              { cat: 2, icon: <Boxes className="w-5 h-5" />, label: dir === "rtl" ? "تعبئة" : "Packaging" },
              { cat: 3, icon: <SnowIcon className="w-5 h-5" />, label: dir === "rtl" ? "مخزن مبرد" : "Cold Storage" },
              { cat: 4, icon: <Truck className="w-5 h-5" />, label: dir === "rtl" ? "لوجستيات" : "Logistics" },
              { cat: 5, icon: <Factory className="w-5 h-5" />, label: dir === "rtl" ? "عملية" : "Process" },
            ].map((cInfo, i) => (
              <motion.button
                key={i}
                variants={staggerItem}
                onClick={() => {
                  setActive(cInfo.cat);
                  window.scrollTo({ top: 600, behavior: "smooth" });
                }}
                className={`group p-5 rounded-2xl border hover-lift text-center ${
                  active === cInfo.cat ? "bg-teal text-teal-foreground border-teal" : "bg-card border-teal/12 hover:border-teal/30"
                }`}
              >
                <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  active === cInfo.cat ? "bg-white/15" : "bg-teal/10 text-teal group-hover:bg-orange group-hover:text-orange-foreground"
                } transition-colors`}>
                  {cInfo.icon}
                </div>
                <div className="text-xs font-semibold">{cInfo.label}</div>
              </motion.button>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 lg:py-20 bg-teal/5 border-t border-teal/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "تحب تشوف صور المنتج الحقيقية؟" : "Want real product photography?"}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "الصور المعروضة حالياً Placeholders. سنرسل لك صوراً حقيقية للمنتج والتعبئة عند الطلب."
                : "Currently displayed placeholders. We'll send you real product and packaging photos on request."}
            </p>
            <button
              onClick={() => { window.location.href = "/contact" }}
              className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
            >
              {dir === "rtl" ? "اطلب صور حقيقية" : "Request real photos"}
              <Arrow className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-3xl w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${items.find((i) => i.id === lightbox)?.bg} border border-white/15 shadow-2xl`}
            >
              {/* Real CDN image */}
              <img
                src={items.find((i) => i.id === lightbox)!.img.replace("w=800", "w=1280")}
                alt={dir === "rtl" ? items.find((i) => i.id === lightbox)!.titleAr : items.find((i) => i.id === lightbox)!.titleEn}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${items.find((i) => i.id === lightbox)?.bg} opacity-40 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-grid-teal opacity-10 mix-blend-overlay" />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold mb-1">
                  {c.gallery.categories[items.find((i) => i.id === lightbox)!.category]}
                </div>
                <div className="text-lg font-serif-display font-bold text-white">
                  {dir === "rtl" ? items.find((i) => i.id === lightbox)!.titleAr : items.find((i) => i.id === lightbox)!.titleEn}
                </div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useContent } from "../content";
import { useNav } from "../nav-provider";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Marquee,
  Counter, Kicker, AnimatedUnderline, Parallax, Magnetic,
} from "../anim";
import { IMAGES } from "../images";
import { Play, ArrowUpRight, ArrowRight, ArrowLeft, Snowflake as SnowIcon, ShieldCheck, Package, Globe2, Clock3, Send, Sparkles, Factory, Truck, Thermometer, ShieldCheck as ShieldCheckIcon } from "lucide-react";

export function HomePage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative pt-10 lg:pt-16 pb-20 lg:pb-32 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-teal opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        {/* Frost field */}
        <FrostField count={24} className="opacity-60" />

        {/* Floating decorative shapes */}
        <FloatingShape shape="leaf" className="absolute top-32 left-[8%] text-teal/30 hidden md:block" size={56} delay={0.2} />
        <FloatingShape shape="drop" className="absolute top-48 right-[12%] text-orange/30 hidden md:block" size={64} delay={0.5} />
        <FloatingShape shape="star" className="absolute bottom-32 left-[15%] text-teal/25 hidden lg:block" size={40} delay={0.8} />
        <FloatingShape shape="cube" className="absolute bottom-48 right-[6%] text-orange/25 hidden lg:block" size={48} delay={1.1} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 relative z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/30 bg-teal/5 text-teal text-[11px] font-semibold tracking-[0.18em] uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                  </span>
                  {c.hero.badge}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-6 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                  <span className="block text-foreground">{c.hero.title1}</span>
                  <span className="block text-gradient-teal">{c.hero.title2}</span>
                  <span className="block text-foreground">{dir === "rtl" ? "الخليج" : "Markets"}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {c.hero.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={0.15}>
                    <button
                      onClick={() => { window.location.href = "/contact" }}
                      className="shine-hover group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-orange-foreground font-semibold shadow-lg shadow-orange/25 hover:bg-orange-dark transition-colors"
                    >
                      {c.hero.cta1}
                      <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </button>
                  </Magnetic>
                  <Magnetic strength={0.15}>
                    <button
                      onClick={() => navigate("quality")}
                      className="group inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-teal text-teal font-semibold hover:bg-teal hover:text-teal-foreground transition-colors"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      {c.hero.cta2}
                    </button>
                  </Magnetic>
                </div>
              </Reveal>

              {/* Proof cards */}
              <Reveal delay={0.45}>
                <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                  {[
                    { icon: <SnowIcon className="w-4 h-4" />, label: c.hero.proof1 },
                    { icon: <Globe2 className="w-4 h-4" />, label: c.hero.proof2 },
                    { icon: <Package className="w-4 h-4" />, label: c.hero.proof3 },
                  ].map((p, i) => (
                    <div key={i} className="rounded-xl border border-teal/15 bg-card/60 backdrop-blur-sm p-3 sm:p-4 hover-lift">
                      <div className="flex items-center gap-2 text-teal">{p.icon}</div>
                      <div className="mt-2 text-[11px] sm:text-xs font-semibold leading-tight">{p.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Visual column */}
            <div className="lg:col-span-5 relative">
              <Parallax offset={30}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-teal via-teal-dark to-teal shadow-2xl shadow-teal/30"
                >
                  {/* Real CDN photo background */}
                  <motion.img
                    src={IMAGES.hero.mangoHalf}
                    alt="Premium IQF mango — fresh Egyptian mango ready for freezing"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Teal gradient overlay for brand cohesion */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/95 via-teal/40 to-teal-dark/30" />
                  <div className="absolute inset-0 opacity-25" style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                  }} />

                  {/* Big snowflake rotating */}
                  <motion.div
                    className="absolute top-6 right-6 text-white/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <SnowIcon className="w-12 h-12" />
                  </motion.div>

                  {/* Bottom overlay: temp + tag */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-teal-dark/95 via-teal-dark/60 to-transparent">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">Cold chain</div>
                        <div className="font-serif-display text-3xl font-bold text-white tabular-nums">-18°C</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">Egypt → GCC</div>
                        <div className="font-serif-display text-xl font-semibold text-orange-light">6 markets</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Parallax>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-4 -left-4 lg:-left-8 bg-card border border-teal/15 rounded-2xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Export ready</div>
                    <div className="text-xs font-semibold">IQF certified flow</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Marquee strip at hero bottom */}
        <div className="relative mt-16 lg:mt-24 border-y border-teal/15 bg-teal/5 py-4">
          <Marquee>
            {[
              "IQF Mango Cubes", "IQF Mango Slices", "IQF Strawberry", "Mixed Fruits",
              "Seasonal Fruits", "Bulk Cartons", "Retail Packs", "Private Label",
              "Arabic / English Labels", "-18°C Cold Chain", "GCC Export Ready",
            ].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-6 text-sm font-serif-display font-semibold text-teal">
                <SnowIcon className="w-3.5 h-3.5 text-orange" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============ PROMO VIDEO ============ */}
      <PromoVideoSection />

      {/* ============ PRODUCT RANGE ============ */}
      <section className="relative py-20 lg:py-28 section-band">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <Kicker>{c.products.kicker}</Kicker>
              <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight max-w-xl text-balance">
                {c.products.title}
              </h2>
              <AnimatedUnderline className="mt-5 w-24" />
            </div>
            <p className="text-muted-foreground max-w-md text-sm lg:text-base leading-relaxed">
              {c.products.desc}
            </p>
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.products.items.map((p, i) => {
              const heroImg = [
                IMAGES.products.mangoCubes,
                IMAGES.products.mangoSlices,
                IMAGES.products.strawberry,
                IMAGES.products.mixedFruit,
                IMAGES.products.mixedFruit,
              ][i];
              return (
                <motion.div key={p.id} variants={staggerItem}>
                  <button
                    onClick={() => navigate("products")}
                    className="group relative w-full h-full text-left rounded-2xl bg-card border border-teal/12 hover-lift overflow-hidden"
                  >
                    {/* Real CDN product photo */}
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cream to-teal/10">
                      <motion.img
                        src={heroImg}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      {/* IQF badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-teal/90 backdrop-blur-sm text-teal-foreground text-[10px] font-bold tracking-wider">
                        IQF
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="relative font-serif-display text-lg font-bold leading-tight">
                        {p.name}
                      </h3>
                      <p className="relative mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {p.short}
                      </p>

                      {/* Tags */}
                      <div className="relative mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map((tag, ti) => (
                          <span key={ti} className="tag-cream text-[10px] px-2 py-0.5 rounded-full font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="relative mt-4 pt-3 border-t border-teal/10 flex items-center justify-between">
                        <span className="text-xs font-semibold text-teal group-hover:text-orange transition-colors">
                          {p.cta}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-teal group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ============ QUALITY & COLD CHAIN TEASER ============ */}
      <ColdChainTeaser />

      {/* ============ GCC COVERAGE ============ */}
      <section className="relative py-20 lg:py-28 bg-teal/5 border-y border-teal/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Kicker>{c.gcc.kicker}</Kicker>
              <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
                {c.gcc.title}
              </h2>
              <AnimatedUnderline className="mt-5 w-24" />
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
                {c.gcc.desc}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {c.gcc.countries.map((country, i) => (
                  <Reveal key={country.code} delay={i * 0.05}>
                    <button
                      onClick={() => navigate("gcc")}
                      className="group w-full text-left p-3 rounded-xl bg-card border border-teal/15 hover:border-orange hover-lift"
                    >
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{country.code}</div>
                      <div className="mt-1 text-sm font-semibold leading-tight group-hover:text-orange transition-colors">
                        {country.name}
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <button
                  onClick={() => navigate("gcc")}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-orange transition-colors"
                >
                  {c.gcc.cta}
                  <Arrow className="w-4 h-4" />
                </button>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="relative rounded-3xl bg-card border border-teal/15 shadow-xl overflow-hidden">
                {/* Real Egypt photo as map backdrop */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={IMAGES.gcc.egypt}
                    alt="Egypt — export origin"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-teal text-teal-foreground text-[10px] font-bold tracking-wider uppercase">
                    {dir === "rtl" ? "مصر → الخليج" : "Egypt → GCC"}
                  </div>
                  {/* Country chips */}
                  <div className="absolute bottom-4 inset-x-4 flex flex-wrap gap-1.5">
                    {["SA", "AE", "KW", "QA", "BH", "OM"].map((code, ci) => (
                      <span key={code} className="px-2 py-0.5 rounded-full bg-card/95 backdrop-blur-sm text-teal text-[10px] font-bold">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 grid grid-cols-3 gap-3">
                  <Stat label={dir === "rtl" ? "دولة خليجية" : "GCC markets"} value={6} suffix="" />
                  <Stat label={dir === "rtl" ? "ميناء وصول" : "Ports"} value={12} suffix="+" />
                  <Stat label={dir === "rtl" ? "سنة تصدير" : "Export yrs"} value={8} suffix="+" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES SERVED ============ */}
      <section className="relative py-20 lg:py-28 section-band">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center"><Kicker>{c.industries.kicker}</Kicker></div>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {c.industries.title}
            </h2>
            <AnimatedUnderline className="mt-5 w-24 mx-auto" />
          </div>

          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {c.industries.items.map((ind, i) => {
              const indImg = [
                IMAGES.industries.factory,
                IMAGES.industries.juice,
                IMAGES.industries.dairy,
                IMAGES.industries.hotel,
                IMAGES.industries.catering,
                IMAGES.industries.retail,
              ][i];
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="group relative rounded-2xl bg-card border border-teal/12 hover:border-teal/30 hover-lift overflow-hidden"
                >
                  {/* Real CDN image */}
                  <div className="relative h-32 overflow-hidden">
                    <motion.img
                      src={indImg}
                      alt={ind.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-teal text-teal-foreground flex items-center justify-center shadow-lg group-hover:bg-orange transition-colors">
                      <Factory className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif-display text-lg font-bold">{ind.name}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{ind.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ============ EXPORT PROCESS ============ */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-transparent via-teal/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <Kicker>{c.process.kicker}</Kicker>
              <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
                {c.process.title}
              </h2>
              <AnimatedUnderline className="mt-5 w-24" />
              <p className="mt-5 text-muted-foreground leading-relaxed">
                {c.process.desc}
              </p>
              <Reveal delay={0.3}>
                <button
                  onClick={() => navigate("process")}
                  className="mt-7 inline-flex items-center gap-2 h-11 px-5 rounded-full border-2 border-teal text-teal font-semibold hover:bg-teal hover:text-teal-foreground transition-colors"
                >
                  {dir === "rtl" ? "تفاصيل العملية" : "View full process"}
                  <Arrow className="w-4 h-4" />
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <StaggerGroup className="space-y-3">
                {c.process.steps.map((s, i) => (
                  <motion.div
                    key={s.n}
                    variants={staggerItem}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-teal/12 hover:border-orange/40 hover-lift"
                  >
                    <div className="relative shrink-0 w-14 h-14 rounded-xl bg-teal/8 text-teal flex items-center justify-center font-serif-display text-xl font-bold group-hover:bg-orange group-hover:text-orange-foreground transition-colors">
                      {s.n}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif-display text-base font-bold">{s.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                    {i < c.process.steps.length - 1 && (
                      <Arrow className="w-4 h-4 text-teal/30 hidden sm:block rtl:rotate-180" />
                    )}
                  </motion.div>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INQUIRY CTA ============ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal-dark to-teal" />
        <FrostField count={20} className="opacity-50" />
        <FloatingShape shape="leaf" className="absolute top-10 right-10 text-white/15" size={80} delay={0.2} />
        <FloatingShape shape="drop" className="absolute bottom-10 left-10 text-white/15" size={64} delay={0.5} />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <Sparkles className="w-8 h-8 text-orange-light mx-auto mb-4" />
            <h2 className="font-serif-display text-3xl lg:text-5xl font-bold text-white leading-tight text-balance">
              {dir === "rtl" ? "جاهز للبدء؟" : "Ready to start?"}
            </h2>
            <p className="mt-5 text-white/90 text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "أرسل استفسارك مؤهلاً — فريق التصدير لدينا سيرد بالمواصفات والسعر المبدئي خلال يوم عمل واحد."
                : "Send a qualified inquiry — our export team responds with specs, indicative pricing and next steps within one business day."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => { window.location.href = "/contact" }}
                className="shine-hover inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-white font-semibold shadow-xl shadow-orange/30 hover:bg-orange-dark transition-colors"
              >
                <Send className="w-4 h-4" />
                {c.nav.requestQuote}
              </button>
              <button
                onClick={() => navigate("products")}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {c.nav.products}
                <Arrow className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ============ Helper components ============ */

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="p-3 rounded-xl bg-teal/5 border border-teal/10">
      <div className="font-serif-display text-2xl font-bold text-teal tabular-nums">
        <Counter to={value} suffix={suffix} />
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 leading-tight">{label}</div>
    </div>
  );
}

function PromoVideoSection() {
  const c = useContent();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [playing, setPlaying] = React.useState(false);

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-transparent via-teal/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <Kicker>{c.promo.kicker}</Kicker>
            <h2 className="mt-4 font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {c.promo.title}
            </h2>
            <AnimatedUnderline className="mt-5 w-20" />
            <p className="mt-5 text-sm lg:text-base text-muted-foreground leading-relaxed">
              {c.promo.desc}
            </p>
            <button
              onClick={() => setPlaying(true)}
              className="mt-7 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
            >
              {c.promo.cta}
              <Arrow className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <Reveal>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal-dark shadow-2xl shadow-teal/30 group">
                {/* Real CDN video poster image */}
                <img
                  src={IMAGES.promoPoster}
                  alt={c.promo.poster}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Teal gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-dark/80 via-teal/40 to-teal-dark/70" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "radial-gradient(circle at 20% 30%, rgba(245, 166, 83, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 40%)",
                }} />

                {/* Floating snowflakes */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/40"
                    style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 3) * 15}%` }}
                    animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <SnowIcon className="w-8 h-8" />
                  </motion.div>
                ))}

                {/* Center play button */}
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={c.promo.play}
                >
                  <span className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/95 text-teal flex items-center justify-center shadow-2xl pulse-ring">
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 fill-current ml-1" />
                  </span>
                </button>

                {/* Top badges */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white">60s</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white">EN · AR</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-orange text-white">Export-ready</span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white/90 text-xs">
                  {c.promo.poster}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setPlaying(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-card rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
              <div>
                <SnowIcon className="w-16 h-16 text-teal mx-auto mb-4" />
                <h3 className="font-serif-display text-2xl font-bold text-foreground">
                  {dir === "rtl" ? "فيديو برومو احترافي" : "Promo video coming soon"}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md">
                  {dir === "rtl"
                    ? "سيتم استضافة الفيديو على CDN خارجي للسرعة. هذه نسخة تجريبية للمعاينة."
                    : "The video will be hosted on an external CDN for speed. This is a placeholder preview."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ColdChainTeaser() {
  const c = useContent();
  const { dir } = useLang();
  const { navigate } = useNav();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <Kicker>{c.quality.kicker}</Kicker>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {c.quality.title}
            </h2>
            <AnimatedUnderline className="mt-5 w-24" />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {c.quality.desc}
            </p>

            <StaggerGroup className="mt-8 grid grid-cols-2 gap-3">
              {c.quality.pillars.slice(0, 4).map((p, i) => (
                <motion.div key={i} variants={staggerItem} className="p-4 rounded-xl bg-card border border-teal/12 hover:border-teal/30 transition-colors">
                  <h3 className="font-serif-display text-sm font-bold text-teal">{p.title}</h3>
                  <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </StaggerGroup>

            <Reveal delay={0.3}>
              <button
                onClick={() => navigate("quality")}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-orange transition-colors"
              >
                {dir === "rtl" ? "استكشف الجودة كاملة" : "Explore full quality story"}
                <Arrow className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="relative rounded-3xl bg-gradient-to-br from-teal/8 to-orange/8 border border-teal/15 p-6 lg:p-8">
                {/* Cold chain timeline */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif-display text-lg font-bold">
                    {dir === "rtl" ? "رحلة المنتج المجمد" : "Frozen product journey"}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-teal">
                    <Thermometer className="w-4 h-4" />
                    ≤ -18°C always
                  </div>
                </div>

                <div className="relative">
                  {/* Connector line */}
                  <div className="absolute top-7 left-7 right-7 h-px bg-gradient-to-r from-teal via-orange to-teal opacity-50 hidden sm:block" />

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                    {c.quality.chain.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="text-center"
                      >
                        <div className="relative mx-auto w-14 h-14 rounded-full bg-card border-2 border-teal flex items-center justify-center mb-2 shadow-md">
                          <span className="font-serif-display text-xs font-bold text-teal">{step.step}</span>
                          {i < c.quality.chain.length - 1 && (
                            <span className="hidden sm:block absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-orange -translate-y-1/2" />
                          )}
                        </div>
                        <div className="text-[11px] font-semibold leading-tight">{step.title}</div>
                        <div className="mt-1 text-[10px] font-mono text-teal">{step.temp}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-7 pt-5 border-t border-teal/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange/15 text-orange flex items-center justify-center">
                      <ShieldCheckIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{c.quality.certs.title.split("—")[0]}</div>
                      <div className="text-[10px] text-muted-foreground">{dir === "rtl" ? "موثقة وصادقة" : "Documented & honest"}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("quality")}
                    className="text-xs font-semibold text-teal hover:text-orange transition-colors inline-flex items-center gap-1"
                  >
                    {c.quality.certs.cta}
                    <Arrow className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

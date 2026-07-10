"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useContent } from "../content";
import { useNav } from "../nav-provider";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Kicker, AnimatedUnderline, Marquee, Counter, Magnetic,
} from "../anim";
import { IMAGES } from "../images";
import { Flag } from "../flag";
import { ArrowRight, ArrowLeft, MapPin, Ship, Building2, Hotel, ShoppingBag, Plane, Anchor, Snowflake as SnowIcon, ArrowUpRight } from "lucide-react";

export function GccPage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [active, setActive] = React.useState(0);

  const flagColors: Record<string, [string, string]> = {
    SA: ["#006C35", "#FFFFFF"],
    AE: ["#00732F", "#FF0000"],
    KW: ["#007A3D", "#CE1126"],
    QA: ["#8A1538", "#FFFFFF"],
    BH: ["#FFFFFF", "#CE1126"],
    OM: ["#FFFFFF", "#C8102E"],
  };

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <FrostField count={20} className="opacity-50" />
        <FloatingShape shape="star" className="absolute top-24 right-[12%] text-teal/25 hidden lg:block" size={56} delay={0.2} />
        <FloatingShape shape="leaf" className="absolute bottom-20 left-[8%] text-orange/25 hidden lg:block" size={48} delay={0.5} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal><Kicker>{c.gcc.kicker}</Kicker></Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                  <span className="block text-foreground">{c.gcc.title.split(" ").slice(0, 4).join(" ")}</span>
                  <span className="block text-gradient-teal mt-2">{c.gcc.title.split(" ").slice(4).join(" ")}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <AnimatedUnderline className="mt-6 w-32" />
                <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {c.gcc.desc}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                  <MiniStat value={6} label={dir === "rtl" ? "دول خليجية" : "GCC nations"} />
                  <MiniStat value={12} suffix="+" label={dir === "rtl" ? "موانئ وصول" : "Arrival ports"} />
                  <MiniStat value={8} suffix="+" label={dir === "rtl" ? "سنوات تصدير" : "Export years"} />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <div className="relative rounded-3xl bg-card border border-teal/15 shadow-xl overflow-hidden">
                {/* Egypt photo as map backdrop */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={IMAGES.gcc.egypt}
                    alt="Egypt — export origin to GCC markets"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal text-teal-foreground text-[10px] font-semibold uppercase tracking-wider">
                      <Ship className="w-3 h-3" />
                      {dir === "rtl" ? "طرق التصدير" : "Export routes"}
                    </div>
                    <div className="text-[10px] font-mono text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">Egypt → GCC</div>
                  </div>
                  {/* Country chips along bottom */}
                  <div className="absolute bottom-4 inset-x-4 flex flex-wrap gap-1.5">
                    {["SA", "AE", "KW", "QA", "BH", "OM"].map((code, ci) => (
                      <span key={code} className="px-2 py-0.5 rounded-full bg-card/95 backdrop-blur-sm text-teal text-[10px] font-bold">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {c.gcc.countries.map((country, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-6 text-sm font-serif-display font-semibold text-teal">
                <span className="w-2 h-2 rounded-full bg-orange" />
                {country.name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* COUNTRY GRID — Creative staggered hexagonal-style cards with real flags */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.gcc.countries.map((country, i) => {
              const [c1, c2] = flagColors[country.code];
              const isActive = active === i;
              // Asymmetric layout — every other card pushed down for editorial feel
              const offsetClass = i % 3 === 1 ? "lg:translate-y-8" : i % 3 === 2 ? "lg:translate-y-4" : "";
              const countryImg = [
                IMAGES.gcc.saudi, IMAGES.gcc.uae, IMAGES.gcc.kuwait,
                IMAGES.gcc.qatar, IMAGES.gcc.bahrain, IMAGES.gcc.oman,
              ][i];
              return (
                <motion.button
                  key={country.code}
                  variants={staggerItem}
                  onClick={() => {
                    setActive(i);
                    document.getElementById(`country-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`group relative surface-card rounded-3xl overflow-hidden hover-lift text-left transition-all duration-500 ${
                    isActive ? "ring-2 ring-orange ring-offset-2 ring-offset-background" : ""
                  } ${offsetClass}`}
                >
                  {/* Top: Real flag + photo combo */}
                  <div className="relative h-44 overflow-hidden">
                    {/* Country photo */}
                    <img
                      src={countryImg}
                      alt={`${country.name} — GCC market`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Color gradient using country's primary color */}
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-55"
                      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c1}99 50%, ${c1}55 100%)` }}
                    />
                    {/* Bottom dark fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Real flag as a tilted "stamp" top-left */}
                    <div className="absolute top-3 left-3 w-12 h-8 rounded-md overflow-hidden shadow-lg ring-2 ring-white/40 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Flag code={country.code as "SA" | "AE" | "KW" | "QA" | "BH" | "OM"} />
                    </div>

                    {/* Market number top-right */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-serif-display font-bold flex items-center justify-center border border-white/20">
                      0{i + 1}
                    </div>

                    {/* Country name overlaid on photo */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[9px] uppercase tracking-[0.25em] text-white/80 font-bold">MARKET {country.code}</div>
                      <h3 className="font-serif-display text-2xl font-bold text-white leading-tight mt-0.5">{country.name}</h3>
                    </div>
                  </div>

                  {/* Bottom: info */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-teal" />
                      {country.cities}
                    </div>

                    {/* Buyer types preview */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {country.focus.split("·").slice(0, 2).map((bt, bi) => (
                        <span key={bi} className="text-[10px] px-2 py-0.5 rounded-full bg-teal/8 text-teal font-medium">
                          {bt.trim()}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-4 pt-3 border-t border-teal/10 flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal group-hover:text-orange transition-colors">
                        {dir === "rtl" ? "تفاصيل السوق" : "View market"}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-teal group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Active state decorative corner */}
                  {isActive && (
                    <motion.div
                      layoutId="country-active-corner"
                      className="absolute -top-px -right-px w-20 h-20 overflow-hidden pointer-events-none"
                    >
                      <div className="absolute top-0 right-0 bg-orange text-white text-[9px] font-bold px-3 py-1 rotate-45 translate-x-5 translate-y-3 shadow-md">
                        ACTIVE
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* DETAILED COUNTRY BLOCKS */}
      <div>
        {c.gcc.countries.map((country, i) => {
          const [c1, c2] = flagColors[country.code];
          const isReversed = i % 2 === 1;
          const buyerTypes = country.focus.split("·").map((s) => s.trim());
          return (
            <section
              key={country.code}
              id={`country-${i}`}
              className={`relative py-16 lg:py-24 border-b border-teal/10 section-band`}
            >
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}>
                    <Reveal>
                      <div className="flex items-center gap-4 mb-4">
                        {/* Real flag */}
                        <div className="w-16 h-11 rounded-md overflow-hidden shadow-float ring-2 ring-white/60 dark:ring-white/10">
                          <Flag code={country.code as "SA" | "AE" | "KW" | "QA" | "BH" | "OM"} />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-orange font-bold">MARKET / 0{i + 1}</div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{dir === "rtl" ? "دولة خليجية" : "GCC market"}</div>
                        </div>
                      </div>
                      <h2 className="font-serif-display text-3xl lg:text-5xl font-bold leading-tight">{country.name}</h2>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-teal" />
                        {country.cities}
                      </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                      <div className="mt-7">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                          {dir === "rtl" ? "أنواع المشترين" : "Buyer types"}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {buyerTypes.map((bt, bi) => {
                            const Icon = [Building2, ShoppingBag, Hotel, Plane, Anchor][bi % 5];
                            return (
                              <span key={bi} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-teal/15 text-xs font-medium hover:border-orange hover-lift">
                                <Icon className="w-3.5 h-3.5 text-teal" />
                                {bt}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </Reveal>

                    <Reveal delay={0.25}>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Magnetic strength={0.15}>
                          <button
                            onClick={() => navigate("contact")}
                            className="shine-hover inline-flex items-center gap-2 h-11 px-5 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
                          >
                            {dir === "rtl" ? `اطلب عرض سعر لـ ${country.name}` : `Request quote for ${country.name}`}
                            <Arrow className="w-4 h-4" />
                          </button>
                        </Magnetic>
                      </div>
                    </Reveal>
                  </div>

                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <Reveal delay={0.2}>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}, ${c1}DD 60%, ${c1}99)` }}>
                        {/* Real CDN photo of country */}
                        <motion.img
                          src={[
                            IMAGES.gcc.saudi,
                            IMAGES.gcc.uae,
                            IMAGES.gcc.kuwait,
                            IMAGES.gcc.qatar,
                            IMAGES.gcc.bahrain,
                            IMAGES.gcc.oman,
                          ][i]}
                          alt={`${country.name} — export market`}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ scale: 1.08 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        {/* Country color gradient overlay */}
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c1}EE 0%, ${c1}99 50%, ${c1}66 100%)`, mixBlendMode: "multiply" }} />
                        <div className="absolute inset-0 opacity-30" style={{
                          backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        }} />

                        {/* Country code huge */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 0.18 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="font-serif-display text-[180px] font-bold text-white leading-none"
                          >
                            {country.code}
                          </motion.div>
                        </div>

                        {/* Snowflake */}
                        <motion.div
                          className="absolute top-5 right-5 text-white/60"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                          <SnowIcon className="w-12 h-12" />
                        </motion.div>

                        {/* Floating particles */}
                        {Array.from({ length: 6 }).map((_, pi) => (
                          <motion.span
                            key={pi}
                            className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
                            style={{ left: `${20 + pi * 12}%`, top: `${15 + (pi % 3) * 25}%` }}
                            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 4 + pi, repeat: Infinity, ease: "easeInOut", delay: pi * 0.3 }}
                          />
                        ))}

                        {/* Bottom info */}
                        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/50 to-transparent">
                          <div className="text-white">
                            <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Egypt → {country.name}</div>
                            <div className="font-serif-display text-xl font-bold mt-1">Reefer shipping route</div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="relative py-16 lg:py-20 bg-teal/5 border-t border-teal/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {c.gcc.cta}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "اختر دولتك، حدد المنتج والكمية — فريق التصدير يرد بعرض سعر مفصل خلال يوم عمل."
                : "Pick your country, specify product and quantity — our export team responds with a detailed quote within one business day."}
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

function MiniStat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="p-3 rounded-xl bg-card border border-teal/12">
      <div className="font-serif-display text-2xl font-bold text-teal tabular-nums">
        <Counter to={value} suffix={suffix} />
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}

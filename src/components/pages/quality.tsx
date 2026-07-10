"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useContent } from "../content";
import { useNav } from "../nav-provider";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Kicker, AnimatedUnderline, Counter, Marquee,
} from "../anim";
import { IMAGES } from "../images";
import {
  ArrowRight, ArrowLeft, Snowflake as SnowIcon, ShieldCheck, FileCheck, Download,
  CheckCircle2, FileText, Lock, Truck, Anchor,
} from "lucide-react";

export function QualityPage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <FrostField count={28} className="opacity-70" />
        <FloatingShape shape="drop" className="absolute top-20 left-[10%] text-teal/30 hidden lg:block" size={64} delay={0.2} />
        <FloatingShape shape="cube" className="absolute top-32 right-[8%] text-orange/25 hidden lg:block" size={56} delay={0.5} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal><Kicker>{c.quality.kicker}</Kicker></Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                  <span className="block text-foreground">{c.quality.title.split(" ").slice(0, 3).join(" ")}</span>
                  <span className="block text-gradient-teal mt-2">{c.quality.title.split(" ").slice(3).join(" ")}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <AnimatedUnderline className="mt-6 w-32" />
                <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {c.quality.desc}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20">
                    <SnowIcon className="w-4 h-4 text-teal" />
                    <span className="text-xs font-mono font-semibold">≤ -18°C</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20">
                    <ShieldCheck className="w-4 h-4 text-orange" />
                    <span className="text-xs font-semibold">{dir === "rtl" ? "موثق وصادق" : "Documented & honest"}</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-teal via-teal-dark to-teal overflow-hidden shadow-2xl shadow-teal/30">
                  {/* Real CDN photo of cold storage */}
                  <img
                    src={IMAGES.quality.coldStorage}
                    alt="Cold storage warehouse at -18°C"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/95 via-teal/30 to-teal-dark/40" />
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                  }} />

                  {/* Big rotating snowflake */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white/40 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <SnowIcon className="w-1/3 max-w-[120px] h-auto" />
                  </motion.div>

                  {/* Floating particles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
                      style={{ left: `${15 + i * 9}%`, top: `${20 + (i % 4) * 18}%` }}
                      animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                  ))}

                  {/* Center label */}
                  <div className="absolute bottom-8 inset-x-8 text-center text-white">
                    <div className="text-[10px] uppercase tracking-[0.25em] opacity-80">Cold Chain</div>
                    <div className="font-serif-display text-5xl font-bold tabular-nums">-18°C</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {[
              "Sourcing control", "Sorting & inspection", "IQF freezing",
              "Export packaging", "Documentation", "Batch traceability", "Cold chain monitored",
            ].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5 text-sm font-serif-display font-semibold text-teal">
                <SnowIcon className="w-3.5 h-3.5 text-orange" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* QUALITY PILLARS */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <Kicker>{dir === "rtl" ? "ركائز الجودة" : "Quality pillars"}</Kicker>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "ست ركائز تتحكم في كل دفعة" : "Six pillars controlling every batch"}
            </h2>
            <AnimatedUnderline className="mt-5 w-24" />
          </div>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.quality.pillars.map((p, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group relative p-6 rounded-2xl bg-card border border-teal/12 hover:border-teal/30 hover-lift overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-teal/5 transition-transform group-hover:scale-150 duration-700" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-serif-display text-3xl font-bold text-teal/15 tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className="font-serif-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* COLD CHAIN VISUAL */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-transparent via-teal/5 to-transparent overflow-hidden">
        <FrostField count={20} className="opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center"><Kicker>{dir === "rtl" ? "سلسلة التبريد" : "Cold chain"}</Kicker></div>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "من التجميد حتى الوصول للخليج" : "From freezing to GCC arrival"}
            </h2>
            <AnimatedUnderline className="mt-5 w-24 mx-auto" />
          </div>

          {/* Vertical timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 rtl:right-8 rtl:left-auto top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal via-orange to-teal opacity-40" />

            <StaggerGroup className="space-y-6">
              {c.quality.chain.map((step, i) => {
                const icons = [SnowIcon, ShieldCheck, Truck, Anchor, CheckCircle2];
                const Icon = icons[i] || SnowIcon;
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="relative flex items-start gap-6 ps-0"
                  >
                    <div className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-card border-2 border-teal flex items-center justify-center shadow-lg ms-0">
                      <div className="absolute inset-0 rounded-full bg-teal/15 animate-ping opacity-30" style={{ animationDelay: `${i * 0.5}s` }} />
                      <Icon className="w-6 h-6 text-teal" />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-serif-display text-xs font-bold text-orange tabular-nums">{step.step}</span>
                        <span className="h-px w-8 bg-orange/30" />
                        <span className="text-xs font-mono text-teal bg-teal/8 px-2 py-0.5 rounded">{step.temp}</span>
                      </div>
                      <h3 className="font-serif-display text-xl font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {dir === "rtl"
                          ? ["تجميد فردي سريع للحفاظ على الشكل والطعم والملمس.", "تخزين في مخازن مبردة بدرجة حرارة ثابتة.", "تحميل الكونتينر المبرد بمراقبة الحرارة.", "شحن بحري/بري مراقب الحرارة حتى الميناء.", "وصول المنتج للحفظ في وجهة الخليج."][i]
                          : ["Individual quick freezing preserves shape, taste and texture.", "Storage in cold rooms with stable temperature.", "Loading reefer container with temperature monitoring.", "Sea/land shipping with temperature control to port.", "Product arrives for storage at GCC destination."][i]}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerGroup>
          </div>

          {/* Reefer illustration */}
          <Reveal delay={0.3}>
            <div className="mt-16 relative rounded-3xl bg-gradient-to-br from-teal-dark via-teal to-teal-dark overflow-hidden shadow-2xl">
              {/* Real CDN photo of cargo ship */}
              <img
                src={IMAGES.quality.reeferContainer}
                alt="Reefer container shipping"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/95 via-teal-dark/80 to-teal-dark/40" />
              <div className="absolute inset-0 bg-grid-teal opacity-20 mix-blend-overlay" />
              <FrostField count={16} className="opacity-50" />
              <div className="relative p-8 lg:p-12 grid lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-1">
                  <div className="text-xs uppercase tracking-widest text-white/70 mb-2">Reefer container</div>
                  <div className="font-serif-display text-4xl font-bold text-white">≤ -18°C</div>
                  <div className="mt-1 text-sm text-white/70">monitored end-to-end</div>
                </div>
                <div className="lg:col-span-2">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <Truck className="w-10 h-10" />
                    <div className="flex-1 h-px bg-white/30" />
                    <Anchor className="w-10 h-10" />
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATIONS — HONEST WORDING */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Kicker>{dir === "rtl" ? "شهادات ومستندات" : "Certifications & docs"}</Kicker>
              <h2 className="mt-4 font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
                {c.quality.certs.title}
              </h2>
              <AnimatedUnderline className="mt-5 w-20" />
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {c.quality.certs.desc}
              </p>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Documents list */}
                  <div className="p-5 rounded-2xl bg-card border border-teal/12">
                    <div className="flex items-center gap-2 mb-3">
                      <FileCheck className="w-5 h-5 text-teal" />
                      <h3 className="font-serif-display text-sm font-bold uppercase tracking-wider">
                        {dir === "rtl" ? "المستندات المتاحة" : "Documents available"}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {c.quality.certs.docs.split("·").map((d, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          {d.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gated download */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-teal/8 to-orange/8 border border-teal/15">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="w-5 h-5 text-orange" />
                      <h3 className="font-serif-display text-sm font-bold uppercase tracking-wider">
                        {dir === "rtl" ? "تحميل محجوب" : "Gated download"}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {dir === "rtl"
                        ? "أدخل بياناتك لتحميل المستندات المتاحة. كل ملف له تاريخ إصدار لضمان عدم إرسال مواصفات قديمة."
                        : "Enter your details to download available documents. Each file has a version date so we never send outdated specs."}
                    </p>
                    <button
                      onClick={() => navigate("contact")}
                      className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-full bg-orange text-orange-foreground font-semibold text-xs hover:bg-orange-dark transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {c.quality.certs.cta}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="sm:col-span-2 grid grid-cols-3 gap-3 mt-1">
                    <div className="p-4 rounded-xl bg-card border border-teal/12 text-center">
                      <div className="font-serif-display text-2xl font-bold text-teal tabular-nums">
                        <Counter to={6} />
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{dir === "rtl" ? "ركائز جودة" : "Quality pillars"}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-card border border-teal/12 text-center">
                      <div className="font-serif-display text-2xl font-bold text-teal tabular-nums">
                        <Counter to={5} />
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{dir === "rtl" ? "محطات تبريد" : "Cold chain steps"}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-card border border-teal/12 text-center">
                      <div className="font-serif-display text-2xl font-bold text-teal tabular-nums">
                        <Counter to={24} suffix="m" />
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{dir === "rtl" ? "صلاحية بالشهر" : "Shelf life (mo)"}</div>
                    </div>
                  </div>
                </div>
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
              {dir === "rtl" ? "تحب تشوف المستندات المتاحة؟" : "Want to see available documents?"}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "أرسل استفسارك وحدد المنتج — سنرد بقائمة المستندات المتاحة لك ووجهتك."
                : "Send an inquiry specifying the product — we'll respond with the list of documents available for you and your destination."}
            </p>
            <button
              onClick={() => navigate("contact")}
              className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
            >
              {c.quality.certs.cta}
              <Arrow className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

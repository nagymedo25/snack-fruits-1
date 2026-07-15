"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useContent } from "../content";
import { useNav } from "../nav-provider";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Kicker, AnimatedUnderline, Marquee, Magnetic,
} from "../anim";
import {
  ArrowRight, ArrowLeft, Send, FileText, FileCheck, Package, Snowflake as SnowIcon,
  Ship, CheckCircle2, Clock3, MessageCircle, Mail, FileSearch,
} from "lucide-react";

export function ProcessPage() {
  const c = useContent();
  const { navigate } = useNav();
  const { dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const stepIcons = [Send, FileSearch, FileCheck, Package, SnowIcon, Ship];
  const stepColors = ["#1F6F5F", "#2E8C79", "#4FAE96", "#F5A653", "#F28C28", "#D97414"];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <FrostField count={18} className="opacity-50" />
        <FloatingShape shape="drop" className="absolute top-24 right-[10%] text-teal/30 hidden lg:block" size={56} delay={0.2} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal><Kicker>{c.process.kicker}</Kicker></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                <span className="block text-foreground">{c.process.title.split(" ").slice(0, 3).join(" ")}</span>
                <span className="block text-gradient-teal mt-2">{c.process.title.split(" ").slice(3).join(" ")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <AnimatedUnderline className="mt-6 w-32" />
              <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {c.process.desc}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20">
                  <Clock3 className="w-4 h-4 text-teal" />
                  <span className="text-xs font-semibold">{dir === "rtl" ? "متوسط الرد: 1 يوم عمل" : "Avg response: 1 business day"}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20">
                  <MessageCircle className="w-4 h-4 text-orange" />
                  <span className="text-xs font-semibold">{dir === "rtl" ? "متابعة واتساب" : "WhatsApp follow-up"}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {c.process.steps.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-6 text-sm font-serif-display font-semibold text-teal">
                <span className="font-mono text-orange">{s.n}</span>
                {s.title}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* HORIZONTAL TIMELINE */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Kicker>{dir === "rtl" ? "خطوة بخطوة" : "Step by step"}</Kicker>
            <h2 className="mt-4 font-serif-display text-4xl lg:text-5xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "رحلة الصفقة من البداية للنهاية" : "A deal from first message to loaded reefer"}
            </h2>
            <AnimatedUnderline className="mt-5 w-24 mx-auto" />
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block relative">
            {/* Track */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-teal via-orange to-teal opacity-40" />
            <motion.div
              className="absolute top-12 left-0 h-0.5 bg-gradient-to-r from-teal to-orange"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <StaggerGroup className="grid grid-cols-6 gap-3 relative">
              {c.process.steps.map((s, i) => {
                const Icon = stepIcons[i];
                const color = stepColors[i];
                return (
                  <motion.div key={s.n} variants={staggerItem} className="text-center">
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `${color}15`, border: `2px solid ${color}` }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                      />
                      {/* Pulse */}
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ background: color, opacity: 0.3 }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-8 h-8" style={{ color }} />
                      </div>
                      <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-card border-2 flex items-center justify-center font-serif-display text-xs font-bold" style={{ borderColor: color, color }}>
                        {s.n}
                      </span>
                    </div>
                    <h3 className="font-serif-display text-base font-bold leading-tight">{s.title}</h3>
                    <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed px-1">{s.desc}</p>
                  </motion.div>
                );
              })}
            </StaggerGroup>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden relative max-w-md mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal via-orange to-teal opacity-40" />
            <StaggerGroup className="space-y-5">
              {c.process.steps.map((s, i) => {
                const Icon = stepIcons[i];
                const color = stepColors[i];
                return (
                  <motion.div key={s.n} variants={staggerItem} className="relative flex items-start gap-4">
                    <div className="relative z-10 shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${color}15`, border: `2px solid ${color}` }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif-display text-xs font-bold tabular-nums" style={{ color }}>{s.n}</span>
                        <h3 className="font-serif-display text-base font-bold">{s.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* FOLLOW-UP FLOW (no CRM — internal team-based workflow) */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-transparent via-teal/5 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Kicker>{dir === "rtl" ? "ماذا يحدث بعد الإرسال" : "What happens after submit"}</Kicker>
              <h2 className="mt-4 font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
                {c.contact.flow.title}
              </h2>
              <AnimatedUnderline className="mt-5 w-20" />
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {dir === "rtl"
                  ? "استفسارك لا يذهب لبريد مهمل — يدخل نظام متابعة داخلي، يصل لفريق التصدير، ويتابع على واتساب حتى عرض السعر."
                  : "Your inquiry doesn't go to a forgotten inbox — it enters our internal follow-up system, reaches the export team, and is tracked on WhatsApp until a quote."}
              </p>
              <div className="mt-7 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-teal" />
                  <span>{dir === "rtl" ? "إشعار بريد لفريق التصدير" : "Email notification to export team"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-teal" />
                  <span>{dir === "rtl" ? "تسجيل في نظامنا الداخلي" : "Lead registered in our system"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-teal" />
                  <span>{dir === "rtl" ? "متابعة واتساب سريعة" : "Fast WhatsApp follow-up"}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="relative p-6 lg:p-8 rounded-3xl bg-card border border-teal/15 shadow-xl">
                  <div className="space-y-3">
                    {c.contact.flow.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <div className="relative shrink-0 w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center font-serif-display text-sm font-bold">
                          {i + 1}
                          {i < c.contact.flow.steps.length - 1 && (
                            <motion.span
                              className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3 bg-teal/30"
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.12 + 0.3 }}
                              style={{ originY: 0 }}
                            />
                          )}
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-muted/40 border border-teal/8">
                          <span className="text-sm font-medium">{step}</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-teal/50" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD QUALITY */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-teal via-teal-dark to-teal p-8 lg:p-12 text-teal-foreground relative overflow-hidden">
              <FrostField count={16} className="opacity-40" />
              <FloatingShape shape="star" className="absolute top-6 right-6 text-white/15" size={48} delay={0.2} />

              <div className="relative grid lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-orange-light font-semibold mb-3">
                    {dir === "rtl" ? "نأهل استفسارك" : "We qualify your inquiry"}
                  </div>
                  <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight">
                    {dir === "rtl"
                      ? "نفرق بين طلب جاد، استفسار عام، ووسيط — بكل احترام."
                      : "We tell apart a serious buyer, a casual inquiry, and a broker — respectfully."}
                  </h2>
                  <p className="mt-4 text-sm text-teal-foreground/85 leading-relaxed max-w-xl">
                    {dir === "rtl"
                      ? "كل استفسار يدخل النظام بحالة محددة، ويتابع حسب نوع العميل والدولة والمنتج والكمية."
                      : "Every inquiry enters the system with a clear status and is followed up based on buyer type, country, product and quantity."}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: dir === "rtl" ? "طلب جاد" : "Serious buyer", color: "#F5A653" },
                    { label: dir === "rtl" ? "استفسار عام" : "Casual inquiry", color: "#4FAE96" },
                    { label: dir === "rtl" ? "وسيط" : "Broker", color: "#9CB3AC" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/15">
                      <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                      <span className="text-sm font-semibold">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 lg:py-20 bg-teal/5 border-t border-teal/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold leading-tight text-balance">
              {dir === "rtl" ? "ابدأ الخطوة الأولى الآن" : "Start step one now"}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {dir === "rtl"
                ? "أرسل المنتج والكمية والدولة والميناء ونوع التعبئة — نرد بالمواصفات والسعر المبدئي."
                : "Send product, quantity, country, port and packing type — we respond with specs and indicative price."}
            </p>
            <Magnetic strength={0.15}>
              <button
                onClick={() => { window.location.href = "/contact" }}
                className="mt-7 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors"
              >
                {c.nav.requestQuote}
                <Arrow className="w-4 h-4" />
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

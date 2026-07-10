"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "../content";
import { useLang } from "../language-provider";
import {
  Reveal, StaggerGroup, staggerItem, FrostField, FloatingShape, Kicker, AnimatedUnderline, Marquee, Magnetic,
} from "../anim";
import { useSiteSettings } from "../use-site-settings";
import {
  Send, MessageCircle, Mail, MapPin, Clock3, CheckCircle2, Building2, Globe2, Phone, FileText, Sparkles, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export function ContactPage() {
  const c = useContent();
  const { dir } = useLang();
  const siteSettings = useSiteSettings();
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", company: "", country: "", whatsapp: "", email: "",
    product: "", quantity: "", packing: "", port: "", use: "", message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = React.useState<Record<string, boolean>>({});

  const update = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: false }));
  };

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.name.trim()) e.name = true;
    if (!form.company.trim()) e.company = true;
    if (!form.country.trim()) e.country = true;
    if (!form.whatsapp.trim() || form.whatsapp.replace(/[^0-9]/g, "").length < 8) e.whatsapp = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error(dir === "rtl" ? "يرجى ملء الحقول المطلوبة بشكل صحيح" : "Please fill required fields correctly");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: "", // honeypot — bots fill this, humans don't
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const errMap: Record<string, string> = {
          rate_limited: dir === "rtl" ? "محاولات كثيرة — حاول بعد دقائق" : "Too many attempts — try again in a few minutes",
          missing_fields: dir === "rtl" ? "حقول مطلوبة ناقصة" : "Missing required fields",
          invalid_email: dir === "rtl" ? "بريد إلكتروني غير صالح" : "Invalid email",
          invalid_whatsapp: dir === "rtl" ? "رقم واتساب غير صالح" : "Invalid WhatsApp number",
          server_error: dir === "rtl" ? "خطأ في الخادم — حاول مرة أخرى" : "Server error — please retry",
        };
        toast.error(errMap[data.error] || "Error");
        setLoading(false);
        return;
      }
      setSubmitted(true);
      toast.success(dir === "rtl" ? "تم استلام استفسارك بنجاح!" : "Inquiry received successfully!");
    } catch {
      toast.error(dir === "rtl" ? "تعذر الإرسال — تحقق من الاتصال" : "Failed to submit — check connection");
    }
    setLoading(false);
  };

  const reset = () => {
    setForm({ name: "", company: "", country: "", whatsapp: "", email: "", product: "", quantity: "", packing: "", port: "", use: "", message: "", website: "" });
    setSubmitted(false);
  };

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <FrostField count={20} className="opacity-50" />
        <FloatingShape shape="drop" className="absolute top-24 right-[10%] text-orange/25 hidden lg:block" size={56} delay={0.2} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal><Kicker>{c.contact.kicker}</Kicker></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-serif-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-balance">
                <span className="block text-foreground">{c.contact.title.split(" ").slice(0, 2).join(" ")}</span>
                <span className="block text-gradient-teal mt-2">{c.contact.title.split(" ").slice(2).join(" ")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <AnimatedUnderline className="mt-6 w-32" />
              <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {c.contact.desc}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <Marquee>
            {[
              dir === "rtl" ? "رد خلال 1 يوم عمل" : "Response in 1 business day",
              dir === "rtl" ? "بيانات كاملة = رد أسرع" : "More details = faster response",
              dir === "rtl" ? "متابعة واتساب احترافية" : "Professional WhatsApp follow-up",
              dir === "rtl" ? "نؤهل استفسارك بكل احترام" : "We qualify your inquiry respectfully",
            ].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-6 text-sm font-serif-display font-semibold text-teal">
                <Sparkles className="w-3.5 h-3.5 text-orange" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* MAIN: FORM + CHANNELS */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* FORM */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl bg-card border border-teal/15 p-6 lg:p-8 shadow-xl">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                        {/* Honeypot field — hidden from humans, bots fill it */}
                        <input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden
                          style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, opacity: 0 }}
                          value={form.website || ""}
                          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                        />
                        <div>
                          <div className="text-xs uppercase tracking-widest text-orange font-bold mb-1">
                            {dir === "rtl" ? "بيانات أساسية" : "Required fields"}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {dir === "rtl" ? "نحتاج بيانات كافية لتأهيلك — ليس إرهاقك بالحقول." : "We need enough info to qualify you — not endless fields."}
                          </p>
                        </div>

                        {/* Required row */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field
                            label={c.contact.form.name}
                            value={form.name}
                            onChange={(v) => update("name", v)}
                            error={errors.name}
                            icon={<Building2 className="w-4 h-4" />}
                          />
                          <Field
                            label={c.contact.form.company}
                            value={form.company}
                            onChange={(v) => update("company", v)}
                            error={errors.company}
                            icon={<Building2 className="w-4 h-4" />}
                          />
                          <Field
                            label={c.contact.form.country}
                            value={form.country}
                            onChange={(v) => update("country", v)}
                            error={errors.country}
                            icon={<Globe2 className="w-4 h-4" />}
                          />
                          <Field
                            label={c.contact.form.whatsapp}
                            value={form.whatsapp}
                            onChange={(v) => update("whatsapp", v)}
                            error={errors.whatsapp}
                            icon={<Phone className="w-4 h-4" />}
                            placeholder={dir === "rtl" ? "+966 5xx xxx xxx" : "+966 5xx xxx xxx"}
                            dir="ltr"
                          />
                          <Field
                            label={c.contact.form.email}
                            value={form.email}
                            onChange={(v) => update("email", v)}
                            error={errors.email}
                            type="email"
                            icon={<Mail className="w-4 h-4" />}
                            placeholder="you@company.com"
                            dir="ltr"
                          />
                          <Field
                            label={c.contact.form.use}
                            value={form.use}
                            onChange={(v) => update("use", v)}
                            icon={<FileText className="w-4 h-4" />}
                          />
                        </div>

                        {/* Divider */}
                        <div className="pt-4 border-t border-teal/10">
                          <div className="text-xs uppercase tracking-widest text-teal font-bold mb-3">
                            {dir === "rtl" ? "تفاصيل الطلب (اختياري لكن مفيد)" : "Order details (optional but helpful)"}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field
                            label={c.contact.form.product}
                            value={form.product}
                            onChange={(v) => update("product", v)}
                            icon={<FileText className="w-4 h-4" />}
                          />
                          <Field
                            label={c.contact.form.quantity}
                            value={form.quantity}
                            onChange={(v) => update("quantity", v)}
                            icon={<FileText className="w-4 h-4" />}
                            placeholder={dir === "rtl" ? "مثلاً: 5 أطنان" : "e.g. 5 tons"}
                          />
                          <Field
                            label={c.contact.form.packing}
                            value={form.packing}
                            onChange={(v) => update("packing", v)}
                            icon={<FileText className="w-4 h-4" />}
                          />
                          <Field
                            label={c.contact.form.port}
                            value={form.port}
                            onChange={(v) => update("port", v)}
                            icon={<Globe2 className="w-4 h-4" />}
                            placeholder={dir === "rtl" ? "مثلاً: جدة" : "e.g. Jeddah"}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            {c.contact.form.message}
                          </label>
                          <textarea
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none text-sm resize-none transition-colors"
                            placeholder={dir === "rtl" ? "أي تفاصيل إضافية تساعدنا نرد بشكل أدق…" : "Any extra details that help us respond more accurately…"}
                          />
                        </div>

                        {/* Validation note */}
                        {Object.keys(errors).length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-3 rounded-xl bg-orange/8 border border-orange/25 text-xs text-orange"
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {dir === "rtl" ? "يرجى مراجعة الحقول المطلوبة المظللة بالأحمر." : "Please review the highlighted required fields."}
                          </motion.div>
                        )}

                        {/* Submit */}
                        <Magnetic strength={0.1}>
                          <button
                            type="submit"
                            disabled={loading}
                            className="shine-hover w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-orange text-orange-foreground font-semibold shadow-md shadow-orange/25 hover:bg-orange-dark transition-colors disabled:opacity-60"
                          >
                            {loading ? (
                              <>
                                <motion.span
                                  className="w-4 h-4 border-2 border-orange-foreground/30 border-t-orange-foreground rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                />
                                {dir === "rtl" ? "جارٍ الإرسال…" : "Sending…"}
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                {c.contact.form.submit}
                              </>
                            )}
                          </button>
                        </Magnetic>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-center py-10"
                      >
                        <div className="mx-auto w-20 h-20 rounded-full bg-teal/10 text-teal flex items-center justify-center mb-6">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="font-serif-display text-3xl font-bold">{c.contact.form.successTitle}</h3>
                        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                          {c.contact.form.successDesc}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3 justify-center">
                          <a
                            href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1FB855] transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {c.contact.channels.whatsapp}
                          </a>
                          <button
                            onClick={reset}
                            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border-2 border-teal text-teal font-semibold text-sm hover:bg-teal hover:text-teal-foreground transition-colors"
                          >
                            {c.contact.form.sendAnother}
                          </button>
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>

            {/* CHANNELS */}
            <div className="lg:col-span-5">
              <StaggerGroup className="space-y-3">
                <motion.div variants={staggerItem}>
                  <ChannelCard
                    icon={<MessageCircle className="w-5 h-5" />}
                    title={c.contact.channels.whatsapp}
                    value={siteSettings.whatsappDisplay}
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                    highlight
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ChannelCard
                    icon={<Mail className="w-5 h-5" />}
                    title={c.contact.channels.email}
                    value="info@snack-fruits.com"
                    href="mailto:info@snack-fruits.com"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ChannelCard
                    icon={<MapPin className="w-5 h-5" />}
                    title={dir === "rtl" ? "الموقع" : "Location"}
                    value={c.contact.channels.location}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ChannelCard
                    icon={<Clock3 className="w-5 h-5" />}
                    title={dir === "rtl" ? "ساعات العمل" : "Working hours"}
                    value={c.contact.channels.hours}
                  />
                </motion.div>
              </StaggerGroup>

              {/* CRM flow */}
              <Reveal delay={0.3}>
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-teal/8 to-orange/8 border border-teal/15 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                      <FileText className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.contact.flow.title.split(" ").slice(0, 2).join(" ")}</div>
                      <div className="text-sm font-semibold">{c.contact.flow.title.split(" ").slice(2).join(" ")}</div>
                    </div>
                  </div>
                  <ol className="space-y-2.5">
                    {c.contact.flow.steps.map((s, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-teal text-teal-foreground flex items-center justify-center font-bold text-[10px]">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label, value, onChange, error, icon, type = "text", placeholder, dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-1.5">
        {label}
      </label>
      <div className={`relative flex items-center`}>
        {icon && (
          <span className={`absolute ${dir === "ltr" ? "left-3" : "right-3"} text-muted-foreground pointer-events-none`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className={`w-full ${icon ? (dir === "ltr" ? "pl-10 pr-4" : "pr-10 pl-4") : "px-4"} py-3 rounded-xl bg-secondary/60 border outline-none text-sm transition-colors ${
            error
              ? "border-orange focus:border-orange focus:ring-2 focus:ring-orange/20"
              : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20"
          }`}
        />
      </div>
    </div>
  );
}

function ChannelCard({
  icon, title, value, href, highlight,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  highlight?: boolean;
}) {
  const inner = (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors hover-lift ${
      highlight
        ? "bg-teal/8 border-teal/20 hover:border-teal/40"
        : "bg-card border-teal/12 hover:border-teal/30"
    }`}>
      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
        highlight ? "bg-orange text-orange-foreground" : "bg-teal/10 text-teal"
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{title}</div>
        <div className="text-sm font-bold mt-0.5 truncate" dir="ltr">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="block">{inner}</a> : inner;
}

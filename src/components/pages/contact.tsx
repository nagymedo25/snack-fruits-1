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
  Send, MessageCircle, Mail, MapPin, Clock3, CheckCircle2, Building2, Globe2, Phone, FileText, Sparkles, AlertCircle, ChevronDown, Search, Check, X, User,
} from "lucide-react";
import { toast } from "sonner";

/* ═══════════════════════════════════════════════════════════════════════
   PHONE RULES — per-country WhatsApp number validation
   ═══════════════════════════════════════════════════════════════════════ */

type PhoneRule = {
  code: string;
  label: string;
  labelEn: string;
  flag: string;
  iso: string;
  minDigits: number;
  maxDigits: number;
  prefix?: string; // first digit(s) that the local number must start with
};

const PHONE_RULES: PhoneRule[] = [
  { code: "+966", label: "السعودية", labelEn: "Saudi Arabia", flag: "🇸🇦", iso: "SA", minDigits: 9, maxDigits: 9, prefix: "5" },
  { code: "+971", label: "الإمارات", labelEn: "UAE", flag: "🇦🇪", iso: "AE", minDigits: 9, maxDigits: 9, prefix: "5" },
  { code: "+965", label: "الكويت", labelEn: "Kuwait", flag: "🇰🇼", iso: "KW", minDigits: 8, maxDigits: 8 },
  { code: "+974", label: "قطر", labelEn: "Qatar", flag: "🇶🇦", iso: "QA", minDigits: 8, maxDigits: 8 },
  { code: "+968", label: "عمان", labelEn: "Oman", flag: "🇴🇲", iso: "OM", minDigits: 8, maxDigits: 8 },
  { code: "+973", label: "البحرين", labelEn: "Bahrain", flag: "🇧🇭", iso: "BH", minDigits: 8, maxDigits: 8 },
  { code: "+20", label: "مصر", labelEn: "Egypt", flag: "🇪🇬", iso: "EG", minDigits: 10, maxDigits: 10, prefix: "1" },
  { code: "+962", label: "الأردن", labelEn: "Jordan", flag: "🇯🇴", iso: "JO", minDigits: 9, maxDigits: 9 },
  { code: "+964", label: "العراق", labelEn: "Iraq", flag: "🇮🇶", iso: "IQ", minDigits: 10, maxDigits: 10 },
  { code: "+213", label: "الجزائر", labelEn: "Algeria", flag: "🇩🇿", iso: "DZ", minDigits: 9, maxDigits: 9 },
  { code: "+212", label: "المغرب", labelEn: "Morocco", flag: "🇲🇦", iso: "MA", minDigits: 9, maxDigits: 9 },
  { code: "+216", label: "تونس", labelEn: "Tunisia", flag: "🇹🇳", iso: "TN", minDigits: 8, maxDigits: 8 },
  { code: "+218", label: "ليبيا", labelEn: "Libya", flag: "🇱🇾", iso: "LY", minDigits: 9, maxDigits: 10 },
  { code: "+249", label: "السودان", labelEn: "Sudan", flag: "🇸🇩", iso: "SD", minDigits: 9, maxDigits: 9 },
  { code: "+961", label: "لبنان", labelEn: "Lebanon", flag: "🇱🇧", iso: "LB", minDigits: 7, maxDigits: 8 },
  { code: "+970", label: "فلسطين", labelEn: "Palestine", flag: "🇵🇸", iso: "PS", minDigits: 9, maxDigits: 9 },
  { code: "+963", label: "سوريا", labelEn: "Syria", flag: "🇸🇾", iso: "SY", minDigits: 9, maxDigits: 9 },
  { code: "+967", label: "اليمن", labelEn: "Yemen", flag: "🇾🇪", iso: "YE", minDigits: 9, maxDigits: 9 },
];

/* ═══════════════════════════════════════════════════════════════════════
   VALIDATION HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

function validateName(v: string): string | null {
  if (!v.trim()) return null; // not touched yet
  if (v.trim().length < 2) return "min2chars";
  if (/[0-9]/.test(v)) return "noNumbers";
  return ""; // valid
}

function validateCompany(v: string): string | null {
  if (!v.trim()) return null;
  if (v.trim().length < 2) return "min2chars";
  return "";
}

function validateCountry(v: string): string | null {
  if (!v.trim()) return null;
  return "";
}

function validateEmail(v: string): string | null {
  if (!v.trim()) return null;
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(v)) return "invalidEmail";
  return "";
}

function validateWhatsApp(digits: string, rule: PhoneRule): string | null {
  if (!digits) return null;
  if (digits.length < rule.minDigits) return "tooShort";
  if (digits.length > rule.maxDigits) return "tooLong";
  if (rule.prefix && !digits.startsWith(rule.prefix)) return "wrongPrefix";
  return "";
}

type FieldStatus = "neutral" | "error" | "valid";

function getFieldStatus(error: string | null): FieldStatus {
  if (error === null) return "neutral";
  if (error === "") return "valid";
  return "error";
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export function ContactPage() {
  const c = useContent();
  const { dir } = useLang();
  const siteSettings = useSiteSettings();
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedRule, setSelectedRule] = React.useState(PHONE_RULES[0]); // Default to KSA
  const [form, setForm] = React.useState({
    name: "", company: "", country: "", whatsapp: "", email: "",
    product: "", quantity: "", packing: "", port: "", use: "", message: "",
    website: "", // honeypot
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  // Real-time validation states
  const validationResults = React.useMemo(() => {
    const digits = form.whatsapp.replace(/[^0-9]/g, "");
    return {
      name: validateName(form.name),
      company: validateCompany(form.company),
      country: validateCountry(form.country),
      email: validateEmail(form.email),
      whatsapp: validateWhatsApp(digits, selectedRule),
    };
  }, [form.name, form.company, form.country, form.email, form.whatsapp, selectedRule]);

  const getError = (field: string): string | null => {
    if (!touched[field]) return null;
    return validationResults[field as keyof typeof validationResults] ?? null;
  };

  const getStatus = (field: string): FieldStatus => getFieldStatus(getError(field));

  const update = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setTouched((p) => ({ ...p, [k]: true }));
  };

  const markTouched = (k: string) => {
    setTouched((p) => ({ ...p, [k]: true }));
  };

  const getErrorMsg = (field: string): string | undefined => {
    const err = getError(field);
    if (!err) return undefined;
    const msgs: Record<string, Record<string, string>> = {
      rtl: {
        min2chars: "حرفين على الأقل",
        noNumbers: "لا يمكن أن يحتوي على أرقام",
        invalidEmail: "بريد إلكتروني غير صالح",
        tooShort: `الرقم قصير جداً — ${selectedRule.minDigits} رقم مطلوب`,
        tooLong: `الرقم طويل جداً — ${selectedRule.maxDigits} رقم كحد أقصى`,
        wrongPrefix: `يجب أن يبدأ بـ ${selectedRule.prefix} في ${selectedRule.label}`,
      },
      ltr: {
        min2chars: "At least 2 characters required",
        noNumbers: "Cannot contain numbers",
        invalidEmail: "Invalid email address",
        tooShort: `Too short — ${selectedRule.minDigits} digits required`,
        tooLong: `Too long — max ${selectedRule.maxDigits} digits`,
        wrongPrefix: `Must start with ${selectedRule.prefix} for ${selectedRule.labelEn}`,
      },
    };
    return msgs[dir === "rtl" ? "rtl" : "ltr"][err];
  };

  const allRequiredValid = () => {
    const digits = form.whatsapp.replace(/[^0-9]/g, "");
    return (
      validateName(form.name) === "" &&
      validateCompany(form.company) === "" &&
      validateCountry(form.country) === "" &&
      validateEmail(form.email) === "" &&
      validateWhatsApp(digits, selectedRule) === ""
    );
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    // Touch all required fields
    setTouched({ name: true, company: true, country: true, email: true, whatsapp: true });

    if (!allRequiredValid()) {
      toast.error(
        dir === "rtl"
          ? "⚠️ يرجى مراجعة الحقول المطلوبة — تأكد من صحة كل حقل"
          : "⚠️ Please fix the highlighted fields before submitting",
        { duration: 5000 }
      );
      return;
    }

    setLoading(true);

    // Toast for progress
    const toastId = toast.loading(
      dir === "rtl" ? "جارٍ إرسال الاستفسار…" : "Submitting your inquiry…"
    );

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          whatsapp: `${selectedRule.code} ${form.whatsapp}`,
          website: "", // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const errMap: Record<string, string> = {
          rate_limited: dir === "rtl"
            ? "⏳ محاولات كثيرة — حاول بعد دقائق"
            : "⏳ Too many attempts — try again in a few minutes",
          missing_fields: dir === "rtl"
            ? "📋 حقول مطلوبة ناقصة"
            : "📋 Missing required fields",
          invalid_email: dir === "rtl"
            ? "📧 بريد إلكتروني غير صالح"
            : "📧 Invalid email address",
          invalid_whatsapp: dir === "rtl"
            ? "📱 رقم واتساب غير صالح"
            : "📱 Invalid WhatsApp number",
          server_error: dir === "rtl"
            ? "🔧 خطأ في الخادم — حاول مرة أخرى"
            : "🔧 Server error — please retry",
        };
        toast.error(errMap[data.error] || "Error", { id: toastId, duration: 5000 });
        setLoading(false);
        return;
      }
      setSubmitted(true);
      toast.success(
        dir === "rtl"
          ? " تم استلام استفسارك بنجاح! سيتواصل معك فريقنا خلال يوم عمل."
          : " Inquiry received! Our team will contact you within 1 business day.",
        { id: toastId, duration: 6000 }
      );
    } catch {
      toast.error(
        dir === "rtl"
          ? " تعذر الإرسال — تحقق من اتصالك بالإنترنت"
          : " Failed to submit — check your internet connection",
        { id: toastId, duration: 5000 }
      );
    }
    setLoading(false);
  };

  const reset = () => {
    setForm({ name: "", company: "", country: "", whatsapp: "", email: "", product: "", quantity: "", packing: "", port: "", use: "", message: "", website: "" });
    setTouched({});
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
                        <ValidatedField
                          label={c.contact.form.name}
                          value={form.name}
                          onChange={(v) => update("name", v)}
                          onBlur={() => markTouched("name")}
                          status={getStatus("name")}
                          error={getErrorMsg("name")}
                          icon={<User className="w-4 h-4" />}
                        />
                        <ValidatedField
                          label={c.contact.form.company}
                          value={form.company}
                          onChange={(v) => update("company", v)}
                          onBlur={() => markTouched("company")}
                          status={getStatus("company")}
                          error={getErrorMsg("company")}
                          icon={<Building2 className="w-4 h-4" />}
                        />
                        <ValidatedField
                          label={c.contact.form.country}
                          value={form.country}
                          onChange={(v) => update("country", v)}
                          onBlur={() => markTouched("country")}
                          status={getStatus("country")}
                          error={getErrorMsg("country")}
                          icon={<Globe2 className="w-4 h-4" />}
                        />
                        <WhatsAppField
                          label={c.contact.form.whatsapp}
                          value={form.whatsapp}
                          onChange={(v) => update("whatsapp", v)}
                          onBlur={() => markTouched("whatsapp")}
                          status={getStatus("whatsapp")}
                          error={getErrorMsg("whatsapp")}
                          selectedRule={selectedRule}
                          onRuleChange={setSelectedRule}
                          rules={PHONE_RULES}
                          dir={dir}
                        />
                        <ValidatedField
                          label={c.contact.form.email}
                          value={form.email}
                          onChange={(v) => update("email", v)}
                          onBlur={() => markTouched("email")}
                          status={getStatus("email")}
                          error={getErrorMsg("email")}
                          type="email"
                          icon={<Mail className="w-4 h-4" />}
                          placeholder="you@company.com"
                          inputDir="ltr"
                        />
                        <ValidatedField
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
                        <ValidatedField
                          label={c.contact.form.product}
                          value={form.product}
                          onChange={(v) => update("product", v)}
                          icon={<FileText className="w-4 h-4" />}
                        />
                        <ValidatedField
                          label={c.contact.form.quantity}
                          value={form.quantity}
                          onChange={(v) => update("quantity", v)}
                          icon={<FileText className="w-4 h-4" />}
                          placeholder={dir === "rtl" ? "مثلاً: 5 أطنان" : "e.g. 5 tons"}
                        />
                        <ValidatedField
                          label={c.contact.form.packing}
                          value={form.packing}
                          onChange={(v) => update("packing", v)}
                          icon={<FileText className="w-4 h-4" />}
                        />
                        <ValidatedField
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

                      {/* Validation summary */}
                      {Object.values(touched).some(Boolean) && !allRequiredValid() && Object.values(touched).filter(Boolean).length >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 rounded-xl bg-orange/8 border border-orange/25 text-xs text-orange"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {dir === "rtl" ? "يرجى مراجعة الحقول المظللة بالأحمر والتأكد من صحة البيانات." : "Please review the highlighted fields and ensure all data is correct."}
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

/* ═══════════════════════════════════════════════════════════════════════
   VALIDATED FIELD — with real-time status indicators
   ═══════════════════════════════════════════════════════════════════════ */

function ValidatedField({
  label, value, onChange, onBlur, status = "neutral", error, icon, type = "text", placeholder, inputDir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  status?: FieldStatus;
  error?: string;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  inputDir?: "ltr" | "rtl";
}) {
  const borderCls = status === "error"
    ? "border-red-500/60 bg-red-500/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    : status === "valid"
      ? "border-teal/50 bg-teal/5 focus:border-teal focus:ring-2 focus:ring-teal/20"
      : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20";

  const StatusIcon = () => {
    if (status === "valid") return <Check className="w-3.5 h-3.5 text-teal" />;
    if (status === "error") return <X className="w-3.5 h-3.5 text-red-500" />;
    return null;
  };

  return (
    <div className="flex flex-col">
      <label className="block text-xs font-semibold text-foreground mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <span className={`absolute ${inputDir === "ltr" ? "left-3" : "right-3"} text-muted-foreground pointer-events-none`}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          dir={inputDir}
          className={`w-full ${icon ? (inputDir === "ltr" ? "pl-10 pr-9" : "pr-10 pl-9") : "px-4 pr-9"} py-3 rounded-xl bg-secondary/60 border outline-none text-sm transition-all duration-200 ${borderCls}`}
        />
        <span className={`absolute ${inputDir === "ltr" ? "right-3" : "left-3"} pointer-events-none transition-all duration-200`}>
          <StatusIcon />
        </span>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-red-500"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   WHATSAPP FIELD — custom dropdown + per-country validation
   ═══════════════════════════════════════════════════════════════════════ */

function WhatsAppField({
  label, value, onChange, onBlur, status = "neutral", error,
  selectedRule, onRuleChange, rules, dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  status?: FieldStatus;
  error?: string;
  selectedRule: PhoneRule;
  onRuleChange: (rule: PhoneRule) => void;
  rules: PhoneRule[];
  dir: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Close on click outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Focus search when opened
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [open]);

  const filtered = rules.filter((r) =>
    r.label.includes(search) ||
    r.labelEn.toLowerCase().includes(search.toLowerCase()) ||
    r.code.includes(search)
  );

  const digits = value.replace(/[^0-9]/g, "");
  const digitInfo = `${digits.length}/${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`}`;

  const borderCls = status === "error"
    ? "border-red-500/60 bg-red-500/5 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
    : status === "valid"
      ? "border-teal/50 bg-teal/5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20"
      : "border-teal/15 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20";

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-foreground mb-1.5">
        {label}
      </label>
      <div className={`relative flex items-stretch h-[46px] rounded-xl bg-secondary/60 border transition-all duration-200 ${borderCls}`}>
        {/* Custom country dropdown trigger */}
        <button
          type="button"
          onClick={() => { setOpen(!open); setSearch(""); }}
          className="relative flex items-center gap-1.5 shrink-0 px-3 border-r border-teal/15 hover:bg-teal/5 transition-colors rounded-l-xl"
          dir="ltr"
        >
          <span className="text-base leading-none">{selectedRule.flag}</span>
          <span className="text-xs font-semibold text-foreground">{selectedRule.code}</span>
          <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Custom dropdown panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 z-50 w-72 max-h-80 rounded-2xl bg-card border border-teal/20 shadow-2xl shadow-black/20 overflow-hidden"
            >
              {/* Search bar */}
              <div className="p-2 border-b border-teal/10">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={dir === "rtl" ? "بحث عن الدولة…" : "Search country…"}
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-secondary/60 border border-teal/10 text-xs outline-none focus:border-teal/30 transition-colors"
                    dir={dir}
                  />
                </div>
              </div>

              {/* List */}
              <div className="overflow-y-auto max-h-60 overscroll-contain">
                {filtered.length === 0 ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    {dir === "rtl" ? "لا توجد نتائج" : "No results"}
                  </div>
                ) : (
                  filtered.map((rule) => (
                    <button
                      key={rule.code}
                      type="button"
                      onClick={() => {
                        onRuleChange(rule);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-teal/8 transition-colors ${selectedRule.code === rule.code ? "bg-teal/10" : ""
                        }`}
                      dir="ltr"
                    >
                      <span className="text-lg leading-none">{rule.flag}</span>
                      <span className="flex-1 text-left">
                        <span className="font-semibold text-foreground text-xs">{dir === "rtl" ? rule.label : rule.labelEn}</span>
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{rule.code}</span>
                      {selectedRule.code === rule.code && (
                        <Check className="w-3.5 h-3.5 text-teal" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phone input */}
        <div className="relative flex-1 flex items-center">
          <Phone className="absolute left-3 text-muted-foreground pointer-events-none w-4 h-4" />
          <input
            type="tel"
            value={value}
            onChange={(e) => {
              // Only allow numbers
              const cleaned = e.target.value.replace(/[^0-9]/g, "");
              onChange(cleaned);
            }}
            onBlur={onBlur}
            placeholder={selectedRule.code === "+966" ? "5xx xxx xxx" : selectedRule.code === "+20" ? "1xx xxxx xxxx" : "xxx xxx xxxx"}
            dir="ltr"
            className={`w-full h-full bg-transparent outline-none text-sm pl-10 pr-16 ${status === "error" ? "text-red-500 placeholder:text-red-500/40" : ""}`}
          />
          {/* Digit counter + status icon */}
          <span className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
            <span className={`text-[10px] font-mono tabular-nums ${status === "valid" ? "text-teal" : status === "error" ? "text-red-500" : "text-muted-foreground"
              }`}>
              {digits.length > 0 && digitInfo}
            </span>
            {status === "valid" && <Check className="w-3.5 h-3.5 text-teal" />}
            {status === "error" && <X className="w-3.5 h-3.5 text-red-500" />}
          </span>
        </div>
      </div>

      {/* Hint: what this country expects */}
      {digits.length > 0 && status !== "valid" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 text-[10px] text-muted-foreground"
        >
          {selectedRule.flag} {dir === "rtl"
            ? `${selectedRule.label}: ${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`} رقم${selectedRule.prefix ? ` يبدأ بـ ${selectedRule.prefix}` : ""}`
            : `${selectedRule.labelEn}: ${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`} digits${selectedRule.prefix ? ` starting with ${selectedRule.prefix}` : ""}`
          }
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-red-500"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CHANNEL CARD
   ═══════════════════════════════════════════════════════════════════════ */

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
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors hover-lift ${highlight
        ? "bg-teal/8 border-teal/20 hover:border-teal/40"
        : "bg-card border-teal/12 hover:border-teal/30"
      }`}>
      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${highlight ? "bg-orange text-orange-foreground" : "bg-teal/10 text-teal"
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

"use client";

import * as React from "react";
import { useContent } from "../content";
import { useLang } from "../language-provider";
import { useSiteSettings } from "../use-site-settings";
import {
  Send, MessageCircle, Mail, MapPin, Clock3, CheckCircle2, Building2, Globe2, Phone, FileText, Sparkles, AlertCircle, ChevronDown, Search, Check, X, User,
} from "lucide-react";
import { toast } from "sonner";

type PhoneRule = {
  code: string;
  label: string;
  labelEn: string;
  flag: string;
  iso: string;
  minDigits: number;
  maxDigits: number;
  prefix?: string;
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

function validateName(v: string): string | null {
  if (!v.trim()) return null;
  if (v.trim().length < 2) return "min2chars";
  if (/[0-9]/.test(v)) return "noNumbers";
  return "";
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

export function ContactPage() {
  const c = useContent();
  const { dir } = useLang();
  const siteSettings = useSiteSettings();
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedRule, setSelectedRule] = React.useState(PHONE_RULES[0]);
  const [form, setForm] = React.useState({
    name: "",
    company: "",
    country: "",
    whatsapp: "",
    email: "",
    product: "",
    quantity: "",
    packing: "",
    port: "",
    use: "",
    message: "",
    website: "",
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

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

  const stripItems = React.useMemo(
    () => [
      dir === "rtl" ? "رد خلال 1 يوم عمل" : "Response in 1 business day",
      dir === "rtl" ? "بيانات كاملة = رد أسرع" : "More details = faster response",
      dir === "rtl" ? "متابعة واتساب احترافية" : "Professional WhatsApp follow-up",
      dir === "rtl" ? "نؤهل استفسارك بكل احترام" : "We qualify your inquiry respectfully",
    ],
    [dir]
  );

  const getError = React.useCallback((field: string): string | null => {
    if (!touched[field]) return null;
    return validationResults[field as keyof typeof validationResults] ?? null;
  }, [touched, validationResults]);

  const getStatus = React.useCallback((field: string): FieldStatus => {
    return getFieldStatus(getError(field));
  }, [getError]);

  const update = React.useCallback((key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const markTouched = React.useCallback((key: string) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const getErrorMsg = React.useCallback((field: string): string | undefined => {
    const err = getError(field);
    if (!err) return undefined;

    const messages: Record<string, Record<string, string>> = {
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

    return messages[dir === "rtl" ? "rtl" : "ltr"][err];
  }, [dir, getError, selectedRule]);

  const allRequiredValid = React.useCallback(() => {
    const digits = form.whatsapp.replace(/[^0-9]/g, "");
    return (
      validateName(form.name) === "" &&
      validateCompany(form.company) === "" &&
      validateCountry(form.country) === "" &&
      validateEmail(form.email) === "" &&
      validateWhatsApp(digits, selectedRule) === ""
    );
  }, [form, selectedRule]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setTouched((prev) => ({
      ...prev,
      name: true,
      company: true,
      country: true,
      email: true,
      whatsapp: true,
    }));

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
    const toastId = toast.loading(
      dir === "rtl" ? "جارٍ إرسال الاستفسار…" : "Submitting your inquiry…"
    );

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          useCase: form.use,
          whatsapp: `${selectedRule.code} ${form.whatsapp}`,
          website: "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        const errorMap: Record<string, string> = {
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
          email_send_failed: dir === "rtl"
            ? "✉️ فشل إرسال إيميل التنبيه — يرجى التحقق من إعدادات Brevo"
            : "✉️ Failed to send email notification — please check Brevo settings",
        };

        toast.error(
          errorMap[data.error] || (dir === "rtl" ? "حدث خطأ غير متوقع" : "An unexpected error occurred"),
          { id: toastId, duration: 5000 }
        );
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
    } finally {
      setLoading(false);
    }
  };

  const reset = React.useCallback(() => {
    setForm({
      name: "",
      company: "",
      country: "",
      whatsapp: "",
      email: "",
      product: "",
      quantity: "",
      packing: "",
      port: "",
      use: "",
      message: "",
      website: "",
    });
    setTouched({});
    setSubmitted(false);
  }, []);

  const titleParts = c.contact.title.split(" ");
  const titleStart = titleParts.slice(0, 2).join(" ");
  const titleEnd = titleParts.slice(2).join(" ");
  const flowTitleParts = c.contact.flow.title.split(" ");
  const flowTitleStart = flowTitleParts.slice(0, 2).join(" ");
  const flowTitleEnd = flowTitleParts.slice(2).join(" ");

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="absolute inset-0 bg-grid-teal opacity-30" />
        <div className="absolute inset-0 bg-grain" />
        <div className="absolute inset-x-0 top-10 h-56 bg-[radial-gradient(circle_at_top,rgba(79,174,150,0.18),transparent_60%)]" />
        <div className="absolute right-[10%] top-24 hidden h-16 w-16 rounded-full border border-orange/20 bg-orange/10 lg:block" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-orange" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange">
                {c.contact.kicker}
              </span>
            </div>

            <h1 className="mt-5 font-serif-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-foreground">{titleStart}</span>
              <span className="mt-2 block text-gradient-teal">{titleEnd}</span>
            </h1>

            <div className="mt-6 h-[3px] w-32 rounded-full bg-orange" />

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              {c.contact.desc}
            </p>
          </div>
        </div>

        <div className="relative mt-12 border-y border-teal/15 bg-teal/5 py-3">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {stripItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-3 text-sm font-serif-display font-semibold text-teal">
                  <Sparkles className="h-3.5 w-3.5 text-orange" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-teal/15 bg-card p-6 shadow-xl lg:p-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, opacity: 0 }}
                      value={form.website}
                      onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                    />

                    <div>
                      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-orange">
                        {dir === "rtl" ? "بيانات أساسية" : "Required fields"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {dir === "rtl"
                          ? "نحتاج بيانات كافية لتأهيلك — ليس إرهاقك بالحقول."
                          : "We need enough info to qualify you — not endless fields."}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <ValidatedField
                        label={c.contact.form.name}
                        value={form.name}
                        onChange={(value) => update("name", value)}
                        onBlur={() => markTouched("name")}
                        status={getStatus("name")}
                        error={getErrorMsg("name")}
                        icon={<User className="h-4 w-4" />}
                      />
                      <ValidatedField
                        label={c.contact.form.company}
                        value={form.company}
                        onChange={(value) => update("company", value)}
                        onBlur={() => markTouched("company")}
                        status={getStatus("company")}
                        error={getErrorMsg("company")}
                        icon={<Building2 className="h-4 w-4" />}
                      />
                      <ValidatedField
                        label={c.contact.form.country}
                        value={form.country}
                        onChange={(value) => update("country", value)}
                        onBlur={() => markTouched("country")}
                        status={getStatus("country")}
                        error={getErrorMsg("country")}
                        icon={<Globe2 className="h-4 w-4" />}
                      />
                      <WhatsAppField
                        label={c.contact.form.whatsapp}
                        value={form.whatsapp}
                        onChange={(value) => update("whatsapp", value)}
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
                        onChange={(value) => update("email", value)}
                        onBlur={() => markTouched("email")}
                        status={getStatus("email")}
                        error={getErrorMsg("email")}
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                        placeholder="you@company.com"
                        inputDir="ltr"
                      />
                      <ValidatedField
                        label={c.contact.form.use}
                        value={form.use}
                        onChange={(value) => update("use", value)}
                        icon={<FileText className="h-4 w-4" />}
                      />
                    </div>

                    <div className="border-t border-teal/10 pt-4">
                      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-teal">
                        {dir === "rtl"
                          ? "تفاصيل الطلب (اختياري لكن مفيد)"
                          : "Order details (optional but helpful)"}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <ValidatedField
                        label={c.contact.form.product}
                        value={form.product}
                        onChange={(value) => update("product", value)}
                        icon={<FileText className="h-4 w-4" />}
                      />
                      <ValidatedField
                        label={c.contact.form.quantity}
                        value={form.quantity}
                        onChange={(value) => update("quantity", value)}
                        icon={<FileText className="h-4 w-4" />}
                        placeholder={dir === "rtl" ? "مثلاً: 5 أطنان" : "e.g. 5 tons"}
                      />
                      <ValidatedField
                        label={c.contact.form.packing}
                        value={form.packing}
                        onChange={(value) => update("packing", value)}
                        icon={<FileText className="h-4 w-4" />}
                      />
                      <ValidatedField
                        label={c.contact.form.port}
                        value={form.port}
                        onChange={(value) => update("port", value)}
                        icon={<Globe2 className="h-4 w-4" />}
                        placeholder={dir === "rtl" ? "مثلاً: جدة" : "e.g. Jeddah"}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-foreground">
                        {c.contact.form.message}
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-teal/15 bg-secondary/60 px-4 py-3 text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                        placeholder={dir === "rtl"
                          ? "أي تفاصيل إضافية تساعدنا نرد بشكل أدق…"
                          : "Any extra details that help us respond more accurately…"}
                      />
                    </div>

                    {Object.values(touched).some(Boolean) &&
                      !allRequiredValid() &&
                      Object.values(touched).filter(Boolean).length >= 2 && (
                        <div className="flex items-center gap-2 rounded-xl border border-orange/25 bg-orange/8 p-3 text-xs text-orange">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {dir === "rtl"
                            ? "يرجى مراجعة الحقول المظللة بالأحمر والتأكد من صحة البيانات."
                            : "Please review the highlighted fields and ensure all data is correct."}
                        </div>
                      )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange px-7 font-semibold text-orange-foreground shadow-md shadow-orange/25 transition-colors hover:bg-orange-dark disabled:opacity-60 sm:w-auto"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-foreground/30 border-t-orange-foreground" />
                          {dir === "rtl" ? "جارٍ الإرسال…" : "Sending…"}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {c.contact.form.submit}
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-10 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-serif-display text-3xl font-bold">
                      {c.contact.form.successTitle}
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {c.contact.form.successDesc}
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <a
                        href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1FB855]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {c.contact.channels.whatsapp}
                      </a>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-teal px-5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-teal-foreground"
                      >
                        {c.contact.form.sendAnother}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="space-y-3">
                <ChannelCard
                  icon={<MessageCircle className="h-5 w-5" />}
                  title={c.contact.channels.whatsapp}
                  value={siteSettings.whatsappDisplay}
                  href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                  highlight
                />
                <ChannelCard
                  icon={<Mail className="h-5 w-5" />}
                  title={c.contact.channels.email}
                  value="info@snack-fruits.com"
                  href="mailto:info@snack-fruits.com"
                />
                <ChannelCard
                  icon={<MapPin className="h-5 w-5" />}
                  title={dir === "rtl" ? "الموقع" : "Location"}
                  value={c.contact.channels.location}
                />
                <ChannelCard
                  icon={<Clock3 className="h-5 w-5" />}
                  title={dir === "rtl" ? "ساعات العمل" : "Working hours"}
                  value={c.contact.channels.hours}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-teal/15 bg-gradient-to-br from-teal/8 to-orange/8 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {flowTitleStart}
                    </div>
                    <div className="text-sm font-semibold">{flowTitleEnd}</div>
                  </div>
                </div>
                <ol className="space-y-2.5">
                  {c.contact.flow.steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-3 text-xs">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-teal-foreground">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValidatedField({
  label,
  value,
  onChange,
  onBlur,
  status = "neutral",
  error,
  icon,
  type = "text",
  placeholder,
  inputDir,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  status?: FieldStatus;
  error?: string;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  inputDir?: "ltr" | "rtl";
}) {
  const borderClass = status === "error"
    ? "border-red-500/60 bg-red-500/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
    : status === "valid"
      ? "border-teal/50 bg-teal/5 focus:border-teal focus:ring-2 focus:ring-teal/20"
      : "border-teal/15 focus:border-teal focus:ring-2 focus:ring-teal/20";

  return (
    <div className="flex flex-col">
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <span className={`pointer-events-none absolute text-muted-foreground ${inputDir === "ltr" ? "left-3" : "right-3"}`}>
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
          className={`w-full rounded-xl border bg-secondary/60 py-3 text-sm outline-none transition-all duration-200 ${icon ? (inputDir === "ltr" ? "pl-10 pr-9" : "pl-9 pr-10") : "px-4 pr-9"} ${borderClass}`}
        />
        <span className={`pointer-events-none absolute ${inputDir === "ltr" ? "right-3" : "left-3"}`}>
          {status === "valid" && <Check className="h-3.5 w-3.5 text-teal" />}
          {status === "error" && <X className="h-3.5 w-3.5 text-red-500" />}
        </span>
      </div>
      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-500">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function WhatsAppField({
  label,
  value,
  onChange,
  onBlur,
  status = "neutral",
  error,
  selectedRule,
  onRuleChange,
  rules,
  dir,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  React.useEffect(() => {
    if (open) searchInputRef.current?.focus();
  }, [open]);

  const filteredRules = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rules;
    return rules.filter((rule) =>
      rule.label.includes(search) ||
      rule.labelEn.toLowerCase().includes(query) ||
      rule.code.includes(query)
    );
  }, [rules, search]);

  const digits = value.replace(/[^0-9]/g, "");
  const digitInfo = `${digits.length}/${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`}`;

  const borderClass = status === "error"
    ? "border-red-500/60 bg-red-500/5 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
    : status === "valid"
      ? "border-teal/50 bg-teal/5 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20"
      : "border-teal/15 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20";

  return (
    <div ref={containerRef} className="flex flex-col">
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </label>
      <div className={`relative flex h-[46px] items-stretch rounded-xl border bg-secondary/60 transition-all duration-200 ${borderClass}`}>
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            setSearch("");
          }}
          className="relative flex shrink-0 items-center gap-1.5 rounded-l-xl border-r border-teal/15 px-3 transition-colors hover:bg-teal/5"
          dir="ltr"
        >
          <span className="text-base leading-none">{selectedRule.flag}</span>
          <span className="text-xs font-semibold text-foreground">{selectedRule.code}</span>
          <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-72 overflow-hidden rounded-2xl border border-teal/20 bg-card shadow-2xl shadow-black/20">
            <div className="border-b border-teal/10 p-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={dir === "rtl" ? "بحث عن الدولة…" : "Search country…"}
                  className="w-full rounded-lg border border-teal/10 bg-secondary/60 py-2 pl-8 pr-3 text-xs outline-none transition-colors focus:border-teal/30"
                  dir={dir}
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto overscroll-contain">
              {filteredRules.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  {dir === "rtl" ? "لا توجد نتائج" : "No results"}
                </div>
              ) : (
                filteredRules.map((rule) => (
                  <button
                    key={rule.code}
                    type="button"
                    onClick={() => {
                      onRuleChange(rule);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-teal/8 ${selectedRule.code === rule.code ? "bg-teal/10" : ""}`}
                    dir="ltr"
                  >
                    <span className="text-lg leading-none">{rule.flag}</span>
                    <span className="flex-1 text-left">
                      <span className="text-xs font-semibold text-foreground">
                        {dir === "rtl" ? rule.label : rule.labelEn}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">{rule.code}</span>
                    {selectedRule.code === rule.code && <Check className="h-3.5 w-3.5 text-teal" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div className="relative flex flex-1 items-center">
          <Phone className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="tel"
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={onBlur}
            placeholder={selectedRule.code === "+966" ? "5xx xxx xxx" : selectedRule.code === "+20" ? "1xx xxxx xxxx" : "xxx xxx xxxx"}
            dir="ltr"
            className={`h-full w-full bg-transparent pl-10 pr-16 text-sm outline-none ${status === "error" ? "text-red-500 placeholder:text-red-500/40" : ""}`}
          />
          <span className="pointer-events-none absolute right-3 flex items-center gap-1.5">
            <span className={`text-[10px] tabular-nums ${status === "valid" ? "text-teal" : status === "error" ? "text-red-500" : "text-muted-foreground"}`}>
              {digits.length > 0 && digitInfo}
            </span>
            {status === "valid" && <Check className="h-3.5 w-3.5 text-teal" />}
            {status === "error" && <X className="h-3.5 w-3.5 text-red-500" />}
          </span>
        </div>
      </div>

      {digits.length > 0 && status !== "valid" && (
        <div className="mt-1 text-[10px] text-muted-foreground">
          {selectedRule.flag}{" "}
          {dir === "rtl"
            ? `${selectedRule.label}: ${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`} رقم${selectedRule.prefix ? ` يبدأ بـ ${selectedRule.prefix}` : ""}`
            : `${selectedRule.labelEn}: ${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`} digits${selectedRule.prefix ? ` starting with ${selectedRule.prefix}` : ""}`}
        </div>
      )}

      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-500">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function ChannelCard({
  icon,
  title,
  value,
  href,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  highlight?: boolean;
}) {
  const content = (
    <div className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${highlight ? "border-teal/20 bg-teal/8 hover:border-teal/40" : "border-teal/12 bg-card hover:border-teal/30"}`}>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${highlight ? "bg-orange text-orange-foreground" : "bg-teal/10 text-teal"}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </div>
        <div className="mt-0.5 truncate text-sm font-bold" dir="ltr">
          {value}
        </div>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  );
}

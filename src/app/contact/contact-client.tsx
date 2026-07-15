"use client";

import * as React from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Send,
  User,
  Building2,
  FileText,
  Clock3,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/components/content";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useLang } from "@/components/language-provider";
import { NavProvider, type PageId } from "@/components/nav-provider";
import { useSiteSettings } from "@/components/use-site-settings";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import styles from "./page.module.css";

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

type ContactFormData = {
  name: string;
  company: string;
  country: string;
  whatsapp: string;
  email: string;
  product: string;
  quantity: string;
  packing: string;
  port: string;
  use: string;
  message: string;
  website: string;
};

type FieldStatus = "neutral" | "error" | "valid";
type ValidationCode =
  | ""
  | "min2chars"
  | "noNumbers"
  | "invalidEmail"
  | "tooShort"
  | "tooLong"
  | "wrongPrefix"
  | null;
type ValidatedFieldName = "name" | "company" | "country" | "email" | "whatsapp";

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

const REQUIRED_FIELDS: ValidatedFieldName[] = ["name", "company", "country", "email", "whatsapp"];

function createEmptyForm(): ContactFormData {
  return {
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
  };
}

function validateName(value: string): ValidationCode {
  if (!value.trim()) return null;
  if (value.trim().length < 2) return "min2chars";
  if (/[0-9]/.test(value)) return "noNumbers";
  return "";
}

function validateCompany(value: string): ValidationCode {
  if (!value.trim()) return null;
  if (value.trim().length < 2) return "min2chars";
  return "";
}

function validateCountry(value: string): ValidationCode {
  if (!value.trim()) return null;
  return "";
}

function validateEmail(value: string): ValidationCode {
  if (!value.trim()) return null;
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)) return "invalidEmail";
  return "";
}

function validateWhatsApp(digits: string, rule: PhoneRule): ValidationCode {
  if (!digits) return null;
  if (digits.length < rule.minDigits) return "tooShort";
  if (digits.length > rule.maxDigits) return "tooLong";
  if (rule.prefix && !digits.startsWith(rule.prefix)) return "wrongPrefix";
  return "";
}

function getFieldStatus(error: ValidationCode): FieldStatus {
  if (error === null) return "neutral";
  if (error === "") return "valid";
  return "error";
}

function splitTitle(value: string) {
  const parts = value.split(" ");
  return {
    start: parts.slice(0, 2).join(" "),
    end: parts.slice(2).join(" "),
  };
}

function getErrorMessage(
  dir: "ltr" | "rtl",
  error: Exclude<ValidationCode, null | "">,
  selectedRule: PhoneRule
) {
  const messages = {
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

  return messages[dir][error];
}

function useContactForm(dir: "ltr" | "rtl") {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedRule, setSelectedRule] = React.useState(PHONE_RULES[0]);
  const [form, setForm] = React.useState<ContactFormData>(() => createEmptyForm());
  const [touched, setTouched] = React.useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const validationResults = React.useMemo(
    () => ({
      name: validateName(form.name),
      company: validateCompany(form.company),
      country: validateCountry(form.country),
      email: validateEmail(form.email),
      whatsapp: validateWhatsApp(form.whatsapp.replace(/[^0-9]/g, ""), selectedRule),
    }),
    [form.company, form.country, form.email, form.name, form.whatsapp, selectedRule]
  );

  const allRequiredValid = React.useMemo(
    () => REQUIRED_FIELDS.every((field) => validationResults[field] === ""),
    [validationResults]
  );

  const touchedCount = React.useMemo(
    () => Object.values(touched).filter(Boolean).length,
    [touched]
  );

  const showValidationBanner = touchedCount >= 2 && touchedCount > 0 && !allRequiredValid;

  const getError = React.useCallback(
    (field: ValidatedFieldName): ValidationCode => {
      if (!touched[field]) return null;
      return validationResults[field];
    },
    [touched, validationResults]
  );

  const getStatus = React.useCallback(
    (field: ValidatedFieldName) => getFieldStatus(getError(field)),
    [getError]
  );

  const getErrorMsg = React.useCallback(
    (field: ValidatedFieldName) => {
      const error = getError(field);
      if (!error) return undefined;
      return getErrorMessage(dir, error, selectedRule);
    },
    [dir, getError, selectedRule]
  );

  const updateField = React.useCallback(<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const markTouched = React.useCallback((key: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const reset = React.useCallback(() => {
    setForm(createEmptyForm());
    setTouched({});
    setSubmitted(false);
    setLoading(false);
    setSelectedRule(PHONE_RULES[0]);
  }, []);

  const submit = React.useCallback(async () => {
    setTouched((prev) => ({
      ...prev,
      name: true,
      company: true,
      country: true,
      email: true,
      whatsapp: true,
    }));

    if (!REQUIRED_FIELDS.every((field) => validationResults[field] === "")) {
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
  }, [dir, form, selectedRule, validationResults]);

  return {
    form,
    loading,
    selectedRule,
    setSelectedRule,
    submitted,
    showValidationBanner,
    updateField,
    markTouched,
    getStatus,
    getErrorMsg,
    submit,
    reset,
  };
}

export function ContactPageClient() {
  const c = useContent();
  const { dir, t } = useLang();
  const siteSettings = useSiteSettings();
  const title = React.useMemo(() => splitTitle(c.contact.title), [c.contact.title]);
  const flowTitle = React.useMemo(() => splitTitle(c.contact.flow.title), [c.contact.flow.title]);
  const formState = useContactForm(dir);

  const stripItems = React.useMemo(
    () => [
      t("Response in 1 business day", "رد خلال 1 يوم عمل"),
      t("More details = faster response", "بيانات كاملة = رد أسرع"),
      t("Professional WhatsApp follow-up", "متابعة واتساب احترافية"),
      t("We qualify your inquiry respectfully", "نؤهل استفسارك بكل احترام"),
    ],
    [t]
  );

  const heroPoints = React.useMemo(
    () => [
      t("Export team follow-up on WhatsApp and email.", "متابعة من فريق التصدير عبر واتساب والبريد."),
      t("Best for importers, distributors, HoReCa, and food factories.", "مناسب للمستوردين والموزعين وHoReCa ومصانع الأغذية."),
      t("Share product, packing, quantity, and destination to speed up qualification.", "شارك المنتج والتعبئة والكمية والوجهة لتسريع التأهيل."),
    ],
    [t]
  );

  const heroStats = React.useMemo(
    () => [
      { value: "01", label: t("Qualified B2B inquiry", "استفسار B2B مؤهل") },
      { value: "02", label: t("WhatsApp-first follow-up", "متابعة واتساب أولاً") },
      { value: "03", label: t("GCC-focused export team", "فريق تصدير موجه للخليج") },
    ],
    [t]
  );

  const navigateToMainSite = React.useCallback((page: PageId) => {
    if (typeof window === "undefined") return;
    if (page === "contact") {
      window.location.href = "/contact";
      return;
    }
    window.location.href = `/#${page}`;
  }, []);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await formState.submit();
    },
    [formState]
  );

  return (
    <NavProvider initialPage="contact" navigateOverride={navigateToMainSite} floating={<WhatsAppFloat />}>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className={styles.page} dir={dir}>
          <section className={styles.heroSection}>
            <div className={styles.shell}>
              <div className={styles.heroPanel}>
                <div className={styles.heroIntro}>
                  <div className={styles.eyebrow}>{c.contact.kicker}</div>
                  <h1 className={styles.heroTitle}>
                    <span className={styles.heroTitleStart}>{title.start}</span>
                    <span className={styles.heroTitleEnd}>{title.end}</span>
                  </h1>
                  <div className={styles.heroDivider} />
                  <p className={styles.heroDesc}>{c.contact.desc}</p>

                  <div className={styles.statRow}>
                    {heroStats.map((item, index) => (
                      <div
                        key={item.value}
                        className={styles.stat}
                        style={{ ["--delay" as string]: `${index * 120}ms` }}
                      >
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className={styles.heroAside}>
                  <p className={styles.asideLabel}>{c.contact.flow.title}</p>
                  <h2 className={styles.asideTitle}>
                    {t("Share the essentials clearly", "شارك الأساسيات بوضوح")}
                  </h2>
                  <p className={styles.asideText}>
                    {t(
                      "A stronger contact experience with the same business logic, safer structure, and smoother interaction in both light and dark modes.",
                      "تجربة تواصل أقوى بنفس منطق العمل، وهيكل أكثر أمانًا، وتفاعل أنعم في الوضعين الفاتح والداكن."
                    )}
                  </p>
                  <ul className={styles.asideList}>
                    {heroPoints.map((item, index) => (
                      <li key={item} style={{ ["--delay" as string]: `${index * 120 + 120}ms` }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>

            <div className={styles.stripBar}>
              <div className={styles.shell}>
                <div className={styles.stripList}>
                  {stripItems.map((item) => (
                    <span key={item} className={styles.stripItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.mainSection}>
            <div className={styles.shell}>
              <div className={styles.mainGrid}>
                <section className={styles.formCard}>
                  {!formState.submitted ? (
                    <form onSubmit={handleSubmit} noValidate className={styles.form}>
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        className={styles.hiddenTrap}
                        value={formState.form.website}
                        onChange={(event) => formState.updateField("website", event.target.value)}
                      />

                      <div className={styles.sectionHeading}>
                        <div className={styles.sectionEyebrow}>
                          {t("Required fields", "بيانات أساسية")}
                        </div>
                        <h2 className={styles.sectionTitle}>
                          {t("Qualified inquiry form", "نموذج استفسار مؤهل")}
                        </h2>
                        <p className={styles.helperText}>{c.contact.desc}</p>
                      </div>

                      <div className={styles.fieldGrid}>
                        <ValidatedField
                          label={c.contact.form.name}
                          value={formState.form.name}
                          onChange={(value) => formState.updateField("name", value)}
                          onBlur={() => formState.markTouched("name")}
                          status={formState.getStatus("name")}
                          error={formState.getErrorMsg("name")}
                          icon={<User className={styles.svgIcon} />}
                          placeholder={t("Enter full name", "اكتب الاسم الكامل")}
                        />
                        <ValidatedField
                          label={c.contact.form.company}
                          value={formState.form.company}
                          onChange={(value) => formState.updateField("company", value)}
                          onBlur={() => formState.markTouched("company")}
                          status={formState.getStatus("company")}
                          error={formState.getErrorMsg("company")}
                          icon={<Building2 className={styles.svgIcon} />}
                          placeholder={t("Enter company name", "اكتب اسم الشركة")}
                        />
                        <ValidatedField
                          label={c.contact.form.country}
                          value={formState.form.country}
                          onChange={(value) => formState.updateField("country", value)}
                          onBlur={() => formState.markTouched("country")}
                          status={formState.getStatus("country")}
                          error={formState.getErrorMsg("country")}
                          icon={<Globe2 className={styles.svgIcon} />}
                          placeholder={t("Country", "الدولة")}
                        />
                        <WhatsAppField
                          label={c.contact.form.whatsapp}
                          value={formState.form.whatsapp}
                          onChange={(value) => formState.updateField("whatsapp", value)}
                          onBlur={() => formState.markTouched("whatsapp")}
                          status={formState.getStatus("whatsapp")}
                          error={formState.getErrorMsg("whatsapp")}
                          selectedRule={formState.selectedRule}
                          onRuleChange={formState.setSelectedRule}
                          rules={PHONE_RULES}
                          dir={dir}
                        />
                        <ValidatedField
                          label={c.contact.form.email}
                          value={formState.form.email}
                          onChange={(value) => formState.updateField("email", value)}
                          onBlur={() => formState.markTouched("email")}
                          status={formState.getStatus("email")}
                          error={formState.getErrorMsg("email")}
                          icon={<Mail className={styles.svgIcon} />}
                          type="email"
                          placeholder="you@company.com"
                          inputDir="ltr"
                        />
                        <ValidatedField
                          label={c.contact.form.use}
                          value={formState.form.use}
                          onChange={(value) => formState.updateField("use", value)}
                          icon={<FileText className={styles.svgIcon} />}
                          placeholder={t("Target use", "الاستخدام")}
                        />
                      </div>

                      <div className={styles.optionalHeading}>
                        {t("Order details", "تفاصيل الطلب")}
                      </div>

                      <div className={styles.fieldGrid}>
                        <ValidatedField
                          label={c.contact.form.product}
                          value={formState.form.product}
                          onChange={(value) => formState.updateField("product", value)}
                          icon={<FileText className={styles.svgIcon} />}
                          placeholder={t("Product type", "نوع المنتج")}
                        />
                        <ValidatedField
                          label={c.contact.form.quantity}
                          value={formState.form.quantity}
                          onChange={(value) => formState.updateField("quantity", value)}
                          icon={<FileText className={styles.svgIcon} />}
                          placeholder={t("e.g. 5 tons", "مثلاً: 5 أطنان")}
                        />
                        <ValidatedField
                          label={c.contact.form.packing}
                          value={formState.form.packing}
                          onChange={(value) => formState.updateField("packing", value)}
                          icon={<FileText className={styles.svgIcon} />}
                          placeholder={t("Packing type", "نوع التعبئة")}
                        />
                        <ValidatedField
                          label={c.contact.form.port}
                          value={formState.form.port}
                          onChange={(value) => formState.updateField("port", value)}
                          icon={<MapPin className={styles.svgIcon} />}
                          placeholder={t("e.g. Jeddah", "مثلاً: جدة")}
                        />
                        <ValidatedTextarea
                          label={c.contact.form.message}
                          value={formState.form.message}
                          onChange={(value) => formState.updateField("message", value)}
                          placeholder={t(
                            "Any extra details that help us respond more accurately...",
                            "أي تفاصيل إضافية تساعدنا نرد بشكل أدق..."
                          )}
                        />
                      </div>

                      {formState.showValidationBanner && (
                        <div className={styles.validationBanner}>
                          <AlertCircle className={styles.bannerIcon} />
                          <span>
                            {dir === "rtl"
                              ? "يرجى مراجعة الحقول المظللة والتأكد من صحة البيانات المطلوبة."
                              : "Please review the highlighted fields and make sure the required data is valid."}
                          </span>
                        </div>
                      )}

                      <button type="submit" disabled={formState.loading} className={styles.submitButton}>
                        {formState.loading ? (
                          <>
                            <span className={styles.spinner} />
                            {dir === "rtl" ? "جارٍ الإرسال…" : "Sending…"}
                          </>
                        ) : (
                          <>
                            <Send className={styles.buttonIcon} />
                            {c.contact.form.submit}
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <ContactSuccessState
                      successTitle={c.contact.form.successTitle}
                      successDesc={c.contact.form.successDesc}
                      whatsappLabel={c.contact.channels.whatsapp}
                      whatsappHref={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                      sendAnotherLabel={c.contact.form.sendAnother}
                      onReset={formState.reset}
                    />
                  )}
                </section>

                <aside className={styles.sidebar}>
                  <ChannelCard
                    title={c.contact.channels.whatsapp}
                    value={siteSettings.whatsappDisplay}
                    meta={t("Primary export follow-up channel", "قناة المتابعة الأساسية لفريق التصدير")}
                    icon={<MessageCircle className={styles.cardIconSvg} />}
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                    highlight
                    ltrValue
                  />
                  <ChannelCard
                    title={c.contact.channels.email}
                    value="info@snack-fruits.com"
                    meta={t("For formal quotations and business communication", "للعروض الرسمية والتواصل التجاري")}
                    icon={<Mail className={styles.cardIconSvg} />}
                    href="mailto:info@snack-fruits.com"
                    ltrValue
                  />
                  <ChannelCard
                    title={dir === "rtl" ? "الموقع" : "Location"}
                    value={c.contact.channels.location}
                    meta={t("Export-ready support from Egypt to GCC markets", "دعم تصديري جاهز من مصر إلى أسواق الخليج")}
                    icon={<MapPin className={styles.cardIconSvg} />}
                  />
                  <ChannelCard
                    title={dir === "rtl" ? "ساعات العمل" : "Working hours"}
                    value={c.contact.channels.hours}
                    meta={t("Fastest response during official business hours", "أسرع استجابة خلال ساعات العمل الرسمية")}
                    icon={<Clock3 className={styles.cardIconSvg} />}
                  />

                  <div className={styles.flowCard}>
                    <div className={styles.sectionEyebrow}>{flowTitle.start}</div>
                    <h3 className={styles.flowTitle}>{flowTitle.end}</h3>
                    <ol className={styles.flowList}>
                      {c.contact.flow.steps.map((step, index) => (
                        <li key={step} className={styles.flowItem}>
                          <span className={styles.flowIndex}>{index + 1}</span>
                          <span className={styles.flowText}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </NavProvider>
  );
}

const ValidatedField = React.memo(function ValidatedField({
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
  const errorId = React.useId();
  const statusClass = status === "error"
    ? styles.inputWrapError
    : status === "valid"
      ? styles.inputWrapValid
      : "";

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={`${styles.inputWrap} ${statusClass}`}>
        {icon && <span className={`${styles.inputIcon} ${inputDir === "ltr" ? styles.inputIconLeft : styles.inputIconRight}`}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          dir={inputDir}
          aria-invalid={status === "error"}
          aria-describedby={error ? errorId : undefined}
          className={`${styles.textInput} ${icon ? (inputDir === "ltr" ? styles.inputWithIconLeft : styles.inputWithIconRight) : styles.inputPlain}`}
        />
        <span className={styles.inputStatusIcon}>
          {status === "valid" && <Check className={styles.statusOk} />}
          {status === "error" && <X className={styles.statusError} />}
        </span>
      </div>
      {error && (
        <div id={errorId} className={styles.validationMessage}>
          <AlertCircle className={styles.messageIcon} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

const ValidatedTextarea = React.memo(function ValidatedTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={`${styles.field} ${styles.fieldFull}`}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputWrap}>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${styles.textInput} ${styles.textArea} ${styles.inputPlain}`}
        />
      </div>
    </div>
  );
});

const WhatsAppField = React.memo(function WhatsAppField({
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
  dir: "ltr" | "rtl";
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const errorId = React.useId();

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

  const digits = React.useMemo(() => value.replace(/[^0-9]/g, ""), [value]);
  const digitInfo = `${digits.length}/${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`}`;
  const statusClass = status === "error"
    ? styles.inputWrapError
    : status === "valid"
      ? styles.inputWrapValid
      : "";

  return (
    <div ref={containerRef} className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={`${styles.phoneField} ${statusClass}`}>
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            setSearch("");
          }}
          className={styles.countryButton}
          dir="ltr"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={styles.countryFlag}>{selectedRule.flag}</span>
          <span className={styles.countryCode}>{selectedRule.code}</span>
          <ChevronDown className={`${styles.countryArrow} ${open ? styles.countryArrowOpen : ""}`} />
        </button>

        {open && (
          <div className={styles.countryDropdown}>
            <div className={styles.countrySearchWrap}>
              <Search className={styles.countrySearchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={dir === "rtl" ? "بحث عن الدولة…" : "Search country…"}
                className={styles.countrySearchInput}
                dir={dir}
              />
            </div>

            <div className={styles.countryList} role="listbox">
              {filteredRules.length === 0 ? (
                <div className={styles.countryEmpty}>
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
                    className={`${styles.countryOption} ${selectedRule.code === rule.code ? styles.countryOptionActive : ""}`}
                    dir="ltr"
                    role="option"
                    aria-selected={selectedRule.code === rule.code}
                  >
                    <span className={styles.countryFlagLarge}>{rule.flag}</span>
                    <span className={styles.countryOptionText}>
                      <span className={styles.countryOptionLabel}>
                        {dir === "rtl" ? rule.label : rule.labelEn}
                      </span>
                    </span>
                    <span className={styles.countryOptionCode}>{rule.code}</span>
                    {selectedRule.code === rule.code && <Check className={styles.statusOk} />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div className={styles.phoneInputWrap}>
          <Phone className={styles.phoneIcon} />
          <input
            type="tel"
            value={value}
            onChange={(event) => onChange(event.target.value.replace(/[^0-9]/g, ""))}
            onBlur={onBlur}
            placeholder={selectedRule.code === "+966" ? "5xx xxx xxx" : selectedRule.code === "+20" ? "1xx xxxx xxxx" : "xxx xxx xxxx"}
            dir="ltr"
            aria-invalid={status === "error"}
            aria-describedby={error ? errorId : undefined}
            className={`${styles.textInput} ${styles.phoneInput}`}
          />
          <span className={styles.phoneStatus}>
            {digits.length > 0 && (
              <span className={`${styles.phoneDigits} ${status === "valid" ? styles.phoneDigitsValid : status === "error" ? styles.phoneDigitsError : ""}`}>
                {digitInfo}
              </span>
            )}
            {status === "valid" && <Check className={styles.statusOk} />}
            {status === "error" && <X className={styles.statusError} />}
          </span>
        </div>
      </div>

      {digits.length > 0 && status !== "valid" && (
        <div className={styles.validationHint}>
          {selectedRule.flag}{" "}
          {dir === "rtl"
            ? `${selectedRule.label}: ${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`} رقم${selectedRule.prefix ? ` يبدأ بـ ${selectedRule.prefix}` : ""}`
            : `${selectedRule.labelEn}: ${selectedRule.minDigits === selectedRule.maxDigits ? selectedRule.minDigits : `${selectedRule.minDigits}-${selectedRule.maxDigits}`} digits${selectedRule.prefix ? ` starting with ${selectedRule.prefix}` : ""}`}
        </div>
      )}

      {error && (
        <div id={errorId} className={styles.validationMessage}>
          <AlertCircle className={styles.messageIcon} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

const ChannelCard = React.memo(function ChannelCard({
  title,
  value,
  meta,
  icon,
  href,
  highlight,
  ltrValue,
}: {
  title: string;
  value: string;
  meta: string;
  icon: React.ReactNode;
  href?: string;
  highlight?: boolean;
  ltrValue?: boolean;
}) {
  const content = (
    <div className={`${styles.channelCard} ${highlight ? styles.channelCardHighlight : ""}`}>
      <div className={`${styles.channelIcon} ${highlight ? styles.channelIconHighlight : ""}`}>
        {icon}
      </div>
      <div className={styles.channelBody}>
        <div className={styles.channelLabel}>{title}</div>
        <div className={styles.channelValue} dir={ltrValue ? "ltr" : undefined}>{value}</div>
        <div className={styles.channelMeta}>{meta}</div>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.channelLink}>
      {content}
    </a>
  );
});

const ContactSuccessState = React.memo(function ContactSuccessState({
  successTitle,
  successDesc,
  whatsappLabel,
  whatsappHref,
  sendAnotherLabel,
  onReset,
}: {
  successTitle: string;
  successDesc: string;
  whatsappLabel: string;
  whatsappHref: string;
  sendAnotherLabel: string;
  onReset: () => void;
}) {
  return (
    <div className={styles.successState}>
      <div className={styles.successIcon}>
        <CheckCircle2 className={styles.successIconSvg} />
      </div>
      <h3 className={styles.successTitle}>{successTitle}</h3>
      <p className={styles.successDesc}>{successDesc}</p>
      <div className={styles.successActions}>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.successWhatsApp}>
          <MessageCircle className={styles.buttonIcon} />
          {whatsappLabel}
        </a>
        <button type="button" onClick={onReset} className={styles.successReset}>
          {sendAnotherLabel}
        </button>
      </div>
    </div>
  );
});

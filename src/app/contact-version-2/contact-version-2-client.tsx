"use client";

import * as React from "react";
import { useContent } from "@/components/content";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useLang } from "@/components/language-provider";
import { NavProvider, type PageId } from "@/components/nav-provider";
import { useSiteSettings } from "@/components/use-site-settings";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import styles from "./page.module.css";

function splitTitle(value: string) {
  const parts = value.split(" ");
  return {
    start: parts.slice(0, 2).join(" "),
    end: parts.slice(2).join(" "),
  };
}

export function ContactVersion2Client() {
  const c = useContent();
  const { dir, t } = useLang();
  const siteSettings = useSiteSettings();

  const title = React.useMemo(() => splitTitle(c.contact.title), [c.contact.title]);
  const flowTitle = React.useMemo(() => splitTitle(c.contact.flow.title), [c.contact.flow.title]);

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
      window.location.href = "/contact-version-2";
      return;
    }
    window.location.href = `/#${page}`;
  }, []);

  return (
    <NavProvider
      initialPage="contact"
      navigateOverride={navigateToMainSite}
      floating={<WhatsAppFloat />}
    >
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
                    {heroStats.map((item) => (
                      <div key={item.value} className={styles.stat}>
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
                      "This route keeps the safer isolated structure while restoring the familiar Snack Fruits contact direction, theme, and language behavior.",
                      "هذا المسار يحافظ على الهيكل المعزول الأكثر أمانًا مع استرجاع اتجاه صفحة التواصل المألوف وثيم ولغة Snack Fruits."
                    )}
                  </p>
                  <ul className={styles.asideList}>
                    {heroPoints.map((item) => (
                      <li key={item}>{item}</li>
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
                  <div className={styles.sectionHeading}>
                    <div className={styles.sectionEyebrow}>
                      {t("Required fields", "بيانات أساسية")}
                    </div>
                    <h2 className={styles.sectionTitle}>
                      {t("Qualified inquiry form", "نموذج استفسار مؤهل")}
                    </h2>
                    <p className={styles.helperText}>
                      {c.contact.desc}
                    </p>
                  </div>

                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label>{c.contact.form.name}</label>
                      <input placeholder={t("Enter full name", "اكتب الاسم الكامل")} />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.company}</label>
                      <input placeholder={t("Enter company name", "اكتب اسم الشركة")} />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.country}</label>
                      <input placeholder={t("Country", "الدولة")} />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.whatsapp}</label>
                      <input placeholder="+966 ..." dir="ltr" />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.email}</label>
                      <input placeholder="you@company.com" dir="ltr" />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.use}</label>
                      <input placeholder={t("Target use", "الاستخدام")} />
                    </div>
                  </div>

                  <div className={styles.optionalHeading}>
                    {t("Order details", "تفاصيل الطلب")}
                  </div>

                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label>{c.contact.form.product}</label>
                      <input placeholder={t("Product type", "نوع المنتج")} />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.quantity}</label>
                      <input placeholder={t("e.g. 5 tons", "مثلاً: 5 أطنان")} />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.packing}</label>
                      <input placeholder={t("Packing type", "نوع التعبئة")} />
                    </div>
                    <div className={styles.field}>
                      <label>{c.contact.form.port}</label>
                      <input placeholder={t("e.g. Jeddah", "مثلاً: جدة")} />
                    </div>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label>{c.contact.form.message}</label>
                      <textarea
                        placeholder={t(
                          "Any extra details that help us respond more accurately...",
                          "أي تفاصيل إضافية تساعدنا نرد بشكل أدق..."
                        )}
                      />
                    </div>
                  </div>

                  <div className={styles.notice}>
                    {t(
                      "This version currently restores the full page shell and translated content while keeping the form visual-only until submission logic is reconnected.",
                      "هذه النسخة تسترجع حاليًا الغلاف الكامل للصفحة والمحتوى المترجم مع إبقاء الفورم بصريًا فقط لحين إعادة ربط منطق الإرسال."
                    )}
                  </div>

                  <button type="button" className={styles.submitStub}>
                    {c.contact.form.submit}
                  </button>
                </section>

                <aside className={styles.sidebar}>
                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(c.whatsapp.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.channelCard} ${styles.channelCardHighlight}`}
                  >
                    <div className={styles.channelLabel}>{c.contact.channels.whatsapp}</div>
                    <div className={styles.channelValue} dir="ltr">
                      {siteSettings.whatsappDisplay}
                    </div>
                    <div className={styles.channelMeta}>
                      {t("Primary export follow-up channel", "قناة المتابعة الأساسية لفريق التصدير")}
                    </div>
                  </a>

                  <a href="mailto:info@snack-fruits.com" className={styles.channelCard}>
                    <div className={styles.channelLabel}>{c.contact.channels.email}</div>
                    <div className={styles.channelValue} dir="ltr">
                      info@snack-fruits.com
                    </div>
                    <div className={styles.channelMeta}>
                      {t("For formal quotations and business communication", "للعروض الرسمية والتواصل التجاري")}
                    </div>
                  </a>

                  <div className={styles.channelCard}>
                    <div className={styles.channelLabel}>
                      {dir === "rtl" ? "الموقع" : "Location"}
                    </div>
                    <div className={styles.channelValue}>{c.contact.channels.location}</div>
                    <div className={styles.channelMeta}>
                      {t("Export-ready support from Egypt to GCC markets", "دعم تصديري جاهز من مصر إلى أسواق الخليج")}
                    </div>
                  </div>

                  <div className={styles.channelCard}>
                    <div className={styles.channelLabel}>
                      {dir === "rtl" ? "ساعات العمل" : "Working hours"}
                    </div>
                    <div className={styles.channelValue}>{c.contact.channels.hours}</div>
                    <div className={styles.channelMeta}>
                      {t("Fastest response during official business hours", "أسرع استجابة خلال ساعات العمل الرسمية")}
                    </div>
                  </div>

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

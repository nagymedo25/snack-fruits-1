import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Version 2",
  description: "Experimental standalone contact experience for mobile-safe UI testing.",
};

const channels = [
  {
    title: "محادثة واتساب",
    body: "قناة سريعة للتواصل التجاري الأولي، لكن الربط الفعلي سيتم في المرحلة التالية.",
  },
  {
    title: "بريد رسمي",
    body: "مكان مخصص لرسائل الشراء والعينات والاستفسارات المؤسسية بشكل رسمي وواضح.",
  },
  {
    title: "معلومات الطلب",
    body: "هيكل أبسط يركز على العميل والمنتج والكمية والسوق المستهدف بدون تعقيد بصري.",
  },
  {
    title: "تجربة موبايل",
    body: "تصميم ثابت ومباشر بدون animation أو مكتبات أو اعتماد على الـ layout القديم.",
  },
];

const steps = [
  {
    title: "صفحة مستقلة",
    body: "النسخة الجديدة مبنية كـ route منفصل داخل Next.js لكنها لا تعتمد على مكوّنات الموقع القديمة.",
  },
  {
    title: "ستايل محلي فقط",
    body: "كل التنسيق موجود في CSS Module خاص بالصفحة نفسها بدون Tailwind أو animations أو استيراد UI قديم.",
  },
  {
    title: "فورم تجريبي",
    body: "الحقول حالياً شكل فقط لاختبار تجربة الاستخدام والثبات على الهاتف قبل أي ربط منطقي.",
  },
  {
    title: "المرحلة القادمة",
    body: "بعد اعتماد الشكل، نربط نفس السلوك والـ validation والـ API تدريجياً خطوة بخطوة.",
  },
];

export default function ContactVersion2Page() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topBar}>
          <a href="/" className={styles.brand}>
            <span className={styles.brandMark}>SF</span>
            <span className={styles.brandText}>
              <strong>Snack Fruits</strong>
              <span>Contact Version 2</span>
            </span>
          </a>

          <div className={styles.topActions}>
            <a href="/" className={styles.ghostLink}>
              الرجوع للموقع الأساسي
            </a>
            <a href="#trial-form" className={styles.solidLink}>
              استعرض النسخة التجريبية
            </a>
          </div>
        </div>

        <section className={styles.hero}>
          <article className={styles.heroCard}>
            <p className={styles.eyebrow}>Standalone Route</p>
            <h1 className={styles.heroTitle}>
              صفحة تواصل جديدة
              <span>منفصلة تمامًا عن النظام القديم</span>
            </h1>
            <p className={styles.heroDesc}>
              هذه نسخة تجريبية مصممة من الصفر بهدف اختبار تجربة مختلفة تمامًا على الهاتف. لا يوجد
              فيها أي animation، ولا تعتمد على مكوّنات صفحة التواصل القديمة، ولا تستخدم نفس
              الهيكل السابق. الهدف هنا هو العزل الكامل قبل البدء في ربط المنطق الفعلي لاحقًا.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <strong>100%</strong>
                <span>صفحة جديدة بمعمارية منفصلة عن Contact القديمة</span>
              </div>
              <div className={styles.stat}>
                <strong>0</strong>
                <span>مكتبات UI أو animations مستخدمة داخل هذه الصفحة</span>
              </div>
              <div className={styles.stat}>
                <strong>Mobile</strong>
                <span>تركيز أساسي على الوضوح والثبات والاستجابة على الشاشات الصغيرة</span>
              </div>
            </div>
          </article>

          <aside className={`${styles.heroAside} ${styles.heroCard}`}>
            <p className={styles.asideLabel}>Why This Version</p>
            <h2 className={styles.asideTitle}>فصل جذري للمشكلة من الجذر</h2>
            <p className={styles.asideText}>
              بدل إصلاحات فوق نفس البنية القديمة، هذه الصفحة تعتبر تجربة منعزلة تمامًا تساعدنا
              نختبر إن كان الخلل مرتبط بالهيكل السابق نفسه.
            </p>
            <ul className={styles.asideList}>
              <li>لا يوجد استيراد لأي shared page components من نظام الموقع القديم.</li>
              <li>التصميم ثابت، نظيف، وسهل القراءة على الموبايل.</li>
              <li>يمكن ربط الفورم والـ API لاحقًا بدون الرجوع للبنية القديمة.</li>
            </ul>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.stack}>
            <article className={styles.panel}>
              <p className={styles.sectionLabel}>Design Direction</p>
              <h2 className={styles.sectionTitle}>ستايل جديد لكن بروح ألوان الموقع</h2>
              <p className={styles.sectionText}>
                تم بناء الصفحة على خلفية هادئة، كروت واضحة، وحضور لوني قائم على الـ teal والـ
                orange حتى تبقى منسجمة بصريًا مع الهوية العامة، لكن بدون إعادة استخدام تصميم أو
                كومبوننتات الموقع الحالية.
              </p>

              <div className={styles.cardsGrid}>
                {channels.map((item) => (
                  <article key={item.title} className={styles.card}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className={styles.wireCard}>
              <p className={styles.sectionLabel}>Build Plan</p>
              <h2 className={styles.sectionTitle}>ماذا سيحدث بعد اعتماد الشكل</h2>
              <ol className={styles.wireList}>
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.wireIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.wireBody}>
                      <strong>{step.title}</strong>
                      <span>{step.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          <aside className={styles.formShell} id="trial-form">
            <div className={styles.formFrame}>
              <p className={styles.sectionLabel}>Visual Prototype</p>
              <h2 className={styles.formTitle}>نموذج واجهة فقط</h2>
              <p className={styles.formHint}>
                الحقول التالية للعرض واختبار التصميم فقط. لا يوجد إرسال، ولا validation، ولا API في
                هذه المرحلة.
              </p>

              <div className={styles.fakeForm}>
                <div className={styles.twoCols}>
                  <div className={styles.field}>
                    <label>الاسم الكامل</label>
                    <input className={styles.disabledField} defaultValue="" placeholder="اكتب الاسم" />
                  </div>
                  <div className={styles.field}>
                    <label>اسم الشركة</label>
                    <input className={styles.disabledField} defaultValue="" placeholder="اسم الشركة" />
                  </div>
                </div>

                <div className={styles.twoCols}>
                  <div className={styles.field}>
                    <label>الدولة</label>
                    <input className={styles.disabledField} defaultValue="" placeholder="مثل: السعودية" />
                  </div>
                  <div className={styles.field}>
                    <label>واتساب</label>
                    <input className={styles.disabledField} defaultValue="" placeholder="+966 ..." dir="ltr" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>البريد الإلكتروني</label>
                  <input className={styles.disabledField} defaultValue="" placeholder="you@company.com" dir="ltr" />
                </div>

                <div className={styles.twoCols}>
                  <div className={styles.field}>
                    <label>المنتج المطلوب</label>
                    <input className={styles.disabledField} defaultValue="" placeholder="Mango / Strawberry / ..." />
                  </div>
                  <div className={styles.field}>
                    <label>الكمية التقديرية</label>
                    <input className={styles.disabledField} defaultValue="" placeholder="مثال: 1 Container" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>تفاصيل إضافية</label>
                  <textarea className={styles.disabledField} defaultValue="" placeholder="أي ملاحظات أو مواصفات إضافية..." />
                </div>

                <div className={styles.notice}>
                  هذه المنطقة متروكة عمدًا كتصميم فقط. في الخطوة التالية يمكننا نقل منطق الفورم
                  القديم تدريجيًا إلى هذه الصفحة بعد اختبارها على الموبايل.
                </div>

                <div className={styles.field}>
                  <button type="button" className={styles.submitStub}>
                    زر تجريبي فقط - لا يوجد إرسال الآن
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <p className={styles.footerNote}>
          Contact Version 2 هي صفحة اختبار مستقلة الغرض منها عزل مشكلة الرندر قبل إعادة إدخال أي
          سلوك تشغيلي.
        </p>
      </div>
    </main>
  );
}

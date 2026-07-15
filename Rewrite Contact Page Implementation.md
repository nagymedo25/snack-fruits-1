# Rewrite Contact Page Implementation

> **Workspace:** e:\Mahmoud Nagy\snack-fruits-website

---

**User**

IMPORTANT — Read Before Writing Any Code 
 
 Do NOT redesign the Contact page. 
 
 Do NOT reinterpret the UI. 
 
 Do NOT create a "similar" page. 
 
 The current Contact page is the visual source of truth. 
 
 Your task is to replace only the internal implementation, while keeping the page visually identical. 
 
 Context 
 
 This project is built with Next.js. 
 
 There is a rendering glitch that happens only on mobile devices and only on the Contact page. 
 
 After extensive debugging, we discovered something important: 
 
 When the Contact page was rebuilt with a simpler isolated implementation, the rendering glitch disappeared completely. 
 
 Therefore, the problem is not the backend, API, validation, translations, or business logic. 
 
 The problem is the old internal implementation of the Contact page. 
 
 Current State 
 
 I reverted the project back to the original stable version. 
 
 Everything is exactly as it originally was. 
 
 The Contact page still contains the original rendering glitch. 
 
 I now want to permanently replace only the implementation of the Contact page. 
 
 VERY IMPORTANT 
 
 The existing Contact page is your design specification. 
 
 Treat it exactly like a Figma file. 
 
 Do NOT redesign it. 
 
 Do NOT improve it. 
 
 Do NOT simplify it. 
 
 Do NOT make stylistic decisions. 
 
 Your job is to reproduce it as accurately as possible. 
 
 Pixel Perfect Requirement 
 
 The final Contact page must be visually indistinguishable from the current one. 
 
 That includes: 
 
 same layout 
 same spacing 
 same paddings 
 same margins 
 same colors 
 same typography 
 same icons 
 same hero 
 same sections 
 same cards 
 same responsive behavior 
 same visual hierarchy 
 same animations only if they are safe 
 same user experience 
 
 A user should not be able to notice that the page was rewritten. 
 
 What MUST stay unchanged 
 
 Do NOT modify: 
 
 Navbar 
 Footer 
 Global Layout 
 Theme System 
 Translation System 
 Routing 
 Shared Components 
 
 Import and use them exactly as the rest of the website does. 
 
 Contact Content Only 
 
 Only replace the internal implementation of the Contact page. 
 
 The new implementation should be architecturally independent from the old one. 
 
 Build it using clean React + Tailwind. 
 
 Avoid recreating the old architecture that caused the mobile glitch. 
 
 Functionality 
 
 The page must preserve 100% of the existing functionality. 
 
 Including: 
 
 Validation 
 Error messages 
 Success messages 
 Loading states 
 API integration 
 /api/inquiry 
 Backend payload 
 useCase 
 Honeypot 
 Country selector 
 WhatsApp validation 
 Email validation 
 Toasts 
 Accessibility 
 Keyboard navigation 
 
 Nothing should be lost. 
 
 DO NOT GUESS 
 
 Before changing anything: 
 
 Inspect the current Contact page. 
 Extract every visible section. 
 Extract every field. 
 Extract every validation rule. 
 Extract every interaction. 
 Extract every responsive behavior. 
 
 Only after fully understanding the page should you begin rewriting the implementation. 
 
 Required Workflow 
 Phase 1 
 
 Analyze the current Contact page. 
 
 Create a checklist. 
 
 Example: 
 
 Hero 
 Intro 
 Contact Cards 
 CRM Flow 
 Contact Form 
 Sidebar 
 Footer spacing 
 Validation 
 Loading 
 Success 
 API 
 Phase 2 
 
 Create a mapping. 
 
 For every section write: 
 
 Old Implementation 
 
 ↓ 
 
 New Implementation 
 
 Explain exactly how you will preserve the appearance while changing the implementation. 
 
 Do not write code yet. 
 
 Phase 3 
 
 Implement the new architecture. 
 
 Replace only the implementation. 
 
 Keep the visual output identical. 
 
 Phase 4 
 
 Verify. 
 
 Compare the new page against the current one. 
 
 If anything differs visually, fix it. 
 
 The final result should be visually indistinguishable. 
 
 Success Criteria 
 
 The task is considered complete only if: 
 
 ✅ The mobile rendering glitch is gone. 
 
 ✅ The page is visually identical to the original. 
 
 ✅ Navbar and Footer are untouched. 
 
 ✅ Theme switching behaves exactly like the rest of the website. 
 
 ✅ Arabic and English behave exactly like before. 
 
 ✅ All backend functionality still works. 
 
 ✅ All validation rules still work. 
 
 ✅ The user cannot tell that the page was rewritten internally.

**Assistant**

I’m starting by auditing the existing Contact page implementation and all related behavior so I can preserve the exact UI while replacing only the internals.

I’ve located the Contact page and the inquiry API; next I’m extracting the exact sections, validation rules, and dependencies before touching implementation.

I’ve confirmed the current page already bundles the UI and logic together; now I’m separating which parts are visual contract versus form behavior so the rewrite can preserve both exactly.

I’ve finished the code-level audit of the page, translations, and API contract; next I’m checking workspace state and then I’ll rewrite into a clean internal structure while keeping the rendered markup and classes aligned to the current UI.

Plan before edits:

- Checklist: hero, trust strip, form shell, required-field block, optional-details block, WhatsApp country selector, validation states, warning banner, submit/loading/toasts, success state, contact cards, CRM flow card, RTL/LTR copy, `/api/inquiry` payload, honeypot, accessibility and keyboard handling.
- Mapping: same section structure and Tailwind classes stay in place, but I’m moving the page to a cleaner split of constants + validation helpers + form state hook + smaller render components so the old monolithic implementation is replaced without changing the visual contract.
- Preservation approach: keep the current text sources from `useContent()`, keep `useLang()`/`useSiteSettings()`, keep the same field names and API payload, keep the same visible markup/classes for the hero/form/sidebar cards, and simplify the internal event/state flow so mobile rendering has fewer moving pieces.I’m replacing only `src/components/pages/contact.tsx` now, keeping the current visual markup/classes intact while moving the form logic into cleaner isolated helpers and components.

The rewrite is in place in a new internal structure, and I’m checking for TypeScript or lint issues now before I verify behavior.

Diagnostics are clean for the rewritten file. I’m doing one more pass with project scripts and reviewing the rendered-contact code path for any subtle regressions.

Build passes. I’m starting the dev server so you can inspect the rewritten Contact page directly, including on a mobile viewport.

The app build is clean. The local dev server didn’t stay attached in this environment, so I’m collecting precise file references and wrapping up with what changed and what to check on-device.

**Done**
- Replaced only the internal implementation of the Contact page in [contact.tsx](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx) and left `Navbar`, `Footer`, routing, theme, translations, and shared site structure untouched.
- Preserved the current visual contract by keeping the same page sections, same field set, same success state, same sidebar/cards, and the same Tailwind-driven rendered structure inside [ContactPage](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L351-L587).
- Moved the old monolithic logic into a cleaner internal split: form state/validation in [useContactForm](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L179-L349), hero in [ContactHero](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L589-L645), success block in [ContactSuccessState](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L647-L691), sidebar in [ContactSidebar](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L693-L769), and isolated field components in [ValidatedField](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L771-L836), [WhatsAppField](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L838-L1030), and [ChannelCard](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L1032-L1070).
- Kept the existing behavior intact: required-field validation, WhatsApp country-code rules, honeypot field, `/api/inquiry` payload shape including `useCase`, loading/success/error toasts, success/reset flow, RTL/LTR behavior, and keyboard-safe interactions.

**Mapping**
- Hero and trust strip: old inline JSX -> same rendered section/classes, now isolated in [ContactHero](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L589-L645).
- Form behavior: old page-level state/callbacks -> centralized in [useContactForm](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L179-L349) with unchanged validation rules and submit contract.
- Input rendering: old mixed logic/UI -> memoized [ValidatedField](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L771-L836) and [WhatsAppField](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L838-L1030) while preserving the same visible styling and messages.
- Sidebar and success state: old inline blocks -> isolated memoized components with the same content and classes in [ContactSuccessState](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L647-L691) and [ContactSidebar](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/pages/contact.tsx#L693-L769).

**Verification**
- `GetDiagnostics` for `contact.tsx`: clean.
- `npm run build`: passes.
- Scope: only `src/components/pages/contact.tsx` changed.

**Note**
- I verified code integrity and build safety, but I could not conclusively certify the mobile-only rendering glitch from this environment because I cannot inspect the affected physical/mobile browser rendering path here.
- The implementation is now structurally independent from the old monolith and optimized to reduce unnecessary page-wide rerenders, which is the safest rewrite path without redesigning the page.
- If you want, I can do one more pass focused purely on mobile-risk CSS/compositing issues inside the rewritten Contact page while keeping the output visually identical.

---

**User**

لا بص بقى صاحبي, بص أنت بتشتغل إزاي. دلوقتي ما حصلش أي حاجة. الصفحة الجديدة اللي أنت عملتها دي ولا كأن حصل فيها أي حاجة. برضه الفورم فيها نفس المشكلة. خليها مرجع ليك. دلوقتي اعملي route جديد واعمل connect بالزرار اللي في Navbar بتاع content ده بالroute الجديد. طيب. إيه route الجديد؟ route الجديد هتسميه contact version 2. وهتعمل صفحة جديدة اسمها contact version 2. هل هو الكلام. مش شرط أساسي تبقى شبه بالملل. المهم design شبيه، design زي بقية الموقع عادي. فاهمني؟ هنا بقى في content version 2 دي ولا هتعمل أي حاجة شبه الموقع خالص. هتخلي الموقع كله كأنه في وادي والصفحة الجديدة دي في وادي تاني خالص. بمعنى: تصميم جديد، طريقة جديدة، structure جديد، ما فيش أي مكتبات مستخدمة حرفياً. أنت هتعمل pure CSS وكأن الصفحة دي كأنها صفحة من مشروع تاني بتربط على مشروعنا بالنظام تاني خالص. مش هتستورد أي حاجة من global CSS ولا هتستورد أي حاجة من النظام القديم. ولا هتستورد animation. أنا مش عايز فيها animation. عايز صفحة ثابتة، responsive، responsive جميل جداً على التليفون، design جديد كويس، ولكن متماشي مع ألوان بقية الموقع وكده، والتيم بتاعه. form شغال وكده بس مش مهم عندي دلوقتي أي حاجة تشتغل غير التجربة. أنا بس عايز أجربه. يعني أول مرحلة إنك تصمملي الصفحة بس. فكك من form والconnect والكلام ده كله. ما تعملناش connect. سيب الصفحة القديمة كمرجع وبعد كده هنبدأ نعمل connect في الخطوة التانية خطوة بخطوة. هنبدأ نربط الform زي الصفحة القديمة، وهنبدأ نربط خدمة الرسائل والكلام ده بس كل ده تدريجي. أنا محتاجك دلوقتي تصمملي الصفحة الجديدة فقط. تعمل contact version 2 وتصممها. بالطريقة الجديدة اللي أنا قلتلك عليها. أعزلهالي عن الموقع خالص. بطريقة CSS جديدة، ما فيش ولا مكتبة، ما فيش أي استيراد من أي حاجة قديمة، صفحة جديدة كلياً، مالهاش أي علاقة بأي حاجة في الموقع خالص. فاهمني؟ علشان بس تحل المشكلة دي جذرياً من الجذر, حرفياً. مش عايز أعداد كتابة، مش عايز أعداد design، مش عايز أعداد كده. أنت هتعمل صفحة جديدة بالنظام جديد أنت اللي مخترعه حالاً. CSS مخصوص بيها، الصفحة موجودة, pure CSS, pure Vanilla، ما فيش أي حاجة زيادة حرفياً من الصفحة القديمة. ولا كأن ليها علاقة بالصفحة القديمة خالص، بالموقع القديم خالص. تحس إن هي خارجة من الموقع أساساً. علشان بس نشيل المشكلة من جذورها.

**Assistant**

هعمل دلوقتي صفحة جديدة معزولة تمامًا باسم `contact version 2` وأربط لها زرار التواصل من الـ Navbar، من غير ما ألمس الصفحة القديمة أو أربط أي فورم حالياً.

لقيت مكان الزرار المطلوب في الـ Navbar، وهربطه على route مستقل بدل نظام `navigate("contact")` من غير ما ألمس صفحة التواصل القديمة نفسها.

هبدأ تنفيذ الصفحة الجديدة كصفحة مستقلة فعلاً داخل `app/`، وبعدها أغيّر زرار الـ CTA في الـ Header يروح لها مباشرة بدل صفحة التواصل الحالية.

أنا داخل الآن على التنفيذ نفسه: صفحة مستقلة بستايل محلي تمامًا وبدون أي اعتماد على مكوّنات الموقع الحالية، وبعدها تعديل زرار الـ Header فقط ليفتحها.

تم إنشاء الـ route الجديد والربط من زرار الـ Header؛ الآن أراجع الأخطاء الساكنة وأصلّح أي مشكلة في الـ CSS المحلي قبل التسليم.

كان فيه خطأ كتابة صغير في لون داخل CSS المحلي واتصلّح. هعمل الآن فحص نهائي وبناء للمشروع للتأكد إن route الجديد سليم.

**تم التنفيذ**
- عملت route جديد مستقل: [page.tsx](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/app/contact-version-2/page.tsx)
- عملتله CSS محلي ومعزول بالكامل: [page.module.css](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/app/contact-version-2/page.module.css)
- ربطت زرار `Request a Quotation / اطلب عرض سعر` في الـ Header بالصفحة الجديدة بدل `navigate("contact")`: [header.tsx](file:///e:/Mahmoud%20Nagy/snack-fruits-website/src/components/header.tsx)

**اللي اتعمل بالضبط**
- الصفحة الجديدة على المسار: `/contact-version-2`
- التصميم جديد بالكامل ومش مبني على `Tailwind` ولا على كومبوننتات صفحة التواصل القديمة
- مفيش `animation`
- مفيش ربط فورم ولا `API` ولا validation حالياً
- الصفحة فيها نموذج شكلي فقط لتجربة الـ UI على الموبايل
- الصفحة القديمة لسه موجودة كما هي كمرجع

**العزل**
- الصفحة الجديدة لا تستخدم `Header/Footer/SiteShell` القديمين جواها
- لا تستورد أي shared page components من النظام القديم
- التنسيق كله محلي داخل CSS Module خاص بها فقط
- استخدمت ألوان متماشية مع هوية الموقع، لكن ببناء بصري مختلف فعلاً

**التحقق**
- diagnostics نظيفة للملفات المعدلة
- `npm run build` نجح بدون أخطاء

**مهم**
- الزرار اللي اتربط هو زرار الـ CTA في الـ Navbar
- عنصر `Contact` نفسه داخل nav العادي ما غيرتوش، وسيبته كما هو

**الخطوة الجاية**
- لو مناسبك الشكل، أبدأ في المرحلة الثانية: ننقل منطق الفورم القديم تدريجيًا إلى صفحة `/contact-version-2` من غير ما نرجع لأي جزء من البنية القديمة إلا اللي تختاره أنت بالترتيب.

---

**User**

النافبار زر cntact لسه بيودي عل الراوت القديم

**Assistant**

هعدّل دلوقتي عنصر `Contact` نفسه داخل الـ Navbar بحيث يفتح `/contact-version-2` بدل المسار القديم، في الديسكتوب والموبايل.

---

**User**

زي الفل المشكلة اتحلت نهائيا كمل رجع فيها بقا النافبار الاصلية والفوتر واربط العربي والانجليزي الخاصين بيها ورجع التصميم الاصلي شوية بنفس طريقتك زي ما هي

**Assistant**

هكمل على نفس النسخة الجديدة، لكن هركّب عليها الـ Navbar والـ Footer الأصليين، وأربط محتواها بالعربي/الإنجليزي، وبعدها أقرّب شكلها بصريًا من صفحة التواصل الأصلية مع الحفاظ على البنية الجديدة المستقرة.

هغيّر التنفيذ بحيث الصفحة الجديدة تستخدم الـ Header والـ Footer الحقيقيين فعلاً، ومعاهم الترجمة الحية عربي/إنجليزي، وكمان هخلّي الـ nav جوّاها يشتغل صح ويرجع لباقي صفحات الموقع عند الضغط على العناصر الأخرى.

هعدل الـ navigation provider والـ Header كمان، علشان الـ Contact يبقى هو النسخة الجديدة فعلاً، سواء من داخل route الجديد أو من الموقع الأساسي.

الآن بأبني نسخة client لصفحة `contact-version-2` تستخدم الـ Header/Footer الأصليين فعلاً، ومحتواها مترجم من نفس نظام اللغة.

أنا بأعيد ضبط الـ CSS الآن ليبقى أقرب بصريًا لصفحة التواصل الأصلية، لكن ما زال على البنية الجديدة المستقرة.

---


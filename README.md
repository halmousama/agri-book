# 🌱 AgriBooks — الدليل الشامل للمهندس الفلاحي

**منصة تعليمية تفاعلية متعددة المكتبات باللغة العربية — تدمج علم الأحياء بهندسة الأنظمة الزراعية**

[![Live Demo](https://img.shields.io/badge/Live_Demo-🌐-22c55e?style=for-the-badge)](https://halmousama.github.io/agri-book/)
[![Built with React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Recharts](https://img.shields.io/badge/Recharts_3-22B5BF?logo=recharts&logoColor=white)](https://recharts.org)
[![License: Educational](https://img.shields.io/badge/License-Educational%20Open%20Source-brightgreen)](LICENSE)

> 🌐 **المنصة مباشرة:** [halmousama.github.io/agri-book](https://halmousama.github.io/agri-book/)

---

## 📚 المكتبات (3 مكتبات)

تضم المنصة 3 مكتبات تعليمية تفاعلية:

| المكتبة | الأيقونة | المسار | المحتوى |
|---------|----------|--------|---------|
| **الدليل الشامل للمهندس الفلاحي** | 🌿 | `/agri` | 5 أقسام — 55 فصلاً في العلوم الزراعية |
| **المزرعة الحية — نظام بيئي لا ينام** | 🍃 | `/farm` | 11 فصلاً — مزرعة ذكية ذاتية الاكتفاء في الصحراء |
| **دليل الريّاس وعلوم البحر** | ⛵ | `/sea` | 6 فصول — علوم البحر والصيد من الألف إلى الياء |

---

## 🌗 معرض الصور — Dark Mode vs Light Mode

| الوضع النهاري (Light) | الوضع الليلي (Dark) |
|----------------------|---------------------|
| ![مختبر النيتروجين — Light](public/screenshots/nitrogen-light.png) | ![مختبر النيتروجين — Dark](public/screenshots/nitrogen-dark.png) |
| ![مختبر التربة — Light](public/screenshots/soil-light.png) | ![مختبر التربة — Dark](public/screenshots/soil-dark.png) |
| ![مفاعل التركيب الضوئي — Light](public/screenshots/photosynthesis-light.png) | ![مفاعل التركيب الضوئي — Dark](public/screenshots/photosynthesis-dark.png) |

> جميع المحاكيات تتكيف تلقائياً مع السمة عبر CSS variables و `useTheme` hook — SVG, Recharts, والنصوص كلها متجاوبة مع Dark Mode.

---

## 📖 المكتبة الأولى: الدليل الشامل للمهندس الفلاحي (5 أقسام — 55 فصلاً)

### القسم 1: منطق الطبيعة — 12 فصلاً
بيولوجيا النبات: الخلية، الأسموزية، النتح، التمثيل الضوئي، العناصر N-P-K، التربة، pH، التقليم، الحصاد.

### القسم 2: العدة العلمية — 15 فصلاً
الكيمياء (الذرة، الأيونات، المحاليل)، الموائع (الضغط، الجريان)، الفيزياء (الضوء، الحرارة، الطاقة)، الرياضيات، الأحياء الدقيقة.

### القسم 3: هندسة الأنظمة — 12 فصلاً
هندسة المناخ، الإدارة المائية (ETc, Hydroponics)، الزراعة الدقيقة (Tensiometer, GDD)، اقتصاديات المهندس.

### القسم 4: هندسة الآلات والذكاء الاصطناعي — 8 فصول
NDVI والدرونز، الرؤية الحاسوبية، ميكانيكا التربة، الري المحوري، الروبوتات الزراعية، الزراعة العمودية، VRT Sprayer، المستشعرات الصوتية.

### القسم 5: الأنظمة المتكاملة وهندسة التصدير — 8 فصول
أكوابونيك، الزراعة التجديدية، هندسة التصدير (MRL & PHI)، القيمة المضافة، الزراعة الكهروضوئية، زراعة الكربون، البلوكشين، الزراعة الملحية.

---

## 🍃 المكتبة الثانية: المزرعة الحية (11 فصلاً)

مزرعة ذكية في قلب الصحراء — من حبة رمل إلى نظام بيئي يكتفي ذاتياً: تربة حية، طاقة شمسية، ماء معاد تدويره، وعقل رقمي يدير كل شيء.

| الفصل | المحتوى |
|-------|---------|
| 1 | كيف تعيش هذه المزرعة؟ |
| 2 | دليل الإمكان — هذه المزرعة قيد التشغيل بالفعل |
| 3 | من الموت إلى الحياة — رحلة تحويل الرمال إلى تربة |
| 4 | قلب المزرعة النابض — الشمس، الماء، والطاقة |
| 5 | سكان المزرعة — كل مخلوق بوظيفة |
| 6 | النظام النباتي — من السعف إلى الطحالب |
| 7 | باب السيمفونيات — حين تتحول النوتات إلى ألحان |
| 8 | النظام الصحي — حين تكون المزرعة طبيبة نفسها |
| 9 | العقل الرقمي — الأعصاب، الذاكرة، والدماغ |
| 10 | المائدة وحنفية المال — حصاد الرحلة |
| 11 | الدليل المرجعي الشامل (النص الأصلي) |

---

## ⛵ المكتبة الثالثة: دليل الريّاس وعلوم البحر (6 فصول)

دليلك المتكامل لفهم البحر وعلوم الصيد — من قراءة المد والجزر إلى ربط العقد البحرية.

| الفصل | المحتوى |
|-------|---------|
| 1 | قراءة البحر والتضاريس (Bathymetry) |
| 2 | علم التوقيت (Solunar & Tides) |
| 3 | الطقس ومزاج السمكة (Weather) |
| 4 | التجهيزات والتكتيك (Tactics & Gear) |
| 5 | الملاحق (Dictionary, Fish Guide, Knots) |
| 6 | الدليل المرجعي الشامل (النص الأصلي) |

---

## 🧪 المحاكيات التفاعلية

كل محاكي يتبع معمارية موحدة من 3 أقسام:

| القسم | التقنية | الوظيفة |
|-------|---------|---------|
| **المختبر البصري** | `SVG` + `Framer Motion` | رسوم متحركة تفاعلية تعبر عن الظاهرة |
| **لوحة التحكم** | أشرطة تمرير + أزرار | تعديل المتغيرات ورؤية التأثير فوراً |
| **لوحة التشخيص** | تنبيهات سياقية | تحليل المدخلات وإعطاء توصيات ذكية |

محاكيات بارزة:
- `PhotosynthesisSimulator` — قانون البرميل (Liebig's Law)
- `TurgorSimulator` — ضغط الامتلاء في الخلايا النباتية
- `VPDSimulator` — عجز الضغط البخاري
- `CenterPivotSim` — الري المحوري
- `SwarmWeederSim` — روبوتات إزالة الأعشاب
- `MycorrhizaeNetworkSim` — شبكة الميكورايزا الفطرية
- `AquaponicsCycleSim` — دورة الأكوابونيك المغلقة
- `ExportCustomsSim` — هندسة التصدير والجمارك

---

## 🌗 الميزات البارزة

- **الوضع الليلي/النهاري** — toggle ديناميكي مع persistence في localStorage
- **التقدم التلقائي** — حفظ آخر فصل تمت زيارته مع شريط تقدم
- **توجيه تلقائي** — `import.meta.glob` يكتشف الفصول تلقائياً
- **3 مكتبات** — AgriBooks + SmartFarm + SeaMaster في تطبيق واحد
- **حزمة واحدة** — `vite-plugin-singlefile` يحزم كل شيء في HTML واحد
- **دعم GitHub Pages** — `HashRouter` + `base: './'` للتشغيل الفوري دون إعدادات سيرفر
- **ضبط كامل للغة** — واجهة RTL كاملة باللغة العربية

---

## 🏗️ التقنيات المستخدمة

| التقنية | الغرض |
|---------|-------|
| **React 19** | مكتبة الواجهات |
| **TypeScript 5.9** | أمان الكتابة والأنواع |
| **Vite 7** | بناء وتطوير فائق السرعة |
| **Tailwind CSS v4** | التصميم والتنسيق مع دعم الوضع الليلي (`@custom-variant dark`) |
| **Framer Motion 12** | الرسوم المتحركة وانتقالات الصفحات |
| **Recharts 3** | الرسوم البيانية والمخططات |
| **React Router DOM v7** | التوجيه والتنقل بين الصفحات (**HashRouter**) |
| **vite-plugin-singlefile** | حزم كل شيء في ملف HTML واحد |
| **@tailwindcss/typography** | أنماط طباعية (Prose) للمحتوى الطويل |
| **react-markdown + remark-gfm** | عرض محتوى Markdown مع جداول |
| **Lucide React** | أيقونات مفتوحة المصدر |
| **clsx + tailwind-merge** | دمج فئات CSS بذكاء |

---

## 🚀 بدء التشغيل محلياً

```bash
# استنساخ المستودع
git clone https://github.com/<your-username>/agribooks.git
cd agribooks

# تثبيت الاعتماديات
pnpm install

# تشغيل خادم التطوير
pnpm dev

# بناء للإنتاج
pnpm build

# معاينة البناء المحلي
pnpm preview

# فحص الكود
pnpm lint
```

بعد التشغيل، افتح `http://localhost:5173` في متصفح حديث.

---

## 🌐 النشر على GitHub Pages

### الطريقة 1: GitHub Actions (موصى بها)

أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

### الطريقة 2: gh-pags package

```bash
# تثبيت gh-pages
pnpm add -D gh-pages

# أضف هذا السكريبت إلى package.json
# "deploy": "gh-pages -d dist"

# ابنِ وانشر
pnpm build
pnpm deploy
```

### ملاحظات مهمة للإعدادات

- ✅ **HashRouter** — مستخدم بالفعل في `src/main.tsx`، يضمن عمل التوجيه دون 404
- ✅ **`base: './'`** — مضبوط في `vite.config.ts` للمسارات النسبية
- ✅ **Build script** — `tsc -b && vite build` جاهز
- ℹ️ **ملفات public/** — سيتم نسخها تلقائياً إلى جذر الموقع (favicon, screenshots)

---

## 📁 هيكل المشروع

```
src/
├── App.tsx                        # نقطة الدخول مع التوجيه (HashRouter)
├── main.tsx                       # نقطة الدخول للتطبيق
├── index.css                      # أنماط Tailwind v4 + الوضع الليلي
│
├── books/                         # صفحات تعريف المكتبات (Intro pages)
│   ├── agri-book/                 #   تعريف المكتبة الأولى (AgriBooks)
│   ├── book-03-living-farm/       #   تعريف المكتبة الثانية (SmartFarm)
│   └── sea-book/                  #   تعريف المكتبة الثالثة (SeaMaster)
│
├── common/
│   ├── components/
│   │   ├── layout/
│   │   │   └── MasterLayout.tsx   # التصميم الموحد (سايدبار + نافبار + ThemeToggle)
│   │   └── ui/
│   │       ├── Button.tsx         # زر قابل لإعادة الاستخدام
│   │       ├── Alert.tsx          # تنبيهات (نجاح، خطر، تحذير، معلومات)
│   │       ├── Slider.tsx         # شريط تمرير (مع دعم RTL)
│   │       └── ThemeToggle.tsx    # زر تبديل الوضع الليلي/النهاري
│   ├── constants/books.ts         # تعريف المكتبات والكتب والفصول والمسارات
│   ├── contexts/
│   │   ├── ProgressContext.tsx     # حفظ تقدم المستخدم
│   │   └── ThemeContext.tsx        # إدارة الثيم مع localStorage
│   ├── simulators/                # 55+ محاكياً تفاعلياً
│   ├── types/
│   │   ├── book.ts
│   │   └── progress.ts
│   └── utils/cn.ts                # دمج الفئات (clsx + twMerge)
│
├── content/                       # محتوى Markdown للفصول
│   └── markdown-*                 #   ملفات .md للمحتوى الطويل
│
├── handbook/
│   ├── book-01-nature-logic/      # 12 فصلاً
│   ├── book-02-science-toolbox/   # 15 فصلاً
│   ├── book-03-systems-engineering/ # 12 فصلاً
│   ├── book-04-hardware-ai/       # 8 فصول
│   └── book-05-ecosystems-export/ # 8 فصول
│
└── routes/AppRouter.tsx           # توجيه تلقائي (import.meta.glob)
```

---

## 🧠 ملاحظات معمارية

- **3 مكتبات في تطبيق واحد** — كل مكتبة لها مسارها الخاص (`/agri`, `/farm`, `/sea`) مع مكتبة مشتركة من المكونات
- **التوجيه التلقائي**: `import.meta.glob` يكتشف ملفات الفصول تلقائياً — لا حاجة لتسجيل المسارات يدوياً
- **تسمية الملفات**: الفصول يجب أن تكون **PascalCase** (`Chapter01.tsx`) لتوافق glob
- **الـ HashRouter**: يُستخدم لضمان التوافق مع GitHub Pages (لا حاجة لـ 404.html)
- **الـ Single File Bundle**: `vite-plugin-singlefile` يحزم كل شيء في HTML واحد (مثالي للتوزيع عبر USB)
- **حفظ التقدم**: يُخزن في `localStorage` تحت المفتاح `agribooks_progress`
- **السمة**: `@custom-variant dark` مع localStorage — الوضع الافتراضي داكن
- **الألوان الديناميكية**: خريطة `COLOR_CLASSES` ثابتة (تجنباً لمشكلة JIT مع القوالب)
- **RTL**: المحتوى بالعربية مع `dir="rtl"`، مع حفاظ أشرطة التمرير على سلوك LTR
- **محتوى Markdown**: الفصول الطويلة تُكتب بصيغة Markdown وتُعرض عبر `react-markdown` مع `remark-gfm`

---

## 📄 الترخيص

مشروع تعليمي مفتوح المصدر — جميع الحقوق محفوظة لسلسلة المهندس الفلاحي.

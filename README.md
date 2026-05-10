# 🌱 AgriBooks — الدليل الشامل للمهندس الفلاحي

**منصة تعليمية تفاعلية باللغة العربية — تدمج علم الأحياء بهندسة الأنظمة الزراعية**

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Recharts](https://img.shields.io/badge/Recharts-3-22B5BF?logo=recharts&logoColor=white)](https://recharts.org)
[![License: Educational](https://img.shields.io/badge/License-Educational%20Open%20Source-brightgreen)](LICENSE)

---

## ✨ نظرة عامة

AgriBooks منصة تعليمية تفاعلية متكاملة باللغة العربية، تستهدف **المهندسين الفلاحيين** و**طلاب العلوم الزراعية** في الوطن العربي. تشرح العلوم الزراعية من الخلية إلى الحصاد، ومن الكيمياء إلى الاقتصاد، عبر **5 أقسام رئيسية** و**55 محاكياً تفاعلياً** بتقنيات الويب الحديثة.

> 📸 **لقطة الشاشة:**
> ![AgriBooks Homepage](public/home-screenshot.png)

---

## 📚 المحتوى العلمي (5 أقسام — 55 فصلاً)

| القسم | اللون | الفصول | المحتوى |
|-------|-------|--------|---------|
| **منطق الطبيعة** | 🟢 زمردي | 12 | بيولوجيا النبات: الخلية، الأسموزية، النتح، التمثيل الضوئي، العناصر N-P-K، التربة، pH، التقليم، الحصاد |
| **العدة العلمية** | 🔵 أزرق | 15 | الكيمياء (الذرة، الأيونات، المحاليل)، الموائع (الضغط، الجريان)، الفيزياء (الضوء، الحرارة، الطاقة)، الرياضيات، الأحياء الدقيقة |
| **هندسة الأنظمة** | 🟠 عنبري | 12 | هندسة المناخ، الإدارة المائية (ETc, Hydroponics)، الزراعة الدقيقة (Tensiometer, GDD)، اقتصاديات المهندس |
| **هندسة الآلات والذكاء الاصطناعي** | 🟣 بنفسجي | 8 | NDVI والدرونز، الرؤية الحاسوبية، ميكانيكا التربة، الري المحوري، الروبوتات الزراعية |
| **الأنظمة المتكاملة وهندسة التصدير** | 🩵 زيتي | 8 | أكوابونيك، الزراعة التجديدية، الميكورايزا، هندسة التصدير (MRL & PHI)، القيمة المضافة |

---

## 🧪 المحاكيات التفاعلية (55 محاكياً)

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
- **حزمة واحدة** — `vite-plugin-singlefile` يحزم كل شيء في HTML واحد
- **دعم GitHub Pages** — `HashRouter` + `base: './'` للتشغيل الفوري دون إعدادات سيرفر

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
| **Lucide React** | أيقونات مفتوحة المصدر |

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
├── App.tsx                        # الصفحة الرئيسية (Hero + بطاقات الأقسام)
├── main.tsx                       # نقطة الدخول (HashRouter + ThemeProvider)
├── index.css                      # أنماط Tailwind v4 + الوضع الليلي
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
│   ├── constants/books.ts         # تعريف الكتب والفصول والمسارات
│   ├── contexts/
│   │   ├── ProgressContext.tsx     # حفظ تقدم المستخدم
│   │   └── ThemeContext.tsx        # إدارة الثيم مع localStorage
│   ├── simulators/                # 55 محاكياً تفاعلياً
│   ├── types/
│   │   ├── book.ts
│   │   └── progress.ts
│   └── utils/cn.ts                # دمج الفئات (clsx + twMerge)
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

- **التوجيه التلقائي**: `import.meta.glob` يكتشف ملفات الفصول تلقائياً — لا حاجة لتسجيل المسارات يدوياً
- **تسمية الملفات**: الفصول يجب أن تكون **PascalCase** (`Chapter01.tsx`) لتوافق glob
- **الـ HashRouter**: يُستخدم لضمان التوافق مع GitHub Pages (لا حاجة لـ 404.html)
- **الـ Single File Bundle**: `vite-plugin-singlefile` يحزم كل شيء في HTML واحد (مثالي للتوزيع عبر USB)
- **حفظ التقدم**: يُخزن في `localStorage` تحت المفتاح `agribooks_progress`
- **السمة**: `@custom-variant dark` مع localStorage — الوضع الافتراضي داكن
- **الألوان الديناميكية**: خريطة `COLOR_CLASSES` ثابتة (تجنباً لمشكلة JIT مع القوالب)
- **RTL**: المحتوى بالعربية مع `dir="rtl"`، مع حفاظ أشرطة التمرير على سلوك LTR

---

## 📄 الترخيص

مشروع تعليمي مفتوح المصدر — جميع الحقوق محفوظة لسلسلة المهندس الفلاحي.

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Tractor, Map, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { VrtSprayerSim } from "../../../common/simulators/VrtSprayerSim";

export default function Chapter07() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-04-hardware-ai" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 7 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        📊 تقنية المعدلات المتغيرة (Variable Rate Technology — VRT)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> شجرة قوية تحتاج سماداً قليلاً، وشجرة ضعيفة تحتاج سماداً كثيراً.
          الفلاح العادي يعامل الجميع بالتساوي — نصف السماد يضيع هدراً. كيف نجعل كل شجرة تحصل على حاجتها بالضبط؟
        </div>

        <h2>مبدأ المعدلات المتغيرة — لا للرش الأعمى</h2>
        <p>
          تخيل أنك طبيب في مستشفى. مريضان يدخلان: أحدهما رياضي قوي والآخر مريض بالأنيميا.
          هل تعطيهما نفس الجرعة من الدواء؟ بالتأكيد لا! المريض الضعيف يحتاج جرعة أكبر.
        </p>
        <p>
          في الزراعة، الأمر مشابه. في أي حقل، توجد <strong>بقع قوية</strong> (تربة خصبة، نمو ممتاز)
          و<strong>بقع ضعيفة</strong> (تربة فقيرة، نمو متوقف). الرش التقليدي يعطي 100% 
          من السماد لكل بقعة — القوية تأخذ ما لا تحتاج (يذهب هدراً في التربة)، 
          والضعيفة لا تتعافى أبداً.
        </p>
        <p>
          <strong>تقنية VRT</strong> تحل هذا: الجرار مزود بكمبيوتر متصل بخريطة NDVI من الدرون.
          كلما مر فوق بقعة قوية، فتحة الرش تضيق (10-30% فقط). 
          وفوق البقعة الضعيفة، تفتح كاملة (100%). كل متر مربع يحصل على حاجته بالضبط.
        </p>

        <h2>المكونات الأساسية لنظام VRT</h2>
        <ul>
          <li>
            <strong>خريطة الوصفة (Prescription Map):</strong> خريطة رقمية ملونة للحقل 
            (أخضر = قوي، أحمر = ضعيف). تنتج من صور الدرون (NDVI) أو مستشعرات التربة.
          </li>
          <li>
            <strong>نظام تحديد المواقع (RTK GPS):</strong> دقة سنتيمترية (±2 سم) ليعرف الجرار 
            موقعه بالضبط في الحقل — أي شجرة أو بقعة يمر عليها.
          </li>
          <li>
            <strong>كمبيوتر الجرار (Rate Controller):</strong> يقرأ خريطة الوصفة + موقع GPS، 
            ويصدر أمراً للرشاش: "افتح 30%" أو "أغلق إلى 10%".
          </li>
          <li>
            <strong>صمامات التناسب (Proportional Valves):</strong> صمامات كهربائية تغير 
            معدل التدفق (L/min) بسرعة فائقة حسب أمر الكمبيوتر.
          </li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مثال حسابي:</strong> حقل زيتون مساحته 10 هكتارات (1000 شجرة).
          الرش التقليدي: 1000 شجرة × 10 لتر سماد = 10,000 لتر بتكلفة $5,000.
          VRT: الأقوياء 30% (300 شجرة × 3 لتر = 900 لتر)، الضعفاء 100% (200 شجرة × 10 لتر = 2,000 لتر)،
          المتوسطون 70% (500 شجرة × 7 لتر = 3,500 لتر). المجموع = 6,400 لتر ($3,200).
          <strong>التوفير: $1,800 (36%)!</strong>
        </div>

        <h2>أنواع VRT حسب المادة</h2>
        <ul>
          <li>
            <strong>VRT للتسميد (Fertilizer):</strong> الأكثر شيوعاً. يغير كمية السماد 
            (خاصة النيتروجين N) حسب احتياج كل منطقة. يوفر 20-40% من السماد.
          </li>
          <li>
            <strong>VRT للري (Irrigation):</strong> ري متغير حسب نوع التربة. التربة الرملية 
            (صرف سريع) تحتاج ري أكثر من التربة الطينية.
          </li>
          <li>
            <strong>VRT للمبيدات (Pesticide):</strong> رش المبيد فقط في البقع المصابة بالآفات 
            بدلاً من رش الحقل كله. يوفر مبيدات ويحمي الحشرات النافعة.
          </li>
          <li>
            <strong>VRT للبذار (Seeding):</strong> زرع بذور أكثر في الأراضي الخصبة 
            وبذور أقل في الأراضي الفقيرة لتحقيق كثافة نباتية مثالية.
          </li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Map className="text-lime-500" />
            المحاكي: تقنية VRT للرش الذكي
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            قارن بين الرش التقليدي الأعمى والرش الذكي VRT — وانظر كيف يوفر آلاف الدولارات:
          </p>
          <VrtSprayerSim />
        </div>

        <h2>عوائق التبني</h2>
        <ul>
          <li>
            <strong>التكلفة الأولية:</strong> نظام VRT كامل للجرار يكلف $10,000-$30,000. 
            لكن العائد على الاستثمار (ROI) خلال 1-3 مواسم.
          </li>
          <li>
            <strong>الخبرة الفنية:</strong> يحتاج المزارع لقراءة خرائط NDVI واستخدام برامج 
            إدارة الحقل. التدريب ضروري.
          </li>
          <li>
            <strong>دقة الخريطة:</strong> إذا كانت خريطة NDVI قديمة أو غير دقيقة، 
            سيرش الجرار في الأماكن الخاطئة. تحديث الخريطة موسمياً ضروري.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> VRT ليست مجرد "توفير سماد" — هي 
          <strong>هندسة دقيقة لتوزيع الموارد</strong>. كل شجرة تحصل على حاجتها بالضبط، 
          فيتحسن تجانس المحصول، ويقل التلوث الناتج عن فائض الأسمدة، 
          ويرتفع هامش الربح. الجرار الذكي يرى، يفكر، ثم يقرر — والنتيجة: حقل متجانس وأرباح أعلى.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-04-hardware-ai/chapter06">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: روبوتات السرب
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai/chapter08">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            التالي: المستشعرات الصوتية للآفات <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

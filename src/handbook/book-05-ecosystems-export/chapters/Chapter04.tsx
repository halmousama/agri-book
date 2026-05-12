import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { ValueAdditionRoiSim } from "../../../common/simulators/ValueAdditionRoiSim";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 4 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        💎 القيمة المضافة (Value Addition &amp; ROI) — من الخام إلى الذهب
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> تنتج 1000 طن من الزيتون الخام، تبيعه بثمن بخس.
          جارك ينتج نفس الكمية لكنه يصدر زيت زيتون بكر ممتاز بثمن 10 أضعاف. الفرق ليس في
          الزيتون — الفرق في القيمة المضافة.
        </div>

        <h2>ما هي القيمة المضافة؟</h2>
        <p>
          <strong>القيمة المضافة (Value Addition)</strong> هي التحولات التي تمر بها المادة الخام
          لتزداد قيمتها السوقية. كل مرحلة معالجة تضيف طبقة من القيمة — والتكلفة — وكلما ارتفعت
          في سلسلة القيمة، زاد هامش الربح.
        </p>
        <p>
          المثال الكلاسيكي: <strong>زيت الزيتون</strong>. حبة زيتون خام تباع بـ 0.5 دولار للكيلو،
          لكن زيت الزيتون البكر الممتاز (Extra Virgin) المعبأ في زجاجة زجاجية بشهادة عضوية
          يمكن أن يباع بـ 20-30 دولاراً للتر. الفرق 40-60 ضعفاً — وهذا هو <strong>هندسة القيمة</strong>.
        </p>

        <h2>سلسلة القيمة للزيتون خطوة بخطوة</h2>
        <ol>
          <li>
            <strong>الحصاد (Harvest):</strong> زيتون خام — 0.5 $/kg. لا قيمة مضافة بعد.
            المنافسة على السعر فقط.
          </li>
          <li>
            <strong>العصر البارد (Cold Press):</strong> زيت بكر — 8 $/لتر (5 كغم زيتون → 1 لتر زيت =
            تكلفة خام 2.5$). أضفنا قيمة بتحويل الصلب لسائل واستخلاص الزيت.
          </li>
          <li>
            <strong>التعبئة والتغليف (Packaging):</strong> زجاجة زجاجية + علامة تجارية + غطاء
            مانع للتسرب — 12 $/لتر. العبوة نفسها أصبحت جزءاً من القيمة.
          </li>
          <li>
            <strong>الشهادة والاعتماد (Certification):</strong> عضوي + PDO (تسمية المنشأ المحمي)
            + تحليل مخبري — 18 $/لتر. 3$ تكلفة شهادات، لكن السعر قفز 6$ إضافية!
          </li>
          <li>
            <strong>العلامة التجارية والتسويق (Branding):</strong> قصة المنتج، تصميم فاخر،
            وجود في الأسواق الراقية — 25-30 $/لتر. العلامة التجارية هي أعلى مراحل القيمة المضافة.
          </li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>حساب العائد على الاستثمار (ROI):</strong> إذا استثمرت 50,000$ في معصرة حديثة
          + خط تعبئة + شهادة عضوية، وكنت تنتج 10,000 لتر سنوياً، فارتفاع سعر البيع من 8$ (زيت
          خام) إلى 18$ (معبأ ومعتمد) يعني إيراداً إضافياً 100,000$ سنوياً — تسترد استثمارك في 6
          أشهر فقط!
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp className="text-teal-500" />
            المحاكي: القيمة المضافة وحساب العائد
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اختر المنتج، أضف مراحل المعالجة واحداً تلو الآخر، ولاحظ كيف يرتفع سعر البيع والهامش:
          </p>
          <ValueAdditionRoiSim />
        </div>

        <h2>مراحل سلسلة القيمة العامة لأي منتج زراعي</h2>
        <p>هذا النموذج ينطبق على أي منتج — تمر، عنب، لوز، ألبان:</p>
        <ul>
          <li>
            <strong>المواد الخام (Raw):</strong> أقل سعر، أعلى مخاطر التلف، لا تمييز.
          </li>
          <li>
            <strong>التجهيز الأولي (Primary Processing):</strong> غسل، فرز، تدريج، تجفيف.
            يضاعف السعر عادةً.
          </li>
          <li>
            <strong>التصنيع (Manufacturing):</strong> تحويل كيميائي أو فيزيائي (عصر، تخمير،
            طحن، تجميد). يضاعف السعر 3-5 مرات.
          </li>
          <li>
            <strong>التعبئة والتغليف (Packaging):</strong> منتج جاهز للرف. أول نقطة دخول
            للسوبرماركت. يضاعف السعر مرة أخرى.
          </li>
          <li>
            <strong>الشهادات والاعتماد (Certification):</strong> عضوي، تجارة عادلة، PDO،
            GlobalGAP. يضيف 20-50% للسعر.
          </li>
          <li>
            <strong>العلامة التجارية والتصدير (Brand &amp; Export):</strong> أعلى سعر،
            يتطلب استثماراً تسويقياً لكن هامش الربح الأكبر.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> القيمة المضافة ليست رفاهية — إنها استراتيجية البقاء.
          في سوق عالمي مزدحم بالسلع الرخيصة، الفائز ليس من ينتج أكثر، بل من يضيف قيمة أكثر
          لكل وحدة منتج. احسب ROI لكل مرحلة قبل أن تستثمر فيها، واصعد سلم القيمة خطوة بخطوة.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-05-ecosystems-export/chapter03">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: هندسة التصدير
          </Button>
        </Link>
        <Link to="/agri/book-05-ecosystems-export/chapter05">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: الزراعة الكهروضوئية <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

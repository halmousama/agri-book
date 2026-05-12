import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Shield, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { ExportCustomsSim } from "../../../common/simulators/ExportCustomsSim";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 3 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🛂 هندسة التصدير (MRL &amp; PHI) — جواز السفر العالمي
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> تزرع محصولاً ممتازاً، تحصده في الوقت الذي تراه مناسباً،
          تشحنه إلى أوروبا. تصل الحاوية إلى ميناء روتردام — وتُرفض. لماذا؟ لأن بقايا المبيد
          تجاوزت الحد المسموح به بأجزاء من المليون.
        </div>

        <h2>ما هو MRL؟ — الحد الأقصى لبقايا المبيدات</h2>
        <p>
          <strong>MRL (Maximum Residue Limit)</strong> هو الحد الأقصى المسموح به لبقايا مبيد معين
          على محصول معين، ويُقاس بوحدة <strong>mg/kg (ppm)</strong> — جزء من المليون.
          كل دولة (أو تكتل مثل الاتحاد الأوروبي) تضع MRL لكل زوج (مبيد + محصول).
        </p>
        <p>
          الفكرة بسيطة: لا يمكن أن يكون الرقم صفراً — فحتى المبيدات القانونية تترك أثراً. لكن
          هناك <strong>حداً آمناً</strong> فوقه تصبح الشحنة غير قانونية. أوروبا لديها أكثر
          المقاييس تشدداً في العالم، ويتم تحديثها باستمرار.
        </p>

        <h2>ما هو PHI؟ — فترة ما قبل الحصاد</h2>
        <p>
          <strong>PHI (Pre-Harvest Interval)</strong> هو عدد الأيام الذي يجب أن يمر بين آخر رشة
          مبيد وبين الحصاد. هذه الفترة تسمح للمبيد بالتحلل (بفعل الضوء، الميكروبات، الحرارة)
          إلى مواد غير ضارة.
        </p>
        <p>
          في الهندسة الزراعية، PHI هو <strong>مفتاح العبور الجمركي</strong>. إذا حصدت مبكراً جداً،
          مستوى المبيد سيكون أعلى من MRL وترفض الشحنة. إذا انتظرت المدة الكافية، تمر الشحنة
          وتُباع بسعر السوق الأوروبي.
        </p>

        <h2>رياضيات نصف العمر (Half-Life)</h2>
        <p>
          كل مبيد له <strong>نصف عمر (Half-Life)</strong> — الزمن اللازم ليتحلل نصف الكمية المتبقية.
          إذا كان نصف العمر 5 أيام، فهذا يعني:
        </p>
        <ul>
          <li>يوم 0 بعد الرش: 100% من المبيد موجود</li>
          <li>يوم 5: 50% تحلل — 50% متبقي</li>
          <li>يوم 10: 75% تحلل — 25% متبقي</li>
          <li>يوم 15: 87.5% تحلل — 12.5% متبقي</li>
        </ul>
        <p>
          المعادلة: <strong>الكمية المتبقية = الكمية الأولية × (0.5)^(أيام / نصف_العمر)</strong>.
          إذا كان MRL يسمح بـ 10 ppm فقط، والكمية الأولية 80 ppm، ونصف العمر 5 أيام،
          ستحتاج إلى 15 يوماً بالضبط لتصل تحت الحد المسموح.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>سيناريو واقعي:</strong> مزارع تونسي يرش مبيداً على فلفل. نصف عمر المبيد 7 أيام.
          MRL في أوروبا = 0.05 ppm. بعد 7 أيام من الرش — تركيز المبيد 50 ppm. يحتاج 10 أنصاف عمر
          (70 يوماً) ليصل تحت 0.05 ppm! إذا لم يحسب هذه المدة، ترفض شحنته وتخسر ثمن الحاوية
          بالكامل + غرامات التخلص من النفايات الخطرة.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Shield className="text-teal-500" />
            المحاكي: الجمارك ومحطة التصدير التفاعلية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اختر المبيد، اضبط نصف العمر، وحدد موعد الحصاد — وشاهد ما يحدث في الميناء الأوروبي:
          </p>
          <ExportCustomsSim />
        </div>

        <h2>لماذا ترفض أوروبا الشحنات؟ — الأسباب الخمسة</h2>
        <ol>
          <li>
            <strong>تجاوز MRL:</strong> المبيد نفسه قانوني لكن تركيزه زائد. السبب: عدم احترام PHI.
          </li>
          <li>
            <strong>مبيد غير مسموح به في أوروبا:</strong> بعض المبيدات مسموح بها في دول نامية
            لكنها محظورة في الاتحاد الأوروبي (مثل الكلوربيريفوس). صفر MRL = غير قابل للتفاوض.
          </li>
          <li>
            <strong>مبيدان معاً (Cocktail Effect):</strong> حتى لو كل مبيد ضمن الحدود، وجود
            عدة مبيدات معاً قد يرفع العلم الأحمر.
          </li>
          <li>
            <strong>وثائق غير مكتملة:</strong> سجل الرش، شهادة التحليل المخبري، شهادة المنشأ.
            أي نقص = رفض فوري.
          </li>
          <li>
            <strong>تلوث متصالب (Cross-Contamination):</strong> مبيد انتقل من حقل مجاور أثناء
            الرش بالرياح. أنت تدفع ثمن خطأ جارك.
          </li>
        </ol>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> التصدير ليس مجرد زراعة جيدة — إنه إدارة دقيقة
          للوقت والجرعات والتوثيق. PHI ليس خياراً، إنه شرط للدخول إلى الأسواق العالمية.
          استثمر في مختبر تحليل بقايا المبيدات قبل أن تستثمر في التبريد والشحن.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-05-ecosystems-export/chapter02">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: الزراعة التجديدية
          </Button>
        </Link>
        <Link to="/agri/book-05-ecosystems-export/chapter04">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: القيمة المضافة <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

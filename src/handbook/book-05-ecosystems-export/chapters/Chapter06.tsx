import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Scale, TreePine, DollarSign, Factory, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { CarbonCreditSim } from "../../../common/simulators/CarbonCreditSim";

export default function Chapter06() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 6 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🌳 زراعة الكربون (Carbon Farming & Credits)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> مصنع أوروبي يلوث الجو بـ CO₂. أنت في تونس تملك أرضاً 
          يمكنها امتصاص هذا CO₂. كيف تحوّل قدرة تربتك على تخزين الكربون إلى <strong>دولار</strong>؟
        </div>

        <h2>سوق الكربون — لماذا يدفع لك العالم لتزرع؟</h2>
        <p>
          في اتفاق باريس للمناخ، تعهدت الدول الصناعية بخفض انبعاثاتها من CO₂. لكن بعض الشركات 
          لا تستطيع خفض انبعاثاتها بسرعة (مثلاً شركة طيران أو مصنع أسمنت). الحل: تشتري 
          <strong>أرصدة كربون (Carbon Credits)</strong> من شخص آخر يخفض الانبعاثات نيابة عنها.
        </p>
        <p>
          هنا يأتي دور المزارع. التربة الزراعية، إذا أُحسن إدارتها، يمكنها تخزين كميات هائلة 
          من الكربون. النباتات تسحب CO₂ من الجو عبر التمثيل الضوئي وتحوله إلى كربون 
          في جذورها وأوراقها. عندما تموت الجذور، يبقى الكربون في التربة لعقود.
        </p>

        <h2>الممارسات التي تخزن الكربون</h2>
        <ul>
          <li>
            <strong>الزراعة بدون حراثة (No-Till Farming):</strong> الحراثة تكشف الكربون 
            المخزون في التربة للأكسجين، فيتحول لـ CO₂ ويتصاعد للجو. بدون حراثة، 
            يبقى الكربون محفوظاً في التربة وتزدهر الكائنات الدقيقة.
          </li>
          <li>
            <strong>محاصيل التغطية (Cover Crops):</strong> بين مواسم المحصول الرئيسي، 
            نزرع نباتات سريعة النمو (فجل، برسيم، شوفان). جذورها تضخ الكربون في التربة، 
            وعند حرثها (مرة واحدة بأدنى حد) تتحول لسماد عضوي.
          </li>
          <li>
            <strong>الرعي التناوبي (Rotational Grazing):</strong> تحريك الماشية بين المراعي 
            يسمح للعشب بالتعافي وتخزين الكربون في جذوره العميقة.
          </li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>الفرق بين "بالوعة" و"مصدر" كربون:</strong> التربة السليمة = بالوعة كربون 
          (تمتص CO₂). التربة المحروثة والمكشوفة = مصدر كربون (تطلق CO₂). 
          المزارع قادر على تحويل أرضه من مصدر تلوث إلى حل مناخي.
        </div>

        <h2>عملية بيع الرصيد الكربوني</h2>
        <ol>
          <li>
            <strong>التقييم الأساسي (Baseline):</strong> عالم تربة يقيس كمية الكربون 
            في تربتك حالياً. هذا هو خط الأساس.
          </li>
          <li>
            <strong>التحول للممارسات التجديدية:</strong> تبدأ الزراعة بدون حراثة ومحاصيل تغطية. 
            التربة تبدأ بتخزين الكربون.
          </li>
          <li>
            <strong>القياس والتوثيق:</strong> بعد 1-3 سنوات، يقاس الكربون مرة أخرى. 
            الفرق بين القياس الجديد وخط الأساس = كمية الكربون المخزنة.
          </li>
          <li>
            <strong>الإصدار والبيع:</strong> شركة مناخية تصدر "رصيد كربون" لكل طن كربون 
            خزّنته. يُباع الرصيد في السوق الطوعي (Voluntary Carbon Market) 
            بسعر $5-$50 للطن حسب الجودة.
          </li>
        </ol>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Scale className="text-emerald-500" />
            المحاكي: سوق أرصدة الكربون
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            جرب الممارسات الزراعية المختلفة وشاهد كيف تتراكم أرصدة الكربون — أو تضيع:
          </p>
          <CarbonCreditSim />
        </div>

        <h2>التحديات — ليس كل شيء أخضر</h2>
        <ul>
          <li>
            <strong>التكلفة:</strong> تحليل التربة يكلف $50-$200 لكل عينة. الحقول الكبيرة 
            تحتاج عشرات العينات. بعض المنظمات تدفع تكاليف التحليل.
          </li>
          <li>
            <strong>استمرارية التخزين:</strong> إذا حرثت الأرض بعد 5 سنوات من التخزين، 
            كل الكربون المختزن يعود للجو في أسابيع. الالتزام طويل الأمد ضروري.
          </li>
          <li>
            <strong>سوق طوعي غير منظم:</strong> أسعار الكربون متقلبة. بعض الشركات تشتري 
            أرصدة رخيصة (5 دولار) لكنها غير موثوقة. اختر شريكاً معتمداً.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> زراعة الكربون تحوّل المزارع من "مستهلك للموارد"
          إلى <strong>مزود لخدمة مناخية</strong>. التربة السليمة تخزن الكربون وتخصب نفسها 
          وتحتاج سماداً أقل — ثلاث فوائد في آن. الزراعة التجديدية ليست فقط "للبيئة"، 
          بل هي <strong>أفضل استثمار طويل الأمد في إنتاجية الأرض</strong>.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-05-ecosystems-export/chapter05">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: الزراعة الكهروضوئية
          </Button>
        </Link>
        <Link to="/book-05-ecosystems-export/chapter07">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: تكنولوجيا البلوكشين <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

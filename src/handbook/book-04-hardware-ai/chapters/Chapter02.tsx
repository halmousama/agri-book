import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ScanEye, AlertTriangle, Gauge } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { AiSortingSim } from "../../../common/simulators/AiSortingSim";

export default function Chapter02() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link to="/book-04-hardware-ai" className="hover:text-amber-600 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 2 من 4</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        🤖 الرؤية الحاسوبية وفرز المحصول (AI Sorting)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> مزرعة تنتج 10 أطنان من الطماطم يومياً. 
          كيف تفرز 10,000 حبة طماطم في الساعة لتفصل التالفة عن السليمة يدوياً؟ 
          الجواب: لا يمكن. تحتاج عيوناً لا تتعب.
        </div>

        <h2>لماذا لا يكفي العمال البشريون؟</h2>
        <p>
          في خطوط الفرز التقليدية، يجلس 10-20 عاملاً على جانبي سير متحرك ويفرزون الثمار يدوياً. 
          هذه الطريقة تعاني من:
        </p>
        <ul>
          <li><strong>الإرهاق البصري:</strong> بعد 3 ساعات، يخطئ العامل في تقدير 15-20% من الثمار.</li>
          <li><strong>التفاوت البشري:</strong> عامل يرى العيب، وعامل آخر يهمله — لا معيار موحد.</li>
          <li><strong>السرعة القصوى:</strong> العامل البشري لا يتجاوز 40-50 ثمرة في الدقيقة. الخط الآلي يصل إلى 300+.</li>
        </ul>

        <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-6">
          <strong>المعلومة التقنية:</strong> أنظمة الفرز البصري الحديثة تلتقط 60+ صورة لكل ثمرة 
          بينما تمر على السير بسرعة 3 م/ث. خلال 0.02 ثانية فقط، يحلل الذكاء الاصطناعي 
          كل زاوية من الثمرة ويقرر مصيرها.
        </div>

        <h2>كيف يعمل النظام؟</h2>
        <p>
          نظام الفرز البصري (Computer Vision Sorting) يتكون من 5 مراحل رئيسية:
        </p>
        <ol>
          <li>
            <strong>التغذية (Infeed):</strong> 
            يتم توزيع الثمار على سير متحرك بعرض 1-2 متر بحيث لا تتداخل الثمار فوق بعضها.
          </li>
          <li>
            <strong>الإضاءة (Illumination):</strong> 
            كبسولة مضاءة بمصابيح LED عالية التردد (RGB + NIR + UV) تضيء الثمرة من جميع الزوايا. 
            الإضاءة الموحدة ضرورية حتى لا تختفي العيوب في الظل.
          </li>
          <li>
            <strong>التصوير (Imaging):</strong> 
            4-8 كاميرات عالية السرعة (Line Scan أو Area Scan) تلتقط صوراً من الأعلى والأسفل والجوانب. 
            الكاميرات تلتقط 60-120 إطاراً في الثانية.
          </li>
          <li>
            <strong>المعالجة (Processing):</strong> 
            الذكاء الاصطناعي يحلل الصور في الوقت الحقيقي. يقيس:
            <ul>
              <li>اللون (Color): درجة النضج، الاصفرار غير الطبيعي، البقع.</li>
              <li>الحجم (Size): طول وعرض الثمرة — يرفض الصغير جداً أو الكبير جداً.</li>
              <li>الشكل (Shape): التشوهات، الاعوجاج، التفلطح.</li>
              <li>العيوب السطحية (Scratches/Bruises): الخدوش، الكدمات، علامات الحشرات.</li>
              <li>العيوب الداخلية (Internal): بالأشعة تحت الحمراء القريبة (NIR) يكشف التسوس الداخلي والتعفن.</li>
            </ul>
          </li>
          <li>
            <strong>الفرز (Sorting):</strong> 
            بناءً على نتيجة التحليل، يُرسل إشارة إلى <strong>صمام هوائي (Pneumatic Ejector)</strong> 
            ينفث هواءً مضغوطاً في microseconds لطرد الثمرة الرديئة إلى حاوية منفصلة.
          </li>
        </ol>

        <h2>مشكلة المقايضة: الصرامة مقابل الهدر</h2>
        <p>
          هنا يأتي التحدي الهندسي الحقيقي. نظام الفرز له إعداد واحد خطير: 
          <strong>حد الصرامة (Strictness Threshold)</strong>.
        </p>
        <ul>
          <li>
            <strong>صارم جداً (High Strictness):</strong> 
            يرفض أي ثمرة فيها أقل عيب. النتيجة: لا تمر ثمرة تالفة — ولكن 10-15% من الثمار السليمة 
            تُرفض ظلماً (False Positives). تهدر ثماراً جيدة تماماً.
          </li>
          <li>
            <strong>متساهل جداً (Low Strictness):</strong> 
            لا يرفض إلا الثمار الواضحة التلف. النتيجة: قليل من الهدر — ولكن ثماراً تالفة تتسرب للأسواق 
            وتضر بسمعة المزرعة (False Negatives).
          </li>
        </ul>

        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>مثال من الواقع:</strong> مزرعة تفاح في أمريكا ضبطت صرامة نظام الفرز على 85% (صارم). 
          رفض النظام 12% من المحصول. عند الفحص اليدوي، اتضح أن 8% فقط كان يجب رفضه حقاً. 
          الخسارة: 4% من المحصول (ما قيمته 120,000 دولار) ذهب هدراً بسبب الصرامة الزائدة.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ScanEye className="text-blue-500" />
            المحاكي: نظام الفرز البصري
          </h3>
          <p className="text-slate-600 mb-4">
            حرك مؤشر الصرامة لترى كيف تتغير نسبة الثمار المقبولة والمرفوضة، 
            وابحث عن النقطة المثالية التي توازن بين الجودة والهدر:
          </p>
          <AiSortingSim />
        </div>

        <h2>أنواع أنظمة الفرز البصري</h2>
        <ul>
          <li>
            <strong>فرز بالألوان (Color Sorters):</strong> 
            الأبسط والأرخص. يعتمد على كاميرات RGB فقط. يكفي لتمييز الطماطم الحمراء عن الخضراء، 
            أو التمر البني عن الذهبي.
          </li>
          <li>
            <strong>فرز متعدد الأطياف (Multispectral Sorters):</strong> 
            يستخدم NIR + UV بالإضافة إلى RGB. يكشف التسوس الداخلي في التفاح، 
            ومحتوى السكر في التمر، ومستوى الرطوبة في الحبوب.
          </li>
          <li>
            <strong>فرز بالأشعة السينية (X-ray Sorters):</strong> 
            للأغذية المعلبة والمجمدة. يكشف وجود شظايا زجاج أو معدن أو حصى داخل العبوة.
          </li>
          <li>
            <strong>فرز بالرنين المغناطيسي (MRI Sorters):</strong> 
            تقنية ناشئة للكشف عن العيوب الداخلية العميقة في الفواكه الكبيرة كالبطيخ والشمام.
          </li>
        </ul>

        <div className="bg-emerald-50 border-r-4 border-emerald-400 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> نظام الفرز البصري الجيد ليس الذي يرفض أكبر عدد من الثمار التالفة. 
          بل الذي يحقق <strong>أقصى ربح</strong> — بتقليل الهدر من جهة، وضمان الجودة من جهة أخرى. 
          المعايرة الدقيقة لحد الصرامة هي الفرق بين نظام مربح ونظام خاسر.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-04-hardware-ai/chapter01">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: العيون الفضائية
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai/chapter03">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: ميكانيكا التربة وانضغاطها <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

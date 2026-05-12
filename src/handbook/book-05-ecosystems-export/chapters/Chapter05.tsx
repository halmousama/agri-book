import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sun, Zap, Leaf, Thermometer, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { AgrivoltaicSim } from "../../../common/simulators/AgrivoltaicSim";

export default function Chapter05() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 5 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        ☀️ الزراعة الكهروضوئية (Agrivoltaics)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> كيف نجمع محصولاً وافياً وكهرباء نظيفة من نفس قطعة الأرض 
          في نفس الوقت، بحيث يستفيد كل منهما من الآخر؟
        </div>

        <h2>زواج الشمس مرتين</h2>
        <p>
          Agrivoltaics (AV) كلمة مركبة من Agriculture + Photovoltaics. الفكرة بسيطة وعميقة:
          <strong>الألواح الشمسية لا تظلل النبات فقط — بل تبرد هي نفسها بفعل النتح</strong>.
        </p>
        <p>
          عندما ترتفع حرارة اللوح الشمسي فوق 25°C، تنخفض كفاءته (كل درجة حرارة زيادة = -0.5% كفاءة).
          في الصيف، قد تصل حرارة اللوح لـ 70°C — كفاءته تنهار إلى النصف!
          لكن تحت اللوح، النباتات تطلق بخار الماء عبر الثغور (النتح)، مما يبرد الهواء حول اللوح.
          التبريد الطبيعي يرفع كفاءة اللوح بنسبة 5-15%.
        </p>

        <h2>المكسب المزدوج (Dual Revenue Stream)</h2>
        <p>
          المزارع لم يعد يعتمد على المحصول فقط:
        </p>
        <ul>
          <li>
            <strong>المحصول:</strong> الألواح تحمي النبات من شمس الظهيرة القاسية 
            (تقليل الإجهاد الحراري بنسبة 40%)، وتقلل التبخر بنسبة 30% — توفير كبير في مياه الري.
          </li>
          <li>
            <strong>الكهرباء:</strong> كل هكتار من الألواح الشمسية ينتج 0.5-1.5 ميجاواط/سنة. 
            يمكن بيعها للشبكة الوطنية (Net Metering) أو تشغيل مضخات الري والمستشعرات.
          </li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مثال من تونس:</strong> في ولاية قبلي، مزرعة زيتون + ألواح شمسية. 
          الزيتون تحت الألواح أعطى إنتاجية أعلى بنسبة 20% من الزيتون المكشوف 
          (بفضل التظليل في صيف قاسٍ 45°C). وكهرباء الألواح وفّرت 60% من فاتورة ضخ المياه الجوفية.
        </div>

        <h2>معايير التصميم الهندسي</h2>
        <ul>
          <li>
            <strong>كثافة الألواح:</strong> لا تظلل كل الأرض! النسبة المثلى: 30-50% من مساحة الأرض 
            مغطاة بالألواح. الباقي لضوء الشمس المباشر.
          </li>
          <li>
            <strong>ارتفاع الألواح:</strong> يجب أن تكون مرتفعة (2-4 أمتار) لتمر الآلات الزراعية 
            والجرارات تحتها. الألواح المنخفضة تعيق العمل.
          </li>
          <li>
            <strong>ميل الألواح:</strong> الزاوية المثلى تعتمد على خط العرض. في تونس (35°N): 
            ميل 25-35 درجة. الميل يسمح بمرور الضوء المنتشر (Diffuse Light) للنباتات تحتها.
          </li>
          <li>
            <strong>اختيار المحصول:</strong> المحاصيل المحبة للظل الجزئي مثالية: 
            الخس، السبانخ، الفاصوليا، الزيتون، العنب. تجنب المحاصيل التي تحتاج شمساً كاملة.
          </li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            المحاكي: نظام الزراعة الكهروضوئية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اضبط الحرارة وميل الألواح — وشاهد العلاقة التبادلية بين صحة النبات وإنتاج الكهرباء:
          </p>
          <AgrivoltaicSim />
        </div>

        <h2>نماذج الأعمال في Agrivoltaics</h2>
        <ol>
          <li>
            <strong>النموذج المالك المستأجر:</strong> المزارع يؤجر أرضه لشركة طاقة شمسية 
            (إيجار سنوي + حصة من الكهرباء). المزارع يستمر في الزراعة تحت الألواح.
          </li>
          <li>
            <strong>النموذج التعاوني:</strong> مجموعة مزارعين يستثمرون معاً في محطة شمسية 
            مشتركة على أسطح مباني المزرعة الجماعية.
          </li>
          <li>
            <strong>النموذج الفردي:</strong> المزارع يملك الألواح ويبيع الكهرباء للشبكة. 
            رأس مال أكبر لكن عائد أعلى.
          </li>
        </ol>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> الزراعة الكهروضوئية تحقق معادلة نادرة:
          <strong>رابح-رابح-رابح</strong>. المزارع يربح (محصول + كهرباء)، 
          البيئة تربح (طاقة نظيفة + تقليل تبخر الماء)، والمجتمع يربح (أمن غذائي + أمن طاقي).
          في عالم يتجه للطاقة المتجددة، المزارع الذكي سيبيع المحصول والظل معاً!
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-05-ecosystems-export/chapter04">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: القيمة المضافة وعائد الاستثمار
          </Button>
        </Link>
        <Link to="/agri/book-05-ecosystems-export/chapter06">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: زراعة الكربون <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Network, Sprout, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { MycorrhizaeNetworkSim } from "../../../common/simulators/MycorrhizaeNetworkSim";

export default function Chapter02() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 2 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🌱 الزراعة التجديدية وشبكة الفطريات (Mycorrhizae)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> لماذا تحتاج حقولنا إلى أسمدة فوسفاتية كل عام بينما الغابات
          لا تحتاج أي سماد؟ الجواب تحت أقدامنا — في شبكة فطرية ذكية.
        </div>

        <h2>الـ "وود وايد ويب" — الإنترنت القديم تحت الأرض</h2>
        <p>
          تحت كل غابة، مرج، أو حقل طبيعي توجد شبكة هائلة من خيوط فطرية دقيقة تسمى
          <strong>الميكورايزا (Mycorrhizae)</strong>. هذه الخيوط (الهيفاي — Hyphae) تربط جذور
          النباتات المختلفة ببعضها في شبكة واحدة — <strong>شبكة واسعة من الخيوط الفطرية</strong>.
        </p>
        <p>
          العالمة <strong>سوزان سيمارد (Suzanne Simard)</strong> اكتشفت أن هذه الشبكة تسمح للأشجار
          بالتواصل وتبادل المواد. أطلقت عليها اسم <strong>"Wood Wide Web"</strong>. الشجرة الأم
          تغذي شتلاتها عبر الشبكة، والأشجار المختلفة تساعد بعضها عند المرض.
        </p>
        <p>
          لكن كيف تعمل هذه التجارة تحت الأرض؟ إنها <strong>اقتصاد تكافلي</strong> قديم جداً:
        </p>

        <h2>صفقة عمرها 400 مليون سنة</h2>
        <ul>
          <li>
            <strong>النبات يقدم:</strong> سكريات (جلوكوز) نتجت عن التمثيل الضوئي — قد تصل إلى 30%
            من طاقة النبات تذهب للفطريات!
          </li>
          <li>
            <strong>الفطر يقدم:</strong> ماء من أعماق التربة، فوسفور (P) — العنصر الأكثر ندرة في
            التربة، نيتروجين، زنك، نحاس، ومقاومة للأمراض.
          </li>
        </ul>
        <p>
          الفطر يمتد لمسافات بعيدة جداً مقارنة بالجذور. جذر نبات الذرة قد يصل طوله إلى 1 متر،
          بينما شبكة الهيفاي المصاحبة له قد تمتد 100 متر! هذه الشبكة تصل إلى مسام التربة الدقيقة
          التي لا تستطيع الجذور الوصول إليها، وتذيب الفوسفور غير القابل للذوبان وتحوله لشكل يمتص.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>حقيقة صادمة:</strong> أكثر من 90% من النباتات البرية تعيش في علاقة تكافلية مع
          فطريات الميكورايزا. بدونها، لا توجد غابات مطيرة، لا سهول خصبة، لا محاصيل ناجحة في الطبيعة.
          الزراعة الحديثة بالحراثة والمبيدات دمرت هذه الشبكة في معظم الأراضي الزراعية.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Network className="text-teal-500" />
            المحاكي: شبكة الميكورايزا التفاعلية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            استكشف كيف تتبادل النباتات والفطريات الموارد تحت الأرض، ولاحظ تأثير الحراثة على الشبكة:
          </p>
          <MycorrhizaeNetworkSim />
        </div>

        <h2>الحراثة: عدو الشبكة الأول</h2>
        <p>
          <strong>الحراثة (Tillage)</strong> — قلب التربة بالمحراث — تمارس منذ آلاف السنين. لكنها
          كارثة على شبكة الميكورايزا:
        </p>
        <ul>
          <li>
            تمزق خيوط الفطر الممتدة بين النباتات — نفس تمزيق كابل الإنترنت!
          </li>
          <li>
            تعرض الفطريات لأشعة الشمس فوق البنفسجية فتموت.
          </li>
          <li>
            تدمر بنية التربة المسامية التي يحتاجها الفطر للانتشار.
          </li>
        </ul>
        <p>
          عندما تموت الشبكة، يفقد النبات قدرته على امتصاص الفوسفور والماء. الحل المؤقت: أسمدة
          فوسفاتية كيماوية. لكن المشكلة تعود كل موسم، والجرعة تتصاعد. هذه <strong>حلقة إدمان</strong>
          كيماوية: كلما حرثت أكثر، كلما احتجت سماداً أكثر.
        </p>

        <h2>حلول الهندسة التجديدية</h2>
        <ol>
          <li>
            <strong>الزراعة بدون حرث (No-Till):</strong> توقف عن قلب التربة تماماً. استخدم
            آلة بذارة (Seeder) تشق خطاً ضيقاً وتضع البذرة. الشبكة تبقى سليمة.
          </li>
          <li>
            <strong>محاصيل التغطية (Cover Crops):</strong> بين مواسم المحصول الأساسي، ازرع نباتات
            مثل البرسيم أو الشوفان. جذورها تغذي الفطريات طوال العام ولا تترك التربة عارية.
          </li>
          <li>
            <strong>السماد العضوي والكمبوست:</strong> يغذي الفطريات مباشرة ويعيد بناء التربة.
          </li>
        </ol>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> الشبكة الفطرية هي البنية التحتية الخفية للتربة الخصبة.
          قرارك بعدم الحراثة هو أهم استثمار في صحة تربتك على المدى الطويل. الفطر لا يحتاج منك
          شراءه — فقط لا تقتله.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-05-ecosystems-export/chapter01">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: أكوابونيك
          </Button>
        </Link>
        <Link to="/agri/book-05-ecosystems-export/chapter03">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: هندسة التصدير <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

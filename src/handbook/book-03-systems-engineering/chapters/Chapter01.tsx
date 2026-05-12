import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ThermometerSnowflake, Snowflake, Sun, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { ChillingHoursSim } from "../../../common/simulators/ChillingHoursSim";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 1 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🕰️ الساعة البيولوجية: ساعات البرودة (Chilling Hours)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> لماذا لا تزهر أشجار التفاح في المناطق الدافئة مثل تونس الجنوبية أو مصر؟ الشجرة لا تمرض، إنها فقط "لا تستيقظ من النوم".
        </div>

        <h2>السر: الشجرة تحتاج إلى شتاء حقيقي</h2>
        <p>
          في الخريف، عندما تقصر الأيام وتنخفض الحرارة، تدخل الشجرة في حالة تسمى "السكون" (Dormancy). 
          إنها تشبه دبة تدخل في سبات شتوي. ولكن — وهذا هو المهم — للخروج من هذا السبات، 
          تحتاج الشجرة إلى جرعة محددة من <strong>"البرودة"</strong> (ساعات تحت 7°C).
        </p>
        <p>
          تخيل أن الشجرة لديها <strong>ساعة بيولوجية</strong> تبدأ العد من أول يوم تنخفض فيه الحرارة. 
          هذه الساعة تحسب كل ساعة تمر والنبات تحت 7 درجات مئوية. عندما يصل العداد إلى رقم معين 
          (مثلاً 800 ساعة لأصناف التفاح الأوروبي)، تعرف الشجرة أن "الشتاء مر" وأن الربيع قادم، 
          فتُطلق هرمونات الإزهار.
        </p>
        <p>
          أما إذا لم تصل الساعة إلى العدد المطلوب (لأن الشتاء دافئ جداً)، تبقى الشجرة في حيرة:
          البراعم الزهرية لا تنفتح بشكل متجانس، الإزهار يكون ضعيفاً ومتأخراً، 
          وثمار قليلة ومشوهة. هذه الظاهرة تسمى <strong>"تأخر الإيفراع" (Delayed Foliation)</strong>.
        </p>

        <h2>التطبيق الهندسي: اختيار الصنف المناسب</h2>
        <p>
          كمسؤول عن مزرعة، معرفتك بساعات البرودة في منطقتك ستحدد أي الأصناف تنجح وأيها تفشل:
        </p>
        <ul>
          <li><strong>أصناف عالية البرودة (High Chill ≥ 800 ساعة):</strong> تفاح Gala، خوخ أوروبي. تنجح في المناطق الجبلية الباردة.</li>
          <li><strong>أصناف متوسطة (400-800 ساعة):</strong> معظم أصناف الخوخ واللوز.</li>
          <li><strong>أصناف منخفضة البرودة (Low Chill &lt; 400 ساعة):</strong> تفاح Anna، خوخ Flordaprince. صُممت خصيصاً للمناطق الدافئة!</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>معلومة استثمارية:</strong> إذا اشتريت 1000 شجرة تفاح Gala (عالية البرودة) وزرعتها في منطقة ساحلية دافئة، 
          فقد خسرت ثمن الأشجار + ثمن الخدمة لسنوات قبل أن تكتشف أن المشكلة ليست في التسميد أو الري، بل في الساعة البيولوجية.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <ThermometerSnowflake className="text-blue-400" />
            المحاكي: ساعة البرودة التفاعلية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            حرك المؤشر أو انتظر لترى كيف تتراكم ساعات البرودة في الشتاء، 
            وماذا يحدث في الربيع إذا لم تصل للحد المطلوب:
          </p>
          <ChillingHoursSim />
        </div>

        <h2>كيف تقيس ساعات البرودة في مزرعتك؟</h2>
        <p>
          لا تحتاج لمختبر. كل ما تحتاجه هو:
        </p>
        <ol>
          <li><strong>حساس حرارة (Temperature Logger)</strong> — ضعه في وسط المزرعة على ارتفاع 1.5 متر.</li>
          <li><strong>برنامج تسجيل</strong> — يسجل الحرارة كل ساعة.</li>
          <li><strong>معادلة:</strong> اجمع كل الساعات التي كانت الحرارة فيها بين 0°C و 7°C.</li>
        </ol>
        <p>
          في دول الخليج وشمال أفريقيا، نادراً ما تتجاوز ساعات البرودة 200-400 ساعة سنوياً. 
          لذلك يجب أن تختار أصناف Low Chill حصراً. شركات التقنية الحيوية الآن تطور أصنافاً 
          لا تحتاج أي ساعات برودة على الإطلاق (Zero Chill)!
        </p>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> ساعات البرودة هي "مفتاح الكهرباء" للموسم. 
          لا تهمل معرفة متطلبات الصنف قبل أن تشتري آلاف الشتلات. استشر محطات الأرصاد الجوية المحلية، 
          أو استخدم حساسات رخيصة في أرضك.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-03-systems-engineering">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/agri/book-03-systems-engineering/chapter02">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: عجز الضغط البخاري <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

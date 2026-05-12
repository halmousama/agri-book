import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Droplets, AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { CenterPivotSim } from "../../../common/simulators/CenterPivotSim";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-04-hardware-ai" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 4 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        💧 الري الآلي المحوري (Center Pivot)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> كيف تروي 100 هكتار من القمح في الصحراء حيث لا ماء سطحي ولا عمال؟ 
          الحل: ذراع فولاذية بطول 500 متر تدور حول نقطة ثابتة كعقرب الساعة.
        </div>

        <h2>ما هو نظام الري المحوري؟</h2>
        <p>
          نظام الري المحوري (Center Pivot Irrigation) هو أحد أعظم ابتكارات الهندسة الزراعية في القرن العشرين. 
          اخترعه المزارع فرانك زيباخ في كولورادو عام 1948، وأحدث ثورة في زراعة المناطق الجافة.
        </p>
        <p>
          النظام عبارة عن أنبوب فولاذي طويل (يمتد من 50 إلى 800 متر) مرتفع على عجلات، 
          يثبت أحد طرفيه في نقطة ثابتة (Center Pivot) ويدور حولها في دائرة. 
          الرشاشات المثبتة على طول الأنبوب تروي المحصول أثناء الدوران.
        </p>

        <h2>المبدأ الهندسي: السرعة التفاضلية</h2>
        <p>
          هنا يأتي الجزء الأذكى في التصميم. تخيل عقرب ساعة طوله 500 متر:
        </p>
        <ul>
          <li>
            <strong>النقطة المركزية:</strong> تتحرك بسرعة 0 م/ث — ثابتة بالكامل.
          </li>
          <li>
            <strong>الطرف الخارجي:</strong> يجب أن يقطع محيط دائرة كاملة. محيط الدائرة = 2πr = 2 × 3.14 × 500 = 3,140 متر.
            إذا استغرق الدوران الكامل 24 ساعة، فإن الطرف الخارجي يتحرك بسرعة 130 متر/ساعة ≈ 2 متر/دقيقة.
          </li>
        </ul>
        <p>
          هذا يخلق مشكلة: إذا رشت كل الرشاشات بنفس المعدل، فالنقطة القريبة من المركز ستروي مساحة صغيرة، 
          والنقطة البعيدة ستروي مساحة أكبر بكثير — لكنها تتحرك أسرع. كيف تحقق التوازن؟
        </p>

        <h2>سر الرشاشات: تدرج الفتحات</h2>
        <p>
          الحل عبقري في بساطته: <strong>الرشاشات القريبة من المركز تكون أصغر (فتحة ضيقة)</strong>، 
          و<strong>الرشاشات البعيدة تكون أكبر (فتحة أوسع)</strong>.
        </p>
        <p>
          لماذا؟ لأن الرشاش البعيد يغطي مساحة حلقية أكبر. 
          المساحة التي يرويها مقطع من الأنبوب في كل دورة = (2π × r × عرض المقطع). 
          كلما ابتعدنا عن المركز، كلما زادت المساحة المطلوب ريّها في نفس الوقت، 
          وبالتالي نحتاج كمية ماء أكبر — أي فتحة رشاش أوسع.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-6">
          <p className="font-mono text-center">
            مساحة الحلقة = π × (R² − r²) <br />
            كلما ابتعدت عن المركز، زادت مساحة الحلقة وارتفعت الحاجة للماء
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مثال هندسي:</strong> رشاش على بعد 50 متراً من المركز يحتاج فتحة 4 مم، 
          بينما رشاش على بعد 400 متر يحتاج فتحة 20 مم — أي 5 أضعاف كمية الماء. 
          إذا أهملت هذا التدرج، ستحصل على ري زائد في المركز وري ناقص في الأطراف.
        </div>

        <h2>معامل الانتظام (Uniformity Coefficient)</h2>
        <p>
          جودة نظام الري المحوري تقاس بـ <strong>معامل كريستيانسن للانتظام (CU — Christiansen Uniformity Coefficient)</strong>.
          هذا الرقم يخبرك بمدى انتظام توزيع الماء عبر الحقل كله:
        </p>
        <ul>
          <li><strong>CU &gt; 90%:</strong> ممتاز. توزيع الماء متساوٍ جداً — المحصول متجانس.</li>
          <li><strong>CU 80-90%:</strong> جيد. بعض التباين الطفيف مقبول.</li>
          <li><strong>CU &lt; 80%:</strong> ضعيف. مناطق تروى أكثر من اللازم وأخرى أقل — المحصول غير متجانس.</li>
        </ul>

        <h2>مكونات النظام</h2>
        <ul>
          <li>
            <strong>النقطة المركزية (Pivot Point):</strong> قاعدة خرسانية ثابتة تتصل بمصدر الماء (بئر أو خط أنابيب). 
            فيها صمام التحكم الرئيسي ومقياس الضغط والتدفق.
          </li>
          <li>
            <strong>الأبراج (Towers):</strong> هيكل مثلثي على عجلتين (أو 4) يحمل الأنبوب. 
            كل برج له محرك كهربائي يحرك العجلات. عدد الأبراج يحدد طول النظام.
          </li>
          <li>
            <strong>الأنبوب (Pipeline):</strong> أنبوب فولاذي بقطر 6-8 إنش يحمل الماء. 
            طوله يحدد مساحة الحقل المروي (نصف القطر).
          </li>
          <li>
            <strong>الرشاشات (Sprinklers / Nozzles):</strong> موزعة على طول الأنبوب بأحجام متدرجة. 
            أنواعها: ثابتة، دوارة، أو معلقة (Drop Hoses) للمحاصيل الطويلة.
          </li>
          <li>
            <strong>نظام التحكم (Control Panel):</strong> لوحة إلكترونية تتحكم في سرعة الدوران، 
            اتجاه الدوران، جدولة الري. الأنظمة الحديثة متصلة بالإنترنت وتدار من الجوال.
          </li>
        </ul>

        <h2>مميزات الري المحوري</h2>
        <ul>
          <li><strong>تغطية مساحات شاسعة:</strong> نظام واحد يروي من 20 إلى 400 هكتار.</li>
          <li><strong>توفير العمالة:</strong> شخص واحد يدير 10 أنظمة محورية من هاتفه.</li>
          <li><strong>انتظام عالي:</strong> مع CU جيد، كل نبتة تحصل على نفس كمية الماء.</li>
          <li><strong>التكيف مع التضاريس:</strong> يمكنه العمل في أراضٍ منحدرة حتى 10%.</li>
          <li><strong>إمكانية التسميد (Fertigation):</strong> حقن السماد في خط الري وتوزيعه مع الماء.</li>
        </ul>

        <h2>التحديات</h2>
        <ul>
          <li><strong>تكلفة أولية عالية:</strong> النظام الواحد يكلف 50,000 - 200,000 دولار حسب الطول.</li>
          <li><strong>تبخر ورياح:</strong> في الجو الحار، قد يتبخر 20-30% من الماء قبل أن يصل للأرض. 
            الحل: الرشاشات المعلقة المنخفضة (Low Pressure Drop Nozzles).</li>
          <li><strong>التربة الرطبة:</strong> العجلات الثقيلة قد تغوص وتعلق في التربة الموحلة.</li>
          <li><strong>إهدار الزوايا:</strong> النظام يروي دائرة — الزوايا المربعة تبقى جافة (إلا إذا أضفت رشاشات زاوية).</li>
        </ul>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <RotateCw className="text-blue-400" />
            المحاكي: نظام الري المحوري
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اضبط تدرج فتحات الرشاشات وشاهد كيف تتغير انتظامية توزيع الماء عبر الحقل:
          </p>
          <CenterPivotSim />
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> الري المحوري هو مثال رائع على كيف يحل التصميم الهندسي مشكلة 
          توزيع الماء على مساحات شاسعة. مفتاح النجاح هو <strong>تدرج الرشاشات</strong> 
          (من الصغير في المركز إلى الكبير في الأطراف) و<strong>معامل الانتظام</strong>. 
          نظام مصمم جيداً يعني محصولاً متجانساً، ماءً موفراً، وأرباحاً أعلى.
        </div>
        </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-04-hardware-ai/chapter03">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: ميكانيكا التربة وانضغاطها
          </Button>
        </Link>
        <Link to="/agri/book-04-hardware-ai/chapter05">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            التالي: المزارع العمودية <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

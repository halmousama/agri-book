import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Droplets, Sprout, Thermometer, AlertTriangle, BadgeCheck, BookOpen } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { BiosalineSim } from "../../../common/simulators/BiosalineSim";

export default function Chapter08() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 8 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🌾 الزراعة الملحية وتخضير الصحراء (Biosaline Agriculture)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> ماء البئر مالح، التربة سبخة، الصيف حارق. 
          يقولون أن الزراعة هنا مستحيلة. لكن ماذا لو كانت الطبيعة لديها نباتات تعشق الملح؟
        </div>

        <h2>الملح — العدو الصامت للزراعة</h2>
        <p>
          تملح التربة (Salinization) هو واحد من أكبر التحديات الزراعية في العالم العربي. 
          أسباب رئيسية: الري بمياه مالحة، سوء الصرف (ارتفاع منسوب الماء المالح)، 
          والتبخر الشديد الذي يترك الأملاح على سطح التربة.
        </p>
        <p>
          كلما زادت ملوحة التربة، زاد <strong>الضغط الأسموزي</strong> (Osmotic Pressure). 
          عندما يكون الضغط الأسموزي للتربة أعلى من ضغط جذور النبات، 
          <strong>الماء يخرج من الجذور إلى التربة</strong> بدلاً من أن يدخل — ظاهرة تسمى 
          <strong>البلزمة (Plasmolysis)</strong>. النتيجة: النبات يذبل ويموت، 
          حتى لو كانت التربة مبتلة!
        </p>

        <h2>النباتات المحبة للملح (Halophytes)</h2>
        <p>
          الطبيعة لديها حل مدهش: بعض النباتات تطورت لتعيش في التربة المالحة. هذه 
          <strong>النباتات الملحية (Halophytes)</strong> تملك آليات خاصة:
        </p>
        <ul>
          <li>
            <strong>Salicornia (الساليكورنيا):</strong> نبات عصاري (Succulent) يمتص الملح 
            ويخزنه في فجوات (Vacuoles) في أوراقه. طعمه مالح — يستخدم كبديل للملح في الطهي 
            وكعلف للمواشي. يزرع بمياه البحر مباشرة!
          </li>
          <li>
            <strong>Quinoa (الكينوا):</strong> حبة خارقة — تتحمل ملوحة حتى EC 40 dS/m 
            (الطماطم تموت عند EC 5 dS/m). تخزن الملح في أوراقها القديمة ثم تسقطها.
          </li>
          <li>
            <strong>Atriplex (الراتا):</strong> شجيرة صحراوية — جذورها تمتص الملح 
            وتفرزه عبر غدد ملحية على سطح الأوراق (ترى بلورات ملح بيضاء على الأوراق).
          </li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مقارنة التحمل:</strong> الطماطم تموت عند EC &gt; 5 dS/m (موصلة كهربائية للماء).
          الكينوا تتحمل حتى EC 40 dS/m. Salicornia تتحمل حتى EC 70 dS/m (مياه البحر!)
        </div>

        <h2>تقنية الري بالغسيل (Leaching Fraction)</h2>
        <p>
          حتى النباتات المقاومة للملح لن تنجو إذا <strong>تراكم الملح</strong> في منطقة الجذور 
          بمرور الزمن. هنا يأتي دور <strong>معامل الغسيل (Leaching Fraction)</strong>:
        </p>
        <ul>
          <li>
            <strong>المبدأ:</strong> أضف 10-20% ماء زيادة عن حاجة النبات. هذا الماء الزائد 
            يتسرب إلى أسفل منطقة الجذور حاملاً معه الأملاح الذائبة (Salt Leaching).
          </li>
          <li>
            <strong>لماذا 15%؟</strong> لأنك تحتاج كمية كافية من الماء لتحريك الأملاح 
            إلى أسفل (أسفل منطقة الجذور). أقل من 10% لا يكفي لطرد الملح.
          </li>
          <li>
            <strong>الخطر:</strong> أكثر من 25% يهدر المياه (غالي الثمن) ويرفع منسوب 
            الماء الجوفي المالح. التوازن مطلوب.
          </li>
        </ul>

        <h2>تخضير الصحراء — دروس من الإمارات</h2>
        <p>
          دولة الإمارات العربية المتحدة استثمرت مليارات في أبحاث الزراعة الملحية. 
          في مدينة مصدر (Masdar City)، مزرعة تجريبية تنتج Salicornia وQuinoa باستخدام 
          مياه البحر مباشرة. النتائج:
        </p>
        <ul>
          <li>إنتاج 4 أطنان/هكتار من Salicornia (علف للمواشي).</li>
          <li>إنتاج 2 طن/هكتار من Quinoa (غذاء بشري عالي القيمة).</li>
          <li>الأملاح المترشحة تُجمع وتستخدم في صناعة الصابون ومستحضرات التجميل!</li>
        </ul>
        <p>
          هذا هو مفهوم "تخضير الصحراء": ليس جلب نباتات أجنبية، بل استخدام نباتات 
          محلية متأقلمة مع الملوحة، مع إدارة ذكية للمياه.
        </p>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Droplets className="text-orange-500" />
            المحاكي: الزراعة الملحية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اختر نباتاً حساساً (طماطم) أو مقاوماً (كينوا)، وقرر تفعيل ماء الغسيل — وشاهد كيف يتفاعل الملح:
          </p>
          <BiosalineSim />
        </div>

        <h2>الجدوى الاقتصادية للزراعة الملحية</h2>
        <ul>
          <li>
            <strong>الأراضي الرخيصة:</strong> الأراضي السبخة (Salt-Affected) تبني بربع سعر 
            الأراضي الخصبة. مدخل رخيص للاستثمار الزراعي.
          </li>
          <li>
            <strong>الكينوا — الغذاء الخارق:</strong> سعر الكينوا 3-5 أضعاف سعر القمح. 
            الطلب العالمي يتزايد (بروتين كامل، خالٍ من الجلوتين).
          </li>
          <li>
            <strong>علف الماشية:</strong> Salicornia تنتج كتلة حيوية كعلف رخيص 
            للأغنام والإبل في المناطق الجافة.
          </li>
          <li>
            <strong>المنتجات الثانوية:</strong> الأملاح النباتية تستخدم في مستحضرات التجميل 
            (مقشر طبيعي) وصناعة الصابون.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> التربة المالحة ليست "نهاية العالم" — هي 
          <strong>فرصة لمن يفهم</strong>. باستخدام نباتات Halophytes متأقلمة + إدارة 
          ذكية للملوحة (Leaching Fraction)، يمكن تحويل الصحاري المالحة إلى حقول منتجة. 
          ليس كل نبات يصلح لكل أرض — اختر النبات المناسب للملوحة المناسبة، 
          وأدر الملح بدلاً من محاربته.
        </div>
      </div>

      {/* End of Book 5 banner */}
      <div
        className="mt-16 bg-gradient-to-br from-teal-600 to-emerald-900 p-8 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #0d9488, #064e3b)" }}
      >
        <BadgeCheck className="mx-auto mb-4 w-16 h-16 text-yellow-300" />
        <h2 className="text-3xl font-bold mb-4 text-white">تهانينا! 🎉🏆</h2>
        <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
          لقد أتممت <strong>الدليل الشامل للمهندس الفلاحي</strong> بأكمله!
          5 أبواب و55 محاكياً تفاعلياً — من الخلية إلى الحصاد، ومن الكيمياء إلى 
          الاقتصاد، ومن الذكاء الاصطناعي إلى الزراعة الملحية. 
          أنت الآن مهندس فلاحي رقمي متكامل.
        </p>
        <p className="text-teal-200 mb-8">
          "إن الله يحب إذا عمل أحدكم عملاً أن يتقنه" — صلى الله عليه وسلم
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-white text-teal-800 hover:bg-teal-50 border-0 w-full md:w-auto">
              العودة للدليل الشامل
            </Button>
          </Link>
          <Link to="/agri/book-04-hardware-ai">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0 w-full md:w-auto">
              مراجعة الباب الرابع: هندسة الآلات والذكاء الاصطناعي
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-05-ecosystems-export/chapter07">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: تكنولوجيا البلوكشين
          </Button>
        </Link>
        <Link to="/">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            العودة للدليل الشامل <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

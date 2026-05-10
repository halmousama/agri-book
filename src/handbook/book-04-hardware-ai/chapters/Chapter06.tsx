import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Bot, Zap, Crosshair, Shield, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { SwarmWeederSim } from "../../../common/simulators/SwarmWeederSim";

export default function Chapter06() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-04-hardware-ai" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 6 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🤖 روبوتات السرب وإبادة الأعشاب (Swarm Robotics & Laser Weeding)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> الجرار الثقيل يضغط التربة ويدمر بنيتها. المبيدات تسمم 
          الغذاء والمياه الجوفية. كيف نزيل الأعشاب الضارة دون ضرر للتربة أو البيئة؟
        </div>

        <h2>من الجرار العملاق إلى سرب السلاحف</h2>
        <p>
          شاهدت فيلم "Transformer" حيث تحولت سيارة إلى روبوت عملاق؟ تخيل العكس: 
          بدلاً من آلة زراعية عملاقة تزن 10 أطنان وتدمر التربة، لدينا <strong>سرب من الروبوتات الصغيرة</strong>
          (بحجم السلحفاة) تتجول في الحقل كالنمل.
        </p>
        <p>
          كل روبوت يعمل بالطاقة الشمسية، مزود بكاميرا ذكية (Computer Vision) ونظام تحديد موقع (RTK GPS).
          يتجول الروبوت في الحقل، يصور كل نبات، ويسأل نفسه: <strong>"هل هذا محصول أم عشبة ضارة؟"</strong>
        </p>

        <h2>الفرق بين المحصول والعشبة</h2>
        <p>
          هنا يأتي دور الذكاء الاصطناعي. الروبوت مدرب على آلاف الصور ليعرف الفرق:
        </p>
        <ul>
          <li>
            <strong>القمح:</strong> أوراق رفيعة طويلة، لون أخضر موحد، تنمو في صفوف منتظمة.
          </li>
          <li>
            <strong>العشبة الضارة:</strong> أوراق عريضة، غالباً بنمط نمو غير منتظم، تنمو بين الصفوف.
          </li>
        </ul>
        <p>
          إذا كانت ثقة الذكاء الاصطناعي عالية (مثلاً 95%) أن هذا نبات ضار، يطلق الروبوت 
          <strong>شعاع ليزر</strong> دقيق يحرق الخلية المستهدفة في مهدها — دون مبيد، 
          دون ماء، دون ضرر للتربة.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مشكلة الثقة (Confidence Threshold):</strong> إذا جعلت عتبة الثقة منخفضة (50%)، 
          سيقتل الروبوت كل شيء يشبه العشبة — وقد يحرق محصولك بالخطأ (False Positive).
          إذا جعلتها عالية جداً (99%)، قد يترك بعض الأعشاب الخطيرة دون مساس (False Negative).
          السر هو إيجاد التوازن: 80-90% هو النطاق الذهبي.
        </div>

        <h2>كيف يعمل الليزر الزراعي؟</h2>
        <p>
          لا تقلق — هذا ليس ليزر Star Wars! إنه ليزر منخفض الطاقة لكنه مركز:
        </p>
        <ol>
          <li>
            <strong>الكاميرا (Camera):</strong> تلتقط صورة للنبات المستهدف.
          </li>
          <li>
            <strong>AI Vision:</strong> يحلل الصورة ويحدد <strong>نقطة النمو (Meristem)</strong> 
            للعشبة — وهي المنطقة التي إن دمرتها تموت العشبة كلها.
          </li>
          <li>
            <strong>Laser Emitter:</strong> يوجه شعاع ليزر (5-30 واط) إلى نقطة النمو 
            لمدة 0.1-0.5 ثانية. الحرارة تحلل البروتينات في الخلية وتميتها.
          </li>
          <li>
            <strong>التقييم:</strong> الكاميرا تلتقط صورة ثانية للتأكد من الموت.
          </li>
        </ol>
        <p>
          العملية كلها تستغرق أقل من ثانية واحدة. الروبوت ينتقل للنبات التالي.
          <strong>لا مبيدات، لا تربة مضغوطة، لا تلوث.</strong>
        </p>

        <h2>مميزات سرب الروبوتات</h2>
        <ul>
          <li><strong>خفيفة الوزن:</strong> كل روبوت يزن 3-5 كغ — لا ضغط على التربة.</li>
          <li><strong>طاقة شمسية:</strong> ألواح شمسية على ظهر الروبوت تشحنه أثناء العمل.</li>
          <li><strong>قابلة للتوسع:</strong> أرض كبيرة؟ أضف روبوتات أكثر. السرب يتعاون ويتواصل.</li>
          <li><strong>عمل 24/7:</strong> تعمل ليلاً ونهاراً — لا تحتاج راحة ولا إجازات.</li>
          <li><strong>صيانة رخيصة:</strong> عطل روبوت واحد لا يوقف العملية — باقي السرب يستمر.</li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Bot className="text-cyan-500" />
            المحاكي: سرب روبوتات إزالة الأعشاب
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            تحكم في دقة AI وشاهد كيف يتعامل السرب مع الأعشاب — وهل سيحرق محصولك بالخطأ؟
          </p>
          <SwarmWeederSim />
        </div>

        <h2>مقارنة مع الطرق التقليدية</h2>
        <table className="w-full border-collapse my-6">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="p-2 border text-right">العامل</th>
              <th className="p-2 border text-right">مبيدات كيميائية</th>
              <th className="p-2 border text-right">عزيق ميكانيكي</th>
              <th className="p-2 border text-right">ليزر ذكي</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border">تكلفة لكل هكتار</td><td className="p-2 border">$50-150</td><td className="p-2 border">$30-80</td><td className="p-2 border">$20-60</td></tr>
            <tr><td className="p-2 border">ضرر للتربة</td><td className="p-2 border">لا</td><td className="p-2 border">كبير</td><td className="p-2 border">صفر</td></tr>
            <tr><td className="p-2 border">تلوث بيئي</td><td className="p-2 border">مرتفع</td><td className="p-2 border">منخفض</td><td className="p-2 border">صفر</td></tr>
            <tr><td className="p-2 border">دقة</td><td className="p-2 border">عمياء (عشوائي)</td><td className="p-2 border">متوسطة</td><td className="p-2 border">عالية 90%+</td></tr>
          </tbody>
        </table>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> الروبوتات الصغيرة العاملة بالسرب هي مستقبل مكافحة الأعشاب.
          ليس لأنها "تقنية عصرية"، بل لأنها تحل مشكلتين في وقت واحد: 
          <strong>تدمير التربة بالجرارات الثقيلة + تسميم البيئة بالمبيدات</strong>.
          المفتاح هو دقة الذكاء الاصطناعي — كلما زادت دقة التعرف، قلّت الأخطاء 
          وزاد توفير المال والموارد.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-04-hardware-ai/chapter05">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: المزارع العمودية المغلقة
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai/chapter07">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            التالي: تقنية المعدلات المتغيرة <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

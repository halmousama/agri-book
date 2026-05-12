import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sprout, Lightbulb, Droplets, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { AeroponicLightSim } from "../../../common/simulators/AeroponicLightSim";

export default function Chapter05() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-04-hardware-ai" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 5 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🌿 المزارع العمودية المغلقة (Vertical Farming & Aeroponics)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> كيف نزرع طماطم وخساً في وسط مدينة مكتظة، بدون شمس ولا تراب،
          باستخدام 5% فقط من مياه الري التقليدية؟
        </div>

        <h2>ناطحات السحاب الزراعية</h2>
        <p>
          تخيل مبنى زجاجياً في وسط دبي أو الرياض، كل طابق فيه رفوف زراعية مكدسة. لا نوافذ تفتح 
          على الشمس — لأننا نصنع ضوءنا بأنفسنا. ولا تربة — لأن الجذور معلقة في الهواء.
          هذا هو مستقبل الزراعة الحضرية: <strong>المزرعة العمودية (Vertical Farm)</strong>.
        </p>
        <p>
          المبدأ بسيط: بدلاً من أن تزرع أفقياً (هكتار واحد من الأرض)، ترص النباتات عمودياً في أبراج.
          مع الإضاءة LED والزراعة الهوائية (Aeroponics)، يمكن لمبنى واحد مساحته 1,000 م²
          أن ينتج كمية تعادل 40 هكتاراً في الحقل المفتوح!
        </p>

        <h2>الزراعة الهوائية (Aeroponics) — ثورة بلا تربة</h2>
        <p>
          في الزراعة الهوائية، جذور النباتات <strong>معلقة في الهواء</strong> داخل أنبوب مظلم.
          كل بضع دقائق، مضخة ضغط عالٍ ترش الضباب المغذي (Mist) على الجذور لمدة ثوانٍ.
          ثم تتوقف، لتتنفس الجذور الأكسجين بحرية.
        </p>
        <p>
          هذا يخلق بيئة مثالية: الجذور تحصل على أكسجين لا محدود (عكس التربة المضغوطة)
          وماء غني بالمغذيات. النتيجة: نمو أسرع 3 مرات من الزراعة التقليدية، وتوفير 95% من الماء!
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>الخطر الهندسي:</strong> في الزراعة الهوائية، <strong>لا يوجد تراب يحمي الجذور</strong>.
          إذا توقفت المضخة عن رش الضباب لأكثر من 15 دقيقة — الجذور المكشوفة تجف وتموت فوراً.
          لهذا، كل نظام Aeroponics تجاري يحتاج مضخة احتياطية + بطارية + إنذار فوري.
        </div>

        <h2>وصفة الضوء (LED Recipe) — طبخ الطيف</h2>
        <p>
          الشمس تعطينا كل ألوان الطيف. لكن لوحة LED تسمح لنا باختيار <strong>الوصفة المثالية</strong>
          لكل نبات وفي كل مرحلة:
        </p>
        <ul>
          <li>
            <strong>الضوء الأحمر (Red — 660nm):</strong> مسؤول عن التمثيل الضوئي (Photosynthesis) 
            وتكوين الأزهار والثمار. كلما زاد الأحمر، زاد الإزهار.
          </li>
          <li>
            <strong>الضوء الأزرق (Blue — 450nm):</strong> يتحكم في فتح الثغور (Stomata) 
            ويمنع استطالة الساق. النباتات تحت ضوء أزرق قوي تكون قصيرة مضغوطة وقوية.
          </li>
          <li>
            <strong>Far-Red (730nm):</strong> هذا الطيف خارج مجال الرؤية البشرية. 
            إذا زاد Far-Red، يعتقد النبات أنه في ظل نبات آخر فيستطيل بحثاً عن الضوء 
            (Shade Avoidance Syndrome). قد يكون مفيداً في مرحلة الشتل لكنه ضار في مرحلة الإثمار.
          </li>
        </ul>
        <p>
          النسبة الذهبية (للمبتدئين): <strong>Red 70% + Blue 30%</strong>، Far-Red أقل من 20%.
        </p>

        <h2>التصميم الهندسي للمزرعة العمودية</h2>
        <ul>
          <li>
            <strong>الأرفف (Racking System):</strong> أبراج معدنية بارتفاع 3-6 أمتار، 
            كل رف له حوض ضيق للنباتات. الأرفف متحركة للوصول للصيانة.
          </li>
          <li>
            <strong>الإضاءة LED:</strong> ألواح LED كاملة الطيف (Full Spectrum) مثبتة في سقف كل رف. 
            تبعد 15-30 سم عن قمم النباتات. قابلة للتعديل في الشدة واللون.
          </li>
          <li>
            <strong>نظام الضباب (Mist System):</strong> مضخة ضغط عالٍ (40-80 PSI) ترش محلولاً 
            مغذياً عبر فوهات دقيقة (Nozzles) قطر الفتحة 0.1-0.5 مم. 
            مؤقت إلكتروني يتحكم في دورة الرش (مثلاً: 3 ثوانٍ رش كل 5 دقائق).
          </li>
          <li>
            <strong>نظام التحكم البيئي:</strong> مكيفات هواء تحافظ على 22-25°C ورطوبة 60-70%. 
            مستشعرات CO₂ تحقن غاز ثاني أكسيد الكربون لتعزيز التمثيل الضوئي.
          </li>
          <li>
            <strong>المحلول المغذي (Nutrient Solution):</strong> خزان ماء معقم 
            بمزيج دقيق من N-P-K والعناصر الصغرى. يتم تدويره وفلترته وتعقيمه بالأشعة UV.
          </li>
        </ul>

        <div className="bg-purple-50 dark:bg-purple-900/30 border-r-4 border-purple-400 dark:border-purple-500 p-4 my-6">
          <strong>مقارنة كفاءة المياه:</strong> الري بالتنقيط يستهلك 1 لتر لكل نبتة طماطم يومياً.
          الزراعة الهوائية تستهلك <strong>0.05 لتر</strong> فقط — لأن كل قطرة إما تمتصها الجذور 
          أو تتبخر. لا تصريف ولا فاقد. توفير 95%!
        </div>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" />
            المحاكي: المزرعة العمودية الهوائية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اضبط خلطة الإضاءة LED (Red/Blue/Far-Red) ومؤقت رش الضباب، وشاهد كيف تتفاعل الجذور والنبات:
          </p>
          <AeroponicLightSim />
        </div>

        <h2>التحديات الاقتصادية</h2>
        <ul>
          <li>
            <strong>استهلاك الكهرباء:</strong> الإضاءة LED تستهلك 200-400 واط/م². 
            فاتورة الكهرباء تمثل 30-40% من تكاليف التشغيل. الطاقة الشمسية قد تخفضها.
          </li>
          <li>
            <strong>التكلفة الأولية:</strong> بناء مزرعة عمودية يكلف 2,000-5,000 دولار/م². 
            لكن الإنتاجية أعلى بـ 10-20 مرة من الزراعة التقليدية.
          </li>
          <li>
            <strong>المنتجات المربحة:</strong> الخس، الريحان، الميكروغرين (Microgreens)، 
            الفراولة — محاصيل سريعة النمو وعالية القيمة. القمح والأرز غير مربحة في الزراعة العمودية حالياً.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> المزرعة العمودية الهوائية هي الحل لإنتاج الغذاء 
          في المدن والصحاري والأماكن التي لا توجد بها تربة صالحة. سر النجاح: 
          <strong>توازن الإضاءة (LED Recipe) + صيانة مضخة الضباب</strong>. 
          إذا ضمنت هذين العاملين، يمكنك زراعة أي شيء في أي مكان.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-04-hardware-ai/chapter04">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: الري الآلي المحوري
          </Button>
        </Link>
        <Link to="/agri/book-04-hardware-ai/chapter06">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            التالي: روبوتات السرب وإبادة الأعشاب <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

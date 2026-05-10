import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, SprayCan as Spray, Thermometer, Droplets, DollarSign } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { FoliarStomata } from "../../../common/simulators/FoliarStomata";

export default function Chapter06() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 6 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🍃 التسميد الورقي الإسعافي (Foliar Feeding): تجاوز التربة نهائياً
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> تربة مزرعتك قلوية (pH &gt; 7.5). أضفت حديداً للتربة — اختفى. أضعافاً — اختفى. الحل: لا تضع السماد في التربة أصلاً. ضعه على الورقة.
        </div>

        <h2>لماذا التسميد الورقي؟</h2>
        <p>
          التربة قد تحتوي على السماد، لكنه "محبوس" لأسباب كيميائية (pH مرتفع، تفاعلات، ارتباط مع كالسيوم). في هذه الحالة، حتى لو أضعفت الكمية، الجذر لا يستطيع امتصاصه.
        </p>
        <p>
          أوراق النبات ليست مجرد ألواح شمسية — إنها أيضاً <strong>أفواه وأمعاء</strong>. سطح الورقة مغطى بمسامات دقيقة تسمى <strong>الثغور (Stomata)</strong>. هذه المسامات يمكنها امتصاص العناصر الغذائية الذائبة في الماء مباشرة إلى داخل النبات.
        </p>
        <p>
          التسميد الورقي يحول الورقة من "مصنع طاقة" إلى "فم إضافي" يتجاوز مشاكل التربة تماماً.
        </p>

        <h2>متى نفتح الثغور؟ (شروط النجاح)</h2>
        <p>الثغور ليست مفتوحة دائماً. هي تفتح وتغلق مثل باب ذكي بناءً على ظروف الجو:</p>
        <ul>
          <li><strong>تفتح:</strong> عندما تكون الرطوبة عالية (&gt; 60%) والحرارة معتدلة (&lt; 30°C) — الصباح الباكر أو المساء.</li>
          <li><strong>تغلق:</strong> في الحر الشديد (&gt; 35°C) أو الجفاف (&lt; 40% RH) — الظهيرة.</li>
        </ul>
        <p>
          إذا رششت والثغور مغلقة، السماد يتناثر على الأوراق ويتبخر بفعل الشمس — لا يمتص النبات شيئاً، وقد تحترق الورقة بفعل تركيز الأملاح بعد تبخر الماء. أنت أهدرت المال والسماد.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>تطبيق عملي:</strong> أفضل وقت للتسميد الورقي في الصيف: ما بين الساعة 6:00 و 8:00 صباحاً (قبل أن تفتح الشمس بقوة). في الشتاء: يمكن الرش حتى الظهر لأن الحرارة منخفضة والرطوبة عالية.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Spray className="text-emerald-500" />
            المحاكي: المجهر الورقي والثغور
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            اضبط الحرارة والرطوبة ثم اضغط رش. شاهد بنفسك متى تمتص الورقة ومتى تتناثر القطرات هباءً:
          </p>
          <FoliarStomata />
        </div>

        <h2>أكثر العناصر كفاءة في التطبيق الورقي</h2>
        <p>بعض العناصر تمتص عبر الورقة بكفاءة أعلى بكثير من امتصاصها عبر الجذر:</p>
        <ul>
          <li><strong>الحديد (Fe):</strong> في التربة القلوية، الحديد يترسب. ورقياً، يمتص مباشرة ويخضر الورقة خلال 24 ساعة.</li>
          <li><strong>الزنك (Zn):</strong> للقضاء على تقزم الأوراق وتصغير السلاميات.</li>
          <li><strong>البورون (B):</strong> لعقد الثمار ومنع تشوهها.</li>
          <li><strong>الكالسيوم (Ca):</strong> لمنع عفن قلب الطماطم (Blossom End Rot).</li>
          <li><strong>الأحماض الأمينية:</strong> لدعم النبات تحت الإجهاد (بعد موجة حر أو صقيع).</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> التسميد الورقي ليس بديلاً عن التسميد الأرضي، بل هو مكمل إسعافي. استخدمه عندما تكون التربة مقفلة، أو عندما تحتاج لتأثير سريع (24-48 ساعة). لكن لا ترش في الظهيرة أبداً — ستحرق المحصول وتحرق المال معه.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-03-systems-engineering/chapter05">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: الزراعة المائية
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering/chapter07">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: المستشعرات الذكية <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

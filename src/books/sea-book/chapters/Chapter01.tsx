import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { BathymetrySim } from "../../../common/simulators/BathymetrySim";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/sea/book-sea" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 1 من 5</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        قراءة البحر والتضاريس
      </h1>

      <div className="prose-custom">
        <p>
          السؤال الأهم الذي يسأله كل صياد: <strong>"أين السمك؟"</strong>. الجواب ليس صدفة، بل علم.
          السمك يتبع <strong>الغذاء</strong>، والغذاء يتبع <strong>التضاريس</strong>. إذا فهمت قاع البحر، فهمت السمكة.
        </p>

        <h2>لماذا تتجمع الأسماك في أماكن محددة؟</h2>
        <p>
          السمك مثل أي كائن حي — يبحث عن ثلاثة أشياء: <strong>الأمان</strong> (مكان يختبئ فيه)،
          <strong>الغذاء</strong> (تيار يجلب له الأكل)، و<strong>الأوكسجين</strong> (ماء متحرك).
          التضاريس البحرية المختلفة توفر هذه الثلاثة بنسب متفاوتة.
        </p>

        <h3>أنواع التضاريس الرئيسية</h3>
        <ul>
          <li><strong>الشعاب المرجانية (Reefs):</strong> الغابة الاستوائية تحت الماء. أكثر منطقة غنية بالحياة. المرجان يوفر مئات الزوايا للاختباء، والتيار يجلب العوالق والغذاء.</li>
          <li><strong>الحواجز الرملية (Sandbars):</strong> خطوط الرمل المغمورة. السمك يقف خلف الحاجز منتظراً التيار ليجلب له الغذاء. الحاجز يبطئ التيار ويركز الطعام.</li>
          <li><strong>المنحدرات القارية (Drop-offs):</strong> الحدود بين المياه الضحلة والعميقة. السمك الكبير يتربص في العمق ويهاجم نحو الضحل. هذه النقاط ساخنة دائماً.</li>
          <li><strong>الحفر العميقة (Holes):</strong> ملاذ في قاع البحر. في حر الصيف أو برد الشتاء، الحفر تحافظ على درجة حرارة ثابتة وتجمع السمك.</li>
          <li><strong>قنوات المد (Channels):</strong> ممرات مائية بين الجزر أو بين الشاطئ والحاجز. السمك يستخدمها كطريق سريع للهجرة والتغذية.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مبدأ أساسي:</strong> كلما زاد تنوع التضاريس في منطقة واحدة، زادت كثافة الأسماك. 
          ابحث عن المناطق التي يتغير فيها العمق فجأة (Drop-off قريب من Reef)، هذه هي النقاط الساخنة (Hot Spots).
        </div>

        <h3>قراءة خرائط الأعماق (Bathymetry)</h3>
        <p>
          Bathymetry هي خريطة لقاع البحر. مثل الخريطة الطبوغرافية على البر، لكن للماء. الأدوات المجانية:
        </p>
        <ul>
          <li><strong>Google Earth:</strong> مجاني. شغّل طبقة "Ocean" لترى التضاريس تحت الماء. يمكنك حفظ الإحداثيات.</li>
          <li><strong>Navionics:</strong> تطبيق جوال متخصص. يعرض خرائط الأعماق بدقة عالية مع أسماء المواقع.</li>
          <li><strong>خريطة الصيد المحلية:</strong> اسأل الصيادين القدامى. خبرتهم على الورق لا تقدر بثمن.</li>
        </ul>

        <div className="my-12">
          <BathymetrySim />
        </div>

        <h3>التيارات وعلاقتها بالتضاريس</h3>
        <p>
          التيار يتفاعل مع التضاريس بثلاث طرق: <strong>الانكسار</strong> (التيار يصطدم بحاجز وينكسر، مكوناً دوامات ترفع الغذاء)،
          <strong>التسريع</strong> (التيار يضيق بين حاجزين فيسرع، حاملاً معه الأوكسجين)،
          <strong>الركود</strong> (خلف الحاجز، التيار يهدأ والغذاء يستقر).
        </p>
        <p>
          السمك يقف في <strong>الركود خلف الحاجز</strong> ويستغل <strong>الانكسار</strong> لالتقاط الطعام. هذا هو سبب وجود السمك دائماً "وراء الصخرة" أو "خلف الموجة".
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>نصيحة عملية:</strong> قبل كل رحلة صيد، افتح Google Earth وابحث عن نقطة التقاء تضاريس مختلفة (شعب + حفرة + منحدر). 
          احفظ الإحداثيات في هاتفك. هذه النقطة قد تكون كنزك القادم.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/sea/book-sea">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/sea/book-sea/chapter02">
          <Button className="flex items-center gap-2">
            التالي: علم التوقيت <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

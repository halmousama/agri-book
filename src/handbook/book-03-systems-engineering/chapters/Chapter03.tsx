import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Cpu, Thermometer, Wheat, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { RubiscoEngine } from "../../../common/simulators/RubiscoEngine";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 3 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🔥 التنفس الضوئي: الخطأ التطوري في C3 (ومحرك التوربو في C4)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> لماذا ينتج القمح (قمحنا) نصف ما تنتجه الذرة في الصيف الحار؟ 
          الجواب ليس في الماء أو السماد، بل في خطأ في تصميم "المحرك" على المستوى الجزيئي!
        </div>

        <h2>محرك Rubisco: أقوى إنزيم على وجه الأرض... لكنه أحمق</h2>
        <p>
          في الفصل الرابع من الكتاب الأول، تعلمنا أن التركيب الضوئي هو تحويل CO₂ + ماء + ضوء → سكر + أكسجين.
          الوسيط الذي يقوم بهذا التحويل هو إنزيم اسمه <strong>Rubisco</strong> (RuBisCO: Ribulose-1,5-bisphosphate carboxylase/oxygenase).
        </p>
        <p>
          Rubisco هو أكثر الإنزيمات وفرة على وجه الأرض. كل ورقة نباتية مليئة به. لكنه — على عظمة وظيفته — 
          يعاني من <strong>"خطأ تطوري"</strong>: في درجات الحرارة المرتفعة (فوق 35°C)، 
          يكون عاجزاً عن التمييز بين CO₂ و O₂. فيلتقط O₂ (الأكسجين) بدلاً من CO₂. 
          النتيجة ليست فقط أنه لم يصنع سكراً، بل أنه <strong>يحرق طاقة</strong> ثمينة في محاولة فاشلة. 
          هذه العملية تسمى <strong>"التنفس الضوئي" (Photorespiration)</strong>.
        </p>

        <div className="bg-red-50 dark:bg-red-900/30 border-r-4 border-red-400 dark:border-red-500 p-4 my-6">
          <strong>الخسارة الاقتصادية:</strong> تخيل مصنع تعبئة مياه، بدلاً من تعبئة المياه النقية، 
          يملأ العبوات بالرمل — ويدفع فاتورة الكهرباء ثمن ذلك! هذا ما يفعله التنفس الضوئي: 
          يحرق السكر (طاقة) بلا أي إنتاج.
        </div>

        <h2>نباتات C3: القمح، الأرز، الشعير، فول الصويا</h2>
        <p>
          معظم نباتات المناطق الباردة والمعتدلة من النوع C3. 
          تُسمى C3 لأن أول جزيء ينتج عن تثبيت CO₂ يحتوي على 3 ذرات كربون (3-Phosphoglycerate).
        </p>
        <p>
          في C3، Rubisco موجود في كل خلية من خلايا الورقة. عندما يكون الجو معتدلاً (20-30°C)، 
          يعمل بكفاءة. لكن عندما ترتفع الحرارة فوق 35°C،
          نسبة O₂ في الورقة ترتفع (بسبب زيادة التنفس والتبخر)، 
          ويبدأ Rubisco بالارتباك: CO₂ أم O₂؟
        </p>

        <h2>نباتات C4: الذرة، قصب السكر، الدخن</h2>
        <p>
          نباتات C4 طورت <strong>"محرك توربو"</strong>. تنقسم الورقة إلى منطقتين:
        </p>
        <ol>
          <li>
            <strong>خلايا الميزوفيل (Mesophyll):</strong> تحتوي على إنزيم آخر اسمه 
            <strong>PEP Carboxylase</strong> — وهو لا يلتقط O₂ أبداً! 
            يثبت CO₂ بقوة في جزيء مؤقت (4 كربون — ولهذا الاسم C4).
          </li>
          <li>
            <strong>خلايا غمد الحزمة (Bundle Sheath):</strong> هنا يعيش Rubisco بأمان، 
            محمياً من O₂. مضخة PEP تضخ إليه CO₂ بتركيز عالٍ جداً — 
            لدرجة أن Rubisco لا يرى O₂ أصلاً، حتى في الحر الشديد!
          </li>
        </ol>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-500" />
            المحاكي: محرك Rubisco التفاعلي
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            بدّل بين القمح (C3) والذرة (C4) وارفع الحرارة لترى كيف يتصرف كل محرك:
          </p>
          <RubiscoEngine />
        </div>

        <h2>تطبيق هندسي: ماذا يعني هذا لمزرعتك؟</h2>
        <p>
          كخبير تدير مزرعة في شمال أفريقيا أو الخليج (حيث صيف 40-50°C طبيعي):
        </p>
        <ul>
          <li>
            <strong>لا تزرع قمحاً في الصيف.</strong> القمح C3. في الصيف الحار، 
            سيدخل في تنفس ضوئي ويحرق 40-50% من طاقته. ازرعه شتاءً (ديسمبر-أبريل) 
            عندما الحرارة منخفضة.
          </li>
          <li>
            <strong>في الصيف، راهن على المحاصيل C4:</strong> الذرة، قصب السكر، 
            الذرة الرفيعة (Sorghum). هذه تتحمل الحرارة وتنتج بأقصى كفاءة.
          </li>
          <li>
            <strong>البحث والتطوير:</strong> مهندسو الوراثة يحاولون الآن "تعليم" Rubisco في القمح 
            (C3) كيف يصبح مثل C4. إذا نجحوا، سترتفع إنتاجية القمح بنسبة تصل إلى 50% في المناطق الحارة.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> فهم الفرق بين C3 و C4 يحدد اختيارك للمحصول حسب الموسم. 
          ازرع C3 في الشتاء البارد و C4 في الصيف الحار. 
          هذا وحده قد يضاعف أرباحك دون زيادة تكلفة ماء أو سماد واحدة.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-03-systems-engineering/chapter02">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: VPD
          </Button>
        </Link>
        <Link to="/agri/book-03-systems-engineering/chapter04">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: التبخر-نتح <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

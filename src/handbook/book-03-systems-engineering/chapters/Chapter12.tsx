import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Snowflake, Thermometer, Wind, Apple, AlertTriangle, BadgeCheck, BookOpen } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { ColdChainSim } from "../../../common/simulators/ColdChainSim";

export default function Chapter12() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 12 من 12 — الفصل الأخير 🎉</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🧊 هندسة ما بعد الحصاد (Post-Harvest): سلسلة التبريد وسر الإيثيلين
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> أنت منتج تفاح في تونس. تريد تصديره إلى أوروبا. الرحلة تستغرق 10 أيام. كيف تحافظ على التفاح طازجاً لمدة 6 أشهر بين الحصاد والبيع؟ الجواب: التحكم في التنفس والنضج.
        </div>

        <h2>التفاحة تتنفس!</h2>
        <p>
          نعم، الثمار لا تزال حية بعد الحصاد. تتنفس، تستهلك سكرها المخزّن، وتطلق غاز CO₂. هذا هو السبب الرئيسي لتلف الثمار بعد الحصاد — استنزاف مخزون الطاقة.
        </p>
        <p>
          هدف هندسة ما بعد الحصاد هو <strong>إبطاء معدل التنفس</strong> للثمار لأقصى درجة ممكنة دون قتلها. كيف؟
        </p>

        <h2>أسلحة المهندس الثلاثة:</h2>
        <ol>
          <li><strong>التبريد (Cooling):</strong> تخفيض الحرارة إلى 0-2°C يبطئ التنفس بنسبة 80-90%. كل 10°C زيادة تضاعف معدل التنفس!</li>
          <li><strong>التحكم بغاز الإيثيلين (Ethylene Management):</strong> الإيثيلين هو هرمون النضج. التفاح يفرز الإيثيلين، والإيثيلين يجعل التفاح ينضج أسرع — دائرة مفرغة. يجب امتصاص الإيثيلين من الجو باستخدام أجهزة (Ethylene Scrubbers) تعمل بالأوزون أو برمنغنات البوتاسيوم.</li>
          <li><strong>الرطوبة (Humidity):</strong> الحفاظ على رطوبة 90-95% يمنع فقدان الماء من الثمار (الوزن الجاف = خسارة مالية).</li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>معلومة مذهلة:</strong> التفاح يمكن تخزينه لمدة 10-12 شهراً في ظروف مثالية (1°C، إيثيلين صفر، رطوبة 90%). أي أنك تستطيع حصاد تفاح سبتمبر وبيعه في يوليو القادم بسعر مضاعف!
        </div>

        <h2>سلسلة التبريد الكاملة:</h2>
        <ol>
          <li><strong>التبريد المبدئي (Pre-cooling):</strong> خلال 4 ساعات من الحصاد، اخفض الحرارة من 35°C حقل إلى 4°C.</li>
          <li><strong>النقل المبرد (Refrigerated Transport):</strong> شاحنات مبردة.</li>
          <li><strong>المخازن المبردة (Cold Storage):</strong> غرف بدرجة حرارة 1°C مع تحكم في الإيثيلين.</li>
          <li><strong>التوزيع (Retail Display):</strong> ثلاجات العرض في المتجر.</li>
        </ol>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Snowflake className="text-blue-400" />
            المحاكي: غرفة التبريد التفاعلية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            تحكم في درجة الحرارة وماص الإيثيلين، ابدأ المحاكاة، وشاهد كيف يتدهور التفاح مع الوقت:
          </p>
          <ColdChainSim />
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية للكتاب الثالث بأكمله:</strong> من ساعات البرودة في الشتاء إلى غرفة التبريد بعد الحصاد — أنت الآن لا تزرع فقط، بل <strong>تدير نظاماً متكاملاً</strong>. المزرعة ليست مجرد أشجار وماء، هي منظومة: مناخ، حساسات، اقتصاد، حفظ. أنت مهندس أنظمة زراعية. أرضك هي المصنع، والمعرفة هي الوقود.
        </div>

        {/* نهاية الباب الثالث */}
        <div
          className="mt-16 bg-gradient-to-br from-amber-600 to-orange-800 p-8 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #d97706, #9a3412)" }}
        >
          <BadgeCheck className="mx-auto mb-4 w-16 h-16 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-4 text-white">إنجاز عظيم! 🎉</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-xl mx-auto">
            لقد أتممت "الباب الثالث: هندسة الأنظمة". أنت الآن لا تزرع فقط، بل <strong>تدير نظاماً متكاملاً</strong>.
            المزرعة ليست مجرد أشجار وماء، هي منظومة: مناخ، حساسات، اقتصاد، حفظ. أنت مهندس أنظمة زراعية.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="bg-white text-amber-800 hover:bg-amber-50 border-0 w-full md:w-auto">
                العودة للدليل الشامل
              </Button>
            </Link>
            <Link to="/book-04-hardware-ai">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0 w-full md:w-auto flex items-center gap-2 justify-center">
                <BookOpen size={18} />
                الباب الرابع: هندسة الآلات والذكاء الاصطناعي
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-03-systems-engineering/chapter11">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: نقطة التعادل
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            الباب الرابع: هندسة الآلات <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

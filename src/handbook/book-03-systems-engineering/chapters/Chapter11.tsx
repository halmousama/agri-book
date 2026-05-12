import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, PiggyBank, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { BreakEvenChart } from "../../../common/simulators/BreakEvenChart";

export default function Chapter11() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 11 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        💰 نقطة التعادل (Break-Even Point): متى تبدأ المزرعة بجني الأرباح؟
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> اشتريت أرضاً، حفرت بئراً، اشتريت مضخات، غرست 1000 شجرة زيتون، أنفقت 200,000 دولار. متى تسترد رأس مالك وتبدأ الربح الحقيقي؟ هذا ما تجيب عنه نقطة التعادل.
        </div>

        <h2>ما هي نقطة التعادل؟</h2>
        <p>
          نقطة التعادل (Break-Even Point — BEP) هي اللحظة التي تتساوى فيها الإيرادات مع التكاليف الكلية. قبلها: أنت تخسر (مستثمر). بعدها: أنت تربح (مهندس ناجح).
        </p>

        <h2>معادلة التعادل:</h2>
        <p>
          <code>BEP (بالوحدات) = التكاليف الثابتة / (سعر البيع للوحدة — التكلفة المتغيرة للوحدة)</code>
        </p>

        <h2>أنواع التكاليف التي يجب أن تفهمها:</h2>
        <ul>
          <li><strong>التكاليف الثابتة:</strong> إيجار الأرض، المضخات، نظام الري، السياج، رخص الحفر. تدفعها مرة واحدة أو سنوياً بغض النظر عن الإنتاج.</li>
          <li><strong>التكاليف المتغيرة:</strong> السماد، الماء، العمالة، المبيدات، الكهرباء. تزيد وتنقص حسب حجم الإنتاج.</li>
          <li><strong>الإيرادات:</strong> سعر البيع × عدد الوحدات المباعة.</li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <PiggyBank className="text-emerald-500" />
            المحاكي: حاسبة التعادل التفاعلية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            غيّر التكاليف الثابتة والمتغيرة وسعر البيع لترى كيف تتغير نقطة التعادل على الرسم البياني:
          </p>
          <BreakEvenChart />
        </div>

        <h2>تفسير النتائج للمستثمر الفلاحي:</h2>
        <ul>
          <li>كلما انخفضت نقطة التعادل، قلّت المخاطرة — تحتاج لبيع أقل لتغطية التكاليف.</li>
          <li>زيادة التكاليف الثابتة (مضخة كبيرة، أرض أغلى) ترفع نقطة التعادل — تحتاج إنتاجاً أكبر.</li>
          <li>زيادة الفرق بين سعر البيع والتكلفة المتغيرة (الهامش) تخفض نقطة التعادل.</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> لا تبدأ مشروعاً زراعياً دون حساب نقطة التعادل أولاً. إذا كانت نقطة التعادل أعلى من طاقتك الإنتاجية المتوقعة، فأنت تخطط لخسارة مالية. خطط ربحك قبل أن تزرع.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-03-systems-engineering/chapter10">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: معادلة الإنتاج
          </Button>
        </Link>
        <Link to="/agri/book-03-systems-engineering/chapter12">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: ما بعد الحصاد <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

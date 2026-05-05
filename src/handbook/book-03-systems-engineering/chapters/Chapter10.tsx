import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { YieldEstimator } from "../../../common/simulators/YieldEstimator";

export default function Chapter10() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 10 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        📈 معادلة الإنتاج (Rendement): تقدير الغلة قبل الحصاد
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> الفلاح يحصد الزيتون عندما يراه "ناضجاً" — لكن النضج له مراحل. الحصاد المبكر يعطي زيتاً بجودة فائقة لكن كمية قليلة. الحصاد المتأخر يعطي كمية كبيرة لكن جودة منخفضة. متى تحصد لتوازن بين الكمية والسعر؟
        </div>

        <p>
          <strong>Rendement</strong> (معدل الاستخراج) هو النسبة المئوية للزيت المستخرج من كيلو الزيتون. مثلاً: إذا كان rendement 15%، فمن 100 كغ زيتون تحصل على 15 كغ زيت.
        </p>

        <h2>مراحل نضج الزيتون:</h2>
        <ul>
          <li><strong>أخضر (Early):</strong> rendement 12%. الزيت غني بالبوليفينول (مواد مضادة للأكسدة)، حموضة منخفضة جداً — يباع كزيت بكر ممتاز بسعر مرتفع.</li>
          <li><strong>نصف ناضج (Mid):</strong> rendement 17%. التوازن الأكثر شيوعاً بين الكمية والجودة.</li>
          <li><strong>أسود ناضج (Late):</strong> rendement 22%. أعلى كمية زيت لكن حموضة أعلى وجودة أقل — مناسب للتصنيع.</li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-emerald-600" />
            المحاكي: حاسبة الغلة
          </h3>
          <p className="text-slate-600 mb-4">
            غير مرحلة النضج وشاهد كيف تتغير نسبة الزيت والعائد المالي:
          </p>
          <YieldEstimator />
        </div>

        <h2>تطبيق: معادلة تقدير الغلة التفصيلية</h2>
        <p>لحساب العائد المتوقع بدقة قبل الحصاد، استخدم هذه المعادلة:</p>
        <p><code>الغلة المتوقعة = عدد الأشجار × متوسط الحمل (كغ/شجرة) × Rendement (%) × سعر البيع</code></p>
        <p>
          ولتقدير متوسط الحمل: خذ عينة من 10 أشجار في الحقل، احسب عدد الثمار على كل شجرة، 
          اقسم على 10، ثم اضرب بمتوسط وزن الثمرة.
        </p>

        <div className="bg-emerald-50 border-r-4 border-emerald-400 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> التوقيت هو كل شيء. حدد هدفك: هل تبيع زيتاً بكراً ممتازاً (حصاد مبكر — rendement منخفض لكن سعر مرتفع) أم زيتاً للتصنيع (حصاد متأخر — rendement عالٍ لكن سعر منخفض)؟ لا تترك القرار للصدفة.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-03-systems-engineering/chapter09">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: ميزانية الكربون
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering/chapter11">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: نقطة التعادل <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

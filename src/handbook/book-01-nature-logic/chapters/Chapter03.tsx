import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Wind, Activity } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { TranspirationSimulator } from "../../../common/simulators/TranspirationSimulator";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation Top */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/agri/book-01-nature-logic" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 3 من 12</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            المضخة الطبيعية: كيف يشرب النبات بلا فم؟
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                في الهندسة البشرية، لرفع الماء للطوابق العليا، نضع مضخة قوية في الأسفل (دفع).
                أما في الهندسة الربانية للنبات، المضخة موجودة في الأعلى (سحب).
            </p>
            
            <div className="bg-sky-50 dark:bg-sky-900/30 p-6 rounded-2xl border-r-4 border-sky-500 my-8">
                <h3 className="text-sky-700 dark:text-sky-300 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Wind size={20} />
                    نظرية الشد (The Pull)
                </h3>
                <p className="mb-0 text-slate-700 dark:text-slate-300">
                    تخيل أن ساق الشجرة هو "ماصة" (Straw).
                    الشمس تقوم بتبخير الماء من الأوراق في الأعلى. خروج هذا الماء يخلق "فراغاً"، فيسحب قطرة الماء التي تليه، وتلك تسحب التي تليها.. في سلسلة متصلة تمتد حتى الجذور.
                </p>
            </div>

            <p>
                هذه العملية تسمى <strong>"النتح" (Transpiration)</strong>.
                وهي تعمل بالطاقة الشمسية 100% دون بذل أي طاقة من النبات. لكن هذه المضخة حساسة جداً لحالة الجو.
            </p>

            {/* المحاكي */}
            <div className="my-12">
                <TranspirationSimulator />
            </div>

            <h3>التفسير الهندسي: متى تتعطل المضخة؟</h3>
            <p>
                من خلال المحاكي، لاحظت حالتين تتوقف فيهما حركة الماء (والغذاء):
            </p>
            <ul>
                <li>
                    <strong>الرطوبة العالية (الجو المشبع):</strong> عندما تكون الرطوبة 100%، الهواء لا يستقبل أي بخار جديد. تتوقف عملية التبخر، وبالتالي يتوقف "الشفط".
                    <br/>
                    <span className="text-sm text-slate-500 dark:text-slate-400">⚠ هذا يسبب مشاكل في البيوت المحمية (مثل نقص الكالسيوم وتعفن الثمار).</span>
                </li>
                <li>
                    <strong>الحرارة الحارقة (الإغلاق الدفاعي):</strong> عندما تزيد الحرارة عن حد التحمل، يقرر النبات إغلاق بواباته (الثغور) ليحافظ على حياته، حتى لو كان ذلك يعني التوقف عن الأكل.
                </li>
            </ul>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm mt-8">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-green-600 dark:text-green-400">
                    <Activity size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">معلومة للمحترفين</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                        الماء في النبات ليس مجرد "شراب". هو <strong>سير ناقل (Conveyor Belt)</strong>.
                        السماد الذي تضعه في الأرض لا يملك أرجلاً ليصعد. هو يركب "تاكسي الماء".
                        فإذا توقف النتح (بسبب الرطوبة أو الحرارة)، توقف وصول الطعام، حتى لو كانت الأرض مليئة بالسماد!
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/agri/book-01-nature-logic/chapter02">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: سنة التوازن
                </Button>
            </Link>
            
            {/* الزر التالي */}
            <Link to="/agri/book-01-nature-logic/chapter04">
                <Button className="flex items-center gap-2">
                    التالي: مصنع الرزق (التركيب الضوئي) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
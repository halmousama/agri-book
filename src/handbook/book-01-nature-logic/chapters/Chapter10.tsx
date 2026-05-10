import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ShieldAlert, Microscope } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { ProtectionSimulator } from "../../../common/simulators/ProtectionSimulator";

export default function Chapter10() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 10 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            الدفاع الذاتي: من هو العدو؟ (فطر، بكتيريا، أم حشرة؟)
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                النبات لا يستطيع أن يقول "بطني تؤلمني". 
                هو يرسل إشارات صامتة على أوراقه. دورك كمهندس هو أن تكون "المحقق الجنائي" الذي يقرأ مسرح الجريمة.
            </p>
            
            <p>
                أكبر خطأ يقع فيه المزارعون هو <strong>"الخلط"</strong>. 
                يرش مبيداً حشرياً لمرض فطري، فلا يحدث شيء، فيظن أن المبيد مغشوش، بينما هو في الحقيقة يعالج المرض الخطأ.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-r-4 border-slate-400 dark:border-slate-500 my-8">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Microscope size={20} />
                    قاعدة العصابات الثلاث
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    أعداء النبات ينقسمون لثلاثة جيوش رئيسية، كل جيش يترك "بصمة" مختلفة تماماً، ويحتاج سلاحاً خاصاً:
                    <br/>
                    1. <strong>الفطريات:</strong> أثرها "جاف" (بودرة، غبار، حلقات).
                    <br/>
                    2. <strong>البكتيريا:</strong> أثرها "رطب" (عفن، لزوجة، رائحة).
                    <br/>
                    3. <strong>الحشرات:</strong> أثرها "فيزيائي" (أكل، ثقوب، حركة).
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <ProtectionSimulator />
            </div>

            <h3>كيف تحقق في الجريمة؟</h3>
            <p>
                عندما تدخل حقلك وترى ورقة مصابة، لا تسأل "ما اسم هذا المرض؟" (لأن الأسماء بالآلاف).
                بل اسأل: <strong>"إلى أي عائلة ينتمي؟"</strong>.
            </p>
            <ul>
                <li>
                    <strong>امسح بيدك:</strong> هل يوجد بودرة بيضاء تخرج في إصبعك؟ (هذا فطر البياض الدقيقي).
                </li>
                <li>
                    <strong>شم الورقة:</strong> هل توجد رائحة عفن كريهة والورقة مبللة وطرية؟ (هذه بكتيريا، احذر منها!).
                </li>
                <li>
                    <strong>ابحث عن الفاعل:</strong> هل الورقة مثقوبة كأن أحداً أكلها؟ (ابحث عن الدودة أو الخنفساء تحت الورقة).
                </li>
            </ul>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-red-50 dark:bg-red-900/30 shadow-sm mt-8">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-red-600 dark:text-red-400">
                    <ShieldAlert size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">تحذير هندسي</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                        لا تخلط المبيدات عشوائياً (كوكتيل).
                        المبيد الحشري لا يقتل الفطر، والمبيد الفطري لا يقتل الحشرة.
                        التشخيص الصحيح هو 90% من العلاج، ويوفر عليك المال والسموم.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/book-01-nature-logic/chapter09">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: بوابات الغذاء
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter11">
                <Button className="flex items-center gap-2">
                    التالي: هندسة الشكل (التقليم) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
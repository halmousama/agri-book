import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, GitMerge, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { FlowPipe } from "../../../common/simulators/FlowPipe";

export default function Chapter05() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/agri/book-02-science-toolbox" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 5 من 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            الأنابيب والجريان: سر الخرطوم المثقوب
        </h1>

        <div className="prose-custom">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                لماذا نستخدم أنابيب عريضة في بداية المزرعة، وأنابيب رفيعة عند الأشجار؟
                الجواب يكمن في علاقة الحب والكراهية بين "الضغط" و "السرعة".
            </p>

            <div className="bg-teal-50 dark:bg-teal-900/30 p-6 rounded-2xl border-r-4 border-teal-500 my-8">
                <h3 className="text-teal-800 dark:text-teal-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <GitMerge size={20} />
                    قاعدة السباك
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    عندما يضيق الأنبوب، يضطر الماء للركض بسرعة أكبر ليعبر (تزداد السرعة).
                    لكن هذه السرعة لها ثمن: <strong>الاحتكاك</strong>.
                    الاحتكاك يسرق طاقة الماء، فيصل لآخر الحقل "متعباً" (ضغط ضعيف).
                </p>
            </div>

            <div className="my-12">
                <FlowPipe />
            </div>

            <h3>خطأ شائع: تصغير الأنابيب لتوفير المال</h3>
            <p>
                بعض المزارعين يشترون أنابيب رفيعة (نصف بوصة) للمسافات الطويلة لأنها أرخص.
                النتيجة؟ الماء يحتك بجدران الأنبوب الضيق بشدة، ويفقد كل ضغطه في الطريق.
                تجد الرشاشات في أول الحقل تعمل بقوة، وفي آخره تنقط بضعف.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm mt-8">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-red-600 dark:text-red-400">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">نصيحة هندسية</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                        استخدم دائماً أنابيب عريضة (5 سم أو أكثر) للخطوط الرئيسية لنقل الماء بهدوء ودون احتكاك.
                        ولا تستخدم الأنابيب الرفيعة إلا في الأمتار الأخيرة عند الشجرة.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/agri/book-02-science-toolbox/chapter04">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            <Link to="/agri/book-02-science-toolbox/chapter06">
                <Button className="flex items-center gap-2">
                    التالي: حالات الماء (التبخر) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Gauge, Activity } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PressureSyringe } from "../../../common/simulators/PressureSyringe";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/agri/book-02-science-toolbox" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 4 من 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            الدفع والشفط: كيف يتحرك الماء؟
        </h1>

        <div className="prose-custom">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                الماء كسول جداً. لا يتحرك من مكانه إلا إذا أجبرته قوة خارجية.
                في الزراعة، نحن نستخدم قوتين فقط لتحريك الماء: <strong>الدفع</strong> و <strong>الشفط</strong>.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl border-r-4 border-blue-500 my-8">
                <h3 className="text-blue-800 dark:text-blue-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Gauge size={20} />
                    مفهوم الضغط (Pressure)
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    الضغط ببساطة هو: "مدى قوة حشر الماء في مكان ضيق".
                    <br/>
                    - عندما تدفع المكبس، أنت "تحشر" الماء، فيبحث عن مخرج وينطلق بقوة (الرشاشات).
                    <br/>
                    - عندما تسحب المكبس، أنت تخلق "فراغاً"، فيركض الماء ليملأه (امتصاص الجذور).
                </p>
            </div>

            <div className="my-12">
                <PressureSyringe />
            </div>

            <h3>في أرض الواقع</h3>
            <ul>
                <li>
                    <strong>المضخة (The Pump):</strong> هي مجرد "حقنة عملاقة" تدفع الماء باستمرار (ضغط إيجابي).
                </li>
                <li>
                    <strong>الورقة (The Leaf):</strong> تعمل بالعكس، هي تبخر الماء لتخلق فراغاً، فتشفط الماء من الأسفل (ضغط سلبي).
                </li>
            </ul>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/agri/book-02-science-toolbox/chapter03">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            <Link to="/agri/book-02-science-toolbox/chapter05">
                <Button className="flex items-center gap-2">
                    التالي: الأنابيب والجريان <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
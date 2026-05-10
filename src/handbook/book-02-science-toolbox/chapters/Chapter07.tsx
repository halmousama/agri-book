import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sun, Rainbow } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { LightPrism } from "../../../common/simulators/LightPrism";

export default function Chapter07() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/book-02-science-toolbox" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 7 من 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            ألوان الطيف: النبات ذواق للضوء
        </h1>

        <div className="prose-custom">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                ضوء الشمس الأبيض الذي نراه ليس لوناً واحداً. هو "كوكتيل" من 7 ألوان (قوس قزح).
                لكن هل تعلم أن النبات لا يحب كل هذه الألوان بنفس الدرجة؟
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/30 p-6 rounded-2xl border-r-4 border-amber-500 my-8">
                <h3 className="text-amber-800 dark:text-amber-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Rainbow size={20} />
                    لماذا النبات أخضر؟
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    نحن نرى الأشياء باللون الذي <strong>ترفضه</strong> وتعكسه.
                    النبات "يأكل" اللون الأحمر والأزرق بشراهة ليصنع الطاقة.
                    لكنه "يكره" اللون الأخضر فيعكسه لعيوننا. لذلك نراه أخضر!
                </p>
            </div>

            <div className="my-12">
                <LightPrism />
            </div>

            <h3>تطبيقات عملية</h3>
            <ul>
                <li>
                    <strong>الشبك المظلل (Saran):</strong> هل لاحظت أن البيوت المحمية الحديثة تستخدم شبكاً أحمر أو لؤلؤي؟ هذا لتغيير نوع الضوء الداخل وزيادة نمو النبات.
                </li>
                <li>
                    <strong>الإضاءة الصناعية (Grow Lights):</strong> إذا رأيت مزرعة داخلية، ستجد إضاءتها "بنفسجية". هذا لأنهم دمجوا الأحمر (للإزهار) مع الأزرق (للنمو) ووفروا ثمن الكهرباء للون الأخضر الذي لا يحتاجه النبات.
                </li>
            </ul>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/book-02-science-toolbox/chapter06">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            <Link to="/book-02-science-toolbox/chapter08">
                <Button className="flex items-center gap-2">
                    التالي: الحرارة والطاقة <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
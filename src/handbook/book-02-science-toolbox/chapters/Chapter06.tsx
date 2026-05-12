import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CloudFog, Snowflake } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { StateChange } from "../../../common/simulators/StateChange";

export default function Chapter06() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/agri/book-02-science-toolbox" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 6 من 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            حالات الماء: من السائل إلى الغاز
        </h1>

        <div className="prose-custom">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                الماء هو "الحرباء" في المزرعة. تارة تراه سائلاً تسقي به، وتارة يختفي في الهواء (رطوبة)، وتارة يعود ليبلل الأوراق في الصباح (ندى).
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-r-4 border-slate-500 dark:border-slate-400 my-8">
                <h3 className="text-slate-800 dark:text-slate-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <CloudFog size={20} />
                    السر الفيزيائي: الطاقة
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    لتحويل الماء من سائل إلى غاز، يجب أن نعطيه "طاقة" (حرارة).
                    هذا هو السبب في أن <strong>التبخر يبرد الجو</strong>. لأن الماء "سرق" الحرارة من الهواء وطار بها!
                    هذا هو مبدأ عمل المكيف الصحراوي، وتبريد البيوت المحمية بالرذاذ.
                </p>
            </div>

            <div className="my-12">
                <StateChange />
            </div>

            <h3>عدو المزارع: التكثف (الندى)</h3>
            <p>
                انظر للمحاكي عندما يلامس البخار الساخن السقف البارد. يتحول لقطرات ماء.
                في الدفيئة (البيت البلاستيكي)، هذه القطرات خطيرة جداً.
                إذا سقطت على النبات، فهي توفر "مسبحاً" مثالياً لنمو الفطريات والأمراض.
                لذلك، المهندس الذكي يحاول دائماً تهوية الدفيئة لمنع هذا التكثف.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-blue-50 dark:bg-blue-900/30 shadow-sm mt-8">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-blue-600 dark:text-blue-400">
                    <Snowflake size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">نصيحة الحقل</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                        هل تتوقع ليلة باردة (صقيع)؟
                        اسقِ الأرض بالماء مساءً!
                        الماء السائل يخزن حرارة الشمس أثناء النهار، ويطلقها ببطء في الليل ليدفئ جذور النبات ويحميه من التجمد.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/agri/book-02-science-toolbox/chapter05">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            <Link to="/agri/book-02-science-toolbox/chapter07">
                <Button className="flex items-center gap-2">
                    التالي: ألوان الطيف (الضوء) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
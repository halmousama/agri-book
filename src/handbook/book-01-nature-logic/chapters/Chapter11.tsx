import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Scissors, Crown } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PruningSimulator } from "../../../common/simulators/PruningSimulator";

export default function Chapter11() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 11 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            هندسة الشكل: الانقلاب على "الديكتاتور"
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                في الغابة، الشجرة هدفها الوحيد هو الوصول للضوء قبل جارتها، لذلك تنمو كعمود طويل للأعلى.
                لكن في المزرعة، الشجرة الطويلة "كابوس". (صعبة في الجني، والرش، وتتكسر بالريح).
            </p>
            
            <p>
                نحن نريد شجرة "قصيرة"، "عريضة"، و"مفتوحة القلب". 
                لكي نحصل عليها، يجب أن نفهم ونتلاعب بنظام الهرمونات داخل النبات.
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-6 rounded-2xl border-r-4 border-emerald-500 my-8">
                <h3 className="text-emerald-800 dark:text-emerald-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Crown size={20} />
                    مبدأ السيادة القمية (Apical Dominance)
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    في قمة كل غصن، يوجد برعم يسمى "القمة النامية". هذا البرعم يفرز هرموناً (الأوكسين) ينزل للأسفل ويقول لكل البراعم الجانبية: <strong>"ممنوع النمو!"</strong>.
                    طالما أن "الرأس" موجود، فالأطراف نائمة.
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <PruningSimulator />
            </div>

            <h3>لماذا نقص الرأس؟</h3>
            <p>
                التقليم (Pruning) ليس عملية "تعذيب" للشجرة، بل هو عملية "تحرير".
                عندما يمسك المهندس المقص ويقطع القمة (كما فعلت في المحاكاة):
            </p>
            <ol>
                <li>يزول مصدر هرمون القمع.</li>
                <li>تستيقظ البراعم الجانبية فوراً.</li>
                <li>تتحول الشتلة من "عود واحد" إلى شجرة بـ 3 أو 4 أذرع قوية.</li>
            </ol>
            <p>
                هذا ما يسمى بتأسيس <strong>"الهيكل الكأسي"</strong>، وهو الشكل المثالي لأشجار الفاكهة لدخول الشمس والهواء لقلب الشجرة، مما يمنع الفطريات ويزيد جودة الثمار.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm mt-8">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-slate-600 dark:text-slate-400">
                    <Scissors size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">قاعدة ذهبية</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                        "النمو يتبع القص".
                        المكان الذي تقص منه، هو المكان الذي ستنفجر منه الحياة بقوة.
                        لذلك، لا تخف من المقص. الشجرة التي لا تُقلم تشيخ بسرعة ويقل إنتاجها.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/book-01-nature-logic/chapter10">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: الوقاية
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter12">
                <Button className="flex items-center gap-2">
                    التالي: مسك الختام (الحصاد) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
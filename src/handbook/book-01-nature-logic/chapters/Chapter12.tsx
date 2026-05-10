import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ShoppingBasket, Truck, BadgeCheck, BookOpen } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { HarvestSimulator } from "../../../common/simulators/HarvestSimulator";

export default function Chapter12() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 12 من 12 (مسك الختام)</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            رياضيات الربح: الحصاد ليس عشوائياً
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                وصلنا للحظة الحقيقة. كل ما فعلناه سابقاً (ري، تسميد، تقليم) كان "مصاريف". 
                الآن جاء وقت "استرداد المال".
            </p>
            
            <p>
                المهندس الفلاحي لا يحكم بعينيه، بل يحكم بالعلم. هناك خطأ واحد في التوقيت قد يحول محصولك من "تصدير درجة أولى" إلى "علف للحيوانات".
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-2xl border border-red-100 dark:border-red-800">
                    <h3 className="text-red-700 dark:text-red-300 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                        <Truck size={20} />
                        ثمار تتنفس (Climacteric)
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                        مثل <strong>الطماطم، الموز، التفاح</strong>.
                        هذه الثمار يمكن قطفها وهي "خضراء" (صلبة). وهي تملك قدرة عجيبة على إكمال نضجها وتلوينها في الصناديق أثناء الشحن.
                        <br/>
                        <strong>القرار:</strong> اقطفها مبكراً للتصدير.
                    </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                    <h3 className="text-purple-700 dark:text-purple-300 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                        <ShoppingBasket size={20} />
                        ثمار لا تتنفس (Non-Climacteric)
                    </h3>
                    <p className="text-sm text-slate-700 mb-0">
                        مثل <strong>العنب، الحمضيات، الفراولة</strong>.
                        هذه الثمار "تموت" لحظة قصها من الشجرة. إذا قطفتها حامضة، ستبقى حامضة للأبد.
                        <br/>
                        <strong>القرار:</strong> لا تقطفها إلا وهي في قمة الحلاوة.
                    </p>
                </div>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <HarvestSimulator />
            </div>

            <h3>معادلة المهندس (قبل البيع)</h3>
            <p>
                لا تنتظر حتى تذهب للسوق لتعرف كم ستربح. احسبها وأنت في الحقل:
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-6 rounded-xl font-mono text-center text-lg my-6 shadow-xl"
            style={{backgroundColor:'slateblue'}}>
                الربح = (عدد الأشجار × إنتاج الشجرة × السعر) - المصاريف
            </div>
            <p>
                ودائماً، كن مهندساً متشائماً: اخصم <strong>15%</strong> من تقديراتك كـ "فاقد" (سرقة، طيور، تلف). الرقم الذي يتبقى هو الرقم الحقيقي.
            </p>

            {/* الخاتمة الاحتفالية */}
            <div className="mt-16 bg-gradient-to-br from-emerald-600 to-green-800 p-8 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden"
            style={{background:'linear-gradient(to bottom, #16a34a, #059669)'}}>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <BadgeCheck className="mx-auto mb-4 w-16 h-16 text-yellow-300" />
                <h2 className="text-3xl font-bold mb-4 text-white">مبارك يا زميلي! 🎉</h2>
                <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
                    لقد أتممت "الباب الأول: منطق الطبيعة".
                    أنت الآن لا ترى المزرعة كأرض وتراب، بل تراها كمعادلات ضغط، وموازين طاقة، ومصانع كيميائية.
                    أنت تملك "العقلية الهندسية".
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link to="/">
                        <Button className="bg-white text-emerald-800 hover:bg-emerald-50 border-0 w-full md:w-auto">
                            العودة للدليل الشامل
                        </Button>
                    </Link>
                    <Link to="/book-02-science-toolbox">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 w-full md:w-auto flex items-center gap-2 justify-center">
                            <BookOpen size={18} />
                            الباب الثاني: العدة العلمية
                        </Button>
                    </Link>
                </div>
            </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/book-01-nature-logic/chapter11">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: هندسة الشكل
                </Button>
            </Link>
            <Link to="/book-02-science-toolbox">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    الباب الثاني: العدة العلمية <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
    </div>
  );
}
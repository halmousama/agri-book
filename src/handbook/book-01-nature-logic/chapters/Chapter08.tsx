import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Layers, PaintBucket } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { SoilSimulator } from "../../../common/simulators/SoilSimulator";

export default function Chapter08() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/agri/book-01-nature-logic" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 8 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            خزائن الأرض: الرمل والطين (المصفاة والإسفنجة)
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                التربة بالنسبة للمهندس ليست مجرد "وسخ". هي <strong>الخزنة</strong> التي تضع فيها أموالك (الماء والسماد).
            </p>
            
            <p>
                هناك نوعان رئيسيان من الخزنات في الطبيعة، والفرق بينهما يحدد هل ستربح أم ستفلس.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-700">
                    <h3 className="text-yellow-800 dark:text-yellow-200 font-bold text-lg mt-0 mb-2">
                        1. التربة الرملية (المصفاة)
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                        حبيباتها كبيرة (صخور صغيرة). المسافات بينها واسعة.
                        <br/>
                        <strong>المشكلة:</strong> هي "خزنة مثقوبة". الماء والسماد يمران خلالها ويهربان للأعماق بعيداً عن الجذور.
                    </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-2xl border border-red-200 dark:border-red-700">
                    <h3 className="text-red-800 dark:text-red-200 font-bold text-lg mt-0 mb-2">
                        2. التربة الطينية (الإسفنجة)
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                        حبيباتها دقيقة جداً (صفائح). تلتصق ببعضها كالمغناطيس.
                        <br/>
                        <strong>المشكلة:</strong> هي "خزنة مغلقة". تمسك الماء بقوة شديدة لدرجة أنها قد تمنع الهواء عن الجذور فتخنقها.
                    </p>
                </div>
            </div>


            {/* المحاكي */}
            <div className="my-12">
                <SoilSimulator />
            </div>

            <h3>الحل الهندسي: كيف نتعامل مع العيوب؟</h3>
            
            <h4>1. في الأرض الرملية: نظرية "الملعقة"</h4>
            <p>
                بما أن الأرض لا تخزن، لا تعطِ وجبة كبيرة مرة واحدة.
                اعتمد مبدأ: <strong>"قليل ومتكرر"</strong>.
                بدل أن تسقي ساعة كل يومين، اسقِ 10 دقائق 6 مرات في اليوم (كما في الزراعة المائية).
            </p>

            <h4>2. في الأرض الطينية: نظرية "التنفس"</h4>
            <p>
                مشكلتك هي الهواء، ليس الماء.
                باعد بين فترات الري لتسمح للأرض بالجفاف والتشقق قليلاً ليدخل الأكسجين. 
                وازرع على "مصاطب" (أكوام ترابية) ليصرف الماء الزائد بفعل الجاذبية.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-stone-50 dark:bg-stone-800/50 shadow-sm mt-8">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-stone-600 dark:text-stone-400">
                    <PaintBucket size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">الحل السحري: المادة العضوية (الكمبوست)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
                        هل تعلم أن "السباخ/الغبار" يعالج المشكلتين؟
                        <br/>
                        في الرمل: يعمل كإسفنجة ليمسك الماء.
                        <br/>
                        في الطين: يعمل كفواصل ليباعد بين الحبيبات ويدخل الهواء.
                        لذلك هو "الجوكر" الذي يضعه المهندس في أي أرض قبل الزراعة.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/agri/book-01-nature-logic/chapter07">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: البوتاسيوم
                </Button>
            </Link>
            
            <Link to="/agri/book-01-nature-logic/chapter09">
                <Button className="flex items-center gap-2">
                    التالي: بوابات الغذاء (pH) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
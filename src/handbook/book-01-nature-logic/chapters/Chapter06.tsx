import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Zap, Anchor } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PhosphorusSimulator } from "../../../common/simulators/PhosphorusSimulator";

export default function Chapter06() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 6 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            بطارية الحياة: الفوسفور (مهندس الجذور)
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                إذا كان النيتروجين هو "المحرك"، فالفوسفور هو "البطارية" و "الهيكل العظمي".
                بدون فوسفور، النبتة تملك وقوداً لكنها لا تملك شرارة الإشعال.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                    <h3 className="text-orange-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                        <Anchor size={20} />
                        الوظيفة الأولى: التجذير
                    </h3>
                    <p className="text-sm text-slate-700 mb-0">
                        الفوسفور هو المسؤول عن انقسام الخلايا في الجذور. 
                        لذلك، يحرص الفلاحون دائماً على إضافة سماد (DAP) أو (Map) الغني بالفوسفور <strong>مع البذرة أو عند الغرس</strong>. 
                        لأنه إذا لم تبنِ جذراً قوياً في البداية، لن ينفعك أي سماد لاحقاً.
                    </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                    <h3 className="text-purple-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                        <Zap size={20} />
                        الوظيفة الثانية: الطاقة (ATP)
                    </h3>
                    <p className="text-sm text-slate-700 mb-0">
                        عملة الطاقة في كل الكائنات الحية تسمى (ATP). حرف الـ P هنا هو الفوسفور!
                        بدونه، لا تستطيع النبتة نقل السكر من الورقة إلى الثمرة أو الجذر. يتوقف "التحويل البنكي" للغذاء.
                    </p>
                </div>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <PhosphorusSimulator />
            </div>

            <h3>لغز اللون البنفسجي</h3>
            <p>
                لماذا تتحول الأوراق للون البنفسجي عند نقص الفوسفور؟
                <br/>
                القصة درامية: الورقة قامت بعملها وصنعت السكر (التركيب الضوئي). لكن بسبب نقص الفوسفور (البطارية فارغة)، لا توجد طاقة لنقل هذا السكر إلى الجذور.
            </p>
            <p>
                يتراكم السكر في الورقة ويتخمر ويتحول لصبغة "الأنثوسيانين" (بنفسجية اللون).
                إذن، اللون البنفسجي هو صرخة استغاثة: <strong>"أنا ممتلئة بالغذاء، لكن لا أستطيع إرساله!"</strong>.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-amber-600">
                    <Zap size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">نصيحة الحقل</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        الفوسفور عنصر "كسول" جداً في التربة ولا يتحرك.
                        لذلك يجب وضعه <strong>قريباً جداً من الجذور</strong> أثناء الزراعة.
                        إذا نثرته على السطح بعيداً، لن ينزل للجذر، وسيبقى مكانه حتى نهاية الموسم!
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-01-nature-logic/chapter05">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: النيتروجين
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter07">
                <Button className="flex items-center gap-2">
                    التالي: حارس الجودة (البوتاسيوم) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
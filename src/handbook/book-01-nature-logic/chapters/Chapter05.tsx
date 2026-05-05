import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Fuel, AlertOctagon } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { NitrogenSimulator } from "../../../common/simulators/NitrogenSimulator";

export default function Chapter05() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 5 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            محرك النمو: النيتروجين (دواسة البنزين)
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                لماذا النبات أخضر؟ بسبب صبغة "الكلوروفيل".
                ومما يُصنع الكلوروفيل؟ بشكل أساسي من <strong>النيتروجين (N)</strong>.
            </p>
            
            <p>
                النيتروجين هو المسؤول عن بناء "اللحم الحي" للنبات (البروتين والأوراق). 
                بدونه، النبات قزم وشاحب. ومعه، النبات وحش أخضر عملاق.
                ولهذا السبب، يعشق الفلاحون سماد "اليوريا" (المركز بالنيتروجين)، لأنه يعطي نتائج سحرية وسريعة.
            </p>

            <div className="bg-red-50 p-6 rounded-2xl border-r-4 border-red-500 my-8">
                <h3 className="text-red-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <AlertOctagon size={20} />
                    الفخ الهندسي: الهيجان الخضري
                </h3>
                <p className="mb-0 text-slate-700">
                    النيتروجين مثل "السكر" للأطفال. القليل منه يعطي طاقة، والكثير منه يسبب فرط حركة ومشاكل.
                    إذا أعطيت نيتروجين زيادة، النبات <strong>سينسى أن يثمر</strong>!
                    سيوجه كل طاقته لصنع أوراق عملاقة ليتباهى بها، ولن يعطيك حبة طماطم واحدة.
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <NitrogenSimulator />
            </div>

            <h3>التشخيص: كيف تقرأ الرسائل؟</h3>
            <ul>
                <li>
                    <strong>اللون الأصفر في الأسفل:</strong> النيتروجين عنصر "متحرك". إذا جاع النبات، يسحب النيتروجين من أوراقه القديمة (فتصفر وتموت) ويرسله للقمة النامية. هذا دليل نقص.
                </li>
                <li>
                    <strong>اللون الأزرق الداكن + الحشرات:</strong> النيتروجين الزائد يجعل الخلايا "مائية" (Succulent) وجدارها رقيق. هذا يجعلها بوفيه مفتوح لحشرات "المن" و "الذبابة البيضاء".
                </li>
            </ul>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-green-600">
                    <Fuel size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">قاعدة المهندس</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        استخدم النيتروجين في بداية العمر (لـبناء الهيكل).
                        ولكن بمجرد أن تبدأ الأزهار بالظهور.. <strong>ارفع رجلك عن الدواسة فوراً!</strong>
                        وإلا ستسقط الأزهار ولن تجد ثماراً.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-01-nature-logic/chapter04">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: مصنع الرزق
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter06">
                <Button className="flex items-center gap-2">
                    التالي: بطارية الطاقة (الفوسفور) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
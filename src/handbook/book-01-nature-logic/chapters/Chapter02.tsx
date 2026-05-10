import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Scale } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { OsmosisSimulator } from "../../../common/simulators/OsmosisSimulator";

export default function Chapter02() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation Top */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 2 من 12</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            سنة التوازن: لماذا يقتل "الكرم" الزرع؟
        </h1>

        <div className="prose-custom">
            
            {/* المقدمة: الإطار الكبير */}
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ".
            </p>
            <p>
                الكون كله مبني على التوازن، والنبات ليس استثناءً. 
                أكبر خطأ يقع فيه المبتدئون هو التعامل مع السماد بمنطق "الأكل": (كلما أطعمتك أكثر، كبرت أكثر).
                لكن في عالم النبات، السماد ليس طعاماً بالمعنى البشري، السماد هو <strong>ملح</strong>.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-r-4 border-purple-500 my-8">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Scale size={20} />
                    القانون الكوني (الخاصية الأسموزية)
                </h3>
                <p className="mb-0 text-slate-700 dark:text-slate-300">
                    الماء عبد مأمور، يتبع قانوناً واحداً صارماً:
                    <br/>
                    <strong>"يتحرك الماء دائماً باتجاه المكان الأكثر ملوحة."</strong>
                </p>
            </div>

            <p>
                تخيل معي: الجذر بداخله قليل من السكر والأملاح. والتربة مياهها عذبة.
                بناءً على القانون: الماء يترك التربة (الأقل ملحاً) ويدخل للجذر (الأكثر ملحاً). 
                هذه هي "المضخة الطبيعية" التي تشرب بها النبتة.
            </p>
            <p>
                لكن، ماذا يحدث لو جئت أنت، وبدافع الحب والكرم، أفرغت كيساً كاملاً من السماد (الملح) تحت الشجرة؟
            </p>

            {/* المحاكي */}
            <div className="my-12">
                <OsmosisSimulator />
            </div>

            <h3>التفسير الهندسي: الاحتراق الملحي</h3>
            <p>
                عندما رفعت المؤشر في المحاكي للأحمر، أنت لم تسمم النبتة بمادة قاتلة. 
                أنت ببساطة <strong>قلبت الميزان</strong>.
                أصبحت التربة أقوى جذباً للماء من الجذر.
                فبدل أن يشرب الجذر، بدأت التربة "تعتصر" الماء من داخل النبتة وتسرقه.
            </p>
            <p>
                هذا ما نسميه <strong>"البلزمة" (Plasmolysis)</strong> أو الاحتراق. 
                تموت النبتة من العطش والجفاف، رغم أن التربة تحتها غارقة بالماء والسماد!
            </p>

            <h3>الحكمة التطبيقية</h3>
            <ul>
                <li>
                    <strong>السماد بحساب:</strong> لا تضف سماداً لنبتة عطشى أبداً (لأن تركيزها الداخلي ضعيف). اسقها أولاً لتنتعش، ثم سمدها بلطف.
                </li>
                <li>
                    <strong>غسيل التربة:</strong> إذا شعرت أنك أخطأت وزدت السماد، الحل الهندسي الوحيد هو "إغراق" الأرض بماء عذب (غسيل) لكنس الأملاح بعيداً وإعادة كفة الميزان لصالح الجذر.
                </li>
            </ul>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/book-01-nature-logic/chapter01">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: ميكانيكا الوقوف
                </Button>
            </Link>
            
            {/* الزر التالي */}
            <Link to="/book-01-nature-logic/chapter03">
                <Button className="flex items-center gap-2">
                    التالي: مضخة النتح <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
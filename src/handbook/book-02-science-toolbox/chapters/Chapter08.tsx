import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ThermometerSun, Flame } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { HeatExchange } from "../../../common/simulators/HeatExchange";

export default function Chapter08() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-02-science-toolbox" className="hover:text-blue-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 8 من 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            الحرارة والطاقة: كيف نحبس الدفء؟
        </h1>

        <div className="prose-custom">
            <p className="lead text-xl text-slate-700 font-medium">
                في الشتاء، أكبر عدو للفلاح هو "البرد". 
                لكن هل تعلم أن البرودة ليست "شيئاً" موجوداً؟ البرودة هي فقط "غياب الحرارة".
            </p>

            <div className="bg-red-50 p-6 rounded-2xl border-r-4 border-red-500 my-8">
                <h3 className="text-red-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Flame size={20} />
                    قانون الهروب الكبير
                </h3>
                <p className="text-sm text-slate-700 mb-0">
                    الحرارة طاقة "اجتماعية". تحب أن تتوزع بالتساوي.
                    إذا كان بيتك دافئاً (25 درجة) والخارج بارداً (5 درجات)، ستحاول الحرارة الهروب عبر الجدران والسقف لتدفئة الخارج!
                    مهمتنا هي منع هذا الهروب.
                </p>
            </div>

            <div className="my-12">
                <HeatExchange />
            </div>

            <h3>الاحتباس الحراري (صديق الفلاح)</h3>
            <p>
                البيت البلاستيكي يعمل كـ "مصيدة". 
                يدخل ضوء الشمس نهاراً (موجات قصيرة) ويسخن التربة. 
                تتحول هذه الطاقة لحرارة (موجات طويلة) تحاول الخروج ليلاً، لكن البلاستيك يمنعها.
            </p>
            <p>
                كلما كان الغطاء أسمك (أو مزدوجاً مع طبقة هواء)، كلما حبس الحرارة لفترة أطول وحمى النبات من الصقيع القاتل.
            </p>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-02-science-toolbox/chapter07">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            <Link to="/book-02-science-toolbox/chapter09">
                <Button className="flex items-center gap-2">
                    التالي: حفظ الطاقة <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
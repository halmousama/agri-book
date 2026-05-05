import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, FlaskConical, AlertOctagon } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { SolutionMixer } from "../../../common/simulators/SolutionMixer";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-02-science-toolbox" className="hover:text-blue-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 3 من 15</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            عصير الطبيعة: الذوبان vs الترسب
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                الجذور ليس لها معدة لتهضم الطعام الصلب. هي تشرب فقط.
                لذلك، أي سماد لا يذوب في الماء بنسبة 100% هو سماد "غير موجود" بالنسبة للنبات.
            </p>
            
            <p>
                هنا يأتي مفهوم <strong>"المحلول" (Solution)</strong>.
                وهو خلط المادة (السماد) في السائل (الماء) حتى تختفي تماماً وتصبح جزءاً منه.
            </p>

            <div className="bg-teal-50 p-6 rounded-2xl border-r-4 border-teal-500 my-8">
                <h3 className="text-teal-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <FlaskConical size={20} />
                    نقطة التشبع (Saturation Point)
                </h3>
                <p className="text-sm text-slate-700 mb-0">
                    الماء له قدرة تحمل محدودة. تخيل أنه "حافلة" لها عدد مقاعد محدد.
                    إذا أضفت ركاباً (سماداً) أكثر من عدد المقاعد، سيبقون واقفين (مترسبين).
                    الراسب في الزراعة خطير جداً: فهو يسد الأنابيب، ويحرق الشعيرات الجذرية.
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <SolutionMixer />
            </div>

            <h3>خطأ الفلاح الشائع</h3>
            <p>
                كثيرون يخلطون "عجينة" من السماد في البرميل ظناً منهم أنهم يعطون النبات وجبة دسمة.
                في الواقع، أنت تخلق "طبقة ملحية" مركزة جداً في قاع البرميل.
                أول شجرة ستشرب ماءً صافياً، وآخر شجرة ستشرب "سماً مركزاً" وتموت.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-red-600">
                    <AlertOctagon size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">القاعدة الذهبية</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        "الماء أولاً، ثم السماد".
                        املأ الخزان بالماء للنصف، ثم أضف السماد تدريجياً مع التحريك، ثم أكمل الماء.
                        ولا تتجاوز أبداً حد الذوبان المكتوب على الكيس.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-02-science-toolbox/chapter02">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            
            <Link to="/book-02-science-toolbox/chapter04">
                <Button className="flex items-center gap-2">
                    التالي: الدفع والشفط (الضغط) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
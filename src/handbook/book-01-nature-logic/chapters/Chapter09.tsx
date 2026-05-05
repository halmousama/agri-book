import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Key, TestTube } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PhSimulator } from "../../../common/simulators/PhSimulator";

export default function Chapter09() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 9 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            بوابات الغذاء: سر الـ (pH) الغامض
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                تخيل أنك جائع جداً، وأمامك مائدة عليها أشهى الأطباق، لكن فمك "مخيط" ولا تستطيع الأكل.
                هذا بالضبط ما يفعله الـ pH بالنبات.
            </p>
            
            <p>
                كثير من المزارعين يفلسون بسبب هذه النقطة. يشترون أغلى الأسمدة، والنبات لا يزال أصفر ومريضاً.
                السبب ليس في قلة الطعام، بل لأن <strong>"البوابة مغلقة"</strong>.
            </p>

            <div className="bg-rose-50 p-6 rounded-2xl border-r-4 border-rose-400 my-8">
                <h3 className="text-rose-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <TestTube size={20} />
                    قاعدة الذوبان
                </h3>
                <p className="text-sm text-slate-700 mb-0">
                    جذور النبات لا تملك أسناناً لتقضم الصخور. هي تشرب "عصيراً" فقط (سائل).
                    <br/>
                    إذا كانت التربة <strong>قلوية</strong> (فيها جير/كلس كثير)، فإن العناصر الغذائية (خاصة الحديد والزنك) تتفاعل كيميائياً وتتحول إلى صخور صلبة غير قابلة للذوبان.
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <PhSimulator />
            </div>

            <h3>التشخيص: كيف تعرف أن البوابة مغلقة؟</h3>
            <p>
                انظر للصورة في المحاكي عند pH 8.0.
                <br/>
                ستلاحظ أن الورقة صفراء، لكن <strong>عروقها خضراء</strong>. هذا يسمى "الاصفرار الشبكي".
                هذه علامة مميزة جداً لنقص الحديد.
                بما أن الحديد موجود في التربة لكنه "محبوس"، فإضافة المزيد من الحديد للتربة لن يحل المشكلة (سيتحول لصخر أيضاً).
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                    <Key size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">الحل الهندسي: المفتاح الحامضي</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        لفتح البوابة في تربتنا العربية (القلوية)، يجب أن نستخدم "مفتاحاً حامضياً".
                        <br/>
                        1. استخدم <strong>الهيوميك أسيد</strong> أو الكبريت الزراعي.
                        <br/>
                        2. أو قم برش الحديد <strong>على الأوراق مباشرة</strong> (تغذية ورقية) لتجاوز مشاكل التربة تماماً.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-01-nature-logic/chapter08">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: التربة
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter10">
                <Button className="flex items-center gap-2">
                    التالي: الدفاع الذاتي (الوقاية) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
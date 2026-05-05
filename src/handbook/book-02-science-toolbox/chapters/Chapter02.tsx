import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Magnet, Zap } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { IonMagnet } from "../../../common/simulators/IonMagnet";

export default function Chapter02() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-02-science-toolbox" className="hover:text-blue-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 2 من 15</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            الشحنات الخفية: لماذا التربة "مغناطيس"؟
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                هل سألت نفسك يوماً: لماذا يلتصق الطين بيدك بينما الرمل ينفض عنها بسهولة؟
                السر يكمن في "الكهرباء".
            </p>
            
            <p>
                في عالم الكيمياء، الذرات ليست متعادلة دائماً. بعضها "مشحون".
                <br/>
                تخيلها كأنها مغناطيسات صغيرة جداً.
                هناك قاعدة واحدة تحكم كل شيء: <strong>"الأضداد تتجاذب، والمتشابهات تتنافر"</strong>.
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl border-r-4 border-blue-500 my-8">
                <h3 className="text-blue-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Zap size={20} />
                    حقيقة علمية هامة
                </h3>
                <p className="text-sm text-slate-700 mb-0">
                    حبيبات الطين (التربة) تحمل شحنة <strong>سالبة (-)</strong> دائمة.
                    <br/>
                    وهذا يعني أنها تعمل كمغناطيس عملاق يجذب أي سماد يحمل شحنة <strong>موجبة (+)</strong>.
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <IonMagnet />
            </div>

            <h3>تطبيق عملي: لماذا نخسر النيتروجين؟</h3>
            <p>
                انظر للمحاكي أعلاه.
                <br/>
                <strong>البوتاسيوم (K⁺)</strong> يحمل شحنة موجبة. لذلك "تمسكه" التربة بقوة ولا تتركه يهرب مع الماء. إنه سماد "مطيع".
            </p>
            <p>
                أما <strong>النيترات (NO₃⁻)</strong> فهو سماد يحمل شحنة سالبة.
                سالب مع سالب (التربة) = تنافر!
                التربة ترفض مسكه. لذلك، عند أول رية ثقيلة، يهرب النيترات مع الماء للأسفل ويضيع.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-rose-600">
                    <Magnet size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">نصيحة توفير المال</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        لا تضع سماد النيترات (مثل الأمونتر) بكميات كبيرة مرة واحدة قبل المطر أو الري الغزير. سيغسل كله!
                        قسمه على دفعات صغيرة جداً ومتكررة (وجبات خفيفة) لتلتقطه الجذور قبل أن يهرب.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-02-science-toolbox/chapter01">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            
            <Link to="/book-02-science-toolbox/chapter03">
                <Button className="flex items-center gap-2">
                    التالي: عصير الطبيعة (المحاليل) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
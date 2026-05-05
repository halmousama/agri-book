import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Percent,
  FlaskConical,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { RatioBlender } from "../../../common/simulators/RatioBlender";

export default function Chapter12() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link
          to="/book-02-science-toolbox"
          className="hover:text-blue-600 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 12 من 15</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
        لغة الأرقام (3): النسب والخلط (PPM)
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 font-medium">
          الكيمياء بدون رياضيات هي قنبلة موقوتة. إضافة "ملعقة" زائدة من المبيد
          قد تحرق المحصول بالكامل. المهندس لا يتعامل بـ "البركة"، بل يتعامل بـ
          "التراكيز".
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-purple-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
              <Percent size={20} />
              النسبة المئوية (%)
            </h3>
            <p className="text-sm text-slate-700 mb-0">
              إذا قال لك المهندس: "رش مبيداً بتركيز <strong>1%</strong>". ماذا
              يعني؟ يعني أن كل 100 لتر ماء، تأخذ 1 لتر مبيد. (ببساطة: اضرب حجم
              الماء في 0.01).
            </p>
          </div>

          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
            <h3 className="text-rose-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
              <FlaskConical size={20} />
              الجزء في المليون (PPM)
            </h3>
            <p className="text-sm text-slate-700 mb-0">
              وهو مقياس أدق للأشياء المركزة جداً.
              <strong>1 PPM = 1 غرام في 1000 لتر ماء (طن ماء).</strong>
              تخيل مدى الدقة! قطرة صغيرة جداً في برميل ضخم.
            </p>
          </div>
        </div>

        <div className="my-12">
          <RatioBlender />
        </div>

        <h3>السحر الرياضي: "القاعدة الثلاثية"</h3>
        <p>
          مكتوب على علبة الدواء: "استخدم 200 ملل لكل 100 لتر ماء". لكن خزانك
          (الموتور) يتسع لـ 15 لتر فقط! كم تضع فيه؟ هنا نستخدم (الرابع المتناسب
          / Cross Multiplication):
        </p>
        <ul>
          <li>200 ملل $\rightarrow$ 100 لتر</li>
          <li>؟؟؟ ملل $\rightarrow$ 15 لتر</li>
          <li>
            العملية: (200 × 15) ÷ 100 = <strong>30 ملل</strong>.
          </li>
        </ul>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-red-50 shadow-sm mt-8">
          <div className="bg-white p-2 rounded-full shadow-sm text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mt-0">تحذير السمية</h4>
            <p className="text-sm text-slate-600 mb-0">
              الخطأ في حساب النسب لا يضيع المال فقط، بل قد يجعل الثمار "سامة"
              ويمنعها من التصدير بسبب متبقيات المبيدات (MRLs). الرياضيات هنا هي
              صمام الأمان لصحة المستهلك.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-02-science-toolbox/chapter11">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/book-02-science-toolbox/chapter13">
          <Button className="flex items-center gap-2">
            التالي: وصفة الحياة (الوراثة) <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Ruler, Map, Calculator } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { AreaCalculator } from "../../../common/simulators/AreaCalculator";

export default function Chapter10() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link
          to="/book-02-science-toolbox"
          className="hover:text-blue-600 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 10 من 15</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
        لغة الأرقام (1): قياس الأرض والمساحات
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 font-medium">
          الرياضيات في الفلاحة ليست لتعقيد الأمور، بل لمنع التاجر من استغلالك،
          ولمنعك من هدر شتلات زائدة عن حاجة أرضك.
        </p>

        <div className="bg-emerald-50 p-6 rounded-2xl border-r-4 border-emerald-500 my-8">
          <h3 className="text-emerald-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
            <Map size={20} />
            ما هو الهكتار؟
          </h3>
          <p className="text-sm text-slate-700 mb-0">
            نسمع دائماً كلمة "هكتار"، لكن ماذا تعني هندسياً؟ الهكتار هو مربع طول
            ضلعه 100 متر وعرضه 100 متر. إذن:{" "}
            <strong>1 هكتار = 10,000 متر مربع.</strong>
          </p>
        </div>

        <div className="my-12">
          <AreaCalculator />
        </div>

        <h3>كيف تحسب عدد الشتلات؟ (معادلة المهندس)</h3>
        <p>
          لنفترض أن لديك هكتاراً وتريد زراعة الزيتون. التاجر يسألك: "كم شتلة
          تريد؟". الفلاح العادي يخمن، أما أنت فتستخدم هذه المعادلة:
        </p>

        <div
          className="bg-slate-800 text-emerald-400 p-4 rounded-xl font-mono text-center text-lg my-6"
          dir="ltr"
        >
          Plants = Total Area / (Row Spacing × Plant Spacing)
        </div>

        <ul>
          <li>
            <strong>مساحة الأرض:</strong> 10,000 متر مربع (هكتار).
          </li>
          <li>
            <strong>المسافة بين الصفوف:</strong> 6 أمتار.
          </li>
          <li>
            <strong>المسافة بين الشجرات:</strong> 6 أمتار.
          </li>
          <li>
            <strong>العملية:</strong> 10,000 ÷ (6 × 6) = 10,000 ÷ 36 ={" "}
            <strong>277 شجرة</strong>.
          </li>
        </ul>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
          <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
            <Calculator size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mt-0">وفر مالك</h4>
            <p className="text-sm text-slate-600 mb-0">
              إذا لم تحسب المساحة بدقة، قد تشتري 350 شتلة، وتتفاجأ في الحقل أن
              الأرض امتلأت وبقيت 73 شتلة تموت في الشمس. الرياضيات تحمي جيبك.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-02-science-toolbox/chapter09">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/book-02-science-toolbox/chapter11">
          <Button className="flex items-center gap-2">
            التالي: قياس الخزان (الأحجام) <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

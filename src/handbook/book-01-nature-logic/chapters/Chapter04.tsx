import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sun, Database } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PhotosynthesisSimulator } from "../../../common/simulators/PhotosynthesisSimulator";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link
          to="/book-01-nature-logic"
          className="hover:text-green-600 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 4 من 12</span>
      </div>

      {/* Hero */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
        مصنع الرزق: قانون العامل المحدد
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 font-medium">
          تخيل أنك تبني جداراً. لديك 1000 طوبة، لكن لديك أسمنت يكفي لـ 10 طوبات
          فقط. كم طوبة ستبني؟ الإجابة: 10 فقط. بقية الطوب لا قيمة له.
        </p>

        <p>
          هذا بالضبط ما يحدث داخل الورقة. الورقة هي{" "}
          <strong>"مصنع كيميائي"</strong> مهمته دمج الماء والهواء والضوء لإنتاج
          "السكر". والسكر هو "الطوب" الذي يبني كل شيء في الشجرة (من الجذور إلى
          الثمار).
        </p>

        <div className="bg-yellow-50 p-6 rounded-2xl border-r-4 border-yellow-400 my-8">
          <h3 className="text-yellow-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
            <Sun size={20} />
            المعادلة الذهبية
          </h3>
          <p className="mb-0 text-slate-700 font-mono text-sm md:text-base">
            ماء (من الجذر) + CO₂ (من الهواء) + ضوء (طاقة) ⇇{" "}
            <strong>سكر + أكسجين</strong>
          </p>
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <PhotosynthesisSimulator />
        </div>

        <h3>الدرس الهندسي: ابحث عن "اللوح القصير"</h3>
        <p>
          المهندس الفلاحي الذكي لا يشتري السماد فوراً. بل يبحث أولاً عن{" "}
          <strong>"العامل المحدد"</strong>.
        </p>
        <ul>
          <li>
            إذا كانت أشجارك مزروعة بكثافة شديدة وتحجب <strong>الضوء</strong> عن
            بعضها، فإضافة السماد هو هدر للمال. (المشكلة في الضوء).
          </li>
          <li>
            إذا كانت أوراق الشجر مغطاة بالغبار، فهي لا تمتص{" "}
            <strong>الضوء</strong> ولا تتنفس <strong>الهواء</strong>. غسل
            الأشجار هنا أهم من تسميدها!
          </li>
        </ul>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
          <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
            <Database size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mt-0">هل تعلم؟</h4>
            <p className="text-sm text-slate-600 mb-0">
              95% من وزن النبتة الجاف يأتي من "الهواء والماء" (كربون وهيدروجين
              وأكسجين). السماد الذي نشتريه بالمال يمثل فقط 5% من وزن المحصول!
              نحن نزرع "الهواء" حرفياً، والضوء هو الذي يعقده ليصبح مادة صلبة.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-01-nature-logic/chapter03">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> الفصل السابق: مضخة النتح
          </Button>
        </Link>

        <Link to="/book-01-nature-logic/chapter05">
          <Button className="flex items-center gap-2">
            التالي: محرك النمو (النيتروجين) <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

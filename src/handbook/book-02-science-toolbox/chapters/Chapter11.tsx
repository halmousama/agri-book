import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Cylinder, Droplets, Box } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { VolumeTank } from "../../../common/simulators/VolumeTank";

export default function Chapter11() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          to="/book-02-science-toolbox"
          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 11 من 15</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
        لغة الأرقام (2): قياس الخزان (الأحجام)
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
          المساحة (طول × عرض) تفيدنا في الأرض. لكن عندما نتعامل مع الماء، نحتاج
          للبعد الثالث (الارتفاع/العمق). هنا ندخل عالم "الحجم".
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl border-r-4 border-blue-500 my-8">
          <h3 className="text-blue-800 dark:text-blue-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
            <Box size={20} />
            المتر المكعب واللتر
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
            تخيل صندوقاً طوله متر، وعرضه متر، وارتفاعه متر. هذا هو{" "}
            <strong>المتر المكعب (m³)</strong>. هل تعلم كم لتراً من الماء يسع
            هذا الصندوق؟
            <strong>1 متر مكعب = 1000 لتر.</strong>
          </p>
        </div>

        <div className="my-12">
          <VolumeTank />
        </div>

        <h3>حساب سعة حوض الري (جابية)</h3>
        <p>
          قمت بحفر حوض ماء أبعاده: الطول 10 متر، العرض 5 متر، والعمق 2 متر. كم
          لتراً فيه؟
        </p>
        <ol>
          <li>نحسب الحجم: 10 × 5 × 2 = 100 متر مكعب.</li>
          <li>
            نحوله للتر: 100 × 1000 = <strong>100,000 لتر.</strong>
          </li>
        </ol>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm mt-8">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-slate-600 dark:text-slate-400">
            <Cylinder size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">
              لماذا هذا مهم هندسياً؟ (حجم الأنبوب)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
              كثيرون ينسون أن أنابيب الري الرئيسية (الخراطيم الطويلة) هي عبارة
              عن "خزانات أسطوانية" بحد ذاتها! إذا خلطت السماد، يجب أن تعرف حجم
              الأنبوب لتعرف متى سيصل السماد لآخر شجرة، وإلا ستطفئ المضخة والسماد
              لا يزال نائماً داخل الأنابيب ولم يصل للأرض!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-02-science-toolbox/chapter10">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/book-02-science-toolbox/chapter12">
          <Button className="flex items-center gap-2">
            التالي: النسب والخلط <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Microscope, ShieldAlert } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { MicrobePetri } from "../../../common/simulators/MicrobePetri";

export default function Chapter13() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          to="/agri/book-02-science-toolbox"
          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 13 من 15</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
        الأصدقاء والأعداء: حرب الميكروبات
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
          ملعقة واحدة من تربة صحية تحتوي على كائنات حية أكثر من عدد البشر على
          كوكب الأرض! التربة ليست تراباً ميتاً، إنها "مدينة" تعج بالحياة.
        </p>

        <div className="bg-rose-50 dark:bg-rose-900/30 p-6 rounded-2xl border-r-4 border-rose-500 my-8">
          <h3 className="text-rose-800 dark:text-rose-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
            <Microscope size={20} />
            لماذا نحتاج البكتيريا؟
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
            النبات لا يستطيع أكل "المادة العضوية" مباشرة. يجب أن تقوم البكتيريا
            والفطريات النافعة بـ "هضم" هذه المواد وتحويلها إلى أملاح (أيونات)
            يمتصها الجذر. بدون الميكروبات، سيموت النبات جوعاً في أرض مليئة
            بالسماد العضوي.
          </p>
        </div>

        <div className="my-12">
          <MicrobePetri />
        </div>

        <h3>المشكلة الهندسية: خطأ التعقيم الشامل</h3>
        <p>
          بعض الفلاحين عند ظهور مرض فطري في التربة، يقومون بضخ مبيدات كيميائية
          قوية جداً لقتل المرض. هذا يسمى "تعقيم". ماذا يحدث؟ تموت الميكروبات
          الضارة والنافعة معاً! تصبح الأرض "صحراء جرداء".
        </p>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-amber-50 dark:bg-amber-900/30 shadow-sm mt-8">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-amber-600 dark:text-amber-400">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">الفراغ البيولوجي</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
              الطبيعة تكره الفراغ. عندما تعقم الأرض، أول ميكروب سيطير بالهواء
              ويقع في حقلك سيجد أرضاً خالية من المنافسة (لا شرطة ولا جيش)،
              فينتشر بسرعة مرعبة. لذلك، الحل الحديث هو "المكافحة الحيوية": إغراق
              الأرض بالبكتيريا النافعة (عن طريق الكمبوست) لتضييق الخناق على
              الممرضات.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-02-science-toolbox/chapter12">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/agri/book-02-science-toolbox/chapter14">
          <Button className="flex items-center gap-2">
            التالي: وصفة الحياة (الوراثة) <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Dna, Scissors } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { GeneticSeed } from "../../../common/simulators/GeneticSeed";

export default function Chapter14() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link
          to="/book-02-science-toolbox"
          className="hover:text-blue-600 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 14 من 15</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
        وصفة الحياة: خديعة البذور!
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 font-medium">
          تأكل تفاحة لذيذة جداً، فتأخذ بذورها وتزرعها بحماس لتنتج نفس التفاحة.
          بعد 4 سنوات من التعب، تثمر الشجرة تفاحاً صغيراً وحامضاً لا يصلح للأكل.
          ماذا حدث؟
        </p>

        <div className="bg-purple-50 p-6 rounded-2xl border-r-4 border-purple-500 my-8">
          <h3 className="text-purple-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
            <Dna size={20} />
            البذرة = صندوق عشوائي
          </h3>
          <p className="text-sm text-slate-700 mb-0">
            البذرة هي نتاج "زواج" (تلقيح) بين زهرة أم وحبة لقاح من شجرة أب (قد
            يكون برياً سيئاً). البذرة تحمل (DNA) مختلطاً. أنت وحظك! المهندس لا
            يبني مشاريعه على الحظ.
          </p>
        </div>

        <div className="my-12">
          <GeneticSeed />
        </div>

        <h3>الحل الهندسي: الإكثار الخضري (Cloning)</h3>
        <p>
          بما أن كل خلية نباتية تملك النسخة الكاملة للـ DNA، فنحن نتجاهل البذور
          تماماً في أشجار الفاكهة. نحن نقص غصناً (عُقلة) من الشجرة الممتازة، أو
          نأخذ برعماً ونركبه على شجرة أخرى (تطعيم/تلقيم).
        </p>
        <p>
          هذا الغصن سينمو ليصبح شجرة تحمل <strong>تطابقاً جينياً 100%</strong>{" "}
          مع الشجرة الأم.
        </p>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
          <div className="bg-white p-2 rounded-full shadow-sm text-slate-600">
            <Scissors size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mt-0">قاعدة استثمارية</h4>
            <p className="text-sm text-slate-600 mb-0">
              لا تشترِ أبداً "شتلة بذرية" إذا كنت تزرع فاكهة (كالزيتون، التفاح،
              اللوز، الحمضيات). اشترِ دائماً شتلات "مُطعّمة" أو مكاثرة بالعُقل
              لضمان نوعية الإنتاج ومطابقته لمتطلبات السوق.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-02-science-toolbox/chapter13">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/book-02-science-toolbox/chapter15">
          <Button className="flex items-center gap-2">
            التالي: دورة التدوير <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

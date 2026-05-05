import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Atom, Box } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { LegoAtom } from "../../../common/simulators/LegoAtom";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-02-science-toolbox" className="hover:text-blue-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 1 من 15</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            المكعبات الصغيرة: العالم عبارة عن "ليغو"
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                عندما تمسك حفنة من التراب، أو قطرة ماء، أو حبة سماد، فأنت تمسك بملايين الملايين من "المكعبات" الصغيرة جداً.
            </p>
            
            <p>
                في العلم نسمي المكعب الواحد <strong>"ذرة" (Atom)</strong>.
                وعندما نركب مكعبين أو أكثر مع بعضهم، نحصل على <strong>"جزيء" (Molecule)</strong>.
            </p>

            <div className="bg-purple-50 p-6 rounded-2xl border-r-4 border-purple-500 my-8">
                <h3 className="text-purple-800 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Box size={20} />
                    لماذا يهمنا هذا كفلاحين؟
                </h3>
                <p className="text-sm text-slate-700 mb-0">
                    لأن السماد ليس "بودرة سحرية". هو تركيب محدد.
                    <br/>
                    - اليوريا هي ترتيب معين لمكعبات (نيتروجين + كربون + هيدروجين).
                    <br/>
                    - الماء هو ترتيب معين (هيدروجين + أكسجين).
                    <br/>
                    الفلاحة هي فن "تركيب المكعبات" الصحيحة ليتغذى عليها النبات.
                </p>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <LegoAtom />
            </div>

            <h3>التجربة العملية: اصنع الماء</h3>
            <p>
                في المحاكي أعلاه، حاول صنع جزيء ماء.
                الماء في الكيمياء رمزه <strong>H₂O</strong>.
                هذا يعني: ذرتين هيدروجين (H) + ذرة أكسجين واحدة (O).
                <br/>
                جرب إضافتهم وشاهد كيف "يلتصقون" ببعضهم ليصبحوا شيباً واحداً جديداً له خصائص مختلفة تماماً عن الغازات التي كونتّه.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                    <Atom size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">قاعدة بسيطة</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        لا تخف من الأسماء الكيميائية (نترات، فوسفات، سلفات).
                        هي مجرد أسماء "لأشكال الليغو".
                        <strong>نترات:</strong> تعني مكعب نيتروجين مرتبط بـ 3 مكعبات أكسجين. فقط!
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-02-science-toolbox">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> العودة للمقدمة
                </Button>
            </Link>
            
            <Link to="/book-02-science-toolbox/chapter02">
                <Button className="flex items-center gap-2">
                    التالي: الشحنات الخفية (الأيون) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
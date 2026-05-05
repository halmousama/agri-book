import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Truck, ShieldCheck, Wheat } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PotassiumSimulator } from "../../../common/simulators/PotassiumSimulator";

export default function Chapter07() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 7 من 12</span>
        </div>

        {/* Hero */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            حارس الجودة: البوتاسيوم (شرطي المرور)
        </h1>

        <div className="prose-custom">
            
            <p className="lead text-xl text-slate-700 font-medium">
                إذا كان النيتروجين يبني "الأوراق"، والفوسفور يبني "الجذور"، فالبوتاسيوم لا يبني شيئاً!
                هو العنصر الوحيد الذي لا يدخل في تركيب جسم النبتة، لكن بدونه تتوقف الحياة.
            </p>
            
            <p>
                البوتاسيوم هو <strong>"المدير التنفيذي"</strong> للعمليات. وظيفته الأساسية هي النقل والتنظيم.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <h3 className="text-amber-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                        <Truck size={20} />
                        الوظيفة 1: التحجيم والنقل
                    </h3>
                    <p className="text-sm text-slate-700 mb-0">
                        الورقة تصنع السكر، لكن السكر لا يمشي وحده. البوتاسيوم هو "الشاحنة" التي تحمل السكر وتنقله لتخزينه في الثمرة.
                        لذلك نسميه <strong>سماد التحجيم</strong>. بدونه تبقى الثمرة صغيرة وماسخة.
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-blue-700 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                        <ShieldCheck size={20} />
                        الوظيفة 2: المناعة والمياه
                    </h3>
                    <p className="text-sm text-slate-700 mb-0">
                        البوتاسيوم هو الذي يفتح ويغلق "الثغور" (المسام). هو الذي يقرر متى تشرب النبتة ومتى تحبس الماء.
                        كما أنه يقوي الجدران الخلوية لتصبح درعاً ضد الأمراض.
                    </p>
                </div>
            </div>

            {/* المحاكي */}
            <div className="my-12">
                <PotassiumSimulator />
            </div>

            <h3>التشخيص البصري: الحواف المحترقة</h3>
            <p>
                كيف تعرف أن نبتتك تصرخ طلباً للبوتاسيوم؟
                <br/>
                انظر إلى الأوراق القديمة. إذا رأيت حوافها بنية ومحترقة (كأن ولاعة مرت عليها) بينما وسط الورقة أخضر، فهذا هو الدليل القاطع.
            </p>
            <p>
                السبب: السكر والماء توقفا عن الحركة وتراكمت السموم عند الأطراف فماتت الخلايا الطرفية.
            </p>

            <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 shadow-sm mt-8">
                <div className="bg-white p-2 rounded-full shadow-sm text-amber-600">
                    <Wheat size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mt-0">نصيحة المهندس</h4>
                    <p className="text-sm text-slate-600 mb-0">
                        متى نزيد البوتاسيوم؟
                        في مرحلة <strong>"عقد الثمار"</strong>.
                        بمجرد أن تسقط الزهرة وتظهر حبة الطماطم الصغيرة، أوقف النيتروجين (النمو) وارفع البوتاسيوم (التحجيم) لأقصى حد. هذا هو سر المحاصيل القياسية.
                    </p>
                </div>
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-01-nature-logic/chapter06">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> الفصل السابق: الفوسفور
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter08">
                <Button className="flex items-center gap-2">
                    التالي: خزائن الأرض (التربة) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
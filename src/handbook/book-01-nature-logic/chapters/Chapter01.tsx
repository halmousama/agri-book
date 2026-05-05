import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { TurgorSimulator } from "../../../common/simulators/TurgorSimulator";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
        {/* Navigation Top */}
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
            <Link to="/book-01-nature-logic" className="hover:text-green-600 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 1 من 12</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            ميكانيكا الوقوف: سر البالون المائي
        </h1>

        <div className="prose-custom">
            <p>
                تخيل أنك مهندس مدني، وطُلب منك بناء برج بارتفاع 20 متراً (مثل شجرة نخيل) 
                ليحمل أوزاناً ثقيلة (التمر)، ولكن <strong>ممنوع استخدام الحديد أو الأسمنت</strong>.
                هل هذا ممكن؟
            </p>
            <p>
                الطبيعة تفعل هذا كل يوم. السر يكمن في تصميم "الخلية النباتية". 
                على عكس خلايانا اللينة، الخلية النباتية محاطة بصندوق صلب يسمى <strong>"الجدار الخلوي"</strong>.
            </p>
            <p>
                ولكن الصندوق وحده لا يكفي. لكي يصبح الصندوق صلباً وقوياً، يجب أن نملأه بشيء يضغط عليه من الداخل للخارج.
                هذا الشيء هو <strong>الماء</strong>.
            </p>

            <div className="my-12">
                <TurgorSimulator />
            </div>

            <h3>المصطلح الهندسي: ضغط الامتلاء (Turgor Pressure)</h3>
            <p>
                ما رأيته في المحاكاة يسمى علمياً "ضغط الامتلاء".
                <br />
                الفجوة العصارية (البالون الأزرق) تمتلئ بالماء وتضغط بقوة هائلة على الجدار الخلوي.
                تخيل ملايين الخلايا المتراصة بجانب بعضها، وكل واحدة منها "منفوخة" بالضغط. النتيجة؟ هيكل صلب جداً قادر على اختراق الأسفلت!
            </p>
            
            <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
                <strong>تطبيق عملي:</strong> عندما ترى أوراق الطماطم مرتخية في الظهيرة، لا تقل "النبتة حزينة". 
                قل: <strong>"لقد انخفض الضغط الهيدروليكي داخل الخلايا"</strong>. 
                علاجك ليس المواساة، بل إعادة شحن المضخات بالماء.
            </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
            <Link to="/book-01-nature-logic">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            
            <Link to="/book-01-nature-logic/chapter02">
                <Button className="flex items-center gap-2">
                    التالي: الخاصية الأسموزية <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
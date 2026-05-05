import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Droplets, Thermometer, Gauge, Wind } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { HydroponicNFT } from "../../../common/simulators/HydroponicNFT";

export default function Chapter05() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 5 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        🌿 الزراعة المائية (Hydroponics): فصل الماء عن الأكسجين
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> في التربة الطينية، إذا أفرطت في الري، تختنق الجذور لأن الماء ملأ فراغات الهواء. في الزراعة المائية، الجذور معلقة في الهواء ونغمرها بالماء الغني بالأكسجين فقط. الفرق جوهري.
        </div>

        <h2>لماذا الزراعة المائية؟</h2>
        <p>
          في الزراعة التقليدية، التربة تعمل كوسيط بين الجذور والماء والهواء. لكن التربة قد تكون فقيرة، ملوثة، أو ثقيلة. في الزراعة المائية (Soilless Culture)، نلغي التربة تماماً ونعطي الجذور مباشرة ما تحتاجه: محلول غذائي متوازن + أكسجين.
        </p>
        <p>
          أشهر نظام مائي منزلي وتجاري هو <strong>NFT (Nutrient Film Technique)</strong>: أنابيب PVC مائلة قليلاً، يمر في قاعها طبقة رقيقة من الماء الغني بالسماد (EC) والأكسجين (DO). الجذور تنمو معلقة في الهواء داخل الأنبوب وتشرب من الفيلم المائي.
        </p>

        <h2>معادلة التوازن: EC vs DO</h2>
        <p>الزراعة المائية هي لعبة توازن بين مؤشرين متناقضين:</p>
        <ul>
          <li><strong>EC (Electrical Conductivity):</strong> يقيس تركيز الأسمدة الذائبة. كلما زاد EC، زاد الغذاء — لكن الماء يصبح أثقل والأكسجين يقل.</li>
          <li><strong>DO (Dissolved Oxygen):</strong> يقيس الأكسجين الذائب في الماء. كلما زاد DO، تنفست الجذور بشكل أفضل — لكن زيادة DO تحتاج ماء بارداً (أقل من 25°C).</li>
        </ul>

        <div className="bg-red-50 border-r-4 border-red-400 p-4 my-6">
          <strong>المفاجأة القاتلة:</strong> عندما ترتفع حرارة الماء فوق 25°C، تنخفض سعة حمل الأكسجين بنسبة 50%. الجذور تختنق وتتحول للون الأزرق — رغم أن EC مثالي. الحل الوحيد: تبريد المحلول أو إضافة مهوية (Air Stone).
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Droplets className="text-cyan-500" />
            المحاكي: نظام NFT التفاعلي
          </h3>
          <p className="text-slate-600 mb-4">
            تحكم في حرارة الماء، تركيز EC، وسرعة الجريان. شاهد كيف تتفاعل الجذور:
          </p>
          <HydroponicNFT />
        </div>

        <h2>مواصفات الخضار الورقية في NFT</h2>
        <ul>
          <li>درجة حرارة المحلول: 20-24°C (مثالي) — فوق 26°C خطر.</li>
          <li>EC: 1.5-2.5 mS/cm للخس والسبانخ، 2.5-4.0 للطماطم.</li>
          <li>DO: يجب ألا يقل عن 4 mg/L (الحد الأدنى). المثالي 6-8 mg/L.</li>
          <li>pH: 5.5-6.5.</li>
          <li>سرعة الجريان: كافية لتجديد المحلول عند الجذور 3-5 مرات في الساعة.</li>
        </ul>

        <div className="bg-emerald-50 border-r-4 border-emerald-400 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> في NFT، الماء ليس مجرد ناقل للغذاء — هو أيضاً وسيط تنفس الجذور. لا تركز على EC فقط وتنسى DO. الجذر يختنق بالسماد إذا نسيت الأكسجين.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-03-systems-engineering/chapter04">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: ETc
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering/chapter06">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: التسميد الورقي <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

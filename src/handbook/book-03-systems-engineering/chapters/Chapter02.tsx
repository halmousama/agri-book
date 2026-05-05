import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Wind, Thermometer, Droplets, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { VPDSimulator } from "../../../common/simulators/VPDSimulator";

export default function Chapter02() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 2 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        💧 عجز الضغط البخاري (VPD): مقياس العطش الحقيقي
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> لماذا تذبل نباتاتي في يوم غائم رغم أن التربة رطبة؟ لأن الجو "يشرب" من النبات أسرع مما تستطيع الجذور التعويض!
        </div>

        <h2>الرطوبة النسبية تخدعك</h2>
        <p>
          معظم المزارعين ينظرون إلى الرطوبة النسبية (RH%) لمعرفة مدى "جفاف" الجو. 
          لكن الرطوبة النسبية <strong>مقياس خادع</strong>. 70% رطوبة في يوم بارد (15°C) 
          تختلف تماماً عن 70% رطوبة في يوم حار (40°C).
        </p>
        <p>
          هنا يأتي دور <strong>عجز الضغط البخاري (Vapor Pressure Deficit — VPD)</strong>. 
          VPD يقيس "قدرة الجو على امتصاص الماء" من النبات. كلما ارتفع VPD، زادت سرعة تبخر الماء 
          من الأوراق (النتح). إذا زاد VPD عن قدرة الجذور على سحب الماء، تنهار النبتة.
        </p>

        <h2>النطاقات الذهبية الثلاثة</h2>
        <ul>
          <li>
            <strong>VPD &lt; 0.4 kPa (منخفض جداً):</strong> الجو مشبع بالماء. لا تبخر، لا نتح، 
            لا امتصاص للماء والعناصر. المنطقة المثالية للأمراض الفطرية. قم بالتهوية فوراً.
          </li>
          <li>
            <strong>VPD 0.8 — 1.2 kPa (النطاق الذهبي):</strong> الثغور مفتوحة بالكامل، 
            التمثيل الضوئي بأقصى سرعة، النتح متوازن. هذا ما تريده في دفيئتك.
          </li>
          <li>
            <strong>VPD &gt; 2.0 kPa (خطر — عطش جوي):</strong> الجو يمتص الماء من النبات بعنف. 
            الثغور تغلق إغلاقاً اضطرارياً لمنع الجفاف. يتوقف التمثيل الضوئي تماماً. 
            حتى لو كانت التربة رطبة، النبات يتضور عطشاً.
          </li>
        </ul>

        <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-6">
          <strong>مثال واقعي:</strong> في تونس، يوم صيفي حار (38°C) برطوبة 30% — الـ VPD يصل إلى 4.5 kPa. 
          هذا يعني أن الجو "يعطش" النبات بقوة 4 أضعاف النطاق الطبيعي! في هذه الظروف، 
          حتى الري بالتنقيط المستمر لا يكفي — لأن المشكلة ليست في التربة، بل في الجو.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Wind className="text-cyan-500" />
            المحاكي: غرفة التحكم في VPD
          </h3>
          <p className="text-slate-600 mb-4">
            حرك درجة الحرارة والرطوبة لترى كيف يتغير VPD، ولاحظ متى تغلق الثغور:
          </p>
          <VPDSimulator />
        </div>

        <h2>كيف تتحكم في VPD في الدفيئة؟</h2>
        <p>كمهندس أنظمة، لديك 4 أدوات للتحكم في VPD:</p>
        <ol>
          <li><strong>التهوية (Ventilation):</strong> فتح الجوانب والسقف يدخل هواءً جافاً من الخارج ويخفض الرطوبة — يرفع VPD.</li>
          <li><strong>التغيم (Fogging):</strong> رش ضباب ناعم جداً يرفع الرطوبة ويخفض VPD بسرعة. أنقذ محاصيل في ساعة الظهيرة!</li>
          <li><strong>التظليل (Shading):</strong> خفض الإشعاع الشمسي يخفض درجة حرارة الورقة — وبالتالي يخفض VPD.</li>
          <li><strong>التدفئة (Heating):</strong> رفع الحرارة يخفض الرطوبة النسبية ويرفع VPD — مفيد في الشتاء الرطب.</li>
        </ol>

        <div className="bg-emerald-50 border-r-4 border-emerald-400 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> لا ترش الماء بناءً على "شعورك" بالعطش. 
          استخدم حساس VPD (أو احسبه من Temp + RH). حافظ على VPD بين 0.8 و 1.2 kPa 
          لتحصل على أقصى إنتاجية من كل قطرة ماء وكل واط من الضوء.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-03-systems-engineering/chapter01">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: ساعات البرودة
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering/chapter03">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: التنفس الضوئي <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

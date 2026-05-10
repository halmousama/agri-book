import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Gauge, Droplets } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { TensiometerSim } from "../../../common/simulators/TensiometerSim";

export default function Chapter07() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 7 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        📡 المستشعرات الذكية: قراءة التربة قبل أن تطلب الماء
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> الفلاح يروي بالعين — إذا رأى التربة جافة، روى. المشكلة: التربة تبدو رطبة من فوق بينما هي جافة من تحت (والعكس). العين تخدعك، Tensiometer لا يخدعك أبداً.
        </div>

        <h2>ما هو Tensiometer؟</h2>
        <p>
          Tensiometer (جهاز قياس الشد) هو أنبوب بلاستيكي طويل يُدفن في التربة. طرفه السفلي مسامي (مثل فتيلة)، وطرفه العلوي مغلق بمقياس ضغط (Vacuum Gauge).
        </p>
        <p>
          المبدأ: عندما تجف التربة، تسحب الماء من داخل الأنبوب عبر الطرف المسامي، مما يحدث فراغاً (ضغطاً سالباً) في الأنبوب. يقرأ المقياس هذا الضغط السالب بـ <strong>cBar أو kPa</strong>.
        </p>

        <h2>قراءة المقياس كمهندس:</h2>
        <ul>
          <li><strong>0 - 10 cBar:</strong> تربة مشبعة (غرق). لا حاجة للري، بل انتظر حتى يجف قليلاً.</li>
          <li><strong>10 - 30 cBar:</strong> رطوبة مثالية — السعة الحقلية. معظم المحاصيل سعيدة هنا.</li>
          <li><strong>30 - 60 cBar:</strong> بداية الجفاف — معظم المحاصيل تبدأ الإجهاد. ابدأ الري في التربة الرملية.</li>
          <li><strong>60 - 80 cBar:</strong> جفاف شديد — التربة الطينية لا تزال تحتفظ بالماء لكن بقوة شديدة. النبات يذبل.</li>
          <li><strong>{'>'} 80 cBar:</strong> خطر — نقطة الذبول الدائم. حتى لو رويت الآن، بعض الخلايا النباتية تضررت بشكل لا رجعة فيه.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>استثمار ذكي:</strong> Tensiometer واحد يكلف 30-50 دولاراً. مقارنة بتكلفة الماء والسماد والعمالة، هو أرخص استثمار في المزرعة. ضع واحداً في كل 5 هكتارات (في منطقة الجذور على عمق 30-60 سم).
        </div>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Gauge className="text-stone-600" />
            المحاكي: Tensiometer ولعبة الشد
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            حرك رطوبة التربة وشاهد كيف يتغير الشد على المقياس وفي لعبة "شد الحبل" بين التربة والجذر:
          </p>
          <TensiometerSim />
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> المشي في الحقل و"تقدير" رطوبة التربة بالعين هي لعبة مقامرة. استخدم Tensiometer لتعرف متى تروي بالضبط. الرقم لا يكذب.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-03-systems-engineering/chapter06">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: التسميد الورقي
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering/chapter08">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: رادار الآفات <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

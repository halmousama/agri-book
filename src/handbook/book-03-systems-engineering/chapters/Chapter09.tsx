import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Scale, Leaf, Apple, Scissors } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { SourceSinkBalance } from "../../../common/simulators/SourceSinkBalance";

export default function Chapter09() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 9 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        ⚖️ ميزانية الكربون (Source-Sink): لماذا يجب أن تخف الثمار بنفسك؟
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> شجرة التفاح حملت 500 ثمرة. أنت فرحان. المهندس يقول: "خف الثمار إلى 200". لماذا؟ لأن الشجرة لديها ميزانية محدودة من السكر، وإذا وزعتها على 500 ثمرة، كل ثمرة تصبح صغيرة وحامضة.
        </div>

        <h2>المصدر (Source): الأوراق — مصنع السكر</h2>
        <p>
          الأوراق الخضراء هي المصدر الوحيد للطاقة في الشجرة. كل ورقة تلتقط ضوء الشمس وCO₂ وتصنع سكريات (Glucose). عدد الأوراق ومساحتها يحددان كمية السكر المتاحة.
        </p>

        <h2>المصرف (Sink): الثمار — مخازن السكر</h2>
        <p>
          الثمار هي المصرف. الشجرة ترسل السكر الذي صنعته الأوراق إلى الثمار لتخزينه. كل ثمرة تستهلك كمية معينة من السكر لتنمو وتحلى.
        </p>
        <p>
          قانون الميزانية البسيط: إذا كان المصرف (الثمار) أكبر من المصدر (الأوراق)، تعاني كل ثمرة من نقص السكر. النتيجة: <strong>ثمار صغيرة، نسبة سكر منخفضة (Brix منخفض)، لون شاحب، وطعم حامض</strong>.
        </p>

        <h2>الحل الهندسي: الخف (Thinning)</h2>
        <p>
          الخف هو إزالة جزء من الثمار يدوياً أو كيميائياً عندما تكون صغيرة (بحجم حبة الزيتون). يبدو مؤلماً أن تزيل ثماراً، لكن التأثير على الثمار المتبقية هائل:
        </p>
        <ul>
          <li>رفع حجم الثمار بنسبة 30-50%.</li>
          <li>رفع نسبة السكر (Brix) بمقدار 2-4 درجات.</li>
          <li>تحسين لون الثمار.</li>
          <li>منع تناوب الحمل (Biennial Bearing) — السنة القادمة ستثمر أيضاً.</li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Scale className="text-amber-500" />
            المحاكي: ميزانية الكربون التفاعلية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            زد أو قلّل عدد الأوراق والثمار. استخدم مقص الخف. شاهد كيف يتغير حجم الثمار ولونها على الميزان:
          </p>
          <SourceSinkBalance />
        </div>

        <h2>تطبيق عملي: قانون الإبهام للمهندس</h2>
        <ul>
          <li>التفاح: اترك ثمرة واحدة لكل 40-50 ورقة.</li>
          <li>الخوخ: اترك ثمرة واحدة كل 15-20 سم على الغصن.</li>
          <li>العنب: اترك عنقودين فقط لكل فرع قوي.</li>
          <li>الطماطم (في البيوت المحمية): اترك 6-7 عناقيد فقط لكل نبات (اقطع القمة بعدها).</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> الخف ليس "تخسيراً" — إنه استثمار. 100 ثمرة كبيرة ذات جودة عالية تبيع بأكثر من 300 ثمرة صغيرة حامضة. الميزانية محدودة، وزعها بذكاء.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-03-systems-engineering/chapter08">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: رادار الآفات
          </Button>
        </Link>
        <Link to="/agri/book-03-systems-engineering/chapter10">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: معادلة الإنتاج <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Crosshair, Thermometer, Calendar, Bug } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { GDDPestRadar } from "../../../common/simulators/GDDPestRadar";

export default function Chapter08() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 8 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🐛 رادار الآفات (GDD): تنبأ بهجوم الحشرات قبل أن تفقس البيوض
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> الفلاح يرش المبيد فقط عندما يرى الحشرات على الأوراق. في تلك اللحظة، تكون اليرقات قد أكلت بالفعل 30% من المحصول. ماذا لو استطعت التنبؤ بيوم الفقس بالضبط وترش قبله بيومين؟
        </div>

        <h2>وحدات الحرارة المتراكمة (Growing Degree Days)</h2>
        <p>
          كل كائن حي (حشرة، نبات، بكتيريا) يحتاج إلى كمية محددة من "الدفء" لتطوير مرحلة حياته. هذه الكمية تقاس بـ <strong>وحدات الحرارة المتراكمة (GDD)</strong>.
        </p>

        <h2>معادلة GDD اليومية:</h2>
        <p>
          <code>GDD = (Tmax + Tmin) / 2 — Tbase</code>
        </p>
        <p>
          حيث Tbase هي "الحد الأدنى الحراري" للحشرة أو النبات. تحت هذه الحرارة، لا يحدث تطور. فوقها، يبدأ تراكم الحرارة.
        </p>
        <p>
          مثال: حشرة دودة ثمار التفاح (Codling Moth) تحتاج 150 GDD (قاعدة 10°C) ليفقس بيضها. إذا راقبت محطة الأرصاد يومياً وجمعت GDD، ستعرف بالضبط متى ستخرج اليرقات — قبل أن تراها!
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>التوفير المالي:</strong> الرش قبل الفقس بيومين يحتاج مبيداً واحداً بتركيز منخفض. الرش بعد الفقس يحتاج 3 رشات على الأقل. الفرق في التكلفة: 70% توفير + محصول سليم.
        </div>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Crosshair className="text-rose-500" />
            المحاكي: رادار GDD
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            أضف درجات حرارة يومية وشاهد وحدات GDD تتراكم. عندما تصل العتبة — تفقس البيوض:
          </p>
          <GDDPestRadar />
        </div>

        <h2>تطبيق عملي لأنظمة الإنذار المبكر:</h2>
        <ol>
          <li>اشترِ محطة أرصاد رخيصة (100-200 دولار) تسجل الحرارة كل ساعة.</li>
          <li>حمّل تطبيقاً يحسب GDD تلقائياً (أو استخدم Excel).</li>
          <li>حدد العتبة الحرارية للآفة المستهدفة (كل آفة لها رقمها).</li>
          <li>عندما يصل GDD إلى 80% من العتبة — ارش فوراً!</li>
        </ol>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> لا تنتظر رؤية الضرر. استخدم GDD كرادار إنذار مبكر. الرش الاستباقي (Proactive) أوفر 70% من الرش التفاعلي (Reactive). الفرق بين مهندس يخطط وفلاح يندم.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-03-systems-engineering/chapter07">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: Tensiometer
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering/chapter09">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: ميزانية الكربون <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

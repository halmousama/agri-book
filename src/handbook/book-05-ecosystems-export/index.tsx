import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Fish,
  Sprout,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "../../common/components/ui/Button";

export default function Book05Intro() {
  const chapters = [
    {
      title: "أكوابونيك (Aquaponics)",
      icon: <Fish className="text-cyan-500" />,
      desc: "دائرة حياة مغلقة: سمك ← بكتيريا ← نبات ← ماء نظيف ← سمك.",
    },
    {
      title: "الزراعة التجديدية (Regenerative Agriculture)",
      icon: <Sprout className="text-teal-600" />,
      desc: "شبكة الإنترنت الفطرية تحت الأرض — ولماذا الحراثة تقطعها.",
    },
    {
      title: "هندسة التصدير (MRL & PHI)",
      icon: <ShieldCheck className="text-emerald-600" />,
      desc: "جواز السفر للأسواق العالمية — متبقيات المبيدات وفترة التحريم.",
    },
    {
      title: "القيمة المضافة (Value Addition & ROI)",
      icon: <TrendingUp className="text-blue-600" />,
      desc: "لا تبيع زيتوناً، بَع زيت زيتون بقصة — كيف تضاعف الربح 10 مرات.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen font-cairo pb-20 overflow-x-hidden">
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-teal-600 transition-colors font-medium"
        >
          <ArrowRight size={18} className="ml-2" /> العودة للمكتبة
        </Link>
      </div>

      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex p-4 bg-teal-50 rounded-full mb-4 border border-teal-100">
          <Globe size={48} className="text-teal-700" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
          الأنظمة المتكاملة وهندسة التصدير
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          من إدارة النظم البيئية المغلقة إلى اختراق الأسواق العالمية — المهندس
          الفلاحي ليس مزارعاً، بل هو رائد أعمال ومهندس بيئي في آن واحد.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-teal-500"></div>
        <div className="prose-custom">
          <h3 className="text-2xl font-bold text-teal-800 mb-4">
            لماذا هذا الكتاب هو "التتويج"؟
          </h3>
          <p>
            في أربعة كتب، بنيت عقلاً هندسياً متكاملاً: فهمت منطق الطبيعة، تسلحت
            بالعلوم، أتقنت هندسة الأنظمة، ورفعت سقف المزرعة بالذكاء الاصطناعي.
          </p>
          <p>
            الكتاب الخامس يخرّجك من حدود المزرعة لترى الصورة الكبرى: كيف تصمم
            نظاماً بيئياً مغلقاً ينتج سمكاً ونباتاً معاً؟ كيف تحمي التربة التي
            ستروي أحفادك؟ كيف تصدر لأوروبا بدون أن تُرد شحنتك؟ وكيف تحوّل
            محصولك من "سلعة رخيصة" إلى "علامة تجارية فاخرة"؟
          </p>
          <p className="font-bold text-teal-900">
            هنا تصبح مهندساً فلاحياً عالمياً.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <BookOpen className="text-teal-600" />
          خارطة الطريق (4 محطات عالمية)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((chapter, index) => (
            <Link
              key={index}
              to={`/book-05-ecosystems-export/chapter0${index + 1}`}
              className="block p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-300 hover:bg-white transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {chapter.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">
                    {index + 1}. {chapter.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-16">
        <Link to="/book-05-ecosystems-export/chapter01">
          <Button className="text-lg px-8 py-4 bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-200/50 flex items-center gap-3">
            <Globe size={24} />
            ابدأ رحلة الأنظمة المتكاملة (الفصل الأول)
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="text-lg px-8 py-4 flex items-center gap-3 border-slate-300 text-slate-600 hover:bg-slate-50">
            <BookOpen size={24} />
            العودة للدليل الشامل
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Satellite,
  ScanLine,
  Tractor,
  CircleDot,
  Cpu,
  Globe,
} from "lucide-react";
import { Button } from "../../common/components/ui/Button";

export default function Book04Intro() {
  const chapters = [
    {
      title: "العيون الفضائية (NDVI & Drones)",
      icon: <Satellite className="text-purple-500" />,
      desc: "كيف ترى الكاميرا ما لا تراه العين — اكتشاف المرض قبل ظهوره بأسابيع.",
    },
    {
      title: "الرؤية الحاسوبية وفرز المحصول (AI Sorting)",
      icon: <ScanLine className="text-indigo-500" />,
      desc: "كاميرا تلتقط 60 صورة في الثانية، وذكاء اصطناعي يقرر: هذه سليمة، هذه فاسدة.",
    },
    {
      title: "ميكانيكا التربة وانضغاطها (Soil Compaction)",
      icon: <Tractor className="text-violet-500" />,
      desc: "الجرار ليس مجرد آلة ثقيلة — قد يكون قاتلاً صامتاً للتربة إذا دخل في الوقت الخطأ.",
    },
    {
      title: "الري الآلي المحوري (Center Pivot)",
      icon: <CircleDot className="text-fuchsia-500" />,
      desc: "الدوائر الخضراء في الصحراء — كيف تدور وتوزع الماء بدقة على كل نبتة؟",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen font-cairo pb-20">
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-purple-600 transition-colors font-medium"
        >
          <ArrowRight size={18} className="ml-2" /> العودة للمكتبة
        </Link>
      </div>

      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex p-4 bg-purple-50 rounded-full mb-4 border border-purple-100">
          <Cpu size={48} className="text-purple-700" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
          هندسة الآلات والذكاء الاصطناعي
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          من عيون الأقمار الصناعية التي ترى العطش قبل أن تذبل الشجرة، إلى
          الأذرع الآلية التي تفرز المحصول بدقة تفوق البشر — نعبر الجسر بين
          الزراعة التقليدية وهندسة الميكاترونيكس والذكاء الاصطناعي.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
        <div className="prose-custom">
          <h3 className="text-2xl font-bold text-purple-800 mb-4">
            لماذا هذا الكتاب هو "ثورة المهندس"؟
          </h3>
          <p>
            في الكتب السابقة تعلمنا <strong>كيف يفكر النبات</strong>، تسلحنا{" "}
            <strong>بصندوق الأدوات العلمية</strong>، وأتقننا <strong>هندسة النظم</strong>.
          </p>
          <p>
            الآن حان وقت الثورة الحقيقية: توظيف التكنولوجيا الحديثة —
            الاستشعار عن بعد، الذكاء الاصطناعي، الميكانيكا الحيوية — لتحويل
            المزرعة من مكان يعمل بالخبرة اليدوية إلى <strong>مصنع بيولوجي
            مؤتمت</strong> يديره المهندس من هاتفه المحمول.
          </p>
          <p className="font-bold text-purple-900">
            هذا هو الكتاب الذي يفرق بين "مزارع تقليدي" و "مهندس زراعي
            يعيش في القرن الحادي والعشرين".
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <BookOpen className="text-purple-600" />
          خارطة الطريق (4 محطات هندسية)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((chapter, index) => (
            <Link
              key={index}
              to={`/book-04-hardware-ai/chapter0${index + 1}`}
              className="block p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-white transition-all group"
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
        <Link to="/book-04-hardware-ai/chapter01">
          <Button className="text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-200/50 flex items-center gap-3">
            <Satellite size={24} />
            ابدأ ثورة الآلات (الفصل الأول)
          </Button>
        </Link>
        <Link to="/book-05-ecosystems-export">
          <Button className="text-lg px-8 py-4 bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-200/50 flex items-center gap-3">
            <Globe size={24} />
            الكتاب الخامس: الأنظمة المتكاملة وهندسة التصدير
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

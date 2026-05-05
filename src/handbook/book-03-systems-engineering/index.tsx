import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Thermometer,
  Droplets,
  Sun,
  Sprout,
  Wifi,
  BarChart3,
  PiggyBank,
  CloudSnow,
  Tractor,
  Atom,
  Ruler,
  Cpu,
} from "lucide-react";
import { Button } from "../../common/components/ui/Button";

export default function Book03Intro() {
  const sections = [
    {
      title: "القسم الأول: هندسة المناخ (Climate Engineering)",
      icon: <Thermometer className="text-orange-500" />,
      desc: "نتحكم في الغلاف الجوي المحيط بالنبات — من ساعات البرودة إلى كفاءة التمثيل الضوئي.",
      chapters: [
        "الساعة البيولوجية (ساعات البرودة)",
        "عجز الضغط البخاري (VPD)",
        "التنفس الضوئي (C3 vs C4)",
      ],
    },
    {
      title: "القسم الثاني: الإدارة المائية والغذائية المتقدمة (Fertigation)",
      icon: <Droplets className="text-blue-500" />,
      desc: "التحكم الدقيق في المدخلات — من حسابات التبخر إلى الزراعة المائية والتسميد الورقي.",
      chapters: [
        "التبخر-نتح (Evapotranspiration ETc)",
        "الزراعة المائية (Hydroponics)",
        "التسميد الورقي الإسعافي (Foliar)",
      ],
    },
    {
      title: "القسم الثالث: الزراعة الدقيقة والتوقع (Precision Ag)",
      icon: <Wifi className="text-cyan-500" />,
      desc: "استخدام البيانات والمستشعرات لمحاربة المستقبل قبل حدوثه.",
      chapters: [
        "المستشعرات الذكية (Tensiometer)",
        "وحدات الحرارة المتراكمة (GDD)",
        "ميزانية الكربون (Source-Sink)",
      ],
    },
    {
      title: "القسم الرابع: اقتصاديات المهندس (Agri-Economics)",
      icon: <PiggyBank className="text-emerald-500" />,
      desc: "الزراعة هي إنتاج المال في النهاية — تقدير الغلة، التعادل، وما بعد الحصاد.",
      chapters: [
        "معادلة الإنتاج (Rendement)",
        "نقطة التعادل (Break-Even)",
        "هندسة ما بعد الحصاد (Post-Harvest)",
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen font-cairo pb-20">
      {/* Header Navigation */}
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-amber-600 transition-colors font-medium"
        >
          <ArrowRight size={18} className="ml-2" /> العودة للمكتبة
        </Link>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex p-4 bg-amber-50 rounded-full mb-4 border border-amber-100">
          <Tractor size={48} className="text-amber-700" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
          هندسة الأنظمة
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          من الشجرة الواحدة إلى إدارة آلاف الأشجار — ننتقل من مستوى "الخلية" إلى
          مستوى "النظام البيئي" المتكامل: المناخ، الحساسات، الماء، والاقتصاد.
        </p>
      </div>

      {/* Philosophy Box */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
        <div className="prose-custom">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            لماذا هذا الكتاب هو "الوحش النهائي"؟
          </h3>
          <p>
            في الكتاب الأول تعلمنا <strong>كيف يفكر النبات</strong> (الخلية،
            الأسموزية، الضوء). في الكتاب الثاني تسلحنا{" "}
            <strong>بصندوق الأدوات العلمية</strong> (الكيمياء والفيزياء
            والرياضيات).
          </p>
          <p>
            الكتاب الثالث هو مرحلة الهندسة الحقيقية. هنا لا ننظر إلى نبتة واحدة،
            بل إلى مزرعة كاملة: كيف تصمم نظام ري ذكياً، كيف تتوقع هجوم الحشرات
            قبل أن يفقس البيض، كيف تحسب نقطة التعادل المالي، وكيف تحفظ ثمارك
            باردة لمدة 6 أشهر لتصدرها للخارج.
          </p>
          <p className="font-bold text-amber-900">
            هذا هو الفرق بين "فلاح يزرع" و "مهندس يدير نظاماً زراعياً متكاملاً".
          </p>
        </div>
      </div>

      {/* The 4 Sections Roadmap */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <BookOpen className="text-amber-600" />
          خارطة النظام (4 أقسام — 12 محطة هندسية)
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-amber-300 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex items-center gap-4 min-w-[250px]">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    {section.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">
                      {section.title}
                    </h4>
                    <span className="text-xs font-bold text-slate-400">
                      3 فصول
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-slate-600 mb-4 font-medium">
                    {section.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.chapters.map((chapter, idx2) => (
                      <span
                        key={idx2}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-500"
                      >
                        {idx2 + 1}. {chapter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack badge */}
      <div className="text-center mb-16">
        <div className="inline-flex flex-wrap gap-3 justify-center text-xs text-slate-400">
          <span className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            📡 مستشعرات IoT
          </span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            📊 GDD & VPD
          </span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            💧 EC & DO
          </span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            📈 Break-Even
          </span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            🧊 Cold Chain
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-16">
        <Link to="/book-03-systems-engineering/chapter01">
          <Button className="text-lg px-8 py-4 bg-amber-600 hover:bg-amber-700 shadow-xl shadow-amber-200/50 flex items-center gap-3">
            <Tractor size={24} />
            ابدأ هندسة النظام (الفصل الأول)
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai">
          <Button className="text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-200/50 flex items-center gap-3">
            <Cpu size={24} />
            الكتاب الرابع: هندسة الآلات والذكاء الاصطناعي
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

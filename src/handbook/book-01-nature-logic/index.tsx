import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Sprout,
  ScrollText,
  Wheat,
  Droplets,
  Sun,
  Beaker,
  Scissors,
  Ruler,
  Zap,
  Archive,
  Shield,
} from "lucide-react";
import { Button } from "../../common/components/ui/Button";

export default function Book01Intro() {
  const chapters = [
    {
      title: "السر الإلهي: الماء والحياة",
      icon: <Droplets className="text-blue-500" />,
      desc: "كيف يقف النبات بلا عظام؟ (ضغط الامتلاء)",
    },
    {
      title: "سنة التوازن: الأسموزية",
      icon: <Beaker className="text-purple-500" />,
      desc: "قانون حركة الماء والملح",
    },
    {
      title: "المضخة الربانية: النتح",
      icon: <Sun className="text-amber-500" />,
      desc: "كيف يصعد الماء ضد الجاذبية؟",
    },
    {
      title: "مصنع الرزق: التركيب الضوئي",
      icon: <Sun className="text-yellow-600" />,
      desc: "تحويل الضوء إلى طعام",
    },
    {
      title: "النمو: عنصر النيتروجين",
      icon: <Sprout className="text-green-600" />,
      desc: "محرك النمو الخضري",
    },
    {
      title: "الطاقة: عنصر الفوسفور",
      icon: <Zap className="text-orange-500" />,
      desc: "بطارية الطاقة والجذور",
    }, // سنحتاج لإضافة أيقونة Zap
    {
      title: "الجودة: عنصر البوتاسيوم",
      icon: <Wheat className="text-amber-700" />,
      desc: "شرطي المرور والمناعة",
    },
    {
      title: "الخزنة: أنواع التربة",
      icon: <Archive className="text-stone-600" />,
      desc: "الفرق بين الرمل والطين",
    }, // سنحتاج لإضافة أيقونة Archive
    {
      title: "البوابات: الحموضة (pH)",
      icon: <Beaker className="text-rose-500" />,
      desc: "مفتاح خزائن الأرض",
    },
    {
      title: "سنن الدفاع: الوقاية",
      icon: <Shield className="text-red-500" />,
      desc: "الفطريات والحشرات والبكتيريا",
    }, // Shield
    {
      title: "هندسة الشكل: التقليم",
      icon: <Scissors className="text-slate-600" />,
      desc: "التحكم في الهرمونات",
    },
    {
      title: "حساب الرزق: الحصاد",
      icon: <Ruler className="text-emerald-600" />,
      desc: "تقدير الغلة والربح",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen font-cairo pb-20">
      {/* Header Navigation */}
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
        >
          <ArrowRight size={18} className="ml-2" /> العودة للمكتبة
        </Link>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-full mb-4 border border-emerald-100 dark:border-emerald-800">
          <ScrollText size={48} className="text-emerald-700 dark:text-emerald-300" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
          منطق الطبيعة
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          رحلة للتفكر في هندسة الخلق، وفهم السنن التي أودعها الله في النبات
          لنسخرها في إعمار الأرض.
        </p>
      </div>

      {/* Islamic/Philosophical Intro */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
        <div className="prose-custom">
          <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
            "أَأَنتُمْ تَزْرَعُونَهُ أَمْ نَحْنُ الزَّارِعُونَ"
          </h3>
          <p>
            الفلاحة ليست مجرد مهنة، بل هي عبادة وتوكل. المهندس الفلاحي الحقيقي
            هو الذي يدرك أنه لا يخلق الحبة، بل يهيئ لها الأسباب التي خلقها الله.
          </p>
          <p>
            في هذا الكتاب، لن ننظر للنبات كجماد، بل ككائن حي يسبح بحمد ربه وفق
            قوانين دقيقة (فيزيائية وكيميائية). مهمتنا هي اكتشاف هذه القوانين
            (السنن) لنحسن التعامل مع هذه الأمانة. سنتدرج ببطء، خطوة بخطوة، لنفهم
            كيف صمم الخالق هذه الآلة البيولوجية العجيبة.
          </p>
        </div>
      </div>

      {/* The 12 Chapters Roadmap */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 flex items-center gap-2">
          <BookOpen className="text-emerald-600" />
          فصول المنهج (12 باباً للفهم العميق)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  {chapter.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-1">
                    {chapter.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {chapter.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-16">
        <Link to="/book-01-nature-logic/chapter01">
          <Button className="text-lg px-8 py-4 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200/50 flex items-center gap-3 w-full md:w-auto">
            <Sprout size={24} />
            بسم الله نبدأ الفصل الأول
          </Button>
        </Link>
        <Link to="/book-02-science-toolbox">
          <Button variant="outline" className="text-lg px-8 py-4 flex items-center gap-3 w-full md:w-auto border-blue-500 text-blue-600 hover:bg-blue-50">
            <BookOpen size={24} />
            اذهب للكتاب الثاني: العدة العلمية
          </Button>
        </Link>
      </div>
    </div>
  );
}


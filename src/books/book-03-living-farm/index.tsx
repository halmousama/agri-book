import { Link } from "react-router-dom";
import { Sprout, Leaf, Sun, Droplets, Brain, DollarSign, ArrowLeft, Shield, Trees, Music } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../common/components/ui/Button";

const features = [
  { icon: Sprout, title: "التربة الحية", desc: "من الرمل إلى الذهب الأسود — رحلة تحويل الصحراء إلى تربة خصبة", color: "amber" },
  { icon: Sun, title: "الطاقة النظيفة", desc: "الشمس كمحرك رئيسي — طاقة شمسية، غاز حيوي، ودورة مغلقة", color: "yellow" },
  { icon: Droplets, title: "الماء المقدس", desc: "كل قطرة في حلقة مغلقة — تحلية، تكثيف، ري ذكي", color: "cyan" },
  { icon: Trees, title: "التنوع الحيوي", desc: "جيش المزرعة الصامت — من البكتيريا إلى الأبقار، كل كائن له وظيفة", color: "emerald" },
  { icon: Music, title: "السيمفونيات", desc: "حلقات مغلقة لا نفايات فيها — البروتين، الطاقة، والماء في دورة أبدية", color: "purple" },
  { icon: Shield, title: "الصحة المتكاملة", desc: "المزرعة كجسد حي — مناعة طبيعية بدون كيماويات", color: "rose" },
  { icon: Brain, title: "العقل الرقمي", desc: "Ollama + ThingsBoard + farmOS — ذكاء اصطناعي محلي يدير المزرعة", color: "blue" },
  { icon: DollarSign, title: "الاقتصاد الحي", desc: "5 حنفيات دخل — من التمور إلى أرصدة الكربون والأكواخ السياحية", color: "green" },
];

const colorMap: Record<string, string> = {
  amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300",
  yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-300",
  cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300",
  emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300",
  purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
  rose: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300",
  blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
  green: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-300",
};

const chapterLinks = [
  { num: 1, title: "كيف تعيش هذه المزرعة؟", path: "/farm/book-03-living-farm/chapter01" },
  { num: 2, title: "دليل الإمكان", path: "/farm/book-03-living-farm/chapter02" },
  { num: 3, title: "رحلة تحويل الرمال إلى تربة", path: "/farm/book-03-living-farm/chapter03" },
  { num: 4, title: "الشمس، الماء، والطاقة", path: "/farm/book-03-living-farm/chapter04" },
  { num: 5, title: "سكان المزرعة", path: "/farm/book-03-living-farm/chapter05" },
  { num: 6, title: "النظام النباتي", path: "/farm/book-03-living-farm/chapter06" },
  { num: 7, title: "باب السيمفونيات", path: "/farm/book-03-living-farm/chapter07" },
  { num: 8, title: "النظام الصحي", path: "/farm/book-03-living-farm/chapter08" },
  { num: 9, title: "العقل الرقمي", path: "/farm/book-03-living-farm/chapter09" },
  { num: 10, title: "المائدة وحنفية المال", path: "/farm/book-03-living-farm/chapter10" },
];

export default function FarmBookIntro() {
  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 mt-12"
      >
        {/* Hero Icon */}
        <div className="inline-flex justify-center p-1 rounded-full bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 ring-1 ring-white/10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-800/80 border border-slate-700/50 shadow-inner">
            <Sprout
              size={48}
              className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-emerald-300 drop-shadow-sm">
          المزرعة الحية
        </h1>
        <p className="text-2xl text-amber-400/80 font-bold -mt-2">
          نظام بيئي واحد لا ينام
        </p>

        {/* Description */}
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
          رحلة متكاملة لبناء مزرعة ذكية في قلب الصحراء — من حبة رمل إلى نظام بيئي يكتفي ذاتيًا.
          تربة حية، طاقة شمسية، ماء معاد تدويره، تنوع حيوي، وعقل رقمي يدير كل شيء.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link to="/farm/book-03-living-farm/chapter01">
            <Button className="px-8 py-4 text-lg flex items-center gap-2 mx-auto bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-700 hover:to-emerald-700 border-0 shadow-lg shadow-amber-600/20">
              ابدأ الرحلة: الفصل الأول <ArrowLeft size={20} />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[feat.color]} backdrop-blur-xl border text-right`}
              >
                <Icon size={28} className="mb-3" />
                <h3 className="text-base font-bold text-white mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Chapter Links */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">فصول الكتاب</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {chapterLinks.map((ch) => (
              <Link
                key={ch.num}
                to={ch.path}
                className="group px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-200 transition-all duration-300"
              >
                <span className="font-bold text-amber-400/70 group-hover:text-amber-300 ml-1.5">
                  {String(ch.num).padStart(2, "0")}
                </span>
                {ch.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-500/20 text-center max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-extrabold text-amber-400">10</div>
              <div className="text-xs text-slate-400 mt-1">فصول</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">4</div>
              <div className="text-xs text-slate-400 mt-1">محاكيات تفاعلية</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-400">∞</div>
              <div className="text-xs text-slate-400 mt-1">حلقة مغلقة</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

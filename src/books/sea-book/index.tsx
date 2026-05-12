import { Link } from "react-router-dom";
import { Ship, Waves, BookOpen, Compass, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../common/components/ui/Button";

export default function SeaBookIntro() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 mt-12"
      >
        <div className="inline-flex justify-center p-1 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 ring-1 ring-white/10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-800/80 border border-slate-700/50 shadow-inner">
            <Ship size={48} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-cyan-300 drop-shadow-sm">
          دليل الريّاس وعلوم البحر
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          دليلك المتكامل لفهم البحر وعلوم الصيد — من قراءة المد والجزر إلى ربط العقد البحرية.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
          <div className="p-6 rounded-2xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 text-right">
            <Waves size={32} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">فهم الطبيعة</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              تعلم قراءة البحر: المد والجزر، الرياح، ضغط الهواء، ودرجات الحرارة.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 text-right">
            <Compass size={32} className="text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">علوم الصيد</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              محاكيات تفاعلية للتضاريس البحرية، الطقس، النظارات المستقطبة، والعقد البحرية.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link to="/sea/book-sea/chapter01">
            <Button className="px-8 py-4 text-lg flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700">
              ابدأ الرحلة: الفصل الأول <ArrowLeft size={20} />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link to="/sea/book-sea/chapter01" className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            🗺️ قراءة البحر والتضاريس
          </Link>
          <Link to="/sea/book-sea/chapter02" className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            ⏰ علم التوقيت
          </Link>
          <Link to="/sea/book-sea/chapter03" className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            🌤️ الطقس ومزاج السمكة
          </Link>
          <Link to="/sea/book-sea/chapter04" className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            🎣 التجهيزات والتكتيك
          </Link>
          <Link to="/sea/book-sea/chapter05" className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            📖 الملاحق
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

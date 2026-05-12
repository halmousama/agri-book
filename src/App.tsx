import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Ship, BookOpen, ArrowLeft, GraduationCap } from "lucide-react";
import { LIBRARY } from "./common/constants/books";

const ENTRY_STYLES: Record<string, { gradient: string; border: string; glow: string; iconBg: string; iconColor: string; btn: string; dot: string; badge: string }> = {
  agri: {
    gradient: "from-emerald-900/60 via-emerald-800/30 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    glow: "shadow-emerald-500/20 hover:shadow-emerald-400/40",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-300",
    btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 hover:shadow-emerald-500/50",
    dot: "bg-emerald-400",
    badge: "border-emerald-500/30 text-emerald-300",
  },
  sea: {
    gradient: "from-blue-900/60 via-blue-800/30 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/60",
    glow: "shadow-blue-500/20 hover:shadow-blue-400/40",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-300",
    btn: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 hover:shadow-blue-500/50",
    dot: "bg-blue-400",
    badge: "border-blue-500/30 text-blue-300",
  },
};

const ENTRY_ICONS: Record<string, React.ReactNode> = {
  agri: <Sprout size={44} />,
  sea: <Ship size={44} />,
};

const cardVariants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, delay: 0.2 * (i + 1), ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center font-cairo overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 selection:bg-emerald-500/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[150px]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-300/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-300/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 py-16 md:py-28">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.2 }}
            className="inline-flex justify-center p-1 rounded-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 ring-1 ring-white/10 backdrop-blur-md mb-4 shadow-2xl"
          >
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-slate-800/80 border border-slate-700/50 shadow-inner">
              <BookOpen size={44} className="text-emerald-300 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-blue-200 drop-shadow-lg pb-2 leading-tight">
            المكتبة العلمية
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            منصة تعليمية تفاعلية حيث تلتقي <span className="text-emerald-300">الهندسة الزراعية</span> مع <span className="text-blue-300">علوم البحر</span>
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/[0.04] backdrop-blur-sm rounded-full border border-white/[0.06] text-sm text-slate-500">
            <GraduationCap size={16} className="text-emerald-400" />
            <span>{Object.values(LIBRARY).reduce((s, e) => s + Object.keys(e.books).length, 0)} كتب · {Object.values(LIBRARY).reduce((s, e) => s + Object.values(e.books).reduce((t, b) => t + b.chapters.length, 0), 0)} فصل تفاعلي · محاكيات فيزيائية</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {LIBRARY.map((entry, i) => {
            const s = ENTRY_STYLES[entry.id];
            const totalChapters = Object.values(entry.books).reduce((sum, b) => sum + b.chapters.length, 0);

            return (
              <motion.div
                key={entry.id}
                custom={i}
                initial="initial"
                animate="animate"
                variants={cardVariants}
                whileHover={{ scale: 1.04, y: -8 }}
                className="group relative flex flex-col p-8 md:p-10 rounded-3xl bg-slate-800/30 backdrop-blur-2xl border border-slate-700/50 transition-all duration-[400ms] overflow-hidden w-full shadow-2xl"
                style={{ boxShadow: `0 0 60px -20px ${entry.id === "agri" ? "rgba(52,211,153,0.15)" : "rgba(96,165,250,0.15)"}, 0 25px 50px -12px rgba(0,0,0,0.5)` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]`} />

                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-500/10 to-transparent" />

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className={`inline-flex p-3.5 rounded-2xl mb-6 ring-1 ring-white/[0.06] ${s.iconBg} ${s.iconColor} group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-[400ms]`}>
                    {ENTRY_ICONS[entry.id]}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${s.iconColor}`}>
                      {entry.subtitle}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                    {entry.title}
                  </h2>

                  <p className="text-base text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-[400ms] flex-1">
                    {entry.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border ${s.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {totalChapters} فصل {totalChapters > 10 ? "تعليمي" : "دراسي"}
                    </span>
                  </div>

                  <Link to={entry.path} className="block w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full h-14 text-lg font-bold ${s.btn} text-white shadow-lg border-none flex items-center justify-center gap-3 rounded-xl cursor-pointer transition-all duration-300`}
                    >
                      <span>استعرض الكتاب</span>
                      <ArrowLeft size={20} className="group-hover/btn:-translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-28 pt-8 border-t border-white/[0.04] text-slate-600 text-xs space-y-1"
        >
          <p className="text-slate-500 text-sm">سلسلة المهندس الفلاحي · AgriBooks &mdash; حيث تلتقي الهندسة بالأرض والبحر</p>
          <p>Powered by OpenCode · بني بالعلم والإيمان</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;

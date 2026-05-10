import { Link } from "react-router-dom";
import { Button } from "./common/components/ui/Button";
import {
  BookOpen,
  ArrowLeft,
  Microscope,
  Wrench,
  Tractor,
  Cpu,
  Globe,
  Sparkles,
  Bookmark,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { useProgress } from "./common/contexts/ProgressContext";
import { BOOKS } from "./common/constants/books";

const totalChapters = Object.values(BOOKS).reduce(
  (sum, b) => sum + b.chapters.length,
  0,
);

function ContinueReadingBanner() {
  const { lastVisited, getCompletedCount } = useProgress();
  const completedCount = getCompletedCount();

  if (!lastVisited) return null;

  const book = BOOKS[lastVisited.bookId];
  const chapter = book?.chapters.find((c) => c.id === lastVisited.chapterId);
  if (!book || !chapter) return null;

  const isEmerald = book.id === "book-01-nature-logic";
  const isBlue = book.id === "book-02-science-toolbox";
  const isAmber = book.id === "book-03-systems-engineering";
  const isPurple = book.id === "book-04-hardware-ai";

  const borderColor = isEmerald
    ? "border-emerald-500/30"
    : isBlue
      ? "border-blue-500/30"
      : isAmber
        ? "border-amber-500/30"
        : isPurple
          ? "border-purple-500/30"
          : "border-teal-500/30";

  const btnBg = isEmerald
    ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
    : isBlue
      ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
      : isAmber
        ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30"
        : isPurple
          ? "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30"
          : "bg-teal-600 hover:bg-teal-500 shadow-teal-600/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`max-w-6xl mx-auto mb-10 p-5 rounded-2xl bg-slate-800/40 backdrop-blur-xl border ${borderColor}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
            <Bookmark size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 mb-1 tracking-wide">
              واصل رحلتك التعليمية
            </p>
            <p className="text-base font-bold text-white">
              {book.title} — {chapter.title}
            </p>
            <div className="flex items-center gap-4 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>
                  <strong className="text-emerald-300">{completedCount}</strong>
                  /{totalChapters} فصلاً مكتملاً
                </span>
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <BarChart3 size={12} className="text-amber-400" />
                <span>
                  {Math.round((completedCount / totalChapters) * 100)}%
                </span>
              </span>
            </div>
          </div>
        </div>
        <Link to={chapter.path} className="shrink-0">
          <Button
            className={`${btnBg} text-white border-none flex items-center gap-2 shadow-lg`}
          >
            اكمل القراءة <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

const parts = [
  {
    id: "book-01-nature-logic",
    title: "الباب الأول: منطق الطبيعة",
    desc: "افهم كيف يفكر النبات. رحلة من الخلية إلى الحصاد لفهم القوانين البيولوجية.",
    icon: <BookOpen size={32} />,
    color: "emerald",
    chapters: "12 فصلاً",
  },
  {
    id: "book-02-science-toolbox",
    title: "الباب الثاني: العدة العلمية",
    desc: "صندوق أدوات المهندس. الكيمياء والفيزياء والرياضيات من الصفر بلغة بسيطة.",
    icon: <Wrench size={32} />,
    color: "blue",
    chapters: "15 فصلاً",
  },
  {
    id: "book-03-systems-engineering",
    title: "الباب الثالث: هندسة الأنظمة",
    desc: "إدارة المزرعة الذكية. مناخ، حساسات، اقتصاد — النظام المتكامل.",
    icon: <Tractor size={32} />,
    color: "amber",
    chapters: "12 فصلاً",
  },
  {
    id: "book-04-hardware-ai",
    title: "الباب الرابع: هندسة الآلات والذكاء الاصطناعي",
    desc: "الفضاء والروبوتات والذكاء الاصطناعي — أحدث تقنيات الزراعة الذكية.",
    icon: <Cpu size={32} />,
    color: "purple",
    chapters: "8 فصول",
  },
  {
    id: "book-05-ecosystems-export",
    title: "الباب الخامس: الأنظمة المتكاملة وهندسة التصدير",
    desc: "من الأكوابونيك إلى التصدير — بناء أنظمة زراعية مستدامة ومربحة.",
    icon: <Globe size={32} />,
    color: "teal",
    chapters: "8 فصول",
  },
];

function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center font-cairo overflow-hidden bg-surface-900 dark:bg-surface-900 selection:bg-emerald-500/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-900/50 backdrop-blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-7xl px-4 py-12 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center space-y-6 mb-20"
        >
          <div className="inline-flex justify-center p-1 rounded-full bg-gradient-to-tr from-emerald-500/20 to-amber-500/20 ring-1 ring-white/10 backdrop-blur-md mb-4 shadow-2xl">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/80 border border-slate-700/50 shadow-inner">
              <Microscope
                size={40}
                className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-amber-300 drop-shadow-sm pb-2">
            الدليل الشامل للمهندس الفلاحي
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            منصة تعليمية تفاعلية تدمج علم الأحياء بهندسة الأنظمة — من الخلية إلى
            الحصاد، ومن الكيمياء إلى الاقتصاد.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-slate-400">
            <Sparkles size={16} className="text-emerald-400" />
            <span>
              <strong className="text-white">{totalChapters} فصلاً</strong>{" "}
              تعليمياً في {Object.keys(BOOKS).length} أقسام مع محاكيات تفاعلية
            </span>
          </div>
        </motion.div>

        {/* Continue Reading Banner */}
        <ContinueReadingBanner />

        {/* Parts Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {parts.map((part, i) => {
            const isEmerald = part.color === "emerald";
            const isBlue = part.color === "blue";
            const isAmber = part.color === "amber";
            const isPurple = part.color === "purple";

            const hoverBorder = isEmerald
              ? "hover:border-emerald-500/50"
              : isBlue
                ? "hover:border-blue-500/50"
                : isAmber
                  ? "hover:border-amber-500/50"
                  : isPurple
                    ? "hover:border-purple-500/50"
                    : "hover:border-teal-500/50";

            const btnBg = isEmerald
              ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
              : isBlue
                ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
                : isAmber
                  ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30"
                  : isPurple
                    ? "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30"
                    : "bg-teal-600 hover:bg-teal-500 shadow-teal-600/30";

            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
                className={`group relative flex flex-col p-8 rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 ${hoverBorder} hover:bg-slate-800/60 transition-all duration-500 shadow-2xl overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1.1rem)]`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:opacity-100 transition-opacity duration-500 opacity-0"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, ${
                      isEmerald
                        ? "rgba(5,150,105,0.08)"
                        : isBlue
                          ? "rgba(37,99,235,0.08)"
                          : isAmber
                            ? "rgba(217,119,6,0.08)"
                            : isPurple
                              ? "rgba(147,51,234,0.08)"
                              : "rgba(13,148,136,0.08)"
                    } 100%)`,
                  }}
                />

                <div className="relative z-10 flex-1">
                  <div
                    className={`inline-flex p-3 rounded-2xl mb-6 ring-1 group-hover:scale-110 transition-transform duration-500 ${
                      isEmerald
                        ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                        : isBlue
                          ? "bg-blue-500/10 text-blue-400 ring-blue-500/20"
                          : isAmber
                            ? "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                            : isPurple
                              ? "bg-purple-500/10 text-purple-400 ring-purple-500/20"
                              : "bg-teal-500/10 text-teal-400 ring-teal-500/20"
                    }`}
                  >
                    {part.icon}
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3">
                    {part.title}
                  </h2>

                  <p className="text-slate-400 mb-4 text-base leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                    {part.desc}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    {part.chapters}
                  </span>
                </div>

                <Link
                  to={`/${part.id}`}
                  className="relative z-10 w-full mt-6 block"
                >
                  <Button
                    className={`w-full h-14 text-lg ${btnBg} text-white shadow-lg border-none flex items-center justify-center gap-2 group/btn transition-all duration-300`}
                  >
                    ابدأ الرحلة
                    <ArrowLeft
                      size={20}
                      className="group-hover/btn:-translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 text-slate-600 text-sm border-t border-slate-800 pt-8"
        >
          <p>سلسلة المهندس الفلاحي — حيث تلتقي الهندسة بالأرض 🌱</p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;

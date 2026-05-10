import { useState } from "react";
import {
  Scissors,
  RefreshCw,
  ArrowDown,
  Sprout,
  TreePine,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

export const PruningSimulator = () => {
  const [isPruned, setIsPruned] = useState(false);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg shadow-emerald-200/50">
              <TreePine className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر التقليم (السيادة القمية)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تقليم — تحرير البراعم النائمة وتشكيل الشجرة
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isPruned
                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                : "bg-amber-100 text-amber-700 border-amber-300"
            )}
            animate={!isPruned ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isPruned ? "🟢 ثورة الفروع" : "🟡 دكتاتورية القمة"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="soilPrune" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.5" />
                </linearGradient>
                <filter id="glowPrune">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect
                x="0"
                y="0"
                width="200"
                height="280"
                fill="#f0f9ff"
                rx="8"
              />

              {/* Soil */}
              <path
                d="M20,260 Q100,250 180,260"
                stroke="#78350f"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <rect
                x="0"
                y="260"
                width="200"
                height="20"
                fill="url(#soilPrune)"
                rx="4"
              />

              {/* Main stem */}
              <path
                d="M100,260 L100,90"
                stroke="#78350f"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* === Before pruning (Apical dominance) === */}
              <g
                style={{
                  opacity: isPruned ? 0 : 1,
                  transition: "opacity 0.5s",
                }}
              >
                {/* Apical bud */}
                <circle cx="100" cy="90" r="7" fill="#22c55e" />
                <path
                  d="M100,90 L100,72"
                  stroke="#22c55e"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M100,72 Q82,54 100,38 Q118,54 100,72"
                  fill="#4ade80"
                  stroke="#22c55e"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Auxin (suppression hormones) */}
                <g opacity="0.8">
                  <motion.path
                    d="M115,100 L115,185"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [20, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d="M85,100 L85,185"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [20, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <text
                    x="125"
                    y="140"
                    fontSize="7"
                    fill="#ef4444"
                    fontWeight="bold"
                    transform="rotate(90, 125, 140)"
                  >
                    Auxin (قمع!)
                  </text>
                </g>

                {/* Dormant buds */}
                <circle
                  cx="100"
                  cy="165"
                  r="3.5"
                  fill="#fbbf24"
                  stroke="#78350f"
                  strokeWidth="1"
                />
                <circle
                  cx="100"
                  cy="205"
                  r="3.5"
                  fill="#fbbf24"
                  stroke="#78350f"
                  strokeWidth="1"
                />
              </g>

              {/* === After pruning (Lateral growth) === */}
              <g
                style={{
                  opacity: isPruned ? 1 : 0,
                  transition: "opacity 0.5s 0.5s",
                }}
              >
                {/* Cut mark */}
                <path
                  d="M90,90 L110,90"
                  stroke="#78350f"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* New branches grow from buds */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isPruned
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ originX: "100px", originY: "185px" }}
                >
                  {/* Upper right branch */}
                  <path
                    d="M100,165 Q135,145 155,125"
                    stroke="#78350f"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="155" cy="125" r="12" fill="#22c55e" />
                  <circle cx="155" cy="125" r="8" fill="#4ade80" opacity="0.5" />

                  {/* Upper left branch */}
                  <path
                    d="M100,165 Q65,145 45,125"
                    stroke="#78350f"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="45" cy="125" r="12" fill="#22c55e" />
                  <circle cx="45" cy="125" r="8" fill="#4ade80" opacity="0.5" />

                  {/* Lower right branch */}
                  <path
                    d="M100,205 Q130,195 145,185"
                    stroke="#78350f"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="145" cy="185" r="10" fill="#22c55e" />

                  {/* Lower left branch */}
                  <path
                    d="M100,205 Q70,195 55,185"
                    stroke="#78350f"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="55" cy="185" r="10" fill="#22c55e" />
                </motion.g>
              </g>

              {/* Labels */}
              <text
                x="100"
                y="275"
                textAnchor="middle"
                fontSize="7"
                fill="#78350f"
                fontWeight="bold"
                opacity="0.6"
              >
                التربة
              </text>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            {/* Main action button */}
            <button
              onClick={() => setIsPruned(!isPruned)}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-lg",
                isPruned
                  ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-200"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-200"
              )}
            >
              {isPruned ? (
                <>
                  <RefreshCw size={20} />
                  إعادة المحاولة
                </>
              ) : (
                <>
                  <Scissors size={20} />
                  قص القمة (الرأس)
                </>
              )}
            </button>

            {/* Explanation */}
            <motion.div
              key={`prune-${isPruned}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isPruned ? (
                <Alert
                  type="success"
                  title="✅ النتيجة: ثورة الفروع الجانبية"
                >
                  بمجرد إزالة القمة، اختفى هرمون القمع (الأوكسين). استيقظت
                  البراعم النائمة فوراً (بعد 24-48 ساعة) وانطلقت لتصبح فروعاً
                  جديدة تحمل الثمار. الشجرة الآن مفتوحة القلب — الضوء والهواء
                  يدخلان إلى جميع الأجزاء.
                </Alert>
              ) : (
                <Alert
                  type="info"
                  title="ℹ الحالة: دكتاتورية القمة (سيادة قمية)"
                >
                  القمة النامية تفرز هرموناً (أوكسين — Auxin) ينزل للأسفل ويصدر
                  أمراً صارماً للبراعم الجانبية: ابقوا نائمين! أنا فقط من ينمو.
                  لذلك الشجرة تطول فقط ولا تتعرض. هذه ظاهرة تسمى السيادة القمية
                  (Apical Dominance).
                </Alert>
              )}
            </motion.div>

            {/* Tip */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">نصيحة هندسية:</strong> هذا
              المبدأ يستخدم لتشكيل أشجار الفاكهة (النظام الكأسي — Open Center)
              وتكثيف شجيرات الزينة والريحان. التقليم يحول الشجرة من برج عمودي
              إلى مظلة منتجة.
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  عدد الفروع
                </div>
                <div className="text-sm font-black font-mono text-emerald-600">
                  {isPruned ? "4 فروع" : "1 فرع"}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  التعرض للضوء
                </div>
                <div className="text-sm font-black font-mono text-amber-600">
                  {isPruned ? "ممتاز" : "ضعيف"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

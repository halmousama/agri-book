import { useState, useEffect, useCallback } from "react";
import {
  ThermometerSnowflake,
  Sprout,
  Snowflake,
  Sun,
  AlertTriangle,
  CheckCircle,
  Timer,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

type Season = "winter" | "spring";

export const ChillingHoursSim = () => {
  const [accumulatedHours, setAccumulatedHours] = useState(0);
  const [isWinter, setIsWinter] = useState(true);
  const [day, setDay] = useState(1);

  const CHILLING_THRESHOLD = 800;
  const IS_MET = accumulatedHours >= CHILLING_THRESHOLD;

  useEffect(() => {
    if (!isWinter) return;
    const timer = setInterval(() => {
      setAccumulatedHours((prev) => {
        if (prev >= 1200) return prev;
        return prev + 8 + Math.floor(Math.random() * 5);
      });
      setDay((d) => d + 1);
    }, 400);
    return () => clearInterval(timer);
  }, [isWinter]);

  const transitionToSpring = useCallback(() => {
    setIsWinter(false);
  }, []);

  const reset = useCallback(() => {
    setAccumulatedHours(0);
    setIsWinter(true);
    setDay(1);
  }, []);

  const progress = Math.min((accumulatedHours / CHILLING_THRESHOLD) * 100, 100);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <ThermometerSnowflake className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">ساعة البرودة (Chilling Hours)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">كسر سكون الأشجار الشتوي لضمان إزهار متجانس</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5 bg-slate-100 border-slate-200 text-slate-600">
              <Timer size={14} />
              <span>اليوم {day}</span>
            </motion.div>
            <motion.div
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
                isWinter
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : IS_MET
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-red-50 border-red-300 text-red-700"
              )}
            >
              {isWinter ? "❄ شتاء" : IS_MET ? "🌿 إزهار ناجح" : "🍂 فشل الإزهار"}
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <motion.div
              className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-inner"
              animate={{
                background: isWinter
                  ? "linear-gradient(180deg, #1e3a5f 0%, #94a3b8 100%)"
                  : "linear-gradient(180deg, #38bdf8 0%, #fef08a 100%)",
              }}
            >
              {isWinter && (
                <div className="absolute inset-0">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white rounded-full"
                      initial={{ x: Math.random() * 280, y: -10 }}
                      animate={{
                        y: [0, 320],
                        x: `${20 + Math.random() * 80}%`,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              )}

              {!isWinter && (
                <motion.div
                  className="absolute top-4 right-6 w-12 h-12 bg-yellow-400 rounded-full shadow-xl"
                  animate={{ boxShadow: "0 0 40px rgba(250,204,21,0.6)" }}
                />
              )}

              <svg viewBox="0 0 200 280" className="absolute bottom-0 w-full h-full">
                <defs>
                  <filter id="chillGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect x="85" y="140" width="30" height="120" fill="#78350f" rx="4" />

                {isWinter && (
                  <g>
                    <path
                      d="M100,160 L60,130 M100,180 L140,150 M100,200 L70,180"
                      stroke="#78350f"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {accumulatedHours > 400 && (
                      <g>
                        <circle cx="60" cy="130" r="4" fill="#fbbf24" />
                        <circle cx="140" cy="150" r="4" fill="#fbbf24" />
                        <circle cx="70" cy="180" r="4" fill="#fbbf24" />
                      </g>
                    )}
                    {accumulatedHours > CHILLING_THRESHOLD * 0.75 && (
                      <g>
                        <circle cx="55" cy="125" r="3" fill="#86efac" />
                        <circle cx="145" cy="145" r="3" fill="#86efac" />
                      </g>
                    )}
                  </g>
                )}

                {!isWinter && IS_MET && (
                  <g>
                    {[
                      [50, 120], [70, 100], [100, 80], [130, 100], [150, 120], [85, 130], [115, 130]
                    ].map(([cx, cy], i) => (
                      <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: "spring" }}>
                        <circle cx={cx} cy={cy} r="12" fill="#fbcfe8" filter="url(#chillGlow)" />
                        <circle cx={cx} cy={cy} r="4" fill="#facc15" />
                      </motion.g>
                    ))}
                  </g>
                )}

                {!isWinter && !IS_MET && (
                  <g>
                    <text x="100" y="90" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">لم تزهر!</text>
                    <circle cx="60" cy="110" r="8" fill="#86efac" opacity="0.5" />
                    <circle cx="140" cy="120" r="8" fill="#86efac" opacity="0.5" />
                    <circle cx="100" cy="95" r="6" fill="#86efac" opacity="0.4" />
                  </g>
                )}
              </svg>

              {isWinter && (
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
                  <span className="text-[10px] font-bold text-slate-600">
                    {accumulatedHours >= CHILLING_THRESHOLD ? "✅ اكتملت ساعات البرودة!" : `⏳ ${Math.round(progress)}% من الهدف`}
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-800 flex items-center gap-2">
                  <ThermometerSnowflake size={18} /> الساعات المتراكمة (&lt;7°C)
                </span>
                <span className="font-mono font-black text-2xl text-blue-700">{accumulatedHours}</span>
              </div>
              <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 40, damping: 20 }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs font-bold text-blue-500">
                <span>0</span>
                <span>الحد: {CHILLING_THRESHOLD}</span>
                <span>1200</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 p-3 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isWinter ? (
                    <Snowflake className="text-blue-400" size={18} />
                  ) : (
                    <Sun className="text-amber-400" size={18} />
                  )}
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    {isWinter ? "الشتاء — تراكم البرودة" : "الربيع — الإزهار"}
                  </span>
                </div>
                {!isWinter && (
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    IS_MET ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {IS_MET ? "ناجح ✓" : "فاشل ✗"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {isWinter ? (
                  <button
                    onClick={transitionToSpring}
                    className="col-span-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all active:scale-[0.97] shadow-lg shadow-amber-200 text-sm flex items-center justify-center gap-2"
                  >
                    <Sun size={16} /> أنهِ الشتاء — ادخل الربيع
                  </button>
                ) : (
                  <button
                    onClick={reset}
                    className="col-span-2 py-2.5 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> إعادة التجربة
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">الساعات المتراكمة</div>
                <div className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">{accumulatedHours}</div>
              </div>
              <div className={cn(
                "p-3 rounded-xl border",
                IS_MET ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
              )}>
                <div className="text-[10px] font-bold text-slate-600">نسبة الإنجاز</div>
                <div className={cn("text-xl font-black font-mono", IS_MET ? "text-emerald-600" : "text-amber-600")}>
                  {Math.round(progress)}%
                </div>
              </div>
            </div>

            <motion.div
              key={isWinter ? "winter" : IS_MET ? "success" : "fail"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isWinter ? (
                <Alert type="info" title="❄ تراكم البرودة...">
                  الأشجار تحتاج {CHILLING_THRESHOLD} ساعة تحت 7°C لتكسر سكونها. الآن لديك {accumulatedHours} ساعة ({Math.round(progress)}%). استمر في التبريد — كلما زادت الساعات، كان الإزهار أقوى وأكثر تجانساً في الربيع.
                </Alert>
              ) : IS_MET ? (
                <Alert type="success" title="✅ إزهار متجانس وقوي!">
                  مبروك! الشجرة حصلت على {accumulatedHours} ساعة برودة. دخلت الربيع بقوة، البراعم الزهرية انفجرت بشكل متجانس — يضمن هذا عقداً ممتازاً للثمار ومحصولاً وفيراً بعد {day} يوماً من التراكم.
                </Alert>
              ) : (
                <Alert type="danger" title="🚨 نقص حاد في ساعات البرودة!">
                  لديك {accumulatedHours} ساعة فقط من أصل {CHILLING_THRESHOLD} المطلوبة. الإزهار سيكون ضعيفاً ومتأخراً، والعقد سيكون فاشلاً. اختر أصنافاً تحتاج ساعات برودة أقل (Low Chill) تناسب منطقتك الدافئة.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

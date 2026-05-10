import { useState, useRef, useEffect, useCallback } from "react";
import {
  Scan,
  Gauge,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Apple,
  ArrowRightLeft,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type FruitStatus = "good" | "bad" | "unripe";

interface Fruit {
  id: number;
  status: FruitStatus;
  rejected: boolean;
}

const fruitColors: Record<FruitStatus, string> = {
  good: "#ef4444",
  bad: "#450a0a",
  unripe: "#22c55e",
};

const fruitLabels: Record<FruitStatus, string> = {
  good: "سليم",
  bad: "فاسد",
  unripe: "غير ناضج",
};

export const AiSortingSim = () => {
  const [strictness, setStrictness] = useState(50);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [totalSorted, setTotalSorted] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const idRef = useRef(0);

  const wastePct = totalSorted > 0 ? Math.round((rejected / totalSorted) * 100) : 0;
  const badPassThroughRate = Math.max(0, 1 - strictness / 100);
  const qualityScore = Math.round(100 - badPassThroughRate * 60);
  const profitEstimate = Math.round((accepted * 3 - rejected * 1.5 - totalSorted * 0.2) * 10);

  const optimalStrictness = 75;
  const strictnessAdvice =
    strictness < 50
      ? "⚠ الصرامة منخفضة جداً — فواكه فاسدة تتسرب للتصدير"
      : strictness > 90
        ? "⚠ الصرامة عالية جداً — خسارة في الفواكه السليمة"
        : Math.abs(strictness - optimalStrictness) <= 15
          ? "✅ صرامة مثالية — توازن ممتاز بين الجودة والهدر"
          : strictness < optimalStrictness
            ? "⬆ ارفع الصرامة قليلاً لتحسين الجودة"
            : "⬇ اخفض الصرامة قليلاً لتقليل الهدر";

  const generateFruit = useCallback(() => {
    idRef.current += 1;
    const rand = Math.random();
    let status: FruitStatus;
    if (rand < 0.25) status = "bad";
    else if (rand < 0.4) status = "unripe";
    else status = "good";

    let rejected = false;
    if (status === "bad") {
      rejected = strictness >= 20 || Math.random() < strictness / 100;
    } else if (status === "unripe") {
      rejected = strictness >= 80;
    } else {
      rejected = strictness >= 90 && Math.random() < (strictness - 90) / 10;
    }
    return { id: idRef.current, status, rejected };
  }, [strictness]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setFruits((prev) => {
        const newFruit = generateFruit();
        const updated = [...prev, newFruit];
        if (updated.length > 10) {
          const removed = updated.slice(0, updated.length - 10);
          removed.forEach((f) => {
            if (f.rejected) setRejected((r) => r + 1);
            else setAccepted((a) => a + 1);
          });
          setTotalSorted((t) => t + removed.length);
          return updated.slice(updated.length - 10);
        }
        return updated;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isRunning, generateFruit]);

  const reset = useCallback(() => {
    setFruits([]);
    setAccepted(0);
    setRejected(0);
    setTotalSorted(0);
    idRef.current = 0;
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-violet-200 dark:border-violet-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl shadow-lg shadow-violet-200/50">
              <Scan className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">الفرز الذكي بالرؤية الحاسوبية (AI Sorting)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">جهاز فرز آلي يعمل بالذكاء الاصطناعي</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning((r) => !r)}
              className={cn(
                "px-4 py-1.5 rounded-xl text-xs font-bold border-2 transition-all",
                isRunning
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                  : "bg-amber-50 border-amber-300 text-amber-700"
              )}
            >
              {isRunning ? "🟢 تشغيل" : "⏸ إيقاف"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-1.5 rounded-xl text-xs font-bold border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              إعادة تعيين
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== Visual Lab ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <marker id="arrowGreen" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4" fill="#10b981" />
                </marker>
                <marker id="arrowRed" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                  <path d="M0,0 L4,2 L0,4" fill="#ef4444" />
                </marker>
              </defs>

              <rect width="200" height="280" fill="url(#bgGrad)" rx="8" />

              {/* === Conveyor Belt === */}
              <rect x="0" y="120" width="200" height="12" rx="2" fill="#334155" />
              <rect x="0" y="122" width="200" height="8" rx="2" fill="#1e293b" />
              {[20, 60, 100, 140, 180].map((x) => (
                <g key={`roller-${x}`}>
                  <circle cx={x} cy="126" r="8" fill="#475569" stroke="#64748b" strokeWidth="1" />
                  <circle cx={x} cy="126" r="2" fill="#94a3b8" />
                </g>
              ))}
              <motion.line x1="0" y1="118" x2="200" y2="118" stroke="#475569" strokeWidth="1" strokeDasharray="6 4"
                animate={{ x: [0, -20] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />

              {/* === AI Vision Station === */}
              <g transform="translate(110, 80)">
                <rect x="-8" y="-5" width="16" height="55" rx="3" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.7" />
                <motion.line x1="-8" y1="45" x2="8" y2="45" stroke="#a855f7" strokeWidth="2" opacity="0.8"
                  animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.3, repeat: Infinity }} />
                <rect x="-6" y="-8" width="12" height="8" rx="2" fill="#a855f7" />
                <circle cx="0" cy="-4" r="2" fill="#e9d5ff" />
                <text x="0" y="-12" textAnchor="middle" fontSize="6" fill="#a855f7" fontWeight="bold">AI</text>
              </g>

              {/* === Fruits === */}
              <AnimatePresence mode="popLayout">
                {fruits.map((fruit, index) => {
                  const xPos = 10 + index * 18;
                  return (
                    <motion.g
                      key={fruit.id}
                      initial={{ x: 220, opacity: 0 }}
                      animate={{ x: xPos, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <circle cx={xPos} cy={116} r="7" fill={fruitColors[fruit.status]}
                        stroke={fruit.status === "good" ? "#b91c1c" : fruit.status === "bad" ? "#000" : "#15803d"} strokeWidth="1" />
                      <path d={`M${xPos + 3},110 Q${xPos + 8},107 ${xPos + 6},112`} fill="#22c55e" stroke="#15803d" strokeWidth="0.5" />
                      {fruit.status === "bad" && (
                        <>
                          <circle cx={xPos - 2} cy={114} r="2" fill="#000" />
                          <circle cx={xPos + 2} cy={117} r="1.5" fill="#000" />
                        </>
                      )}
                      {fruit.rejected && xPos > 115 && (
                        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <line x1={xPos - 4} y1={112} x2={xPos + 4} y2={120} stroke="#ef4444" strokeWidth="2" />
                          <line x1={xPos + 4} y1={112} x2={xPos - 4} y2={120} stroke="#ef4444" strokeWidth="2" />
                        </motion.g>
                      )}
                    </motion.g>
                  );
                })}
              </AnimatePresence>

              {/* === Bins === */}
              <g transform="translate(15, 145)">
                <rect x="0" y="0" width="35" height="30" rx="2" fill="#065f46" opacity="0.8" />
                <rect x="2" y="2" width="31" height="26" rx="1" fill="none" stroke="#10b981" strokeWidth="1" />
                <text x="17" y="20" textAnchor="middle" fontSize="7" fill="#10b981" fontWeight="bold">مقبول</text>
              </g>
              <g transform="translate(150, 145)">
                <rect x="0" y="0" width="35" height="30" rx="2" fill="#7f1d1d" opacity="0.8" />
                <rect x="2" y="2" width="31" height="26" rx="1" fill="none" stroke="#ef4444" strokeWidth="1" />
                <text x="17" y="20" textAnchor="middle" fontSize="7" fill="#ef4444" fontWeight="bold">مرفوض</text>
              </g>

              <motion.path d="M40,130 L30,145" stroke="#10b981" strokeWidth="1.5" fill="none" markerEnd="url(#arrowGreen)"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
              <motion.path d="M160,130 L170,145" stroke="#ef4444" strokeWidth="1.5" fill="none" markerEnd="url(#arrowRed)"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />

              {/* === Live count === */}
              <text x="100" y="200" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="bold">تم الفرز: {totalSorted}</text>

              {/* === Legend === */}
              <g transform="translate(30, 215)">
                <circle cx="0" cy="0" r="4" fill="#ef4444" />
                <text x="10" y="3" fontSize="7" fill="#94a3b8">سليم</text>
                <circle cx="60" cy="0" r="4" fill="#450a0a" />
                <text x="70" y="3" fontSize="7" fill="#94a3b8">فاسد</text>
                <circle cx="120" cy="0" r="4" fill="#22c55e" />
                <text x="130" y="3" fontSize="7" fill="#94a3b8">غير ناضج</text>
              </g>
            </svg>
          </div>

          {/* ===== Dashboard Controls ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="مستوى الصرامة"
              value={strictness}
              min={0}
              max={100}
              unit="%"
              color={strictness >= 90 ? "rose" : strictness >= 75 ? "amber" : "purple"}
              onChange={(e) => setStrictness(Number(e.target.value))}
            />

            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-2">
              <span>⬅ سماح (هدر قليل)</span>
              <span className="text-purple-500">⬅ مثالي ({optimalStrictness}%)</span>
              <span>⬅ صرامة (هدر عال) ➡</span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <div className="text-[10px] font-bold text-purple-700 mb-1">تم الفرز</div>
                <div className="text-xl font-black font-mono text-purple-600">{totalSorted}</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-700 mb-1">مقبول</div>
                <div className="text-xl font-black font-mono text-emerald-600">{accepted}</div>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 border border-rose-200">
                <div className="text-[10px] font-bold text-rose-700 mb-1">مرفوض</div>
                <div className="text-xl font-black font-mono text-rose-600">{rejected}</div>
              </div>
            </div>

            {/* Advanced Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className={cn("rounded-xl p-3 border", wastePct > 40 ? "bg-red-50 border-red-200" : wastePct > 20 ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200")}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400">هدر %</div>
                <div className={cn("text-lg font-black", wastePct > 40 ? "text-red-600" : wastePct > 20 ? "text-amber-600" : "text-emerald-600")}>{wastePct}%</div>
              </div>
              <div className={cn("rounded-xl p-3 border", qualityScore > 80 ? "bg-emerald-50 border-emerald-200" : qualityScore > 60 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400">الجودة</div>
                <div className={cn("text-lg font-black", qualityScore > 80 ? "text-emerald-600" : qualityScore > 60 ? "text-amber-600" : "text-red-600")}>{qualityScore}%</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">الربح المتوقع</div>
                <div className="text-lg font-black text-amber-600 dark:text-amber-400">{profitEstimate}$</div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`diag-${strictness}-${totalSorted}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {(strictness < 50 && totalSorted > 5) || (strictness > 90 && totalSorted > 5) ? (
                <Alert type="warning" title={strictness < 50 ? "⚠ جودة منخفضة — فواكه فاسدة تتسرب" : "⚠ هدر عالي — خسارة في الفواكه السليمة"}>
                  {strictness < 50
                    ? `بصرامة ${strictness}%، الفواكه الفاسدة تمر عبر جهاز الفرز. الجودة عند ${qualityScore}%. الهدر قليل (${wastePct}%) لكن السمعة تخسر. ارفع الصرامة إلى 70-80%.`
                    : `بصرامة ${strictness}%، حتى الفواكه السليمة تُرفض! الهدر ${wastePct}% والربح ${profitEstimate}$. اخفض الصرامة إلى 70-80% لتقليل الخسارة.`}
                </Alert>
              ) : strictness >= 60 && strictness <= 90 && totalSorted > 5 ? (
                <Alert type="success" title="✅ توازن مثالي بين الجودة والهدر">
                  صرامة {strictness}% تحقق جودة {qualityScore}% مع هدر {wastePct}% فقط. الربح المتوقع {profitEstimate}$.{" "}
                  {Math.abs(strictness - optimalStrictness) <= 15
                    ? "هذه هي النقطة المثلى! استمر."
                    : strictness < optimalStrictness
                      ? "ارفعها قليلاً نحو 75% لتحسين الجودة."
                      : "اخفضها قليلاً نحو 75% لتقليل الهدر."}
                </Alert>
              ) : (
                <Alert type="info" title="⏳ قيد التشغيل...">
                  اضبط مستوى الصرامة وراقب النتائج. الهدف: تحقيق أقصى ربح بأقل هدر مع الحفاظ على جودة التصدير. الصرامة المثلى حوالي {optimalStrictness}%.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

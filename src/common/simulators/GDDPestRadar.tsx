import { useState, useCallback } from "react";
import {
  Thermometer,
  Bug,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Crosshair,
  RotateCcw,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const GDDPestRadar = () => {
  const [dailyTemp, setDailyTemp] = useState(22);
  const [gdd, setGdd] = useState(0);
  const [day, setDay] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [hatched, setHatched] = useState(false);

  const BASE_TEMP = 10;
  const HATCH_THRESHOLD = 150;

  const addDay = useCallback(() => {
    if (!isActive) return;
    const dailyGdd = Math.max(0, dailyTemp - BASE_TEMP);
    setGdd((prev) => {
      const next = prev + dailyGdd;
      if (next >= HATCH_THRESHOLD && prev < HATCH_THRESHOLD) {
        setHatched(true);
        setIsActive(false);
      }
      return next;
    });
    setDay((d) => d + 1);
  }, [dailyTemp, isActive]);

  const reset = useCallback(() => {
    setGdd(0);
    setDay(1);
    setHatched(false);
    setIsActive(true);
  }, []);

  const progress = Math.min((gdd / HATCH_THRESHOLD) * 100, 100);
  const daysToHatch = isActive ? Math.ceil((HATCH_THRESHOLD - gdd) / Math.max(1, dailyTemp - BASE_TEMP)) : 0;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-rose-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-lg shadow-rose-200/50">
              <Crosshair className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">رادار الآفات (GDD)</h3>
              <p className="text-xs text-slate-500">تتبع درجات الحرارة للتنبؤ بفقس بيض الحشرات ومكافحتها</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 bg-slate-100 border-slate-200 text-slate-600 flex items-center gap-1.5">
              <Calendar size={14} /> اليوم {day}
            </motion.div>
            <motion.div
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
                hatched
                  ? "bg-red-50 border-red-300 text-red-700"
                  : progress > 80
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "bg-emerald-50 border-emerald-300 text-emerald-700"
              )}
              animate={hatched ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {hatched ? "🚨 فقس!" : progress > 80 ? "⚠ خطر" : "✅ آمن"}
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 shadow-inner bg-gradient-to-b from-sky-100 to-sky-50">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }}
              />

              <svg viewBox="0 0 200 280" className="absolute bottom-0 w-full h-full">
                <defs>
                  <filter id="pestGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Radar effect when danger */}
                {progress > 50 && !hatched && (
                  <motion.circle
                    cx="100" cy="120" r="60"
                    fill="url(#radarGrad)"
                    animate={{ r: [50, 70, 50], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Leaf */}
                <g transform="translate(100, 120)">
                  <path
                    d="M0,60 Q-50,20 -60,-30 Q-20,-50 0,-60 Q20,-50 60,-30 Q50,20 0,60"
                    fill="#22c55e" stroke="#16a34a" strokeWidth="2"
                  />
                  <path d="M0,60 L0,-55" stroke="#15803d" strokeWidth="1.5" opacity="0.5" />

                  {/* Eggs */}
                  <AnimatePresence>
                    {!hatched &&
                      Array.from({ length: 8 }).map((_, i) => (
                        <motion.circle
                          key={`egg-${i}`}
                          cx={-15 + Math.random() * 30}
                          cy={-10 + Math.random() * 20}
                          r="2"
                          fill="#facc15"
                          opacity="0.8"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                  </AnimatePresence>

                  {/* Hatched larvae */}
                  <AnimatePresence>
                    {hatched &&
                      Array.from({ length: 6 }).map((_, i) => (
                        <motion.g key={`larvae-${i}`}>
                          <motion.circle
                            cx={-10 + Math.random() * 20}
                            cy={-5 + Math.random() * 15}
                            r="4"
                            fill="#dc2626"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.5, 1] }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            filter="url(#pestGlow)"
                          />
                          <motion.path
                            d="M-12,0 Q-8,5 -4,0"
                            stroke="#dc2626" strokeWidth="1" fill="none"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        </motion.g>
                      ))}
                  </AnimatePresence>

                  {/* Eating holes */}
                  <AnimatePresence>
                    {hatched &&
                      Array.from({ length: 4 }).map((_, i) => (
                        <motion.circle
                          key={`hole-${i}`}
                          cx={-20 + Math.random() * 40}
                          cy={-15 + Math.random() * 30}
                          r="5"
                          fill="#78350f"
                          opacity="0.6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.2 }}
                        />
                      ))}
                  </AnimatePresence>
                </g>

                {/* GDD bar */}
                <g transform="translate(10, 230)">
                  <rect x="0" y="0" width="180" height="16" rx="8" fill="#e2e8f0" />
                  <motion.rect
                    x="0" y="0" height="16" rx="8"
                    fill={hatched ? "#ef4444" : progress > 80 ? "#f59e0b" : "#22c55e"}
                    animate={{ width: `${Math.min(gdd / HATCH_THRESHOLD * 180, 180)}px` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <line x1={120} y1="-4" x2={120} y2="20" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
                  <text x={120} y="30" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">عتبة الفقس</text>
                </g>

                {/* Status label */}
                <text x="100" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill={hatched ? "#dc2626" : progress > 80 ? "#d97706" : "#16a34a"}>
                  {hatched ? "🚨 هجوم اليرقات!" : progress > 50 ? "⚠ اقتراب الخطر" : "✅ آمن"}
                </text>
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="حرارة اليوم"
              value={dailyTemp}
              min={10}
              max={40}
              unit="°C"
              color={dailyTemp > 30 ? "rose" : dailyTemp > 25 ? "amber" : "emerald"}
              onChange={(e) => setDailyTemp(Number(e.target.value))}
            />

            <div className="bg-slate-800 text-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 font-bold">وحدات الحرارة المتراكمة (GDD)</span>
                <span className="font-mono font-black text-2xl">{gdd.toFixed(0)}</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0</span>
                <span>عتبة الفقس: {HATCH_THRESHOLD}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={cn(
                "rounded-xl p-3 border",
                hatched ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"
              )}>
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <Calendar size={12} /> GDD اليوم
                </div>
                <div className="text-lg font-black font-mono text-slate-800">
                  {Math.max(0, dailyTemp - BASE_TEMP).toFixed(1)}
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                <div className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                  <Bug size={12} /> الأيام المتبقية
                </div>
                <div className="text-lg font-black font-mono text-amber-700">
                  {isActive ? daysToHatch : 0}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={addDay}
                disabled={!isActive}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] shadow-md flex items-center justify-center gap-1.5 text-sm",
                  isActive
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                <Plus size={16} /> أضف يوماً
              </button>
              <button
                onClick={reset}
                className="py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm"
              >
                <RotateCcw size={16} /> إعادة المحاكاة
              </button>
            </div>

            <motion.div
              key={hatched ? "hatched" : gdd.toFixed(0)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {hatched ? (
                <Alert type="danger" title="🚨 فقس البيض! هجوم اليرقات!">
                  بعد {day} يوماً من تراكم الحرارة، وصل إجمالي GDD إلى {gdd.toFixed(0)} — متجاوزاً عتبة الـ {HATCH_THRESHOLD}. فقس البيض وتحول إلى يرقات تأكل الورقة! رش المبيد الحشري الآن — لكنك تأخرت قليلاً. المرة القادمة، ارش قبل {daysToHatch + 3} أيام من الوصول للعتبة.
                </Alert>
              ) : progress > 80 ? (
                <Alert type="warning" title={`⚠ اقتربنا من عتبة الفقس (${Math.round(progress)}%)`}>
                  بعد {day} يوماً، لدينا {gdd.toFixed(0)} GDD. العتبة {HATCH_THRESHOLD} GDD. باقٍ {daysToHatch} أيام على الفقس. هذا هو وقت الرش الوقائي بالضبط — ارش الآن قبل أن يفقس البيض!
                </Alert>
              ) : (
                <Alert type="success" title={`✅ الوضع آمن (${Math.round(progress)}%)`}>
                  بعد {day} يوماً، لدينا {gdd.toFixed(0)} GDD من أصل {HATCH_THRESHOLD}. باقٍ {daysToHatch} أيام تقريباً للوصول لعتبة الفقس. لديك متسع من الوقت — استعد للرش الوقائي قبل {daysToHatch - 2} أيام من بلوغ العتبة.
                </Alert>
              )}
            </motion.div>

            {isActive && (
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 rounded-xl p-2 text-center text-xs text-amber-800 font-bold shadow-sm">
                💡 نصيحة: الحرارة اليوم {dailyTemp}°C تعطي GDD = {Math.max(0, dailyTemp - BASE_TEMP).toFixed(1)}/يوم. أيام حتى الفقس: {daysToHatch}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

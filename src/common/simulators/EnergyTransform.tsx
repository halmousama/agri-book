import { useState } from "react";
import { Sun, BatteryCharging, Zap, ArrowRight, Leaf, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const EnergyTransform = () => {
  const [sunIntensity, setSunIntensity] = useState(50);

  const photosynthesisRate = Math.round(sunIntensity * 0.8);
  const energyStored = Math.round((sunIntensity / 100) * 500);
  const efficiency = sunIntensity > 0 ? Math.round((1 - (100 - sunIntensity) / 100) * 100) : 0;
  const isGood = sunIntensity >= 40 && sunIntensity <= 80;
  const isLow = sunIntensity < 20;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200 dark:border-cyan-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">سلسلة الطاقة (التحولات)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">من ضوء الشمس → التمثيل الضوئي → طاقة حركة</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isLow
                ? "bg-red-50 border-red-300 text-red-700"
                : isGood
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                  : "bg-amber-50 border-amber-300 text-amber-700"
            )}
          >
            {isLow ? "☁ طاقة منخفضة" : isGood ? "☀ تدفق مثالي" : "☀ طاقة عالية"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري — سلسلة الطاقة ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-inner">
              <svg viewBox="0 0 240 280" className="w-full h-full">
                <defs>
                  <linearGradient id="sunRayGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                  <filter id="energyGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background */}
                <rect x="0" y="0" width="240" height="280" fill="#f8fafc" rx="12" />

                {/* === Stage 1: Sun === */}
                <g transform="translate(120, 30)">
                  <motion.circle
                    cx="0" cy="0" r="22"
                    fill={sunIntensity > 0 ? "#fbbf24" : "#94a3b8"}
                    animate={{
                      r: sunIntensity > 0 ? [22, 26, 22] : 22,
                      boxShadow: sunIntensity > 0 ? "0 0 40px rgba(251,191,36,0.6)" : "none",
                    }}
                    transition={{ duration: 2, repeat: sunIntensity > 0 ? Infinity : 0 }}
                    filter="url(#energyGlow)"
                  />
                  {sunIntensity > 0 && (
                    <>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.line
                          key={`ray-${i}`}
                          x1="0" y1="0"
                          x2={Math.cos((i * Math.PI * 2) / 8) * 35}
                          y2={Math.sin((i * Math.PI * 2) / 8) * 35}
                          stroke="#fbbf24" strokeWidth="2" opacity="0.4"
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </>
                  )}
                  <text x="0" y="-32" textAnchor="middle" fontSize="9" fill="#d97706" fontWeight="bold">1. الشمس</text>
                </g>

                {/* Arrow 1 */}
                <g transform="translate(120, 80)">
                  {sunIntensity > 0 && (
                    <motion.g
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <path d="M-15,0 L15,0" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow)" />
                      <polygon points="15,-4 20,0 15,4" fill="#d97706" />
                    </motion.g>
                  )}
                </g>

                {/* === Stage 2: Leaf (Photosynthesis) === */}
                <g transform="translate(120, 120)">
                  <motion.g
                    animate={{
                      scale: 0.5 + (sunIntensity / 100) * 0.5,
                    }}
                  >
                    <path d="M0,-20 Q-20,-25 -22,-10 Q-24,5 0,20 Q24,5 22,-10 Q20,-25 0,-20" fill="#22c55e" filter="url(#energyGlow)" />
                    <path d="M0,-18 L0,18" stroke="#16a34a" strokeWidth="1.5" />
                  </motion.g>
                  <text x="0" y="30" textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="bold">2. الورقة (سكر)</text>
                </g>

                {/* Arrow 2 */}
                <g transform="translate(120, 170)">
                  {sunIntensity > 0 && (
                    <motion.g
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <path d="M-15,0 L15,0" stroke="#16a34a" strokeWidth="2" />
                      <polygon points="15,-4 20,0 15,4" fill="#16a34a" />
                    </motion.g>
                  )}
                </g>

                {/* === Stage 3: Human === */}
                <g transform="translate(120, 215)">
                  <motion.g
                    animate={{ scale: 0.5 + (sunIntensity / 100) * 0.5 }}
                  >
                    <circle cx="0" cy="-12" r="8" fill="#fbbf24" opacity="0.8" />
                    <path d="M-10,-2 L10,-2 L8,18 L-8,18 Z" fill="#f97316" opacity="0.7" />
                    <motion.circle
                      cx="0" cy="-12" r="6"
                      fill="#fcd34d"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.g>
                  <text x="0" y="30" textAnchor="middle" fontSize="9" fill="#ea580c" fontWeight="bold">3. الإنسان (حركة)</text>
                </g>

                {/* Energy particles flowing through the chain */}
                <AnimatePresence>
                  {sunIntensity > 0 && (
                    <g>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.circle
                          key={`p-${i}`}
                          r="3"
                          fill={i < 2 ? "#fbbf24" : i < 4 ? "#22c55e" : "#f97316"}
                          filter="url(#energyGlow)"
                          initial={{ x: 120, y: 52 }}
                          animate={{
                            x: [120, 120, 120, 120, 120],
                            y: [52, 80, 120, 170, 215],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </g>
                  )}
                </AnimatePresence>

                {/* Efficiency meter */}
                <g transform="translate(10, 255)">
                  <rect x="0" y="0" width="220" height="8" rx="4" fill="#e2e8f0" />
                  <motion.rect
                    x="0" y="0" height="8" rx="4"
                    fill={efficiency > 60 ? "#22c55e" : efficiency > 30 ? "#f59e0b" : "#ef4444"}
                    animate={{ width: `${efficiency * 2.2}px` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <text x="110" y="20" textAnchor="middle" fontSize="7" fill="#64748b">كفاءة التحويل: {efficiency}%</text>
                </g>
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="قوة المصدر (الشمس)"
              value={sunIntensity}
              min={0}
              max={100}
              unit="%"
              color={sunIntensity < 20 ? "rose" : "amber"}
              onChange={(e) => setSunIntensity(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                <div className="text-[10px] font-bold text-amber-800 flex items-center gap-1.5">
                  <Sun size={12} /> التمثيل الضوئي
                </div>
                <div className="text-lg font-black font-mono text-amber-700">{photosynthesisRate}%</div>
                <div className="w-full h-1.5 bg-amber-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-amber-500"
                    animate={{ width: `${photosynthesisRate}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1.5">
                  <Leaf size={12} /> الطاقة المخزنة
                </div>
                <div className="text-lg font-black font-mono text-emerald-700">{energyStored} J</div>
                <div className="w-full h-1.5 bg-emerald-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-emerald-500"
                    animate={{ width: `${(energyStored / 500) * 100}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                  <BatteryCharging size={14} className="text-emerald-600 dark:text-emerald-400" /> إجمالي الطاقة
                </span>
                <span className="font-mono font-black text-2xl text-emerald-600 dark:text-emerald-400">{energyStored}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"
                  animate={{ width: `${(energyStored / 500) * 100}%` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                <span>0 J</span>
                <span>500 J (كحد أقصى)</span>
              </div>
            </div>

            <motion.div
              key={`energy-${sunIntensity}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isLow ? (
                <Alert type="warning" title="☁ طاقة شمسية منخفضة">
                  شدة الشمس {sunIntensity}% — التمثيل الضوئي شبه متوقف ({photosynthesisRate}%). النبات يستهلك مخزونه من السكر ولن ينمو. هذا يشبه يوم غائم شتوي — لا طاقة كافية للتحويل.
                </Alert>
              ) : sunIntensity > 80 ? (
                <Alert type="info" title="☀ طاقة شمسية عالية جداً">
                  شدة الشمس {sunIntensity}% — التمثيل الضوئي عند ذروته ({photosynthesisRate}%). لكن الحرارة الزائدة قد تغلق الثغور وتوقف التبريد — النبات يدخل في إجهاد حراري. مثالية مع الري الكافي.
                </Alert>
              ) : (
                <Alert type="success" title="✅ تدفق طاقة مثالي">
                  شدة الشمس {sunIntensity}% تنتج {energyStored} جول من الطاقة المخزنة في السكريات. كفاءة التحويل {efficiency}% — هذا هو النطاق الأمثل لعملية البناء الضوئي. النبات يزدهر!
                </Alert>
              )}
            </motion.div>

            <div className="bg-gradient-to-r from-amber-50 to-cyan-50 dark:from-amber-900/20 dark:to-cyan-900/20 border border-amber-200 dark:border-amber-700/30 rounded-xl p-3 text-center text-xs text-amber-800 dark:text-amber-200 font-bold shadow-sm">
              💡 نحن نزرع "طاقة". أنت تأخذ طاقة الشمس المجانية، وتخزنها في "بطاريات" تسمى ثماراً وحبوباً لتبيعها.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

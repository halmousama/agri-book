import { useState } from "react";
import { Flame, ThermometerSun, Wind, AlertTriangle, CheckCircle, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const CompostCycle = () => {
  const [browns, setBrowns] = useState(50);
  const [greens, setGreens] = useState(50);

  const ratio = browns / (greens === 0 ? 1 : greens);
  const total = browns + greens;

  const isPerfect = ratio >= 1.5 && ratio <= 2.5;
  const isTooGreen = ratio < 1.5;
  const isTooBrown = ratio > 2.5;

  const temp = isPerfect ? 65 : isTooGreen ? 30 : 20;
  const moisture = isPerfect ? 55 : isTooGreen ? 80 : 30;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Flame className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">مفاعل التدوير (الكمبوست)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">موازنة الكربون والنيتروجين لتحويل المخلفات إلى سماد عضوي</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isPerfect
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : isTooGreen
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "bg-amber-50 border-amber-300 text-amber-700"
            )}
          >
            {isPerfect ? "✅ مفاعل مثالي" : isTooGreen ? "⚠ نيتروجين زائد" : "⚠ كربون زائد"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              {/* Temperature badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border font-bold z-10">
                <ThermometerSun
                  size={14}
                  className={isPerfect ? "text-red-500" : "text-blue-500"}
                />
                <span className={cn("text-xs", isPerfect ? "text-red-600" : "text-slate-600")}>
                  {temp}°C
                </span>
              </div>

              {/* Moisture badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border font-bold z-10">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-xs text-blue-600">{moisture}%</span>
              </div>

              <svg viewBox="0 0 200 200" className="w-full h-full absolute bottom-0">
                <defs>
                  <filter id="heatGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="pileGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#78350f" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
                  </radialGradient>
                </defs>

                <motion.path
                  d="M30,180 Q100,40 170,180 Z"
                  fill="url(#pileGrad)"
                  animate={{ d: isPerfect
                    ? "M20,180 Q100,30 180,180 Z"
                    : isTooGreen
                      ? "M35,180 Q100,60 165,180 Z"
                      : "M40,180 Q100,80 160,180 Z"
                  }}
                  transition={{ type: "spring", stiffness: 30 }}
                />

                <motion.path
                  d="M60,180 Q100,60 140,180 Z"
                  fill="#22c55e"
                  opacity="0.5"
                  animate={{ scaleY: greens / 100, opacity: greens / 150 }}
                  style={{ originY: "180px" }}
                />

                <AnimatePresence>
                  {isPerfect && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[
                        { cx: 100, cy: 130, r: 12 },
                        { cx: 80, cy: 140, r: 8 },
                        { cx: 120, cy: 120, r: 10 },
                      ].map((h, i) => (
                        <circle
                          key={`heat-${i}`}
                          cx={h.cx} cy={h.cy} r={h.r}
                          fill="#ef4444" opacity="0.6"
                          filter="url(#heatGlow)"
                          className="animate-pulse"
                        />
                      ))}
                      <path
                        d="M100,120 Q90,70 100,30"
                        stroke="white" strokeWidth="2" fill="none" opacity="0.4"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <path
                        d="M100,120 Q110,60 100,20"
                        stroke="white" strokeWidth="1.5" fill="none" opacity="0.3"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <text x="100" y="15" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
                        ♨ نشاط ميكروبي!
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTooGreen && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <circle cx="100" cy="100" r="25" fill="#166534" opacity="0.15" filter="blur(10px)" />
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.circle
                          key={`ammonia-${i}`}
                          cx={80 + i * 20}
                          cy={80 + (i % 2) * 10}
                          r="4"
                          fill="#84cc16"
                          opacity="0.4"
                          animate={{ cy: [80, 50, 80], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                      <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#14532d" fontWeight="bold">
                        عفن ورائحة!
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isTooBrown && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <text x="100" y="100" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="bold">
                        🍂 جافة وخاملة
                      </text>
                      <path d="M60,90 L80,70 M140,90 L120,70" stroke="#92400e" strokeWidth="1.5" opacity="0.4" />
                    </motion.g>
                  )}
                </AnimatePresence>

                <g transform="translate(10, 185)">
                  <rect x="0" y="0" width="180" height="12" rx="6" fill="#e2e8f0" />
                  <motion.rect
                    x="0" y="0" height="12" rx="6"
                    fill={isPerfect ? "#22c55e" : isTooGreen ? "#3b82f6" : "#d97706"}
                    animate={{ width: `${isPerfect ? 55 : isTooGreen ? 30 : 20}px` }}
                    transition={{ type: "spring", stiffness: 30 }}
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="مواد بنية (كربون — أوراق جافة/تبن)"
              value={browns}
              min={10}
              max={100}
              unit="%"
              color="amber"
              onChange={(e) => setBrowns(Number(e.target.value))}
            />

            <Slider
              label="مواد خضراء (نيتروجين — بقايا طعام/حشائش)"
              value={greens}
              min={10}
              max={100}
              unit="%"
              color="emerald"
              onChange={(e) => setGreens(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">نسبة C:N</div>
                <div className={cn("text-lg font-black font-mono text-slate-800 dark:text-white", isPerfect ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
                  {ratio.toFixed(1)}:1
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-xl border",
                isPerfect ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
              )}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400">درجة الحرارة</div>
                <div className={cn("text-lg font-black font-mono", isPerfect ? "text-red-600" : "text-slate-600")}>
                  {temp}°C
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400 flex items-center gap-1">
                  <Flame size={12} /> النشاط الميكروبي
                </div>
                <div className={cn("text-lg font-black font-mono", isPerfect ? "text-emerald-600" : "text-slate-400")}>
                  {isPerfect ? "🔥 نشط جداً" : isTooGreen ? "💨 لاهوائي" : "💤 خامل"}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400 flex items-center gap-1">
                  <Wind size={12} /> الرائحة
                </div>
                <div className={cn("text-lg font-black font-mono", isPerfect ? "text-emerald-600" : isTooGreen ? "text-red-600" : "text-slate-400")}>
                  {isPerfect ? "🌱 ترابي" : isTooGreen ? "💨 أمونيا" : "🚫 لا شيء"}
                </div>
              </div>
            </div>

            <motion.div
              key={`compost-${ratio.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isPerfect && (
                <Alert type="success" title="✅ مفاعل مثالي!">
                  البكتيريا الهوائية سعيدة جداً بالتوازن ({ratio.toFixed(1)}:1)، الحرارة {temp}°C تقتل بذور الأعشاب والأمراض. الرطوبة {moisture}% مثالية. سيصبح سماداً أسود وممتازاً خلال 4-6 أسابيع فقط — اقلب الكومة مرة أسبوعياً للتهوية.
                </Alert>
              )}
              {isTooGreen && (
                <Alert type="danger" title="🚨 نيتروجين زائد — تعفن!">
                  الكومة مبللة ({moisture}%) وتتعفن، البكتيريا اللاهوائية سيطرت وتفرز غاز الأمونيا (رائحة مجاري). النسبة {ratio.toFixed(1)}:1 — أضف أوراقاً جافة أو تبن فوراً لامتصاص الرطوبة وإعادة التوازن إلى 30:1 تقريباً.
                </Alert>
              )}
              {isTooBrown && (
                <Alert type="warning" title="⚠ كربون زائد — جفاف!">
                  الكومة جافة ({moisture}%) وميتة. النسبة {ratio.toFixed(1)}:1 — سيتطلب التحلل سنوات لأن البكتيريا لا تجد نيتروجين لتتغذى عليه. أضف بقايا خضراء (عشب، قشور خضار) وماء لتنشيط التفاعل.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

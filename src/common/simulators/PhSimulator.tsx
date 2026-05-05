import { useState } from "react";
import {
  Beaker,
  Lock,
  Unlock,
  AlertTriangle,
  Droplets,
  Sprout,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const PhSimulator = () => {
  const [ph, setPh] = useState(7.0);

  const ironAvailability = ph > 7.5 ? 0 : ph > 7.0 ? 40 : 100;
  const macroAvailability = ph >= 6.0 && ph <= 7.5 ? 100 : 60;

  const leafBaseColor = ironAvailability === 0 ? "#fef08a" : "#16a34a";
  const veinColor = "#166534";

  const isPrecipitated = ph > 7.5;
  const isAcidic = ph < 5.5;
  const isOptimal = ph >= 6.0 && ph <= 7.5;
  const isWarning = (ph > 7.0 && ph <= 7.5) || (ph >= 5.5 && ph < 6.0);

  const statusColor = isPrecipitated
    ? "bg-red-100 text-red-700 border-red-300"
    : isAcidic
      ? "bg-orange-100 text-orange-700 border-orange-300"
      : isOptimal
        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
        : "bg-amber-100 text-amber-700 border-amber-300";
  const statusText = isPrecipitated
    ? "🔴 قلوي - حديد محجوب"
    : isAcidic
      ? "🟠 حامضي جداً"
      : isOptimal
        ? "🟢 مثالي"
        : "🟡 حدودي";

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-purple-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-purple-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl shadow-lg shadow-purple-200/50">
              <Beaker className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                مختبر الحموضة (pH)
              </h3>
              <p className="text-xs text-slate-500">
                حموضة التربة وتوفر العناصر الغذائية
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 font-mono",
              statusColor
            )}
            animate={isPrecipitated ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            pH {ph.toFixed(1)} — {statusText}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="soilPh" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={ph > 7.5 ? "#e5e5e5" : "#78350f"}
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor={ph > 7.5 ? "#d4d4d4" : "#451a03"}
                    stopOpacity="0.4"
                  />
                </linearGradient>
                <filter id="glowPh">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="0" y="0" width="200" height="280" fill="#fafaf9" rx="8" />

              {/* === Above ground - plant === */}
              <g transform="translate(100, 0)">
                {/* Stem */}
                <path
                  d="M0,150 L0,80"
                  stroke="#78350f"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Leaf */}
                <g transform="translate(0, 80) scale(1.3)">
                  <motion.path
                    d="M0,0 Q-25,-35 0,-70 Q25,-35 0,0"
                    fill={leafBaseColor}
                    stroke={veinColor}
                    strokeWidth="1"
                    animate={{ scale: isOptimal ? 1 : 0.85 }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <path
                    d="M0,0 L0,-65"
                    stroke={veinColor}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M0,-15 L-12,-22 M0,-15 L12,-22 M0,-30 L-8,-38 M0,-30 L8,-38"
                    stroke={veinColor}
                    strokeWidth="1"
                  />
                </g>
              </g>

              {/* === Soil section === */}
              <rect
                x="0"
                y="150"
                width="200"
                height="130"
                fill="url(#soilPh)"
              />

              {/* === Root system === */}
              <g transform="translate(100, 150)">
                <path
                  d="M0,0 L0,80"
                  stroke="#d97706"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0,20 L20,30"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,40 L-20,50"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Iron particles / precipitate */}
                <AnimatePresence>
                  {isPrecipitated ? (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Solid iron rocks */}
                      <path
                        d="M40,40 L55,32 L62,48 L48,55 Z"
                        fill="#57534e"
                        stroke="#44403c"
                        strokeWidth="0.5"
                      />
                      <text
                        x="48"
                        y="47"
                        fontSize="5"
                        fill="white"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        Fe (Solid)
                      </text>
                      <path
                        d="M130,60 L145,52 L155,68 L138,75 Z"
                        fill="#57534e"
                        stroke="#44403c"
                        strokeWidth="0.5"
                      />

                      {/* Lock on root */}
                      <circle
                        cx="100"
                        cy="65"
                        r="10"
                        fill="white"
                        stroke="#ef4444"
                        strokeWidth="2"
                      />
                      <rect
                        x="97"
                        y="63"
                        width="6"
                        height="5"
                        fill="#ef4444"
                        rx="0.5"
                      />
                      <path
                        d="M98,63 L98,60 Q100,57 102,60 L102,63"
                        stroke="#ef4444"
                        fill="none"
                        strokeWidth="1.5"
                      />
                    </motion.g>
                  ) : (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Dissolved ions */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.circle
                          key={`fe-${i}`}
                          r="2.5"
                          fill="#be123c"
                          cx={40 + i * 25}
                          cy={30 + (i % 3) * 15}
                          animate={{
                            cx: [
                              40 + i * 25,
                              40 + i * 25 + 5,
                              40 + i * 25 - 3,
                            ],
                            cy: [
                              30 + (i % 3) * 15,
                              30 + (i % 3) * 15 - 5,
                              30 + (i % 3) * 15 + 3,
                            ],
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                      <text
                        x="20"
                        y="25"
                        fontSize="7"
                        fill="#be123c"
                        fontWeight="bold"
                      >
                        Fe⁺⁺ (ذائب)
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>

              {/* === Bottom gauge: Iron availability === */}
              <g transform="translate(5, 256)">
                <rect
                  x="0"
                  y="0"
                  width="190"
                  height="18"
                  rx="4"
                  fill="white"
                  opacity="0.85"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="12"
                  fontSize="6"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  الحديد
                </text>
                <rect
                  x="40"
                  y="4"
                  width="100"
                  height="10"
                  rx="3"
                  fill="#e2e8f0"
                />
                <motion.rect
                  x="40"
                  y="4"
                  height="10"
                  rx="3"
                  fill={
                    ironAvailability === 0
                      ? "#ef4444"
                      : ironAvailability < 80
                        ? "#f59e0b"
                        : "#22c55e"
                  }
                  animate={{ width: `${(ironAvailability / 100) * 100}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="145"
                  y="12"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  {ironAvailability.toFixed(0)}%
                </text>
              </g>

              {/* Lock/unlock indicator */}
              <motion.g
                transform="translate(170, 20)"
                animate={{ rotate: isPrecipitated ? 0 : 0 }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill={isPrecipitated ? "#fef2f2" : "#f0fdf4"}
                  stroke={isPrecipitated ? "#fecaca" : "#bbf7d0"}
                  strokeWidth="1.5"
                />
                {isPrecipitated ? (
                  <Lock
                    x={-8}
                    y={-8}
                    width={16}
                    height={16}
                    color="#ef4444"
                    strokeWidth={2}
                  />
                ) : (
                  <Unlock
                    x={-8}
                    y={-8}
                    width={16}
                    height={16}
                    color="#22c55e"
                    strokeWidth={2}
                  />
                )}
              </motion.g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="مستوى الحموضة (pH)"
              value={ph}
              min={4}
              max={9}
              step={0.5}
              unit=""
              color={
                ph > 7.5 ? "rose" : ph < 5.5 ? "amber" : "emerald"
              }
              onChange={(e) => setPh(Number(e.target.value))}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={cn(
                  "rounded-xl border p-2",
                  ironAvailability === 0
                    ? "bg-red-50 border-red-200"
                    : ironAvailability < 80
                      ? "bg-amber-50 border-amber-200"
                      : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600">
                  الحديد
                </div>
                <div className="text-sm font-black font-mono text-red-600">
                  {ironAvailability.toFixed(0)}%
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl border p-2",
                  macroAvailability < 100
                    ? "bg-amber-50 border-amber-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600">
                  العناصر الكبرى
                </div>
                <div className="text-sm font-black font-mono text-emerald-600">
                  {macroAvailability.toFixed(0)}%
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">لون الورقة</div>
                <div className="flex items-center gap-1 mt-1">
                  <div
                    className="w-4 h-4 rounded-full border border-slate-300"
                    style={{ backgroundColor: leafBaseColor }}
                  />
                  <span className="text-[10px] font-bold text-slate-700">
                    {ironAvailability === 0
                      ? "مصفر"
                      : ironAvailability < 80
                        ? "باهت"
                        : "أخضر"}
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`ph-${ph}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isPrecipitated ? (
                <Alert
                  type="danger"
                  title={`🔴 تربة قلوية (pH ${ph.toFixed(1)}) — الحديد محجوب!`}
                >
                  عند pH {ph.toFixed(1)}، الحديد يترسب كصخر صلب لا يستطيع
                  الجذر امتصاصه. النبتة تعاني من فقر دم (نقص حديد) رغم وجود
                  السماد في الأرض. العروق تبقى خضراء ولكن الورقة 전체 تصفر —
                  هذه علامة تشخيصية كلاسيكية. توفر الحديد:{" "}
                  {ironAvailability.toFixed(0)}%.
                </Alert>
              ) : isAcidic ? (
                <Alert
                  type="warning"
                  title={`🟠 تربة حامضية جداً (pH ${ph.toFixed(1)})`}
                >
                  عند pH {ph.toFixed(1)}، العناصر تذوب بسرعة زائدة قد تصل لدرجة
                  السمية، وتقتل البكتيريا النافعة. العناصر الكبرى متوفرة بنسبة{" "}
                  {macroAvailability.toFixed(0)}%. ارفع pH إلى 6.0-7.5
                  باستخدام الجير الزراعي.
                </Alert>
              ) : isOptimal ? (
                <Alert
                  type="success"
                  title={`✅ نطاق مثالي (pH ${ph.toFixed(1)})`}
                >
                  البوابة مفتوحة! درجة الحموضة بين 6.0 و 7.5 — جميع العناصر
                  (الحديد {ironAvailability.toFixed(0)}%، والعناصر الكبرى{" "}
                  {macroAvailability.toFixed(0)}%) ذائبة في الماء وجاهزة
                  للشرب. النبات يمتص غذاءه بكفاءة.
                </Alert>
              ) : (
                <Alert
                  type="info"
                  title={`ℹ حدودي (pH ${ph.toFixed(1)})`}
                >
                  الحموضة في النطاق الحدودي. الحديد متوفر بنسبة{" "}
                  {ironAvailability.toFixed(0)}% والعناصر الكبرى بنسبة{" "}
                  {macroAvailability.toFixed(0)}%. الوضع مستقر لكنه ليس
                  مثالياً. استهدف 6.0-7.5 لأفضل أداء.
                </Alert>
              )}
            </motion.div>

            {isOptimal && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 النطاق المثالي للامتصاص: 6.0-7.5 — جميع العناصر متوفرة
                بأقصى كفاءة.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

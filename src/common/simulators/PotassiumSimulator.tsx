import { useState } from "react";
import {
  Wheat,
  AlertTriangle,
  CheckCircle,
  Apple,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const PotassiumSimulator = () => {
  const [kLevel, setKLevel] = useState(30);

  const isDeficiency = kLevel < 35;
  const isOptimal = kLevel >= 35 && kLevel < 80;
  const isExcess = kLevel >= 80;

  const fruitScale = 0.5 + (kLevel / 100) * 0.7;
  const fruitColor =
    kLevel < 40 ? "#fde047" : kLevel < 70 ? "#facc15" : "#f97316";
  const brix = Math.floor(kLevel / 8);

  const leafEdgeColor = isDeficiency ? "#78350f" : "#16a34a";

  const flowDuration = kLevel > 10 ? 50 / kLevel : 1;

  const statusColor = isDeficiency
    ? "bg-red-100 text-red-700 border-red-300"
    : isOptimal
      ? "bg-emerald-100 text-emerald-700 border-emerald-300"
      : "bg-amber-100 text-amber-700 border-amber-300";
  const statusText = isDeficiency
    ? "🔴 الطريق مغلق"
    : isOptimal
      ? "🟢 حركة ممتازة"
      : "🟡 تشبع";

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-red-200 dark:border-red-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl shadow-lg shadow-red-200/50">
              <Wheat className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر الجودة (البوتاسيوم K)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                بوتاسيوم — نقل السكر وتحجيم الثمار
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              statusColor
            )}
            animate={isDeficiency ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {statusText}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 260 280" className="w-full h-full">
              <defs>
                <linearGradient id="branchGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <radialGradient
                  id="fruitGlow"
                  cx="50%"
                  cy="50%"
                  r="60%"
                >
                  <stop offset="0%" stopColor={fruitColor} stopOpacity="1" />
                  <stop
                    offset="100%"
                    stopColor={fruitColor}
                    stopOpacity="0.6"
                  />
                </radialGradient>
                <filter id="glowK">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect
                x="0"
                y="0"
                width="260"
                height="280"
                fill="#fafaf9"
                rx="8"
              />

              {/* Main branch */}
              <path
                d="M10,140 L250,140"
                stroke="url(#branchGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* === Leaf (factory) === */}
              <g transform="translate(45, 140) rotate(-20)">
                <path
                  d="M0,0 L0,-15"
                  stroke="#16a34a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M0,-15 Q-35,-50 0,-90 Q35,-50 0,-15"
                  fill="#22c55e"
                  stroke={leafEdgeColor}
                  strokeWidth={isDeficiency ? "5" : "0"}
                  animate={{ scale: isDeficiency ? 0.9 : 1 }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
                <motion.path
                  d="M0,-15 L0,-80"
                  stroke="#14532d"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                <path
                  d="M0,-30 L-12,-40 M0,-30 L12,-40 M0,-50 L-10,-58 M0,-50 L10,-58"
                  stroke="#14532d"
                  strokeWidth="1"
                  opacity="0.3"
                />

                <AnimatePresence>
                  {isDeficiency && (
                    <motion.text
                      x="0"
                      y="-98"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#78350f"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ▲ احتراق الحواف
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>

              {/* === Fruit (storage) === */}
              <g transform="translate(220, 140)">
                <path
                  d="M0,0 L0,15"
                  stroke="#16a34a"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <motion.circle
                  cx="0"
                  cy="15"
                  r="35"
                  fill="url(#fruitGlow)"
                  stroke={fruitColor}
                  strokeWidth="1"
                  animate={{ scale: fruitScale }}
                  transition={{ type: "spring", stiffness: 40 }}
                  style={{ originX: "0px", originY: "15px" }}
                />
                {/* Shine */}
                <motion.ellipse
                  cx="-8"
                  cy="8"
                  rx="8"
                  ry="4"
                  fill="white"
                  opacity="0.3"
                  animate={{ scale: fruitScale }}
                  style={{ originX: "0px", originY: "15px" }}
                />
                {/* Brix label */}
                <text
                  x="0"
                  y="18"
                  textAnchor="middle"
                  fontSize="10"
                  fill={kLevel > 40 ? "white" : "#78350f"}
                  fontWeight="black"
                >
                  {brix}°
                </text>
              </g>

              {/* === Sugar traffic animation === */}
              <AnimatePresence>
                {kLevel > 10 &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <motion.circle
                      key={`traffic-${i}`}
                      r="4"
                      fill="#fbbf24"
                      stroke="#f59e0b"
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        x: [60, 120, 180, 220],
                        y: [120, 125, 130, 155],
                      }}
                      transition={{
                        duration: flowDuration,
                        repeat: Infinity,
                        delay: i * (flowDuration / 5),
                        ease: "linear",
                      }}
                    />
                  ))}
              </AnimatePresence>

              {/* Labels */}
              <text
                x="45"
                y="170"
                textAnchor="middle"
                fontSize="8"
                fill="#16a34a"
                fontWeight="bold"
              >
                المصنع (ورقة)
              </text>
              <text
                x="220"
                y="185"
                textAnchor="middle"
                fontSize="8"
                fill="#ea580c"
                fontWeight="bold"
              >
                المخزن (ثمرة)
              </text>

              {/* === Bottom gauge: Brix === */}
              <g transform="translate(5, 258)">
                <rect
                  x="0"
                  y="0"
                  width="250"
                  height="16"
                  rx="4"
                  fill="white"
                  opacity="0.85"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="11"
                  fontSize="6"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  السكر (Brix)
                </text>
                <rect
                  x="55"
                  y="3"
                  width="140"
                  height="10"
                  rx="3"
                  fill="#e2e8f0"
                />
                <motion.rect
                  x="55"
                  y="3"
                  height="10"
                  rx="3"
                  fill={
                    brix < 4
                      ? "#ef4444"
                      : brix < 8
                        ? "#f59e0b"
                        : "#22c55e"
                  }
                  animate={{ width: `${(kLevel / 100) * 140}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="200"
                  y="11"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  {brix.toFixed(0)}%
                </text>
              </g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="مستوى البوتاسيوم (K)"
              value={kLevel}
              min={0}
              max={100}
              unit="%"
              color={isDeficiency ? "rose" : "amber"}
              onChange={(e) => setKLevel(Number(e.target.value))}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  حجم الثمرة
                </div>
                <div className="text-sm font-black font-mono text-orange-600">
                  {(fruitScale * 100).toFixed(0)}%
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-orange-500 rounded-full"
                    animate={{ width: `${fruitScale * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  نسبة السكر
                </div>
                <div className="text-sm font-black font-mono text-amber-600">
                  {brix}%
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500 rounded-full"
                    animate={{ width: `${(brix / 12) * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  سرعة النقل
                </div>
                <div className="text-sm font-black font-mono text-red-600">
                  {kLevel > 10
                    ? `${(1 / (flowDuration || 1) * 10).toFixed(1)}x`
                    : "متوقفة"}
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`k-${kLevel}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isDeficiency ? (
                <Alert
                  type="danger"
                  title={`🔴 الطريق مغلق — احتراق الحواف!`}
                >
                  البوتاسيوم عند {kLevel.toFixed(0)}% — أقل من 35%. المصنع
                  (الورقة) ينتج السكر، لكن لا يوجد ناقل (بوتاسيوم) لأخذه
                  للثمرة. النتيجة: الثمار صغيرة ({(fruitScale * 100).toFixed(0)}%) وحامضة (Brix {brix}%)
                  ، وتكدس السكر في حواف الورقة حتى تحترق.
                </Alert>
              ) : isExcess ? (
                <Alert
                  type="warning"
                  title={`🟡 زيادة في البوتاسيوم`}
                >
                  البوتاسيوم عند {kLevel.toFixed(0)}% — تجاوز 80%. رغم أن
                  الثمار كبيرة ({(fruitScale * 100).toFixed(0)}%) والسكر مرتفع
                  (Brix {brix}%)، إلا أن الزيادة قد تمنع امتصاص
                  الكالسيوم والمغنيسيوم. حافظ على التوازن بين 35-80%.
                </Alert>
              ) : (
                <Alert
                  type="success"
                  title={`✅ حركة مرور ممتازة — ثمار عملاقة!`}
                >
                  البوتاسيوم عند {kLevel.toFixed(0)}% — في النطاق المثالي.
                  السكريات تُضخ بسرعة نحو الثمرة، مما يزيد حجمها (
                  {(fruitScale * 100).toFixed(0)}%) وحلاوتها (Brix {brix}%).
                  الطريق من المصنع إلى المخزن مفتوح بالكامل!
                </Alert>
              )}
            </motion.div>

            {isOptimal && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-2 text-center text-xs text-orange-700 font-bold">
                💡 البوتاسيوم يضاعف حجم الثمار ويرفع السكر — حافظ على 35-80%
                لأفضل إنتاج.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

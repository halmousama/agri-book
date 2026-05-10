import { useState } from "react";
import {
  Sun,
  Wind,
  Droplets,
  Zap,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";
import { useTheme } from "../contexts/ThemeContext";

export const PhotosynthesisSimulator = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const C = {
    svgBg: isDark ? "#1e293b" : "#f8fafc",
    textMuted: isDark ? "#94a3b8" : "#64748b",
    text: isDark ? "#cbd5e1" : "#1e293b",
    grid: isDark ? "#334155" : "#e2e8f0",
    surface: isDark ? "#334155" : "#f8fafc",
    border: isDark ? "#475569" : "#cbd5e1",
    water: isDark ? "#60a5fa" : "#3b82f6",
    waterLight: isDark ? "#93c5fd" : "#bae6fd",
    sky: isDark ? "#38bdf8" : "#0ea5e9",
    sun: "#eab308",
    sunLight: "#fef08a",
    co2: isDark ? "#94a3b8" : "#64748b",
    leaf: isDark ? "#4ade80" : "#22c55e",
    leafDark: isDark ? "#22c55e" : "#16a34a",
    leafDeep: "#14532d",
    leafEmerald: isDark ? "#6ee7b7" : "#a7f3d0",
    greenDark: isDark ? "#022c22" : "#064e3b",
    greenLight: isDark ? "#064e3b" : "#f0fdf4",
    greenLight2: isDark ? "#052e16" : "#dcfce7",
    alertRed: "#ef4444",
  };
  const [light, setLight] = useState(50);
  const [water, setWater] = useState(70);
  const [co2, setCo2] = useState(30);

  const productionRate = Math.min(light, water, co2);

  let limitingFactor = { name: "", value: 0, color: "" };
  if (productionRate === light)
    limitingFactor = { name: "الضوء", value: light, color: "text-yellow-500" };
  else if (productionRate === water)
    limitingFactor = { name: "الماء", value: water, color: "text-blue-500" };
  else
    limitingFactor = { name: "غاز CO₂", value: co2, color: "text-slate-500" };

  const wastedLight = light - productionRate;
  const wastedWater = water - productionRate;
  const wastedCo2 = co2 - productionRate;

  const animDuration = productionRate > 0 ? 200 / productionRate : 0;
  const isOperating = productionRate > 0;

  const isCritical = productionRate < 30;
  const isWarning = productionRate >= 30 && productionRate < 70;
  const isOptimal = productionRate >= 70;

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
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مفاعل التركيب الضوئي (قانون البرميل)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ضوء + ماء + CO₂ ← سكر + O₂
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5",
              isCritical
                ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800"
                : isWarning
                  ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                  : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
            )}
            animate={isCritical ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isCritical && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            )}
            {isCritical
              ? `🔴 ${limitingFactor.name} مسدود`
              : isWarning
                ? `🟡 نقص ${limitingFactor.name}`
                : `🟢 إنتاج ${Math.round(productionRate)}%`}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 280 300" className="w-full h-full">
              <defs>
                <linearGradient
                  id="leafGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={C.leaf} stopOpacity="0.9" />
                  <stop
                    offset="100%"
                    stopColor={C.leaf}
                    stopOpacity="0.95"
                  />
                </linearGradient>
                <radialGradient
                  id="lightGlow"
                  cx="50%"
                  cy="0%"
                  r="80%"
                >
                  <stop
                    offset="0%"
                    stopColor={C.sunLight}
                    stopOpacity="0.6"
                  />
                  <stop offset="100%" stopColor={C.sunLight} stopOpacity="0" />
                </radialGradient>
                <filter id="glowPs">
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
                width="280"
                height="300"
                fill={C.svgBg}
                rx="8"
              />
              <rect
                x="0"
                y="0"
                width="280"
                height="300"
                fill="url(#lightGlow)"
                rx="8"
                opacity={light / 100}
              />

              {/* Grid background */}
              <g opacity="0.03">
                {Array.from({ length: 15 }).map((_, i) => (
                  <line
                    key={`gv-${i}`}
                    x1={i * 20}
                    y1="0"
                    x2={i * 20}
                    y2="300"
                    stroke="#000"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line
                    key={`gh-${i}`}
                    x1="0"
                    y1={i * 20}
                    x2="280"
                    y2="300"
                    stroke="#000"
                    strokeWidth="0.5"
                  />
                ))}
              </g>

              {/* === Input Arrows === */}

              {/* Light from above */}
              <g opacity={light / 100} className="transition-opacity duration-300">
                <motion.path
                  d="M140,10 L140,60"
                  stroke={C.sun}
                  strokeWidth="5"
                  strokeDasharray="8 4"
                  animate={{ strokeDashoffset: [20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <polygon points="136,60 144,60 140,68" fill={C.sun} />
                <text
                  x="150"
                  y="35"
                  fontSize="9"
                  fill={C.sun}
                  fontWeight="bold"
                >
                  ضوء {light}%
                </text>
              </g>

              {/* CO2 from left */}
              <g opacity={co2 / 100} className="transition-opacity duration-300">
                <motion.path
                  d="M20,140 L70,140"
                  stroke={C.co2}
                  strokeWidth="5"
                  strokeDasharray="8 4"
                  animate={{ strokeDashoffset: [20, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <polygon points="70,136 70,144 78,140" fill={C.co2} />
                <text
                  x="25"
                  y="130"
                  fontSize="9"
                  fill={C.co2}
                  fontWeight="bold"
                >
                  CO₂ {co2}%
                </text>
              </g>

              {/* Water from below */}
              <g opacity={water / 100} className="transition-opacity duration-300">
                <motion.path
                  d="M140,290 L140,240"
                  stroke={C.water}
                  strokeWidth="5"
                  strokeDasharray="8 4"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <polygon points="136,240 144,240 140,232" fill={C.water} />
                <text
                  x="150"
                  y="265"
                  fontSize="9"
                  fill={C.water}
                  fontWeight="bold"
                >
                  H₂O {water}%
                </text>
              </g>

              {/* === Leaf Factory === */}
              <g transform="translate(140, 150)">
                {/* Leaf body */}
                <motion.path
                  d="M-70,0 Q-35,-55 0,-65 Q35,-55 70,0 Q35,55 0,65 Q-35,55 -70,0"
                  fill="url(#leafGrad)"
                  stroke={C.leafDark}
                  strokeWidth="3"
                  animate={{
                    scale: isOperating ? [1, 1.02, 1] : 1,
                    filter: isOperating
                      ? "brightness(1.1)"
                      : "brightness(0.7)",
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Midrib */}
                <path
                  d="M-60,0 L60,0"
                  stroke={C.leafDeep}
                  strokeWidth="2.5"
                  opacity="0.5"
                />
                {/* Side veins */}
                <path
                  d="M-35,0 L-15,-25 M-35,0 L-15,25 M0,0 L20,-35 M0,0 L20,35 M35,0 L50,-20 M35,0 L50,20"
                  stroke={C.leafDeep}
                  strokeWidth="1.5"
                  opacity="0.35"
                />

                {/* Efficiency display */}
                <circle
                  cx="0"
                  cy="0"
                  r="30"
                  fill={C.greenDark}
                  opacity="0.85"
                  stroke={C.leaf}
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="black"
                  fill={C.leaf}
                >
                  {Math.round(productionRate)}%
                </text>
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill={C.leafEmerald}
                >
                  طاقة سكر
                </text>
              </g>

              {/* === Outputs === */}
              <AnimatePresence>
                {isOperating && (
                  <g>
                    {/* Sugar cubes */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.rect
                        key={`sugar-${i}`}
                        x="220"
                        y="140"
                        width="12"
                        height="12"
                        rx="3"
                        fill={C.surface}
                        stroke={C.border}
                        strokeWidth="1.5"
                        initial={{ opacity: 0, x: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          x: 40,
                          rotate: 90,
                        }}
                        transition={{
                          duration: animDuration || 1,
                          repeat: Infinity,
                          delay: i * ((animDuration || 1) / 4),
                          ease: "linear",
                        }}
                      />
                    ))}
                    <text
                      x="240"
                      y="132"
                      fontSize="8"
                      fill={C.textMuted}
                      fontWeight="bold"
                    >
                      سكر (غذاء)
                    </text>

                    {/* Oxygen bubbles */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.circle
                        key={`o2-${i}`}
                        cx="90"
                        cy="120"
                        r="3.5"
                        fill={C.waterLight}
                        stroke={C.sky}
                        strokeWidth="0.5"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 0.8, 0], y: -40 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    <text
                      x="80"
                      y="90"
                      fontSize="8"
                      fill={C.sky}
                      fontWeight="bold"
                    >
                      O₂
                    </text>
                  </g>
                )}
              </AnimatePresence>

              {/* === Waste indicators === */}
              <g transform="translate(5, 280)">
                <text x="0" y="8" fontSize="6" fill={C.textMuted}>
                  ضوء {light.toFixed(0)}%
                </text>
                <rect x="25" y="2" width="40" height="4" rx="2" fill={C.grid} />
                <motion.rect
                  x="25"
                  y="2"
                  height="4"
                  rx="2"
                  fill={C.sun}
                  animate={{ width: `${(light / 100) * 40}px` }}
                />
                {wastedLight > 0 && (
                  <text x="68" y="8" fontSize="5" fill={C.alertRed}>
                    هدر {wastedLight.toFixed(0)}%
                  </text>
                )}
              </g>
              <g transform="translate(105, 280)">
                <text x="0" y="8" fontSize="6" fill={C.textMuted}>
                  ماء {water.toFixed(0)}%
                </text>
                <rect x="25" y="2" width="40" height="4" rx="2" fill={C.grid} />
                <motion.rect
                  x="25"
                  y="2"
                  height="4"
                  rx="2"
                  fill={C.water}
                  animate={{ width: `${(water / 100) * 40}px` }}
                />
                {wastedWater > 0 && (
                  <text x="68" y="8" fontSize="5" fill={C.alertRed}>
                    هدر {wastedWater.toFixed(0)}%
                  </text>
                )}
              </g>
              <g transform="translate(205, 280)">
                <text x="0" y="8" fontSize="6" fill={C.textMuted}>
                  CO₂ {co2.toFixed(0)}%
                </text>
                <rect x="28" y="2" width="40" height="4" rx="2" fill={C.grid} />
                <motion.rect
                  x="28"
                  y="2"
                  height="4"
                  rx="2"
                  fill={C.co2}
                  animate={{ width: `${(co2 / 100) * 40}px` }}
                />
                {wastedCo2 > 0 && (
                  <text x="72" y="8" fontSize="5" fill={C.alertRed}>
                    هدر {wastedCo2.toFixed(0)}%
                  </text>
                )}
              </g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="طاقة الشمس (الضوء)"
              value={light}
              min={0}
              max={100}
              unit="%"
              color="amber"
              onChange={(e) => setLight(Number(e.target.value))}
            />
            <Slider
              label="هواء (CO₂)"
              value={co2}
              min={0}
              max={100}
              unit="%"
              color={co2 < 20 ? "rose" : "blue"}
              onChange={(e) => setCo2(Number(e.target.value))}
            />
            <Slider
              label="ماء الجذور (H₂O)"
              value={water}
              min={0}
              max={100}
              unit="%"
              color={water < 20 ? "rose" : "blue"}
              onChange={(e) => setWater(Number(e.target.value))}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl p-2 border",
                  isCritical
                    ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
                    : isWarning
                      ? "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800"
                      : "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600 dark:text-slate-400">
                  الإنتاج الفعلي
                </div>
                <div
                  className={cn(
                    "text-lg font-black font-mono",
                    isCritical
                      ? "text-red-600"
                      : isWarning
                        ? "text-amber-600"
                        : "text-emerald-600"
                  )}
                >
                  {Math.round(productionRate)}%
                </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isCritical
                        ? "bg-red-500"
                        : isWarning
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    )}
                    animate={{ width: `${productionRate}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-2">
                <div className="text-[9px] font-bold text-slate-600 dark:text-slate-400">
                  العامل المحدد
                </div>
                <div
                  className={cn(
                    "text-sm font-black",
                    limitingFactor.color.replace("text", "")
                  )}
                >
                  {limitingFactor.name} ({limitingFactor.value.toFixed(0)}%)
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`ps-${light}-${water}-${co2}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCritical ? (
                <Alert
                  type="danger"
                  title="🔴 المصنع متوقف — عنق الزجاجة!"
                >
                  حسب قانون ليبيج، الإنتاج يتوقف عند أضعف مورد.{" "}
                  {limitingFactor.name} عند {limitingFactor.value.toFixed(0)}%
                  — هذا هو العنق الزجاجة. الإنتاج الفعلي{" "}
                  {Math.round(productionRate)}% فقط.{" "}
                  {wastedWater > 0 &&
                    `هدر ماء ${wastedWater.toFixed(0)}% — أنت تدفع ثمناً لماء لا تستخدمه النبتة. `}
                  {wastedLight > 0 &&
                    `هدر ضوء ${wastedLight.toFixed(0)}% — إجهاد حراري يخفض الكفاءة.`}
                </Alert>
              ) : isWarning ? (
                <Alert
                  type="warning"
                  title={`🟡 عنق الزجاجة: نقص في ${limitingFactor.name}`}
                >
                  {limitingFactor.name} عند {limitingFactor.value.toFixed(0)}% —
                  الإنتاج الفعلي {Math.round(productionRate)}%. المصنع يعمل
                  لكنه مقيد. ارفع مستوى {limitingFactor.name} لتحسين الإنتاج.{" "}
                  {wastedWater > 0 &&
                    `هدر ماء ${wastedWater.toFixed(0)}%. `}
                  {wastedLight > 0 &&
                    `هدر ضوء ${wastedLight.toFixed(0)}%.`}
                </Alert>
              ) : (
                <Alert
                  type="success"
                  title="✅ إنتاجية قصوى — توازن تام!"
                >
                  المصنع يعمل بكفاءة {Math.round(productionRate)}%! التوازن
                  تام بين الضوء ({light.toFixed(0)}%)، CO₂ (
                  {co2.toFixed(0)}%)، والماء ({water.toFixed(0)}%). كل الموارد
                  تتحول إلى سكر يغذي الشجرة.
                </Alert>
              )}
            </motion.div>

            {isOptimal && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl p-2 text-center text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                💡 مثالي! استمر بنفس النسب — حافظ على توازن الضوء والماء وCO₂
                لأقصى إنتاج.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

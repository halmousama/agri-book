import { useState } from "react";
import {
  Zap,
  Battery,
  AlertTriangle,
  CheckCircle,
  Anchor,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const PhosphorusSimulator = () => {
  const [pLevel, setPLevel] = useState(30);

  const isDeficiency = pLevel < 40;
  const isOptimal = pLevel >= 40 && pLevel <= 80;
  const isExcess = pLevel > 80;

  const rootScale = 0.3 + (pLevel / 100) * 0.7;
  const rootColor = "#d97706";
  const leafColor = isDeficiency ? "#9333ea" : "#16a34a";
  const energyLevel = pLevel;

  const statusColor = isDeficiency
    ? "bg-red-100 text-red-700 border-red-300"
    : isOptimal
      ? "bg-emerald-100 text-emerald-700 border-emerald-300"
      : "bg-amber-100 text-amber-700 border-amber-300";
  const statusText = isDeficiency
    ? "🔴 نقص طاقة"
    : isOptimal
      ? "🟢 نظام قوي"
      : "🟡 زيادة خطرة";

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-yellow-200 dark:border-yellow-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-lg shadow-yellow-200/50">
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر الطاقة (الفوسفور P)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                فوسفور — شحن الجذور بالطاقة ونقل السكر
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
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="skyGradP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fefce8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fef9c3" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="soilGradP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
                </linearGradient>
                <filter id="glowP">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlowP">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="200" height="280" fill="url(#skyGradP)" rx="8" />

              {/* === Above Ground === */}
              <g transform="translate(100, 0)">
                {/* Stem */}
                <path
                  d="M0,150 L0,50"
                  stroke="#78350f"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Leaves with color transition */}
                <motion.g
                  animate={{ filter: isDeficiency ? "none" : "brightness(1.1)" }}
                >
                  <path
                    d="M0,100 Q50,80 60,110 Q30,130 0,120"
                    fill={leafColor}
                    stroke={leafColor}
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                  <path
                    d="M0,80 Q-50,60 -60,90 Q-30,110 0,100"
                    fill={leafColor}
                    stroke={leafColor}
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                  <path
                    d="M0,50 Q30,20 0,0 Q-30,20 0,50"
                    fill={leafColor}
                    stroke={leafColor}
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                </motion.g>

                {/* Deficiency indicator text */}
                <AnimatePresence>
                  {isDeficiency && (
                    <motion.text
                      x="0"
                      y="25"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#9333ea"
                      fontWeight="bold"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      ▲ طاقة محبوسة!
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>

              {/* === Soil Section === */}
              <rect
                x="0"
                y="150"
                width="200"
                height="130"
                fill="url(#soilGradP)"
              />
              <rect
                x="0"
                y="148"
                width="200"
                height="4"
                fill="#552308"
                opacity="0.8"
              />

              {/* Root system */}
              <g transform="translate(100, 150)">
                <motion.g
                  animate={{ scale: rootScale }}
                  transition={{ type: "spring", stiffness: 40 }}
                  style={{ originX: 0, originY: 0 }}
                >
                  {/* Main taproot */}
                  <path
                    d="M0,0 L0,110"
                    stroke={rootColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Lateral roots */}
                  <path
                    d="M0,15 L25,30"
                    stroke={rootColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,25 L-25,40"
                    stroke={rootColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,45 L35,60"
                    stroke={rootColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,55 L-35,70"
                    stroke={rootColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,75 L20,90"
                    stroke={rootColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,85 L-20,100"
                    stroke={rootColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {/* Secondary branches (only at high P) */}
                  <AnimatePresence>
                    {pLevel > 50 && (
                      <motion.g
                        opacity="0.7"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                      >
                        <path
                          d="M25,30 L35,22"
                          stroke={rootColor}
                          strokeWidth="1"
                        />
                        <path
                          d="M-25,40 L-35,32"
                          stroke={rootColor}
                          strokeWidth="1"
                        />
                        <path
                          d="M35,60 L45,50"
                          stroke={rootColor}
                          strokeWidth="1"
                        />
                        <path
                          d="M-35,70 L-45,60"
                          stroke={rootColor}
                          strokeWidth="1"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>
                </motion.g>
              </g>

              {/* === Root hair zone indicator === */}
              <text
                x="10"
                y="220"
                fontSize="6"
                fill="#d97706"
                fontWeight="bold"
                opacity="0.7"
              >
                منطقة الجذور
              </text>

              {/* === ATP Energy Bar === */}
              <g transform="translate(5, 255)">
                <rect
                  x="0"
                  y="0"
                  width="190"
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
                  fontSize="7"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  طاقة ATP
                </text>
                <rect
                  x="50"
                  y="3"
                  width="100"
                  height="10"
                  rx="3"
                  fill="#e2e8f0"
                />
                <motion.rect
                  x="50"
                  y="3"
                  height="10"
                  rx="3"
                  fill={
                    isDeficiency
                      ? "#ef4444"
                      : isOptimal
                        ? "#22c55e"
                        : "#f59e0b"
                  }
                  animate={{ width: `${(energyLevel / 100) * 100}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="155"
                  y="11"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  {energyLevel.toFixed(0)}%
                </text>
              </g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="مستوى الفوسفور (P)"
              value={pLevel}
              min={0}
              max={100}
              unit="%"
              color={isDeficiency ? "rose" : "amber"}
              onChange={(e) => setPLevel(Number(e.target.value))}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  حجم الجذور
                </div>
                <div className="text-sm font-black font-mono text-amber-600">
                  {(rootScale * 100).toFixed(0)}%
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500 rounded-full"
                    animate={{ width: `${rootScale * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  طاقة ATP
                </div>
                <div className="text-sm font-black font-mono text-yellow-600">
                  {energyLevel.toFixed(0)}%
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isDeficiency
                        ? "bg-red-500"
                        : isOptimal
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                    )}
                    animate={{ width: `${energyLevel}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  لون الورقة
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div
                    className="w-4 h-4 rounded-full border border-slate-300"
                    style={{ backgroundColor: leafColor }}
                  />
                  <span className="text-[10px] font-bold text-slate-700">
                    {isDeficiency ? "بنفسجي" : "أخضر"}
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`p-${pLevel}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isDeficiency ? (
                <Alert
                  type="danger"
                  title="🔴 نقص طاقة — الجذور مشلولة!"
                >
                  الفوسفور عند {pLevel.toFixed(0)}% — أقل من حد 40%. الجذور
                  توقفت عن النمو لعدم وجود وقود (ATP). السكر المصنوع في الورقة
                  محبوس فيها ولا يستطيع النزول للجذر، فتتحول الورقة للون
                  البنفسجي. شبكة الجذور عند{" "}
                  {(rootScale * 100).toFixed(0)}% فقط من حجمها الطبيعي.
                </Alert>
              ) : isExcess ? (
                <Alert type="warning" title="🟡 زيادة خطرة — تسمم فوسفوري">
                  الفوسفور عند {pLevel.toFixed(0)}% — تجاوز حد 80%. زيادة
                  الفوسفور تمنع امتصاص الزنك والحديد. التزم بالوسطية (40-80%).
                  الجذور كبيرة لكن العناصر الأخرى محجوبة.
                </Alert>
              ) : (
                <Alert type="success" title="🟢 نظام قوي — طاقة متدفقة">
                  الفوسفور عند {pLevel.toFixed(0)}% — في النطاق المثالي (40-80%).
                  شبكة الجذور عند {(rootScale * 100).toFixed(0)}% من حجمها
                  الكامل. الطاقة (ATP) كافية لنقل الغذاء من الأوراق إلى جميع
                  أجزاء النبات.
                </Alert>
              )}
            </motion.div>

            {isExcess && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-2 text-center text-xs text-amber-700 font-bold">
                💡 تنبيه: زيادة الفوسفور تمنع امتصاص الزنك والحديد. حافظ على
                التوازن بين 40-80%.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

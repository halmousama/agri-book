import { useState } from "react";
import {
  Sprout,
  AlertTriangle,
  Bug,
  CheckCircle,
  Ban,
  Droplets,
  Thermometer,
  Beaker,
  RotateCcw,
  Leaf,
  Skull,
  Pill,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const NitrogenSimulator = () => {
  const [nLevel, setNLevel] = useState(50);
  const [soilPH, setSoilPH] = useState(6.8);
  const [rainIntensity, setRainIntensity] = useState(30);

  // كيمياء النيتروجين:pH يحدد شكل النيتروجين
  const nh4Ratio =
    soilPH <= 6.0
      ? 0.85
      : soilPH <= 6.5
        ? 0.65
        : soilPH <= 7.0
          ? 0.45
          : soilPH <= 7.5
            ? 0.25
            : 0.1;
  const no3Ratio = 1 - nh4Ratio;

  const nh4Level = nLevel * nh4Ratio;
  const no3Level = nLevel * no3Ratio;

  // مخاطر الغسيل: NO₃ يغسل بسهولة, NH₄ يثبت
  const leachingRisk = Math.min(100, Math.max(0, no3Level * 0.8 + rainIntensity * 0.6));
  const isHighLeaching = leachingRisk > 70;
  const isMediumLeaching = leachingRisk > 40;

  // سمية NH₄ عند المستويات العالية في التربة الحمضية
  const nh4Toxicity = nh4Level > 50 && soilPH < 6.0;

  // تشخيص الحالة
  const status =
    nLevel < 20
      ? "severe-deficiency"
      : nLevel < 40
        ? "mild-deficiency"
        : nLevel <= 70
          ? "optimal"
          : nLevel <= 85
            ? "excess"
            : "toxicity";

  // لون وحجم الأوراق
  const leafColorMap: Record<string, string> = {
    "severe-deficiency": "#fef08a",
    "mild-deficiency": "#a3e635",
    optimal: "#22c55e",
    excess: "#14532d",
    toxicity: "#052e16",
  };
  const leafColor = leafColorMap[status] || "#22c55e";
  const leafScale = 0.4 + nLevel / 140;

  const stemWidth = status === "excess" || status === "toxicity" ? 12 : 8;

  // الإثمار: فقط في النطاق الأمثل
  const hasFruit = nLevel >= 30 && nLevel <= 70;
  // الآفات: عند الزيادة
  const hasPests = nLevel > 80;
  // أوراق سفلية ميتة: عند النقص
  const hasDeadLeaves = nLevel < 25;
  // تحذير من الحشرات
  const pestCount = hasPests ? Math.min(8, Math.floor((nLevel - 75) / 3)) : 0;

  const getStatusBadge = () => {
    switch (status) {
      case "severe-deficiency":
        return {
          label: "🔴 نقص حاد!",
          color: "bg-red-100 text-red-700 border-red-300",
        };
      case "mild-deficiency":
        return {
          label: "🟡 نقص خفيف",
          color: "bg-amber-100 text-amber-700 border-amber-300",
        };
      case "optimal":
        return {
          label: "✅ نمو متوازن",
          color: "bg-emerald-100 text-emerald-700 border-emerald-300",
        };
      case "excess":
        return {
          label: "🔵 هيجان خضري",
          color: "bg-blue-100 text-blue-700 border-blue-300",
        };
      case "toxicity":
        return {
          label: "🟣 سمية نيتروجين!",
          color: "bg-purple-100 text-purple-700 border-purple-300",
        };
    }
  };
  const badge = getStatusBadge();

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-green-200 dark:border-green-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg shadow-green-200/50">
              <Sprout className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر النيتروجين — دورة N في التربة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                كيف يؤثر النيتروجين و pH على صحة النبات؟
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              badge.color
            )}
          >
            {badge.label}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري المطور ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="nBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#dcfce7" />
                </linearGradient>
                <linearGradient id="nSoil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
                <filter id="nGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#nBg)" rx="12" />

              {/* التربة */}
              <rect x="0" y="240" width="260" height="80" fill="url(#nSoil)" rx="0" />
              <path d="M0,240 Q65,230 130,240 Q195,250 260,240" fill="none" stroke="#451a03" strokeWidth="3" opacity="0.5" />

              {/* جذور */}
              <g opacity="0.6">
                <path d="M125,250 Q120,270 115,290" stroke="#92400e" strokeWidth="3" fill="none" />
                <path d="M130,245 Q135,265 140,285" stroke="#92400e" strokeWidth="2.5" fill="none" />
                <path d="M120,248 Q110,260 105,275" stroke="#92400e" strokeWidth="2" fill="none" />
                <path d="M135,250 Q145,262 150,278" stroke="#92400e" strokeWidth="2" fill="none" />
              </g>

              {/* جزيئات NH₄+ و NO₃- في التربة */}
              <AnimatePresence>
                {Array.from({ length: Math.round(nh4Level / 8) }).map((_, i) => (
                  <motion.text
                    key={`nh4-${i}`}
                    x={15 + (i % 8) * 29}
                    y={248 + Math.floor(i / 8) * 14}
                    fontSize="5"
                    fill="#16a34a"
                    fontWeight="bold"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    NH₄⁺
                  </motion.text>
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {Array.from({ length: Math.round(no3Level / 10) }).map((_, i) => (
                  <motion.text
                    key={`no3-${i}`}
                    x={20 + (i % 6) * 35}
                    y={260 + Math.floor(i / 6) * 14}
                    fontSize="5"
                    fill="#3b82f6"
                    fontWeight="bold"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      y: isHighLeaching ? [260, 275, 260] : [260, 262, 260],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                  >
                    NO₃⁻
                  </motion.text>
                ))}
              </AnimatePresence>

              {/* ساق النبات */}
              <path
                d="M130,245 L130,80"
                stroke={leafColor}
                strokeWidth={stemWidth}
                fill="none"
                strokeLinecap="round"
              />

              {/* الأوراق السفلية (تموت عند النقص) */}
              <AnimatePresence>
                {hasDeadLeaves && (
                  <motion.g
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <path
                      d="M130,220 Q80,210 60,230"
                      stroke="#92400e"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M130,210 Q180,200 200,220"
                      stroke="#92400e"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* الأوراق الرئيسية */}
              <g style={{ transformOrigin: "130px 245px" }}>
                <motion.g
                  animate={{ scale: leafScale }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* ورقة يمنى سفلى */}
                  <path
                    d="M130,200 Q180,160 200,210 Q170,225 130,220"
                    fill={leafColor}
                    opacity={0.9}
                  />
                  {/* ورقة يسرى سفلى */}
                  <path
                    d="M130,170 Q80,130 60,180 Q90,195 130,190"
                    fill={leafColor}
                    opacity={0.9}
                  />
                  {/* ورقة يمنى عليا */}
                  <path
                    d="M130,140 Q170,100 185,145 Q160,160 130,155"
                    fill={leafColor}
                    opacity={0.85}
                  />
                  {/* ورقة يسرى عليا */}
                  <path
                    d="M130,115 Q90,75 75,120 Q100,135 130,130"
                    fill={leafColor}
                    opacity={0.85}
                  />
                  {/* ورقة قمة */}
                  <path
                    d="M130,80 Q160,40 130,15 Q100,40 130,80"
                    fill={leafColor}
                    filter="url(#nGlow)"
                  />
                  {/* عرق الورقة القمية */}
                  <line x1="130" y1="80" x2="130" y2="25" stroke="#166534" strokeWidth="1.5" opacity="0.5" />
                </motion.g>
              </g>

              {/* الثمار (فقط في النطاق الأمثل) */}
              <AnimatePresence>
                {hasFruit && (
                  <g>
                    <motion.circle
                      cx="100" cy="180" r="10"
                      fill="#ef4444"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, type: "spring" }}
                    />
                    <motion.circle
                      cx="160" cy="150" r="10"
                      fill="#ef4444"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                    />
                    <motion.circle
                      cx="115" cy="110" r="8"
                      fill="#f97316"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                    />
                  </g>
                )}
              </AnimatePresence>

              {/* الآفات (عند الزيادة) */}
              <AnimatePresence>
                {hasPests &&
                  Array.from({ length: pestCount }).map((_, i) => (
                    <motion.g
                      key={`pest-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0],
                        x: [0, (i % 2 === 0 ? 1 : -1) * 10],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <circle
                        cx={95 + (i % 3) * 30}
                        cy={60 + Math.floor(i / 3) * 25}
                        r="4"
                        fill="#1a1a1a"
                      />
                      <line
                        x1={95 + (i % 3) * 30 - 3}
                        y1={60 + Math.floor(i / 3) * 25}
                        x2={95 + (i % 3) * 30 - 6}
                        y2={60 + Math.floor(i / 3) * 25 - 4}
                        stroke="#1a1a1a"
                        strokeWidth="1"
                      />
                      <line
                        x1={95 + (i % 3) * 30 + 3}
                        y1={60 + Math.floor(i / 3) * 25}
                        x2={95 + (i % 3) * 30 + 6}
                        y2={60 + Math.floor(i / 3) * 25 - 4}
                        stroke="#1a1a1a"
                        strokeWidth="1"
                      />
                    </motion.g>
                  ))}
              </AnimatePresence>

              {/* مؤشرات حية */}
              <g transform="translate(10, 250)">
                <rect x="0" y="0" width="240" height="60" rx="8" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />

                <text x="10" y="13" fontSize="5.5" fill="#64748b">N</text>
                <rect x="10" y="16" width="60" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="16" height="5" rx="2.5"
                  fill={status === "optimal" ? "#22c55e" : status.startsWith("defic") ? "#f59e0b" : "#3b82f6"}
                  animate={{ width: `${(nLevel / 100) * 60}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="75" y="21" fontSize="5.5" fontFamily="monospace" fill="#1e293b">{nLevel.toFixed(0)}%</text>

                <text x="100" y="13" fontSize="5.5" fill="#64748b">pH</text>
                <rect x="100" y="16" width="50" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="100" y="16" height="5" rx="2.5"
                  fill={soilPH >= 6.5 && soilPH <= 7.5 ? "#22c55e" : soilPH >= 6.0 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${((soilPH - 5) / 3.5) * 50}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="155" y="21" fontSize="5.5" fontFamily="monospace" fill="#1e293b">{soilPH.toFixed(1)}</text>

                <text x="180" y="13" fontSize="5.5" fill="#64748b">غسيل</text>
                <rect x="180" y="16" width="50" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="180" y="16" height="5" rx="2.5"
                  fill={isHighLeaching ? "#ef4444" : isMediumLeaching ? "#f59e0b" : "#22c55e"}
                  animate={{ width: `${(leachingRisk / 100) * 50}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="235" y="21" fontSize="5" fontFamily="monospace" fill="#1e293b">{leachingRisk.toFixed(0)}%</text>

                <text x="10" y="38" fontSize="5.5" fill="#64748b">NH₄⁺</text>
                <rect x="10" y="41" width="45" height="4" rx="2" fill="#e2e8f0" />
                <motion.rect x="10" y="41" height="4" rx="2" fill="#16a34a"
                  animate={{ width: `${(nh4Level / 100) * 45}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="58" y="45" fontSize="5" fontFamily="monospace" fill="#1e293b">{nh4Level.toFixed(0)}</text>

                <text x="90" y="38" fontSize="5.5" fill="#64748b">NO₃⁻</text>
                <rect x="90" y="41" width="45" height="4" rx="2" fill="#e2e8f0" />
                <motion.rect x="90" y="41" height="4" rx="2" fill="#3b82f6"
                  animate={{ width: `${(no3Level / 100) * 45}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="138" y="45" fontSize="5" fontFamily="monospace" fill="#1e293b">{no3Level.toFixed(0)}</text>

                <text x="170" y="38" fontSize="5.5" fill="#64748b">مطر</text>
                <text x="230" y="45" fontSize="5.5" fontFamily="monospace" fill="#1e293b" fontWeight="bold">{rainIntensity.toFixed(0)}%</text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Slider
                label="مستوى النيتروجين (N)"
                value={nLevel}
                min={0}
                max={100}
                unit="%"
                color={
                  status === "optimal"
                    ? "emerald"
                    : status.startsWith("defic")
                      ? "amber"
                      : "blue"
                }
                onChange={(e) => setNLevel(Number(e.target.value))}
              />
              <Slider
                label="pH التربة"
                value={soilPH}
                min={5}
                max={8.5}
                step={0.1}
                unit="pH"
                color={
                  soilPH >= 6.5 && soilPH <= 7.5
                    ? "emerald"
                    : soilPH >= 6.0
                      ? "amber"
                      : "rose"
                }
                onChange={(e) => setSoilPH(Number(e.target.value))}
              />
            </div>

            <Slider
              label="شدة المطر (الغسيل)"
              value={rainIntensity}
              min={0}
              max={100}
              unit="%"
              color={isHighLeaching ? "rose" : isMediumLeaching ? "amber" : "blue"}
              onChange={(e) => setRainIntensity(Number(e.target.value))}
            />

            {/* بطاقات أشكال النيتروجين */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                  <Pill size={12} /> NH₄⁺ (أمونيوم)
                </div>
                <div className="text-xl font-black font-mono text-emerald-600">
                  {(nh4Ratio * 100).toFixed(0)}%
                </div>
                <div className="text-[8px] text-emerald-500">
                  {nh4Ratio > 0.6
                    ? "يسود في التربة الحمضية"
                    : nh4Ratio > 0.3
                      ? "مختلط مع NO₃⁻"
                      : "قليل — يتحول لـ NO₃⁻"}
                </div>
                <div className="w-full h-1 bg-emerald-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    animate={{ width: `${nh4Ratio * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl p-3 border",
                  isHighLeaching ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
                )}
              >
                <div className="text-[10px] font-bold text-blue-700 flex items-center gap-1">
                  <Droplets size={12} /> NO₃⁻ (نترات)
                </div>
                <div className="text-xl font-black font-mono text-blue-600">
                  {(no3Ratio * 100).toFixed(0)}%
                </div>
                <div className="text-[8px] text-blue-500">
                  {no3Ratio > 0.6
                    ? "يسود في التربة القاعدية — عالي الغسيل!"
                    : no3Ratio > 0.3
                      ? "مختلط مع NH₄⁺"
                      : "قليل — آمن من الغسيل"}
                </div>
                <div className="w-full h-1 bg-blue-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", isHighLeaching ? "bg-red-500" : "bg-blue-500")}
                    animate={{ width: `${no3Ratio * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
            </div>

            {/* عدادات سريعة */}
            <div className="grid grid-cols-3 gap-1.5">
              <div
                className={cn(
                  "rounded-lg p-2 border",
                  nh4Toxicity
                    ? "bg-purple-50 border-purple-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[8px] font-bold text-slate-500">NH₄⁺</div>
                <div
                  className={cn(
                    "text-base font-black font-mono",
                    nh4Toxicity ? "text-purple-600" : "text-emerald-600"
                  )}
                >
                  {nh4Level.toFixed(0)}
                </div>
              </div>
              <div
                className={cn(
                  "rounded-lg p-2 border",
                  isHighLeaching
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200"
                )}
              >
                <div className="text-[8px] font-bold text-slate-500">NO₃⁻</div>
                <div
                  className={cn(
                    "text-base font-black font-mono",
                    isHighLeaching ? "text-red-600" : "text-blue-600"
                  )}
                >
                  {no3Level.toFixed(0)}
                </div>
              </div>
              <div
                className={cn(
                  "rounded-lg p-2 border",
                  isHighLeaching
                    ? "bg-red-50 border-red-200"
                    : isMediumLeaching
                      ? "bg-amber-50 border-amber-200"
                      : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[8px] font-bold text-slate-500">خطر غسيل</div>
                <div
                  className={cn(
                    "text-base font-black font-mono",
                    isHighLeaching
                      ? "text-red-600"
                      : isMediumLeaching
                        ? "text-amber-600"
                        : "text-emerald-600"
                  )}
                >
                  {leachingRisk.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* التشخيص الذكي المتقدم */}
            <motion.div
              key={`n-${nLevel.toFixed(0)}-${soilPH.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {status === "severe-deficiency" ? (
                <Alert type="danger" title="🍂 نقص حاد في النيتروجين!">
                  N عند {nLevel.toFixed(0)}% — مجاعة نيتروجينية! الأوراق
                  السفلية صفرت تماماً وماتت لأن النبات سحب النيتروجين منها
                  لإنقاذ القمة. النمو متوقف والجذر ضعيف. الحل: أضف سماداً
                  نيتروجينياً سريعاً (نترات الأمونيوم أو اليوريا) بمعدل
                  50-80 كغ/هكتار. NH₄⁺ عند {nh4Level.toFixed(0)} و NO₃⁻ عند{" "}
                  {no3Level.toFixed(0)}.
                </Alert>
              ) : status === "mild-deficiency" ? (
                <Alert type="warning" title="⚠ نقص نيتروجين — اصفرار عام">
                  N عند {nLevel.toFixed(0)}% — النبات شاحب وأصفر اللون. النمو
                  الخضري محدود والأوراق السفلية بدأت تصفر. النوع: NH₄⁺ بنسبة{" "}
                  {(nh4Ratio * 100).toFixed(0)}% و NO₃⁻ بنسبة{" "}
                  {(no3Ratio * 100).toFixed(0)}%. أضف سماداً متوازناً (NPK 20-10-10)
                  لتصحيح النقص. تجنب الإفراط لأن الزيادة تأتي سريعاً!
                </Alert>
              ) : status === "optimal" ? (
                <Alert type="success" title="✅ نيتروجين متوازن — نمو مثالي!">
                  N عند {nLevel.toFixed(0)}% — اللون أخضر زاهي، النمو قوي،
                  والأوراق تؤدي التمثيل الضوئي بكفاءة. يوجد إثمار (الثمار
                  الصحية). pH عند {soilPH.toFixed(1)} — مثالي لامتصاص
                  النيتروجين (النطاق: 6.5-7.5). نسبة NH₄⁺:NO₃⁻ ={" "}
                  {(nh4Ratio * 100).toFixed(0)}% : {(no3Ratio * 100).toFixed(0)}%
                  — متوازنة. استمر!
                </Alert>
              ) : status === "excess" ? (
                <Alert type="warning" title="🔵 هيجان خضري — نيتروجين زائد!">
                  N عند {nLevel.toFixed(0)}% — الأوراق خضراء داكنة جداً وكبيرة
                  الحجم {nh4Toxicity ? "وهناك سمية أمونيوم محتملة!" : ""}.
                  المشكلة: {hasFruit ? "" : "لا إثمار — كل الطاقة للأوراق!"}{" "}
                  {hasPests ? `الآفات بدأت تظهر (${pestCount} حشرة) لأن الجدار الخلوي رقيق.` : ""}
                  الجدران الخلوية مائية وضعيفة — النبات عرضة للأمراض والحشرات.
                  خفف التسميد فوراً! NO₃⁻ عند {no3Level.toFixed(0)} —{" "}
                  {isHighLeaching ? "خطر غسيل مرتفع!" : "قابل للغسيل."}
                </Alert>
              ) : (
                <Alert type="danger" title="☠️ سمية نيتروجين حادة!">
                  N عند {nLevel.toFixed(0)}% — التسمم! الأوراق خضراء سوداء
                  تقريباً وهناك {pestCount} آفة تهاجم النبات. {nh4Toxicity
                    ? `⚠ سمية NH₄⁺ حادة عند pH ${soilPH.toFixed(1)}! الأمونيوم سام للجذور بهذا التركيز.`
                    : `NO₃⁻ عند ${no3Level.toFixed(0)} — ${isHighLeaching ? "خطر غسيل كارثي!" : "خطر غسيل مرتفع"}`}
                  . الحل: اغسل التربة بماء غزير لإزالة النترات ثم سمد باعتدال.
                  استخدم سماداً متوازناً NPK وليس نيتروجين فقط!
                </Alert>
              )}
            </motion.div>

            {/* تلميحات حسب الحالة */}
            {status === "optimal" && nLevel > 45 && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 النيتروجين مسؤول عن اللون الأخضر (الكلوروفيل). في النطاق
                المثالي (40-70%)، النبات يصنع طعامه بكفاءة ويثمر.
              </div>
            )}
            {status === "excess" && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-2 text-center text-xs text-blue-700 font-bold">
                💡 الإفراط في النيتروجين يمنع الإثمار — كل الطاقة تذهب للأوراق
                على حساب الثمار. هذه مشكلة شائعة عند مزارعي الطماطم!
              </div>
            )}
            {soilPH < 6.0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-2 text-center text-xs text-amber-700 font-bold">
                💡 التربة الحمضية (pH {soilPH.toFixed(1)}) تثبت NH₄⁺ ولكنها
                تمنع تحوله إلى NO₃⁻. أضف جيراً لرفع pH إلى 6.5-7.0
                لتحسين توفر النيتروجين.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

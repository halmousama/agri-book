import { useState } from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
  Gauge,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const HydroponicNFT = () => {
  const [waterTemp, setWaterTemp] = useState(22);
  const [ecLevel, setEcLevel] = useState(1.8);
  const [flowRate, setFlowRate] = useState(50);

  // الفيزياء
  const maxDO = 8.5;
  const doDropPerDegree = 0.2;
  const dissolvedOxygen = Math.max(
    1.5,
    maxDO - (waterTemp - 20) * doDropPerDegree
  );

  const isEcLow = ecLevel < 1.2;
  const isEcHigh = ecLevel > 3.0;
  const isEcOptimal = !isEcLow && !isEcHigh;
  const isHeatStress = waterTemp > 25;
  const isRootSuffocating = dissolvedOxygen < 4;

  const rootColor = isRootSuffocating ? "#1e3a8a" : "#d97706";
  const rootOpacity = isRootSuffocating ? 0.9 : 0.7;

  const getStatus = () => {
    if (isHeatStress)
      return {
        label: "🔴 إجهاد حراري!",
        color: "bg-red-100 text-red-700 border-red-300",
      };
    if (isRootSuffocating)
      return {
        label: "🟡 اختناق جذور",
        color: "bg-amber-100 text-amber-700 border-amber-300",
      };
    if (!isEcOptimal)
      return {
        label: "🟠 EC غير مثالي",
        color: "bg-orange-100 text-orange-700 border-orange-300",
      };
    return {
      label: "✅ تشغيل مثالي",
      color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    };
  };
  const status = getStatus();

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-cyan-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sky-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <Droplets className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                نظام NFT — التوازن بين EC و DO
              </h3>
              <p className="text-xs text-slate-500">
                الأكسجين الذائب مقابل التركيز الغذائي في الزراعة المائية
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              status.color
            )}
          >
            {status.label}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="nftBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="waterFlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
                <filter id="nftGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#nftBg)" rx="12" />

              {/* خلفية شبكية */}
              <g opacity="0.03">
                {Array.from({ length: 20 }).map((_, i) => (
                  <line
                    key={`gv-${i}`}
                    x1={i * 13}
                    y1="0" x2={i * 13} y2="320"
                    stroke="white" strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 25 }).map((_, i) => (
                  <line
                    key={`gh-${i}`}
                    x1="0" y1={i * 13}
                    x2="260" y2={i * 13}
                    stroke="white" strokeWidth="1"
                  />
                ))}
              </g>

              {/* أنبوب PVC الرئيسي */}
              <g transform="translate(0, 100)">
                <path
                  d="M-5,0 Q50,0 100,0 Q150,0 200,0 Q250,0 265,0"
                  stroke="#64748b"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M-5,0 Q50,0 100,0 Q150,0 200,0 Q250,0 265,0"
                  stroke="#475569"
                  strokeWidth="28"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* الماء المتدفق */}
                <motion.path
                  d="M-10,0 Q50,0 100,0 Q150,0 200,0 Q250,0 270,0"
                  stroke="url(#waterFlow)"
                  strokeWidth="10"
                  opacity="0.7"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="16 10"
                  animate={{ strokeDashoffset: [0, -52] }}
                  transition={{
                    duration: 2.5 / (flowRate / 25),
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </g>

              {/* الجذور المعلقة */}
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={`root-${i}`}>
                  <motion.path
                    d={`M${30 + i * 38},115 Q${35 + i * 38},170 ${30 + i * 38},${isRootSuffocating ? 145 : 195}`}
                    stroke={rootColor}
                    strokeWidth="3.5"
                    fill="none"
                    opacity={rootOpacity}
                    animate={{
                      d: isRootSuffocating
                        ? `M${30 + i * 38},115 Q${35 + i * 38},145 ${30 + i * 38},155`
                        : `M${30 + i * 38},115 Q${38 + i * 38},170 ${30 + i * 38},195`,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  {/* شعيرات جذرية */}
                  <motion.path
                    d={`M${32 + i * 38},140 L${42 + i * 38},155 M${32 + i * 38},160 L${24 + i * 38},175`}
                    stroke={rootColor}
                    strokeWidth="1.5"
                    fill="none"
                    opacity={rootOpacity * 0.5}
                    animate={{ opacity: isRootSuffocating ? 0.15 : 0.5 }}
                  />
                </g>
              ))}

              {/* النباتات فوق الأنبوب */}
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={`plant-${i}`} transform={`translate(${30 + i * 38}, 85)`}>
                  {/* ساق */}
                  <rect x="-2" y="-28" width="4" height="28" fill="#16a34a" rx="1.5" />
                  {/* أوراق */}
                  <motion.path
                    d={
                      isHeatStress
                        ? "M0,-28 Q-8,-38 -12,-28"
                        : "M0,-28 Q-14,-45 -20,-28"
                    }
                    fill={isHeatStress ? "#fde047" : "#22c55e"}
                    animate={{ scale: isHeatStress ? 0.55 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d={
                      isHeatStress
                        ? "M0,-24 Q8,-34 12,-24"
                        : "M0,-24 Q14,-41 20,-24"
                    }
                    fill={isHeatStress ? "#fde047" : "#16a34a"}
                    animate={{ scale: isHeatStress ? 0.55 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </g>
              ))}

              {/* علامة اختناق الجذور */}
              {isRootSuffocating && (
                <motion.text
                  x="130" y="240" textAnchor="middle" fontSize="10"
                  fill="#60a5fa" fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🫁 الجذور تختنق!
                </motion.text>
              )}

              {/* فقاعات أكسجين */}
              <AnimatePresence>
                {!isHeatStress &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <motion.circle
                      key={`bub-${i}`}
                      cx={45 + i * 35}
                      cy={112}
                      r="2"
                      fill="white"
                      opacity="0.5"
                      animate={{ y: [-5, -20], opacity: [0.5, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeOut",
                      }}
                    />
                  ))}
              </AnimatePresence>

              {/* مؤشرات حية */}
              <g transform="translate(10, 250)">
                <rect
                  x="0" y="0" width="240" height="55" rx="8"
                  fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"
                />

                <text x="10" y="14" fontSize="6" fill="#64748b">DO</text>
                <rect x="10" y="18" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="5" rx="2.5"
                  fill={dissolvedOxygen > 6 ? "#22c55e" : dissolvedOxygen > 4 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(dissolvedOxygen / 8.5) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="85" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {dissolvedOxygen.toFixed(1)}
                </text>

                <text x="120" y="14" fontSize="6" fill="#64748b">EC</text>
                <rect x="120" y="18" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="120" y="18" height="5" rx="2.5"
                  fill={isEcOptimal ? "#22c55e" : "#ef4444"}
                  animate={{ width: `${(ecLevel / 4) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="195" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {ecLevel.toFixed(1)}
                </text>

                <text x="10" y="42" fontSize="6" fill="#64748b">درجة حرارة الماء</text>
                <rect x="10" y="46" width="100" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="46" height="5" rx="2.5"
                  fill={!isHeatStress ? "#22c55e" : "#ef4444"}
                  animate={{ width: `${((waterTemp - 15) / 20) * 100}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="115" y="51" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {waterTemp}°C
                </text>

                <text x="160" y="42" fontSize="6" fill="#64748b">جريان</text>
                <text x="220" y="51" fontSize="7" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {flowRate}%
                </text>
              </g>

              {/* {} تأثير التحذير */}
              {isHeatStress && (
                <motion.rect
                  x="0" y="0" width="260" height="320" rx="12"
                  fill="none" stroke="#ef4444" strokeWidth="2"
                  opacity="0.3"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="درجة حرارة الماء"
              value={waterTemp}
              min={15}
              max={35}
              step={0.5}
              unit="°C"
              color={isHeatStress ? "rose" : "blue"}
              onChange={(e) => setWaterTemp(Number(e.target.value))}
            />
            <Slider
              label="التركيز الغذائي (EC)"
              value={ecLevel}
              min={0}
              max={4}
              step={0.1}
              unit="mS/cm"
              color={!isEcOptimal ? "rose" : "purple"}
              onChange={(e) => setEcLevel(Number(e.target.value))}
            />
            <Slider
              label="سرعة الجريان"
              value={flowRate}
              min={10}
              max={100}
              unit="%"
              color="blue"
              onChange={(e) => setFlowRate(Number(e.target.value))}
            />

            {/* عدادات */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  isHeatStress || isRootSuffocating
                    ? "bg-red-50 border-red-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Wind size={12} className="text-blue-500" /> الأكسجين الذائب
                </div>
                <div
                  className={cn(
                    "text-2xl font-black font-mono",
                    isHeatStress || isRootSuffocating
                      ? "text-red-600"
                      : "text-emerald-600"
                  )}
                >
                  {dissolvedOxygen.toFixed(1)}
                  <span className="text-xs mr-1">mg/L</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      dissolvedOxygen > 6
                        ? "bg-emerald-500"
                        : dissolvedOxygen > 4
                          ? "bg-amber-500"
                          : "bg-red-500"
                    )}
                    animate={{ width: `${(dissolvedOxygen / 8.5) * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  !isEcOptimal
                    ? "bg-red-50 border-red-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Gauge size={12} className="text-purple-500" /> حالة EC
                </div>
                <div
                  className={cn(
                    "text-2xl font-black font-mono",
                    isEcLow
                      ? "text-amber-600"
                      : isEcHigh
                        ? "text-red-600"
                        : "text-emerald-600"
                  )}
                >
                  {isEcLow ? "⚠ نقص" : isEcHigh ? "⚠ سمية" : "✅ مثالي"}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  (النطاق: 1.2 - 3.0 mS/cm)
                </div>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`nft-${waterTemp.toFixed(1)}-${ecLevel.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isHeatStress ? (
                <Alert type="danger" title="🔥 إجهاد حراري — الأكسجين يتبخر!">
                  عند {waterTemp}°C، الأكسجين الذائب = {dissolvedOxygen.toFixed(1)} mg/L فقط
                  (الحد الأدنى 4 mg/L). كل درجة فوق 25°C تقتل الحياة في المحلول. الجذور تختنق
                  ويتحول لونها للأزرق. الحل الفوري: استخدم مبادل حراري أو أضف أحجار هواء (Air
                  Stones) قوية لتعويض نقص الأكسجين.
                </Alert>
              ) : isRootSuffocating ? (
                <Alert type="warning" title="🫁 الجذور تختنق — DO خطير!">
                  الأكسجين الذائب {dissolvedOxygen.toFixed(1)} mg/L — تحت عتبة البقاء (4 mg/L).
                  الجذور تتحول للون الأزرق وتفقد قدرتها على امتصاص المغذيات. المحصول سيذبل خلال
                  ساعات. برّد المحلول أو زد التهوية فوراً.
                </Alert>
              ) : !isEcOptimal ? (
                <Alert type="warning" title="⚖️ EC خارج النطاق المثالي">
                  {isEcLow
                    ? `EC منخفض (${ecLevel.toFixed(1)} mS/cm) — النبات جائع! المحلول خفيف جداً. أضف سماداً مركزاً لرفع EC إلى 1.5-2.5.`
                    : `EC مرتفع (${ecLevel.toFixed(1)} mS/cm) — خطر حرق الجذور! خفف المحلول بماء عذب فوراً.`}
                  الأكسجين جيد ({dissolvedOxygen.toFixed(1)} mg/L) لكن التركيز الغذائي يحتاج
                  ضبطاً. النطاق الأمثل للخضروات الورقية: 1.5-2.5 mS/cm.
                </Alert>
              ) : (
                <Alert type="success" title="✅ تشغيل مثالي — كل المؤشرات خضراء!">
                  درجة حرارة {waterTemp}°C تمنح {dissolvedOxygen.toFixed(1)} mg/L أكسجين (ممتاز).
                  EC عند {ecLevel.toFixed(1)} mS/cm — في قلب النطاق الأمثل. النباتات تتنفس
                  وتتغذى بكفاءة. سرعة الجريان {flowRate}% مناسبة للمحصول الحالي. استمر!
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

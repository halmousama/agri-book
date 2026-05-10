import { useState } from "react";
import {
  Beaker,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  UtensilsCrossed,
  Droplets,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const OsmosisSimulator = () => {
  const rootSalt = 30;
  const [soilSalt, setSoilSalt] = useState(10);

  const isBurn = soilSalt > rootSalt;
  const isStarvation = soilSalt < 5;
  const isEqual = Math.abs(soilSalt - rootSalt) < 2;
  const isOptimal = !isBurn && !isStarvation && !isEqual;

  const waterDirection = isBurn ? "out" : isStarvation ? "in" : isEqual ? "none" : "in";
  const waterFlowLabel = isBurn
    ? "خارج الجذر ⬆"
    : isStarvation
      ? "داخل الجذر ⬇"
      : isEqual
        ? "متوقف"
        : "داخل الجذر ⬇ (طبيعي)";

  const rootWaterLevel = isBurn ? 20 : 85;
  const soilWaterLevel = isBurn ? 80 : 15;

  const getStatus = () => {
    if (isBurn)
      return {
        label: "🔴 احتراق الجذور!",
        color: "bg-red-100 text-red-700 border-red-300",
      };
    if (isStarvation)
      return {
        label: "🟡 نقص غذاء",
        color: "bg-amber-100 text-amber-700 border-amber-300",
      };
    if (isEqual)
      return {
        label: "⚪ توقف امتصاص",
        color: "bg-slate-100 text-slate-600 border-slate-300",
      };
    return {
      label: "✅ توازن مثالي",
      color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    };
  };
  const status = getStatus();

  const rootParticles = Math.floor(rootSalt / 2);
  const soilParticles = Math.floor(soilSalt / 2);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <Beaker className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                ميزان الماء والغذاء — الخاصية الأسموزية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                حركة الماء من التركيز المنخفض إلى المرتفع عبر الغشاء
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
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="waterBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="waterRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
                <filter id="osmosisGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" rx="12" fill="#f0f9ff" />

              {/* ===== وعاء الجذر (يسار) ===== */}
              <g transform="translate(15, 20)">
                <rect x="0" y="0" width="100" height="260" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
                <text x="50" y="18" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="bold">
                  داخل الجذر
                </text>

                {/* جزيئات الملح في الجذر */}
                {Array.from({ length: rootParticles }).map((_, i) => (
                  <circle
                    key={`rp-${i}`}
                    cx={15 + (i % 5) * 18}
                    cy={40 + Math.floor(i / 5) * 18}
                    r="4"
                    fill="#16a34a"
                    opacity="0.6"
                  />
                ))}

                {/* مستوى الماء في الجذر */}
                <motion.rect
                  x="5"
                  animate={{ y: 260 - (rootWaterLevel / 100) * 240, height: (rootWaterLevel / 100) * 240 }}
                  width="90"
                  rx="6"
                  fill="url(#waterBlue)"
                  transition={{ type: "spring", stiffness: 40, damping: 10 }}
                />
                <text x="50" y="250" textAnchor="middle" fontSize="7" fill="#1e40af" fontWeight="bold">
                  {rootSalt} ppm
                </text>
              </g>

              {/* ===== الغشاء بينهما ===== */}
              <g transform="translate(115, 20)">
                <rect x="0" y="0" width="30" height="260" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" />
                <text x="15" y="135" textAnchor="middle" fontSize="6" fill="#64748b" transform="rotate(-90, 15, 135)" fontWeight="bold">
                  غشاء شبه منفذ
                </text>
              </g>

              {/* ===== أيونات تعبر الغشاء ===== */}
              {rootParticles > 0 && soilParticles > 0 && !isEqual && (
                <g>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.circle
                      key={`ion-${i}`}
                      r="3"
                      fill={isBurn ? "#ef4444" : "#3b82f6"}
                      opacity="0.5"
                      initial={{ x: isBurn ? 145 : 115, y: 80 + i * 50 }}
                      animate={{
                        x: isBurn ? [145, 115] : [115, 145],
                        y: [80 + i * 50, 120 + i * 30],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </g>
              )}

              {/* ===== سهم اتجاه الماء ===== */}
              <g transform="translate(130, 150)">
                <motion.g
                  animate={
                    waterDirection === "in"
                      ? { x: [0, -8, 0] }
                      : waterDirection === "out"
                        ? { x: [0, 8, 0] }
                        : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {waterDirection === "in" && (
                    <>
                      <line x1="-35" y1="0" x2="10" y2="0" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                      <polygon points="10,0 0,-8 0,8" fill="#22c55e" />
                      <text x="30" y="5" fontSize="7" fill="#059669" fontWeight="bold">ماء → جذر</text>
                    </>
                  )}
                  {waterDirection === "out" && (
                    <>
                      <line x1="35" y1="0" x2="-10" y2="0" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                      <polygon points="-10,0 0,-8 0,8" fill="#ef4444" />
                      <text x="-50" y="5" fontSize="7" fill="#dc2626" fontWeight="bold">ماء → تربة</text>
                    </>
                  )}
                  {waterDirection === "none" && (
                    <text x="0" y="5" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="bold">
                      = متوازن
                    </text>
                  )}
                </motion.g>
              </g>

              {/* ===== وعاء التربة (يمين) ===== */}
              <g transform="translate(145, 20)">
                <rect x="0" y="0" width="100" height="260" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
                <text x="50" y="18" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="bold">
                  التربة
                </text>

                {/* حبيبات التربة */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle
                    key={`soil-${i}`}
                    cx={15 + (i % 4) * 22}
                    cy={40 + Math.floor(i / 4) * 25}
                    r="5"
                    fill="#78350f"
                    opacity="0.3"
                  />
                ))}

                {/* جزيئات الملح في التربة */}
                {Array.from({ length: soilParticles }).map((_, i) => (
                  <circle
                    key={`sp-${i}`}
                    cx={25 + (i % 4) * 18}
                    cy={80 + Math.floor(i / 4) * 20}
                    r="4"
                    fill={isBurn ? "#ef4444" : "#d97706"}
                    opacity={isBurn ? 0.8 : 0.6}
                  />
                ))}

                {/* مستوى الماء في التربة */}
                <motion.rect
                  x="5"
                  animate={{ y: 260 - (soilWaterLevel / 100) * 240, height: (soilWaterLevel / 100) * 240 }}
                  width="90"
                  rx="6"
                  fill={isBurn ? "url(#waterRed)" : "url(#waterBlue)"}
                  transition={{ type: "spring", stiffness: 40, damping: 10 }}
                />
                <text x="50" y="250" textAnchor="middle" fontSize="7" fill={isBurn ? "#dc2626" : "#1e40af"} fontWeight="bold">
                  {soilSalt} ppm
                </text>
              </g>

              {/* مؤشرات */}
              <g transform="translate(10, 285)">
                <rect x="0" y="0" width="240" height="28" rx="6" fill="white" opacity="0.9" stroke="#e2e8f0" strokeWidth="1" />

                <text x="10" y="10" fontSize="5.5" fill="#64748b">تركيز الجذر</text>
                <text x="10" y="21" fontSize="7" fontFamily="monospace" fill="#16a34a" fontWeight="bold">{rootSalt} ppm</text>

                <text x="85" y="10" fontSize="5.5" fill="#64748b">اتجاه الماء</text>
                <text x="85" y="21" fontSize="7" fontFamily="monospace" fill={isBurn ? "#dc2626" : "#059669"} fontWeight="bold">
                  {waterFlowLabel}
                </text>

                <text x="180" y="10" fontSize="5.5" fill="#64748b">تركيز التربة</text>
                <text x="180" y="21" fontSize="7" fontFamily="monospace" fill={isBurn ? "#dc2626" : "#d97706"} fontWeight="bold">
                  {soilSalt} ppm
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="تركيز الأملاح في التربة"
              value={soilSalt}
              min={0}
              max={60}
              unit="ppm"
              color={
                isBurn ? "rose" : isStarvation ? "amber" : "emerald"
              }
              onChange={(e) => setSoilSalt(Number(e.target.value))}
            />

            {/* مقاييس سريعة */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                <div className="text-[10px] font-bold text-green-700">داخل الجذر</div>
                <div className="text-xl font-black font-mono text-green-600">
                  {rootSalt}{" "}
                  <span className="text-xs">ppm</span>
                </div>
                <div className="w-full h-1.5 bg-green-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    animate={{ width: `${(rootSalt / 60) * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl p-3 border",
                  isBurn
                    ? "bg-red-50 border-red-200"
                    : isStarvation
                      ? "bg-amber-50 border-amber-200"
                      : "bg-amber-50 border-amber-200"
                )}
              >
                <div className="text-[10px] font-bold text-amber-700">التربة</div>
                <div
                  className={cn(
                    "text-xl font-black font-mono",
                    isBurn ? "text-red-600" : "text-amber-600"
                  )}
                >
                  {soilSalt}{" "}
                  <span className="text-xs">ppm</span>
                </div>
                <div className="w-full h-1.5 bg-amber-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      isBurn ? "bg-red-500" : "bg-amber-500"
                    )}
                    animate={{ width: `${(soilSalt / 60) * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
            </div>

            {/* منطقة النطاق الأمثل */}
            <div className="bg-white rounded-xl border border-slate-200 p-3">
              <div className="text-xs font-bold text-slate-600 mb-2">النطاقات:</div>
              <div className="flex gap-1 text-[10px]">
                <div className="flex-1 bg-amber-100 text-amber-800 rounded-lg p-1.5 text-center font-bold">
                  🟡 مجاعة
                  <br />
                  <span className="text-[8px] font-normal">0-5</span>
                </div>
                <div className="flex-1 bg-emerald-100 text-emerald-800 rounded-lg p-1.5 text-center font-bold">
                  🟢 مثالي
                  <br />
                  <span className="text-[8px] font-normal">5-25</span>
                </div>
                <div className="flex-1 bg-blue-100 text-blue-800 rounded-lg p-1.5 text-center font-bold">
                  🔵 جيد
                  <br />
                  <span className="text-[8px] font-normal">25-30</span>
                </div>
                <div className="flex-1 bg-red-100 text-red-800 rounded-lg p-1.5 text-center font-bold">
                  🔴 بلزمة
                  <br />
                  <span className="text-[8px] font-normal">&gt;30</span>
                </div>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`osmosis-${soilSalt}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isBurn ? (
                <Alert type="danger" title="🚨 بلزمة (احتراق الجذور)!">
                  تركيز التربة ({soilSalt} ppm) أعلى من الجذر ({rootSalt} ppm) —
                  انقلاب خطير! الماء يخرج من الجذر إلى التربة بدلاً من الدخول.
                  النبتة تذبل رغم أن التربة رطبة. هذا يحدث عند الإفراط في
                  التسميد. الحل: اغسل التربة بماء عذب فوراً وقلل التسميد.
                </Alert>
              ) : isStarvation ? (
                <Alert type="warning" title="⚠ نقص غذاء (ماء فقط)">
                  تركيز التربة ({soilSalt} ppm) منخفض جداً. الماء يدخل الجذر
                  بكميات كبيرة (انتشار) لكنه خالٍ من الغذاء. النبتة ستنتفخ
                  وتمتلئ ماءً (استسقاء) لكنها ستصفر لاحقاً من الجوع. أضف سماداً
                  لرفع التركيز إلى 10-25 ppm.
                </Alert>
              ) : isEqual ? (
                <Alert type="info" title="⚖️ توازن تام — امتصاص متوقف">
                  تركيز الجذر = التربة ({rootSalt} ppm). لا يوجد فرق في التركيز،
                  لذا لا توجد قوة دافعة لحركة الماء. الامتصاص توقف. لاستعادة
                  الحركة، اضبط تركيز التربة ليصبح أقل من الجذر.
                </Alert>
              ) : (
                <Alert type="success" title="✅ توازن مثالي — امتصاص طبيعي!">
                  تركيز التربة ({soilSalt} ppm) أقل من الجذر ({rootSalt} ppm).
                  الماء ينتقل من التربة (تركيز منخفض) إلى الجذر (تركيز مرتفع)
                  حاملاً معه العناصر الغذائية الذائبة. النبتة تتغذى وتشرب
                  بكفاءة. هذا هو السر وراء التسميد المتوازن!
                </Alert>
              )}
            </motion.div>

            {/* تلميح */}
            {isOptimal && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 الخاصية الأسموزية: الماء يتحرك دائماً من التركيز المنخفض
                (تربة مخففة) إلى المرتفع (داخل الجذر) — وليس العكس!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

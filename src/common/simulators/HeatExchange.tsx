import { useState, useEffect, useCallback } from "react";
import {
  Thermometer,
  Snowflake,
  Home,
  Sun,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Play,
  Pause,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type InsulationType = "single" | "double" | "triple";

export const HeatExchange = () => {
  const [insulation, setInsulation] = useState<InsulationType>("single");
  const [insideTemp, setInsideTemp] = useState(25);
  const [outsideTemp, setOutsideTemp] = useState(5);
  const [isRunning, setIsRunning] = useState(true);

  const lossRates = {
    single: 0.45,
    double: 0.15,
    triple: 0.05,
  };

  const insulLabels = {
    single: { name: "بلاستيك مفرد", color: "text-red-600", bg: "bg-red-50 border-red-200", val: "منخفض" },
    double: { name: "بلاستيك مزدوج", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", val: "متوسط" },
    triple: { name: "مزدوج + عازل حراري", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", val: "عالي" },
  };

  const lossRate = lossRates[insulation];
  const tempDiff = insideTemp - outsideTemp;
  const heatLossRate = tempDiff * lossRate;

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setInsideTemp((prev) => {
        if (prev <= outsideTemp) return outsideTemp;
        return Math.max(outsideTemp, +(prev - lossRate * 0.3).toFixed(2));
      });
    }, 150);
    return () => clearInterval(timer);
  }, [insulation, outsideTemp, isRunning]);

  const reset = useCallback(() => {
    setInsideTemp(25);
    setIsRunning(true);
  }, []);

  const isFrozen = insideTemp <= outsideTemp + 1;
  const isWarm = insideTemp > 15;
  const isCool = insideTemp > 10 && insideTemp <= 15;
  const isCold = insideTemp <= 10 && !isFrozen;

  const houseColor = isFrozen ? "#3b82f6" : isCold ? "#f59e0b" : "#ef4444";
  const houseOpacity = isFrozen ? 0.5 : 0.3;

  const timeToFreeze = isFrozen
    ? 0
    : Math.round((insideTemp - outsideTemp) / (lossRate * 1));

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <Thermometer className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر الحرارة — الدفيئة ليلاً
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                قانون نيوتن للتبريد: الحرارة تبحث عن مخرج
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5",
              isFrozen
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : isWarm
                  ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                  : "bg-amber-100 text-amber-700 border-amber-300"
            )}
            animate={isFrozen ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isFrozen ? (
              <>
                <Snowflake size={12} />
                متجمدة!
              </>
            ) : isWarm ? (
              "✅ دافئة"
            ) : (
              "⚠ تفقد حرارة"
            )}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
                <linearGradient id="heatGlow" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={houseColor} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={houseColor} stopOpacity="0" />
                </linearGradient>
                <filter id="heatBlur">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#nightSky)" rx="12" />

              {/* نجوم */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.circle
                  key={`star-${i}`}
                  cx={15 + Math.random() * 230}
                  cy={10 + Math.random() * 60}
                  r="1"
                  fill="white"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* أرض */}
              <rect x="0" y="220" width="260" height="100" fill="#1a2e05" rx="0" />
              <rect x="0" y="220" width="260" height="4" fill="#365314" />

              {/* درجات حرارة خارجية */}
              <text
                x="10" y="26" fontSize="7" fill="#94a3b8" fontWeight="bold"
              >
                خارج: {outsideTemp}°C
              </text>
              <motion.text
                x="10" y="38" fontSize="6" fill="#64748b"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ❄ ليلة شتاء
              </motion.text>

              {/* الدفيئة */}
              <g transform="translate(130, 120)">
                {/* ظل */}
                <ellipse cx="0" cy="105" rx="70" ry="10" fill="black" opacity="0.3" />

                {/* جدران الدفيئة */}
                <path
                  d="M-65,100 L-65,20 Q-65,-10 0,-40 Q65,-10 65,20 L65,100 Z"
                  fill={isFrozen ? "#1e3a5f" : "#1e293b"}
                  opacity={0.8}
                  stroke={
                    insulation === "single"
                      ? "#64748b"
                      : insulation === "double"
                        ? "#94a3b8"
                        : "#cbd5e1"
                  }
                  strokeWidth={insulation === "single" ? 2 : insulation === "double" ? 5 : 8}
                />
                {/* داخل الدفيئة */}
                <path
                  d="M-60,95 L-60,22 Q-60,-5 0,-35 Q60,-5 60,22 L60,95 Z"
                  fill={isFrozen ? "#0f172a" : `rgba(${isWarm ? "239,68,68" : "245,158,11"}, 0.15)`}
                />

                {/* أيقونة المنزل */}
                <Home
                  x={-15}
                  y={30}
                  size={30}
                  color={houseColor}
                  opacity={0.3}
                />

                {/* درجة الحرارة الداخلية */}
                <text
                  x="0" y="65" textAnchor="middle" fontSize="22"
                  fill={isFrozen ? "#60a5fa" : houseColor}
                  fontWeight="black"
                  filter="url(#heatBlur)"
                >
                  {insideTemp.toFixed(1)}°
                </text>
                <text x="0" y="80" textAnchor="middle" fontSize="6" fill="#94a3b8">
                  داخل الدفيئة
                </text>

                {/* موجات حرارة هاربة */}
                <AnimatePresence>
                  {insideTemp > outsideTemp + 2 &&
                    Array.from({ length: 3 }).map((_, i) => (
                      <motion.path
                        key={`heat-${i}`}
                        d={`M${-10 + i * 10},-${20 + i * 5} Q${-5 + i * 10},-${
                          40 + i * 10
                        } ${-15 + i * 15},-${60 + i * 10}`}
                        stroke={houseColor}
                        strokeWidth="2"
                        fill="none"
                        opacity={insulation === "single" ? 0.6 : insulation === "double" ? 0.3 : 0.1}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [
                            insulation === "single" ? 0.6 : insulation === "double" ? 0.3 : 0.1,
                            0,
                          ],
                          y: [-5, -20],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                </AnimatePresence>
              </g>

              {/* رقاقات ثلج */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.text
                  key={`snow-${i}`}
                  x={20 + i * 30}
                  y={-10}
                  fontSize="10"
                  fill="white"
                  opacity="0.4"
                  animate={{
                    y: [0, 250],
                    x: [0, (i % 2 === 0 ? 1 : -1) * 15],
                  }}
                  transition={{
                    duration: 4 + (i % 3) * 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "linear",
                  }}
                >
                  ❄
                </motion.text>
              ))}

              {/* {} شريط المؤشرات */}
              <g transform="translate(10, 250)">
                <rect
                  x="0" y="0" width="240" height="55" rx="8"
                  fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"
                />

                <text x="10" y="14" fontSize="6" fill="#64748b">
                  درجة الحرارة
                </text>
                <rect x="10" y="18" width="100" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="6" rx="3"
                  fill={isWarm ? "#ef4444" : isCool ? "#f59e0b" : "#3b82f6"}
                  animate={{ width: `${((insideTemp - outsideTemp) / 25) * 100}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="115" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b"
                >
                  {insideTemp.toFixed(1)}°C
                </text>

                <text x="130" y="14" fontSize="6" fill="#64748b">
                  فقدان الحرارة
                </text>
                <rect x="130" y="18" width="100" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="130" y="18" height="6" rx="3"
                  fill={heatLossRate > 5 ? "#ef4444" : heatLossRate > 2 ? "#f59e0b" : "#22c55e"}
                  animate={{ width: `${Math.min(100, heatLossRate * 8)}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="235" y="22" fontSize="5" fontFamily="monospace" fill="#1e293b"
                >
                  {heatLossRate.toFixed(1)}°/ث
                </text>

                <text x="10" y="42" fontSize="6" fill="#64748b">
                  العزل
                </text>
                <text
                  x="100" y="49" fontSize="7" fontFamily="monospace" fill="#1e293b"
                  fontWeight="bold"
                >
                  {insulLabels[insulation].name}
                </text>

                <text x="130" y="42" fontSize="6" fill="#64748b">
                  الوقت للتجمد
                </text>
                <text
                  x="220" y="49" fontSize="7" fontFamily="monospace" fill="#1e293b"
                  fontWeight="bold"
                >
                  {isFrozen ? "❄" : `~${timeToFreeze}ث`}
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            {/* نوع العزل */}
            <div className="bg-white rounded-xl border border-slate-200 p-3">
              <label className="text-xs font-bold text-slate-600 block mb-2">
                نوع الغطاء (العزل الحراري)
              </label>
              <div className="flex gap-1.5">
                {(["single", "double", "triple"] as InsulationType[]).map(
                  (key) => (
                    <button
                      key={key}
                      onClick={() => setInsulation(key)}
                      className={cn(
                        "flex-1 py-2.5 rounded-lg text-xs font-bold border-2 transition-all",
                        insulation === key
                          ? `${insulLabels[key].bg} ${insulLabels[key].color}`
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {insulLabels[key].name}
                      <span className="block text-[9px] font-normal mt-0.5 opacity-70">
                        عزل {insulLabels[key].val}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Slider لدرجة الحرارة الخارجية */}
            <Slider
              label="درجة حرارة الخارج"
              value={outsideTemp}
              min={-5}
              max={15}
              unit="°C"
              color="blue"
              onChange={(e) => setOutsideTemp(Number(e.target.value))}
            />

            {/* زر التحكم + إعادة */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsRunning((p) => !p)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-xs",
                  isRunning
                    ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                )}
              >
                {isRunning ? <Pause size={14} /> : <Play size={14} />}
                {isRunning ? "إيقاف المحاكاة" : "استئناف"}
              </button>
              <button
                onClick={reset}
                className="px-5 py-2.5 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center gap-1.5"
              >
                <Sun size={14} />
                إعادة تسخين
              </button>
            </div>

            {/* عدادات سريعة */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={cn(
                  "rounded-lg p-3 border",
                  isWarm
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-500">داخل</div>
                <div className="text-lg font-black font-mono text-red-600">
                  {insideTemp.toFixed(1)}°
                </div>
              </div>
              <div
                className={cn(
                  "rounded-lg p-3 border",
                  heatLossRate > 5
                    ? "bg-red-50 border-red-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-500">فقدان</div>
                <div className="text-lg font-black font-mono text-amber-600">
                  {heatLossRate.toFixed(1)}
                </div>
              </div>
              <div
                className={cn(
                  "rounded-lg p-3 border",
                  isFrozen
                    ? "bg-blue-50 border-blue-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-500">الفرق</div>
                <div className="text-lg font-black font-mono text-slate-700">
                  {tempDiff.toFixed(1)}°
                </div>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`heat-${insulation}-${insideTemp.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isFrozen ? (
                <Alert type="danger" title="🧊 الدفيئة تجمدت!">
                  الحرارة الداخلية وصلت إلى درجة حرارة الخارج ({insideTemp.toFixed(1)}°C).
                  العزل "{insulLabels[insulation].name}" لم يكن كافياً لليلة شديدة البرودة.
                  الحل: استخدم غطاء مزدوج + عازل حراري أو أضف مصدر تدفئة (سخان هواء).
                </Alert>
              ) : heatLossRate > 5 ? (
                <Alert type="warning" title="⚠ فقدان حرارة سريع!">
                  الدفيئة تفقد {heatLossRate.toFixed(1)}°C كل دقيقة! عند هذا
                  المعدل، ستتجمد خلال {timeToFreeze} ثانية. العزل الحالي
                  "{insulLabels[insulation].name}" غير كافٍ. غيّر إلى عزل
                  مزدوج أو ثلاثي.
                </Alert>
              ) : heatLossRate > 2 ? (
                <Alert type="info" title="ℹ فقدان حرارة متوسط">
                  العزل "{insulLabels[insulation].name}" يحمي الدفيئة ولكن
                  الحرارة تهرب بمعدل {heatLossRate.toFixed(1)}°C/دقيقة. لديك
                  حوالي {timeToFreeze} ثانية قبل التجمد. يمكن تحسين العزل.
                </Alert>
              ) : (
                <Alert type="success" title="✅ عزل ممتاز!">
                  الدفيئة محكمة العزل! فقدان الحرارة {heatLossRate.toFixed(1)}°C/دقيقة فقط.
                  درجة الحرارة الداخلية {insideTemp.toFixed(1)}°C مستقرة. العزل
                  "{insulLabels[insulation].name}" يحمي المحاصيل من الصقيع
                  بكفاءة عالية.
                </Alert>
              )}
            </motion.div>

            {/* تلميح */}
            {insulation === "triple" && isWarm && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 العزل الجيد يقلل فواتير التدفئة بنسبة تصل إلى 70% ويحمي
                المحاصيل من الصقيع دون الحاجة لطاقة إضافية!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

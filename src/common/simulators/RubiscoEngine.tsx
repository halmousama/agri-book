import { useState } from "react";
import {
  Thermometer,
  Wind,
  AlertTriangle,
  CheckCircle,
  Zap,
  Cpu,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type PlantType = "c3" | "c4";

export const RubiscoEngine = () => {
  const [plantType, setPlantType] = useState<PlantType>("c3");
  const [temperature, setTemperature] = useState(25);

  const isC3 = plantType === "c3";
  const isCritical = temperature > 35;

  let co2Fixed = 100;
  let o2Wasted = 0;
  let efficiency = 100;

  if (isC3) {
    if (temperature > 30 && temperature <= 35) {
      co2Fixed = 80 - (temperature - 30) * 6;
      o2Wasted = 20 + (temperature - 30) * 6;
      efficiency = co2Fixed;
    } else if (temperature > 35) {
      co2Fixed = Math.max(10, 50 - (temperature - 35) * 8);
      o2Wasted = 100 - co2Fixed;
      efficiency = co2Fixed;
    }
  } else {
    if (temperature > 40) {
      efficiency = Math.max(60, 100 - (temperature - 40) * 8);
    }
  }

  const engineColor =
    isC3 && isCritical
      ? "#ef4444"
      : isC3 && temperature > 30
        ? "#f59e0b"
        : "#22c55e";

  const statusColor =
    isC3 && isCritical
      ? "bg-red-100 text-red-700 border-red-300"
      : isC3 && temperature > 30
        ? "bg-amber-100 text-amber-700 border-amber-300"
        : "bg-emerald-100 text-emerald-700 border-emerald-300";
  const statusText =
    isC3 && isCritical
      ? "🔴 تصوير ضوئي كاذب!"
      : isC3 && temperature > 30
        ? "🟡 بداية فقدان"
        : "🟢 كفاءة عالية";

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-emerald-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg shadow-emerald-200/50">
              <Cpu className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                محرك Rubisco (C3 vs C4)
              </h3>
              <p className="text-xs text-slate-500">
                إنزيم التمثيل الضوئي — كفاءة تثبيت الكربون
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5",
              statusColor
            )}
            animate={
              isC3 && isCritical ? { scale: [1, 1.03, 1] } : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isC3 && isCritical && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            )}
            {plantType.toUpperCase()} — {statusText}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            {/* Microscope background */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            <svg viewBox="0 0 200 280" className="w-full h-full relative z-10">
              <defs>
                <filter id="glowRub">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="membraneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <rect
                x="5"
                y="5"
                width="190"
                height="270"
                rx="16"
                fill="url(#membraneGrad)"
                stroke="#334155"
                strokeWidth="1.5"
                opacity="0.4"
              />

              {/* === CO2 molecules === */}
              {Array.from({
                length: isCritical && isC3 ? 1 : 4,
              }).map((_, i) => (
                <motion.circle
                  key={`co2-${i}`}
                  cx={20 + i * 8}
                  cy={40 + i * 18}
                  r="4"
                  fill="#22c55e"
                  opacity="0.8"
                  animate={{
                    x: [0, 70],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear",
                  }}
                />
              ))}

              {/* === O2 (wrong) molecules in C3 heat === */}
              <AnimatePresence>
                {isC3 &&
                  isCritical &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <motion.circle
                      key={`o2-bad-${i}`}
                      cx={30 + i * 10}
                      cy={80 + i * 15}
                      r="4"
                      fill="#ef4444"
                      opacity="0.8"
                      animate={{
                        x: [0, 70],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear",
                      }}
                    />
                  ))}
              </AnimatePresence>

              {/* === Rubisco Engine === */}
              <g transform="translate(100, 120)">
                <motion.g
                  animate={
                    isC3 && isCritical
                      ? { rotate: [0, 4, -4, 0] }
                      : { rotate: 0 }
                  }
                  transition={
                    isC3 && isCritical
                      ? { duration: 0.3, repeat: Infinity }
                      : {}
                  }
                >
                  {/* Outer shell */}
                  <rect
                    x="-38"
                    y="-38"
                    width="76"
                    height="76"
                    rx="10"
                    fill={engineColor}
                    opacity="0.85"
                  />
                  {/* Inner core */}
                  <rect
                    x="-28"
                    y="-28"
                    width="56"
                    height="56"
                    rx="6"
                    fill={isC3 ? "#1e293b" : "#0f172a"}
                  />

                  {/* C4 Turbo Shield */}
                  {!isC3 && (
                    <g>
                      <rect
                        x="-32"
                        y="-32"
                        width="64"
                        height="64"
                        rx="8"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        opacity="0.8"
                      />
                      <text
                        x="0"
                        y="-10"
                        textAnchor="middle"
                        fontSize="6"
                        fill="#38bdf8"
                        fontWeight="bold"
                      >
                        مضخة PEP
                      </text>
                      <text
                        x="0"
                        y="6"
                        textAnchor="middle"
                        fontSize="8"
                        fill="#38bdf8"
                        fontWeight="bold"
                      >
                        🔒
                      </text>
                    </g>
                  )}

                  {/* Engine label */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fill="white"
                    fontWeight="bold"
                  >
                    {isC3 ? "C3" : "C4"}
                  </text>
                  <text
                    x="0"
                    y="16"
                    textAnchor="middle"
                    fontSize="6"
                    fill="#94a3b8"
                  >
                    Rubisco
                  </text>
                </motion.g>

                {/* Sugar output */}
                <AnimatePresence>
                  {!isCritical && (
                    <motion.rect
                      x="70"
                      y="-6"
                      width="12"
                      height="12"
                      rx="3"
                      fill="#fbbf24"
                      animate={{ x: [70, 110], opacity: [1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Photorespiration warning */}
                <AnimatePresence>
                  {isC3 && isCritical && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <text
                        x="0"
                        y="-50"
                        textAnchor="middle"
                        fontSize="8"
                        fill="#ef4444"
                        fontWeight="bold"
                      >
                        ⚠ Photorespiration!
                      </text>
                      <motion.path
                        d="M-20,-45 Q20,-60 -20,-45"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        fill="none"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>

              {/* === Labels === */}
              {efficiency > 30 && (
                <text
                  x="155"
                  y="170"
                  fontSize="8"
                  fill="#fbbf24"
                  fontWeight="bold"
                >
                  🍬 سكر
                </text>
              )}
              {isC3 && isCritical && (
                <text
                  x="25"
                  y="200"
                  fontSize="7"
                  fill="#ef4444"
                  fontWeight="bold"
                >
                  🔥 هدر طاقة!
                </text>
              )}

              {/* === Bottom gauge: Efficiency === */}
              <g transform="translate(5, 258)">
                <rect
                  x="0"
                  y="0"
                  width="190"
                  height="16"
                  rx="4"
                  fill="white"
                  opacity="0.85"
                  stroke="#334155"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="11"
                  fontSize="6"
                  fill="#94a3b8"
                  fontWeight="bold"
                >
                  الكفاءة
                </text>
                <rect
                  x="50"
                  y="3"
                  width="95"
                  height="10"
                  rx="3"
                  fill="#1e293b"
                />
                <motion.rect
                  x="50"
                  y="3"
                  height="10"
                  rx="3"
                  fill={
                    efficiency < 40
                      ? "#ef4444"
                      : efficiency < 70
                        ? "#f59e0b"
                        : "#22c55e"
                  }
                  animate={{ width: `${(efficiency / 100) * 95}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="150"
                  y="11"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#f8fafc"
                  fontWeight="bold"
                >
                  {Math.round(efficiency)}%
                </text>
              </g>
            </svg>

            {/* Plant type buttons overlay */}
            <div className="absolute bottom-2 left-2 right-2 z-20">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setPlantType("c3")}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                    isC3
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  )}
                >
                  🌾 قمح (C3)
                </button>
                <button
                  onClick={() => setPlantType("c4")}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                    !isC3
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  )}
                >
                  🌽 ذرة (C4)
                </button>
              </div>
            </div>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="درجة الحرارة"
              value={temperature}
              min={15}
              max={50}
              unit="°C"
              color={
                isC3 && isCritical
                  ? "rose"
                  : isC3 && temperature > 30
                    ? "amber"
                    : "emerald"
              }
              onChange={(e) => setTemperature(Number(e.target.value))}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-1">
                  <Wind size={10} className="text-emerald-500" />
                  CO₂ المثبت
                </div>
                <div className="text-lg font-black font-mono text-emerald-600">
                  {Math.round(co2Fixed)}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    animate={{ width: `${co2Fixed}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-1">
                  <Zap size={10} className="text-red-500" />
                  O₂ المهدر
                </div>
                <div className="text-lg font-black font-mono text-red-500">
                  {isC3 ? Math.round(o2Wasted) : 0}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500 rounded-full"
                    animate={{
                      width: `${isC3 ? o2Wasted : 0}%`,
                    }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  نوع النبات
                </div>
                <div className="text-sm font-black text-emerald-600">
                  {isC3 ? "قمح (C3)" : "ذرة (C4)"}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  الكفاءة الإجمالية
                </div>
                <div
                  className={cn(
                    "text-sm font-black font-mono",
                    efficiency < 40
                      ? "text-red-600"
                      : efficiency < 70
                        ? "text-amber-600"
                        : "text-emerald-600"
                  )}
                >
                  {Math.round(efficiency)}%
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`rub-${plantType}-${temperature}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isC3 && isCritical ? (
                <Alert
                  type="danger"
                  title={`🔴 كارثة تصوير ضوئي كاذب عند ${temperature}°C`}
                >
                  في {temperature}°C، إنزيم Rubisco في القمح (C3) يفقد تمييزه
                  بين CO₂ و O₂. بدلاً من تثبيت الكربون، يلتقط الأكسجين — مسبباً
                  هدر {Math.round(o2Wasted)}% من الطاقة في التنفس الضوئي
                  (Photorespiration). النتيجة: النبات يحرق السكر بدلاً من أن
                  يصنعه. الكفاءة: {Math.round(efficiency)}%.
                </Alert>
              ) : isC3 && temperature > 30 ? (
                <Alert
                  type="warning"
                  title={`🟡 بداية فقدان الكفاءة عند ${temperature}°C`}
                >
                  عند {temperature}°C، بدأ Rubisco يفقد دقته.{" "}
                  {Math.round(o2Wasted)}% من وقته يخطئ بين O₂ و CO₂. الكفاءة
                  تهبط إلى {Math.round(efficiency)}%. أنت تخسر مالاً مع كل درجة
                  حرارة ترتفع. فكر في نباتات C4 للمناطق الحارة.
                </Alert>
              ) : !isC3 ? (
                <Alert
                  type="success"
                  title={`✅ محرك توربو C4 عند ${temperature}°C`}
                >
                  الذرة تملك مضخة PEP Carboxylase التي تضخ CO₂ إلى خلايا البندل
                  شيث حيث Rubisco محمي تماماً من O₂. حتى عند {temperature}°C،
                  الكفاءة {Math.round(efficiency)}%. هذا هو سر نجاح الذرة في
                  المناطق الحارة!
                </Alert>
              ) : (
                <Alert
                  type="success"
                  title={`✅ تشغيل مثالي عند ${temperature}°C`}
                >
                  عند {temperature}°C، Rubisco يعمل بكفاءة{" "}
                  {Math.round(efficiency)}%. CO₂ يثبت بشكل صحيح، و O₂ لا
                  يتدخل. النبات يصنع السكر بكل هدوء.
                </Alert>
              )}
            </motion.div>

            {!isC3 && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 الذرة (C4) تقاوم الحرارة حتى 45°C بفضل مضخة PEP — مثالية
                للمناطق الحارة والجافة.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

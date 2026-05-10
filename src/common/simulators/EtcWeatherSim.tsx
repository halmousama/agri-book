import { useState } from "react";
import {
  Thermometer,
  Wind,
  Sun,
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const EtcWeatherSim = () => {
  const [temperature, setTemperature] = useState(25);
  const [windSpeed, setWindSpeed] = useState(3);
  const [sunIntensity, setSunIntensity] = useState(50);

  const etoBase = 2 + (temperature - 15) * 0.15 + windSpeed * 0.3 + (sunIntensity / 100) * 3;
  const etc = Math.max(0.5, Math.round(etoBase * 10) / 10);

  const soilMoisture = Math.max(0, 100 - etc * 4);
  const needsWater = soilMoisture < 40;
  const isDry = soilMoisture < 15;
  const isFlooded = soilMoisture > 95;

  const valveOpen = needsWater && !isFlooded;
  const soilColor = isDry ? "#d6d3d1" : isFlooded ? "#1e3a5f" : "#78350f";
  const waterDemand = Math.round(etc * 1000);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200 dark:border-sky-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg shadow-sky-200/50">
              <Gauge className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">محطة التبخر-نتح (ETc)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">حساب الاحتياج المائي للمحصول بناءً على الأحوال الجوية</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 font-mono",
              etc > 8
                ? "bg-red-50 border-red-300 text-red-700"
                : etc > 5
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
          >
            {etc} mm/يوم
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-inner bg-gradient-to-b from-sky-100 to-sky-50">
              {/* Sun */}
              <motion.div
                className="absolute top-4 left-6 w-10 h-10 bg-yellow-400 rounded-full shadow-xl z-10"
                animate={{
                  scale: 0.5 + sunIntensity / 100,
                  opacity: 0.3 + sunIntensity / 100,
                }}
              />

              {/* Wind lines */}
              {windSpeed > 2 &&
                Array.from({ length: Math.min(Math.floor(windSpeed), 6) }).map((_, i) => (
                  <motion.div
                    key={`wind-${i}`}
                    className="absolute h-0.5 bg-sky-300 rounded-full"
                    style={{ width: 20 + i * 5, top: 20 + i * 12, right: 10 }}
                    animate={{ x: [0, -60], opacity: [0.6, 0] }}
                    transition={{
                      duration: 1.5 - i * 0.1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "linear",
                    }}
                  />
                ))}

              <svg viewBox="0 0 200 280" className="absolute bottom-0 w-full h-full">
                <defs>
                  <filter id="waterGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Weather station pole */}
                <rect x="95" y="100" width="10" height="150" fill="#94a3b8" rx="2" />
                <circle cx="100" cy="100" r="8" fill="#f59e0b" stroke="white" strokeWidth="2" filter="url(#waterGlow)" />
                <g transform="translate(100, 85)">
                  <motion.g
                    animate={{ rotate: 360 * windSpeed }}
                    transition={{ duration: 2 / Math.max(0.5, windSpeed), repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M0,0 L-15,-8 M0,0 L0,-16 M0,0 L15,-8" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  </motion.g>
                </g>
                <rect x="80" y="115" width="40" height="15" rx="2" fill="#1e293b" />

                {/* Soil */}
                <path d="M0,200 L200,200 L200,280 L0,280 Z" fill={soilColor} />
                <motion.rect
                  x="0"
                  y={200 + (100 - soilMoisture) * 0.8}
                  width="200"
                  height={soilMoisture * 0.8}
                  fill="#3b82f6"
                  opacity="0.4"
                />

                {/* Roots */}
                <path d="M100,200 Q80,230 90,260 M100,200 Q120,240 110,270 M100,200 L100,270" stroke="#d97706" strokeWidth="3" fill="none" opacity="0.7" />

                {/* Plant */}
                <rect x="95" y="160" width="10" height="40" fill="#16a34a" rx="2" />
                <path d="M100,170 Q70,140 60,160 Q80,180 100,170" fill="#22c55e" />
                <path d="M100,160 Q130,130 140,150 Q120,170 100,160" fill="#22c55e" />

                {/* Drip irrigation */}
                {valveOpen &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <motion.circle
                      key={`drip-${i}`}
                      cx={90 + i * 10}
                      cy={195}
                      r="3"
                      fill="#3b82f6"
                      animate={{ y: [0, 15], opacity: [0.8, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}

                {/* Water demand bar */}
                <g transform="translate(10, 255)">
                  <rect x="0" y="0" width="180" height="8" rx="4" fill="#e2e8f0" />
                  <motion.rect
                    x="0" y="0" height="8" rx="4"
                    fill={etc > 8 ? "#ef4444" : etc > 5 ? "#f59e0b" : "#22c55e"}
                    animate={{ width: `${(etc / 12) * 180}px` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </g>
              </svg>

              {needsWater && (
                <motion.div
                  className="absolute bottom-2 left-2 right-2 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-lg text-center border border-amber-200 z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {valveOpen ? "💧 المحبس مفتوح — ري نشط" : "⚠ رطبة كافياً"}
                </motion.div>
              )}
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="درجة الحرارة"
              value={temperature}
              min={10}
              max={45}
              unit="°C"
              color={temperature > 35 ? "rose" : temperature > 30 ? "amber" : "blue"}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />

            <Slider
              label="سرعة الرياح"
              value={windSpeed}
              min={0}
              max={12}
              step={0.5}
              unit="m/s"
              color={windSpeed > 8 ? "rose" : windSpeed > 5 ? "amber" : "blue"}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
            />

            <Slider
              label="الإشعاع الشمسي"
              value={sunIntensity}
              min={0}
              max={100}
              unit="%"
              color={sunIntensity > 80 ? "amber" : "blue"}
              onChange={(e) => setSunIntensity(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">الاحتياج المائي (ETc)</div>
                <div className="text-xl font-black font-mono text-slate-800 dark:text-white">
                  {etc} <span className="text-sm text-slate-500 dark:text-slate-400">mm</span>
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">{waterDemand} لتر/هكتار/يوم</div>
              </div>
              <div className={cn(
                "p-3 rounded-xl border",
                isFlooded ? "bg-blue-50 border-blue-200" : isDry ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"
              )}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400 flex items-center gap-1">
                  <Droplets size={12} /> رطوبة التربة
                </div>
                <div className={cn("text-xl font-black font-mono", isDry ? "text-red-600" : "text-emerald-600")}>
                  {Math.round(soilMoisture)}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", isDry ? "bg-red-500" : isFlooded ? "bg-blue-500" : "bg-emerald-500")}
                    animate={{ width: `${soilMoisture}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
            </div>

            <motion.div
              key={etc.toFixed(1)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isDry ? (
                <Alert type="danger" title="🚨 خطر جفاف! التربة تستنزف بسرعة">
                  الاحتياج المائي {etc} مم/يوم عند {temperature}°C ورياح {windSpeed} m/s وشمس {sunIntensity}%. رطوبة التربة {Math.round(soilMoisture)}% — خطر! قم بالري فوراً بـ {waterDemand} لتر/هكتار. الجفاف يسبب ذبول النبات وتوقف النمو.
                </Alert>
              ) : isFlooded ? (
                <Alert type="warning" title="⚠ رطوبة زائدة — اختناق الجذور">
                  رطوبة التربة {Math.round(soilMoisture)}% — الجذور تغرق. أوقف الري واترك التربة تجف. التبخر-نتح منخفض ({etc} مم/يوم) بسبب الظروف الرطبة.
                </Alert>
              ) : needsWater ? (
                <Alert type="info" title="💧 الاحتياج المائي مرتفع — المحبس مفتوح">
                  عند {temperature}°C وسرعة رياح {windSpeed} m/s وشمس {sunIntensity}%، يتبخر الماء بمعدل {etc} مم يومياً. رطوبة التربة {Math.round(soilMoisture)}%. نظام الري الذكي فعّل المحبس — {waterDemand} لتر/هكتار يجري تعويضها الآن.
                </Alert>
              ) : (
                <Alert type="success" title="✅ تربة رطبة — لا حاجة للري">
                  الاحتياج {etc} مم/يوم فقط عند {temperature}°C. رطوبة التربة {Math.round(soilMoisture)}% كافية. الظروف الجوية معتدلة والنبات في حالة ممتازة.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

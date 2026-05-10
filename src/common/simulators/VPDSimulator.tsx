import { useState } from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const VPDSimulator = () => {
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(50);

  // === الفيزياء الحقيقية لـ VPD ===
  const es = 0.6108 * Math.exp((17.27 * temperature) / (temperature + 237.3));
  const ea = es * (humidity / 100);
  const vpd = Math.max(0, es - ea);

  const isLow = vpd < 0.4;
  const isOptimal = vpd >= 0.8 && vpd <= 1.2;
  const isWarning = vpd > 1.2 && vpd <= 2.0;
  const isCritical = vpd > 2.0;

  const stomataOpen = isOptimal || isWarning;
  const stomataClosed = isCritical;

  const photosynthesisEff = stomataClosed
    ? Math.max(0, 20 - vpd * 5)
    : isLow
      ? 50
      : 100;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200 dark:border-cyan-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <Wind className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">عجز الضغط البخاري — VPD</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">محرك النتح: الفرق بين رطوبة الورقة والهواء</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-4 py-1.5 rounded-xl font-mono font-black text-lg border-2",
              isCritical
                ? "bg-red-50 border-red-300 text-red-700"
                : isOptimal
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                  : "bg-amber-50 border-amber-300 text-amber-700"
            )}
            animate={isCritical ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {vpd.toFixed(2)} kPa
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="vpdSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ecfeff" />
                  <stop offset="100%" stopColor="#f0fdf4" />
                </linearGradient>
                <filter id="stomataGlowVPD">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
              </defs>

              <rect width="200" height="280" fill="url(#vpdSky)" rx="8" />

              {/* سقف الدفيئة */}
              <rect x="15" y="10" width="170" height="6" rx="3" fill="#cbd5e1" opacity="0.6" />
              <text x="100" y="8" textAnchor="middle" fontSize="6" fill="#64748b">الدفيئة</text>

              {/* أصيص التربة */}
              <rect x="40" y="220" width="120" height="50" rx="8" fill="#78350f" opacity="0.8" />

              {/* الساق */}
              <path d="M100,220 L100,100" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />

              {/* الأوراق (تذبل عند VPD مرتفع) */}
              <motion.g
                animate={{ rotate: isCritical ? -25 : isWarning ? -10 : 0, scale: isCritical ? 0.7 : 1 }}
                style={{ originX: "100px", originY: "200px" }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <path d="M100,160 Q150,130 160,170 Q130,190 100,180" fill={stomataClosed ? "#fde047" : "#22c55e"} />
                <path d="M100,130 Q50,100 40,140 Q70,160 100,150" fill={stomataClosed ? "#fde047" : "#22c55e"} />
                <path d="M100,100 Q130,60 100,30 Q70,60 100,100" fill={stomataClosed ? "#fde047" : "#22c55e"} />
              </motion.g>

              {/* الثغور (Stomata) */}
              <g transform="translate(100, 100)">
                <motion.path
                  d={stomataClosed ? "M-8,0 L8,0" : "M-12,-6 L12,-6"}
                  stroke={stomataClosed ? "#dc2626" : "#16a34a"}
                  strokeWidth="3"
                  animate={{ d: stomataClosed ? "M-8,0 L8,0" : "M-12,-6 L12,-6" }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <motion.path
                  d={stomataClosed ? "M-8,0 Q-14,0 -8,0 M8,0 Q14,0 8,0" : "M-12,-6 Q-18,-12 -12,-6 M12,-6 Q18,-12 12,-6"}
                  fill="#22d3ee"
                  animate={{
                    d: stomataClosed ? "M-8,0 Q-14,0 -8,0 M8,0 Q14,0 8,0" : "M-12,-6 Q-18,-12 -12,-6 M12,-6 Q18,-12 12,-6",
                  }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </g>

              {/* بخار الماء في الأجواء المثلى */}
              {isOptimal && (
                <g opacity="0.3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.circle
                      key={`vapor-${i}`}
                      cx={60 + i * 20}
                      cy={40 + Math.sin(i) * 10}
                      r="3"
                      fill="#67e8f9"
                      animate={{ y: [0, -20], opacity: [0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </g>
              )}

              {/* مؤشر VPD */}
              <g transform="translate(10, 250)">
                <rect x="0" y="0" width="180" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="0" y="0" height="6" rx="3"
                  fill={isCritical ? "#ef4444" : isWarning ? "#f59e0b" : isOptimal ? "#22c55e" : "#3b82f6"}
                  animate={{ width: `${Math.min((vpd / 3) * 100, 100)}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </g>

              <text x="100" y="260" textAnchor="middle" fontSize="9" fontWeight="bold" fill={stomataClosed ? "#dc2626" : "#16a34a"}>
                {stomataClosed ? "⚠ الثغور مغلقة!" : isLow ? "🌫 رطوبة زائدة" : "🌿 ثغور مفتوحة"}
              </text>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="درجة الحرارة"
              value={temperature}
              min={10}
              max={45}
              unit="°C"
              color={temperature > 35 ? "rose" : temperature > 28 ? "amber" : "blue"}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />
            <Slider
              label="الرطوبة النسبية (RH)"
              value={humidity}
              min={10}
              max={100}
              unit="%"
              color={humidity < 30 ? "rose" : humidity < 50 ? "amber" : "blue"}
              onChange={(e) => setHumidity(Number(e.target.value))}
            />

            {/* مقياس VPD البصري */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-700">VPD</span>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="text-blue-500">منخفض</span>
                  <span className="text-emerald-500">ذهبي</span>
                  <span className="text-amber-500">تحذير</span>
                  <span className="text-red-500">خطر</span>
                </div>
              </div>
              <div className="w-full h-4 rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-red-500 relative">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-2 border-slate-400 shadow-md"
                  animate={{ left: `${Math.min((vpd / 3) * 100, 100)}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-white" style={{ left: `${(0.8 / 3) * 100}%` }} />
                <div className="absolute top-0 bottom-0 border-r-2 border-dashed border-white" style={{ left: `${(1.2 / 3) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 kPa</span>
                <span className="text-emerald-600 font-bold">0.8-1.2</span>
                <span>3 kPa</span>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`vpd-${vpd.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCritical ? (
                <Alert type="danger" title={`🚨 خطر: VPD مرتفع جداً (${vpd.toFixed(2)} kPa)`}>
                  الجو يجفف النبات بشراهة! العطش الجوي {vpd.toFixed(2)} kPa. الثغور أغلقت بقوة
                  لحماية النبات من الجفاف. التمثيل الضوئي توقف تقريباً (فعالية {Math.round(photosynthesisEff)}%).
                  قم بالرش (تغيم) أو الري بالرش لتخفيف الضغط.
                </Alert>
              ) : isWarning ? (
                <Alert type="warning" title={`⚠ VPD مرتفع (${vpd.toFixed(2)} kPa) — قيد المراقبة`}>
                  الجو يمتص رطوبة النبات بمعدل {vpd.toFixed(2)} kPa. الثغور لا تزال مفتوحة
                  لكنها على حافة الإغلاق. راقب الحالة خلال ساعة. التمثيل الضوئي عند {Math.round(photosynthesisEff)}%.
                </Alert>
              ) : isOptimal ? (
                <Alert type="success" title={`✅ نطاق ذهبي (${vpd.toFixed(2)} kPa)`}>
                  النطاق الذهبي! VPD بين 0.8 و 1.2 kPa. الثغور مفتوحة بالكامل، التمثيل الضوئي
                  بأقصى كفاءة ({Math.round(photosynthesisEff)}%). النبات في قمة نشاطه.
                </Alert>
              ) : (
                <Alert type="info" title={`ℹ VPD منخفض (${vpd.toFixed(2)} kPa) — رطوبة زائدة`}>
                  الرطوبة عالية جداً. الهواء مشبع بالماء، لا يحدث تبخر — وبالتالي لا امتصاص
                  للماء والعناصر الغذائية. خطر الأمراض الفطرية مرتفع جداً. قم بالتهوية.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

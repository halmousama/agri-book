import { useState } from "react";
import { Wind, ThermometerSun, CloudRain, AlertTriangle, CheckCircle, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const TranspirationSimulator = () => {
  const [temperature, setTemperature] = useState(30);
  const [humidity, setHumidity] = useState(40);

  // === المنطق الفيزيائي ===
  let evaporationRate = (temperature * 2) - humidity;
  if (evaporationRate < 0) evaporationRate = 0;

  const isHeatStress = temperature > 45;
  if (isHeatStress) evaporationRate = 0;

  const animDuration = evaporationRate > 0 ? 50 / evaporationRate : 0;

  const stomataColor = isHeatStress ? "#ef4444" : (evaporationRate > 0 ? "#86efac" : "#fde047");
  const skyOpacity = humidity / 100;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-cyan-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sky-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <Wind className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">مضخة النتح الطبيعية — Transpiration</h3>
              <p className="text-xs text-slate-500">كيف يسحب النبات الماء من الجذور إلى الأوراق</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isHeatStress
                ? "bg-red-50 border-red-300 text-red-700"
                : evaporationRate === 0
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
            animate={isHeatStress ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isHeatStress ? "♨ مغلقة (حماية)" : evaporationRate > 0 ? "💨 مفتوحة (سحب)" : "🌫 مغلقة (تشبع)"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 300" className="w-full h-full">
              <defs>
                <linearGradient id="skyTransp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#f0fdf4" />
                </linearGradient>
                <filter id="stomataGlow">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
              </defs>

              <rect width="200" height="300" fill="url(#skyTransp)" rx="8" />

              {/* ضباب الرطوبة */}
              <rect width="200" height="300" fill="white" opacity={skyOpacity * 0.5} />

              {/* الشمس */}
              <g transform="translate(170, 40)">
                <circle r="18" fill={temperature > 40 ? "#f97316" : "#fbbf24"} />
                <g stroke={temperature > 40 ? "#f97316" : "#fbbf24"} strokeWidth="2" strokeLinecap="round" opacity="0.6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={i} x1="0" y1="-22" x2="0" y2="-28" transform={`rotate(${i * 45})`} />
                  ))}
                </g>
              </g>

              {/* التربة */}
              <rect x="0" y="260" width="200" height="40" fill="#92400e" opacity="0.9" />
              <text x="100" y="285" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" opacity="0.8">التربة</text>

              {/* الجذور تحت الأرض */}
              <path d="M100,260 Q100,280 80,290 M100,260 Q100,280 120,290 M100,260 L100,295" stroke="#78350f" strokeWidth="4" fill="none" />

              {/* الجذع المتفرع */}
              <path d="M90,260 L95,150 Q95,120 70,100 M95,150 Q105,120 130,100 M110,260 L105,150" fill="#78350f" stroke="#78350f" strokeWidth="15" strokeLinecap="round" />

              {/* قناة الخشب (الأنبوب الأزرق) */}
              <path d="M100,260 L100,130" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />

              {/* الأوراق - Canopy */}
              <g>
                <circle cx="70" cy="100" r="35" fill="#16a34a" opacity="0.9" />
                <circle cx="130" cy="100" r="35" fill="#15803d" opacity="0.9" />
                <circle cx="100" cy="70" r="40" fill="#22c55e" />
              </g>

              {/* الثغور (Stomata) */}
              <circle cx="80" cy="80" r="3" fill={stomataColor} stroke="white" strokeWidth="1" filter="url(#stomataGlow)" />
              <circle cx="120" cy="80" r="3" fill={stomataColor} stroke="white" strokeWidth="1" filter="url(#stomataGlow)" />
              <circle cx="100" cy="50" r="3" fill={stomataColor} stroke="white" strokeWidth="1" filter="url(#stomataGlow)" />

              {/* جزيئات الماء المتحركة */}
              <AnimatePresence>
                {evaporationRate > 0 && Array.from({ length: 6 }).map((_, i) => (
                  <motion.circle
                    key={`water-${i}`}
                    r="3"
                    fill="#bae6fd"
                    stroke="#0284c7"
                    strokeWidth="1"
                    initial={{ x: 100, y: 260, opacity: 1 }}
                    animate={{
                      y: [260, 200, 150, 100],
                      opacity: [1, 0.8, 0.4, 0],
                    }}
                    transition={{
                      duration: animDuration || 1,
                      repeat: Infinity,
                      delay: i * ((animDuration || 1) / 6),
                      ease: "easeOut",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* مؤشر النتح */}
              <g transform="translate(10, 280)">
                <rect x="0" y="0" width="180" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="0" y="0" height="6" rx="3"
                  fill={isHeatStress ? "#ef4444" : evaporationRate === 0 ? "#f59e0b" : "#22c55e"}
                  animate={{ width: `${Math.min((evaporationRate / 100) * 100, 100)}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="حرارة الجو (المحرك)"
              value={temperature}
              min={10}
              max={50}
              unit="°C"
              color={temperature > 40 ? "rose" : temperature > 30 ? "amber" : "blue"}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />

            <Slider
              label="رطوبة الجو (المقاومة)"
              value={humidity}
              min={0}
              max={100}
              unit="%"
              color={humidity > 70 ? "blue" : humidity > 40 ? "emerald" : "amber"}
              onChange={(e) => setHumidity(Number(e.target.value))}
            />

            {/* التشخيص */}
            <motion.div
              key={`transp-${temperature}-${humidity}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isHeatStress ? (
                <Alert type="danger" title="♨ حرارة عالية! الثغور أغلقت!">
                  درجة الحرارة {temperature}°C. أغلقت الثغور (Stomata) بإحكام لحماية النبات من فقدان الماء.
                  النتح توقف تماماً. التمثيل الضوئي متوقف أيضاً. النبتة في حالة صدمة حرارية.
                  الحل: وفر الظل والرش بالماء البارد.
                </Alert>
              ) : evaporationRate === 0 ? (
                <Alert type="warning" title="🌫 رطوبة مشبعة — توقف التبخر">
                  الرطوبة {humidity}% والهواء مشبع بالماء. لا يوجد فرق في الضغط البخاري (VPD ≈ 0).
                  توقف سحب الماء والامتصاص. النبات لا يستطيع امتصاص العناصر الغذائية.
                  الحل: قم بالتهوية لخفض الرطوبة.
                </Alert>
              ) : (
                <Alert type="success" title={`💨 نتح نشط — معدل ${evaporationRate.toFixed(0)} وحدة`}>
                  حرارة {temperature}°C ورطوبة {humidity}% يخلقان فرق ضغط بخاري يدفع الماء للأعلى.
                  الثغور مفتوحة، الماء يسحب من الجذور إلى الأوراق، والعناصر الغذائية تنتقل معه.
                  هذا هو المحرك الأساسي لدورة الحياة في النبات.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Gauge, Droplets, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const TensiometerSim = () => {
  const [soilMoisture, setSoilMoisture] = useState(60);

  // === فيزياء الشد ===
  // التربة الجافة = شد عالي (قيمة سالبة أكبر)
  // التربة الرطبة = شد منخفض
  const tensionKpa = Math.max(5, Math.round((100 - soilMoisture) * 1.5));
  const isDry = tensionKpa > 60;
  const isCritical = tensionKpa > 80;
  const isWet = tensionKpa < 20;

  // موضع الحبل في لعبة الشد
  const ropePosition = 50 + (tensionKpa > 50 ? Math.min((tensionKpa - 50) * 0.6, 30) : -(50 - tensionKpa) * 0.3);

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-stone-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-stone-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-stone-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-stone-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Gauge className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">ميزان شد التربة — Tensiometer</h3>
              <p className="text-xs text-slate-500">لعبة شد الحبل بين التربة والجذر</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-4 py-1.5 rounded-xl font-mono font-black text-lg border-2",
              isCritical
                ? "bg-red-50 border-red-300 text-red-700"
                : isDry
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
            animate={isCritical ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {tensionKpa} kPa
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <radialGradient id="soilBg" cx="50%" cy="70%" r="60%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fbbf24" opacity="0.3" />
                </radialGradient>
                <filter id="gaugeGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="200" height="280" fill="url(#soilBg)" rx="8" />

              {/* خلفية التربة */}
              <rect x="0" y="140" width="200" height="140" fill="#78350f" opacity="0.25" />

              {/* === حبيبة التربة (يسار) === */}
              <g transform="translate(40, 140)">
                <circle cx="0" cy="0" r="25" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">تربة</text>
              </g>

              {/* === الجذر (يمين) === */}
              <g transform={`translate(${160}, 140)`}>
                <path d="M0,0 Q-10,-20 -5,-35" stroke="#d97706" strokeWidth="6" fill="none" strokeLinecap="round" />
                <circle cx="0" cy="0" r="18" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">جذر</text>
              </g>

              {/* === حبل الشد (Tug of War) === */}
              <motion.path
                d={`M65,135 Q${ropePosition + 15},${140 - tensionKpa * 0.15} ${155},135`}
                stroke="#475569"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ d: `M65,135 Q${ropePosition + 15},${140 - tensionKpa * 0.15} ${155},135` }}
                transition={{ type: "spring", stiffness: 60 }}
              />

              {/* نقطة المنتصف (العلم) */}
              <motion.circle
                cx={ropePosition + 65}
                cy={140 - tensionKpa * 0.1}
                r="5"
                fill={isCritical ? "#ef4444" : isDry ? "#f59e0b" : "#22c55e"}
                filter="url(#gaugeGlow)"
                animate={{ cx: ropePosition + 65, cy: 140 - tensionKpa * 0.1 }}
                transition={{ type: "spring", stiffness: 60 }}
              />

              {/* جزيئات الماء (تختفي في الجفاف) */}
              {!isCritical &&
                Array.from({ length: isDry ? 2 : 5 }).map((_, i) => (
                  <motion.circle
                    key={`water-${i}`}
                    cx={90 + i * 8}
                    cy={170 + Math.sin(i) * 5}
                    r="3"
                    fill="#3b82f6"
                    opacity="0.5"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}

              {/* مؤشر المقياس (Dial) */}
              <g transform="translate(100, 240)">
                <circle cx="0" cy="0" r="30" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                <path d="M-25,0 A25,25 0 0,1 25,0" fill="none" stroke="#22c55e" strokeWidth="4" />
                <path d="M25,0 A25,25 0 0,1 12,22" fill="none" stroke="#f59e0b" strokeWidth="4" />
                <path d="M12,22 A25,25 0 0,1 -12,22" fill="none" stroke="#ef4444" strokeWidth="4" />
                <motion.line
                  x1="0" y1="0"
                  stroke="#1e293b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{
                    x2: Math.sin((tensionKpa / 100) * Math.PI) * 22,
                    y2: -Math.cos((tensionKpa / 100) * Math.PI) * 22,
                  }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <circle cx="0" cy="0" r="4" fill="#1e293b" />
              </g>

              {/* تسميات */}
              <text x="20" y="230" fontSize="8" fill="#16a34a" fontWeight="bold">مبلل</text>
              <text x="170" y="230" fontSize="8" fill="#dc2626" fontWeight="bold">جاف</text>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="رطوبة التربة"
              value={soilMoisture}
              min={5}
              max={100}
              unit="%"
              color={soilMoisture < 20 ? "rose" : soilMoisture < 45 ? "amber" : "emerald"}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium -mt-2">
              <span className="text-blue-500">مشبع</span>
              <span className="text-emerald-500">سعة حقلية</span>
              <span className="text-red-500">ذابل</span>
            </div>

            {/* قراءة Tensiometer */}
            <div className={cn(
              "p-5 rounded-2xl border",
              isCritical ? "bg-red-50 border-red-200" : isDry ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"
            )}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">قراءة جهاز التوتر (Tensiometer)</span>
                <span className={cn(
                  "font-mono font-black text-3xl",
                  isCritical ? "text-red-600" : isDry ? "text-amber-600" : "text-emerald-600"
                )}>
                  -{tensionKpa}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                <span className="font-bold">وحدة القياس:</span> kPa (كيلو باسكال) أو cBar
              </div>
            </div>

            {/* لعبة الشد */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gauge size={18} className="text-slate-500" />
                <span className="font-bold text-sm text-slate-700">لعبة شد الحبل:</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute top-0 h-full rounded-full"
                  animate={{
                    left: `${ropePosition}%`,
                    width: "8px",
                    backgroundColor: isCritical ? "#ef4444" : isDry ? "#f59e0b" : "#22c55e",
                  }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                <span>التربة (تسحب)</span>
                <span>الجذر (يسحب)</span>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`tension-${tensionKpa}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCritical ? (
                <Alert type="danger" title={`🚨 شد ${tensionKpa} kPa — خطر!`}>
                  قراءة حرجة! التوتر {tensionKpa} kPa يعني أن حبيبات التربة تمسك ببقايا الماء بقوة شديدة جداً
                  لدرجة أن جذور النبات لا تستطيع سحبه. النبات يذبل حتى لو كانت التربة تبدو رطبة قليلاً.
                  اروِ فوراً!
                </Alert>
              ) : isDry ? (
                <Alert type="warning" title={`⚠ شد ${tensionKpa} kPa — يحتاج ري`}>
                  التوتر {tensionKpa} kPa. الجذر يبذل مجهوداً كبيراً لسحب الماء من التربة.
                  قم بالري قريباً قبل وصول النقطة الحرجة.
                </Alert>
              ) : (
                <Alert type="success" title={`✅ شد ${tensionKpa} kPa — مريح`}>
                  جهد ممتاز. التوتر {tensionKpa} kPa. التربة محتفظة بالماء بشكل ميسّر،
                  الجذور تسحب الماء بسهولة تامة دون إجهاد.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

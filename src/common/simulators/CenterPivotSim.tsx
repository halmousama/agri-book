import { useState, useCallback } from "react";
import {
  Sprout,
  RotateCcw,
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Play,
  Pause,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type NozzleMode = "uniform" | "graduated";

export const CenterPivotSim = () => {
  const [rotationSpeed, setRotationSpeed] = useState(50);
  const [nozzleMode, setNozzleMode] = useState<NozzleMode>("uniform");
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Derived values
  const waterAmount = Math.max(20, 100 - rotationSpeed * 0.8);
  const centerWater = nozzleMode === "uniform" ? Math.min(100, waterAmount * 1.8) : waterAmount * 1.1;
  const edgeWater = nozzleMode === "uniform" ? Math.max(5, waterAmount * 0.3) : waterAmount * 0.9;

  const isCenterWaterlogged = centerWater > 90;
  const isEdgeDry = edgeWater < 25;
  const isUniform = !isCenterWaterlogged && !isEdgeDry && nozzleMode === "graduated";

  const getFieldColor = (radius: number) => {
    const water = nozzleMode === "uniform" ? centerWater * (1 - radius) + edgeWater * radius : waterAmount * (0.9 + radius * 0.2);
    if (water > 90) return "#1e3a8a";
    if (water > 70) return "#3b82f6";
    if (water > 50) return "#22c55e";
    if (water > 30) return "#f59e0b";
    return "#92400e";
  };

  const rings = Array.from({ length: 12 }).map((_, i) => {
    const r = (i + 1) / 12;
    const radius = 40 + r * 55;
    return { radius, color: getFieldColor(r), index: i };
  });

  const getEfficiencyLabel = () => {
    if (isCenterWaterlogged) return { text: "مركز مغمور — تصريف زائد", color: "text-red-600" };
    if (isEdgeDry) return { text: "أطراف جافة — نقص مائي", color: "text-amber-600" };
    return { text: "توزيع مثالي", color: "text-emerald-600" };
  };

  const efficiency = getEfficiencyLabel();
  const toggleRotation = useCallback(() => setIsAutoRotating((r) => !r), []);
  const resetRotation = useCallback(() => setIsAutoRotating(true), []);
  const rotationDuration = Math.max(3, 20 - rotationSpeed / 7);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-sky-200 dark:border-sky-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg shadow-sky-200/50">
              <RefreshCw className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">الري المحوري — Center Pivot</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">نظام الرش المحوري الذكي لتوزيع المياه</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              nozzleMode === "graduated"
                ? "bg-purple-50 border-purple-300 text-purple-700"
                : "bg-amber-50 border-amber-300 text-amber-700"
            )}
          >
            {nozzleMode === "graduated" ? "رشاشات متدرجة ✅" : "رشاشات متساوية"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== Visual Lab ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <radialGradient id="fieldGrad" cx="50%" cy="46%" r="44%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fbbf24" opacity="0.3" />
                </radialGradient>
              </defs>

              <rect width="200" height="280" fill="#f0f9ff" rx="8" />

              {/* === Circular Field (top-down) === */}
              <g transform="translate(100, 130)">
                <circle cx="0" cy="0" r="85" fill="#fef3c7" stroke="#d6d3d1" strokeWidth="1" />

                {rings.map((ring) => (
                  <circle key={ring.index} cx="0" cy="0" r={ring.radius} fill="none" stroke={ring.color}
                    strokeWidth={ring.index === 0 ? 85 : 6} opacity={ring.index === 0 ? 0.35 : 0.6} />
                ))}

                <circle cx="0" cy="0" r={45} fill={nozzleMode === "uniform" && isCenterWaterlogged ? "#1e3a8a" : "#3b82f6"} opacity="0.25" />

                {nozzleMode === "uniform" && isEdgeDry && (
                  <circle cx="0" cy="0" r="85" fill="none" stroke="#92400e" strokeWidth="3" strokeDasharray="4 4" opacity="0.5" />
                )}

                {/* === Pivot Arm === */}
                <motion.g
                  animate={{ rotate: isAutoRotating ? 360 : 0 }}
                  transition={{ duration: rotationDuration, repeat: isAutoRotating ? Infinity : 0, ease: "linear" }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <line x1="0" y1="0" x2="85" y2="0" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                  {[20, 40, 60].map((dist) => (
                    <line key={`truss-${dist}`} x1={dist} y1="0" x2={dist + 8} y2="-3" stroke="#475569" strokeWidth="1" />
                  ))}

                  {[15, 30, 45, 60, 75].map((dist) => (
                    <g key={`sprinkler-${dist}`}>
                      <circle cx={dist} cy="0" r="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                      <motion.path d={`M${dist},-3 Q${dist + 4},-8 ${dist + 2},-12`} stroke="#60a5fa" strokeWidth="1" fill="none"
                        opacity={nozzleMode === "graduated" ? 0.5 + (dist / 85) * 0.5 : 0.5}
                        animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: dist * 0.1 }} />
                      <motion.path d={`M${dist},3 Q${dist + 4},8 ${dist + 2},12`} stroke="#60a5fa" strokeWidth="1" fill="none"
                        opacity={nozzleMode === "graduated" ? 0.5 + (dist / 85) * 0.5 : 0.5}
                        animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: dist * 0.15 }} />
                    </g>
                  ))}

                  <circle cx="85" cy="0" r="5" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5" />
                  <motion.path d="M85,-5 Q95,-15 90,-25" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.6"
                    animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 0.6, repeat: Infinity }} />
                </motion.g>

                <circle cx="0" cy="0" r="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <circle cx="0" cy="0" r="2" fill="#38bdf8" />

                <motion.path d="M0,-12 L-4,-6 L4,-6 Z" fill="#64748b"
                  animate={{ rotate: isAutoRotating ? 360 : 0 }}
                  transition={{ duration: rotationDuration, repeat: isAutoRotating ? Infinity : 0, ease: "linear" }}
                  style={{ transformOrigin: "0px -12px" }} />
              </g>

              {/* === Legend === */}
              <g transform="translate(15, 235)">
                <rect x="0" y="0" width="170" height="35" rx="6" fill="white" opacity="0.8" />
                <circle cx="15" cy="15" r="4" fill="#1e3a8a" /><text x="23" y="18" fontSize="7" fill="#1e3a8a">غمر</text>
                <circle cx="55" cy="15" r="4" fill="#22c55e" /><text x="63" y="18" fontSize="7" fill="#16a34a">مثالي</text>
                <circle cx="100" cy="15" r="4" fill="#f59e0b" /><text x="108" y="18" fontSize="7" fill="#d97706">جاف</text>
                <circle cx="140" cy="15" r="4" fill="#92400e" /><text x="148" y="18" fontSize="7" fill="#92400e">قاحل</text>
              </g>

              <text x="100" y="220" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="bold">
                💧 مياه مصروفة: {Math.round(waterAmount * 1.5)} L/m²
              </text>
            </svg>
          </div>

          {/* ===== Dashboard Controls ===== */}
          <div className="flex-1 space-y-3">
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-purple-800 flex items-center gap-2">
                  <Droplets size={16} /> نوع الرشاشات
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setNozzleMode("uniform")}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]",
                    nozzleMode === "uniform" ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50")}>
                  رشاشات متساوية
                </button>
                <button onClick={() => setNozzleMode("graduated")}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]",
                    nozzleMode === "graduated" ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50")}>
                  رشاشات متدرجة
                </button>
              </div>
            </div>

            <Slider label="سرعة الدوران" value={rotationSpeed} min={5} max={100} unit="%"
              color={rotationSpeed >= 70 ? "emerald" : rotationSpeed >= 40 ? "amber" : "rose"}
              onChange={(e) => setRotationSpeed(Number(e.target.value))} />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium -mt-2">
              <span>⬅ بطيء (ري غزير)</span>
              <span className="text-purple-500">⬅ متوسط</span>
              <span>سريع (ري خفيف) ➡</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={toggleRotation}
                className={cn("py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2",
                  isAutoRotating ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-200" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-200")}>
                {isAutoRotating ? <RotateCcw size={18} /> : <Play size={18} />}
                {isAutoRotating ? "إيقاف" : "تشغيل"}
              </button>
              <button onClick={resetRotation}
                className="py-3 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={18} /> إعادة الضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className={cn("rounded-xl p-3 border", isCenterWaterlogged ? "bg-blue-50 border-blue-200" : "bg-emerald-50 border-emerald-200")}>
                <div className="text-[10px] font-bold text-slate-600">المركز</div>
                <div className={cn("text-lg font-black font-mono", isCenterWaterlogged ? "text-blue-600" : "text-emerald-600")}>{centerWater.toFixed(0)}%</div>
              </div>
              <div className={cn("rounded-xl p-3 border", nozzleMode === "graduated" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200")}>
                <div className="text-[10px] font-bold text-slate-600">الأطراف</div>
                <div className={cn("text-lg font-black font-mono", nozzleMode === "graduated" ? "text-emerald-600" : "text-amber-600")}>{edgeWater.toFixed(0)}%</div>
              </div>
              <div className={cn("rounded-xl p-3 border", isUniform ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200")}>
                <div className="text-[10px] font-bold text-slate-600">السرعة</div>
                <div className="text-lg font-black font-mono text-purple-600">{rotationSpeed}%</div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div key={`pivot-${nozzleMode}-${rotationSpeed}-${isAutoRotating}`}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {isCenterWaterlogged && nozzleMode === "uniform" ? (
                <Alert type="danger" title="🚨 غمر في المركز — تصريف زائد!">
                  الرشاشات المتساوية توزع الماء بشكل متساوٍ على طول الذراع، لكن المساحة عند المركز أصغر بكثير!
                  النتيجة: تشبع بالماء في المنتصف ({centerWater.toFixed(0)}%) بينما الأطراف جافة ({edgeWater.toFixed(0)}%).
                  الفاقد من الماء بالتبخر والبزل كبير. الحل: استخدم رشاشات متدرجة.
                </Alert>
              ) : isEdgeDry && nozzleMode === "uniform" ? (
                <Alert type="warning" title="⚠ أطراف جافة — توزيع غير متساوٍ">
                  المركز يتلقى {centerWater.toFixed(0)}% بينما الأطراف {edgeWater.toFixed(0)}% فقط.
                  الرشاشات المتساوية تسبب فائضاً في الوسط وعجزاً في الأطراف. المحصول في الأطراف سيعاني من الإجهاد المائي.
                </Alert>
              ) : nozzleMode === "graduated" && isUniform ? (
                <Alert type="success" title="✅ توزيع مثالي للمياه!">
                  الرشاشات المتدرجة تعوض الفرق — فتحات أكبر عند الأطراف وأصغر عند المركز.
                  المحصول بالكامل يحصل على كمية متساوية من الماء ({waterAmount.toFixed(0)}% ±5%).
                  كفاءة الري: {Math.round(95 - Math.abs(50 - rotationSpeed) * 0.3)}%. هذا هو التصميم الهندسي الصحيح للري المحوري.
                </Alert>
              ) : (
                <Alert type="info" title={nozzleMode === "graduated" ? "✅ رشاشات متدرجة — توزيع متحسن" : "⚠ جرب الرشاشات المتدرجة"}>
                  {nozzleMode === "graduated"
                    ? `الرشاشات المتدرجة تحسن التوزيع: المركز ${centerWater.toFixed(0)}%، الأطراف ${edgeWater.toFixed(0)}%. الفرق ضئيل (< 15%).`
                    : `المركز ${centerWater.toFixed(0)}% مقابل ${edgeWater.toFixed(0)}% للأطراف. الفرق كبير. الرشاشات المتدرجة تحل هذه المشكلة.`}
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

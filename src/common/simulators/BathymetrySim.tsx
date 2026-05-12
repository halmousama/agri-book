import { useState } from "react";
import { Waves, Fish, AlertTriangle, Info, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

const terrainZones = [
  { label: "شاطئ رملي", y: 40, fish: 0 },
  { label: "حاجز مرجاني", y: 55, fish: 2 },
  { label: "منحدر قاري", y: 70, fish: 3 },
  { label: "حفرة عميقة", y: 88, fish: 4 },
];

export const BathymetrySim = () => {
  const [tideLevel, setTideLevel] = useState(50);
  const [activeZone, setActiveZone] = useState(1);

  const tideHeight = 20 + (tideLevel / 100) * 25;
  const waterSurface = 100 - tideHeight;

  const getFishDepth = (zoneIdx: number) => {
    const base = terrainZones[zoneIdx].y;
    return base + (50 - tideLevel) * 0.08;
  };

  const getDiagnosis = () => {
    const z = terrainZones[activeZone];
    if (tideLevel < 25) return { type: "warning" as const, title: "مد منخفض — الجزر", msg: "الأسماك تبتعد عن الشاطئ. ركز على الحفر والقنوات العميقة. استثناء: الحبار والقرنيط ينشطان في الجزر." };
    if (tideLevel > 75) return { type: "success" as const, title: "مد مرتفع — تغذية مثالية", msg: "المد العالي يجلب الغذاء للأسماك. وقت ممتاز للصيد قرب الشواطئ والمراجيح. السمك يدخل مع التيار ليتغذى." };
    if (z.fish >= 3) return { type: "info" as const, title: `منطقة واعدة: ${z.label}`, msg: "المنحدرات والحفر العميقة ملاذ الأسماك الكبيرة. هذه النقاط تستحق التركيز في هذا الوقت." };
    return { type: "info" as const, title: `منطقة: ${z.label}`, msg: "المنطقة معتدلة. السمك موجود لكنه ليس في ذروة نشاطه. جرب تغيير العمق أو الطعم." };
  };

  const diag = getDiagnosis();

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
              <Map className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">مختبر التضاريس البحرية — Bathymetry</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">حركة المد تغير وجه قاع البحر</p>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
            diag.type === "success" ? "bg-emerald-50 border-emerald-300 text-emerald-700" :
            diag.type === "warning" ? "bg-amber-50 border-amber-300 text-amber-700" :
            "bg-blue-50 border-blue-300 text-blue-700"
          )}>
            {tideLevel < 25 ? "🌊 جزر" : tideLevel > 75 ? "🌊 مد عالي" : "🌊 مد متوسط"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 shrink-0 space-y-2">
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-2">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#b0e0ff" />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                <rect width="300" height="200" fill="url(#skyGrad)" rx="8" />

                <motion.path
                  d={`M0,${waterSurface} Q25,${waterSurface - 6} 50,${waterSurface} T100,${waterSurface} T150,${waterSurface} T200,${waterSurface} T250,${waterSurface} T300,${waterSurface}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  animate={{ d: [
                    `M0,${waterSurface} Q25,${waterSurface - 6} 50,${waterSurface} T100,${waterSurface} T150,${waterSurface} T200,${waterSurface} T250,${waterSurface} T300,${waterSurface}`,
                    `M0,${waterSurface + 2} Q25,${waterSurface - 4} 50,${waterSurface + 2} T100,${waterSurface} T150,${waterSurface + 2} T200,${waterSurface} T250,${waterSurface + 2} T300,${waterSurface}`,
                  ]}}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />

                <rect x="0" y={waterSurface} width="300" height={200 - waterSurface} fill="url(#waterGrad)" />

                <path d={`M0,150 Q40,140 60,155 Q80,170 100,148 Q120,130 140,165 Q160,185 180,155 Q200,130 220,175 Q240,190 260,145 Q280,135 300,160 L300,200 L0,200 Z`} fill="#8B4513" opacity="0.7" />
                <path d={`M0,160 Q40,150 60,165 Q80,178 100,158 Q120,142 140,175 Q160,192 180,165 Q200,145 220,182 Q240,195 260,155 Q280,146 300,168 L300,200 L0,200 Z`} fill="#654321" opacity="0.5" />

                {terrainZones.map((zone, i) => {
                  const fx = 40 + i * 70;
                  const fy = getFishDepth(i);
                  const isTarget = activeZone === i;
                  return (
                    <g key={i}>
                      <motion.circle
                        cx={fx}
                        cy={fy + 10}
                        r={isTarget ? 8 : 5}
                        fill={isTarget ? "#fbbf24" : "#94a3b8"}
                        animate={isTarget ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveZone(i)}
                      />
                      {zone.fish > 0 && Array.from({ length: zone.fish }).map((_, fi) => (
                        <motion.g
                          key={fi}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 1 + fi * 0.3, repeat: Infinity, delay: fi * 0.4 }}
                        >
                          <text x={fx - 10 + fi * 8} y={fy + 5 + fi * 6} fontSize="10" textAnchor="middle">
                            🐟
                          </text>
                        </motion.g>
                      ))}
                      <text x={fx} y={160 + i * 8} fontSize="6" textAnchor="middle" fill="#64748b">{zone.label}</text>
                    </g>
                  );
                })}

                <text x="150" y="14" fontSize="8" fill="#475569" textAnchor="middle" fontWeight="bold">مقطع عرضي في قاع البحر</text>
              </svg>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <Slider
              label="منسوب المد ( Tide Level )"
              value={tideLevel}
              min={0}
              max={100}
              unit="%"
              color="blue"
              onChange={(e) => setTideLevel(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              {terrainZones.map((zone, i) => (
                <button
                  key={i}
                  onClick={() => setActiveZone(i)}
                  className={cn(
                    "p-3 rounded-xl text-xs font-bold border-2 transition-all text-right",
                    activeZone === i
                      ? "bg-blue-50 border-blue-400 text-blue-700 shadow-md"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Fish size={14} className={activeZone === i ? "text-blue-500" : "text-slate-400"} />
                    <span>{zone.label}</span>
                  </div>
                  <span className="block mt-1 text-[10px] text-slate-400">{zone.fish > 2 ? "🐟🐟🐟 نشاط عالي" : zone.fish > 1 ? "🐟🐟 نشاط متوسط" : "🐟 قليل"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Alert type={diag.type} title={diag.title}>{diag.msg}</Alert>
          <Alert type="info" title="💡 نصيحة الخبير">
            تغيير المد بمقدار 1 متر يمكن أن يحرك السمك مئات الأمتار. ادرس خريطة الأعماق (Bathymetry) قبل كل رحلة.
          </Alert>
        </div>
      </div>
    </div>
  );
};

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Droplets, Flame, Gauge, Wind, Zap } from "lucide-react";

const SUN_POSITIONS = [
  { label: "فجر", value: 0, factor: 0.15 },
  { label: "ظهر", value: 1, factor: 1.0 },
  { label: "غسق", value: 2, factor: 0.4 },
  { label: "ليل", value: 3, factor: 0.0 },
];

const SUN_POSITION_LABELS = SUN_POSITIONS.map((p) => p.label);

const EnergyWaterSim = () => {
  const [sunPosition, setSunPosition] = useState(1); // 0=fajr, 1=noon, 2=dusk, 3=night
  const [animalCount, setAnimalCount] = useState(30); // cows equivalent
  const [storageLevel, setStorageLevel] = useState(65); // water storage %

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sunFactor = SUN_POSITIONS[sunPosition].factor;
  const maxPower = 25000;
  const powerOutput = Math.round(maxPower * sunFactor);
  const solarPercentage = (sunFactor * 100);

  // Biogas calculations
  const wastePerAnimal = 15; // kg/day per cow equivalent
  const totalWaste = animalCount * wastePerAnimal; // kg/day
  const biogasPerKg = 0.045; // m³ per kg
  const biogasOutput = Math.round(totalWaste * biogasPerKg * 10) / 10;
  const electricityFromBiogas = Math.round(biogasOutput * 2); // 2 kWh per m³

  // Water sources animation
  const waterSources = [
    { name: "مطر", icon: "🌧️", pct: 15, color: "#3b82f6" },
    { name: "بئر", icon: "⛰️", pct: 45, color: "#06b6d4" },
    { name: "مكثفات جوية", icon: "🌊", pct: 10, color: "#0ea5e9" },
    { name: "ماء معاد", icon: "🔄", pct: 30, color: "#22c55e" },
  ];

  // What solar powers
  const solarLoads = [
    { name: "مضخات", value: 1200, unit: "kWh/يوم" },
    { name: "تبريد", value: 800, unit: "kWh/يوم" },
    { name: "إنارة", value: 300, unit: "kWh/يوم" },
    { name: "عقل رقمي", value: 100, unit: "kWh/يوم" },
  ];
  const totalLoad = solarLoads.reduce((s, l) => s + l.value, 0);

  const isSolarSufficient = powerOutput >= totalLoad;

  const gaugeRotation = (powerOutput / maxPower) * 180;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                ⚡ قلب المزرعة النابض — الطاقة الشمسية + الماء + الغاز الحيوي
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تفاعل مصادر الطاقة والماء في المزرعة الحية
              </p>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5 ${
              isSolarSufficient
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-amber-50 border-amber-300 text-amber-700"
            }`}
          >
            {isSolarSufficient ? "✅ طاقة كافية" : "⚠ طاقة محدودة"}
          </div>
        </div>

        {/* 3-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ===== LEFT: Solar Panel ===== */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Sun size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">محطة الطاقة الشمسية</h4>
            </div>

            {/* Sun position selector */}
            <div className="mb-4">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
                موقع الشمس
              </label>
              <div className="grid grid-cols-4 gap-1">
                {SUN_POSITIONS.map((pos, i) => (
                  <button
                    key={pos.label}
                    onClick={() => setSunPosition(i)}
                    className={`py-2 rounded-lg text-xs font-bold border-2 transition-all ${
                      sunPosition === i
                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-amber-700 dark:text-amber-300"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gauge */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  {/* Background arc */}
                  <path
                    d="M15,105 A52,52 0 0,1 105,105"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Active arc */}
                  <motion.path
                    d="M15,105 A52,52 0 0,1 105,105"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: `${(gaugeRotation / 180) * 163} 163`,
                      strokeDashoffset: 0,
                    }}
                    initial={false}
                    animate={{
                      strokeDasharray: `${(gaugeRotation / 180) * 163} 163`,
                    }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  {/* Needle */}
                  <motion.line
                    x1="60" y1="105"
                    x2="60" y2="55"
                    stroke="#1e293b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={false}
                    animate={{
                      transform: `rotate(${gaugeRotation - 90}, 60, 105)`,
                    }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <circle cx="60" cy="105" r="4" fill="#1e293b" />
                  <text x="60" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f59e0b" fontFamily="monospace">
                    {powerOutput.toLocaleString()}
                  </text>
                  <text x="60" y="62" textAnchor="middle" fontSize="6" fill="#64748b">
                    kWh/يوم
                  </text>
                </svg>
              </div>
            </div>

            {/* Solar loads */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">الأحمال التي تغذيها:</div>
              {solarLoads.map((load) => {
                const pct = (load.value / maxPower) * 100;
                return (
                  <div key={load.name} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 w-14">{load.name}</span>
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-amber-500"
                        initial={false}
                        animate={{ width: `${pct}%` }}
                        transition={{ type: "spring", stiffness: 40 }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 w-16 text-left">
                      {load.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-700/30">
              <div className="text-[10px] text-slate-500 dark:text-slate-400">الإجمالي المستهلك</div>
              <div className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">{totalLoad.toLocaleString()} kWh/يوم</div>
            </div>
          </div>

          {/* ===== CENTER: Water Cycle ===== */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Droplets size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">دورة الماء</h4>
            </div>

            {/* SVG Water Diagram */}
            <div className="w-full aspect-square max-h-[200px] mb-4">
              <svg viewBox="0 0 200 180" className="w-full h-full">
                <defs>
                  <linearGradient id="waterFlowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Central reservoir */}
                <circle cx="100" cy="90" r="28" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
                <rect x="76" y="66" width="48" height="48" rx="50%" fill="url(#waterFlowGrad)" />
                <text x="100" y="93" textAnchor="middle" fontSize="7" fill="#0284c7" fontWeight="bold">الخزان</text>
                <text x="100" y="102" textAnchor="middle" fontSize="5" fill="#0ea5e9">{storageLevel}%</text>

                {/* Sources */}
                {waterSources.map((src, i) => {
                  const angle = (i / waterSources.length) * 360 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const sx = 100 + 55 * Math.cos(rad);
                  const sy = 90 + 55 * Math.sin(rad);

                  const midX = (sx + 100) / 2 + (sx - 100) * 0.15;
                  const midY = (sy + 90) / 2 + (sy - 90) * 0.15 - 8;

                  return (
                    <g key={src.name}>
                      <motion.line
                        x1={sx}
                        y1={sy}
                        x2={100}
                        y2={90}
                        stroke={src.color}
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                        opacity="0.5"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      />
                      {/* Flow particle */}
                      <motion.circle
                        r="2.5"
                        fill={src.color}
                        opacity="0.7"
                        animate={{
                          cx: [sx, 100],
                          cy: [sy, 90],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: "easeInOut",
                        }}
                      />
                      <circle cx={sx} cy={sy} r="14" fill="white" stroke={src.color} strokeWidth="1" className="dark:fill-slate-800" />
                      <text x={sx} y={sy - 1} textAnchor="middle" fontSize="9">{src.icon}</text>
                      <text x={sx} y={sy + 12} textAnchor="middle" fontSize="5" fill={src.color} fontWeight="bold">{src.pct}%</text>
                    </g>
                  );
                })}

                {/* Storage level bar */}
                <g transform="translate(8, 150)">
                  <rect x="0" y="0" width="184" height="10" rx="5" fill="#e2e8f0" />
                  <motion.rect
                    x="0" y="0" height="10" rx="5"
                    fill={storageLevel > 40 ? "#0ea5e9" : storageLevel > 20 ? "#f59e0b" : "#ef4444"}
                    initial={false}
                    animate={{ width: `${(storageLevel / 100) * 184}px` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <text x="92" y="8" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">
                    سعة التخزين: {storageLevel}%
                  </text>
                </g>
              </svg>
            </div>

            {/* Storage slider */}
            <div className="mb-2">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                مستوى التخزين
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={storageLevel}
                onChange={(e) => setStorageLevel(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Sources summary */}
            <div className="grid grid-cols-2 gap-1 mt-2">
              {waterSources.map((src) => (
                <div key={src.name} className="flex items-center gap-1 text-[9px] text-slate-600 dark:text-slate-400">
                  <span>{src.icon}</span>
                  <span>{src.name}</span>
                  <span className="font-mono text-slate-500 mr-auto">{src.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT: Biogas ===== */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Flame size={18} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">الغاز الحيوي</h4>
            </div>

            {/* Animal waste input */}
            <div className="mb-4">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                عدد الحيوانات (المكافئ البقري)
              </label>
              <input
                type="range"
                min={5}
                max={100}
                value={animalCount}
                onChange={(e) => setAnimalCount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5</span>
                <span className="font-bold text-slate-600 dark:text-slate-300">{animalCount}</span>
                <span>100</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Wind size={12} /> إنتاج الروث اليومي
                </div>
                <div className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">
                  {totalWaste.toLocaleString()}
                  <span className="text-xs text-slate-500 font-bold"> كجم</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">الغاز الحيوي</div>
                  <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {biogasOutput}
                    <span className="text-xs text-slate-500 font-bold"> م³</span>
                  </div>
                  <div className="text-[9px] text-slate-400">/ يوم</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">كهرباء</div>
                  <div className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">
                    {electricityFromBiogas}
                    <span className="text-xs text-slate-500 font-bold"> kWh</span>
                  </div>
                  <div className="text-[9px] text-slate-400">/ يوم</div>
                </div>
              </div>

              <div className="p-2 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-700/30">
                <div className="text-[9px] text-slate-500 dark:text-slate-400">السماد العضوي الناتج</div>
                <div className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {Math.round(totalWaste * 0.7).toLocaleString()} <span className="text-xs text-slate-500 font-bold">كجم/يوم</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Panel */}
        <div className="mt-4">
          <motion.div
            key={`diag-${sunPosition}-${animalCount}-${storageLevel}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isSolarSufficient ? (
              <div className="flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-md bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 shadow-[0_0_15px_rgba(5,150,105,0.1)]">
                <div className="mt-0.5 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 drop-shadow-[0_0_8px_rgba(5,150,105,0.4)]">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-lg">✅ نظام الطاقة متوازن</h4>
                  <div className="text-sm leading-relaxed font-medium opacity-90">
                    الشمس في موقع {SUN_POSITIONS[sunPosition].label} تُنتج {powerOutput.toLocaleString()} kWh/يوم —
                    يكفي لتشغيل جميع الأحمال ({totalLoad.toLocaleString()} kWh/يوم).
                    {sunPosition < 3
                      ? " الطاقة الفائضة تُخزن في البطاريات لاستخدامها ليلاً."
                      : " البطاريات تغذي المزرعة الآن."}
                    {" "}الغاز الحيوي يُضيف {electricityFromBiogas} kWh/يوم إضافية.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-md bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300 shadow-[0_0_15px_rgba(217,119,6,0.1)]">
                <div className="mt-0.5 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.4)]">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1 text-lg">⚠ طاقة محدودة</h4>
                  <div className="text-sm leading-relaxed font-medium opacity-90">
                    الشمس في موقع {SUN_POSITIONS[sunPosition].label} تُنتج {powerOutput.toLocaleString()} kWh/يوم فقط،
                    بينما الأحمال تحتاج {totalLoad.toLocaleString()} kWh/يوم.
                    الغاز الحيوي يُغطي {electricityFromBiogas} kWh/يوم من العجز.
                    {sunPosition === 3
                      ? " البطاريات والغاز الحيوي يدعمان المزرعة خلال الليل."
                      : " يُنصح باستخدام الطاقة الشمسية الفائضة لشحن البطاريات."}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Recommendations */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700/30">
              <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300 mb-1">💧 نصيحة مائية</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                حافظ على مستوى تخزين الماء فوق 40%. المكثفات الجوية تعمل بكفاءة في الفجر. أعد تدوير كل قطرة.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30">
              <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300 mb-1">☀️ نصيحة طاقة</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                أوقات الظهر تولد 25,000 kWh/يوم. خزن الفائض في البطاريات. استخدم الغاز الحيوي ليلاً.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700/30">
              <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">🔥 نصيحة غاز حيوي</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                {animalCount} حيوان تُنتج {biogasOutput} م³ غاز = {electricityFromBiogas} kWh/يوم. السماد العضوي الناتج مورد إضافي.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EnergyWaterSim };
export default EnergyWaterSim;

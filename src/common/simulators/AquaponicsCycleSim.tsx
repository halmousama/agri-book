import { useState, useCallback, useEffect, useRef } from "react";
import {
  Fish,
  Sprout,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Gauge,
  Thermometer,
  FlaskConical,
  Ban,
  RefreshCw,
  Play,
  Pause,
  Wind,
  Skull,
  Heart,
  Timer,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

const PARAM_RANGES = {
  ammonia: { good: [0, 15], warn: [15, 45], danger: [45, 100] },
  nitrite: { good: [0, 10], warn: [10, 35], danger: [35, 100] },
  nitrate: { good: [15, 60], warn: [5, 15], danger: [0, 5] },
  pH: { good: [6.5, 7.8], warn: [6.0, 6.5], danger: [5.0, 6.0] },
  oxygen: { good: [70, 100], warn: [40, 70], danger: [0, 40] },
};

const FISH_TYPES = [
  { name: "بلطي (Tilapia)", color: "#f97316", darkColor: "#ea580c", tempMin: 22, tempMax: 32 },
  { name: "مشط (Perch)", color: "#8b5cf6", darkColor: "#7c3aed", tempMin: 18, tempMax: 28 },
];

const PLANT_TYPES = [
  { name: "خس", color: "#22c55e" },
  { name: "نعناع", color: "#16a34a" },
  { name: "ريحان", color: "#059669" },
];

export const AquaponicsCycleSim = () => {
  const [fishFeed, setFishFeed] = useState(5);
  const [plantCount, setPlantCount] = useState(5);
  const [waterTemp, setWaterTemp] = useState(26);
  const [selectedFish, setSelectedFish] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [simTime, setSimTime] = useState(0);
  const [emergencyAction, setEmergencyAction] = useState<string | null>(null);
  const [waterChanged, setWaterChanged] = useState(false);
  const [bacteriaBoost, setBacteriaBoost] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const biofilterSize = fishFeed * 1.5 + (bacteriaBoost ? 8 : 0);
  const ratio = plantCount / Math.max(1, fishFeed);

  const tempFactor = selectedFish === 0
    ? Math.max(0.3, 1 - Math.abs(waterTemp - 27) / 15)
    : Math.max(0.3, 1 - Math.abs(waterTemp - 23) / 12);
  const feedFactor = waterChanged ? Math.max(0.4, 1 - (simTime % 20) / 30) : 1;

  const rawAmmonia = Math.min(100, Math.max(0, (fishFeed - plantCount * 0.6) * 18 * (1 / Math.max(0.5, tempFactor))));
  const ammoniaLevel = emergencyAction === "reduceFeed"
    ? rawAmmonia * 0.4
    : waterChanged
      ? rawAmmonia * 0.3
      : rawAmmonia;

  const rawNitrite = ammoniaLevel > 40 ? (ammoniaLevel - 20) * 0.5 : Math.max(1, ammoniaLevel * 0.08);
  const nitriteLevel = bacteriaBoost ? rawNitrite * 0.3 : rawNitrite;

  const rawNitrate = Math.min(100, Math.max(0, 60 - (plantCount - fishFeed * 0.8) * 15));
  const nitrateLevel = waterChanged ? rawNitrate + 5 : rawNitrate;

  const pH = Math.min(9, Math.max(5, 7 - (ammoniaLevel / 100) * 2.5 + (nitriteLevel / 100) * 0.5));
  const oxygenLevel = Math.min(100, Math.max(20, 85 - waterTemp * 1.2 + (plantCount * 2) - (ammoniaLevel * 0.3)));

  const fishHealth = Math.min(100, Math.max(5,
    (ammoniaLevel > 60 ? 20 : 100) *
    (pH < 6 || pH > 8 ? 0.6 : 1) *
    (oxygenLevel < 40 ? 0.4 : 1) *
    (nitriteLevel > 30 ? 0.5 : 1) *
    tempFactor
  ));

  const plantHealth = Math.min(100, Math.max(5,
    nitrateLevel < 10 ? 30 : nitrateLevel > 80 ? 60 : 95,
  ));

  const isCritical = ammoniaLevel > 65 || nitriteLevel > 40 || pH < 5.5 || pH > 8.5 || oxygenLevel < 25 || fishHealth < 20;
  const isWarning = ammoniaLevel > 35 || nitriteLevel > 20 || pH < 6 || pH > 8.2 || oxygenLevel < 50 || fishHealth < 50;
  const isEquilibrium = !isCritical && !isWarning && ammoniaLevel < 25 && nitrateLevel > 20 && nitriteLevel < 15 && fishHealth > 80 && plantHealth > 80;
  const isBalanced = ratio >= 0.8 && ratio <= 2.2 && !isCritical;

  const waterColor = isCritical ? "#ef4444" : isWarning ? "#f59e0b" : pH > 7.5 ? "#0ea5e9" : "#06b6d4";
  const waterOpacity = isCritical ? 0.5 : isWarning ? 0.35 : 0.25;

  const getStatus = () => {
    if (isCritical) return { label: "🔴 حالة حرجة!", color: "bg-red-100 text-red-700 border-red-300", pulse: true };
    if (isWarning && !isEquilibrium) return { label: "🟡 تحذير", color: "bg-amber-100 text-amber-700 border-amber-300", pulse: false };
    if (isEquilibrium) return { label: "🟢 متوازن تماماً", color: "bg-emerald-100 text-emerald-700 border-emerald-300", pulse: false };
    return { label: "🔵 غير مستقر", color: "bg-blue-100 text-blue-700 border-blue-300", pulse: false };
  };
  const status = getStatus();

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setSimTime((t) => t + 0.5);
        setFishFeed((f) => {
          const delta = Math.random() * 0.6 - 0.2;
          return Math.min(10, Math.max(1, Math.round((f + delta) * 10) / 10));
        });
        setPlantCount((p) => {
          const delta = Math.random() * 0.8 - 0.1;
          return Math.min(10, Math.max(1, Math.round((p + delta) * 10) / 10));
        });
      }, 3000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAutoPlay]);

  const handleEmergency = useCallback((action: string) => {
    setEmergencyAction(action);
    if (action === "waterChange") {
      setWaterChanged(true);
      setTimeout(() => setWaterChanged(false), 8000);
    }
    if (action === "boostBacteria") {
      setBacteriaBoost(true);
      setTimeout(() => setBacteriaBoost(false), 12000);
    }
    setTimeout(() => setEmergencyAction(null), 1500);
  }, []);

  const resetSim = useCallback(() => {
    setFishFeed(5);
    setPlantCount(5);
    setWaterTemp(26);
    setSelectedFish(0);
    setSelectedPlant(0);
    setIsAutoPlay(false);
    setSimTime(0);
    setEmergencyAction(null);
    setWaterChanged(false);
    setBacteriaBoost(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const flowParticles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    delay: i * 0.35,
    duration: 2.5 + (i % 4) * 0.8,
  }));

  const fishCount = Math.min(6, Math.max(1, Math.round(fishFeed * 0.8)));
  const plantSvgCount = Math.min(6, plantCount);

  const gaugeValue = (val: number, max: number) => Math.min(100, (val / max) * 100);

  const gaugeColor = (val: number, good: number[], warn: number[], danger: number[]) => {
    if (val >= danger[0] && val <= danger[1]) return "#ef4444";
    if (val >= warn[0] && val <= warn[1]) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200 dark:border-teal-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-lg shadow-teal-200/50">
              <Fish className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                أكوابونيك — مصنع الحياة المغلق
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">نظام تدوير مغلق: سمك ↔ بكتيريا ↔ نبات</p>
            </div>
          </div>
          <motion.div
            className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5", status.color)}
            animate={status.pulse ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {status.pulse && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
            {status.label}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري المطور ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={waterColor} stopOpacity={waterOpacity} />
                  <stop offset="100%" stopColor={waterColor} stopOpacity={waterOpacity + 0.15} />
                </linearGradient>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0fdfa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ccfbf1" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#skyGrad)" rx="12" />
              <rect x="0" y="0" width="260" height="320" fill="url(#skyGrad)" rx="12" opacity="0.5" />

              {/* === حوض الأسماك === */}
              <g transform="translate(15, 15)">
                <rect x="0" y="20" width="95" height="75" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
                <rect x="3" y="23" width="89" height="69" rx="6" fill="url(#waterGrad)" />
                <rect x="0" y="20" width="95" height="75" rx="8" fill="none" stroke={waterColor} strokeWidth="2" opacity="0.3" />

                <text x="47" y="14" textAnchor="middle" fontSize="8" fill="#0284c7" fontWeight="bold">حوض الأسماك</text>
                <text x="47" y="107" textAnchor="middle" fontSize="6" fill={waterColor === "#ef4444" ? "#dc2626" : "#0ea5e9"}>{waterTemp}°C</text>

                <AnimatePresence>
                  {waterChanged && (
                    <motion.rect
                      x="3" y="23" width="89" height="69" rx="6"
                      fill="#0ea5e9" opacity="0.3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.4, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3, repeat: 2 }}
                    />
                  )}
                </AnimatePresence>

                {Array.from({ length: fishCount }).map((_, fi) => {
                  const baseY = 45 + (fi % 3) * 12;
                  const baseX = 15 + fi * 13;
                  return (
                    <motion.g
                      key={`fish-${fi}`}
                      animate={{
                        x: [0, 35, 0],
                        y: [0, fi % 2 === 0 ? 5 : -5, 0],
                      }}
                      transition={{ duration: 3 + fi * 0.5, repeat: Infinity, ease: "easeInOut", delay: fi * 0.3 }}
                    >
                      <ellipse cx={baseX} cy={baseY} rx="9" ry="4.5" fill={fishHealth > 50 ? FISH_TYPES[selectedFish].color : "#6b7280"} />
                      <polygon points={`${baseX + 9},${baseY} ${baseX + 14},${baseY - 4} ${baseX + 14},${baseY + 4}`} fill={fishHealth > 50 ? FISH_TYPES[selectedFish].darkColor : "#4b5563"} />
                      <circle cx={baseX - 4} cy={baseY - 1.5} r="1.5" fill={fishHealth > 30 ? "#1e293b" : "#94a3b8"} />
                      {fishHealth < 30 && (
                        <line x1={baseX - 2} y1={baseY - 3} x2={baseX - 6} y2={baseY + 1} stroke="#ef4444" strokeWidth="1" />
                      )}
                    </motion.g>
                  );
                })}

                {bacteriaBoost && (
                  <motion.g opacity="0.6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.circle
                        key={`extra-bac-${i}`}
                        cx={20 + i * 15}
                        cy={70 + (i % 2) * 8}
                        r="2"
                        fill="#10b981"
                        animate={{ r: [1.5, 3, 1.5], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.g>
                )}

                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.circle
                    key={`bub-${i}`}
                    cx={20 + i * 22}
                    cy={88}
                    r="2"
                    fill="white" opacity="0.5"
                    animate={{ cy: [88, 40], opacity: [0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </g>

              {/* === أنبوب التدفق (سمكة ← فلتر) === */}
              <motion.path d="M110,50 Q122,50 125,65 Q128,80 140,85" stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" />
              {flowParticles.slice(0, 3).map((p) => (
                <motion.circle
                  key={`fp1-${p.id}`}
                  r="2.5" fill={waterColor}
                  opacity="0.8"
                  initial={{ x: 110, y: 50 }}
                  animate={{ x: [110, 122, 125, 140], y: [50, 50, 80, 85] }}
                  transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
                />
              ))}

              {/* === الفلتر البكتيري (ثلاثي المراحل) === */}
              <g transform="translate(140, 60)">
                <rect x="0" y="0" width="70" height="55" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                <rect x="3" y="3" width="64" height="49" rx="6" fill="#d1fae5" opacity="0.5" />

                <text x="35" y="10" textAnchor="middle" fontSize="6" fill="#047857" fontWeight="bold">الفلتر الحيوي</text>

                {Array.from({ length: 10 + (bacteriaBoost ? 6 : 0) }).map((_, i) => (
                  <motion.circle
                    key={`bac-${i}`}
                    cx={8 + (i % 5) * 12}
                    cy={17 + Math.floor(i / 5) * 14}
                    r={biofilterSize > 6 ? 2.5 : 1.5}
                    fill={biofilterSize > 6 ? "#059669" : "#d97706"}
                    animate={{ opacity: [0.4, 1, 0.4], r: [1.5, 2.5, 1.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}

                <motion.rect x="5" y="47" width="60" height="4" rx="2" fill={biofilterSize > 6 ? "#10b981" : "#f59e0b"}
                  animate={{ width: `${Math.min(60, (biofilterSize / 20) * 60)}px` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
                <text x="35" y="68" textAnchor="middle" fontSize="6" fill="#6b7280">{biofilterSize.toFixed(0)} L</text>
              </g>

              {/* === أنبوب فلتر ← نباتات (مع تفاعل البكتيريا) === */}
              <motion.path d="M210,90 Q215,105 215,130 Q215,155 200,170" stroke="#94a3b8" strokeWidth="5" fill="none" strokeLinecap="round" />

              {/* تأثير تحول الأمونيا → نترات */}
              {ammoniaLevel > 0 && (
                <g>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.text
                      key={`nh3-${i}`}
                      x={205}
                      y={100 + i * 20}
                      fontSize="5"
                      fill={ammoniaLevel > 40 ? "#ef4444" : "#22c55e"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                    >
                      {ammoniaLevel > 40 ? "NH₃→NO₃" : "NH₃✓"}
                    </motion.text>
                  ))}
                </g>
              )}

              {flowParticles.slice(3, 7).map((p) => (
                <motion.circle
                  key={`fp2-${p.id}`}
                  r="2.5"
                  fill="#10b981"
                  opacity="0.7"
                  initial={{ x: 210, y: 90 }}
                  animate={{ x: [210, 215, 215, 200], y: [90, 105, 130, 170] }}
                  transition={{ duration: p.duration + 0.5, repeat: Infinity, delay: p.delay, ease: "linear" }}
                />
              ))}

              {/* === أحواض النباتات === */}
              <g transform="translate(80, 175)">
                <rect x="0" y="0" width="175" height="70" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="3" y="22" width="169" height="45" rx="6" fill="#d1fae5" opacity="0.4" />

                <text x="87" y="16" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold">أحواض النباتات ({PLANT_TYPES[selectedPlant].name})</text>

                {Array.from({ length: plantSvgCount }).map((_, i) => (
                  <g key={`plant-${i}`} transform={`translate(${15 + i * 26}, 14)`}>
                    <rect x="-1" y="-10" width="2" height="14" fill="#16a34a" rx="0.5" />
                    <motion.path
                      d={plantHealth > 40
                        ? "M0,-10 Q-7,-18 -9,-10"
                        : "M0,-10 Q-4,-12 -5,-10"}
                      fill={plantHealth > 40 ? PLANT_TYPES[selectedPlant].color : "#fde047"}
                      animate={{ scale: plantHealth > 40 ? 1 : 0.6 }}
                    />
                    <motion.path
                      d={plantHealth > 40
                        ? "M0,-8 Q7,-17 9,-8"
                        : "M0,-8 Q4,-11 5,-8"}
                      fill={plantHealth > 40 ? PLANT_TYPES[selectedPlant].color : "#fde047"}
                      animate={{ scale: plantHealth > 40 ? 1 : 0.6 }}
                    />
                    {plantHealth > 70 && (
                      <motion.circle
                        cx="0" cy="-6" r="1.5" fill="#fbbf24"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                    )}
                  </g>
                ))}

                {Array.from({ length: 2 }).map((_, i) => (
                  <motion.circle
                    key={`root-${i}`}
                    cx={20 + i * 130}
                    cy={80}
                    r="1.5"
                    fill="#0ea5e9"
                    opacity="0.5"
                    animate={{ cy: [80, 95], opacity: [0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
                  />
                ))}
              </g>

              {/* === أنبوب العودة (نباتات ← سمكة) — بالماء النظيف === */}
              <motion.path
                d="M85,245 Q60,245 55,220 Q50,195 55,165 Q60,135 80,110"
                stroke="#0ea5e9"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="4 3"
                opacity="0.6"
              />
              {flowParticles.slice(7).map((p) => (
                <motion.circle
                  key={`fp3-${p.id}`}
                  r="2"
                  fill="#0ea5e9"
                  opacity="0.5"
                  initial={{ x: 85, y: 245 }}
                  animate={{ x: [85, 60, 55, 55, 80], y: [245, 245, 220, 165, 110] }}
                  transition={{ duration: p.duration + 1.5, repeat: Infinity, delay: p.delay, ease: "linear" }}
                />
              ))}

              {/* === مؤشرات حية صغيرة === */}
              <g transform="translate(5, 260)">
                <rect x="0" y="0" width="250" height="50" rx="8" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />

                <text x="10" y="14" fontSize="6" fill="#64748b">pH</text>
                <rect x="10" y="18" width="40" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="6" rx="3"
                  fill={pH >= 6.5 && pH <= 7.8 ? "#22c55e" : pH >= 6 && pH <= 8.2 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${((pH - 5) / 5) * 40}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="54" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">{pH.toFixed(1)}</text>

                <text x="90" y="14" fontSize="6" fill="#64748b">O₂</text>
                <rect x="90" y="18" width="40" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="90" y="18" height="6" rx="3"
                  fill={oxygenLevel > 70 ? "#22c55e" : oxygenLevel > 40 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(oxygenLevel / 100) * 40}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="134" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">{oxygenLevel.toFixed(0)}%</text>

                <text x="160" y="14" fontSize="6" fill="#64748b">NH₃</text>
                <rect x="160" y="18" width="40" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="160" y="18" height="6" rx="3"
                  fill={ammoniaLevel < 20 ? "#22c55e" : ammoniaLevel < 50 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(ammoniaLevel / 100) * 40}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="204" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">{ammoniaLevel.toFixed(0)}%</text>

                <text x="10" y="40" fontSize="6" fill="#64748b">NO₂</text>
                <rect x="10" y="44" width="40" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="44" height="6" rx="3"
                  fill={nitriteLevel < 15 ? "#22c55e" : nitriteLevel < 30 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(nitriteLevel / 100) * 40}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="54" y="48" fontSize="6" fontFamily="monospace" fill="#1e293b">{nitriteLevel.toFixed(0)}%</text>

                <text x="90" y="40" fontSize="6" fill="#64748b">NO₃</text>
                <rect x="90" y="44" width="40" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="90" y="44" height="6" rx="3"
                  fill={nitrateLevel > 15 && nitrateLevel < 70 ? "#22c55e" : nitrateLevel >= 5 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(nitrateLevel / 100) * 40}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="134" y="48" fontSize="6" fontFamily="monospace" fill="#1e293b">{nitrateLevel.toFixed(0)}%</text>

                <text x="160" y="40" fontSize="6" fill="#64748b">صحة السمك</text>
                <rect x="160" y="44" width="40" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="160" y="44" height="6" rx="3"
                  fill={fishHealth > 70 ? "#22c55e" : fishHealth > 40 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(fishHealth / 100) * 40}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="204" y="48" fontSize="6" fontFamily="monospace" fill="#1e293b">{fishHealth.toFixed(0)}%</text>
              </g>

              {/* تأثير التحذير على كامل المشهد */}
              <AnimatePresence>
                {isCritical && (
                  <motion.rect
                    x="0" y="0" width="260" height="320" rx="12"
                    fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* ===== لوحة التحكم المطورة ===== */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Slider
                label="كمية علف الأسماك"
                value={fishFeed}
                min={1}
                max={10}
                unit="كجم/يوم"
                color={ammoniaLevel > 50 ? "rose" : "amber"}
                onChange={(e) => setFishFeed(Number(e.target.value))}
              />
              <Slider
                label="عدد النباتات"
                value={plantCount}
                min={1}
                max={10}
                unit="نبتة"
                color={nitrateLevel < 10 ? "rose" : "emerald"}
                onChange={(e) => setPlantCount(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Slider
                label="درجة حرارة الماء"
                value={waterTemp}
                min={15}
                max={35}
                unit="°C"
                color={tempFactor < 0.7 ? "rose" : "blue"}
                onChange={(e) => setWaterTemp(Number(e.target.value))}
              />
              <div className="bg-white rounded-xl border border-slate-200 p-3">
                <label className="text-xs font-bold text-slate-600 block mb-2">نوع السمك</label>
                <div className="flex gap-1">
                  {FISH_TYPES.map((f, i) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFish(i)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all",
                        selectedFish === i
                          ? "bg-teal-50 border-teal-400 text-teal-700"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {f.name.split("(")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-2">
              <label className="text-xs font-bold text-slate-600 block mb-1 px-1">نوع النبات</label>
              <div className="flex gap-1">
                {PLANT_TYPES.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPlant(i)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all",
                      selectedPlant === i
                        ? "bg-teal-50 border-teal-400 text-teal-700"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              <div className={cn("rounded-lg p-2 border", ammoniaLevel > 35 ? "bg-red-50 border-red-200" : "bg-teal-50 border-teal-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <Droplets size={10} className="text-red-500" /> NH₃
                </div>
                <div className={cn("text-base font-black font-mono", ammoniaLevel > 35 ? "text-red-600" : "text-teal-600")}>
                  {ammoniaLevel.toFixed(0)}
                </div>
              </div>
              <div className={cn("rounded-lg p-2 border", nitriteLevel > 20 ? "bg-red-50 border-red-200" : "bg-teal-50 border-teal-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <FlaskConical size={10} className="text-orange-500" /> NO₂
                </div>
                <div className={cn("text-base font-black font-mono", nitriteLevel > 20 ? "text-orange-600" : "text-teal-600")}>
                  {nitriteLevel.toFixed(0)}
                </div>
              </div>
              <div className={cn("rounded-lg p-2 border", nitrateLevel < 15 || nitrateLevel > 80 ? "bg-amber-50 border-amber-200" : "bg-teal-50 border-teal-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <Sprout size={10} className="text-emerald-500" /> NO₃
                </div>
                <div className={cn("text-base font-black font-mono", nitrateLevel < 15 ? "text-amber-600" : "text-teal-600")}>
                  {nitrateLevel.toFixed(0)}
                </div>
              </div>
              <div className={cn("rounded-lg p-2 border", pH < 6.5 || pH > 7.8 ? "bg-red-50 border-red-200" : "bg-teal-50 border-teal-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <Thermometer size={10} className="text-purple-500" /> pH
                </div>
                <div className={cn("text-base font-black font-mono", (pH < 6.5 || pH > 7.8) ? "text-red-600" : "text-teal-600")}>
                  {pH.toFixed(1)}
                </div>
              </div>
              <div className={cn("rounded-lg p-2 border", oxygenLevel < 50 ? "bg-red-50 border-red-200" : "bg-teal-50 border-teal-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <Wind size={10} className="text-blue-500" /> O₂
                </div>
                <div className={cn("text-base font-black font-mono", oxygenLevel < 50 ? "text-red-600" : "text-teal-600")}>
                  {oxygenLevel.toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={cn("rounded-xl p-3 border", fishHealth > 70 ? "bg-emerald-50 border-emerald-200" : fishHealth > 40 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Heart size={12} className={fishHealth > 70 ? "text-emerald-500" : "text-red-500"} /> صحة الأسماك
                </div>
                <div className={cn("text-lg font-black font-mono", fishHealth > 70 ? "text-emerald-600" : fishHealth > 40 ? "text-amber-600" : "text-red-600")}>
                  {fishHealth.toFixed(0)}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div className={cn("h-full rounded-full", fishHealth > 70 ? "bg-emerald-500" : fishHealth > 40 ? "bg-amber-500" : "bg-red-500")}
                    animate={{ width: `${fishHealth}%` }} transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className={cn("rounded-xl p-3 border", plantHealth > 70 ? "bg-emerald-50 border-emerald-200" : plantHealth > 40 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Sprout size={12} className={plantHealth > 70 ? "text-emerald-500" : "text-yellow-500"} /> صحة النباتات
                </div>
                <div className={cn("text-lg font-black font-mono", plantHealth > 70 ? "text-emerald-600" : plantHealth > 40 ? "text-amber-600" : "text-red-600")}>
                  {plantHealth.toFixed(0)}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div className={cn("h-full rounded-full", plantHealth > 70 ? "bg-emerald-500" : plantHealth > 40 ? "bg-amber-500" : "bg-red-500")}
                    animate={{ width: `${plantHealth}%` }} transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
            </div>

            {/* أزرار الطوارئ */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleEmergency("waterChange")}
                disabled={waterChanged}
                className={cn(
                  "py-2 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-xs",
                  waterChanged
                    ? "bg-blue-200 text-blue-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                )}
              >
                <Droplets size={14} />
                تغيير الماء (طارئ)
              </button>
              <button
                onClick={() => handleEmergency("boostBacteria")}
                disabled={bacteriaBoost}
                className={cn(
                  "py-2 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-xs",
                  bacteriaBoost
                    ? "bg-emerald-200 text-emerald-500 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
                )}
              >
                <FlaskConical size={14} />
                تعزيز البكتيريا
              </button>
            </div>
            <button
              onClick={() => handleEmergency("reduceFeed")}
              disabled={emergencyAction === "reduceFeed" && fishFeed <= 2}
              className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] shadow-md flex items-center justify-center gap-1.5"
            >
              <Ban size={14} />
              تقليص العلف للنصف (حتى الاستقرار)
            </button>

            <div className="flex gap-2">
              <button
                onClick={toggleAutoPlay}
                className={cn(
                  "flex-1 py-2 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-xs",
                  isAutoPlay
                    ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                )}
              >
                {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
                {isAutoPlay ? "إيقاف المحاكاة" : "تشغيل تلقائي (Auto)"}
              </button>
              <button
                onClick={resetSim}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                إعادة
              </button>
            </div>

            {/* التشخيص الذكي */}
            <motion.div
              key={`aq-${fishFeed}-${plantCount}-${waterTemp}-${pH.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCritical ? (
                <Alert type="danger" title="🚨 حالة حرجة — تدخل فوري مطلوب!">
                  {ammoniaLevel > 60 && `⚠ الأمونيا ${ammoniaLevel.toFixed(0)}% — سامة للأسماك! `}
                  {nitriteLevel > 30 && `⚠ النتريت ${nitriteLevel.toFixed(0)}% — يمنع وصول الأكسجين! `}
                  {(pH < 5.5 || pH > 8.5) && `⚠ pH ${pH.toFixed(1)} — خارج النطاق الآمن (6.5-7.8)! `}
                  {oxygenLevel < 30 && `⚠ الأكسجين ${oxygenLevel.toFixed(0)}% — الأسماك تختنق! `}
                  {fishHealth < 20 && `⚠ الأسماك على وشك النفوق (${fishHealth.toFixed(0)}%)! `}
                  الحل: استخدم أزرار الطوارئ (تغيير الماء فوراً + تعزيز البكتيريا) ثم اضبط العلف والنباتات.
                </Alert>
              ) : isWarning ? (
                <Alert type="warning" title="⚠ تحذير — مؤشرات خارج النطاق الأمثل">
                  {ammoniaLevel > 35 ? `الأمونيا ${ammoniaLevel.toFixed(0)}% — زد النباتات أو قلل العلف. ` : ""}
                  {nitriteLevel > 20 ? `النتريت ${nitriteLevel.toFixed(0)}% — البكتيريا لا تستطيع مواكبة التحويل. ` : ""}
                  {pH < 6 || pH > 8.2 ? `pH ${pH.toFixed(1)} — يؤثر على صحة الأسماك. ` : ""}
                  {oxygenLevel < 50 ? `الأكسجين ${oxygenLevel.toFixed(0)}% — انخفاض خطير. ` : ""}
                  النسبة الحالية: علف {fishFeed} : نباتات {plantCount} = 1:{ratio.toFixed(1)}. اهدف إلى 1:1.5.
                </Alert>
              ) : isEquilibrium ? (
                <Alert type="success" title="✅ توازن مثالي — النظام مستقر">
                  جميع المؤشرات في النطاق الأخضر! الأمونيا عند {ammoniaLevel.toFixed(0)}% (آمن)، pH {pH.toFixed(1)}، الأكسجين {oxygenLevel.toFixed(0)}%. الأسماك سعيدة ({fishHealth.toFixed(0)}%) والنباتات خضراء ({plantHealth.toFixed(0)}%). هذه هي دائرة الحياة المغلقة التي تحلم بها!
                </Alert>
              ) : (
                <Alert type="info" title="ℹ نظام غير مستقر">
                  النسبة: علف {fishFeed} : نباتات {plantCount} = 1:{ratio.toFixed(1)}. المؤشرات ليست خطيرة لكنها ليست مثالية. اضبط المتغيرات ببطء حتى تصل إلى النطاق الأخضر.
                </Alert>
              )}
            </motion.div>

            {/* تلميحات قصيرة */}
            {isEquilibrium && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 نصيحة: في النظام المتوازن، تحتاج فقط إلى طاقة كهربائية للمضخة — لا تغيير ماء، لا سماد!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

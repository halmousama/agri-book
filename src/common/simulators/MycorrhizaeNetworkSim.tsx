import { useState, useCallback, useRef, useEffect } from "react";
import {
  Trees,
  Tractor,
  FlaskConical,
  Timer,
  AlertTriangle,
  CheckCircle,
  Zap,
  DollarSign,
  Sprout,
  Droplets,
  Leaf,
  CloudRain,
  SkipForward,
  RotateCcw,
  BarChart3,
  Atom,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type NetworkState = "intact" | "severed" | "recovering";

interface TillageEvent {
  id: number;
  time: number;
}

export const MycorrhizaeNetworkSim = () => {
  const [networkState, setNetworkState] = useState<NetworkState>("intact");
  const [recoveryMonths, setRecoveryMonths] = useState(6);
  const [fertilizerApplied, setFertilizerApplied] = useState(false);
  const [totalFertilizerCost, setTotalFertilizerCost] = useState(0);
  const [fertilizerCount, setFertilizerCount] = useState(0);
  const [isPlowing, setIsPlowing] = useState(false);
  const [hasCoverCrop, setHasCoverCrop] = useState(false);
  const [hasCompost, setHasCompost] = useState(false);
  const [simYears, setSimYears] = useState(0);
  const [tillageEvents, setTillageEvents] = useState<TillageEvent[]>([]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [showCarbon, setShowCarbon] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const absorptionEfficiency = networkState === "intact"
    ? 92 + (hasCoverCrop ? 8 : 0) + (hasCompost ? 5 : 0)
    : networkState === "severed"
      ? Math.max(15, 30 - tillageEvents.length * 5)
      : Math.min(92, 30 + recoveryMonths * 5 + (hasCoverCrop ? 15 : 0) + (hasCompost ? 10 : 0));

  const soilOrganicMatter = networkState === "intact"
    ? Math.min(100, 55 + simYears * 2 + (hasCoverCrop ? 20 : 0) + (hasCompost ? 15 : 0))
    : networkState === "severed"
      ? Math.max(10, 55 - tillageEvents.length * 10 - Math.floor(simYears * 3))
      : Math.min(70, 30 + recoveryMonths * 2 + (hasCoverCrop ? 15 : 0) + (hasCompost ? 10 : 0));

  const carbonSequestration = networkState === "intact"
    ? Math.min(100, 40 + simYears * 3 + (hasCoverCrop ? 25 : 0))
    : networkState === "severed"
      ? Math.max(0, 40 - tillageEvents.length * 15)
      : Math.min(60, 20 + recoveryMonths * 2 + (hasCoverCrop ? 20 : 0));

  const waterRetention = Math.min(100, 40 + soilOrganicMatter * 0.4 + (hasCoverCrop ? 15 : 0));
  const infiltrationRate = Math.min(100, 30 + waterRetention * 0.5);

  const isSoilAlive = absorptionEfficiency >= 75 && soilOrganicMatter >= 50;
  const isSoilDamaged = absorptionEfficiency < 40 || soilOrganicMatter < 25;
  const isSoilRecovering = !isSoilAlive && !isSoilDamaged;

  const soilHealthScore = Math.round(
    (absorptionEfficiency * 0.3 + soilOrganicMatter * 0.3 + carbonSequestration * 0.2 + waterRetention * 0.2)
  );

  const handleTillage = useCallback(() => {
    if (isPlowing || networkState === "severed") return;
    setIsPlowing(true);
    setTimeout(() => {
      setNetworkState("severed");
      setTillageEvents((prev) => [...prev, { id: Date.now(), time: simYears }]);
      setIsPlowing(false);
    }, 1500);
  }, [isPlowing, networkState, simYears]);

  const handleFertilizer = useCallback(() => {
    if (networkState === "intact" || fertilizerApplied) return;
    setFertilizerApplied(true);
    setTotalFertilizerCost((prev) => prev + 50 + fertilizerCount * 10);
    setFertilizerCount((prev) => prev + 1);
    setTimeout(() => setFertilizerApplied(false), 2500);
  }, [networkState, fertilizerApplied, fertilizerCount]);

  const handleStartRecovery = useCallback(() => {
    if (networkState !== "severed") return;
    setNetworkState("recovering");
  }, [networkState]);

  const resetSim = useCallback(() => {
    setNetworkState("intact");
    setRecoveryMonths(6);
    setFertilizerApplied(false);
    setTotalFertilizerCost(0);
    setFertilizerCount(0);
    setIsPlowing(false);
    setHasCoverCrop(false);
    setHasCompost(false);
    setSimYears(0);
    setTillageEvents([]);
    setIsAutoMode(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  /* Auto mode: time passes, tillage happens every 2 years */
  useEffect(() => {
    if (isAutoMode) {
      intervalRef.current = setInterval(() => {
        setSimYears((y) => y + 0.5);
      }, 4000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAutoMode]);

  const myceliumNodes = (() => {
    const base = [
      { x: 55, y: 135 }, { x: 70, y: 118 }, { x: 88, y: 125 },
      { x: 62, y: 150 }, { x: 80, y: 142 }, { x: 98, y: 135 },
      { x: 75, y: 165 }, { x: 92, y: 158 }, { x: 108, y: 150 },
      { x: 60, y: 178 }, { x: 85, y: 175 }, { x: 105, y: 168 },
    ];
    if (hasCoverCrop) {
      base.push({ x: 40, y: 155 }, { x: 115, y: 140 });
    }
    return base;
  })();

  const extraEdges = hasCoverCrop ? [[12, 0], [12, 3], [13, 5], [13, 8]] : [];
  const myceliumEdges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 5],
    [3, 6], [6, 7], [7, 8], [1, 4], [2, 5],
    [6, 9], [9, 10], [10, 11], [7, 10], [4, 7],
    [0, 6], [2, 8], [8, 11],
    ...extraEdges,
  ];

  const soilParticles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: 15 + Math.random() * 200,
    y: 115 + Math.random() * 150,
    size: 1.5 + Math.random() * 2.5,
    delay: Math.random() * 4,
    type: i % 4 === 0 ? "phosphorus" : i % 4 === 1 ? "nitrogen" : "water",
  }));

  const getNetworkOpacity = () => {
    if (networkState === "intact") return 0.9;
    if (networkState === "severed") return 0.15;
    return Math.min(0.8, 0.25 + recoveryMonths * 0.045);
  };

  const getPlantYield = () => {
    if (networkState === "intact") return 100;
    if (networkState === "severed") return 40 - tillageEvents.length * 5;
    return Math.min(90, 50 + recoveryMonths * 3);
  };

  const getEconomicImpact = () => {
    const yieldLoss = 100 - getPlantYield();
    return (yieldLoss * 2.5).toFixed(0);
  };

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-amber-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Trees className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                شبكة المايكورايزا — الزراعة التجديدية
              </h3>
              <p className="text-xs text-slate-500">شبكة الإنترنت الفطرية تحت الأرض (Wood Wide Web)</p>
            </div>
          </div>
          <motion.div
            className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5", 
              isSoilAlive ? "bg-emerald-100 text-emerald-700 border-emerald-300" : 
              isSoilDamaged ? "bg-red-100 text-red-700 border-red-300" : 
              "bg-amber-100 text-amber-700 border-amber-300")}
          >
            {isSoilAlive ? "🌿 تربة حية" : isSoilDamaged ? "⚠ تربة متضررة" : "🔄 تتعافى"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد الجوفي المتطور ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 340" className="w-full h-full">
              <defs>
                <radialGradient id="myceliumGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
                <filter id="myceliumFilter">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="340" fill="#fefce8" rx="12" />

              {/* طبقات التربة */}
              <rect x="0" y="95" width="260" height="50" fill="#92400e" opacity="0.08" />
              <rect x="0" y="95" width="260" height="8" fill="#78350f" opacity="0.15" rx="2" />

              {/* الطبقة العضوية (O horizon) */}
              <rect x="0" y="88" width="260" height="12" fill={soilOrganicMatter > 50 ? "#4d7c0f" : "#a16207"} opacity={soilOrganicMatter > 50 ? 0.3 : 0.15} />

              {/* A horizon — الطبقة السطحية */}
              <rect x="0" y="100" width="260" height="60" fill="#92400e" opacity="0.12" />

              {/* B horizon — طبقة تحت السطح */}
              <rect x="0" y="160" width="260" height="80" fill="#78350f" opacity="0.08" />

              {/* C horizon */}
              <rect x="0" y="240" width="260" height="100" fill="#451a03" opacity="0.06" />

              {/* === الشجرة اليسرى (مع المايكورايزا) === */}
              <g transform="translate(55, 20)">
                <rect x="-5" y="15" width="10" height="82" fill="#78350f" rx="3" />
                <path d="M0,25 Q-18,15 -25,28" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M0,38 Q18,28 25,38" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M0,50 Q-15,42 -20,52" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M0,60 Q15,52 20,60" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />

                <motion.g animate={{ scale: absorptionEfficiency > 50 ? 1 : 0.6 }}>
                  <circle cx="-25" cy="25" r="14" fill={absorptionEfficiency > 50 ? "#22c55e" : "#fde047"} />
                  <circle cx="25" cy="35" r="12" fill={absorptionEfficiency > 50 ? "#22c55e" : "#fde047"} />
                  <circle cx="-20" cy="48" r="10" fill={absorptionEfficiency > 50 ? "#22c55e" : "#fde047"} />
                  <circle cx="20" cy="56" r="9" fill={absorptionEfficiency > 50 ? "#22c55e" : "#fde047"} />
                </motion.g>

                <path d="M-5,92 Q-18,108 -25,120" stroke="#78350f" strokeWidth="2.5" fill="none" />
                <path d="M5,92 Q18,108 12,125" stroke="#78350f" strokeWidth="2.5" fill="none" />
                <path d="M-3,95 Q-12,112 -18,130" stroke="#78350f" strokeWidth="2" fill="none" />
                <path d="M3,95 Q12,112 15,128" stroke="#78350f" strokeWidth="2" fill="none" />
                <path d="M0,98 Q-8,115 -10,135" stroke="#78350f" strokeWidth="1.5" fill="none" />
                <path d="M0,98 Q8,115 10,133" stroke="#78350f" strokeWidth="1.5" fill="none" />
              </g>

              {/* === وهج المايكورايزا === */}
              {networkState !== "severed" && (
                <circle cx="75" cy="165" r="60" fill="url(#myceliumGlow)" opacity={networkState === "recovering" ? 0.4 : 0.8} />
              )}

              {/* === شبكة المايكورايزا — خيوط فطرية مضيئة === */}
              <g
                opacity={getNetworkOpacity()}
                filter={networkState === "intact" ? "url(#myceliumFilter)" : undefined}
              >
                {myceliumEdges.map(([i, j], idx) => (
                  <motion.line
                    key={`edge-${idx}`}
                    x1={myceliumNodes[i].x}
                    y1={myceliumNodes[i].y}
                    x2={myceliumNodes[j].x}
                    y2={myceliumNodes[j].y}
                    stroke={networkState === "intact" ? "#10b981" : networkState === "recovering" ? "#f59e0b" : "#94a3b8"}
                    strokeWidth="2"
                    opacity={networkState === "intact" ? 0.7 : 0.3}
                    animate={
                      networkState === "intact"
                        ? { opacity: [0.5, 0.9, 0.5], strokeWidth: [1.5, 2.5, 1.5] }
                        : networkState === "recovering"
                          ? { opacity: [0.3, 0.6, 0.3] }
                          : {}
                    }
                    transition={{ duration: 2.5 + idx * 0.15, repeat: Infinity }}
                  />
                ))}
                {myceliumNodes.map((node, i) => (
                  <motion.circle
                    key={`node-${i}`}
                    cx={node.x}
                    cy={node.y}
                    r={networkState === "intact" ? 3 : 2}
                    fill={networkState === "intact" ? "#059669" : networkState === "recovering" ? "#f59e0b" : "#94a3b8"}
                    animate={{
                      r: networkState === "intact" ? [2.5, 4, 2.5] : [1.5, 2.5, 1.5],
                      opacity: networkState === "intact" ? [0.6, 1, 0.6] : [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 1.8 + i * 0.12, repeat: Infinity }}
                  />
                ))}
              </g>

              {/* === خيوط فطرية رفيعة إضافية (تفاصيل) === */}
              {networkState === "intact" && Array.from({ length: 8 }).map((_, i) => (
                <motion.path
                  key={`hypha-${i}`}
                  d={`M${60 + i * 3},${140 + i * 4} Q${70 + i * 5},${155 + i * 3} ${80 + i * 2},${170 + i * 2}`}
                  stroke="#10b981"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.3"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}

              {/* === الشجرة اليمنى (بدون مايكورايزا — جذور عارية) === */}
              <g transform="translate(200, 28)">
                <rect x="-3" y="12" width="6" height="75" fill="#78350f" rx="2" />
                <path d="M0,22 Q-10,15 -14,22" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M0,32 Q10,25 14,32" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="-14" cy="20" r="9" fill="#86efac" opacity="0.7" />
                <circle cx="14" cy="30" r="8" fill="#86efac" opacity="0.7" />
                <path d="M-3,82 Q-10,95 -12,102" stroke="#78350f" strokeWidth="1.5" fill="none" />
                <path d="M3,82 Q8,95 10,100" stroke="#78350f" strokeWidth="1.5" fill="none" />
                <path d="M-2,85 Q-6,98 -7,108" stroke="#78350f" strokeWidth="1" fill="none" />
              </g>

              {/* === جسيمات الماء والفوسفور والنيتروجين === */}
              {soilParticles.map((p) => {
                const types: Record<string, string> = {
                  phosphorus: "#f59e0b",
                  nitrogen: "#a855f7",
                  water: "#3b82f6",
                };
                const particleLabels: Record<string, string> = {
                  phosphorus: "P",
                  nitrogen: "N",
                  water: "H₂O",
                };
                return (
                  <g key={`particle-${p.id}`}>
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={p.size}
                      fill={types[p.type] || "#3b82f6"}
                      opacity={absorptionEfficiency > 40 ? 0.7 : 0.2}
                      animate={{
                        y: [p.y, p.y - 12 + Math.random() * 15, p.y],
                        x: networkState === "intact" ? [p.x, p.x - 3 + Math.random() * 6, p.x] : [p.x, p.x, p.x],
                        opacity: absorptionEfficiency > 40 ? [0.5, 0.9, 0.5] : [0.1, 0.2, 0.1],
                      }}
                      transition={{ duration: 3 + (p.id % 3), repeat: Infinity, delay: p.delay }}
                    />
                    {absorptionEfficiency > 70 && (
                      <motion.text
                        x={p.x + 2}
                        y={p.y + 1}
                        fontSize="4"
                        fill={types[p.type] || "#3b82f6"}
                        opacity="0.6"
                        animate={{ y: [p.y + 1, p.y - 10 + Math.random() * 15, p.y + 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 3 + (p.id % 3), repeat: Infinity, delay: p.delay }}
                      >
                        {particleLabels[p.type] || "•"}
                      </motion.text>
                    )}
                  </g>
                );
              })}

              {/* === تدفق العناصر نحو الجذور (كفاءة عالية) === */}
              {absorptionEfficiency > 60 && soilParticles.slice(0, 6).map((p) => (
                <motion.path
                  key={`flow-${p.id}`}
                  d={`M${p.x},${p.y} Q${55 + Math.random() * 15},${p.y - 15} 55,105`}
                  stroke="#10b981"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.25"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: p.delay }}
                />
              ))}

              {/* === غطاء نباتي (Cover Crop) === */}
              {hasCoverCrop && (
                <g>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <g key={`cover-${i}`} transform={`translate(${10 + i * 30}, 82)`}>
                      <line x1="0" y1="0" x2="0" y2="12" stroke="#16a34a" strokeWidth="1.5" />
                      <path d="M0,0 Q-4,-5 -6,0" fill="#22c55e" />
                      <path d="M0,0 Q4,-5 6,0" fill="#22c55e" />
                    </g>
                  ))}
                </g>
              )}

              {/* === تأثير الحراثة — المحراث مع الغبار والحطام === */}
              <AnimatePresence>
                {isPlowing && (
                  <motion.g
                    initial={{ x: -80, y: 0 }}
                    animate={{ x: 340, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  >
                    <path d="M-5,135 L25,120 L25,145 Z" fill="#475569" />
                    <rect x="25" y="128" width="55" height="5" fill="#64748b" rx="1" />
                    <text x="45" y="123" fontSize="8" fill="#dc2626" fontWeight="bold">حراثة!</text>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <circle
                        key={`dust-${i}`}
                        cx={25 + i * 8}
                        cy={132 - i * 3}
                        r={3 + (i % 4)}
                        fill="#a16207"
                        opacity={0.5 - i * 0.04}
                      />
                    ))}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.rect
                        key={`clod-${i}`}
                        x={10 + i * 15}
                        y={140 + i * 2}
                        width={6 + i}
                        height={4 + (i % 3)}
                        rx="1"
                        fill="#78350f"
                        opacity="0.4"
                        animate={{ rotate: [0, 30 + i * 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === قطع الشبكة — خيوط متساقطة === */}
              <AnimatePresence>
                {networkState === "severed" && !isPlowing && (
                  <motion.g>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.line
                        key={`broken-${i}`}
                        x1={myceliumNodes[i % myceliumNodes.length].x}
                        y1={myceliumNodes[i % myceliumNodes.length].y}
                        x2={myceliumNodes[i % myceliumNodes.length].x + 8 + i * 3}
                        y2={myceliumNodes[i % myceliumNodes.length].y + 10 + i * 2}
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        opacity="0.4"
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === تأثير التسميد الكيماوي — رزاز بنفسجي === */}
              <AnimatePresence>
                {fertilizerApplied && (
                  <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }}>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.circle
                        key={`fert-${i}`}
                        cx={30 + Math.random() * 190}
                        cy={50 + Math.random() * 40}
                        r={2.5}
                        fill="#a855f7"
                        animate={{ cy: [50 + Math.random() * 40, 120 + Math.random() * 60], opacity: [1, 0] }}
                        transition={{ duration: 2, delay: i * 0.08, ease: "easeIn" }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === زراعة الغطاء النباتي === */}
              <AnimatePresence>
                {hasCompost && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <circle
                        key={`comp-${i}`}
                        cx={20 + i * 28}
                        cy={98 + (i % 3) * 5}
                        r={3 + (i % 2)}
                        fill="#4d7c0f"
                        opacity="0.3"
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === بكتيريا وفطريات مجهرية === */}
              <AnimatePresence>
                {networkState !== "severed" && Array.from({ length: 5 }).map((_, i) => (
                  <motion.circle
                    key={`micro-${i}`}
                    cx={50 + i * 20}
                    cy={180 + i * 5}
                    r="1.5"
                    fill={networkState === "intact" ? "#059669" : "#f59e0b"}
                    animate={{ r: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                  />
                ))}
              </AnimatePresence>

              {/* === مؤشر الكربون العضوي === */}
              {showCarbon && (
                <g transform="translate(5, 260)">
                  <rect x="0" y="0" width="250" height="20" rx="6" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="8" y="13" fontSize="7" fill="#64748b" fontWeight="bold">CO₂ مخزّن</text>
                  <rect x="70" y="6" width="100" height="8" rx="4" fill="#e2e8f0" />
                  <motion.rect
                    x="70" y="6" height="8" rx="4"
                    fill={carbonSequestration > 60 ? "#16a34a" : carbonSequestration > 30 ? "#f59e0b" : "#ef4444"}
                    animate={{ width: `${(carbonSequestration / 100) * 100}px` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <text x="178" y="13" fontSize="7" fontFamily="monospace" fill="#1e293b">{carbonSequestration.toFixed(0)}%</text>
                </g>
              )}

              {/* أيقونات توضيحية */}
              <g transform="translate(5, 285)">
                <text x="0" y="0" fontSize="6" fill="#64748b">🌱 فطريات (يسار)</text>
                <text x="100" y="0" fontSize="6" fill="#64748b">🌱 جذور عارية (يمين)</text>
                {absorptionEfficiency > 50 && (
                  <text x="170" y="0" fontSize="6" fill="#10b981" fontWeight="bold">⬅ امتصاص نشط</text>
                )}
              </g>

              {/* إحصائيات حية في المشهد */}
              <g transform="translate(5, 300)">
                <rect x="0" y="0" width="250" height="35" rx="6" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />
                <text x="8" y="12" fontSize="6" fill="#64748b">صحة التربة</text>
                <text x="8" y="26" fontSize="12" fontWeight="bold"
                  fill={soilHealthScore > 70 ? "#16a34a" : soilHealthScore > 40 ? "#f59e0b" : "#ef4444"}
                >
                  {soilHealthScore}%
                </text>
                <text x="80" y="12" fontSize="6" fill="#64748b">إنتاجية</text>
                <text x="80" y="26" fontSize="12" fontWeight="bold"
                  fill={getPlantYield() > 70 ? "#16a34a" : getPlantYield() > 40 ? "#f59e0b" : "#ef4444"}
                >
                  {getPlantYield()}%
                </text>
                <text x="150" y="12" fontSize="6" fill="#64748b">احتفاظ بالماء</text>
                <text x="150" y="26" fontSize="12" fontWeight="bold"
                  fill={waterRetention > 60 ? "#16a34a" : waterRetention > 35 ? "#f59e0b" : "#ef4444"}
                >
                  {waterRetention.toFixed(0)}%
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم المطورة ===== */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className={cn("rounded-xl p-3 border", 
                absorptionEfficiency > 70 ? "bg-emerald-50 border-emerald-200" : 
                absorptionEfficiency > 40 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <Zap size={12} className="text-teal-500" /> كفاءة الامتصاص
                </div>
                <div className={cn("text-lg font-black font-mono",
                  absorptionEfficiency > 70 ? "text-emerald-600" : absorptionEfficiency > 40 ? "text-amber-600" : "text-red-600")}>
                  {absorptionEfficiency}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div className={cn("h-full rounded-full",
                    absorptionEfficiency > 70 ? "bg-emerald-500" : absorptionEfficiency > 40 ? "bg-amber-500" : "bg-red-500")}
                    animate={{ width: `${absorptionEfficiency}%` }} transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className={cn("rounded-xl p-3 border",
                soilOrganicMatter > 50 ? "bg-emerald-50 border-emerald-200" : 
                soilOrganicMatter > 25 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <Leaf size={12} className="text-amber-600" /> المادة العضوية
                </div>
                <div className={cn("text-lg font-black font-mono",
                  soilOrganicMatter > 50 ? "text-emerald-600" : soilOrganicMatter > 25 ? "text-amber-600" : "text-red-600")}>
                  {soilOrganicMatter.toFixed(0)}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div className={cn("h-full rounded-full",
                    soilOrganicMatter > 50 ? "bg-emerald-500" : soilOrganicMatter > 25 ? "bg-amber-500" : "bg-red-500")}
                    animate={{ width: `${soilOrganicMatter}%` }} transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl p-3 border border-slate-200 bg-white">
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <DollarSign size={12} className="text-amber-500" /> تكلفة الأسمدة
                </div>
                <div className="text-lg font-black font-mono text-amber-600">
                  {totalFertilizerCost}€
                </div>
              </div>
              <div className="rounded-xl p-3 border border-slate-200 bg-white">
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <BarChart3 size={12} className="text-red-500" /> خسارة المحصول
                </div>
                <div className="text-lg font-black font-mono text-red-600">
                  {getEconomicImpact()}€/هكتار
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl p-3 border border-slate-200 bg-white">
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <Wind size={12} className="text-blue-500" /> احتباس الماء
                </div>
                <div className="text-lg font-black font-mono text-blue-600">
                  {waterRetention.toFixed(0)}%
                </div>
              </div>
              <div className="rounded-xl p-3 border border-slate-200 bg-white">
                <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                  <Timer size={12} className="text-teal-500" /> عمليات حراثة
                </div>
                <div className="text-lg font-black font-mono text-teal-600">
                  {tillageEvents.length}
                </div>
              </div>
            </div>

            <Slider
              label="وقت التعافي (أشهر)"
              value={recoveryMonths}
              min={1}
              max={12}
              unit="شهر"
              color="emerald"
              onChange={(e) => setRecoveryMonths(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleTillage}
                disabled={isPlowing || networkState === "severed"}
                className={cn(
                  "py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm",
                  isPlowing ? "bg-amber-200 text-amber-600 cursor-wait" :
                  networkState === "severed" ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
                  "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200/50")}
              >
                <Tractor size={18} />
                {isPlowing ? "جارِ الحراثة..." : "حراثة عميقة"}
              </button>
              <button
                onClick={handleFertilizer}
                disabled={networkState === "intact" || fertilizerApplied}
                className={cn(
                  "py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm",
                  networkState === "intact" ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
                  fertilizerApplied ? "bg-purple-200 text-purple-600" :
                  "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200/50")}
              >
                <FlaskConical size={18} />
                سماد كيماوي ({(50 + fertilizerCount * 10)}€)
              </button>
            </div>

            {/* الزراعة التجديدية — خيارات إضافية */}
            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200">
              <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1">
                <Sprout size={14} /> ممارسات التجديد
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setHasCoverCrop(!hasCoverCrop)}
                  disabled={networkState === "severed"}
                  className={cn(
                    "py-2 rounded-lg text-xs font-bold border-2 transition-all active:scale-[0.97] flex items-center justify-center gap-1",
                    hasCoverCrop ? "bg-emerald-100 border-emerald-400 text-emerald-700" :
                    networkState === "severed" ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed" :
                    "bg-white border-amber-300 text-amber-700 hover:bg-amber-100"
                  )}
                >
                  <CloudRain size={14} />
                  {hasCoverCrop ? "غطاء نباتي ✓" : "زراعة غطاء نباتي"}
                </button>
                <button
                  onClick={() => setHasCompost(!hasCompost)}
                  disabled={networkState === "severed"}
                  className={cn(
                    "py-2 rounded-lg text-xs font-bold border-2 transition-all active:scale-[0.97] flex items-center justify-center gap-1",
                    hasCompost ? "bg-emerald-100 border-emerald-400 text-emerald-700" :
                    networkState === "severed" ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed" :
                    "bg-white border-amber-300 text-amber-700 hover:bg-amber-100"
                  )}
                >
                  <Leaf size={14} />
                  {hasCompost ? "كمبوست ✓" : "إضافة كمبوست"}
                </button>
              </div>
            </div>

            {/* أزرار التحكم الرئيسية */}
            <div className="flex gap-2">
              {networkState === "severed" && (
                <button
                  onClick={handleStartRecovery}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-all active:scale-[0.97] text-sm shadow-lg shadow-teal-200/50"
                >
                  <Timer size={16} className="inline ml-1" />
                  ابدأ التعافي ({recoveryMonths} أشهر)
                </button>
              )}
              <button
                onClick={() => { setIsAutoMode(!isAutoMode); }}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] text-sm flex items-center justify-center gap-1.5",
                  isAutoMode ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white",
                )}
                style={{ flex: networkState !== "severed" ? 1 : undefined }}
              >
                {isAutoMode ? "إيقاف المحاكاة" : "تشغيل تلقائي"}
              </button>
              <button
                onClick={() => setShowCarbon(!showCarbon)}
                className={cn(
                  "px-3 py-2.5 rounded-xl font-bold text-xs transition-all border-2",
                  showCarbon ? "bg-emerald-100 border-emerald-400 text-emerald-700" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                )}
              >
                CO₂
              </button>
              <button
                onClick={resetSim}
                className="px-3 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center gap-1"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* التشخيص المتقدم */}
            <motion.div
              key={`myc-${networkState}-${recoveryMonths}-${totalFertilizerCost}-${hasCoverCrop ? "cc" : ""}-${hasCompost ? "cp" : ""}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {networkState === "intact" ? (
                <Alert type="success" title="🌿 شبكة فطرية سليمة — تربة حية ومنتجة!">
                  كفاءة الامتصاص {absorptionEfficiency}% — الشجرة اليسرى تحصل على ماء وفوسفور أكثر بـ 3 أضعاف بفضل المايكورايزا. المادة العضوية {soilOrganicMatter.toFixed(0)}%، الكربون المخزّن {carbonSequestration.toFixed(0)}%. صحة التربة {soilHealthScore}%. 
                  {hasCoverCrop ? " الغطاء النباتي يضيف 15% كفاءة إضافية ويمنع التعرية." : ""}
                  {hasCompost ? " الكمبوست يغذي الفطريات ويزيد التنوع الحيوي." : ""}
                </Alert>
              ) : networkState === "severed" ? (
                <Alert type="danger" title="🚨 الحراثة قطعت الشبكة الفطرية — كارثة بيئية واقتصادية!">
                  كفاءة الامتصاص انهارت إلى {absorptionEfficiency}%! الخسارة المباشرة: {getEconomicImpact()}€/هكتار. المادة العضوية {soilOrganicMatter.toFixed(0)}% (فقدان {hasCoverCrop ? "أقل بفضل الغطاء" : "سريع — زرع غطاء نباتي يبطئ الفقدان"}). الكربون المخزّن {carbonSequestration.toFixed(0)}% (انبعث CO₂ في الجو!). الأسمدة الكيماوية تخفف الأعراض مؤقتاً لكنها لا تعيد الفطريات. ستحتاج {recoveryMonths} أشهر للتعافي.
                  {tillageEvents.length > 1 && ` هذه الحراثة رقم ${tillageEvents.length} — كل حراثة تزيد الطين بلّة!`}
                </Alert>
              ) : (
                <Alert
                  type={isSoilAlive ? "success" : "warning"}
                  title={isSoilAlive ? "✅ التربة تتعافى بنجاح!" : "⚠ التربة في طريقها للتعافي"}
                >
                  {isSoilAlive
                    ? `بعد ${recoveryMonths} أشهر، كفاءة الامتصاص عادت إلى ${absorptionEfficiency}%. المادة العضوية ${soilOrganicMatter.toFixed(0)}%. صحة التربة ${soilHealthScore}%. الشبكة الفطرية أعادت بناء نفسها!`
                    : `التعافي مستمر — ${recoveryMonths} أشهر، الكفاءة ${absorptionEfficiency}%، تحتاج ${Math.max(1, 8 - recoveryMonths)} أشهر إضافية لعودة كاملة. ${hasCoverCrop ? "الغطاء النباتي يسرّع التعافي!" : "ازرع غطاء نباتي لتسريع التعافي."}`}
                  الأسمدة المتراكمة: {totalFertilizerCost}€ ({fertilizerCount} رشة).
                </Alert>
              )}
            </motion.div>

            {isAutoMode && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 text-center text-xs text-indigo-700 font-bold">
                🕐 المحاكاة التلقائية: سنة {simYears.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

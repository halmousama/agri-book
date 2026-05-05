import { useState, useCallback, useMemo } from "react";
import {
  Apple,
  SprayCan as Spray,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Euro,
  Timer,
  ShieldBan,
  TrendingUp,
  CloudRain,
  AlertCircle,
  RotateCcw,
  Ship,
  Ban,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

interface Pesticide {
  name: string;
  phi: number;
  halfLife: number;
  initialResidue: number;
  mrl: number;
  color: string;
}

interface Crop {
  name: string;
  icon: string;
  baseProfit: number;
  exportProfit: number;
}

const PESTICIDES: Pesticide[] = [
  { name: "كلوربيريفوس", phi: 14, halfLife: 3, initialResidue: 8, mrl: 0.5, color: "#ef4444" },
  { name: "سايبرمثرين", phi: 7, halfLife: 2, initialResidue: 5, mrl: 0.5, color: "#f59e0b" },
  { name: "إيميداكلوبريد", phi: 21, halfLife: 5, initialResidue: 10, mrl: 0.3, color: "#8b5cf6" },
  { name: "مانكوزيب", phi: 10, halfLife: 4, initialResidue: 6, mrl: 0.8, color: "#06b6d4" },
];

const CROPS: Crop[] = [
  { name: "تفاح", icon: "🍎", baseProfit: 12000, exportProfit: 15000 },
  { name: "عنب", icon: "🍇", baseProfit: 14000, exportProfit: 18000 },
  { name: "فلفل", icon: "🌶️", baseProfit: 8000, exportProfit: 12000 },
  { name: "طماطم", icon: "🍅", baseProfit: 9000, exportProfit: 13500 },
];

const HALF_LIFE_COLORS = ["#dc2626", "#ea580c", "#d97706", "#ca8a04"];

export const ExportCustomsSim = () => {
  const [sprayed, setSprayed] = useState(false);
  const [harvestDay, setHarvestDay] = useState(1);
  const [sprayDay, setSprayDay] = useState(0);
  const [selectedPesticide, setSelectedPesticide] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [hasRain, setHasRain] = useState(false);
  const [isRushOrder, setIsRushOrder] = useState(false);
  const [reapplyCount, setReapplyCount] = useState(0);
  const [showDecayGraph, setShowDecayGraph] = useState(true);

  const pesticide = PESTICIDES[selectedPesticide];
  const crop = CROPS[selectedCrop];

  const rainFactor = hasRain ? 0.7 : 1;
  const rushFactor = isRushOrder ? 0.85 : 1;

  const daysSinceSpray = sprayed ? Math.max(0, harvestDay - sprayDay) : 0;
  const effectiveDays = daysSinceSpray * rainFactor * rushFactor;
  const residueLevel = sprayed
    ? Math.max(0, pesticide.initialResidue * Math.pow(0.5, effectiveDays / pesticide.halfLife) * (reapplyCount > 0 ? (1 + reapplyCount * 0.6) : 1))
    : 0;

  const isApproved = sprayed ? residueLevel < pesticide.mrl : false;
  const isRejected = sprayed ? residueLevel >= pesticide.mrl : false;

  const profit = isApproved ? crop.exportProfit : isRejected ? 0 : crop.baseProfit;

  const residueBarPercent = sprayed
    ? Math.min(100, (residueLevel / pesticide.initialResidue) * 100)
    : 0;

  const appleColor = !sprayed ? "#22c55e" : isRejected ? "#ef4444" : "#86efac";

  const handleSpray = useCallback(() => {
    if (!sprayed) {
      setSprayed(true);
      setSprayDay(harvestDay);
      setReapplyCount(0);
    } else {
      setReapplyCount((c) => c + 1);
    }
  }, [sprayed, harvestDay]);

  const resetSim = useCallback(() => {
    setSprayed(false);
    setHarvestDay(1);
    setSprayDay(0);
    setSelectedPesticide(0);
    setSelectedCrop(0);
    setHasRain(false);
    setIsRushOrder(false);
    setReapplyCount(0);
  }, []);

  const decayData = useMemo(() => {
    const data: { day: number; residue: number; mrl: number }[] = [];
    for (let d = 0; d <= 30; d++) {
      const r = pesticide.initialResidue * Math.pow(0.5, d / pesticide.halfLife);
      data.push({ day: d, residue: r, mrl: pesticide.mrl });
    }
    return data;
  }, [selectedPesticide, pesticide]);

  const daysToSafe = sprayed
    ? Math.ceil(pesticide.halfLife * Math.log2(pesticide.initialResidue / pesticide.mrl))
    : 0;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-rose-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl shadow-lg shadow-rose-200/50">
              <ShieldBan className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                MRL & PHI — هندسة التصدير إلى الاتحاد الأوروبي
              </h3>
              <p className="text-xs text-slate-500">جواز السفر العالمي للشحنات الزراعية</p>
            </div>
          </div>
          <motion.div
            className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5",
              !sprayed ? "bg-blue-100 text-blue-700 border-blue-300" :
              isApproved ? "bg-emerald-100 text-emerald-700 border-emerald-300" :
              "bg-red-100 text-red-700 border-red-300")}
          >
            {!sprayed ? "قبل الرش" : isApproved ? "✅ معتمد للتصدير" : "❌ مرفوض"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري المطور ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 340" className="w-full h-full">
              <defs>
                <radialGradient id="appleGlowBad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="appleGlowGood" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fefce8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fef2f2" stopOpacity="1" />
                </linearGradient>
              </defs>

              <rect width="260" height="340" fill="url(#skyGrad)" rx="12" />

              {/* === التفاحة === */}
              <g transform="translate(130, 60)">
                {/* هالة سامة حمراء */}
                <AnimatePresence>
                  {sprayed && isRejected && (
                    <motion.circle
                      cx="0" cy="0" r="45"
                      fill="url(#appleGlowBad)"
                      initial={{ r: 20, opacity: 0 }}
                      animate={{ r: 50, opacity: [0.3, 0.7, 0.3] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {sprayed && isApproved && (
                    <motion.circle
                      cx="0" cy="0" r="45"
                      fill="url(#appleGlowGood)"
                      initial={{ r: 20, opacity: 0 }}
                      animate={{ r: 48, opacity: [0.2, 0.5, 0.2] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>

                <motion.g animate={isRejected ? { rotate: [-4, 4, -4] } : {}} transition={{ duration: 0.5, repeat: Infinity }}>
                  <defs>
                    <radialGradient id="fruitGrad" cx="40%" cy="30%">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor={appleColor} stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="0" cy="5" rx="26" ry="28" fill="url(#fruitGrad)" stroke={appleColor} strokeWidth="1.5" />
                  <path d="M-5,-24 Q-2,-32 0,-35 Q2,-32 5,-24" fill="#78350f" />
                  <path d="M2,-32 Q14,-40 18,-28 Q12,-24 2,-32" fill="#22c55e" />

                  {/* تعبير الوجه */}
                  {isRejected && (
                    <g>
                      <circle cx="-8" cy="3" r="2.5" fill="#7f1d1d" />
                      <circle cx="8" cy="3" r="2.5" fill="#7f1d1d" />
                      <path d="M-6,13 Q0,18 6,13" stroke="#7f1d1d" strokeWidth="2" fill="none" />
                      <path d="M-12,-2 Q-8,-5 -4,-2" stroke="#7f1d1d" strokeWidth="1" fill="none" opacity="0.5" />
                    </g>
                  )}
                  {isApproved && (
                    <g>
                      <circle cx="-8" cy="2" r="2.5" fill="#14532d" />
                      <circle cx="8" cy="2" r="2.5" fill="#14532d" />
                      <path d="M-6,10 Q0,6 6,10" stroke="#14532d" strokeWidth="2" fill="none" />
                    </g>
                  )}
                  {!sprayed && (
                    <g>
                      <circle cx="-7" cy="3" r="2" fill="#14532d" />
                      <circle cx="7" cy="3" r="2" fill="#14532d" />
                      <path d="M-4,8 Q0,5 4,8" stroke="#14532d" strokeWidth="1.5" fill="none" />
                    </g>
                  )}
                </motion.g>
              </g>

              {/* === أيقونة المحصول === */}
              <text x="20" y="30" fontSize="20">{crop.icon}</text>

              {/* === رذاذ المبيد (عند الرش) === */}
              <AnimatePresence>
                {sprayed && daysSinceSpray < 1 && (
                  <motion.g initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.circle
                        key={`spray-${i}`}
                        cx={110 + Math.random() * 40}
                        cy={15 + Math.random() * 25}
                        r={2.5}
                        fill={pesticide.color}
                        opacity="0.7"
                        animate={{ cy: [15, 55], opacity: [0.7, 0] }}
                        transition={{ duration: 1.2, delay: i * 0.06 }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* المطر */}
              <AnimatePresence>
                {hasRain && (
                  <motion.g>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.line
                        key={`rain-${i}`}
                        x1={20 + i * 28}
                        y1={70}
                        x2={18 + i * 28}
                        y2={95}
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        opacity="0.4"
                        animate={{ y1: [70, 100], y2: [95, 125] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === خط الزمن المطور === */}
              <g transform="translate(15, 150)">
                <text x="115" y="-6" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="bold">خط زمن الحصاد (أيام)</text>

                <rect x="0" y="0" width="230" height="8" rx="4" fill="#e2e8f0" />

                {/* مناطق الخطر */}
                <rect x="0" y="0" width={230 * (pesticide.phi / 30)} height="8" rx="4" fill="#fecaca" opacity="0.5" />
                <rect x={230 * (pesticide.phi / 30)} y="0" width={230 * ((30 - pesticide.phi) / 30)} height="8" rx="4" fill="#dcfce7" opacity="0.5" />

                {/* خط PHI */}
                <line x1={230 * (pesticide.phi / 30)} y1="-4" x2={230 * (pesticide.phi / 30)} y2="12" stroke="#dc2626" strokeWidth="2" />
                <text x={230 * (pesticide.phi / 30)} y="20" textAnchor="middle" fontSize="7" fill="#dc2626" fontWeight="bold">PHI={pesticide.phi}</text>

                {/* خط MRL */}
                <text x="5" y="30" fontSize="6" fill="#64748b">MRL: {pesticide.mrl} ppm</text>

                {/* يوم الرش */}
                {sprayed && (
                  <motion.circle
                    cx={230 * (sprayDay / 30)}
                    cy="4"
                    r="6"
                    fill={pesticide.color}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* مؤشر الحصاد المتحرك */}
                <motion.g animate={{ x: (harvestDay / 30) * 230 }} transition={{ type: "spring", stiffness: 100 }}>
                  <polygon points="-5,-12 5,-12 0,-5" fill="#0ea5e9" />
                  <line x1="0" y1="-5" x2="0" y2="14" stroke="#0ea5e9" strokeWidth="2.5" />
                </motion.g>

                {/* علامات الأيام */}
                {[7, 14, 21, 28].map((d) => (
                  <g key={`tick-${d}`}>
                    <line x1={(d / 30) * 230} y1="8" x2={(d / 30) * 230} y2="12" stroke="#cbd5e1" strokeWidth="1" />
                    <text x={(d / 30) * 230} y="24" textAnchor="middle" fontSize="5" fill="#94a3b8">{d}</text>
                  </g>
                ))}
              </g>

              {/* === بوابة الجمارك المطورة === */}
              <g transform="translate(200, 185)">
                <rect x="-8" y="0" width="58" height="70" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="21" y="14" textAnchor="middle" fontSize="7" fill="#64748b" fontWeight="bold">الجمارك الأوروبية</text>
                <circle cx="21" cy="30" r="10" fill="#1e40af" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle
                    key={`star-${i}`}
                    cx={21 + 7 * Math.cos((i * 30 * Math.PI) / 180)}
                    cy={30 + 7 * Math.sin((i * 30 * Math.PI) / 180)}
                    r="1" fill="#fbbf24"
                  />
                ))}

                {/* باب البوابة */}
                <motion.rect
                  x="21" y="42"
                  width={isApproved ? 0 : 29}
                  height="28"
                  fill="#dc2626"
                  opacity="0.7"
                  animate={{ width: isApproved ? 0 : 29 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* إشارة */}
                <circle cx="21" cy="58" r="5" fill={isApproved ? "#22c55e" : isRejected ? "#ef4444" : "#94a3b8"} />
                {isApproved && <text x="34" y="28" fontSize="6" fill="#16a34a" fontWeight="bold">✓ معتمد</text>}
                {isRejected && <text x="34" y="28" fontSize="6" fill="#dc2626" fontWeight="bold">✗ مرفوض</text>}

                {/* ختم الفحص */}
                {isRejected && (
                  <motion.g
                    transform="translate(21, 75)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#dc2626" opacity="0.15" />
                    <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold" transform="rotate(-15)">مرفوض</text>
                  </motion.g>
                )}
              </g>

              {/* === رسوم بيانية حية === */}
              <g transform="translate(5, 270)">
                <rect x="0" y="0" width="250" height="28" rx="6" fill="white" opacity="0.9" stroke="#e2e8f0" strokeWidth="1" />

                <text x="8" y="10" fontSize="6" fill="#64748b">المتبقيات</text>
                <text x="8" y="22" fontSize="10" fontFamily="monospace" fontWeight="bold"
                  fill={isRejected ? "#dc2626" : isApproved ? "#16a34a" : "#64748b"}
                >
                  {sprayed ? `${residueLevel.toFixed(3)} ppm` : "0 ppm"}
                </text>

                <text x="100" y="10" fontSize="6" fill="#64748b">MRL</text>
                <text x="100" y="22" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#dc2626">
                  {pesticide.mrl} ppm
                </text>

                <text x="160" y="10" fontSize="6" fill="#64748b">الأيام</text>
                <text x="160" y="22" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#0ea5e9">
                  {sprayed ? daysSinceSpray : "—"}
                </text>

                <text x="210" y="10" fontSize="6" fill="#64748b">الربح</text>
                <text x="210" y="22" fontSize="10" fontFamily="monospace" fontWeight="bold"
                  fill={isApproved ? "#16a34a" : isRejected ? "#dc2626" : "#64748b"}
                >
                  {profit > 0 ? `${profit.toLocaleString()}€` : "0€"}
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم المطورة ===== */}
          <div className="flex-1 space-y-3">
            {/* اختيار المحصول والمبيد */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <label className="text-xs font-bold text-slate-600 block mb-1.5 px-1">المحصول</label>
                <div className="flex gap-1">
                  {CROPS.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => { setSelectedCrop(i); resetSim(); }}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all",
                        selectedCrop === i ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {c.icon} {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <label className="text-xs font-bold text-slate-600 block mb-1.5 px-1">المبيد</label>
                <div className="flex gap-1">
                  {PESTICIDES.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => { setSelectedPesticide(i); resetSim(); }}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-[9px] font-bold border-2 transition-all leading-tight",
                        selectedPesticide === i ? "bg-rose-50 border-rose-400 text-rose-700" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                      )}
                    >
                      {p.name.substring(0, 4)}..
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* شريط الحصاد */}
            <Slider
              label="اختيار يوم الحصاد"
              value={harvestDay}
              min={1}
              max={30}
              unit={`يوم ${harvestDay}/30`}
              color={harvestDay >= pesticide.phi ? "emerald" : harvestDay >= pesticide.phi - 5 ? "amber" : "rose"}
              onChange={(e) => setHarvestDay(Number(e.target.value))}
            />

            {/* أزرار الإجراءات */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSpray}
                disabled={sprayed && reapplyCount >= 3}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm",
                  sprayed && reapplyCount >= 3 ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
                  sprayed ? "bg-amber-200 text-amber-600" :
                  "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200/50"
                )}
              >
                <Spray size={16} />
                {sprayed ? `تم الرش (${reapplyCount > 0 ? `+${reapplyCount}` : `يوم ${sprayDay}`})` : "رش المبيد"}
              </button>
              <button
                onClick={() => setHasRain(!hasRain)}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm border-2",
                  hasRain ? "bg-blue-100 border-blue-400 text-blue-700" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                )}
              >
                <CloudRain size={16} />
                {hasRain ? "مطر ✓" : "إضافة مطر"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsRushOrder(!isRushOrder)}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm border-2",
                  isRushOrder ? "bg-red-100 border-red-400 text-red-700" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                )}
              >
                <Ban size={16} />
                {isRushOrder ? "طلب عاجل ✓" : "طلب عاجل!"}
              </button>
              <button
                onClick={() => setShowDecayGraph(!showDecayGraph)}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm border-2",
                  showDecayGraph ? "bg-indigo-100 border-indigo-400 text-indigo-700" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                )}
              >
                <TrendingUp size={16} />
                {showDecayGraph ? "منحنى الاضمحلال ✓" : "منحنى الاضمحلال"}
              </button>
            </div>

            {/* عدادات المتبقيات */}
            <div className="grid grid-cols-3 gap-2">
              <div className={cn("rounded-xl p-2.5 border", isRejected ? "bg-red-50 border-red-200" : "bg-teal-50 border-teal-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <Timer size={10} className="text-purple-500" /> المتبقيات
                </div>
                <div className={cn("text-base font-black font-mono", isRejected ? "text-red-600" : isApproved ? "text-emerald-600" : "text-teal-600")}>
                  {sprayed ? residueLevel.toFixed(3) : "—"}
                </div>
              </div>
              <div className="rounded-xl p-2.5 border border-slate-200 bg-white">
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <ShieldBan size={10} className="text-red-500" /> MRL
                </div>
                <div className="text-base font-black font-mono text-red-600">{pesticide.mrl} ppm</div>
              </div>
              <div className={cn("rounded-xl p-2.5 border", isApproved ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200")}>
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-0.5">
                  <Euro size={10} className="text-yellow-500" /> الربح
                </div>
                <div className={cn("text-base font-black font-mono", isApproved ? "text-emerald-600" : "text-slate-500")}>
                  {profit.toLocaleString()}€
                </div>
              </div>
            </div>

            {/* معلومات المبيد */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-2.5">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[9px] text-slate-500 font-bold">PHI</div>
                  <div className="text-sm font-black font-mono text-rose-600">{pesticide.phi} يوم</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-bold">نصف العمر</div>
                  <div className="text-sm font-black font-mono text-amber-600">{pesticide.halfLife} يوم</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-bold">أمان بعد</div>
                  <div className="text-sm font-black font-mono text-emerald-600">{daysToSafe} يوم</div>
                </div>
              </div>
            </div>

            {/* منحنى الاضمحلال الأسي */}
            {showDecayGraph && (
              <div className="bg-white rounded-xl border border-slate-200 p-2.5">
                <h5 className="text-xs font-bold text-slate-600 mb-1.5">منحنى اضمحلال المبيد (N(t) = N₀ × 0.5^(t/τ))</h5>
                <div className="w-full h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={decayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 9 }} label={{ value: 'يوم', position: 'bottom', fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} label={{ value: 'ppm', angle: -90, position: 'insideLeft', fontSize: 9 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", fontSize: "11px", direction: "rtl" }}
                        formatter={(value) => `${Number(value).toFixed(3)} ppm`}
                      />
                      <ReferenceLine
                        y={pesticide.mrl}
                        stroke="#dc2626"
                        strokeDasharray="5 5"
                        label={{ value: `MRL ${pesticide.mrl} ppm`, position: 'right', fontSize: 9, fill: '#dc2626' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="residue"
                        stroke={pesticide.color}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                      {sprayed && (
                        <ReferenceLine
                          x={daysSinceSpray}
                          stroke="#0ea5e9"
                          strokeDasharray="3 3"
                          label={{ value: `حصاد يوم ${harvestDay}`, position: 'top', fontSize: 9, fill: '#0ea5e9' }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* إعادة تعيين */}
            <button
              onClick={resetSim}
              className="w-full py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition-all active:scale-[0.97] text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} />
              إعادة المحاكاة
            </button>

            {/* التشخيص النهائي المتقدم */}
            <motion.div
              key={`export-${sprayed}-${harvestDay}-${selectedPesticide}-${hasRain}-${isRushOrder}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {!sprayed ? (
                <Alert type="info" title="ℹ المنتج نظيف — بدون مبيدات">
                  المتبقيات: 0 ppm. يمكنك بيع الشحنة محلياً بسعر {crop.baseProfit.toLocaleString()}€. لكن التصدير إلى الاتحاد الأوروبي يتطلب رشاً استراتيجياً واحترام PHI ({pesticide.phi} يوماً) لتربح {crop.exportProfit.toLocaleString()}€. اختر المبيد المناسب وجرّب!
                </Alert>
              ) : isRejected ? (
                <Alert type="danger" title="🚨 مرفوض! الشحنة محجوزة في جمارك الاتحاد الأوروبي">
                  متبقيات المبيد ({residueLevel.toFixed(3)} ppm) تتجاوز الحد المسموح ({pesticide.mrl} ppm). الشحنة مرفوضة! الخسارة:{' '}
                  {profit === 0
                    ? `شحنة كاملة خاسرة (تكلفة الشحن + التخزين ~${(crop.baseProfit * 0.3).toFixed(0)}€)`
                    : `ربح محلي فقط ${profit.toLocaleString()}€ بدلاً من ${crop.exportProfit.toLocaleString()}€`}
                  . المبيد المستخدم: {pesticide.name} (PHI: {pesticide.phi} يوم، نصف العمر: {pesticide.halfLife} يوم). كان يجب الانتظار حتى اليوم {daysToSafe} على الأقل.
                  {hasRain ? " المطر خفّض المتبقيات قليلاً لكنه لم يكن كافياً." : ""}
                  {isRushOrder ? " الطلب العاجل أجبرك على الحصاد المبكر — هذا هو الثمن!" : ""}
                </Alert>
              ) : (
                <Alert type="success" title="✅ مقبول! الشحنة معتمدة للتصدير إلى الاتحاد الأوروبي!">
                  متبقيات المبيد {residueLevel.toFixed(3)} ppm — أقل من MRL ({pesticide.mrl} ppm). الربح: {profit.toLocaleString()}€. المبيد {pesticide.name} اضمحل بشكل كافٍ بعد {daysSinceSpray} يوماً (PHI = {pesticide.phi}). 
                  {hasRain ? " المطر سرّع من اضمحلال المبيد." : ""}
                  {isRushOrder ? " رغم الضغط، التزمت بفترة الأمان — قرار صائب!" : ""}
                  اختيار ممتاز لهندسة التصدير الآمن!
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

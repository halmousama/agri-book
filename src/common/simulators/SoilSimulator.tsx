import { useState, useEffect } from "react";
import {
  CloudRain,
  Layers,
  AlertTriangle,
  CheckCircle,
  Droplets,
  Info,
  Sprout,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

type SoilType = "sand" | "loam" | "clay";

// === المحرك الفيزيائي الهيدرولوجي ===
const SOIL_PHYSICS = {
  sand: {
    name: "رملية (مصفاة)",
    saturation: 100,
    fieldCapacity: 30,
    wiltingPoint: 10,
    drainageRate: 8,
    color: "#fde047",
    particleSize: 12,
  },
  loam: {
    name: "طميية (مثالية)",
    saturation: 100,
    fieldCapacity: 60,
    wiltingPoint: 20,
    drainageRate: 3,
    color: "#a8a29e",
    particleSize: 6,
  },
  clay: {
    name: "طينية (إسفنجة)",
    saturation: 100,
    fieldCapacity: 85,
    wiltingPoint: 45,
    drainageRate: 0.8,
    color: "#7f1d1d",
    particleSize: 3,
  },
};

export const SoilSimulator = () => {
  const [soilType, setSoilType] = useState<SoilType>("sand");
  const [waterLevel, setWaterLevel] = useState(0);
  const [isPouring, setIsPouring] = useState(false);
  const [history, setHistory] = useState<{ time: number; water: number }[]>([]);
  const [timeStep, setTimeStep] = useState(0);

  const physics = SOIL_PHYSICS[soilType];

  const pourWater = () => {
    setIsPouring(true);
    setWaterLevel(physics.saturation);
    setHistory([]);
    setTimeStep(0);
    setTimeout(() => setIsPouring(false), 800);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isPouring && waterLevel > 0) {
      interval = setInterval(() => {
        setWaterLevel((prev) => {
          let next = prev;
          if (prev > physics.fieldCapacity) next = prev - physics.drainageRate;
          else if (prev > physics.wiltingPoint) next = prev - 0.5;
          else next = physics.wiltingPoint;

          setHistory((h) => {
            const newHistory = [...h, { time: timeStep, water: Math.max(0, next) }];
            if (newHistory.length > 40) newHistory.shift();
            return newHistory;
          });

          setTimeStep((t) => t + 1);
          return Math.max(0, next);
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPouring, waterLevel, physics, timeStep]);

  const isDrowning = waterLevel > physics.fieldCapacity;
  const isWilting = waterLevel <= physics.wiltingPoint;
  const isHappy = !isDrowning && !isWilting && waterLevel > 0;

  const leafColor = isDrowning ? "#facc15" : isWilting ? "#a3e635" : "#22c55e";
  const rootColor = isDrowning ? "#1e3a8a" : "#d97706";
  const wiltAngle = isWilting ? 35 : 0;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-stone-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-stone-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Layers className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">مختبر التربة والري — هيدرولوجيا</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">محاكاة تسرب الماء في أنواع التربة المختلفة</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isDrowning
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : isWilting
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
            animate={isWilting ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isDrowning ? "🌊 غرق" : isWilting ? "⚠ ذبول" : "✅ مثالي"}
          </motion.div>
        </div>

        {/* ===== أزرار التربة ===== */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            {(["sand", "loam", "clay"] as SoilType[]).map((type) => (
              <button
                key={type}
                onClick={() => { setSoilType(type); setWaterLevel(0); setHistory([]); }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  soilType === type
                    ? "bg-white shadow-sm text-blue-700 border border-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {SOIL_PHYSICS[type].name.split(" ")[0]}
              </button>
            ))}
          </div>
          <button
            onClick={pourWater}
            disabled={isPouring}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-md active:scale-95 disabled:opacity-50 transition-all"
          >
            <CloudRain size={18} /> اسقِ الحقل (100%)
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* ===== المشهد الفلاحي (SVG) ===== */}
          <div className="w-full lg:w-80 h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-2 relative">
            <svg viewBox="0 0 200 400" className="w-full h-full absolute inset-0">
              <defs>
                <radialGradient id="soilSun" cx="85%" cy="10%" r="20%">
                  <stop offset="0%" stopColor="#fde047" opacity="0.8" />
                  <stop offset="100%" stopColor="#fef3c7" opacity="0" />
                </radialGradient>
                <pattern id="soilPattern" x="0" y="0" width={physics.particleSize * 2} height={physics.particleSize * 2} patternUnits="userSpaceOnUse">
                  <circle cx={physics.particleSize} cy={physics.particleSize} r={physics.particleSize / 1.5} fill="#444" opacity="0.15" />
                </pattern>
              </defs>

              <rect width="200" height="400" fill="#f0f9ff" />
              <circle cx="170" cy="40" r="20" fill="#fde047" opacity="0.8" />

              {/* طبقة التربة */}
              <rect x="0" y="200" width="200" height="200" fill={physics.color} opacity="0.6" />
              <rect x="0" y="200" width="200" height="200" fill="url(#soilPattern)" />

              {/* النبات التفاعلي */}
              <g transform="translate(100, 200)">
                <rect x="-3" y="-90" width="6" height="90" fill="#16a34a" />

                <motion.g animate={{ rotate: wiltAngle }} transition={{ type: "spring", stiffness: 50 }} style={{ originX: "0px", originY: "-70px" }}>
                  <path d="M0,-70 Q20,-90 40,-70 Q20,-50 0,-70" fill={leafColor} className="transition-colors duration-1000" />
                </motion.g>
                <motion.g animate={{ rotate: -wiltAngle }} transition={{ type: "spring", stiffness: 50 }} style={{ originX: "0px", originY: "-50px" }}>
                  <path d="M0,-50 Q-30,-70 -40,-40 Q-20,-20 0,-50" fill={leafColor} className="transition-colors duration-1000" />
                </motion.g>
                <path d="M-15,-90 Q0,-120 15,-90 Q0,-80 -15,-90" fill={leafColor} className="transition-colors duration-1000" />

                {/* الجذور */}
                <motion.path d="M0,0 Q-20,40 -10,100 M0,0 Q30,60 10,140 M0,0 L-5,160 M-10,100 L-25,120 M10,140 L25,150"
                  stroke={rootColor} strokeWidth="3" fill="none" strokeLinecap="round"
                  animate={{ stroke: rootColor }} transition={{ duration: 1 }} />
              </g>

              {/* مستوى الماء المتحرك */}
              <motion.rect
                x="0" width="200"
                initial={{ y: 400, height: 0 }}
                animate={{ y: 400 - waterLevel * 2, height: waterLevel * 2 }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                fill="#3b82f6" opacity="0.4"
              />

              {/* قطرات التصريف */}
              {isDrowning && soilType === "sand" && waterLevel > 0 && (
                <g opacity="0.6">
                  <motion.circle cx="50" cy="380" r="4" fill="#3b82f6"
                    animate={{ y: [380, 370, 380], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 0.5, repeat: Infinity }} />
                  <motion.circle cx="150" cy="390" r="4" fill="#3b82f6"
                    animate={{ y: [390, 380, 390], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 0.5, repeat: Infinity }} />
                </g>
              )}
            </svg>

            {isDrowning && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold shadow-md animate-bounce flex items-center gap-1 z-10">
                <Droplets size={14} /> غرق واختناق!
              </div>
            )}
          </div>

          {/* ===== الرسم البياني + التحكم ===== */}
          <div className="flex-1 space-y-3">
            {/* الرسم البياني */}
            <div className="w-full h-64 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Info size={18} className="text-blue-500" />
                  منحنى استنزاف المياه
                </h4>
                <span className="font-mono font-black text-xl text-blue-600">
                  {Math.round(waterLevel)}%
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#64748b", fontWeight: "bold" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px", fontFamily: "Cairo" }} labelStyle={{ display: "none" }} />
                    <ReferenceLine y={physics.fieldCapacity} stroke="#10b981" strokeDasharray="4 4" strokeWidth={2}
                      label={{ position: "top", value: "السعة الحقلية (مثالي)", fill: "#10b981", fontSize: 12, fontWeight: "bold" }} />
                    <ReferenceLine y={physics.wiltingPoint} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2}
                      label={{ position: "bottom", value: "نقطة الذبول (خطر)", fill: "#ef4444", fontSize: 12, fontWeight: "bold" }} />
                    <Area type="monotone" dataKey="water" name="مستوى الماء %" stroke="#3b82f6" strokeWidth={3}
                      fillOpacity={1} fill="url(#colorWater)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* خصائص التربة */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                <div className="text-[10px] font-bold text-amber-800">معدل الصرف</div>
                <div className="text-lg font-black text-amber-700 font-mono">{physics.drainageRate}/ث</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800">السعة الحقلية</div>
                <div className="text-lg font-black text-emerald-700 font-mono">{physics.fieldCapacity}%</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                <div className="text-[10px] font-bold text-red-800">نقطة الذبول</div>
                <div className="text-lg font-black text-red-700 font-mono">{physics.wiltingPoint}%</div>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`soil-${soilType}-${Math.round(waterLevel)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isDrowning ? (
                <Alert type="warning" title="🌊 مرحلة الغرق — فوق السعة الحقلية">
                  الماء يملأ كل الفراغات ويطرد الأكسجين. الجذور تختنق (لاحظ لونها الأزرق) والأوراق تصفر.
                  في التربة {physics.name.split(" ")[0]}، الماء ينزل بسرعة {physics.drainageRate} وحدات بفعل الجاذبية.
                  المستوى الحالي: {Math.round(waterLevel)}% — السعة الحقلية: {physics.fieldCapacity}%.
                </Alert>
              ) : isWilting ? (
                <Alert type="danger" title="⚠ مرحلة الذبول الدائم — عطش قاتل">
                  الماء المتبقي ({Math.round(waterLevel)}%) محبوس بقوة مغناطيسية داخل حبيبات التربة.
                  الجذور لا تستطيع شفطه فتذبل الأوراق وتنحني!
                  الطين يخدع الفلاح، يبدو مبللاً لكن النبتة تموت عطشاً. اسقِ فوراً!
                </Alert>
              ) : waterLevel > 0 ? (
                <Alert type="success" title="✅ المرحلة الذهبية — الماء الميسر">
                  التربة تخلصت من الماء الزائد، واحتفظت بالماء المفيد كالإسفنجة المعتدلة.
                  الجذور تتنفس الأكسجين وتشرب الماء بسهولة تامة.
                  المستوى الحالي: {Math.round(waterLevel)}% — مثالي لنمو النبات.
                </Alert>
              ) : (
                <Alert type="info" title="💧 أضغط زر السقي لبدء المحاكاة">
                  اختر نوع التربة ثم اضغط "اسقِ الحقل" لترى كيف يتسرب الماء في كل نوع.
                  الرمل: صرف سريع — الطمي: صرف معتدل — الطين: صرف بطيء جداً.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

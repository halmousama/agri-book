import { useState } from "react";
import {
  Tractor,
  Droplets,
  Maximize2,
  AlertTriangle,
  CheckCircle,
  Sprout,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type Moisture = "dry" | "moist" | "wet";
type TireWidth = "narrow" | "medium" | "wide";

const moistureLabels: Record<Moisture, string> = {
  dry: "جافة",
  moist: "رطبة",
  wet: "مبللة",
};

const moistureColors: Record<Moisture, string> = {
  dry: "bg-amber-50 border-amber-200 text-amber-700",
  moist: "bg-emerald-50 border-emerald-200 text-emerald-700",
  wet: "bg-blue-50 border-blue-200 text-blue-700",
};

const tireLabels: Record<TireWidth, string> = {
  narrow: "ضيق",
  medium: "متوسط",
  wide: "عريض",
};

export const TractorCompactionSim = () => {
  const [moisture, setMoisture] = useState<Moisture>("dry");
  const [weight, setWeight] = useState(4);
  const [tireWidth, setTireWidth] = useState<TireWidth>("medium");

  // Physics calculations
  const moistureFactor =
    moisture === "dry" ? 0.3 : moisture === "moist" ? 0.6 : 1.0;
  const tireFactor =
    tireWidth === "narrow" ? 1.2 : tireWidth === "medium" ? 0.8 : 0.5;

  const compactionForce = Math.min(100, weight * moistureFactor * tireFactor * 3);
  const hardpanDepth = 20 + compactionForce * 0.3; // 20-50 cm depth
  const rootPenetration = Math.max(10, 60 - compactionForce * 0.5);

  // Pores data
  const totalPores = 40;
  const collapsedPores = Math.round((compactionForce / 100) * totalPores);
  const intactPores = totalPores - collapsedPores;

  // Generate pore positions
  const porePositions = Array.from({ length: totalPores }).map((_, i) => {
    const col = i % 8;
    const row = Math.floor(i / 8);
    return {
      x: 12 + col * 22,
      y: 75 + row * 22,
      collapsed: i < collapsedPores,
    };
  });

  // Root segments
  const rootSegments = 5;

  const isSevere = compactionForce > 70;
  const isModerate = compactionForce > 40 && compactionForce <= 70;
  const isHealthy = compactionForce <= 40;

  const getStatusColor = () => {
    if (isSevere) return "text-red-600";
    if (isModerate) return "text-amber-600";
    return "text-emerald-600";
  };

  const getStatusLabel = () => {
    if (isSevere) return "خطر — انضغاط شديد";
    if (isModerate) return "تنبيه — انضغاط متوسط";
    return "صحي — تهوية جيدة";
  };

  const MoistureButton = ({ value, label }: { value: Moisture; label: string }) => (
    <button
      onClick={() => setMoisture(value)}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all",
        moisture === value
          ? moistureColors[value]
          : "border-slate-200 text-slate-500 hover:bg-slate-50"
      )}
    >
      {label}
    </button>
  );

  const TireButton = ({ value, label }: { value: TireWidth; label: string }) => (
    <button
      onClick={() => setTireWidth(value)}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all",
        tireWidth === value
          ? "bg-purple-50 border-purple-300 text-purple-700"
          : "border-slate-200 text-slate-500 hover:bg-slate-50"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-amber-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Tractor className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">ميكانيكا التربة — الانضغاط (Soil Compaction)</h3>
              <p className="text-xs text-slate-500">تأثير وزن الجرار وعرض الإطار على بنية التربة</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              getStatusColor().replace("text-", "border-").replace("600", "200") + " " +
              getStatusColor().replace("text-", "bg-").replace("600", "50") + " " + getStatusColor()
            )}
            animate={isSevere ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {getStatusLabel()}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== Visual Lab ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <radialGradient id="skyCompGrad" cx="50%" cy="10%" r="50%">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#fef3c7" />
                </radialGradient>
              </defs>
              <rect width="200" height="280" fill="url(#skyCompGrad)" rx="8" />

              {/* === Sky === */}
              <rect x="0" y="0" width="200" height="50" fill="#e0f2fe" opacity="0.5" />

              {/* === Soil Layers === */}
              <rect x="0" y="50" width="200" height="90" fill="#92400e" opacity="0.7" />
              <rect x="0" y="140" width="200" height="140" fill="#78350f" opacity="0.8" />

              {/* === Hardpan Layer (compacted) === */}
              {isModerate || isSevere ? (
                <motion.rect
                  x="0"
                  y={hardpanDepth}
                  width="200"
                  height="8"
                  fill="#450a0a"
                  opacity="0.8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5 }}
                />
              ) : null}

              {/* === Soil Pores (air pockets) === */}
              {porePositions.map((pore, i) => (
                <motion.circle
                  key={i}
                  cx={pore.x}
                  cy={pore.y}
                  r={pore.collapsed ? 1.5 : 4}
                  fill={pore.collapsed ? "#1c1917" : "#fef3c7"}
                  stroke={pore.collapsed ? "none" : "#d6d3d1"}
                  strokeWidth="0.5"
                  opacity={pore.collapsed ? 0.4 : 0.7}
                  animate={{ r: pore.collapsed ? 1.5 : 4, opacity: pore.collapsed ? 0.4 : 0.7 }}
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* === Plant and Roots === */}
              <g transform="translate(100, 50)">
                <rect x="-2" y="-30" width="4" height="30" fill="#16a34a" rx="1" />
                <motion.path d="M-2,-25 Q-15,-35 -10,-20" fill="#22c55e" animate={{ scale: isSevere ? 0.6 : 1 }} style={{ transformOrigin: "-2px -25px" }} />
                <motion.path d="M2,-20 Q15,-30 10,-15" fill="#22c55e" animate={{ scale: isSevere ? 0.6 : 1 }} style={{ transformOrigin: "2px -20px" }} />
                <motion.path d="M-2,-15 Q-12,-22 -8,-10" fill="#22c55e" animate={{ scale: isSevere ? 0.6 : 1 }} style={{ transformOrigin: "-2px -15px" }} />

                {Array.from({ length: rootSegments }).map((_, i) => {
                  const angle = -40 + i * 20;
                  const rad = (angle * Math.PI) / 180;
                  const rootLen = Math.min(rootPenetration * 1.5, 80);
                  const dx = Math.cos(rad) * rootLen;
                  const dy = Math.sin(rad) * rootLen;
                  const hitsHardpan = isModerate || isSevere ? Math.abs(dy) > hardpanDepth - 50 : false;
                  return (
                    <g key={`root-${i}`}>
                      <motion.path
                        d={`M0,0 Q${dx * 0.3},${dy * 0.3} ${hitsHardpan ? dx * 0.7 : dx},${hitsHardpan ? -(hardpanDepth - 50) : dy}`}
                        stroke={hitsHardpan ? "#dc2626" : isSevere ? "#fbbf24" : "#92400e"}
                        strokeWidth="2" fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                      {hitsHardpan && (
                        <motion.path
                          d={`M${dx * 0.7},${-(hardpanDepth - 50)} L${dx * 0.7 + 15},${-(hardpanDepth - 50)}`}
                          stroke="#dc2626" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* === Tractor Tire === */}
              <motion.g
                animate={{ y: isSevere ? [0, 2, 0] : isModerate ? [0, 1, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ellipse cx="100" cy="65" rx="30" ry="5" fill="black" opacity="0.15" />
                <rect x="70" y="35" width="60" height={tireWidth === "narrow" ? 18 : tireWidth === "medium" ? 24 : 30} rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <rect key={i} x={75 + i * 12} y={tireWidth === "narrow" ? 38 : 38} width="6" height={tireWidth === "narrow" ? 12 : tireWidth === "medium" ? 18 : 24} rx="1" fill="#334155" />
                ))}
                <rect x="95" y="30" width="10" height="8" rx="2" fill="#64748b" />
                <text x="100" y={tireWidth === "narrow" ? 47 : tireWidth === "medium" ? 50 : 54} textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="bold">{weight} طن</text>
              </motion.g>

              {/* === Compaction force indicator === */}
              <g transform="translate(10, 260)">
                <rect x="0" y="0" width="180" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="0" y="0" height="6" rx="3"
                  fill={isSevere ? "#dc2626" : isModerate ? "#f59e0b" : "#22c55e"}
                  animate={{ width: `${compactionForce * 1.8}` }}
                  transition={{ duration: 0.3 }}
                />
              </g>

              {isModerate || isSevere ? (
                <text x="100" y={hardpanDepth + 6} textAnchor="middle" fontSize="6" fill="#fca5a5" fontWeight="bold">
                  ● Hardpan (طبقة منضغطة)
                </text>
              ) : null}
            </svg>
          </div>

          {/* ===== Dashboard Controls ===== */}
          <div className="flex-1 space-y-3">
            {/* Soil Moisture */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Droplets size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-800">رطوبة التربة</span>
              </div>
              <div className="flex gap-2">
                <MoistureButton value="dry" label="جافة" />
                <MoistureButton value="moist" label="رطبة" />
                <MoistureButton value="wet" label="مبللة" />
              </div>
            </div>

            {/* Tractor Weight */}
            <Slider
              label="وزن الجرار"
              value={weight}
              min={2}
              max={10}
              unit="طن"
              color={weight >= 8 ? "rose" : weight >= 5 ? "amber" : "emerald"}
              onChange={(e) => setWeight(Number(e.target.value))}
            />

            {/* Tire Width */}
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Maximize2 size={16} className="text-purple-600" />
                <span className="text-sm font-bold text-purple-800">عرض الإطار</span>
              </div>
              <div className="flex gap-2">
                <TireButton value="narrow" label="ضيق" />
                <TireButton value="medium" label="متوسط" />
                <TireButton value="wide" label="عريض" />
              </div>
              <div className="text-[10px] text-purple-600 mt-2 font-bold">
                {tireWidth === "narrow"
                  ? "إطار ضيق ← ضغط عالي على التربة"
                  : tireWidth === "medium"
                    ? "إطار متوسط ← توازن مقبول"
                    : "إطار عريض ← توزيع ممتاز للوزن"}
              </div>
            </div>

            {/* Soil Health Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className={cn("rounded-xl p-3 border", isHealthy ? "bg-emerald-50 border-emerald-200" : isModerate ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600">المسام الهوائية</div>
                <div className={cn("text-lg font-black font-mono", isHealthy ? "text-emerald-600" : isModerate ? "text-amber-600" : "text-red-600")}>
                  {intactPores}/{totalPores}
                </div>
              </div>
              <div className={cn("rounded-xl p-3 border", isHealthy ? "bg-emerald-50 border-emerald-200" : isModerate ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600">اختراق الجذور</div>
                <div className={cn("text-lg font-black font-mono", isHealthy ? "text-emerald-600" : isModerate ? "text-amber-600" : "text-red-600")}>
                  {rootPenetration.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`compaction-${compactionForce.toFixed(0)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isSevere ? (
                <Alert type="danger" title="🚨 انضغاط شديد — طبقة Hardpan تكونت!">
                  وزن {weight} طن × رطوبة {moistureLabels[moisture]} × إطار {tireLabels[tireWidth]} = قوة انضغاط {compactionForce.toFixed(0)}%.
                  المسام الهوائية انهارت ({intactPores}/{totalPores}). الجذور لا تستطيع اختراق الـ Hardpan على عمق {hardpanDepth.toFixed(0)} سم.
                  المحصول سينخفض بشدة. الحل: استخدم أرضاً جافة أو إطارات عريضة أو قلل الوزن.
                </Alert>
              ) : isModerate ? (
                <Alert type="warning" title="⚠ انضغاط متوسط — راقب الوضع">
                  قوة الانضغاط {compactionForce.toFixed(0)}%. بعض المسام الهوائية انهارت ({intactPores}/{totalPores}).
                  الجذور بدأت تواجه صعوبة عند {hardpanDepth.toFixed(0)} سم. يمكن تحسين الوضع باستخدام إطارات أوسع أو انتظار حتى تجف التربة.
                </Alert>
              ) : (
                <Alert type="success" title="✅ تربة صحية — تهوية ممتازة">
                  قوة انضغاط منخفضة ({compactionForce.toFixed(0)}%). جميع المسام الهوائية سليمة ({intactPores}/{totalPores}).
                  الجذور تنمو بحرية دون عوائق. استمر في استخدام الإطارات العريضة وتجنب العمل في تربة رطبة.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

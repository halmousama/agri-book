import { useState, useRef, useEffect } from "react";
import {
  Satellite,
  Eye,
  ScanLine,
  AlertTriangle,
  CheckCircle,
  SprayCan,
  Droplets,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type ViewMode = "rgb" | "ndvi";

export const DroneNdviSim = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("rgb");
  const [scanSpeed, setScanSpeed] = useState(50);
  const [neglectDays, setNeglectDays] = useState(0);
  const [isSprayed, setIsSprayed] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rows = 5;
  const cols = 6;
  const totalTrees = rows * cols;

  const infectionIndex = 4;
  const hasEarlyWarning = !isSprayed && neglectDays >= 2 && neglectDays < 5;
  const hasSpread = !isSprayed && neglectDays >= 5;

  const ndviValue = isSprayed
    ? 0.85
    : hasSpread
      ? 0.25
      : hasEarlyWarning
        ? 0.55
        : 0.78;

  const getStatusLabel = () => {
    if (isSprayed) return { text: "تعافى — صحي", color: "text-emerald-600" };
    if (hasSpread) return { text: "خطر — منتشر", color: "text-red-600" };
    if (hasEarlyWarning) return { text: "إنذار مبكر", color: "text-amber-600" };
    return { text: "صحي", color: "text-emerald-600" };
  };

  const status = getStatusLabel();

  useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, Math.max(20, 100 - scanSpeed));
    return () => clearInterval(timer);
  }, [scanSpeed]);

  const getTreeColor = (index: number) => {
    if (viewMode === "rgb") return "#22c55e";
    const isInfected = index === infectionIndex;
    if (isSprayed) return "#22c55e";
    if (hasSpread && isInfected) return "#dc2626";
    if (hasSpread) {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const infRow = Math.floor(infectionIndex / cols);
      const infCol = infectionIndex % cols;
      const dist = Math.abs(row - infRow) + Math.abs(col - infCol);
      if (dist <= neglectDays - 4) return "#dc2626";
      if (dist === neglectDays - 3) return "#f59e0b";
      return "#22c55e";
    }
    if (hasEarlyWarning && isInfected) return "#f59e0b";
    if (hasEarlyWarning && Math.abs(index - infectionIndex) <= 1) return "#a3e635";
    return index === infectionIndex ? "#f59e0b" : "#22c55e";
  };

  const getTreeOpacity = (index: number) => {
    if (viewMode === "rgb") return 1;
    const isInfected = index === infectionIndex;
    if (hasSpread && isInfected) return 1;
    if (hasSpread) {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const infRow = Math.floor(infectionIndex / cols);
      const infCol = infectionIndex % cols;
      const dist = Math.abs(row - infRow) + Math.abs(col - infCol);
      if (dist <= neglectDays - 4) return 1;
      if (dist === neglectDays - 3) return 0.6;
      return 0.3;
    }
    if (hasEarlyWarning && isInfected) return 1;
    if (index === infectionIndex) return 0.8;
    return 0.3;
  };

  const handleSpray = () => {
    setIsSprayed(true);
    setNeglectDays(0);
  };

  const resetSim = () => {
    setIsSprayed(false);
    setNeglectDays(0);
    setViewMode("rgb");
  };

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200 dark:border-purple-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl shadow-lg shadow-purple-200/50">
              <Satellite className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">المسح الجوي بالدرون (NDVI)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">كشف الآفات والأمراض مبكراً بتقنية التصوير الطيفي</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              viewMode === "ndvi"
                ? "bg-purple-50 border-purple-300 text-purple-700"
                : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
          >
            {viewMode === "rgb" ? "👁 رؤية مرئية" : "🛰 رؤية حرارية NDVI"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <div
              ref={containerRef}
              className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-inner bg-gradient-to-b from-slate-900 to-slate-800"
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />

              <svg viewBox="0 0 200 280" className="absolute bottom-0 w-full h-full">
                <defs>
                  <linearGradient id="ndviGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <filter id="ndviGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Drone */}
                <motion.g
                  animate={{ x: [10, 160, 10] }}
                  transition={{
                    duration: Math.max(2, 8 - scanSpeed / 15),
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <rect x="85" y="5" width="30" height="12" rx="4" fill="#475569" />
                  <line x1="88" y1="11" x2="70" y2="2" stroke="#64748b" strokeWidth="2" />
                  <line x1="112" y1="11" x2="130" y2="2" stroke="#64748b" strokeWidth="2" />
                  <motion.ellipse
                    cx="70" cy="0" rx="8" ry="3" fill="#94a3b8" opacity="0.6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "70px 0px" }}
                  />
                  <motion.ellipse
                    cx="130" cy="0" rx="8" ry="3" fill="#94a3b8" opacity="0.6"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "130px 0px" }}
                  />
                  <rect x="95" y="17" width="10" height="6" rx="2" fill="#1e293b" />
                  <circle cx="100" cy="8" r="2" fill={viewMode === "ndvi" ? "#a855f7" : "#22c55e"} filter="url(#ndviGlow)" />
                </motion.g>

                {/* Scan Line */}
                {viewMode === "ndvi" && (
                  <motion.line
                    x1="0"
                    y1={25 + (scanProgress / 100) * 220}
                    x2="200"
                    y2={25 + (scanProgress / 100) * 220}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                )}

                {/* Field Grid */}
                {Array.from({ length: rows }).map((_, row) =>
                  Array.from({ length: cols }).map((_, col) => {
                    const index = row * cols + col;
                    const x = 15 + col * 30;
                    const y = 35 + row * 45;
                    const color = getTreeColor(index);
                    const opacity = getTreeOpacity(index);
                    const isInfectedTree = index === infectionIndex;

                    return (
                      <g key={`tree-${row}-${col}`}>
                        <ellipse cx={x} cy={y + 8} rx="6" ry="3" fill="black" opacity="0.15" />
                        <rect x={x - 2} y={y - 2} width="4" height="8" fill="#78350f" rx="1" />
                        <circle cx={x} cy={y - 8} r="9" fill={color} opacity={opacity} filter={viewMode === "ndvi" ? "url(#ndviGlow)" : undefined} />

                        {viewMode === "ndvi" && isInfectedTree && !isSprayed && (
                          <motion.circle
                            cx={x} cy={y - 8} r="12"
                            fill="none"
                            stroke={hasSpread ? "#dc2626" : hasEarlyWarning ? "#f59e0b" : "#f59e0b"}
                            strokeWidth="2" opacity="0.5"
                            animate={{ r: [12, 16, 12], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                        {hasSpread && isInfectedTree && (
                          <motion.path
                            d={`M${x - 4},${y - 4} Q${x},${y + 4} ${x + 4},${y - 4}`}
                            stroke="#78350f" strokeWidth="1" fill="none" opacity="0.6"
                            animate={{
                              d: [
                                `M${x - 4},${y - 4} Q${x},${y + 4} ${x + 4},${y - 4}`,
                                `M${x - 5},${y - 3} Q${x},${y + 5} ${x + 5},${y - 3}`,
                                `M${x - 4},${y - 4} Q${x},${y + 4} ${x + 4},${y - 4}`,
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </g>
                    );
                  })
                )}

                {viewMode === "ndvi" && (
                  <g transform="translate(10, 260)">
                    <rect x="0" y="0" width="180" height="8" rx="4" fill="url(#ndviGradient)" />
                    <text x="0" y="16" fontSize="6" fill="#dc2626">0.0</text>
                    <text x="85" y="16" fontSize="6" fill="#f59e0b">0.5</text>
                    <text x="175" y="16" fontSize="6" fill="#22c55e">1.0</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-800 flex items-center gap-1.5">
                  <Eye size={14} /> وضع المسح
                </span>
                <span className="text-xs font-bold text-purple-600">
                  {viewMode === "rgb" ? "RGB" : "NDVI"}
                </span>
              </div>
              <button
                onClick={() => setViewMode((v) => (v === "rgb" ? "ndvi" : "rgb"))}
                className={cn(
                  "w-full py-2 rounded-xl font-bold text-sm transition-all active:scale-[0.97]",
                  viewMode === "ndvi"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                )}
              >
                {viewMode === "rgb" ? "🔄 تحويل إلى NDVI" : "🔄 تحويل إلى RGB"}
              </button>
            </div>

            <Slider
              label="سرعة المسح"
              value={scanSpeed}
              min={5}
              max={100}
              unit="%"
              color="purple"
              onChange={(e) => setScanSpeed(Number(e.target.value))}
            />

            <Slider
              label="مدة الإهمال (أيام)"
              value={neglectDays}
              min={0}
              max={10}
              unit="ي"
              color={neglectDays >= 5 ? "rose" : neglectDays >= 2 ? "amber" : "emerald"}
              onChange={(e) => setNeglectDays(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSpray}
                disabled={isSprayed || (!hasEarlyWarning && !hasSpread)}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm shadow-md",
                  isSprayed
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : hasEarlyWarning || hasSpread
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                <SprayCan size={16} />
                {isSprayed ? "✓ تم الرش" : "رش المنطقة المصابة"}
              </button>
              <button
                onClick={resetSim}
                className="py-2.5 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm"
              >
                <RotateCcw size={16} /> إعادة
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <div className="text-[10px] font-bold text-purple-700">NDVI</div>
                <div className="text-xl font-black font-mono text-purple-600">{ndviValue.toFixed(2)}</div>
                <div className="w-full h-1.5 bg-purple-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-purple-600"
                    animate={{ width: `${ndviValue * 100}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div className={cn(
                "rounded-xl p-3 border",
                hasSpread ? "bg-red-50 border-red-200" : hasEarlyWarning ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"
              )}>
                <div className="text-[10px] font-bold text-slate-600">الحالة</div>
                <div className={cn("text-lg font-black", status.color)}>{status.text}</div>
              </div>
            </div>

            <motion.div
              key={`${viewMode}-${ndviValue.toFixed(2)}-${isSprayed}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {hasSpread && !isSprayed ? (
                <Alert type="danger" title="🚨 خطر انتشار المرض!">
                  NDVI {ndviValue.toFixed(2)} — المرض انتشر في {Math.min(neglectDays - 2, totalTrees)} شجرة. المساحات الحمراء تدل على موت الأنسجة. الفقدان المتوقع في المحصول: {Math.round((1 - ndviValue / 0.85) * 100)}%. الرش الفوري ضروري لعزل البقعة ومنع خسارة الحقل بالكامل.
                </Alert>
              ) : hasEarlyWarning && !isSprayed ? (
                <Alert type="warning" title="⚠ إنذار مبكر — بقعة ساخنة">
                  NDVI {ndviValue.toFixed(2)} — تم اكتشاف بقعة صفراء (إجهاد مائي أو بداية إصابة). الكشف المبكر بالدرون أنقذ الموقف. افحص المنطقة ورشها قبل أن تتحول للأحمر — لديك نافذة {5 - neglectDays} أيام للتدخل.
                </Alert>
              ) : isSprayed ? (
                <Alert type="success" title="✓ تمت المعالجة بنجاح">
                  NDVI عاد إلى {ndviValue.toFixed(2)} — المنطقة الخضراء تعافت. الدرون وفر عليك {Math.round((1 - 0.25 / 0.85) * 100)}% من خسارة المحصول. استمر في الرصد الأسبوعي — الوقاية خير من العلاج.
                </Alert>
              ) : (
                <Alert type="info" title="✅ الحقل سليم">
                  NDVI {ndviValue.toFixed(2)} — كل الأشجار خضراء ومتجانسة. كثافة الكلوروفيل ممتازة. استمر في الرصد الدوري. تذكر: الدرون يرى ما لا تراه العين المجردة — NDVI يكشف الإجهاد قبل أن تراه بالعين.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

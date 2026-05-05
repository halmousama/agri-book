import { useState, useEffect, useCallback } from "react";
import {
  Thermometer,
  Snowflake,
  Wind,
  AlertTriangle,
  CheckCircle,
  Apple,
  Play,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const ColdChainSim = () => {
  const [temperature, setTemperature] = useState(5);
  const [ethyleneOn, setEthyleneOn] = useState(false);
  const [days, setDays] = useState(0);
  const [appleQuality, setAppleQuality] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [ethyleneLevel, setEthyleneLevel] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setDays((d) => d + 1);
      setEthyleneLevel((prev) => {
        if (ethyleneOn) return Math.max(0, prev - 2);
        return Math.min(100, prev + 3);
      });
      setAppleQuality((prev) => {
        let decay = 0.5;
        if (temperature > 4) decay += (temperature - 4) * 2;
        if (ethyleneLevel > 60) decay += 3;
        if (temperature > 10) decay += 5;
        return Math.max(0, prev - decay);
      });
    }, 500);
    return () => clearInterval(timer);
  }, [isRunning, temperature, ethyleneOn, ethyleneLevel]);

  const startSim = useCallback(() => setIsRunning(true), []);
  const resetSim = useCallback(() => {
    setIsRunning(false);
    setDays(0);
    setAppleQuality(100);
    setEthyleneLevel(0);
    setTemperature(5);
    setEthyleneOn(false);
  }, []);

  const isGood = appleQuality > 80;
  const isWarning = appleQuality > 50 && appleQuality <= 80;
  const isRotten = appleQuality <= 50;

  const estimatedLife = appleQuality > 0
    ? Math.round(days / ((100 - appleQuality) / 100))
    : days;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-blue-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sky-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <Snowflake className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">غرفة التبريد (Cold Chain)</h3>
              <p className="text-xs text-slate-500">حفظ التفاح في سلسلة التبريد — التحكم بالحرارة والإيثيلين</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 bg-slate-100 border-slate-200 text-slate-600 flex items-center gap-1.5">
              <Apple size={14} /> اليوم {days}
            </motion.div>
            <motion.div
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
                isRotten
                  ? "bg-red-50 border-red-300 text-red-700"
                  : isWarning
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : "bg-emerald-50 border-emerald-300 text-emerald-700"
              )}
              animate={isRotten ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isRotten ? "🍎 تالف!" : isWarning ? "⚠ تحذير" : "🥬 طازج"}
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 shadow-inner">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background:
                    temperature <= 2
                      ? "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)"
                      : temperature <= 6
                        ? "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)"
                        : "linear-gradient(180deg, #fef2f2 0%, #fee2e2 100%)",
                }}
              />

              <svg viewBox="0 0 200 280" className="absolute bottom-0 w-full h-full">
                <defs>
                  <filter id="coldGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Racks */}
                <rect x="15" y="20" width="170" height="10" rx="3" fill="#94a3b8" opacity="0.5" />
                <rect x="15" y="100" width="170" height="10" rx="3" fill="#94a3b8" opacity="0.5" />
                <rect x="15" y="180" width="170" height="10" rx="3" fill="#94a3b8" opacity="0.5" />

                {Array.from({ length: 3 }).map((_, row) =>
                  Array.from({ length: 4 }).map((_, col) => {
                    const idx = row * 4 + col;
                    const rotten = idx / 12 > (100 - appleQuality) / 100;
                    const x = 35 + col * 38;
                    const y = 35 + row * 80;
                    return (
                      <g key={`apple-${row}-${col}`}>
                        <ellipse cx={x} cy={y + 8} rx="10" ry="4" fill="#000" opacity={rotten ? 0.2 : 0.08} />
                        <motion.circle
                          cx={x} cy={y} r="12"
                          fill={rotten ? "#78350f" : "#ef4444"}
                          animate={{ scale: rotten ? 0.85 : 1 }}
                          filter={rotten ? undefined : "url(#coldGlow)"}
                        />
                        {!rotten && (
                          <>
                            <line x1={x - 3} y1={y - 9} x2={x + 3} y2={y - 10} stroke="#16a34a" strokeWidth="1.5" />
                            <circle cx={x} cy={y} r="4" fill="#dc2626" opacity="0.4" />
                          </>
                        )}
                        {rotten && (
                          <text x={x} y={y + 2} textAnchor="middle" fontSize="8" fill="#451a03" fontWeight="bold">✗</text>
                        )}
                      </g>
                    );
                  })
                )}

                <AnimatePresence>
                  {ethyleneLevel > 20 && (
                    <g opacity={ethyleneLevel / 150}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.circle
                          key={`eth-${i}`}
                          cx={40 + i * 30}
                          cy={180 + Math.sin(i) * 10}
                          r="5"
                          fill="#fde047"
                          opacity="0.3"
                          animate={{ y: [0, -12], opacity: [0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </g>
                  )}
                </AnimatePresence>

                <g transform="translate(10, 235)">
                  <rect x="0" y="0" width="180" height="16" rx="8" fill="#e2e8f0" />
                  <motion.rect
                    x="0" y="0" height="16" rx="8"
                    fill={appleQuality > 80 ? "#22c55e" : appleQuality > 50 ? "#f59e0b" : "#ef4444"}
                    animate={{ width: `${appleQuality * 1.8}px` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                  <text x="90" y="28" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">
                    الجودة: {Math.round(appleQuality)}%
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="درجة حرارة الغرفة"
              value={temperature}
              min={-2}
              max={15}
              step={0.5}
              unit="°C"
              color={temperature > 6 ? "rose" : "blue"}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />

            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <Wind size={14} /> ماص غاز الإيثيلين
                </span>
                <button
                  onClick={() => setEthyleneOn(!ethyleneOn)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    ethyleneOn
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-200 text-slate-500"
                  )}
                >
                  {ethyleneOn ? "🟢 شغال" : "⭕ متوقف"}
                </button>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-amber-500"
                  animate={{ width: `${ethyleneLevel}%` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>مستوى الإيثيلين: {Math.round(ethyleneLevel)}%</span>
                <span>{ethyleneLevel > 60 ? "⚠ خطر!" : ethyleneLevel > 30 ? "⚠ مرتفع" : "✓ آمن"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={cn(
                "p-3 rounded-xl border",
                isRotten ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"
              )}>
                <div className="text-[10px] font-bold text-slate-600">جودة التفاح</div>
                <div className={cn("text-xl font-black font-mono", isRotten ? "text-red-600" : "text-emerald-600")}>
                  {Math.round(appleQuality)}%
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", isRotten ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-emerald-500")}
                    animate={{ width: `${appleQuality}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
              <div className="bg-slate-800 text-white p-3 rounded-xl">
                <div className="text-[10px] text-slate-400 font-bold">أيام التخزين</div>
                <div className="text-xl font-black font-mono">{days}</div>
                <div className="text-[9px] text-slate-500 mt-1">العمر التقديري: {estimatedLife} يوم</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={startSim}
                disabled={isRunning}
                className={cn(
                  "py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] shadow-md flex items-center justify-center gap-1.5 text-sm",
                  !isRunning
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                <Play size={16} />
                {isRunning ? "محاكاة جارية..." : "ابدأ المحاكاة"}
              </button>
              <button
                onClick={resetSim}
                className="py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-sm"
              >
                <RotateCcw size={16} />
                إعادة تعيين
              </button>
            </div>

            {isRunning && (
              <motion.div
                key={`cold-${Math.round(appleQuality)}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {isRotten ? (
                  <Alert type="danger" title="🚨 تفاح تالف! خسارة المخزون!">
                    بعد {days} يوم: جودة التفاح {Math.round(appleQuality)}%. درجة الحرارة {temperature}°C والإيثيلين {Math.round(ethyleneLevel)}%. {temperature > 4 ? "الحرارة مرتفعة — التفاح يتنفس أسرع ويتلف." : ""} {ethyleneLevel > 60 ? "الإيثيلين تراكم — يسرع النضج والتلف." : ""} الخسارة المالية تقدر بـ {Math.round((100 - appleQuality) * 10)}$ لكل صندوق.
                  </Alert>
                ) : isWarning ? (
                  <Alert type="warning" title="⚠ تحذير: التفاح بدأ يتلف">
                    بعد {days} يوم: الجودة {Math.round(appleQuality)}%. الحرارة {temperature}°C والإيثيلين {Math.round(ethyleneLevel)}%. {!ethyleneOn && "شغّل ماص الإيثيلين فوراً!"} {temperature > 4 ? "اخفض الحرارة إلى 2°C أو أقل." : ""} لديك {Math.round(estimatedLife - days)} يوم تقريباً قبل التلف الكامل.
                  </Alert>
                ) : (
                  <Alert type="success" title="✅ تخزين ممتاز — تفاح طازج">
                    بعد {days} يوم: الجودة {Math.round(appleQuality)}%. الحرارة {temperature}°C مثالية، الإيثيلين تحت السيطرة ({Math.round(ethyleneLevel)}%). التفاح يحتفظ بنضارته — يمكن التخزين لـ {Math.max(0, estimatedLife - days)} يوماً إضافياً على الأقل.
                  </Alert>
                )}
              </motion.div>
            )}

            {!isRunning && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
                اضبط درجة الحرارة والإيثيلين، ثم اضغط "ابدأ المحاكاة".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import {
  FlaskConical,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Beaker,
  Droplets,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

export const SolutionMixer = () => {
  const [amount, setAmount] = useState(0);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const saturationPoint = 60;
  const isSaturated = amount > saturationPoint;

  const addPowder = () => {
    setAmount((prev) => Math.min(prev + 10, 100));
    const newParticles = Array.from({ length: 5 }).map(() => ({
      id: Math.random(),
      x: 60 + Math.random() * 80,
      y: 20,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        if (!isSaturated) {
          setParticles([]);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [particles, isSaturated]);

  const waterOpacity = 0.2 + (amount / 100) * 0.8;
  const waterLevel = 60 + (amount / 100) * 60;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-teal-200 dark:border-teal-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl shadow-lg shadow-teal-200/50">
              <FlaskConical className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                كأس الذوبان
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ذوبان الأسمدة — التشبع والترسيب
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isSaturated
                ? "bg-red-100 text-red-700 border-red-300"
                : amount === 0
                  ? "bg-slate-100 text-slate-600 border-slate-200"
                  : "bg-emerald-100 text-emerald-700 border-emerald-300"
            )}
            animate={isSaturated ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isSaturated
              ? "🔴 مشبع!"
              : amount === 0
                ? "⚪ فارغ"
                : `🟢 ${amount}%`}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-80 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient
                  id="waterGradSoln"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#2dd4bf"
                    stopOpacity={waterOpacity * 0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor="#0f766e"
                    stopOpacity={waterOpacity}
                  />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glowSoln">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect
                x="0"
                y="0"
                width="200"
                height="250"
                fill="#f8fafc"
                rx="8"
              />

              {/* === Beaker === */}
              <g transform="translate(100, 20)">
                {/* Glass body */}
                <path
                  d="M-70,-10 L-70,190 Q-70,210 0,210 Q70,210 70,190 L70,-10"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3.5"
                />

                {/* Glass highlight */}
                <path
                  d="M-60,-10 L-60,185 Q-60,200 0,200"
                  fill="url(#glassGrad)"
                  stroke="none"
                />

                {/* Water body */}
                <motion.path
                  d={`M-65,${waterLevel} L-65,185 Q-65,205 0,205 Q65,205 65,185 L65,${waterLevel}`}
                  fill="url(#waterGradSoln)"
                  animate={{ d: `M-65,${waterLevel} L-65,185 Q-65,205 0,205 Q65,205 65,185 L65,${waterLevel}` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />

                {/* Water surface */}
                <motion.ellipse
                  cx="0"
                  cy={waterLevel}
                  rx="65"
                  ry="8"
                  fill="#5eead4"
                  fillOpacity={waterOpacity * 0.7}
                  animate={{ cy: waterLevel }}
                  transition={{ type: "spring", stiffness: 40 }}
                />

                {/* Dissolved particles falling */}
                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.circle
                      key={p.id}
                      cx={p.x - 100}
                      cy={p.y}
                      r="3"
                      fill="white"
                      opacity="0.9"
                      initial={{ y: 20, opacity: 1 }}
                      animate={{ y: 180, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeIn" }}
                    />
                  ))}
                </AnimatePresence>

                {/* Precipitate at bottom (when saturated) */}
                <AnimatePresence>
                  {isSaturated && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <path
                        d="M-55,200 Q0,215 55,200 Q0,190 -55,200"
                        fill="#134e4a"
                        opacity="0.8"
                      />
                      <motion.path
                        d="M-45,200 Q0,210 45,200"
                        stroke="#0f766e"
                        strokeWidth="1.5"
                        fill="none"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <text
                        x="0"
                        y="208"
                        textAnchor="middle"
                        fill="white"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        راسب (صلب)
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Measurement lines */}
                <line
                  x1="70"
                  y1="180"
                  x2="80"
                  y2="180"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <text
                  x="83"
                  y="183"
                  fontSize="6"
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  75%
                </text>
                <line
                  x1="70"
                  y1="120"
                  x2="80"
                  y2="120"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <text
                  x="83"
                  y="123"
                  fontSize="6"
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  50%
                </text>
                <line
                  x1="70"
                  y1="60"
                  x2="80"
                  y2="60"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <text
                  x="83"
                  y="63"
                  fontSize="6"
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  25%
                </text>
              </g>

              {/* Bottom info: concentration gauge */}
              <g transform="translate(5, 230)">
                <rect
                  x="0"
                  y="0"
                  width="190"
                  height="14"
                  rx="4"
                  fill="white"
                  opacity="0.85"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="10"
                  fontSize="6"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  التركيز
                </text>
                <rect
                  x="48"
                  y="2"
                  width="95"
                  height="10"
                  rx="3"
                  fill="#e2e8f0"
                />
                {/* Saturation threshold line */}
                <line
                  x1={48 + (saturationPoint / 100) * 95}
                  y1="2"
                  x2={48 + (saturationPoint / 100) * 95}
                  y2="12"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="2 1"
                />
                <motion.rect
                  x="48"
                  y="2"
                  height="10"
                  rx="3"
                  fill={isSaturated ? "#ef4444" : "#14b8a6"}
                  animate={{ width: `${(amount / 100) * 95}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="148"
                  y="10"
                  fontSize="6"
                  fontFamily="monospace"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  {amount}%
                </text>
              </g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            {/* Add powder button */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <label className="block text-sm font-bold text-slate-700 mb-3">
                أضف السماد إلى الماء:
              </label>
              <button
                onClick={addPowder}
                disabled={amount >= 100}
                className={cn(
                  "w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-md",
                  amount >= 100
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 shadow-teal-200"
                )}
              >
                <Beaker size={18} />
                + ملعقة سماد
              </button>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500">التركيز:</span>
                  <span
                    className={cn(
                      isSaturated ? "text-red-600" : "text-teal-600"
                    )}
                  >
                    {amount}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
                  {/* Saturation threshold indicator */}
                  <div
                    className="absolute top-0 h-full border-r-2 border-dashed border-red-500 z-10"
                    style={{
                      left: `${saturationPoint}%`,
                    }}
                  />
                  <motion.div
                    className={cn(
                      "h-full rounded-full transition-colors",
                      isSaturated ? "bg-red-500" : "bg-teal-500"
                    )}
                    animate={{ width: `${amount}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                  <span>0%</span>
                  <span className="text-red-400 font-bold">
                    تشبع {saturationPoint}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setAmount(0);
                setParticles([]);
              }}
              className="w-full py-2 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center justify-center gap-1.5"
            >
              <Trash2 size={14} />
              تفريغ وإعادة تعيين
            </button>

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl border p-2",
                  isSaturated
                    ? "bg-red-50 border-red-200"
                    : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600">
                  الحالة
                </div>
                <div
                  className={cn(
                    "text-sm font-black",
                    isSaturated ? "text-red-600" : "text-teal-600"
                  )}
                >
                  {isSaturated
                    ? "مشبع"
                    : amount === 0
                      ? "فارغ"
                      : "ذائب"}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <div className="text-[9px] font-bold text-slate-600">
                  حد التشبع
                </div>
                <div className="text-sm font-black font-mono text-amber-600">
                  {saturationPoint}%
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`soln-${amount}-${isSaturated}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isSaturated ? (
                <Alert
                  type="danger"
                  title={`🔴 المحلول مشبع! (${amount}% > ${saturationPoint}%)`}
                >
                  السماد الإضافي لا يذوب ويترسب في القاع كصخور صلبة. هذا يسبب
                  حروقاً للجذور وانسداداً لأنابيب الري (النقاطات). أضف مزيداً من
                  الماء لتخفيف المحلول. الحل: لا تتجاوز{" "}
                  {saturationPoint}% تركيز.
                </Alert>
              ) : amount > 0 ? (
                <Alert
                  type="success"
                  title={`✅ ذائب بالكامل (${amount}%)`}
                >
                  السماد ذائب كلياً في الماء وجاهز للامتصاص عند{" "}
                  {amount}% تركيز — أقل من حد التشبع ({saturationPoint}%).
                  الجذور تمتص العناصر الغذائية بسهولة. يمكنك إضافة المزيد حتى
                  تصل إلى {saturationPoint}% بأمان.
                </Alert>
              ) : (
                <Alert type="info" title="ℹ الكأس فارغ">
                  أضف السماد باستخدام الزر أعلاه للبدء. المحلول المثالي يجب أن
                  يكون أقل من حد التشبع ({saturationPoint}%) لضمان ذوبان كامل
                  ومنع الترسيب.
                </Alert>
              )}
            </motion.div>

            {amount > 0 && !isSaturated && (
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-2 text-center text-xs text-teal-700 font-bold">
                💡 السماد يذوب حتى {saturationPoint}% — بعدها يترسب ويسبب
                مشاكل. حافظ على التركيز تحت هذا الحد.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

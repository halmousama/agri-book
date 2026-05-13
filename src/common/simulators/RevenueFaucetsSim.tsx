import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Faucet {
  id: string;
  label: string;
  icon: string;
  flow: number;
  color: string;
  active: boolean;
}

const initialFaucets: Faucet[] = [
  { id: "dates", label: "تمور", icon: "🌴", flow: 40, color: "#f59e0b", active: true },
  { id: "olive", label: "زيت زيتون", icon: "🫒", flow: 25, color: "#84cc16", active: true },
  { id: "carbon", label: "أرصدة كربونية", icon: "🌿", flow: 15, color: "#10b981", active: true },
  { id: "eco", label: "سياحة بيئية", icon: "🏕️", flow: 12, color: "#06b6d4", active: true },
  { id: "compost", label: "سماد عضوي", icon: "🌱", flow: 8, color: "#8b5cf6", active: true },
];

const RevenueFaucetsSim = () => {
  const [faucets, setFaucets] = useState<Faucet[]>(initialFaucets);
  const [tankLevel, setTankLevel] = useState(50);
  const [crashActive, setCrashActive] = useState(false);
  const [animating, setAnimating] = useState(false);

  const totalFlow = faucets.filter(f => f.active).reduce((sum, f) => sum + f.flow, 0);

  const toggleFaucet = useCallback((id: string) => {
    if (crashActive) return;
    setFaucets((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  }, [crashActive]);

  const simulateCrash = useCallback(() => {
    setCrashActive(true);
    setFaucets((prev) =>
      prev.map((f) => (f.id === "dates" ? { ...f, active: false } : f))
    );
  }, []);

  const reset = useCallback(() => {
    setCrashActive(false);
    setFaucets(initialFaucets);
    setTankLevel(50);
  }, []);

  // Animate tank level based on active faucets
  useEffect(() => {
    const targetLevel = Math.min(20 + totalFlow * 1.3, 100);
    setAnimating(true);
    const timer = setTimeout(() => {
      setTankLevel(targetLevel);
      setAnimating(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [totalFlow]);

  // Visual indicator
  const tankHeight = tankLevel;
  const tankColor =
    tankLevel > 80
      ? "from-emerald-500 to-emerald-600"
      : tankLevel > 50
      ? "from-amber-400 to-amber-500"
      : tankLevel > 30
      ? "from-orange-400 to-orange-500"
      : "from-red-400 to-red-500";

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-amber-500/10 bg-gradient-to-r from-amber-900/30 to-green-900/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-bold text-amber-400/80 tracking-wider uppercase">
            Revenue Faucets Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          💰 حنفيات المال — التنوع المالي هو الأمان
        </h3>
      </div>

      {/* Main content */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Faucets */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">
              🚰 مصادر الدخل
            </h4>
            {faucets.map((faucet, index) => (
              <motion.div
                key={faucet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                  faucet.active
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-slate-600/50"
                    : "bg-slate-800/30 border-slate-700/20 opacity-50"
                }`}
                onClick={() => toggleFaucet(faucet.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{faucet.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white">{faucet.label}</div>
                      <div className="text-[10px] text-slate-500">
                        {faucet.active ? `${faucet.flow}% من الإيرادات` : "متوقف"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-6 rounded-full border border-slate-600 relative overflow-hidden`}
                    >
                      <motion.div
                        className={`absolute bottom-0 w-full ${
                          faucet.active ? "bg-gradient-to-t" : ""
                        }`}
                        style={{
                          background: faucet.active
                            ? `linear-gradient(to top, ${faucet.color}, transparent)`
                            : "none",
                        }}
                        animate={{
                          height: faucet.active ? "100%" : "0%",
                          opacity: faucet.active ? 1 : 0.2,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    {/* Toggle button */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                        faucet.active
                          ? "bg-emerald-600/20 text-emerald-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {faucet.active ? "✓" : "✗"}
                    </div>
                  </div>
                </div>

                {/* Flow animation */}
                {faucet.active && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-2 rounded-full"
                        style={{ backgroundColor: faucet.color }}
                        animate={{
                          y: [0, 6, 0],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.15,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Tank */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">
              🛢️ خزان الإيرادات الإجمالي
            </h4>

            {/* Tank SVG */}
            <div className="relative w-48 h-64">
              {/* Tank body */}
              <svg viewBox="0 0 200 280" className="w-full h-full">
                {/* Tank outline */}
                <rect
                  x="30" y="20" width="140" height="240"
                  rx="10"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3"
                />
                
                {/* Tank gradient background */}
                <rect
                  x="33" y="23" width="134" height="234"
                  rx="8"
                  fill="#1e293b"
                />

                {/* Liquid */}
                <motion.rect
                  x="33"
                  y={257 - tankHeight * 2.34}
                  width="134"
                  height={tankHeight * 2.34}
                  rx="8"
                  fill={`url(#liquidGrad)`}
                  animate={{
                    y: 257 - tankHeight * 2.34,
                    height: tankHeight * 2.34,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Liquid gradient */}
                <defs>
                  <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Water surface wave */}
                <motion.path
                  d={`M33,${257 - tankHeight * 2.34} Q${83},${265 - tankHeight * 2.34} 133,${257 - tankHeight * 2.34} T233,${257 - tankHeight * 2.34}`}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  opacity="0.5"
                  animate={{
                    d: [
                      `M33,${257 - tankHeight * 2.34} Q${83},${262 - tankHeight * 2.34} 133,${257 - tankHeight * 2.34} T233,${257 - tankHeight * 2.34}`,
                      `M33,${257 - tankHeight * 2.34} Q${83},${252 - tankHeight * 2.34} 133,${257 - tankHeight * 2.34} T233,${257 - tankHeight * 2.34}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Volume label */}
                <text
                  x="100"
                  y="140"
                  textAnchor="middle"
                  fill="white"
                  fontSize="24"
                  fontWeight="bold"
                  fontFamily="system-ui"
                >
                  {totalFlow}%
                </text>
                <text
                  x="100"
                  y="160"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="system-ui"
                >
                  من الإيرادات
                </text>

                {/* Tap marks */}
                {[20, 40, 60, 80].map((pct) => (
                  <g key={pct}>
                    <line
                      x1="15"
                      y1={257 - pct * 2.34}
                      x2="25"
                      y2={257 - pct * 2.34}
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    <text
                      x="12"
                      y={261 - pct * 2.34}
                      textAnchor="end"
                      fill="#475569"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      {pct}%
                    </text>
                  </g>
                ))}

                {/* Drip animations from active faucets */}
                {faucets.filter(f => f.active).map((faucet) => (
                  <motion.circle
                    key={`drip-${faucet.id}`}
                    cx={40 + faucets.indexOf(faucet) * 25}
                    cy={20}
                    r="3"
                    fill={faucet.color}
                    animate={{
                      y: [0, 240],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </svg>

              {/* Income pipes */}
              <div className="absolute -top-3 left-0 right-0 flex justify-around">
                {faucets.map((f, i) => (
                  <motion.div
                    key={f.id}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      f.active ? "opacity-100" : "opacity-30"
                    }`}
                    style={{ backgroundColor: f.active ? f.color : "#334155" }}
                    animate={{
                      scale: f.active ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: f.active ? Infinity : 0,
                    }}
                  >
                    {f.icon}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mt-4 text-center">
              <div className="text-2xl font-extrabold" style={{ color: tankLevel > 30 ? "#fbbf24" : "#ef4444" }}>
                {totalFlow}%
              </div>
              <div className="text-[10px] text-slate-500">
                {crashActive
                  ? "⚠️ انهيار السوق محاكى — المزرعة لا تزال صامدة!"
                  : "مستوى الإيرادات الإجمالي"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-4 border-t border-amber-500/10 bg-slate-900/50">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={simulateCrash}
            disabled={crashActive}
            className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              crashActive
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            📉 محاكاة انهيار سوق التمور
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            🔄 إعادة تعيين
          </button>
          <div className="text-[10px] text-slate-500 mr-auto">
            💡 اضغط على أي مصدر دخل لإيقافه/تشغيله
          </div>
        </div>
      </div>

      {/* Diagnosis Panel */}
      <div className="px-5 py-4 border-t border-amber-500/10 bg-slate-900/80">
        <h4 className="text-xs font-bold text-amber-400/80 mb-3 tracking-wider uppercase">
          📊 تحليل المرونة المالية
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className={`p-3 rounded-xl border ${
            faucets.filter(f => f.active).length >= 3
              ? "bg-emerald-900/30 border-emerald-500/30"
              : "bg-red-900/30 border-red-500/30"
          }`}>
            <div className="text-[10px] text-slate-500 mb-1">مصادر الدخل النشطة</div>
            <div className="text-lg font-extrabold" style={{
              color: faucets.filter(f => f.active).length >= 3 ? "#34d399" : "#ef4444"
            }}>
              {faucets.filter(f => f.active).length} / 5
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">الإيرادات الإجمالية</div>
            <div className="text-lg font-extrabold text-amber-400">{totalFlow}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">أعلى مصدر دخل</div>
            <div className="text-lg font-extrabold text-amber-400">
              {faucets.filter(f => f.active).length > 0
                ? [...faucets].filter(f => f.active).sort((a, b) => b.flow - a.flow)[0]?.icon
                : "—"}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">حالة المزرعة</div>
            <div className={`text-sm font-bold ${
              totalFlow >= 50 ? "text-emerald-400" : totalFlow >= 30 ? "text-amber-400" : "text-red-400"
            }`}>
              {totalFlow >= 50 ? "🟢 آمنة" : totalFlow >= 30 ? "🟡 هشة" : "🔴 خطر"}
            </div>
          </div>
        </div>
        {crashActive && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-xs text-emerald-300">
            🌿 المزرعة صامدة! رغم انهيار سوق التمور (أكبر مصدر دخل)، فإن بقية المصادر تبقي المزرعة واقفة. هذا هو التنوع المالي.
          </div>
        )}
        {totalFlow < 30 && !crashActive && (
          <div className="mt-3 p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-xs text-red-300">
            ⚠️ المزرعة في خطر! قم بتشغيل المزيد من مصادر الدخل لضمان الاستقرار المالي.
          </div>
        )}
      </div>
    </div>
  );
};

export { RevenueFaucetsSim };
export default RevenueFaucetsSim;

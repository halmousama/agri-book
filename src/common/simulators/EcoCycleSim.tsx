import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EcoNode {
  id: number;
  icon: string;
  label: string;
  description: string;
}

const STEP_DATA: EcoNode[] = [
  { id: 1, icon: "☀️", label: "الشمس تشرق", description: "الشمس تشرق على الألواح الشمسية فتبدأ رحلة الطاقة في المزرعة" },
  { id: 2, icon: "⚡", label: "ألواح شمسية", description: "الألواح الشمسية تحول ضوء الشمس إلى كهرباء تغذي كل شيء" },
  { id: 3, icon: "💧", label: "مضخة ماء", description: "الكهرباء تشغل مضخة الماء الجوفي ومحطة التحلية" },
  { id: 4, icon: "🐟", label: "أحواض أسماك", description: "الماء يذهب إلى أحواض الأسماك حيث تعيش أسماك البلطي" },
  { id: 5, icon: "🐠", label: "فضلات أسماك", description: "الأسماك تنتج فضلات غنية بالأمونيا (سماد طبيعي)" },
  { id: 6, icon: "🧫", label: "بكتيريا نافعة", description: "البكتيريا النافعة تحول الأمونيا إلى نترات — سماد سائل للنباتات" },
  { id: 7, icon: "🌴", label: "ري النخيل", description: "الماء المحمل بالسماد يروي النخيل والخضروات" },
  { id: 8, icon: "🌿", label: "النباتات تنقي", description: "النباتات تمتص السماد وتنقي الماء بشكل طبيعي" },
  { id: 9, icon: "💧", label: "ماء نظيف يعود", description: "الماء النظيف يعود إلى أحواض الأسماك في دورة مغلقة" },
  { id: 10, icon: "🍂", label: "أوراق متساقطة", description: "أوراق النخيل المتساقطة تُجمع وتُحرق بلا أكسجين" },
  { id: 11, icon: "🔥", label: "بيوتشار", description: "البيوچار (الفحم الحيوي) يُخلط بالتربة لتحسين خصوبتها" },
  { id: 12, icon: "🌱", label: "تربة محسنة", description: "التربة المحسنة تنتج محاصيل أكثر وأفضل" },
  { id: 13, icon: "🥬", label: "خضروات", description: "الخضروات غير القابلة للتسويق تذهب ليرقات الجندي الأسود" },
  { id: 14, icon: "🐛", label: "يرقات ← غذاء", description: "اليرقات تصبح علفًا بروتينيًا للأسماك والدواجن — وتستمر الدورة" },
];

const NODE_RADIUS = 130;
const CENTER_X = 220;
const CENTER_Y = 220;
const INNER_R = 24;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const EcoCycleSim = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSteps = STEP_DATA.length;

  const startCycle = useCallback(() => {
    setIsPlaying(true);
    setActiveStep(1);
    setProgressPercent(0);

    let step = 1;
    intervalRef.current = setInterval(() => {
      step += 1;
      if (step > totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
        setActiveStep(null);
        setProgressPercent(100);
        return;
      }
      setActiveStep(step);
      setProgressPercent(Math.round((step / totalSteps) * 100));
    }, 2000);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    setActiveStep(null);
    setProgressPercent(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const activeDesc = activeStep
    ? STEP_DATA[activeStep - 1].description
    : "";

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-amber-500/10 bg-gradient-to-r from-amber-900/30 to-orange-900/30">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-xs font-bold text-amber-400/80 tracking-wider uppercase">
            EcoCycle Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          🌿 دورة المزرعة الحية — 14 خطوة في حلقة لا تنتهي
        </h3>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[480px] bg-gradient-to-b from-slate-900 to-slate-950">
        <svg viewBox="0 0 440 440" className="w-full h-full">
          <defs>
            <filter id="ecoGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ecoGlowStrong">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background grid */}
          <pattern id="ecoGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width="440" height="440" fill="url(#ecoGrid)" />

          {/* Center glow */}
          <circle cx={CENTER_X} cy={CENTER_Y} r="160" fill="url(#centerGlow)" />

          {/* Connection ring */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={NODE_RADIUS + 6}
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Connecting lines between adjacent nodes */}
          {STEP_DATA.map((node, i) => {
            const angleA = (i / totalSteps) * 360;
            const angleB = ((i + 1) / totalSteps) * 360;
            const from = polarToCartesian(CENTER_X, CENTER_Y, NODE_RADIUS, angleA);
            const to = polarToCartesian(CENTER_X, CENTER_Y, NODE_RADIUS, angleB);
            const isActive =
              activeStep !== null &&
              (node.id === activeStep ||
                (activeStep === totalSteps && i === totalSteps - 1) ||
                (activeStep === 1 && i === 0));
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#334155"
                  strokeWidth="2"
                />
                {isPlaying && (
                  <motion.line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isActive ? "#f59e0b" : "#475569"}
                    strokeWidth={isActive ? 3 : 1.5}
                    initial={false}
                    animate={{
                      stroke: isActive ? "#fbbf24" : "#475569",
                      strokeWidth: isActive ? 3 : 1.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </g>
            );
          })}

          {/* Flow particles along active edge */}
          {isPlaying && activeStep !== null && activeStep < totalSteps && (
            <>
              {Array.from({ length: 5 }).map((_, pi) => {
                const angleA = ((activeStep - 1) / totalSteps) * 360;
                const angleB = (activeStep / totalSteps) * 360;
                const from = polarToCartesian(CENTER_X, CENTER_Y, NODE_RADIUS, angleA);
                const to = polarToCartesian(CENTER_X, CENTER_Y, NODE_RADIUS, angleB);
                const t = ((pi / 5) + (performance.now() / 1000) * 0.3) % 1;
                const x = from.x + (to.x - from.x) * t;
                const y = from.y + (to.y - from.y) * t;
                return (
                  <circle
                    key={`particle-${pi}`}
                    cx={x}
                    cy={y}
                    r={2 + Math.random() * 1.5}
                    fill="#fbbf24"
                    opacity={0.7}
                  />
                );
              })}
            </>
          )}

          {/* Nodes */}
          {STEP_DATA.map((node, i) => {
            const angle = (i / totalSteps) * 360;
            const pos = polarToCartesian(CENTER_X, CENTER_Y, NODE_RADIUS, angle);
            const isActiveNode = activeStep === node.id;

            return (
              <g key={node.id}>
                {/* Glow ring for active */}
                {isActiveNode && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={INNER_R + 8}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    opacity="0.6"
                    animate={{ r: [INNER_R + 6, INNER_R + 12, INNER_R + 6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                {/* Node circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={INNER_R}
                  fill={isActiveNode ? "#1e293b" : "#0f172a"}
                  stroke={isActiveNode ? "#f59e0b" : "#334155"}
                  strokeWidth={isActiveNode ? 3 : 1.5}
                />
                {/* Icon */}
                <text
                  x={pos.x}
                  y={pos.y - 1}
                  textAnchor="middle"
                  fontSize="13"
                >
                  {node.icon}
                </text>
                {/* Step number */}
                <text
                  x={pos.x}
                  y={pos.y + INNER_R + 12}
                  textAnchor="middle"
                  fill={isActiveNode ? "#fbbf24" : "#64748b"}
                  fontSize="7"
                  fontFamily="monospace"
                >
                  {String(node.id).padStart(2, '0')}
                </text>
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + INNER_R + 24}
                  textAnchor="middle"
                  fill={isActiveNode ? "#fde68a" : "#94a3b8"}
                  fontSize="7"
                  fontFamily="system-ui"
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* Center icon */}
          <circle cx={CENTER_X} cy={CENTER_Y} r="36" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" opacity="0.9" />
          <text x={CENTER_X} y={CENTER_Y - 6} textAnchor="middle" fontSize="14" fill="#fbbf24">🌿</text>
          <text x={CENTER_X} y={CENTER_Y + 12} textAnchor="middle" fontSize="6" fill="#f59e0b" fontFamily="monospace">
            دورة كاملة
          </text>
        </svg>
      </div>

      {/* Progress bar */}
      <div className="px-5 pt-3 bg-slate-900/50">
        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
          <span>التقدم في الدورة</span>
          <span>الخطوة {activeStep ?? '-'} من {totalSteps}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-4 border-t border-amber-500/10 bg-slate-900/50">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={startCycle}
            disabled={isPlaying}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              isPlaying
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-900/30"
            }`}
          >
            {isPlaying ? "🌀 جاري التشغيل..." : "▶️ تشغيل الدورة"}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            🔄 إعادة
          </button>
          <div className="text-xs text-slate-500 mr-auto">
            {isPlaying
              ? `⏳ جاري... الخطوة ${activeStep}`
              : progressPercent >= 100
                ? "✅ اكتملت الدورة!"
                : "اضغط تشغيل لبدء الدورة"}
          </div>
        </div>
      </div>

      {/* Diagnosis Panel */}
      <div className="px-5 py-4 border-t border-amber-500/10 bg-slate-900/80">
        <h4 className="text-xs font-bold text-amber-400/80 mb-3 tracking-wider uppercase">
          📋 حالة الدورة
        </h4>
        <AnimatePresence mode="wait">
          {activeStep !== null ? (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-xl bg-amber-900/20 border border-amber-500/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{STEP_DATA[activeStep - 1].icon}</span>
                <div>
                  <div className="text-sm font-bold text-amber-300">
                    الخطوة {activeStep}: {STEP_DATA[activeStep - 1].label}
                  </div>
                  <div className="text-[10px] text-amber-400/60 font-mono">
                    {activeStep}/{totalSteps}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {STEP_DATA[activeStep - 1].description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400"
            >
              {progressPercent >= 100
                ? "✅ اكتملت الدورة! كل خطوة تخدم الخطوة التي بعدها، وكل شيء يعود إلى نقطة البداية."
                : "▶️ اضغط 'تشغيل الدورة' لرؤية الخطوات الـ 14 في دورة المزرعة الحية المغلقة."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion message */}
        {progressPercent >= 100 && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-xs text-emerald-300"
          >
            🌟 وهكذا، في دورة لا تنتهي. كل خطوة تخدم الخطوة التي بعدها، وكل شيء يعود إلى نقطة البداية. لا نفايات — كل شيء مورد!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export { EcoCycleSim };
export default EcoCycleSim;

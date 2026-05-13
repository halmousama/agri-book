import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeData {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  color: string;
}

const nodes: NodeData[] = [
  { id: "waste", label: "مخلفات\nالمطبخ", icon: "🗑️", x: 50, y: 50, color: "#f59e0b" },
  { id: "bsf", label: "يرقات\nالجندي الأسود", icon: "🐛", x: 50, y: 200, color: "#84cc16" },
  { id: "chickens", label: "الدجاج", icon: "🐔", x: 200, y: 280, color: "#06b6d4" },
  { id: "compost", label: "السماد\nالعضوي", icon: "🌱", x: 350, y: 200, color: "#10b981" },
  { id: "trees", label: "الأشجار\nوالنخيل", icon: "🌴", x: 350, y: 50, color: "#22c55e" },
];

// Edges: waste -> bsf -> chickens -> compost -> trees -> waste
const edges = [
  { from: "waste", to: "bsf" },
  { from: "bsf", to: "chickens" },
  { from: "chickens", to: "compost" },
  { from: "compost", to: "trees" },
  { from: "trees", to: "waste" },
];

const particles: { x: number; y: number }[] = [];
for (let i = 0; i < 40; i++) {
  particles.push({ x: 0, y: 0 });
}

const CircularSymphonySim = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeEdge, setActiveEdge] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalDuration = 8000; // 8 seconds per full cycle
  const edgeCount = edges.length;
  const edgeDuration = totalDuration / edgeCount;

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    startTimeRef.current = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const p = (elapsed % totalDuration) / totalDuration;
      setProgress(p);
      
      const currentEdge = Math.floor((elapsed % totalDuration) / edgeDuration);
      setActiveEdge(currentEdge);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setActiveEdge(null);
  }, []);

  const getEdgePath = (from: NodeData, to: NodeData) => {
    const cx = (from.x + to.x) / 2;
    const cy = (from.y + to.y) / 2 - 30;
    return `M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`;
  };

  const getParticlePosition = () => {
    if (activeEdge === null) return { x: nodes[0].x, y: nodes[0].y };
    
    const edge = edges[activeEdge];
    const from = nodes.find((n) => n.id === edge.from)!;
    const to = nodes.find((n) => n.id === edge.to)!;
    
    const localProgress = ((progress * totalDuration) % edgeDuration) / edgeDuration;
    const t = localProgress;
    
    const cx = (from.x + to.x) / 2;
    const cy = (from.y + to.y) / 2 - 30;
    
    const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cx + t * t * to.x;
    const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cy + t * t * to.y;
    
    return { x, y };
  };

  const particlePos = getParticlePosition();

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-emerald-500/20 overflow-hidden shadow-2xl shadow-emerald-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-emerald-500/10 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-xs font-bold text-emerald-400/80 tracking-wider uppercase">
            Circular Symphony Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          🔄 سيمفونية الحلقات المغلقة — تدفق الطاقة والمواد
        </h3>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[380px] bg-gradient-to-b from-slate-900 to-slate-950">
        <svg viewBox="0 0 400 340" className="w-full h-full">
          {/* Background grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width="400" height="340" fill="url(#grid)" />

          {/* Connector lines */}
          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from)!;
            const to = nodes.find((n) => n.id === edge.to)!;
            const isActive = activeEdge === i;
            
            return (
              <g key={edge.from + edge.to}>
                {/* Background path */}
                <path
                  d={getEdgePath(from, to)}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3"
                />
                {/* Active path */}
                <motion.path
                  d={getEdgePath(from, to)}
                  fill="none"
                  stroke={isActive ? "#10b981" : "#475569"}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeDasharray={isActive ? "8 4" : "none"}
                  initial={false}
                  animate={{
                    stroke: isActive ? "#10b981" : "#475569",
                    strokeWidth: isActive ? 3 : 1.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Arrow */}
                {isActive && (
                  <polygon
                    points={`${to.x},${to.y - 5} ${to.x - 5},${to.y + 5} ${to.x + 5},${to.y + 5}`}
                    fill="#10b981"
                    opacity={0.8}
                  />
                )}
                {/* Flow label */}
                {isActive && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 40}
                    textAnchor="middle"
                    fill="#34d399"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {progress > 0.5 ? '⬅️' : '➡️'} يتدفق...
                  </text>
                )}
              </g>
            );
          })}

          {/* Energy particles */}
          {isPlaying && Array.from({ length: 30 }).map((_, i) => {
            const edgeIdx = i % edgeCount;
            const edge = edges[edgeIdx];
            const from = nodes.find((n) => n.id === edge.from)!;
            const to = nodes.find((n) => n.id === edge.to)!;
            const t = ((i / 30) * 8 + progress) % 1;
            const cx = (from.x + to.x) / 2;
            const cy = (from.y + to.y) / 2 - 30;
            const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cx + t * t * to.x;
            const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cy + t * t * to.y;

            return (
              <circle
                key={`particle-${i}`}
                cx={x}
                cy={y}
                r={2 + Math.random() * 2}
                fill={["#34d399", "#fbbf24", "#06b6d4", "#a855f7"][i % 4]}
                opacity={0.8}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              {/* Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r="28"
                fill={node.color}
                opacity="0.1"
              />
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                fill="#1e293b"
                stroke={node.color}
                strokeWidth="2"
              />
              {/* Icon */}
              <text
                x={node.x}
                y={node.y - 2}
                textAnchor="middle"
                fontSize="16"
              >
                {node.icon}
              </text>
              {/* Label */}
              {node.label.split('\n').map((line, i) => (
                <text
                  key={i}
                  x={node.x}
                  y={node.y + 35 + i * 14}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="8"
                  fontFamily="system-ui"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* Floating particle (along active edge) */}
          {isPlaying && (
            <circle
              cx={particlePos.x}
              cy={particlePos.y}
              r="5"
              fill="#fbbf24"
              opacity="0.9"
              filter="url(#glow)"
            />
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="px-5 py-4 border-t border-emerald-500/10 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              isPlaying
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {isPlaying ? "⏹️ إيقاف" : "▶️ تشغيل الدورة"}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            🔄 إعادة
          </button>
          <div className="text-xs text-slate-500 mr-auto">
            {isPlaying ? `الدورة: ${(progress * 100).toFixed(0)}%` : "متوقف"}
          </div>
        </div>
      </div>

      {/* Diagnosis Panel */}
      <div className="px-5 py-4 border-t border-emerald-500/10 bg-slate-900/80">
        <h4 className="text-xs font-bold text-emerald-400/80 mb-3 tracking-wider uppercase">
          🔄 حالة الحلقات المغلقة
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-3 rounded-xl border transition-all ${
            activeEdge === 0 || activeEdge === 1
              ? "bg-amber-900/30 border-amber-500/30"
              : "bg-slate-800/60 border-slate-700/50"
          }`}>
            <div className="text-[10px] text-slate-500 mb-1">البروتين من المخلفات</div>
            <div className="text-xs text-slate-300">🗑️ مخلفات → 🐛 يرقات → 🐔 دجاج</div>
            <div className={`text-[10px] mt-1 ${activeEdge === 0 || activeEdge === 1 ? 'text-amber-400' : 'text-slate-600'}`}>
              {activeEdge === 0 || activeEdge === 1 ? '🟢 نشط' : '⚪ غير نشط'}
            </div>
          </div>
          <div className={`p-3 rounded-xl border transition-all ${
            activeEdge === 2 || activeEdge === 3
              ? "bg-emerald-900/30 border-emerald-500/30"
              : "bg-slate-800/60 border-slate-700/50"
          }`}>
            <div className="text-[10px] text-slate-500 mb-1">السماد والتخصيب</div>
            <div className="text-xs text-slate-300">🐔 دجاج → 🌱 سماد → 🌴 أشجار</div>
            <div className={`text-[10px] mt-1 ${activeEdge === 2 || activeEdge === 3 ? 'text-emerald-400' : 'text-slate-600'}`}>
              {activeEdge === 2 || activeEdge === 3 ? '🟢 نشط' : '⚪ غير نشط'}
            </div>
          </div>
          <div className={`p-3 rounded-xl border transition-all ${
            activeEdge === 4
              ? "bg-cyan-900/30 border-cyan-500/30"
              : "bg-slate-800/60 border-slate-700/50"
          }`}>
            <div className="text-[10px] text-slate-500 mb-1">العودة إلى البداية</div>
            <div className="text-xs text-slate-300">🌴 أشجار → 🗑️ مخلفات (أوراق)</div>
            <div className={`text-[10px] mt-1 ${activeEdge === 4 ? 'text-cyan-400' : 'text-slate-600'}`}>
              {activeEdge === 4 ? '🟢 نشط' : '⚪ غير نشط'}
            </div>
          </div>
        </div>

        {!isPlaying && (
          <div className="mt-3 p-3 rounded-xl bg-amber-900/30 border border-amber-500/30 text-xs text-amber-300">
            ▶️ اضغط "تشغيل الدورة" لرؤية تدفق الطاقة والمواد عبر الحلقات المغلقة للمزرعة.
          </div>
        )}
        {isPlaying && progress > 0.9 && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-xs text-emerald-300">
            ✅ اكتملت الدورة! لا نفايات — كل شيء يتحول إلى مورد للحلقة التالية.
          </div>
        )}
      </div>
    </div>
  );
};

export { CircularSymphonySim };
export default CircularSymphonySim;

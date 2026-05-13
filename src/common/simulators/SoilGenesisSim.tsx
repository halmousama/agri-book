import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const SoilGenesisSim = () => {
  const [year, setYear] = useState(1);

  const sandParticles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 50 + Math.random() * 45,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.5,
  }));

  const biocharParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 45 + Math.random() * 45,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 0.5,
  }));

  const fungiParticles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 40 + Math.random() * 50,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.5,
  }));

  const wormParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 30 + Math.random() * 60,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 0.5,
  }));

  const waterRetention = Math.min(10 + (year - 1) * 17.5, 80);
  const organicMatter = Math.min(0 + year * 1.0, 5);
  const biocharActive = year >= 1;
  const fungiActive = year >= 1;
  const pioneerPlantsActive = year >= 2;
  const wormsActive = year >= 3;
  const coverCropActive = year >= 3;

  const soilColor = `hsl(${35 - year * 3}, ${30 + year * 5}%, ${70 - year * 7}%)`;
  const surfacePlants = year >= 2;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value));
  }, []);

  const handleButton = useCallback((y: number) => {
    setYear(y);
  }, []);

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-amber-500/10 bg-gradient-to-r from-amber-900/30 to-emerald-900/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-400/80 tracking-wider uppercase">
            Soil Genesis Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          🧬 رحلة تحويل الرمال إلى تربة — سنة {year} من 5
        </h3>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[320px] bg-gradient-to-b from-amber-900/40 via-slate-900 to-slate-950">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#2d2d44" />
            </linearGradient>
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={soilColor} />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            <radialGradient id="sunGrad">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="400" height="140" fill="url(#skyGrad)" />

          {/* Sun */}
          <circle cx="340" cy="30" r="18" fill="#fbbf24" opacity="0.6" />
          <circle cx="340" cy="30" r="50" fill="url(#sunGrad)" />

          {/* Ground */}
          <motion.rect
            x="0" y="130" width="400" height="170"
            fill="url(#groundGrad)" animate={{ 
              transition: { duration: 0.8 }
            }}
          />

          {/* Soil surface line */}
          <motion.path
            d={`M0,130 Q${50 + year * 5},${125 + Math.sin(year) * 3} 100,130 T200,130 T300,130 T400,130`}
            fill="none"
            stroke="#78716c"
            strokeWidth="1.5"
            animate={{ d: `M0,130 Q${50 + year * 5},${125 + Math.sin(year) * 3} 100,130 T200,130 T300,130 T400,130` }}
          />

          {/* Sand particles (always visible, diminish with time) */}
          {sandParticles.map((p) => (
            <motion.circle
              key={`sand-${p.id}`}
              cx={p.x * 4}
              cy={p.y * 2.2 + 10}
              r={p.size * (1 - year * 0.12)}
              fill="#d4a373"
              opacity={Math.max(0, 0.6 - year * 0.1)}
              animate={{ opacity: Math.max(0, 0.6 - year * 0.1) }}
              transition={{ duration: 0.8 }}
            />
          ))}

          {/* Biochar (Year 1+) */}
          {biocharActive && biocharParticles.map((p) => (
            <motion.circle
              key={`biochar-${p.id}`}
              cx={p.x * 4}
              cy={p.y * 2.2 + 10}
              r={p.size}
              fill="#1a1a1a"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: Math.min(0.8, year * 0.3),
                scale: 1,
              }}
              transition={{ duration: 0.5, delay: p.delay }}
            />
          ))}

          {/* Fungi network (Year 1+) */}
          {fungiActive && (
            <>
              {/* Hyphae threads */}
              {Array.from({ length: 8 + year * 3 }, (_, i) => (
                <motion.path
                  key={`fungi-${i}`}
                  d={`M${30 + Math.random() * 340},${150 + Math.random() * 120} Q${Math.random() * 400},${Math.random() * 300} ${Math.random() * 400},${Math.random() * 300}`}
                  stroke="#a3e635"
                  strokeWidth={0.5 + Math.random() * 1}
                  fill="none"
                  opacity={Math.min(0.6, year * 0.2)}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: Math.random() * 0.5 }}
                />
              ))}
              {/* Fungi nodes */}
              {fungiParticles.slice(0, 8 + year * 3).map((p) => (
                <motion.circle
                  key={`fungi-node-${p.id}`}
                  cx={p.x * 4}
                  cy={p.y * 2.2 + 10}
                  r={p.size * 0.8}
                  fill="#a3e635"
                  opacity={Math.min(0.7, year * 0.2)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: Math.min(0.7, year * 0.2) }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </>
          )}

          {/* Pioneer plants (Year 2+) */}
          {pioneerPlantsActive && (
            <>
              {Array.from({ length: 3 + year }, (_, i) => (
                <motion.g
                  key={`plant-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  {/* Stem */}
                  <line
                    x1={60 + i * 80}
                    y1={130}
                    x2={60 + i * 80}
                    y2={100 - Math.random() * 20}
                    stroke="#4ade80"
                    strokeWidth="1.5"
                  />
                  {/* Leaves */}
                  <ellipse
                    cx={55 + i * 80}
                    cy={105 - Math.random() * 15}
                    rx="5"
                    ry="3"
                    fill="#4ade80"
                    transform={`rotate(-30, ${55 + i * 80}, ${105 - Math.random() * 15})`}
                  />
                  <ellipse
                    cx={65 + i * 80}
                    cy={110 - Math.random() * 15}
                    rx="5"
                    ry="3"
                    fill="#22c55e"
                    transform={`rotate(30, ${65 + i * 80}, ${110 - Math.random() * 15})`}
                  />
                </motion.g>
              ))}
            </>
          )}

          {/* Worms (Year 3+) */}
          {wormsActive && wormParticles.slice(0, 5 + (year - 3) * 5).map((w) => (
            <motion.path
              key={`worm-${w.id}`}
              d={`M${w.x * 4},${w.y * 2.2 + 10} Q${w.x * 4 + 5},${w.y * 2.2 + 5} ${w.x * 4 + 10},${w.y * 2.2 + 10}`}
              stroke="#e11d48"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: w.delay }}
            />
          ))}

          {/* Cover crop (Year 3+) */}
          {coverCropActive && (
            <motion.rect
              x="10" y="118" width="380" height="15"
              fill="#166534"
              opacity={0.3 + (year - 3) * 0.1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 + (year - 3) * 0.1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Year label */}
          <text x="200" y="280" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="monospace">
            سنة {year} من 5
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="px-5 py-4 border-t border-amber-500/10 bg-slate-900/50">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => handleButton(1)}
            className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
              year === 1 ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            سنة 1
          </button>
          {[2, 3, 4, 5].map((y) => (
            <button
              key={y}
              onClick={() => handleButton(y)}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all ${
                year === y ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              سنة {y}
            </button>
          ))}
        </div>
        <input
          type="range"
          min={1}
          max={5}
          value={year}
          onChange={handleChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-800 accent-amber-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-amber-500/50"
        />
      </div>

      {/* Diagnosis Panel */}
      <div className="px-5 py-4 border-t border-amber-500/10 bg-slate-900/80">
        <h4 className="text-xs font-bold text-amber-400/80 mb-3 tracking-wider uppercase">
          📊 تشخيص التربة
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">سعة الاحتفاظ بالماء</div>
            <div className="text-lg font-extrabold text-cyan-400">{waterRetention}%</div>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-1 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                animate={{ width: `${waterRetention}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">المادة العضوية</div>
            <div className="text-lg font-extrabold text-emerald-400">{organicMatter.toFixed(1)}%</div>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-1 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                animate={{ width: `${organicMatter * 20}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">النشاط الحيوي</div>
            <div className="text-lg font-extrabold text-amber-400">
              {year <= 1 ? "خامل" : year <= 2 ? "بداية" : year <= 3 ? "نشط" : year <= 4 ? "قوي" : "مزدهر"}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">لون التربة</div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md border border-white/10"
                style={{ backgroundColor: soilColor }}
              />
              <span className="text-xs text-slate-300">
                {year <= 1 ? "رملي فاتح" : year <= 2 ? "رملي غامق" : year <= 3 ? "بني فاتح" : year <= 4 ? "بني غامق" : "أسود خصب"}
              </span>
            </div>
          </div>
        </div>

        {/* Alert box */}
        {year === 1 && (
          <div className="mt-3 p-3 rounded-xl bg-amber-900/30 border border-amber-500/30 text-xs text-amber-300">
            ⚠️ التربة لا تزال رملية. أضف البيوچار والفطريات الجذرية لبدء بناء البنية التحتية.
          </div>
        )}
        {year === 3 && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30 text-xs text-emerald-300">
            ✅ بدأت دورة المغذيات. أضف السماد الدودي وزراعة الغطاء لتعزيز الخصوبة.
          </div>
        )}
        {year === 5 && (
          <div className="mt-3 p-3 rounded-xl bg-cyan-900/30 border border-cyan-500/30 text-xs text-cyan-300">
            🌱 التربة حية! نسبة المادة العضوية تجاوزت 5% — أصبحت قادرة على دعم أشجار مثمرة معمرة.
          </div>
        )}
      </div>
    </div>
  );
};

export { SoilGenesisSim };
export default SoilGenesisSim;

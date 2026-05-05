import { useState } from "react";
import { Pipette, Gauge, ArrowRight, Droplets, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const FlowPipe = () => {
  const [width, setWidth] = useState(50);

  const animDuration = width / 20;
  const velocity = Math.round(100 - width);
  const flowRate = Math.round((width / 100) * 50);
  const isFast = width < 30;
  const isSlow = width > 80;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-cyan-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sky-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <Pipette className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">مختبر الجريان (الأنابيب)</h3>
              <p className="text-xs text-slate-500">علاقة قطر الأنبوب بسرعة التدفق وحجم الجريان</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isFast
                ? "bg-red-50 border-red-300 text-red-700"
                : isSlow
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
          >
            {isFast ? "🚀 تدفق سريع" : isSlow ? "🐢 تدفق بطيء" : "✓ تدفق متوازن"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 bg-slate-50 shadow-inner">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <defs>
                  <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="flowGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Pipe body */}
                <path
                  d={`M0,25 L100,25 L150,${75 - width / 2} L250,${75 - width / 2} L300,25 L400,25 L400,125 L300,125 L250,${75 + width / 2} L150,${75 + width / 2} L100,125 L0,125 Z`}
                  fill="url(#pipeGrad)"
                  opacity="0.3"
                />

                {/* Pipe borders */}
                <path
                  d={`M0,25 L100,25 L150,${75 - width / 2} L250,${75 - width / 2} L300,25 L400,25`}
                  stroke="#475569" strokeWidth="4" fill="none"
                />
                <path
                  d={`M0,125 L100,125 L150,${75 + width / 2} L250,${75 + width / 2} L300,125 L400,125`}
                  stroke="#475569" strokeWidth="4" fill="none"
                />

                {/* Water in pipe */}
                <path
                  d={`M0,50 L100,50 L150,${75 - width / 4} L250,${75 - width / 4} L300,50 L400,50 L400,100 L300,100 L250,${75 + width / 4} L150,${75 + width / 4} L100,100 L0,100 Z`}
                  fill="url(#waterGrad)"
                  opacity="0.4"
                />

                {/* Flow particles */}
                <AnimatePresence>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.circle
                      key={`particle-${i}`}
                      r={3 + (i % 3)}
                      fill={i % 2 === 0 ? "#0ea5e9" : "#06b6d4"}
                      filter="url(#flowGlow)"
                      initial={{ x: 20, y: 75 }}
                      animate={{
                        x: [20, 120, 200, 280, 380],
                        y: (() => {
                          const mid = (75 - width / 4 + 75 + width / 4) / 2;
                          return [mid, mid, 75, mid, mid];
                        })(),
                      }}
                      transition={{
                        duration: animDuration + i * 0.15,
                        repeat: Infinity,
                        delay: i * 0.12,
                        ease: "linear",
                      }}
                    />
                  ))}
                </AnimatePresence>

                {/* Velocity arrow */}
                <g transform="translate(200, 160)">
                  <motion.g animate={{ x: isFast ? [-5, 5, -5] : [0] }} transition={{ duration: 0.5, repeat: isFast ? Infinity : 0 }}>
                    <polygon points="0,-8 10,0 0,8" fill="#0ea5e9" />
                    <text x="15" y="4" fontSize="11" fontWeight="bold" fill="#0f172a">السرعة: {velocity} km/h</text>
                  </motion.g>
                </g>

                {/* Width scale indicator */}
                <g transform="translate(150, 175)">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
                  <text x="50" y="14" textAnchor="middle" fontSize="8" fill="#64748b">قطر: {width} mm</text>
                </g>
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="قطر الأنبوب (الوسط)"
              value={width}
              min={10}
              max={100}
              unit="mm"
              color={isFast ? "rose" : isSlow ? "blue" : "emerald"}
              onChange={(e) => setWidth(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-cyan-50 rounded-xl p-3 border border-cyan-200">
                <div className="text-[10px] font-bold text-cyan-800 flex items-center gap-1.5">
                  <Gauge size={12} /> سرعة التدفق
                </div>
                <div className={cn("text-xl font-black font-mono", isFast ? "text-red-600" : "text-cyan-700")}>
                  {velocity} km/h
                </div>
                <div className="w-full h-1.5 bg-cyan-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full", isFast ? "bg-red-500" : "bg-cyan-500")}
                    animate={{ width: `${velocity}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <div className="text-[10px] font-bold text-blue-800 flex items-center gap-1.5">
                  <Droplets size={12} /> حجم الجريان
                </div>
                <div className="text-xl font-black font-mono text-blue-700">{flowRate} L/s</div>
                <div className="w-full h-1.5 bg-blue-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-blue-500"
                    animate={{ width: `${flowRate * 2}%` }}
                    transition={{ type: "spring", stiffness: 40 }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold opacity-90">مبدأ برنولي:</span>
                <span className="text-sm font-black">{isFast ? "ضغط منخفض ← سرعة عالية" : "ضغط مرتفع ← سرعة منخفضة"}</span>
              </div>
            </div>

            <motion.div
              key={`flow-${width}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isFast ? (
                <Alert type="warning" title="🚀 تدفق سريع — ضغط منخفض">
                  القطر {width} mm يولد سرعة {velocity} km/h. كلما ضاق الأنبوب زادت السرعة (مبدأ برنولي). لكن التدفق الكلي {flowRate} L/s منخفض لأن المساحة صغيرة. مفيد للري بالرش — ضغط عالٍ لكن كمية أقل.
                </Alert>
              ) : isSlow ? (
                <Alert type="info" title="🐢 تدفق بطيء — ضغط مرتفع">
                  القطر {width} mm — الأنبوب واسع جداً. السرعة {velocity} km/h منخفضة لكن حجم الجريان {flowRate} L/s مرتفع لأن المساحة كبيرة. مثالي لنقل كميات كبيرة من الماء لمسافات قصيرة.
                </Alert>
              ) : (
                <Alert type="success" title="✅ تدفق متوازن">
                  القطر {width} mm يعطي توازناً جيداً بين السرعة ({velocity} km/h) وحجم الجريان ({flowRate} L/s). هذا الأنبوب مثالي لشبكات الري العامة — سرعة كافية وكمية جيدة.
                </Alert>
              )}
            </motion.div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-500 text-center">
              💡 كلما ضاق الأنبوب = زادت السرعة (مبدأ برنولي). كلما اتسع = زاد حجم التدفق.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

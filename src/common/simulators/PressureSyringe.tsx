import { useState } from "react";
import {
  Syringe,
  ArrowDown,
  ArrowUp,
  Gauge,
  Droplets,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const PressureSyringe = () => {
  const [plunger, setPlunger] = useState(50);
  const [action, setAction] = useState<"idle" | "push" | "pull">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue < plunger) setAction("push");
    else if (newValue > plunger) setAction("pull");
    else setAction("idle");
    setPlunger(newValue);
  };

  const pressureValue = Math.abs(plunger - 50) * 2;
  const isHighPressure = pressureValue > 70;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-cyan-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-sky-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <Syringe className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                مختبر الضغط (الحقنة)
              </h3>
              <p className="text-xs text-slate-500">
                ضغط السوائل — الشفط والدفع في النبات
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              action === "push"
                ? "bg-red-100 text-red-700 border-red-300"
                : action === "pull"
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-slate-100 text-slate-600 border-slate-200"
            )}
            animate={
              isHighPressure ? { scale: [1, 1.03, 1] } : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {action === "push"
              ? "🔴 ضغط إيجابي (+)"
              : action === "pull"
                ? "🔵 شفط/خلخلة (-)"
                : "⚪ سكون"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-72 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 280 180" className="w-full h-full">
              <defs>
                <linearGradient id="liquidGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                </linearGradient>
                <marker
                  id="arrowBlue"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L0,8 L8,4 z" fill="#3b82f6" />
                </marker>
                <filter id="glowSyringe">
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
                width="280"
                height="180"
                fill="#f8fafc"
                rx="8"
              />

              {/* === Spray particles (when pushing) === */}
              <AnimatePresence>
                {action === "push" && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.circle
                        key={`spray-${i}`}
                        r="2.5"
                        fill="#3b82f6"
                        opacity="0.7"
                        initial={{ x: 50, y: 90 }}
                        animate={{
                          x: [50, 20 - i * 8],
                          y: [90, 80 + (i % 2) * 15],
                          opacity: [0.7, 0],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          delay: i * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    <motion.path
                      d="M55,90 L25,75 M55,90 L25,105"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      opacity="0.5"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === Syringe body === */}
              <rect
                x="60"
                y="60"
                width="140"
                height="60"
                rx="6"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3.5"
              />

              {/* Liquid inside */}
              <rect
                x="65"
                y="65"
                width={Math.max(0, 130 - plunger * 1.3)}
                height="50"
                rx="3"
                fill="url(#liquidGrad)"
              />

              {/* === Plunger === */}
              <motion.g
                animate={{ x: 130 - plunger * 1.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                {/* Rubber head */}
                <rect
                  x="60"
                  y="62"
                  width="8"
                  height="56"
                  rx="2"
                  fill="#334155"
                />
                {/* Rod */}
                <rect
                  x="68"
                  y="82"
                  width="70"
                  height="16"
                  rx="2"
                  fill="#cbd5e1"
                />
                {/* Handle */}
                <rect
                  x="138"
                  y="62"
                  width="8"
                  height="56"
                  rx="3"
                  fill="#334155"
                />
              </motion.g>

              {/* Tip */}
              <path
                d="M60,85 L50,85 L50,95 L60,95"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* === Flow arrows (when pulling) === */}
              <AnimatePresence>
                {action === "pull" && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <path
                      d="M48,90 L20,90"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      markerEnd="url(#arrowBlue)"
                      className="animate-pulse"
                    />
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.circle
                        key={`inflow-${i}`}
                        cx={15 + i * 8}
                        cy={88 + (i % 2) * 4}
                        r="2"
                        fill="#3b82f6"
                        opacity="0.6"
                        animate={{ x: [0, 40], opacity: [0.6, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* === Pressure gauge at bottom === */}
              <g transform="translate(5, 158)">
                <rect
                  x="0"
                  y="0"
                  width="270"
                  height="16"
                  rx="4"
                  fill="white"
                  opacity="0.85"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="11"
                  fontSize="6"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  الضغط
                </text>
                <rect
                  x="40"
                  y="3"
                  width="180"
                  height="10"
                  rx="3"
                  fill="#e2e8f0"
                />
                {/* Center mark */}
                <line
                  x1="130"
                  y1="3"
                  x2="130"
                  y2="13"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <motion.rect
                  x={
                    plunger > 50
                      ? 130
                      : 40 + (plunger / 100) * 180
                  }
                  y="3"
                  height="10"
                  rx="3"
                  fill={
                    action === "push"
                      ? "#ef4444"
                      : action === "pull"
                        ? "#3b82f6"
                        : "#94a3b8"
                  }
                  animate={{
                    width: `${Math.abs(plunger - 50) * 3.6}px`,
                    x:
                      plunger > 50
                        ? 130
                        : 40 + (plunger / 100) * 180 - Math.abs(plunger - 50) * 3.6,
                  }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="225"
                  y="11"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  {pressureValue.toFixed(0)}%
                </text>
              </g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="موضع المكبس"
              value={plunger}
              min={0}
              max={100}
              unit="%"
              color={action === "push" ? "rose" : action === "pull" ? "blue" : "amber"}
              onChange={handleChange}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl border p-3",
                  action === "push"
                    ? "bg-red-50 border-red-200"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-1">
                  <ArrowUp size={12} className="text-red-500" />
                  ضغط إيجابي
                </div>
                <div className="text-lg font-black font-mono text-red-600">
                  {action === "push" ? pressureValue.toFixed(0) : 0}%
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl border p-3",
                  action === "pull"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600 flex items-center gap-1">
                  <ArrowDown size={12} className="text-blue-500" />
                  ضغط سلبي (شفط)
                </div>
                <div className="text-lg font-black font-mono text-blue-600">
                  {action === "pull" ? pressureValue.toFixed(0) : 0}%
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`syringe-${action}-${plunger}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {action === "push" ? (
                <Alert
                  type="warning"
                  title={`🔴 ضغط عالي (${pressureValue.toFixed(0)}%)`}
                >
                  هذا ما تفعله مضخة البئر لدفع الماء في الأنابيب. جذور الشجرة
                  تمارس ضغطاً إيجابياً (Root Pressure) لحوالي 0.1-0.2 MPa لدفع
                  العصارة للأعلى في أوائل الربيع. المكبس يضغط السائل بقوة{" "}
                  {pressureValue.toFixed(0)}% — كلما زاد الدفع، زاد الضغط
                  الخارج.
                </Alert>
              ) : action === "pull" ? (
                <Alert
                  type="info"
                  title={`🔵 ضغط سالب (${pressureValue.toFixed(0)}%) — شفط`}
                >
                  هذا ما تفعله أوراق الشجر لسحب الماء من الجذور. النتح (Transpiration)
                  يخلق ضغطاً سالباً يصل إلى -2 MPa — أقوى من مضخة شفط صناعية!
                  المكبس يسحب بقوة {pressureValue.toFixed(0)}%، وهذا هو السر
                  وراء صعود الماء لأعلى الشجرة.
                </Alert>
              ) : (
                <Alert type="info" title="⚪ توازن — لا حركة">
                  المكبس في وضع السكون عند {plunger.toFixed(0)}%. الضغط داخل
                  وخارج الحقنة متساوٍ. في هذه الحالة لا توجد حركة للماء.
                </Alert>
              )}
            </motion.div>

            {isHighPressure && action !== "idle" && (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-2 text-center text-xs text-cyan-700 font-bold">
                💡 ضغط {action === "push" ? "إيجابي" : "سلبي"} عالي —
                هذا هو المبدأ الذي يحرك الماء في النباتات والأشجار.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

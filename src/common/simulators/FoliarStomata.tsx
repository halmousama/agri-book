import { useState, useCallback } from "react";
import {
  Thermometer,
  Droplets,
  SprayCan as Spray,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const FoliarStomata = () => {
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(50);
  const [sprayState, setSprayState] = useState<"idle" | "success" | "waste">("idle");
  const [sprayCount, setSprayCount] = useState(0);

  const isStomaOpen = humidity > 60 && temperature < 30;
  const isStomaClosed = !isStomaOpen;
  const isHeatStress = temperature > 35;

  const spray = useCallback(() => {
    if (isStomaOpen) {
      setSprayState("success");
    } else {
      setSprayState("waste");
    }
    setSprayCount((c) => c + 1);
    setTimeout(() => setSprayState("idle"), 2000);
  }, [isStomaOpen]);

  const wasteCost = sprayCount * 0.5;
  const wastePercentage = sprayCount > 0
    ? Math.round((sprayCount - Math.floor(sprayCount / 2)) / sprayCount * 100)
    : 0;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg shadow-emerald-200/50">
              <Spray className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">التسميد الورقي (اختراق الثغور)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">فهم آلية فتح وإغلاق الثغور لتحسين امتصاص الأسمدة</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isStomaOpen
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-red-50 border-red-300 text-red-700"
            )}
            animate={isStomaClosed ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isStomaOpen ? "🌿 ثغور مفتوحة" : "🚫 ثغور مغلقة"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد المجهري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <div className="absolute inset-3 rounded-2xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-inner bg-gradient-to-b from-emerald-50 to-emerald-100">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: "radial-gradient(circle, #166534 1px, transparent 1px)", backgroundSize: "8px 8px" }}
              />

              <svg viewBox="0 0 200 280" className="absolute bottom-0 w-full h-full">
                <defs>
                  <filter id="stomaGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Leaf tissue */}
                <rect x="10" y="20" width="180" height="200" rx="30" fill="#22c55e" opacity="0.3" />
                <path d="M30,120 L170,120" stroke="#16a34a" strokeWidth="1" opacity="0.4" />
                <path d="M50,90 L50,150 M80,80 L80,160 M120,80 L120,160 M150,90 L150,150" stroke="#16a34a" strokeWidth="0.5" opacity="0.3" />

                {/* Stoma (main visual) */}
                <g transform="translate(100, 140)">
                  <motion.path
                    d={isStomaOpen
                      ? "M-25,0 C-25,-25 0,-30 0,-30 C0,-30 25,-25 25,0 C25,25 0,30 0,30 C0,30 -25,25 -25,0"
                      : "M-20,0 C-20,-15 0,-20 0,-20 C0,-20 20,-15 20,0 C20,15 0,20 0,20 C0,20 -20,15 -20,0"
                    }
                    fill="#22d3ee"
                    opacity="0.8"
                    animate={isStomaOpen ? { d: "M-25,0 C-25,-25 0,-30 0,-30 C0,-30 25,-25 25,0 C25,25 0,30 0,30 C0,30 -25,25 -25,0" } : { d: "M-20,0 C-20,-15 0,-20 0,-20 C0,-20 20,-15 20,0 C20,15 0,20 0,20 C0,20 -20,15 -20,0" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    filter="url(#stomaGlow)"
                  />

                  <motion.path
                    d={isStomaOpen ? "M-3,-20 Q0,-22 3,-20 L3,20 Q0,22 -3,20 Z" : "M-1,-18 L1,-18 L1,18 L-1,18 Z"}
                    fill="#0f766e"
                    animate={isStomaOpen ? { d: "M-3,-20 Q0,-22 3,-20 L3,20 Q0,22 -3,20 Z" } : { d: "M-1,-18 L1,-18 L1,18 L-1,18 Z" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />

                  <circle cx="-18" cy="0" r="4" fill="#0e7490" opacity="0.6" />
                  <circle cx="18" cy="0" r="4" fill="#0e7490" opacity="0.6" />
                </g>

                {/* Spray droplets */}
                <AnimatePresence>
                  {sprayState === "success" && (
                    <motion.g key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.circle
                          key={`drop-${i}`}
                          cx={70 + Math.random() * 60}
                          cy={60 + Math.random() * 60}
                          r="3"
                          fill="#3b82f6"
                          opacity="0.7"
                          initial={{ scale: 0, opacity: 0, y: -20 }}
                          animate={{ scale: [0, 1.5, 0.8], opacity: [0, 0.7, 0.3], y: [0, 20] }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 1.5, delay: i * 0.08 }}
                          filter="url(#stomaGlow)"
                        />
                      ))}
                      <text x="100" y="220" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="bold">✅ امتصاص ناجح!</text>
                    </motion.g>
                  )}
                  {sprayState === "waste" && (
                    <motion.g key="waste" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <motion.circle
                          key={`waste-${i}`}
                          cx={60 + Math.random() * 80}
                          cy={60 + Math.random() * 40}
                          r="3"
                          fill="#94a3b8"
                          opacity="0.6"
                          initial={{ scale: 1, opacity: 1, y: 0 }}
                          animate={{ y: [0, -30 + Math.random() * -20], x: [0, (Math.random() - 0.5) * 40], opacity: [1, 0], scale: [1, 0.5] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                        />
                      ))}
                      <text x="100" y="220" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">❌ تناثر وهدر!</text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>

              <div className="absolute top-2 left-2 right-2 text-center z-10">
                <span className="text-[9px] font-bold text-slate-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {isStomaOpen ? "🌿 رطوبة عالية + جو معتدل = ثغور مفتوحة" : "🚫 حرارة عالية/رطوبة منخفضة = ثغور مغلقة"}
                </span>
              </div>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="حرارة الجو"
              value={temperature}
              min={15}
              max={45}
              unit="°C"
              color={temperature >= 30 ? (temperature > 35 ? "rose" : "amber") : "emerald"}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />

            <Slider
              label="رطوبة الجو"
              value={humidity}
              min={10}
              max={100}
              unit="%"
              color={humidity <= 40 ? "rose" : humidity <= 60 ? "amber" : "emerald"}
              onChange={(e) => setHumidity(Number(e.target.value))}
            />

            <button
              onClick={spray}
              className={cn(
                "w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97] shadow-md flex items-center justify-center gap-2",
                isStomaOpen
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-slate-400 text-slate-200 cursor-not-allowed"
              )}
            >
              <Spray size={18} />
              رش السماد الورقي
            </button>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                  <Droplets size={12} /> حالة الثغور
                </div>
                <div className={cn("text-lg font-black", isStomaOpen ? "text-emerald-600" : "text-red-600")}>
                  {isStomaOpen ? "مفتوحة ✓" : "مغلقة ✗"}
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                  <DollarSign size={12} /> الخسارة المالية
                </div>
                <div className="text-lg font-black font-mono text-red-600 dark:text-red-400">${wasteCost.toFixed(1)}</div>
              </div>
            </div>

            <motion.div
              key={`${sprayState}-${sprayCount}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {sprayState === "success" ? (
                <Alert type="success" title="✅ امتصاص مثالي!">
                  عند {temperature}°C ورطوبة {humidity}%، الثغور مفتوحة بالكامل. السماد الورقي اخترق مسام الورقة ووصل لخلايا النبات مباشرة. كفاءة الامتصاص: 90% — هذا هو التوقيت المثالي للتسميد (الصباح الباكر أو المساء).
                </Alert>
              ) : sprayState === "waste" ? (
                <Alert type="danger" title={`❌ هدر مالي! خسارة $${wasteCost.toFixed(1)}`}>
                  عند {temperature}°C ورطوبة {humidity}%، الثغور مغلقة. القطرات تناثرت أو تبخرت دون أن تدخل. {wastePercentage}% من الرشات السابقة ضاعت. انتظر حتى الصباح الباكر عندما تكون الرطوبة أعلى ({">"}60%) والحرارة أقل ({"<"}30°C).
                </Alert>
              ) : isStomaOpen ? (
                <Alert type="info" title="🌿 الثغور مفتوحة — جاهز للرش">
                  الظروف الجوية مناسبة ({temperature}°C, {humidity}% RH). اضغط الزر للرش — السماد سيدخل مباشرة عبر الثغور. كفاءة متوقعة عالية جداً.
                </Alert>
              ) : (
                <Alert type="warning" title="🚫 الثغور مغلقة — الرش سيذهب سدىً">
                  إما الحرارة مرتفعة جداً ({temperature}°C) أو الرطوبة منخفضة ({humidity}%). انتظر حتى الصباح الباكر أو المساء عندما تكون الرطوبة أعلى والحرارة أقل. الرش الآن خسارة مالية مؤكدة.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

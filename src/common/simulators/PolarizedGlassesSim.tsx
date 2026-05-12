import { useState } from "react";
import { Sun, Eye, EyeOff, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const PolarizedGlassesSim = () => {
  const [isPolarized, setIsPolarized] = useState(false);
  const [sunAngle, setSunAngle] = useState(45);

  const glareIntensity = Math.abs(45 - sunAngle) < 15 ? 0.9 : Math.abs(45 - sunAngle) < 30 ? 0.6 : 0.3;
  const visibility = isPolarized ? "واضح — الأسماك مرئية" : "مبهور — لا ترى شيئاً تحت السطح";
  const visibilityColor = isPolarized ? "text-emerald-700 bg-emerald-50 border-emerald-300" : "text-rose-700 bg-rose-50 border-rose-300";

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <Sun className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">محاكي النظارات المستقطبة — Polarized</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">كيف تخترق الضوء لترى ما تحت السطح</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all", visibilityColor)}>
            {isPolarized ? "👓 مستقطب — رؤية واضحة" : "😎 بدون استقطاب — وهج قوي"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 shrink-0 space-y-2">
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-2">
              <svg viewBox="0 0 240 200" className="w-full h-full">
                <defs>
                  <linearGradient id="polSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#b0e0ff" />
                  </linearGradient>
                  <linearGradient id="polWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                <rect width="240" height="200" fill="url(#polSky)" rx="8" />

                <circle cx={180} cy={25} r={12} fill="#fbbf24" />
                <motion.line
                  x1={180} y1={25}
                  x2={180 + Math.sin(sunAngle * Math.PI / 180) * 50}
                  y2={25 + Math.cos(sunAngle * Math.PI / 180) * 50}
                  stroke="#fbbf24"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                <rect x="0" y="70" width="240" height="130" fill="url(#polWater)" />

                <motion.path
                  d="M0,70 Q40,65 80,70 T160,70 T240,70"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  animate={{ d: ["M0,70 Q40,65 80,70 T160,70 T240,70", "M0,73 Q40,68 80,73 T160,73 T240,73"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />

                <rect x="0" y="72" width="240" height="128" fill={isPolarized ? "#1e3a5f" : "#475569"} opacity={isPolarized ? 0.3 : 0.6} />

                {isPolarized && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <text x="60" y="100" fontSize="12">🐟</text>
                    <text x="140" y="120" fontSize="14">🐠</text>
                    <text x="80" y="145" fontSize="10">🐡</text>
                    <text x="170" y="155" fontSize="12">🐟</text>
                    <motion.path
                      d="M40,105 Q60,100 80,105"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.g>
                )}

                {!isPolarized && glareIntensity > 0.3 && (
                  <motion.g animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1, repeat: Infinity }}>
                    <rect x="0" y="72" width="240" height="128" fill="white" opacity={glareIntensity * 0.5} rx="2" />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <line key={i} x1={20 + i * 45} y1={75} x2={10 + i * 50} y2={130} stroke="white" strokeWidth={1} opacity={0.6 + glareIntensity * 0.4} />
                    ))}
                  </motion.g>
                )}

                <text x="120" y="185" fontSize="7" textAnchor="middle" fill="#93c5fd">
                  {isPolarized ? "رؤية تحت السطح — الأسماك ظاهرة" : "وهج الشمس يحجب الرؤية تحت الماء"}
                </text>
              </svg>
            </div>

            <button
              onClick={() => setIsPolarized(!isPolarized)}
              className={cn(
                "w-full p-3 rounded-xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2",
                isPolarized
                  ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                  : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
              )}
            >
              {isPolarized ? <Eye size={18} /> : <EyeOff size={18} />}
              {isPolarized ? "إزالة النظارة المستقطبة" : "ارتداء النظارة المستقطبة"}
            </button>
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <Slider
              label="زاوية الشمس (°)"
              value={sunAngle}
              min={0}
              max={90}
              unit="°"
              color="amber"
              onChange={(e) => setSunAngle(Number(e.target.value))}
            />

            <div className="space-y-2">
              <div className={cn("p-3 rounded-xl text-sm border-2", isPolarized ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200")}>
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  {isPolarized ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-amber-500" />}
                  <span>{isPolarized ? "النظارة المستقطبة تعمل" : "النظارة المستقطبة غير مفعلة"}</span>
                </div>
              </div>

              <div className={cn("p-3 rounded-xl text-sm border-2", glareIntensity > 0.6 ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200")}>
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Sun size={16} className={glareIntensity > 0.6 ? "text-amber-500" : "text-blue-500"} />
                  <span>شدة الوهج: {glareIntensity > 0.7 ? "🔥 قوي جداً" : glareIntensity > 0.5 ? "⚡ متوسط" : "💡 منخفض"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Alert type={isPolarized ? "success" : "warning"} title={isPolarized ? "✅ رؤية واضحة تحت الماء" : "⚠️ الوهج يحجب الأسماك"}>
            {isPolarized
              ? "النظارة المستقطبة أزالت الوهج الناتج عن انعكاس الضوء على سطح الماء. الآن ترى الأسماك والشعاب بوضوح."
              : "بدون النظارة المستقطبة، وهج الشمس المنعكس على سطح الماء يمنعك من رؤية ما تحت السطح. ارتدها لترى الأسماك!"}
          </Alert>
          <Alert type="info" title="💡 متى يكون الوهج أقوى؟">
            تكون زاوية الشمس بين 30° و 60° هي الأسوأ للوهج (ذروتها عند 45°). في الصباح الباكر أو قبل الغروب، يكون الوهج أقل.
            النظارات المستقطبة تفيد في كل الأوقات لكن فائدتها الأعظم عندما تكون الشمس في منتصف النهار.
          </Alert>
        </div>
      </div>
    </div>
  );
};

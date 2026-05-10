import { useState, useCallback } from "react";
import { Ear, Volume2, Filter, AlertTriangle, CheckCircle, TreePine, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

export const AcousticWeevilSim = () => {
  const [noiseFilter, setNoiseFilter] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detected, setDetected] = useState(false);
  const [weevilCount, setWeevilCount] = useState(0);
  const [signalStrength, setSignalStrength] = useState(0);

  const generateWaveform = (withFilter: boolean, hasWeevil: boolean) => {
    const points: { x: number; y: number; isWeevil: boolean }[] = [];
    for (let i = 0; i < 60; i++) {
      const noise = withFilter ? Math.random() * 6 : Math.random() * 20;
      const weevilPulse = hasWeevil && i % 12 < 3 ? 15 : 0;
      const wave = Math.sin(i * 0.5) * 4;
      points.push({ x: i * 2.5, y: 30 + wave + noise + weevilPulse, isWeevil: weevilPulse > 0 });
    }
    return points;
  };

  const toggleListening = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setDetected(false);
      const interval = setInterval(() => {
        setSignalStrength((s) => {
          if (s >= 100) {
            clearInterval(interval);
            return 100;
          }
          return s + Math.random() * 15;
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setIsListening(false);
    }
  }, [isListening]);

  const resetSim = useCallback(() => {
    setIsListening(false);
    setDetected(false);
    setWeevilCount(0);
    setSignalStrength(0);
  }, []);

  const hasWeevil = signalStrength > 40;
  const waveformData = generateWaveform(noiseFilter, hasWeevil && isListening);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg shadow-emerald-500/30">
              <Ear className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">كشف الآفات الصوتي — Acoustic Weevil Detector</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">استماع ذكي لصوت مضغ السوسة داخل جذع النخلة</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", detected ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : isListening ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {detected ? "🚨 تم الكشف!" : isListening ? "🟢 استماع..." : "⏸ متوقف"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <radialGradient id="weevilDot"><stop offset="0%" stopColor="#ef4444" stopOpacity="1" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
              </defs>
              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === Palm Trunk Cross-section === */}
              <g transform="translate(100, 50)">
                <ellipse cx="0" cy="0" rx="30" ry="50" fill="#78350f" stroke="#92400e" strokeWidth="1" />
                <ellipse cx="0" cy="0" rx="20" ry="40" fill="#a16207" stroke="#92400e" strokeWidth="0.5" strokeDasharray="2 1" />
                <ellipse cx="0" cy="0" rx="12" ry="25" fill="#854d0e" />
                <ellipse cx="0" cy="0" rx="4" ry="8" fill="#713f12" />

                {/* Weevil tunnels */}
                {hasWeevil && isListening && [...Array(3)].map((_, i) => (
                  <path key={`tunnel-${i}`} d={`M${-8 + i * 8},${-15 + i * 12} Q${5 + i * 3},${-5 + i * 8} ${-5 + i * 4},${10 + i * 6}`}
                    stroke="#fca5a5" strokeWidth="1.5" fill="none" opacity={0.5} strokeDasharray="2 2" />
                ))}

                {/* Weevil dots */}
                {hasWeevil && isListening && [...Array(3)].map((_, i) => (
                  <motion.circle key={`bug-${i}`} cx={-5 + i * 8} cy={-8 + i * 10} r={2} fill="#ef4444"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.5 + i * 0.2, repeat: Infinity }} />
                ))}
              </g>

              {/* === Microphone icon === */}
              <g transform="translate(100, 115)">
                <motion.g animate={{ scale: isListening ? [1, 1.1, 1] : 1 }} transition={{ duration: 1, repeat: Infinity }}>
                  <circle cx="0" cy="0" r="6" fill="#64748b" stroke="#94a3b8" strokeWidth="0.5" />
                  <rect x="-4" y="6" width="8" height="2" rx="0.5" fill="#64748b" />
                  <line x1="0" y1="8" x2="0" y2="15" stroke="#64748b" strokeWidth="1" />
                </motion.g>
              </g>

              {/* === Audio Waveform === */}
              <g transform="translate(10, 150)">
                <rect x="0" y="0" width="180" height="65" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                <text x="90" y="10" textAnchor="middle" fontSize="6" fill="#94a3b8">
                  {noiseFilter ? "موجة مفلترة (AI Filter ON)" : "موجة خام (بدون فلتر)"}
                </text>

                {isListening ? (
                  <>
                    <polyline points={waveformData.map((p) => `${p.x},${p.y + 15}`).join(" ")} fill="none"
                      stroke={noiseFilter ? "#22c55e" : "#94a3b8"} strokeWidth="1" opacity={0.6} />
                    {waveformData.filter((p) => p.isWeevil).map((p, i) => (
                      <motion.circle key={`wp-${i}`} cx={p.x} cy={p.y + 15} r={2} fill="#ef4444"
                        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 0.4, repeat: Infinity }} />
                    ))}
                    {noiseFilter && (
                      <text x="90" y="58" textAnchor="middle" fontSize="6" fill={hasWeevil ? "#ef4444" : "#22c55e"}>
                        {hasWeevil ? "⚠ نمط مضغ منتظم مكتشف!" : "✅ لا توجد آفات"}
                      </text>
                    )}
                  </>
                ) : (
                  <text x="90" y="40" textAnchor="middle" fontSize="7" fill="#64748b">اضغط "بدء الاستماع"</text>
                )}
              </g>
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-200">فلتر الذكاء الاصطناعي</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setNoiseFilter(false)}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", !noiseFilter ? "bg-amber-600 text-white shadow-lg shadow-amber-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  بدون فلتر (خام)
                </button>
                <button onClick={() => setNoiseFilter(true)}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", noiseFilter ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  فلتر AI نشط
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={toggleListening}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", isListening ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30")}>
                {isListening ? "⏹ إيقاف الاستماع" : "🎤 بدء الاستماع"}
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">قوة الإشارة</div>
                <div className={cn("text-lg font-black font-mono", signalStrength > 70 ? "text-rose-400" : signalStrength > 30 ? "text-amber-400" : "text-emerald-400")}>
                  {signalStrength.toFixed(0)}%
                </div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">الآفات المكتشفة</div>
                <div className={cn("text-lg font-black font-mono", weevilCount > 3 ? "text-rose-400" : "text-emerald-400")}>{weevilCount}</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">الفلتر</div>
                <div className={cn("text-lg font-black font-mono", noiseFilter ? "text-emerald-400" : "text-amber-400")}>{noiseFilter ? "ON" : "OFF"}</div>
              </div>
            </div>

            <motion.div key={`weevil-${noiseFilter}-${isListening}-${signalStrength}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {hasWeevil && noiseFilter && isListening ? (
                <Alert type="danger" title="🚨 سوسة حمراء مكتشفة! — نمط مضغ منتظم!">
                  بعد فلترة ضوضاء الرياح والطيور، يظهر نمط "نبضات حمراء" منتظم — هذا هو صوت مضغ يرقات السوسة داخل الجذع!
                  قوة الإشارة: {signalStrength.toFixed(0)}%. تدخل فوري مطلوب: حقن مبيد في جذع النخلة رقم 45.
                  بدون الفلتر، كنا سنظنها مجرد رياح.
                </Alert>
              ) : !isListening ? (
                <Alert type="info" title="🎧 جاهز للاستماع">
                  اضغط "بدء الاستماع" لتفعيل الميكروفون فائق الحساسية. جرب تشغيل/إيقاف فلتر AI لترى الفرق.
                  السوسة الحمراء تصدر صوت مضغ منتظم — الفلتر يزيل ضوضاء الرياح والطيور ليكشف النمط الحقيقي.
                </Alert>
              ) : isListening && !noiseFilter ? (
                <Alert type="info" title="📊 موجة خام — ضوضاء عالية">
                  الموجة فوضوية وغير منتظمة. فلتر AI يزيل ضوضاء الرياح والطيور والأصوات المحيطة.
                  شغّل الفلتر لترى إن كانت هناك سوسة فعلاً أم مجرد ضوضاء بيئية.
                </Alert>
              ) : (
                <Alert type="success" title="✅ لا توجد آفات — الموجة نظيفة">
                  بعد الفلترة، الموجة خالية من الأنماط المنتظمة. لا توجد سوسة في هذه النخلة.
                  الفلتر وفّر عليك حقن مبيد غير ضروري — ووفّر المال والبيئة.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

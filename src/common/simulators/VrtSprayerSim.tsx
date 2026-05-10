import { useState, useCallback } from "react";
import { Tractor, Map, DollarSign, AlertTriangle, CheckCircle, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

type SprayMode = "blind" | "vrt";

export const VrtSprayerSim = () => {
  const [sprayMode, setSprayMode] = useState<SprayMode>("blind");
  const [isActive, setIsActive] = useState(false);

  const treeHealth = [95, 30, 85, 20, 90, 35, 75, 25, 88, 40, 92, 28, 70, 32, 80];

  const blindCost = treeHealth.length * 100;
  const vrtCost = treeHealth.reduce((sum, h) => sum + (h >= 80 ? 30 : h >= 50 ? 70 : 100), 0);
  const savings = blindCost - vrtCost;
  const avgHealthBlind = treeHealth.reduce((s, h) => s + h, 0) / treeHealth.length;
  const vrtApplied = treeHealth.map((h) => Math.min(100, h + (sprayMode === "vrt" ? (h >= 80 ? 5 : h >= 50 ? 15 : 25) : (h >= 80 ? 10 : 2))));
  const avgHealthVrt = vrtApplied.reduce((s, h) => s + h, 0) / vrtApplied.length;

  const getNdviColor = (h: number) => {
    if (h >= 80) return "#22c55e";
    if (h >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const toggleRun = useCallback(() => setIsActive((r) => !r), []);
  const resetSim = useCallback(() => { setIsActive(false); setSprayMode("blind"); }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-stone-200 dark:border-stone-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl shadow-lg shadow-lime-500/30">
              <Tractor className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">تقنية المعدلات المتغيرة — VRT Sprayer</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">رش ذكي متغير حسب احتياج كل شجرة</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", sprayMode === "vrt" ? "bg-lime-50 dark:bg-lime-900/40 border-lime-400/50 text-lime-600 dark:text-lime-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {sprayMode === "vrt" ? "رش ذكي VRT ✅" : "رش تقليدي أعمى"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === NDVI Map (right side) === */}
              <g transform="translate(105, 15)">
                <rect x="0" y="0" width="85" height="210" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                <text x="42" y="12" textAnchor="middle" fontSize="6" fill="#94a3b8">خريطة NDVI</text>
                {treeHealth.slice(0, 15).map((h, i) => {
                  const col = i % 5;
                  const row = Math.floor(i / 5);
                  return (
                    <g key={`ndvi-${i}`} transform={`translate(${5 + col * 17}, ${18 + row * 60})`}>
                      <rect x="0" y="0" width="14" height="50" rx="2" fill={getNdviColor(h)} opacity={0.7} />
                      <text x="7" y="58" textAnchor="middle" fontSize="5" fill="#64748b">{h}%</text>
                    </g>
                  );
                })}
              </g>

              {/* === Tractor Spraying (left side) === */}
              <g transform="translate(10, 15)">
                <rect x="0" y="0" width="90" height="210" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
                <text x="45" y="12" textAnchor="middle" fontSize="6" fill="#94a3b8">الرش في الحقل</text>

                {/* Trees */}
                {treeHealth.slice(0, 8).map((h, i) => (
                  <g key={`tree-${i}`} transform={`translate(${15 + i * 10}, ${30})`}>
                    <rect x="-2" y="0" width="4" height="8" fill="#78350f" />
                    <circle cx="0" cy="-4" r={h >= 80 ? 8 : h >= 50 ? 6 : 5} fill={getNdviColor(h)} opacity={0.8} />
                    {sprayMode === "vrt" && (
                      <text x="0" y="20" textAnchor="middle" fontSize="4" fill={h >= 80 ? "#4ade80" : h >= 50 ? "#fbbf24" : "#f87171"}>
                        {h >= 80 ? "10%" : h >= 50 ? "70%" : "100%"}
                      </text>
                    )}
                  </g>
                ))}

                {/* Tractor */}
                <motion.g animate={isActive ? { x: [0, 60, 0] } : {}} transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "linear" }}>
                  <rect x="5" y="150" width="25" height="12" rx="3" fill="#475569" stroke="#94a3b8" strokeWidth="0.5" />
                  <circle cx="10" cy="165" r="4" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                  <circle cx="25" cy="165" r="4" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                  <rect x="10" y="148" width="8" height="5" rx="1" fill="#64748b" />
                  {/* Spray plume */}
                  {sprayMode === "blind" ? (
                    <rect x="12" y="158" width="12" height="20" fill="#a3e635" opacity={0.3} rx="2" />
                  ) : (
                    <>
                      <rect x="12" y="158" width="12" height="20" fill="#a3e635" opacity={0.15} rx="2" />
                      <motion.rect x="12" y="158" width="12" height="8" fill="#a3e635" opacity={0.4} rx="2"
                        animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    </>
                  )}
                </motion.g>

                {/* Legend */}
                <rect x="5" y="185" width="8" height="8" rx="1" fill="#22c55e" /><text x="16" y="192" fontSize="6" fill="#94a3b8">قوي</text>
                <rect x="45" y="185" width="8" height="8" rx="1" fill="#f59e0b" /><text x="56" y="192" fontSize="6" fill="#94a3b8">متوسط</text>
                <rect x="5" y="198" width="8" height="8" rx="1" fill="#ef4444" /><text x="16" y="205" fontSize="6" fill="#94a3b8">ضعيف</text>
              </g>

              <text x="100" y="258" textAnchor="middle" fontSize="7" fill="#64748b">
                {sprayMode === "vrt" ? `💰 التوفير: $${savings.toLocaleString()}` : `💸 التكلفة: $${blindCost.toLocaleString()}`}
              </text>
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-lime-50 dark:bg-lime-900/30 rounded-2xl p-4 border border-lime-200 dark:border-lime-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Map size={16} className="text-lime-600 dark:text-lime-400" />
                <span className="text-sm font-bold text-lime-700 dark:text-lime-200">طريقة الرش</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSprayMode("blind")}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", sprayMode === "blind" ? "bg-amber-600 text-white shadow-lg shadow-amber-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  تقليدي أعمى
                </button>
                <button onClick={() => setSprayMode("vrt")}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", sprayMode === "vrt" ? "bg-lime-600 text-white shadow-lg shadow-lime-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  رش ذكي VRT
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={toggleRun}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", isActive ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg" : "bg-lime-600 hover:bg-lime-500 text-white shadow-lg shadow-lime-900/30")}>
                {isActive ? "⏹ إيقاف" : "▶ تشغيل المحاكاة"}
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-lime-600 dark:text-lime-300">التكلفة الإجمالية</div>
                <div className={cn("text-lg font-black font-mono", sprayMode === "vrt" ? "text-lime-400" : "text-amber-400")}>
                  ${sprayMode === "vrt" ? vrtCost.toLocaleString() : blindCost.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-lime-600 dark:text-lime-300">التوفير</div>
                <div className={cn("text-lg font-black font-mono", sprayMode === "vrt" ? "text-emerald-400" : "text-rose-400")}>
                  {sprayMode === "vrt" ? `$${savings.toLocaleString()}` : "$0"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-lime-600 dark:text-lime-300">متوسط صحة المحصول</div>
                <div className={cn("text-lg font-black font-mono", sprayMode === "vrt" ? "text-emerald-400" : "text-amber-400")}>
                  {sprayMode === "vrt" ? avgHealthVrt.toFixed(0) : avgHealthBlind.toFixed(0)}%
                </div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-lime-600 dark:text-lime-300">وفر في السماد</div>
                <div className={cn("text-lg font-black font-mono text-emerald-400")}>
                  {sprayMode === "vrt" ? `${Math.round((savings / blindCost) * 100)}%` : "0%"}
                </div>
              </div>
            </div>

            <motion.div key={`vrt-${sprayMode}-${isActive}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {sprayMode === "vrt" ? (
                <Alert type="success" title="✅ VRT — رش ذكي!">
                  كل شجرة تحصل على حاجتها بالضبط: القوية 10% سماد، المتوسطة 70%، الضعيفة 100%.
                  النتيجة: توفير ${savings.toLocaleString()} (نسبة {Math.round((savings / blindCost) * 100)}%) وتحسين صحة الحقل
                  إلى {avgHealthVrt.toFixed(0)}% مقابل {avgHealthBlind.toFixed(0)}% بالرش التقليدي.
                  الحقل أصبح متجانساً — لا أشجار ضعيفة ولا هدر في السماد.
                </Alert>
              ) : (
                <Alert type="warning" title="⚠ رش تقليدي — هدر كبير!">
                  جميع الأشجار ترش بنفس الكمية (100% لكل شجرة) بغض النظر عن حاجتها.
                  التكلفة: ${blindCost.toLocaleString()}. الأشجار القوية (خضراء) تأخذ سماداً لا تحتاجه — يذهب هدراً في التربة.
                  الأشجار الضعيفة (حمراء) تبقى ضعيفة لأنها تحتاج عناية خاصة. الحقل غير متجانس.
                  وفّر بالتحويل إلى VRT: ${savings.toLocaleString()}.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

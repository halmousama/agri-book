import { useState, useCallback } from "react";
import { Scale, Trees, Factory, DollarSign, AlertTriangle, CheckCircle, TrendingDown, RefreshCw, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

type Practice = "tillage" | "no_till" | "cover_crops";

export const CarbonCreditSim = () => {
  const [practice, setPractice] = useState<Practice>("tillage");
  const [soilCarbon, setSoilCarbon] = useState(30);
  const [atmosCO2, setAtmosCO2] = useState(70);
  const [creditsSold, setCreditsSold] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const runCycle = useCallback(() => {
    setCycles((c) => c + 1);
    const delta = practice === "tillage" ? -8 : practice === "no_till" ? 4 : 9;
    setSoilCarbon((s) => {
      const newS = Math.max(5, Math.min(95, s + delta));
      setAtmosCO2(100 - newS);
      if (practice !== "tillage" && newS >= 70 && creditsSold < 5) {
        setCreditsSold((cr) => cr + 1);
        setRevenue((r) => r + (practice === "cover_crops" ? 600 : 400));
      }
      return newS;
    });
  }, [practice, creditsSold]);

  const toggleRun = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      const interval = setInterval(() => {
        runCycle();
        setCycles((c) => {
          if (c >= 8) {
            clearInterval(interval);
            setIsActive(false);
            return 8;
          }
          return c;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isActive, runCycle]);

  const resetSim = useCallback(() => {
    setIsActive(false);
    setSoilCarbon(30);
    setAtmosCO2(70);
    setCreditsSold(0);
    setRevenue(0);
    setCycles(0);
    setPractice("tillage");
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg shadow-emerald-500/30">
              <Scale className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">زراعة الكربون — Carbon Credits</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">حوِّل تربتك إلى مصدر دخل عبر أرصدة الكربون</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", creditsSold > 0 ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : practice === "tillage" ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {creditsSold > 0 ? `${creditsSold} أرصدة مباعة ✅` : practice === "tillage" ? "خسارة كربون ❌" : "تراكم كربون"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === Balance Scale === */}
              <g transform="translate(100, 60)">
                <line x1="-60" y1="0" x2="60" y2="0" stroke="#64748b" strokeWidth="2" />
                <line x1="0" y1="0" x2="0" y2="30" stroke="#64748b" strokeWidth="2" />
                <polygon points="-5,30 5,30 8,40 -8,40" fill="#64748b" />

                {/* CO2 in air (left side) */}
                <motion.g animate={{ rotate: Math.min(30, (atmosCO2 - 50) * 0.8) }} style={{ transformOrigin: "-60px 0px" }}>
                  <line x1="-60" y1="0" x2="-80" y2="40" stroke="#64748b" strokeWidth="1.5" />
                  <rect x="-95" y="30" width="30" height="25" rx="4" fill={atmosCO2 > 60 ? "#ef4444" : "#f59e0b"} opacity={0.7} />
                  <text x="-80" y="70" textAnchor="middle" fontSize="6" fill="#94a3b8">CO₂ في الجو</text>
                  <text x="-80" y="80" textAnchor="middle" fontSize="7" fill={atmosCO2 > 60 ? "#ef4444" : "#f59e0b"} fontWeight="bold">{atmosCO2.toFixed(0)}%</text>
                </motion.g>

                {/* Carbon in soil (right side) */}
                <motion.g animate={{ rotate: -Math.min(30, (soilCarbon - 50) * 0.8) }} style={{ transformOrigin: "60px 0px" }}>
                  <line x1="60" y1="0" x2="80" y2="40" stroke="#64748b" strokeWidth="1.5" />
                  <rect x="65" y="30" width="30" height="25" rx="4" fill={soilCarbon > 60 ? "#22c55e" : "#f59e0b"} opacity={0.7} />
                  <text x="80" y="70" textAnchor="middle" fontSize="6" fill="#94a3b8">C في التربة</text>
                  <text x="80" y="80" textAnchor="middle" fontSize="7" fill={soilCarbon > 60 ? "#22c55e" : "#f59e0b"} fontWeight="bold">{soilCarbon.toFixed(0)}%</text>
                </motion.g>
              </g>

              {/* === Soil profile === */}
              <g transform="translate(10, 160)">
                <rect x="0" y="0" width="180" height="50" rx="4" fill="#451a03" stroke="#78350f" strokeWidth="0.5" />
                {/* Carbon particles in soil */}
                {practice !== "tillage" && [...Array(Math.max(2, Math.floor(soilCarbon / 10)))].map((_, i) => (
                  <motion.circle key={`c-${i}`} cx={10 + Math.random() * 160} cy={5 + Math.random() * 40} r={2}
                    fill="#4ade80" opacity={0.6}
                    animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
                ))}
                {/* CO2 bubbles rising (tillage) */}
                {practice === "tillage" && [...Array(3)].map((_, i) => (
                  <motion.circle key={`co2-${i}`} cx={30 + i * 60} cy={40 - i * 10} r={3} fill="#ef4444" opacity={0.5}
                    animate={{ cy: [40 - i * 10, -5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
                ))}
              </g>

              {/* Income notification */}
              {creditsSold > 0 && (
                <g transform="translate(15, 230)">
                  <rect x="0" y="0" width="170" height="22" rx="6" fill="rgba(5,150,105,0.2)" stroke="rgba(5,150,105,0.4)" strokeWidth="0.5" />
                  <text x="85" y="14" textAnchor="middle" fontSize="7" fill="#4ade80">💰 تم بيع {creditsSold} أطنان كربون بـ ${revenue}</text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sprout size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-200">الممارسة الزراعية</span>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => setPractice("tillage")}
                  className={cn("w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", practice === "tillage" ? "bg-rose-600 text-white shadow-lg shadow-rose-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  🚜 حراثة عميقة (تفقد الكربون)
                </button>
                <button onClick={() => setPractice("no_till")}
                  className={cn("w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", practice === "no_till" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  🌱 زراعة بدون حراثة (No-Till)
                </button>
                <button onClick={() => setPractice("cover_crops")}
                  className={cn("w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", practice === "cover_crops" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  🌿 محاصيل تغطية (Cover Crops + No-Till)
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={toggleRun} disabled={isActive}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", isActive ? "bg-slate-300 dark:bg-slate-600 text-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30")}>
                {isActive ? "⏳ جاري..." : "▶ تشغيل الدورة"}
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">كربون التربة</div>
                <div className={cn("text-lg font-black font-mono", soilCarbon > 60 ? "text-emerald-400" : soilCarbon > 30 ? "text-amber-400" : "text-rose-400")}>{soilCarbon.toFixed(0)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">الدورات</div>
                <div className="text-lg font-black font-mono text-cyan-400">{cycles}/8</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300">الإيرادات</div>
                <div className={cn("text-lg font-black font-mono", revenue > 0 ? "text-emerald-400" : "text-zinc-500")}>${revenue}</div>
              </div>
            </div>

            <motion.div key={`carbon-${practice}-${cycles}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {practice === "tillage" && cycles > 0 ? (
                <Alert type="danger" title="🚨 الحراثة تطلق الكربون!">
                  كل دورة حراثة تكشف الكربون المخزون في التربة للأكسجين، فيتحول لـ CO₂ ويتصاعد للجو!
                  كربون التربة: {soilCarbon.toFixed(0)}% (نزل من 30%). الأراضي الزراعية تتحول من "بالوعة كربون"
                  إلى "مصدر كربون". خسارة للتربة، خسارة للمناخ، وخسارة مالية (0 رصيد مباع).
                </Alert>
              ) : creditsSold > 0 ? (
                <Alert type="success" title="✅ تم بيع أرصدة كربون! 🎉">
                  الزراعة التجديدية خزنت {soilCarbon.toFixed(0)}% كربون في التربة! تجاوزت حد 70% — تم بيع {creditsSold} أطنان
                  كربون بـ ${revenue}. شركات أوروبية تشتري منك هذه الأرصدة كتعويض عن تلوثها.
                  الأرض أصبحت بالوعة كربون (Carbon Sink) بدلاً من مصدر تلوث!
                </Alert>
              ) : cycles > 0 ? (
                <Alert type="info" title="🌱 كربون يتراكم في التربة">
                  {practice === "no_till"
                    ? "بدون حراثة، التربة تبدأ بتخزين الكربون تدريجياً. الكائنات الدقيقة (ديدان الأرض، الفطريات) تبني التربة من جديد. كل دورة تزيد الكربون."
                    : "محاصيل التغطية تسحب CO₂ من الجو وتحوله لكربون صلب في التربة عبر الجذور. هذا هو أسرع طريق لتراكم الكربون!"}
                  استمر لتبلغ 70% كربون وتبيع أول رصيد.
                </Alert>
              ) : (
                <Alert type="info" title="⚖️ اختر ممارستك الزراعية">
                  الميزان يظهر CO₂ في الجو (يسار) مقابل الكربون في التربة (يمين). الحراثة تفسد التربة،
                  الزراعة التجديدية تبنيها. ابدأ الدورة لترى الفرق — واكسب أرصدة كربون!
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

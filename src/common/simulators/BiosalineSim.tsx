import { useState, useCallback } from "react";
import { Droplets, AlertTriangle, CheckCircle, Thermometer, TreePine, RefreshCw, ToggleLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type PlantType = "tomato" | "quinoa";

export const BiosalineSim = () => {
  const [plantType, setPlantType] = useState<PlantType>("tomato");
  const [leaching, setLeaching] = useState(false);
  const [waterSalinity, setWaterSalinity] = useState(40);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const saltAccumulation = leaching
    ? Math.max(0, waterSalinity * 0.05 * timeElapsed - timeElapsed * 0.5)
    : waterSalinity * 0.08 * timeElapsed;
  const totalSalt = Math.min(100, saltAccumulation);

  const plantHealth = plantType === "tomato"
    ? Math.max(0, 100 - waterSalinity * 2 - totalSalt * 1.5)
    : Math.max(0, 100 - Math.max(0, waterSalinity - 60) * 1.5 - totalSalt * 0.8);

  const isDead = plantHealth <= 0;
  const needsLeaching = totalSalt > 50 && !leaching;

  const toggleRun = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setTimeElapsed((t) => {
          if (t >= 15) {
            clearInterval(interval);
            setIsRunning(false);
            return 15;
          }
          return t + 1;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const resetSim = useCallback(() => {
    setIsRunning(false);
    setTimeElapsed(0);
    setLeaching(false);
    setPlantType("tomato");
    setWaterSalinity(40);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-orange-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg shadow-orange-500/30">
              <Droplets className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">الزراعة الملحية — Biosaline Agriculture</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">زراعة في التربة المالحة بمياه مالحة</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", isDead ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : plantHealth > 60 ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {isDead ? "نبات ميت ❌" : plantHealth > 60 ? "مزدهر ✅" : "تحت الإجهاد"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === Plant === */}
              <g transform="translate(100, 100)">
                {plantType === "tomato" ? (
                  <motion.g animate={{ scale: isDead ? 0.3 : [1, 1.01, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <rect x="-1" y="0" width="2" height={30 + plantHealth * 0.2} fill="#78350f" />
                    <ellipse cx="0" cy={-10} rx={plantHealth > 50 ? 15 : 8} ry={plantHealth > 50 ? 10 : 5}
                      fill={isDead ? "#78716c" : plantHealth > 50 ? "#22c55e" : "#f59e0b"} opacity={0.8} />
                    {isDead && <text x="0" y="-15" textAnchor="middle" fontSize="6" fill="#ef4444">💀</text>}
                  </motion.g>
                ) : (
                  <motion.g animate={{ scale: isDead ? 0.5 : [1, 1.005, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <rect x="-1" y="0" width="2" height={40} fill="#78350f" />
                    <ellipse cx="-8" cy={-12} rx={10} ry={6} fill="#84cc16" opacity={0.7} />
                    <ellipse cx="5" cy={-15} rx={8} ry={5} fill="#a3e635" opacity={0.7} />
                    <ellipse cx="0" cy={-8} rx={6} ry={4} fill="#22c55e" opacity={0.6} />
                    {isDead && <text x="0" y="-20" textAnchor="middle" fontSize="6" fill="#ef4444">💀</text>}
                  </motion.g>
                )}
              </g>

              {/* === Soil Cross-section === */}
              <g transform="translate(10, 140)">
                <rect x="0" y="0" width="180" height="80" rx="4" fill="#451a03" stroke="#78350f" strokeWidth="0.5" />

                {/* Salt layer */}
                <motion.rect x="5" y={60 - totalSalt * 0.35} width="170" height={totalSalt * 0.35}
                  fill="#fef3c7" opacity={0.5} rx="2"
                  animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                <text x="90" y={55 - totalSalt * 0.35} textAnchor="middle" fontSize="4.5" fill="#fef3c7">
                  {totalSalt > 5 ? `ملح: ${totalSalt.toFixed(0)}%` : ""}
                </text>

                {/* Roots */}
                {!isDead && [...Array(5)].map((_, i) => (
                  <motion.path key={`root-${i}`} d={`M${30 + i * 30},0 Q${25 + i * 30},15 ${35 + i * 28},30 Q${30 + i * 32},45 ${32 + i * 30},55`}
                    stroke="#d4d4d4" strokeWidth="1" fill="none" opacity={plantHealth > 30 ? 0.7 : 0.2} />
                ))}

                {/* Water table */}
                <rect x="5" y="70" width="170" height="8" rx="2" fill="#1d4ed8" opacity={0.3} />
                <text x="90" y="76" textAnchor="middle" fontSize="5" fill="#60a5fa">
                  {leaching ? "💧 ماء غسيل نشط — يغسل الملح" : "⚠ ماء مالح — لا غسيل"}
                </text>
              </g>
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-4 border border-orange-200 dark:border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <TreePine size={16} className="text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-bold text-orange-700 dark:text-orange-200">اختيار النبات</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setPlantType("tomato")}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", plantType === "tomato" ? "bg-rose-600 text-white shadow-lg shadow-rose-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  🍅 طماطم (حساسة)
                </button>
                <button onClick={() => setPlantType("quinoa")}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", plantType === "quinoa" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  🌾 كينوا (مقاومة)
                </button>
              </div>
            </div>

            <Slider label="ملوحة ماء الري (EC)" value={waterSalinity} min={5} max={100} unit="dS/m" color={waterSalinity <= 30 ? "emerald" : waterSalinity <= 60 ? "amber" : "rose"} onChange={(e) => setWaterSalinity(Number(e.target.value))} />

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 border border-blue-200 dark:border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <ToggleLeft size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-bold text-blue-700 dark:text-blue-200">إضافة ماء غسيل (Leaching Fraction)</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setLeaching(false)}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", !leaching ? "bg-rose-600 text-white shadow-lg shadow-rose-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  بدون غسيل
                </button>
                <button onClick={() => setLeaching(true)}
                  className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", leaching ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-zinc-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600")}>
                  💧 غسيل +15%
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={toggleRun} disabled={isRunning || isDead}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", isRunning || isDead ? "bg-slate-300 dark:bg-slate-600 text-slate-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/30")}>
                {isRunning ? "⏳ جاري..." : "▶ تشغيل المحاكاة"}
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-orange-600 dark:text-orange-300">الملح في التربة</div>
                <div className={cn("text-lg font-black font-mono", totalSalt > 60 ? "text-rose-400" : totalSalt > 30 ? "text-amber-400" : "text-emerald-400")}>{totalSalt.toFixed(0)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-orange-600 dark:text-orange-300">صحة النبات</div>
                <div className={cn("text-lg font-black font-mono", plantHealth > 60 ? "text-emerald-400" : plantHealth > 20 ? "text-amber-400" : "text-rose-400")}>{Math.max(0, plantHealth).toFixed(0)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-orange-600 dark:text-orange-300">الوقت</div>
                <div className="text-lg font-black font-mono text-cyan-400">{timeElapsed}s</div>
              </div>
            </div>

            <motion.div key={`biosaline-${plantType}-${leaching}-${timeElapsed}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {isDead ? (
                <Alert type="danger" title="🚨 النبات مات!">
                  {plantType === "tomato"
                    ? "الطماطم حساسة جداً للملوحة. ماتت فوراً بفعل البلزمة (Plasmolysis) — الماء خرج من الخلايا نحو التربة المالحة. الطماطم تحتاج EC < 30 dS/m."
                    : "الكينوا صمدت أطول لكن الملح تراكم في منطقة الجذور حتى قتلها. كان يجب تفعيل 'ماء الغسيل' (Leaching Fraction) لطرد الملح إلى أسفل."}
                  الري بكمية زائدة عن حاجة النبات بنسبة 15% يغسل الملح تحت الجذور ويمنع التراكم.
                </Alert>
              ) : needsLeaching && timeElapsed > 5 ? (
                <Alert type="warning" title="⚠ الملح يتراكم — فعّل ماء الغسيل!">
                  مستوى الملح في التربة وصل {totalSalt.toFixed(0)}%. بدون "Leaching Fraction"،
                  الملح سيتراكم في منطقة الجذور حتى يقتل النبات. أضف 15% ماء غسيل لطرد الملح إلى أسفل.
                  {plantType === "quinoa" ? " الكينوا مقاومة لكنها ليست خالدة!" : " الطماطم ستموت قريباً!"}
                </Alert>
              ) : plantHealth > 60 && timeElapsed > 5 ? (
                <Alert type="success" title="✅ نبات مزدهر!">
                  {plantType === "quinoa" ? "الكينوا تزدهر! نبات (Halophyte) يحب الملح — يخزنه في فجوات (Vacuoles) بأوراقه." : "الطماطم صامدة بفضل ماء الغسيل."}
                  {leaching ? " ماء الغسيل (+15%) يطرد الملح من منطقة الجذور — التراكم تحت السيطرة." : ""}
                  هذه هي تقنية "Biosaline Agriculture" — زراعة حيث لا يستطيع أحد الزراعة!
                </Alert>
              ) : (
                <Alert type="info" title={`🌱 ${timeElapsed > 0 ? "جاري مراقبة التربة..." : "اضبط وابدأ"}`}>
                  {timeElapsed === 0
                    ? "اختر نوع النبات، اضبط ملوحة الماء، وقرر تفعيل ماء الغسيل ثم شغّل المحاكاة. شاهد كيف يتراكم الملح — أو كيف نمنع تراكمه."
                    : `الوقت: ${timeElapsed}s. ملح التربة: ${totalSalt.toFixed(0)}%. صحة النبات: ${Math.max(0, plantHealth).toFixed(0)}%.`}
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

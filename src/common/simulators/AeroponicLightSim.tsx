import { useState, useCallback } from "react";
import { Sprout, Droplets, Sun, AlertTriangle, CheckCircle, Gauge, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const AeroponicLightSim = () => {
  const [redLight, setRedLight] = useState(70);
  const [blueLight, setBlueLight] = useState(50);
  const [farRedLight, setFarRedLight] = useState(10);
  const [mistTimer, setMistTimer] = useState(5);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startSim = useCallback(() => {
    setIsRunning(true);
    const interval = setInterval(() => {
      setTimeElapsed((t) => {
        if (t >= 30) {
          clearInterval(interval);
          setIsRunning(false);
          return 30;
        }
        return t + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const resetSim = useCallback(() => {
    setIsRunning(false);
    setTimeElapsed(0);
  }, []);

  const rootHealth = mistTimer <= 15 ? Math.max(10, 100 - (timeElapsed * (mistTimer > 5 ? 2 : 3))) : 10;
  const plantHeight = farRedLight > 30 ? 40 + (farRedLight - 30) * 1.5 : 25;
  const leafGreen = redLight > 40 && blueLight > 30 ? 60 + (redLight - 40) * 0.3 + (blueLight - 30) * 0.5 : 20;
  const isOptimal = redLight >= 50 && blueLight >= 40 && farRedLight <= 20 && mistTimer <= 10 && rootHealth > 70;
  const isRootsDead = rootHealth < 20;
  const isElongated = farRedLight > 40;
  const isMistOff = mistTimer > 15;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200 dark:border-indigo-500/20 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-2xl shadow-lg shadow-indigo-500/30">
              <Sprout className="text-emerald-300" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">المزرعة العمودية — Aeroponics</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-300">زراعة هوائية بإضاءة LED ذكية</p>
            </div>
          </div>
          <motion.div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", isOptimal ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : isRootsDead ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {isOptimal ? "نمو مثالي ✅" : isRootsDead ? "جذور ميتة ❌" : "جاري التشغيل"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ledRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="ledBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="ledFarRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === Grow Rack === */}
              <rect x="30" y="55" width="140" height="180" fill="#334155" rx="4" stroke="#475569" strokeWidth="1" />

              {/* === LED Bank === */}
              <rect x="35" y="60" width="130" height="18" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
              {[...Array(10)].map((_, i) => {
                const x = 40 + i * 13;
                const leds: { color: string; active: boolean }[] = [
                  { color: "#ef4444", active: redLight > 20 },
                  { color: "#3b82f6", active: blueLight > 20 },
                  { color: "#a855f7", active: farRedLight > 20 },
                ];
                return leds.map((led, li) => (
                  led.active && <motion.rect key={`led-${i}-${li}`} x={x + li * 4} y={62 + li * 5} width={3} height={3} rx={1} fill={led.color}
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} />
                ));
              })}

              {/* === Light Glow === */}
              {redLight > 20 && <rect x="35" y="80" width="130" height="40" fill="url(#ledRed)" opacity={redLight / 150} />}
              {blueLight > 20 && <rect x="35" y="80" width="130" height="40" fill="url(#ledBlue)" opacity={blueLight / 150} />}
              {farRedLight > 20 && <rect x="35" y="80" width="130" height="40" fill="url(#ledFarRed)" opacity={farRedLight / 200} />}

              {/* === Plant === */}
              <motion.g animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <line x1="100" y1="120" x2="100" y2={120 - plantHeight} stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="90" cy={110 - plantHeight * 0.4} rx={Math.max(5, leafGreen / 8)} ry={Math.max(8, leafGreen / 5)} fill="#22c55e" opacity={0.8} />
                <ellipse cx="110" cy={105 - plantHeight * 0.3} rx={Math.max(5, leafGreen / 8)} ry={Math.max(8, leafGreen / 5)} fill="#16a34a" opacity={0.8} />
                <ellipse cx="100" cy={95 - plantHeight * 0.5} rx={Math.max(4, leafGreen / 10)} ry={Math.max(7, leafGreen / 6)} fill="#4ade80" opacity={0.7} />
                {isElongated && <line x1="100" y1={120 - plantHeight} x2="100" y2={125 - plantHeight - 10} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" />}
              </motion.g>

              {/* === Roots (Aeroponic - hanging in air) === */}
              {!isRootsDead ? (
                [...Array(6)].map((_, i) => (
                  <motion.path key={`root-${i}`} d={`M${75 + i * 10},170 Q${70 + i * 12},195 ${80 + i * 8},210`} stroke="#d4d4d4" strokeWidth="1.5" fill="none"
                    animate={{ d: [`M${75 + i * 10},170 Q${70 + i * 12},195 ${80 + i * 8},210`, `M${75 + i * 10},170 Q${72 + i * 12},198 ${80 + i * 8},212`, `M${75 + i * 10},170 Q${70 + i * 12},195 ${80 + i * 8},210`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    opacity={rootHealth / 100} />
                ))
              ) : (
                [...Array(6)].map((_, i) => (
                  <path key={`dead-root-${i}`} d={`M${75 + i * 10},170 Q${70 + i * 12},185 ${78 + i * 8},195`} stroke="#78716c" strokeWidth="1" fill="none" opacity={0.4} />
                ))
              )}

              {/* === Mist Spray === */}
              {mistTimer <= 15 && !isRootsDead && (
                [...Array(4)].map((_, i) => (
                  <motion.ellipse key={`mist-${i}`} cx={80 + i * 15} cy={180 + i * 5} rx={8} ry={3} fill="#38bdf8" opacity={0.3}
                    animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
                ))
              )}

              {/* === Temperature / Water tray === */}
              <rect x="40" y="220" width="120" height="10" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
              <text x="100" y="248" textAnchor="middle" fontSize="8" fill="#94a3b8">وقت التشغيل: {timeElapsed}s</text>
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/40 rounded-2xl p-4 border border-indigo-200 dark:border-indigo-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sun size={16} className="text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm font-bold text-indigo-700 dark:text-indigo-200">خلطة الإضاءة (LED Recipe)</span>
              </div>
              <div className="space-y-2">
                <Slider label="الضوء الأحمر (Red)" value={redLight} min={0} max={100} unit="%" color="rose" onChange={(e) => setRedLight(Number(e.target.value))} />
                <Slider label="الضوء الأزرق (Blue)" value={blueLight} min={0} max={100} unit="%" color="blue" onChange={(e) => setBlueLight(Number(e.target.value))} />
                <Slider label="الأحمر البعيد (Far-Red)" value={farRedLight} min={0} max={100} unit="%" color="purple" onChange={(e) => setFarRedLight(Number(e.target.value))} />
              </div>
            </div>

            <Slider label="مؤقت رش الضباب" value={mistTimer} min={1} max={30} unit="دقيقة" color={mistTimer <= 10 ? "emerald" : mistTimer <= 15 ? "amber" : "rose"} onChange={(e) => setMistTimer(Number(e.target.value))} />

            <div className="flex gap-2">
              <button onClick={startSim} disabled={isRunning}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", isRunning ? "bg-slate-300 dark:bg-slate-600 text-slate-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30")}>
                ▶ تشغيل المحاكاة
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RotateCcw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">الجذور</div>
                <div className={cn("text-lg font-black font-mono", rootHealth > 70 ? "text-emerald-400" : rootHealth > 30 ? "text-amber-400" : "text-rose-400")}>{rootHealth.toFixed(0)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">الطول</div>
                <div className={cn("text-lg font-black font-mono", isElongated ? "text-amber-400" : "text-emerald-400")}>{plantHeight.toFixed(0)}cm</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">الخضرة</div>
                <div className={cn("text-lg font-black font-mono", leafGreen > 50 ? "text-emerald-400" : "text-amber-400")}>{leafGreen.toFixed(0)}%</div>
              </div>
            </div>

            <motion.div key={`aero-${redLight}-${blueLight}-${farRedLight}-${mistTimer}-${timeElapsed}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {isRootsDead ? (
                <Alert type="danger" title="🚨 الجذور ماتت!">
                  توقفت رشاشات الضباب لمدة طويلة. في الزراعة الهوائية (Aeroponics) لا يوجد تراب يحمي الجذور.
                  الجذور المكشوفة تجف خلال دقائق إذا توقف الرش. الصيانة الفورية ضرورية — أي عطل في المضخة يعني موت المحصول.
                </Alert>
              ) : isElongated ? (
                <Alert type="warning" title="⚠ استطالة غير طبيعية">
                  Far-Red مرتفع ({farRedLight}%) يحفز استطالة الساق (Shade Avoidance Syndrome).
                  النبات يظن أن هناك نباتاً آخر يظلله فيستطيل بحثاً عن الضوء — على حساب عرض الأوراق وقوة الساق.
                  النسبة المثلى: Far-Red &lt; 20%.
                </Alert>
              ) : isOptimal ? (
                <Alert type="success" title="✅ نمو مثالي!">
                  خلطة إضاءة متوازنة: أحمر {redLight}% + أزرق {blueLight}% + Far-Red منخفض ({farRedLight}%).
                  الجذور تتغذى بالضباب الغني (كل {mistTimer} دقيقة). النمو مضغوط، الأوراق عريضة وخضراء داكنة ({leafGreen.toFixed(0)}%).
                  هذا هو التصميم الأمثل للمزارع العمودية الهوائية.
                </Alert>
              ) : (
                <Alert type="info" title="💡 ضبط غير مثالي">
                  {redLight < 40 ? "الضوء الأحمر منخفض — التمثيل الضوئي ضعيف. ارفع Red > 50%." : blueLight < 30 ? "الضوء الأزرق منخفض — الأوراق ستكون صغيرة. ارفع Blue > 40%." : mistTimer > 10 ? "فترة الرش طويلة ({mistTimer} دقيقة). اجعلها < 10 دقائق لصحة أفضل للجذور." : "اقتراب من المثالية... اضبط القيم المتبقية."}
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useCallback } from "react";
import { Zap, Bot, Crosshair, AlertTriangle, CheckCircle, Shield, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

interface Plant { id: number; x: number; y: number; isWeed: boolean; alive: boolean; }
interface Robot { id: number; x: number; y: number; target?: number; }

export const SwarmWeederSim = () => {
  const [aiConfidence, setAiConfidence] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [plants, setPlants] = useState<Plant[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 140,
      y: 15 + Math.random() * 150,
      isWeed: Math.random() < 0.35,
      alive: true,
    }))
  );
  const [robots, setRobots] = useState<Robot[]>([
    { id: 0, x: 50, y: 50 },
    { id: 1, x: 120, y: 100 },
  ]);
  const [laserFlashes, setLaserFlashes] = useState<{ x: number; y: number; id: number }[]>([]);
  const [stats, setStats] = useState({ killed: 0, missed: 0, cropsBurnt: 0 });
  const [cycleCount, setCycleCount] = useState(0);

  const runCycle = useCallback(() => {
    if (!isRunning) return;
    setCycleCount((c) => c + 1);
    setPlants((prev) => {
      const updated = prev.map((p) => ({ ...p }));
      const newFlashes: typeof laserFlashes = [];
      const newStats = { killed: 0, missed: 0, cropsBurnt: 0 };

      setRobots((r) => r.map((rb) => {
        const target = updated.find((p) => p.alive && Math.random() < (aiConfidence / 100));
        if (!target) return rb;
        const hitRoll = Math.random() * 100;
        if (target.isWeed) {
          if (hitRoll <= aiConfidence) {
            target.alive = false;
            newStats.killed++;
            newFlashes.push({ x: target.x, y: target.y, id: Date.now() + Math.random() });
          } else {
            newStats.missed++;
          }
        } else {
          if (hitRoll > aiConfidence) {
            target.alive = false;
            newStats.cropsBurnt++;
            newFlashes.push({ x: target.x, y: target.y, id: Date.now() + Math.random() });
          }
        }
        return { ...rb, x: target.x + (Math.random() - 0.5) * 20, y: target.y + (Math.random() - 0.5) * 20 };
      }));

      setStats((s) => ({ killed: s.killed + newStats.killed, missed: s.missed + newStats.missed, cropsBurnt: s.cropsBurnt + newStats.cropsBurnt }));
      setLaserFlashes(newFlashes);
      return updated;
    });
  }, [isRunning, aiConfidence]);

  const resetSim = useCallback(() => {
    setIsRunning(false);
    setCycleCount(0);
    setStats({ killed: 0, missed: 0, cropsBurnt: 0 });
    setLaserFlashes([]);
    setPlants(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 140,
      y: 15 + Math.random() * 150,
      isWeed: Math.random() < 0.35,
      alive: true,
    })));
    setRobots([{ id: 0, x: 50, y: 50 }, { id: 1, x: 120, y: 100 }]);
  }, []);

  const toggleRun = useCallback(() => {
    setIsRunning((r) => !r);
    if (!isRunning) {
      const interval = setInterval(() => {
        setCycleCount((c) => {
          if (c >= 10) { clearInterval(interval); setIsRunning(false); return 10; }
          return c + 1;
        });
        setPlants((prev) => {
          const updated = prev.map((p) => ({ ...p }));
          const newFlashes: typeof laserFlashes = [];
          const newStats = { killed: 0, missed: 0, cropsBurnt: 0 };
          setRobots((r) => r.map((rb) => {
            const target = updated.find((p) => p.alive && Math.random() < 0.8);
            if (!target) return rb;
            const hitRoll = Math.random() * 100;
            if (target.isWeed) {
              if (hitRoll <= aiConfidence) { target.alive = false; newStats.killed++; newFlashes.push({ x: target.x, y: target.y, id: Date.now() + Math.random() }); }
              else { newStats.missed++; }
            } else {
              if (hitRoll > aiConfidence) { target.alive = false; newStats.cropsBurnt++; newFlashes.push({ x: target.x, y: target.y, id: Date.now() + Math.random() }); }
            }
            return { ...rb, x: target.x + (Math.random() - 0.5) * 20, y: target.y + (Math.random() - 0.5) * 20 };
          }));
          setStats((s) => ({ killed: s.killed + newStats.killed, missed: s.missed + newStats.missed, cropsBurnt: s.cropsBurnt + newStats.cropsBurnt }));
          setLaserFlashes(newFlashes);
          return updated;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isRunning, aiConfidence]);

  const totalWeeds = plants.filter((p) => p.isWeed).length;
  const totalWeedsKilled = stats.killed;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30">
              <Bot className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">سرب روبوتات إزالة الأعشاب — Swarm Weeder</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">ليزر ذكي لحرق الأعشاب الضارة دون مبيدات</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", stats.cropsBurnt === 0 && totalWeedsKilled > 0 ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : stats.cropsBurnt > 0 ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {stats.cropsBurnt === 0 && totalWeedsKilled > 0 ? "دقة عالية ✅" : stats.cropsBurnt > 0 ? "أخطاء! ❌" : "بانتظار التشغيل"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 180 200" className="w-full h-full">
              <defs>
                <radialGradient id="laserGlow"><stop offset="0%" stopColor="#22d3ee" stopOpacity="1" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
              </defs>
              <rect width="180" height="200" fill="var(--svg-bg)" rx="8" />

              {/* === Field Grid === */}
              {[...Array(8)].map((_, i) => (<line key={`vg-${i}`} x1={i * 25} y1={0} x2={i * 25} y2={200} stroke="#334155" strokeWidth="0.5" />))}
              {[...Array(8)].map((_, i) => (<line key={`hg-${i}`} x1={0} y1={i * 25} x2={180} y2={i * 25} stroke="#334155" strokeWidth="0.5" />))}

              {/* === Plants === */}
              {plants.map((p) => (
                p.alive && <g key={`plant-${p.id}`}>
                  {p.isWeed ? (
                    <g transform={`translate(${p.x},${p.y})`}>
                      <path d="M0,-4 L2,-2 L4,-4 L2,0 L4,4 L2,2 L0,4 L-2,2 L-4,4 L-2,0 L-4,-4 L-2,-2 Z" fill="#a16207" />
                      <circle cx="0" cy="0" r="3" fill="#854d0e" />
                    </g>
                  ) : (
                    <g transform={`translate(${p.x},${p.y})`}>
                      <ellipse cx="-3" cy="-3" rx="4" ry="6" fill="#22c55e" opacity={0.8} />
                      <ellipse cx="3" cy="-2" rx="4" ry="5" fill="#16a34a" opacity={0.8} />
                      <ellipse cx="0" cy="0" rx="3" ry="4" fill="#4ade80" opacity={0.6} />
                    </g>
                  )}
                </g>
              ))}

              {/* === Robots === */}
              {robots.map((rb) => (
                <motion.g key={`robot-${rb.id}`} animate={{ x: [0, 3, 0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect x={rb.x - 6} y={rb.y - 4} width={12} height={8} rx={3} fill="#475569" stroke="#94a3b8" strokeWidth="0.5" />
                  <circle cx={rb.x - 3} cy={rb.y - 1} r="1.5" fill="#38bdf8" />
                  <circle cx={rb.x + 3} cy={rb.y - 1} r="1.5" fill="#38bdf8" />
                  <rect x={rb.x - 4} y={rb.y + 4} width={2} height={3} rx={0.5} fill="#64748b" />
                  <rect x={rb.x + 2} y={rb.y + 4} width={2} height={3} rx={0.5} fill="#64748b" />
                  <rect x={rb.x - 2} y={rb.y - 6} width={4} height={2} rx={0.5} fill="#84cc16" />
                </motion.g>
              ))}

              {/* === Laser Flashes === */}
              {laserFlashes.map((flash) => (
                <motion.circle key={`flash-${flash.id}`} cx={flash.x} cy={flash.y} r={4} fill="#22d3ee" opacity={0.8}
                  animate={{ r: [4, 12, 4], opacity: [0.8, 0, 0.8] }} transition={{ duration: 0.3 }} />
              ))}

              <text x="90" y="190" textAnchor="middle" fontSize="7" fill="#64748b">أعشاب مقتولة: {totalWeedsKilled} | محاصيل محترقة: {stats.cropsBurnt}</text>
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl p-4 border border-cyan-200 dark:border-cyan-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Crosshair size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-200">دقة الذكاء الاصطناعي</span>
              </div>
              <Slider label="AI Confidence" value={aiConfidence} min={10} max={100} unit="%" color={aiConfidence >= 80 ? "emerald" : aiConfidence >= 50 ? "amber" : "rose"} onChange={(e) => setAiConfidence(Number(e.target.value))} />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-zinc-500 font-medium -mt-1">
                <span>⬅ غير دقيق (أخطاء)</span>
                <span className="text-cyan-400">دقيق جداً ➡</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={toggleRun}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", isRunning ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg" : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/30")}>
                {isRunning ? "⏹ إيقاف" : "▶ تشغيل السرب"}
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300">أعشاب مقتولة</div>
                <div className="text-lg font-black font-mono text-emerald-400">{totalWeedsKilled}</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300">محاصيل محترقة</div>
                <div className={cn("text-lg font-black font-mono", stats.cropsBurnt > 0 ? "text-rose-400" : "text-emerald-400")}>{stats.cropsBurnt}</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300">الدورة</div>
                <div className="text-lg font-black font-mono text-cyan-400">{cycleCount}/10</div>
              </div>
            </div>

            <motion.div key={`swarm-${aiConfidence}-${cycleCount}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {stats.cropsBurnt > 0 ? (
                <Alert type="danger" title="🚨 خطأ فادح — حرق المحصول!">
                  دقة AI منخفضة ({aiConfidence}%). الروبوت أخطأ في التعرف وحرق {stats.cropsBurnt} نبتة محصول!
                  (False Positive). في الحقل الحقيقي، هذا يعني خسارة إنتاج. ارفع مستوى الثقة إلى 80%+ لتجنب الأخطاء.
                  أعشاب مقتولة: {totalWeedsKilled} من {totalWeeds}.
                </Alert>
              ) : totalWeedsKilled > 0 && cycleCount >= 10 ? (
                <Alert type="success" title="✅ عملية ناجحة!">
                  دقة AI {aiConfidence}% — جميع الأعشاب تم حرقها بدقة ({totalWeedsKilled}) دون أي ضرر للمحصول!
                  لا قطرة مبيد واحدة استُخدمت. هذا هو مستقبل الزراعة: روبوتات صغيرة، طاقة شمسية، ليزر دقيق.
                  وفّر المزارع آلاف الدولارات من المبيدات ويدمر التربة.
                </Alert>
              ) : cycleCount > 0 ? (
                <Alert type="info" title="⚙ جاري المسح والاستهداف">
                  دقة AI: {aiConfidence}%. تم حرق {totalWeedsKilled} عشبة. {stats.cropsBurnt > 0 ? `تحذير: ${stats.cropsBurnt} محصول محترق!` : "لا أضرار على المحصول حتى الآن."}
                  انتظر اكتمال 10 دورات للنتيجة النهائية.
                </Alert>
              ) : (
                <Alert type="info" title="🤖 سرب الروبوتات جاهز">
                  اضبط دقة AI ثم شغّل السرب. كلما زادت الدقة، قلّت نسبة الخطأ (حرق المحصول بالخطأ).
                  الهدف: حرق جميع الأعشاب الضارة دون لمس نباتات المحصول.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

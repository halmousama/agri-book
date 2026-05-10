import { useState, useCallback } from "react";
import { Sun, Zap, Thermometer, Leaf, AlertTriangle, CheckCircle, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const AgrivoltaicSim = () => {
  const [temperature, setTemperature] = useState(35);
  const [panelTilt, setPanelTilt] = useState(30);
  const [hasPanels, setHasPanels] = useState(true);

  const plantStress = hasPanels
    ? Math.max(5, (temperature - 25) * 2 - panelTilt * 0.5)
    : Math.max(5, (temperature - 20) * 5);
  const electricityGen = hasPanels ? Math.max(0, 100 - (temperature - 25) * 1.5 + Math.abs(panelTilt - 30) * 0.3) : 0;
  const plantHealth = Math.max(5, 100 - plantStress);
  const coolingEffect = hasPanels ? Math.min(6, (temperature - 20) * 0.15 + panelTilt * 0.02) : 0;
  const panelEfficiency = 100 - Math.abs(temperature - 25) * 1.2 + coolingEffect * 5 + (panelTilt === 30 ? 10 : Math.abs(panelTilt - 30) * 0.5);

  const isOptimal = hasPanels && temperature <= 38 && plantHealth > 70 && panelEfficiency > 70;
  const isWilting = !hasPanels && temperature > 30;
  const isTooHot = temperature > 42 && hasPanels;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg shadow-amber-500/30">
              <Sun className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">الزراعة الكهروضوئية — Agrivoltaics</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">دمج الألواح الشمسية مع الزراعة لتحقيق ربح مضاعف</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", isOptimal ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : isWilting ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {isOptimal ? "تكامل مثالي ✅" : isWilting ? "إجهاد حراري ❌" : "مستقر"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === Sun === */}
              <motion.g transform="translate(160, 30)" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <circle cx="0" cy="0" r="12" fill={temperature > 35 ? "#ef4444" : "#fbbf24"} opacity={0.8} />
                {[...Array(8)].map((_, i) => (
                  <line key={`ray-${i}`} x1={0} y1={0} x2={18 * Math.cos(i * Math.PI / 4)} y2={18 * Math.sin(i * Math.PI / 4)}
                    stroke={temperature > 35 ? "#ef4444" : "#fbbf24"} strokeWidth="1.5" opacity={0.4} />
                ))}
                <text x="0" y="25" textAnchor="middle" fontSize="6" fill="#fbbf24">{temperature}°C</text>
              </motion.g>

              {/* === Solar Panel === */}
              {hasPanels && (
                <motion.g transform={`translate(100, 80)`} animate={{ rotate: panelTilt - 20 }} style={{ transformOrigin: "100px 80px" }}>
                  <rect x="-30" y="-8" width="60" height="16" rx="2" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="0.5" />
                  <rect x="-28" y="-6" width="25" height="12" rx="1" fill="#2563eb" opacity={0.6} />
                  <rect x="-2" y="-6" width="25" height="12" rx="1" fill="#2563eb" opacity={0.6} />
                  <line x1="-25" y1="-2" x2="25" y2="-2" stroke="#60a5fa" strokeWidth="0.3" opacity={0.5} />
                  <line x1="-25" y1="3" x2="25" y2="3" stroke="#60a5fa" strokeWidth="0.3" opacity={0.5} />
                </motion.g>
              )}

              {/* Plants below */}
              <g transform="translate(100, 180)">
                {[...Array(3)].map((_, i) => (
                  <motion.g key={`crop-${i}`} transform={`translate(${-15 + i * 15}, 0)`}
                    animate={{ scale: [1, 1 - plantStress / 200, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
                    <rect x="-1" y="0" width="2" height={10 + i * 2} fill="#78350f" />
                    <ellipse cx="0" cy={-8 - i * 2} rx={plantHealth > 50 ? 8 : 4} ry={plantHealth > 50 ? 5 : 3}
                      fill={plantHealth > 70 ? "#22c55e" : plantHealth > 30 ? "#f59e0b" : "#92400e"} opacity={0.8} />
                  </motion.g>
                ))}
              </g>

              {/* Ground */}
              <rect x="30" y="200" width="140" height="8" rx="2" fill="#78350f" stroke="#92400e" strokeWidth="0.5" />
              {hasPanels && (
                <text x="100" y="225" textAnchor="middle" fontSize="5" fill="#60a5fa">تبريد الألواح: {coolingEffect.toFixed(1)}°C</text>
              )}
              <text x="100" y="245" textAnchor="middle" fontSize="6" fill="#94a3b8">صحة النبات: {plantHealth.toFixed(0)}%</text>
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Thermometer size={16} className="text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-200">الظروف المناخية</span>
              </div>
              <Slider label="شدة الحرارة" value={temperature} min={15} max={50} unit="°C" color={temperature <= 35 ? "emerald" : temperature <= 42 ? "amber" : "rose"} onChange={(e) => setTemperature(Number(e.target.value))} />
            </div>

            {hasPanels && (
              <Slider label="ميل الألواح الشمسية" value={panelTilt} min={0} max={60} unit="°" color="blue" onChange={(e) => setPanelTilt(Number(e.target.value))} />
            )}

            <div className="flex gap-2">
              <button onClick={() => setHasPanels((p) => !p)}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", hasPanels ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30" : "bg-amber-600 text-white shadow-lg shadow-amber-900/30")}>
                {hasPanels ? "🟢 ألواح شمسية مثبتة" : "🔴 بدون ألواح"}
              </button>
              <button onClick={() => { setTemperature(35); setPanelTilt(30); setHasPanels(true); }}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-amber-600 dark:text-amber-300">صحة النبات</div>
                <div className={cn("text-lg font-black font-mono", plantHealth > 70 ? "text-emerald-400" : plantHealth > 30 ? "text-amber-400" : "text-rose-400")}>{plantHealth.toFixed(0)}%</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-amber-600 dark:text-amber-300">الكهرباء</div>
                <div className={cn("text-lg font-black font-mono", hasPanels ? "text-yellow-400" : "text-zinc-500")}>{hasPanels ? `${electricityGen.toFixed(0)}%` : "—"}</div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-amber-600 dark:text-amber-300">كفاءة اللوح</div>
                <div className={cn("text-lg font-black font-mono", panelEfficiency > 70 ? "text-emerald-400" : "text-amber-400")}>{hasPanels ? `${panelEfficiency.toFixed(0)}%` : "—"}</div>
              </div>
            </div>

            <motion.div key={`agri-${hasPanels}-${temperature}-${panelTilt}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {isWilting ? (
                <Alert type="danger" title="🚨 إجهاد حراري — النبات يذبل!">
                  درجة الحرارة {temperature}°C بدون ألواح شمسية. الشمس تحرق النبات مباشرة — الإجهاد {plantStress.toFixed(0)}%.
                  مع الألواح: تظليل يحمي النبات ويبرد اللوح بالنتح. وفّر الكهرباء وأنقذ المحصول!
                </Alert>
              ) : isOptimal ? (
                <Alert type="success" title="✅ تكامل رابح-رابح!">
                  درجة الحرارة {temperature}°C. الألواح تظلل النبات وتحميه — صحة {plantHealth.toFixed(0)}%.
                  النبات يطلق بخار الماء (النتح) فيبرد الألواح من الأسفل — كفاءة الألواح {panelEfficiency.toFixed(0)}%.
                  إنتاج الكهرباء: {electricityGen.toFixed(0)}%. دخل إضافي للمزارع + محصول محمي!
                </Alert>
              ) : isTooHot ? (
                <Alert type="warning" title="⚠ حرارة شديدة — الألواح لا تكفي وحدها">
                  الحرارة {temperature}°C مرتفعة جداً حتى مع الألواح. صحة النبات {plantHealth.toFixed(0)}%.
                  في الحقول الحقيقية، يضاف شبك تظليل إضافي أو محاصيل متحملة للحرارة.
                  الألواح وحدها قد لا تكفي في موجات الحر القصوى.
                </Alert>
              ) : (
                <Alert type="info" title={hasPanels ? "💡 أداء مقبول — قابل للتحسين" : "💡 جرب تركيب الألواح"}>
                  {hasPanels
                    ? `الحرارة ${temperature}°C مع ألواح بميل ${panelTilt}°. اضبط الميل لتحسين التظليل وإنتاج الكهرباء. الميل الأمثل: 30°.`
                    : "بدون ألواح، النبات مكشوف بالكامل. الألواح تحقق دخلين: محصول + كهرباء!"}
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  time: string;
  text: string;
  type: "info" | "success" | "warning" | "error" | "system";
}

const analyzeSteps: LogEntry[] = [
  { time: "13:00:01", text: "System ⚡ Querying ThingsBoard API...", type: "system" },
  { time: "13:00:02", text: "Fetching latest telemetry from Sector 4...", type: "info" },
  { time: "13:00:03", text: "Soil moisture: 28% (threshold: 35%)", type: "warning" },
  { time: "13:00:04", text: "Air temperature: 43.2°C at sensor #7", type: "info" },
  { time: "13:00:05", text: "Querying Open-Meteo forecast API...", type: "info" },
  { time: "13:00:06", text: "Forecast: temp peak at 14:30 (47°C)", type: "warning" },
  { time: "13:00:07", text: "Loading farmOS history for Sector 4...", type: "info" },
  { time: "13:00:08", text: "Last irrigation: 2026-05-12 18:00 (19h ago)", type: "info" },
  { time: "13:00:09", text: "EVapotranspiration rate: 8.2mm/day", type: "info" },
  { time: "13:00:10", text: "Running local LLM (llama3.2-farm-v1)...", type: "system" },
  { time: "13:00:11", text: "--- Reasoning ---", type: "system" },
  { time: "13:00:12", text: "Input: moisture=28%, temp=43.2°C, forecast=47°C peak", type: "info" },
  { time: "13:00:13", text: "Rule #1: Do NOT irrigate during peak heat (>40°C)", type: "info" },
  { time: "13:00:14", text: "Rule #2: ETc loss at 47°C is 80% — water would evaporate", type: "info" },
  { time: "13:00:15", text: "Rule #3: Plants are stressed → irrigating now causes shock", type: "info" },
  { time: "13:00:16", text: "✅ Decision: DELAY irrigation until 18:00", type: "success" },
  { time: "13:00:17", text: "Calculating optimal volume for 18:00 schedule...", type: "info" },
  { time: "13:00:18", text: "Suggested volume: 2.4L/m² (based on VPD = 4.2kPa)", type: "info" },
  { time: "13:00:19", text: "Saving decision to farmOS log...", type: "info" },
  { time: "13:00:20", text: "✅ Analysis complete. Irrigation scheduled for 18:00.", type: "success" },
];

const AiBrainSim = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(true);
  const [irrigationScheduled, setIrrigationScheduled] = useState(false);

  const startAnalysis = useCallback(async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setVisibleLogs(0);
    setIrrigationScheduled(false);

    for (let i = 0; i < analyzeSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 150 + Math.random() * 100));
      setVisibleLogs(i + 1);
    }

    setIsAnalyzing(false);
    setIrrigationScheduled(true);
  }, [isAnalyzing]);

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setVisibleLogs(0);
    setIrrigationScheduled(false);
    setShowAlert(true);
  }, []);

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-blue-500/20 overflow-hidden shadow-2xl shadow-blue-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-blue-500/10 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-blue-500 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-xs font-bold text-blue-400/80 tracking-wider uppercase">
            AI Brain Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          🧠 العقل الرقمي — ThingsBoard + Ollama + farmOS
        </h3>
      </div>

      {/* Split screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* LEFT: ThingsBoard UI */}
        <div className="border-l border-blue-500/10 bg-slate-900/50 min-h-[280px]">
          <div className="px-4 py-2 bg-slate-800/50 border-b border-blue-500/10">
            <span className="text-[10px] font-bold text-blue-400/60">ThingsBoard Dashboard</span>
          </div>
          <div className="p-4 space-y-3">
            {/* Dashboard header */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">Sector 4 — Soil Monitoring</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/20">
                LIVE
              </span>
            </div>

            {/* Moisture gauge */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">رطوبة التربة</span>
                <span className={`text-lg font-extrabold ${showAlert ? 'text-red-400' : 'text-emerald-400'}`}>
                  {showAlert ? '28%' : '45%'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${showAlert ? 'bg-red-500' : 'bg-emerald-500'}`}
                  animate={{ width: showAlert ? '28%' : '45%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-[10px] mt-1 text-slate-500">الحد الأدنى: 35%</div>
            </div>

            {/* Temperature */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">حرارة الهواء</span>
                <span className="text-lg font-extrabold text-orange-400">{showAlert ? '43.2°C' : '38.1°C'}</span>
              </div>
            </div>

            {/* Alert card */}
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl bg-red-900/30 border border-red-500/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-red-400">⚠️ إنذار!</span>
                  </div>
                  <div className="text-[11px] text-red-300 mt-1 leading-relaxed">
                    رطوبة القطاع 4: 28% عند 13:00<br />
                    تجاوزت العتبة الآمنة (35%)
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scheduled notification */}
            <AnimatePresence>
              {irrigationScheduled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400">✅ تم الجدولة</span>
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-1">
                    الري المجدول: 18:00 — 2.4 لتر/م²
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Terminal */}
        <div className="bg-slate-950 min-h-[280px]">
          <div className="px-4 py-2 bg-slate-900 border-b border-blue-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-bold text-slate-500">Ollama Terminal — llama3.2-farm-v1</span>
            </div>
            <span className="text-[10px] text-slate-600">local</span>
          </div>
          <div className="p-4 font-mono text-[11px] leading-relaxed h-[280px] overflow-y-auto" dir="ltr">
            <div className="text-emerald-500 mb-2">
              $ <span className="text-slate-400">ollama run llama3.2-farm-v1</span>
            </div>
            <div className="text-slate-500 mb-2">
              &gt; Analyzing sensor data from Sector 4...
            </div>
            
            {Array.from({ length: visibleLogs }).map((_, i) => {
              const log = analyzeSteps[i];
              const colorMap: Record<string, string> = {
                info: "text-slate-400",
                success: "text-emerald-400",
                warning: "text-amber-400",
                error: "text-red-400",
                system: "text-blue-400",
              };
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${colorMap[log.type]} whitespace-pre-wrap`}
                >
                  <span className="text-slate-600">[{log.time}]</span> {log.text}
                </motion.div>
              );
            })}
            
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-emerald-400 mt-1"
              >
                <span className="animate-pulse">▌</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-4 border-t border-blue-500/10 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              isAnalyzing
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isAnalyzing ? "🤔 جاري التحليل..." : "🤖 اسأل الذكاء المحلي"}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            🔄 إعادة
          </button>
        </div>
      </div>

      {/* Diagnosis Panel */}
      <div className="px-5 py-4 border-t border-blue-500/10 bg-slate-900/80">
        <h4 className="text-xs font-bold text-blue-400/80 mb-3 tracking-wider uppercase">
          🧠 سير عمل الذكاء الاصطناعي
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">١. جمع البيانات</div>
            <div className="text-xs text-slate-400">ThingsBoard يقرأ المستشعرات</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">٢. التحليل</div>
            <div className="text-xs text-slate-400">Ollama يستخدم قواعد المزرعة</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="text-[10px] text-slate-500 mb-1">٣. القرار</div>
            <div className="text-xs text-slate-400">يسجل في farmOS ويُبلغ المزارع</div>
          </div>
        </div>
        {!isAnalyzing && visibleLogs === 0 && (
          <div className="mt-3 p-3 rounded-xl bg-blue-900/30 border border-blue-500/30 text-xs text-blue-300">
            🤖 اضغط "اسأل الذكاء المحلي" لمشاهدة كيف يحلل العقل الرقمي بيانات المستشعرات ويتخذ قرارات ذكية.
          </div>
        )}
      </div>
    </div>
  );
};

export { AiBrainSim };
export default AiBrainSim;

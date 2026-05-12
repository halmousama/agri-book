import { useState, useMemo } from "react";
import { Sun, Cloud, Wind, Gauge, Thermometer, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const SolunarWeatherSim = () => {
  const [pressure, setPressure] = useState(1013);
  const [wind, setWind] = useState(15);
  const [waterTemp, setWaterTemp] = useState(24);
  const [solunarRating, setSolunarRating] = useState(50);

  const fishingScore = useMemo(() => {
    let score = 0;
    if (pressure >= 1010 && pressure <= 1025) score += 30;
    else if (pressure > 1025) score += 20;
    else score += 10;

    if (wind <= 10) score += 30;
    else if (wind <= 20) score += 20;
    else if (wind <= 30) score += 10;
    else score += 0;

    if (waterTemp >= 20 && waterTemp <= 28) score += 20;
    else if (waterTemp >= 15 && waterTemp <= 32) score += 10;
    else score += 5;

    score += (solunarRating / 100) * 20;
    return Math.round(score);
  }, [pressure, wind, waterTemp, solunarRating]);

  const getCondition = () => {
    if (fishingScore >= 80) return { type: "success" as const, title: "🌊 ظروف مثالية — انطلق!", msg: "ضغط مستقر، رياح هادئة، ماء دافئ، ونشاط شمسي/قمري عالٍ. هذا أفضل وقت للصيد. السمك يتغذى بنشاط." };
    if (fishingScore >= 60) return { type: "info" as const, title: "👍 ظروف جيدة", msg: "الظروف مناسبة للصيد. تحقق من توقيت المد والجزر لاختيار أفضل نافذة." };
    if (fishingScore >= 40) return { type: "warning" as const, title: "⚠️ ظروف متوسطة", msg: "الصيد ممكن لكنه قد يكون صعباً. ركز على النقاط العميقة واستخدم طعماً طبيعياً." };
    return { type: "danger" as const, title: "❌ ظروف صعبة", msg: "الرياح القوية أو الضغط المنخفض يجعل السمك كسولاً. فكر في تأجيل الرحلة أو الصيد في القنوات العميقة المحمية." };
  };

  const condition = getCondition();

  const waveHeight = (wind / 50) * 40;
  const sunOpacity = pressure > 1010 ? 1 : 0.3;
  const cloudCount = pressure < 1010 ? 4 : pressure < 1020 ? 2 : 1;

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
              <Cloud className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">محطة الطقس والصيد — Solunar Weather</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">حساب الظروف المثالية للصيد</p>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
            condition.type === "success" ? "bg-emerald-50 border-emerald-300 text-emerald-700" :
            condition.type === "danger" ? "bg-rose-50 border-rose-300 text-rose-700" :
            condition.type === "warning" ? "bg-amber-50 border-amber-300 text-amber-700" :
            "bg-blue-50 border-blue-300 text-blue-700"
          )}>
            التقييم: {fishingScore}/100
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 shrink-0 space-y-2">
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-2">
              <svg viewBox="0 0 240 160" className="w-full h-full">
                <defs>
                  <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={pressure > 1020 ? "#87CEEB" : pressure > 1005 ? "#b0c4de" : "#9ca3af"} />
                    <stop offset="100%" stopColor="#e0f0ff" />
                  </linearGradient>
                  <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1e3a5f" />
                  </linearGradient>
                </defs>

                <rect width="240" height="160" fill="url(#skyGrad2)" rx="8" />

                <motion.circle
                  cx={180} cy={35} r={18}
                  fill="#fbbf24"
                  opacity={sunOpacity}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                  cx={180} cy={35} r={22}
                  fill="#fde68a"
                  opacity={sunOpacity * 0.3}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {Array.from({ length: cloudCount }).map((_, i) => (
                  <motion.g key={i} animate={{ x: [0, 5, 0] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}>
                    <ellipse cx={30 + i * 50} cy={25 + i * 8} rx={15} ry={8} fill="#d1d5db" opacity={0.7} />
                    <ellipse cx={25 + i * 50} cy={23 + i * 8} rx={10} ry={6} fill="#e5e7eb" opacity={0.6} />
                  </motion.g>
                ))}

                {wind > 15 && Array.from({ length: 3 }).map((_, i) => (
                  <motion.line
                    key={i}
                    x1={10} y1={50 + i * 20}
                    x2={60} y2={48 + i * 20}
                    stroke="#94a3b8"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    animate={{ x1: [10, 5], x2: [60, 55] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}

                <motion.path
                  d={`M0,${90 - waveHeight / 2} Q30,${80 - waveHeight} 60,${90 - waveHeight / 2} T120,${90 - waveHeight / 2} T180,${90 - waveHeight / 2} T240,${90 - waveHeight / 2}`}
                  fill="url(#seaGrad)"
                  stroke="#2563eb"
                  strokeWidth="2"
                  animate={{ d: [
                    `M0,${90 - waveHeight / 2} Q30,${80 - waveHeight} 60,${90 - waveHeight / 2} T120,${90 - waveHeight / 2} T180,${90 - waveHeight / 2} T240,${90 - waveHeight / 2}`,
                    `M0,${92 - waveHeight / 2} Q30,${82 - waveHeight} 60,${92 - waveHeight / 2} T120,${92 - waveHeight / 2} T180,${92 - waveHeight / 2} T240,${92 - waveHeight / 2}`,
                  ]}}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />

                <rect x="0" y="92" width="240" height="68" fill="url(#seaGrad)" />

                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.g key={i} animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
                    <text x={40 + i * 70} y={110 + i * 12} fontSize="10">🐟</text>
                  </motion.g>
                ))}

                <text x="120" y="148" fontSize="6" textAnchor="middle" fill="#93c5fd">
                  {wind > 30 ? "بحر هائج" : wind > 15 ? "بحر متوسط" : "بحر هادئ"}
                </text>
              </svg>
            </div>

            <div className={cn(
              "p-3 rounded-xl text-center font-bold text-lg border-2",
              fishingScore >= 80 ? "bg-emerald-50 border-emerald-300 text-emerald-700" :
              fishingScore >= 60 ? "bg-blue-50 border-blue-300 text-blue-700" :
              fishingScore >= 40 ? "bg-amber-50 border-amber-300 text-amber-700" :
              "bg-rose-50 border-rose-300 text-rose-700"
            )}>
              {fishingScore >= 80 ? "🏆 رحلة مثالية!" :
               fishingScore >= 60 ? "✅ وقت مناسب" :
               fishingScore >= 40 ? "⚠️ صيد متوسط" :
               "❌ بحر صعب"}
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <Slider label="الضغط الجوي (hPa)" value={pressure} min={950} max={1050} unit="hPa" color="blue" onChange={(e) => setPressure(Number(e.target.value))} />
            <Slider label="سرعة الرياح (km/h)" value={wind} min={0} max={50} unit="km/h" color="amber" onChange={(e) => setWind(Number(e.target.value))} />
            <Slider label="حرارة الماء (°C)" value={waterTemp} min={10} max={35} unit="°C" color="rose" onChange={(e) => setWaterTemp(Number(e.target.value))} />
            <Slider label="نشاط شمسي/قمري (Solunar)" value={solunarRating} min={0} max={100} unit="%" color="purple" onChange={(e) => setSolunarRating(Number(e.target.value))} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Alert type={condition.type} title={condition.title}>{condition.msg}</Alert>
          <Alert type="info" title="📊 تفاصيل التقييم">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <Gauge size={16} className="inline text-blue-500" />
                <span className="block text-xs mt-1">الضغط: {pressure > 1025 ? "مرتفع" : pressure > 1010 ? "مستقر" : "منخفض"}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <Wind size={16} className="inline text-amber-500" />
                <span className="block text-xs mt-1">الرياح: {wind <= 10 ? "هادئة" : wind <= 20 ? "معتدلة" : wind <= 30 ? "قوية" : "عاصفة"}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <Thermometer size={16} className="inline text-rose-500" />
                <span className="block text-xs mt-1">الماء: {waterTemp >= 20 && waterTemp <= 28 ? "مثالي" : waterTemp > 15 ? "مقبول" : "بارد"}</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                <Sun size={16} className="inline text-purple-500" />
                <span className="block text-xs mt-1">الشمس/القمر: {solunarRating > 70 ? "قوي" : solunarRating > 40 ? "متوسط" : "ضعيف"}</span>
              </div>
            </div>
          </Alert>
        </div>
      </div>
    </div>
  );
};

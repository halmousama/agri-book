import { useState } from "react";
import {
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

type HarvestStage = "early" | "mid" | "late";

export const YieldEstimator = () => {
  const [stage, setStage] = useState<HarvestStage>("mid");

  // === زيتون ===
  const data = {
    early: {
      label: "بداية الموسم (خضري)",
      oilYield: 12,
      quality: "فائقة — نسبة عالية من مضادات الأكسدة",
      color: "#4ade80",
      revenuePerKg: 5.5,
      desc: "زيت بكر ممتاز، حموضة منخفضة، سعر مرتفع",
      fruitLabel: "أخضر",
    },
    mid: {
      label: "منتصف الموسم (نصف ناضج)",
      oilYield: 17,
      quality: "جيدة — توازن بين الكمية والجودة",
      color: "#a855f7",
      revenuePerKg: 4.0,
      desc: "الخيار الأكثر شيوعاً",
      fruitLabel: "نصف ناضج",
    },
    late: {
      label: "نهاية الموسم (أسود ناضج)",
      oilYield: 22,
      quality: "متوسطة — حموضة أعلى",
      color: "#1e293b",
      revenuePerKg: 2.8,
      desc: "كمية زيت عالية لكن جودة أقل",
      fruitLabel: "أسود",
    },
  };

  const current = data[stage];
  const totalOil = 1000 * (current.oilYield / 100);
  const revenue = totalOil * current.revenuePerKg;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-orange-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg shadow-orange-200/50">
              <TrendingUp className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">حاسبة الغلة — Rendement</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">تقدير إنتاج الزيت وجودته حسب مرحلة الحصاد</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              stage === "early"
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : stage === "mid"
                  ? "bg-purple-50 border-purple-300 text-purple-700"
                  : "bg-slate-100 border-slate-400 text-slate-700"
            )}
          >
            {stage === "early" ? "🟢 زيت بكر ممتاز" : stage === "mid" ? "🟣 توازن" : "⚫ نضج كامل"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري (الثمرة) ===== */}
          <div className="w-full lg:w-72 h-auto sm:h-80 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 160 200" className="w-full h-full">
              <defs>
                <radialGradient id="oliveBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#ecfccb" />
                </radialGradient>
              </defs>
              <rect width="160" height="200" fill="url(#oliveBg)" rx="8" />

              {/* الثمرة الكبيرة */}
              <motion.g
                animate={{ scale: stage === "early" ? 0.8 : stage === "late" ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 60 }}
                transform="translate(80, 85)"
              >
                {/* جسم الزيتونة */}
                <motion.ellipse cx="0" cy="0" rx="40" ry="50" fill={current.color} animate={{ fill: current.color }} transition={{ duration: 0.5 }} />
                {/* النقعة */}
                <ellipse cx="-5" cy="-15" rx="7" ry="3.5" fill="white" opacity="0.2" />
                {/* العنق */}
                <path d="M-5,-50 L5,-50 L3,-40 L-3,-40 Z" fill="#4a7c59" />
              </motion.g>

              {/* مراحل النضج */}
              <g transform="translate(40, 168)">
                {(["early", "mid", "late"] as HarvestStage[]).map((s, i) => (
                  <g key={s} transform={`translate(${i * 40}, 0)`}>
                    <circle
                      cx="0" cy="0" r="8"
                      fill={data[s].color}
                      stroke={stage === s ? "#1e293b" : "#cbd5e1"}
                      strokeWidth={stage === s ? 3 : 1}
                      className="cursor-pointer"
                      onClick={() => setStage(s)}
                    />
                    <text x="0" y="-12" textAnchor="middle" fontSize="6" fill="#64748b">{data[s].fruitLabel}</text>
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            {/* أزرار مراحل الحصاد */}
            <div className="grid grid-cols-3 gap-3">
              {(["early", "mid", "late"] as HarvestStage[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={cn(
                    "p-3 rounded-xl font-bold text-sm border-2 transition-all",
                    stage === s
                      ? "ring-2 ring-offset-1 border-slate-800 bg-slate-50"
                      : "border-slate-200 text-slate-500 hover:border-slate-400"
                  )}
                >
                  <div className="text-base mb-1">
                    {s === "early" ? "🟢" : s === "mid" ? "🟣" : "⚫"}
                  </div>
                  <div className="text-[10px]">{data[s].label.split("(")[0].trim()}</div>
                </button>
              ))}
            </div>

            {/* عدادات */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <span className="text-xs font-bold text-amber-800 block">نسبة الزيت (Rendement)</span>
                <span className="text-3xl font-black text-amber-700 font-mono">{current.oilYield}%</span>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-800 block">العائد من طن زيتون</span>
                <span className="text-3xl font-black text-emerald-700 font-mono">{totalOil.toFixed(0)} <span className="text-sm">kg</span></span>
              </div>
            </div>

            {/* الإيرادات */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-bold block mb-1">قيمة الزيت المنتج (طن واحد)</span>
              <span className="text-3xl font-black font-mono text-slate-800 dark:text-white">
                ${revenue.toFixed(0)}
              </span>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                السعر: ${current.revenuePerKg}/kg — جودة: {current.quality}
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`yield-${stage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {stage === "early" ? (
                <Alert type="success" title="🟢 حصاد مبكر — جودة فائقة">
                  rendement {current.oilYield}% فقط (أقل كمية زيت)، لكن الجودة فائقة —
                  سعر البيع ${current.revenuePerKg}/kg. العائد الإجمالي ${revenue.toFixed(0)} للطن.
                  الزيت غني بالبوليفينول (مضادات أكسدة) ويباع كزيت بكر ممتاز.
                </Alert>
              ) : stage === "mid" ? (
                <Alert type="info" title="🟣 حصاد منتصف الموسم — التوازن الأكثر ربحية">
                  rendement {current.oilYield}%، جودة جيدة بسعر ${current.revenuePerKg}/kg.
                  العائد ${revenue.toFixed(0)} للطن — التوازن الأكثر ربحية للأغلبية.
                </Alert>
              ) : (
                <Alert type="warning" title="⚫ حصاد متأخر — أعلى كمية لكن أدنى جودة">
                  rendement {current.oilYield}% (أعلى كمية زيت)، لكن جودة أقل —
                  سعر ${current.revenuePerKg}/kg. العائد ${revenue.toFixed(0)} للطن.
                  الزيت مناسب للتصنيع وليس للاستهلاك المباشر.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

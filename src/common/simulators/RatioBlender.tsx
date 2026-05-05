import { useState } from "react";
import {
  FlaskConical,
  Droplets,
  AlertOctagon,
  CheckCircle2,
  Scale,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const RatioBlender = () => {
  const [recDose, setRecDose] = useState(200);
  const [recWater, setRecWater] = useState(100);
  const [actualTank, setActualTank] = useState(16);
  const [userDose, setUserDose] = useState(32);

  const requiredDose = (recDose * actualTank) / recWater;

  const isCorrect = Math.abs(userDose - requiredDose) < 2;
  const isOverdose = userDose > requiredDose + 2;
  const isUnderdose = userDose < requiredDose - 2;

  const diffPercent = requiredDose > 0
    ? Math.abs((userDose - requiredDose) / requiredDose) * 100
    : 0;

  const statusColor = isCorrect
    ? "bg-emerald-100 text-emerald-700 border-emerald-300"
    : isOverdose
      ? "bg-red-100 text-red-700 border-red-300"
      : "bg-amber-100 text-amber-700 border-amber-300";
  const statusText = isCorrect
    ? "✅ جرعة دقيقة"
    : isOverdose
      ? "🔴 جرعة زائدة"
      : "🟡 جرعة ناقصة";

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-amber-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Scale className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                مختبر التراكيز (القاعدة الثلاثية)
              </h3>
              <p className="text-xs text-slate-500">
                خلط المبيدات — الحسابات الدقيقة للجرعات
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 font-mono",
              statusColor
            )}
            animate={!isCorrect ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {statusText}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-80 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 260 220" className="w-full h-full">
              <defs>
                <linearGradient id="waterBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="doseRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fda4af" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
                </linearGradient>
                <filter id="glowRatio">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect
                x="0"
                y="0"
                width="260"
                height="220"
                fill="#fafaf9"
                rx="8"
              />

              {/* === Formula display === */}
              <g transform="translate(130, 20)">
                <rect
                  x="-120"
                  y="-15"
                  width="240"
                  height="50"
                  rx="10"
                  fill="#1e293b"
                  opacity="0.9"
                />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fontSize="9"
                  fill="#94a3b8"
                  fontWeight="bold"
                >
                  الحساب الصحيح (القاعدة الثلاثية)
                </text>
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  <tspan fill="#fbbf24">({recDose}</tspan>
                  <tspan fill="#64748b"> × </tspan>
                  <tspan fill="#60a5fa">{actualTank}</tspan>
                  <tspan fill="#64748b">) ÷ </tspan>
                  <tspan fill="#60a5fa">{recWater}</tspan>
                  <tspan fill="#22c55e"> = {requiredDose.toFixed(1)} ml</tspan>
                </text>
              </g>

              {/* === Visual tanks comparison === */}

              {/* Label bottle */}
              <g transform="translate(30, 85)">
                <rect
                  x="-20"
                  y="-5"
                  width="100"
                  height="18"
                  rx="4"
                  fill="#fef2f2"
                  stroke="#fecaca"
                  strokeWidth="1"
                />
                <text
                  x="30"
                  y="8"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#9f1239"
                  fontWeight="bold"
                >
                  توصية العبوة
                </text>
              </g>

              {/* Recommended dose */}
              <g transform="translate(30, 110)">
                <rect
                  x="-15"
                  y="0"
                  width="40"
                  height="50"
                  rx="4"
                  fill="url(#doseRed)"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                />
                <text
                  x="5"
                  y="30"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#9f1239"
                  fontWeight="bold"
                >
                  {recDose}ml
                </text>
                <text
                  x="5"
                  y="65"
                  textAnchor="middle"
                  fontSize="6"
                  fill="#64748b"
                >
                  دواء
                </text>
              </g>

              {/* Water */}
              <g transform="translate(80, 110)">
                <rect
                  x="-15"
                  y="0"
                  width="40"
                  height="50"
                  rx="4"
                  fill="url(#waterBlue)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <text
                  x="5"
                  y="30"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#1e40af"
                  fontWeight="bold"
                >
                  {recWater}L
                </text>
                <text
                  x="5"
                  y="65"
                  textAnchor="middle"
                  fontSize="6"
                  fill="#64748b"
                >
                  ماء
                </text>
              </g>

              {/* === Your tank vs your dose === */}
              <g transform="translate(170, 85)">
                <rect
                  x="-30"
                  y="-5"
                  width="120"
                  height="18"
                  rx="4"
                  fill="#eff6ff"
                  stroke="#bfdbfe"
                  strokeWidth="1"
                />
                <text
                  x="30"
                  y="8"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#1e40af"
                  fontWeight="bold"
                >
                  خزانك
                </text>
              </g>

              <g transform="translate(170, 110)">
                {/* Tank */}
                <rect
                  x="-15"
                  y="0"
                  width="40"
                  height={Math.min(50, actualTank * 0.3)}
                  rx="4"
                  fill="url(#waterBlue)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <text
                  x="5"
                  y={Math.min(50, actualTank * 0.3) + 15}
                  textAnchor="middle"
                  fontSize="7"
                  fill="#1e40af"
                  fontWeight="bold"
                >
                  {actualTank}L
                </text>
                <text
                  x="5"
                  y={Math.min(50, actualTank * 0.3) + 28}
                  textAnchor="middle"
                  fontSize="6"
                  fill="#64748b"
                >
                  خزان
                </text>

                {/* Your dose */}
                <rect
                  x="55"
                  y={50 - Math.min(40, (userDose / 5) * 0.8)}
                  width="30"
                  height={Math.min(40, (userDose / 5) * 0.8)}
                  rx="3"
                  fill={
                    isCorrect
                      ? "#22c55e"
                      : isOverdose
                        ? "#ef4444"
                        : "#f59e0b"
                  }
                  opacity="0.8"
                  stroke={
                    isCorrect
                      ? "#16a34a"
                      : isOverdose
                        ? "#dc2626"
                        : "#d97706"
                  }
                  strokeWidth="1.5"
                />
                <text
                  x="70"
                  y={50 - Math.min(40, (userDose / 5) * 0.8) - 5}
                  textAnchor="middle"
                  fontSize="7"
                  fill={
                    isCorrect
                      ? "#16a34a"
                      : isOverdose
                        ? "#dc2626"
                        : "#d97706"
                  }
                  fontWeight="bold"
                >
                  {userDose}ml
                </text>
                <text
                  x="70"
                  y="95"
                  textAnchor="middle"
                  fontSize="6"
                  fill="#64748b"
                >
                  جرعتك
                </text>
              </g>

              {/* Bottom info: required dose */}
              <g transform="translate(5, 198)">
                <rect
                  x="0"
                  y="0"
                  width="250"
                  height="16"
                  rx="4"
                  fill="white"
                  opacity="0.85"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x="5"
                  y="11"
                  fontSize="6"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  الجرعة المطلوبة
                </text>
                <rect
                  x="75"
                  y="3"
                  width="120"
                  height="10"
                  rx="3"
                  fill="#e2e8f0"
                />
                <motion.rect
                  x="75"
                  y="3"
                  height="10"
                  rx="3"
                  fill={
                    isCorrect
                      ? "#22c55e"
                      : isOverdose
                        ? "#ef4444"
                        : "#f59e0b"
                  }
                  animate={{
                    width: `${Math.min(120, (requiredDose / 200) * 120)}px`,
                  }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text
                  x="200"
                  y="11"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="#1e293b"
                  fontWeight="bold"
                >
                  {requiredDose.toFixed(1)} ml
                </text>
              </g>
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            {/* Label data */}
            <div className="bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 p-3">
              <h4 className="text-[10px] font-bold text-slate-500 mb-2 text-center">
                مكتوب على علبة المبيد:
              </h4>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <input
                    type="number"
                    value={recDose}
                    onChange={(e) => setRecDose(Number(e.target.value))}
                    className="w-16 p-1.5 text-center rounded-lg border font-mono font-bold text-rose-600 text-sm"
                  />
                  <span className="block text-[9px] mt-0.5 font-bold text-slate-500">
                    ملل (دواء)
                  </span>
                </div>
                <span className="font-bold text-slate-400 text-xs">لكل</span>
                <div className="text-center">
                  <input
                    type="number"
                    value={recWater}
                    onChange={(e) => setRecWater(Number(e.target.value))}
                    className="w-16 p-1.5 text-center rounded-lg border font-mono font-bold text-blue-600 text-sm"
                  />
                  <span className="block text-[9px] mt-0.5 font-bold text-slate-500">
                    لتر (ماء)
                  </span>
                </div>
              </div>
            </div>

            <Slider
              label="حجم خزان الرش"
              value={actualTank}
              min={5}
              max={200}
              unit="L"
              color="blue"
              onChange={(e) => setActualTank(Number(e.target.value))}
            />
            <Slider
              label="الجرعة التي ستضعها"
              value={userDose}
              min={0}
              max={200}
              unit="ml"
              color={isOverdose ? "rose" : isUnderdose ? "amber" : "emerald"}
              onChange={(e) => setUserDose(Number(e.target.value))}
            />

            {/* Quick metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl border p-2",
                  isCorrect
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-white border-slate-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600">
                  الجرعة الصحيحة
                </div>
                <div className="text-sm font-black font-mono text-emerald-600">
                  {requiredDose.toFixed(1)} ml
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl border p-2",
                  isOverdose
                    ? "bg-red-50 border-red-200"
                    : isUnderdose
                      ? "bg-amber-50 border-amber-200"
                      : "bg-emerald-50 border-emerald-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-600">
                  فرق الجرعة
                </div>
                <div
                  className={cn(
                    "text-sm font-black font-mono",
                    isCorrect
                      ? "text-emerald-600"
                      : isOverdose
                        ? "text-red-600"
                        : "text-amber-600"
                  )}
                >
                  {isCorrect
                    ? "✓"
                    : `${(userDose - requiredDose > 0 ? "+" : "")}${(userDose - requiredDose).toFixed(1)} ml`}
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`ratio-${userDose}-${actualTank}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCorrect ? (
                <Alert
                  type="success"
                  title="✅ جرعة هندسية دقيقة!"
                >
                  التركيز مطابق تماماً لتوصية المصنع. الجرعة الصحيحة هي{" "}
                  {requiredDose.toFixed(1)} ملل لخزان {actualTank}L. ستقضي على
                  الآفة دون الإضرار بالنبات أو إهدار المال. نسبة الخطأ أقل من
                  2%.
                </Alert>
              ) : isOverdose ? (
                <Alert
                  type="danger"
                  title={`🔴 خطر: تسمم واحتراق! (زيادة ${diffPercent.toFixed(0)}%)`}
                >
                  أنت تضع سموم أكثر من اللازم! الجرعة المطلوبة هي{" "}
                  {requiredDose.toFixed(1)} ملل فقط. الزيادة ستحرق أوراق النبات
                  وتترك متبقيات كيميائية سامة في الثمار. هذا خطر على المستهلك
                  والبيئة.
                </Alert>
              ) : (
                <Alert
                  type="warning"
                  title={`🟡 تنبيه: جرعة ضعيفة (نقص ${diffPercent.toFixed(0)}%)`}
                >
                  المبيد سيكون مخففاً جداً (مثل الماء). الجرعة المطلوبة هي{" "}
                  {requiredDose.toFixed(1)} ملل. الآفة لن تموت، بل ستكتسب مناعة
                  ضد المبيد في المرة القادمة! ضع الجرعة الصحيحة تماماً.
                </Alert>
              )}
            </motion.div>

            {isCorrect && (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 القاعدة الثلاثية: (الجرعة الموصى بها × حجم خزانك) ÷ حجم
                الماء الموصى به = الجرعة الصحيحة لك.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

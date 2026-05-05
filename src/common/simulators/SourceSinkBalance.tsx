import { useState } from "react";
import {
  Scissors,
  Apple,
  Leaf,
  Scale,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const SourceSinkBalance = () => {
  const [leafCount, setLeafCount] = useState(20);
  const [fruitCount, setFruitCount] = useState(12);

  // === ميزانية الكربون ===
  // كل ورقة تنتج وحدة سكر واحدة
  // كل ثمرة تستهلك 2 وحدة سكر
  const totalSugar = leafCount * 5; // source
  const requiredSugar = fruitCount * 8; // sink
  const sugarPerFruit = fruitCount > 0 ? Math.min(totalSugar / fruitCount, 12) : 0;

  const isDeficit = requiredSugar > totalSugar;
  const surplus = totalSugar - requiredSugar;

  // حجم الثمرة ولونها (حسب السكر المتاح)
  const fruitScale = Math.min(sugarPerFruit / 8, 1.5);
  const fruitColor =
    sugarPerFruit < 4
      ? "#fde047"
      : sugarPerFruit < 7
        ? "#f97316"
        : "#dc2626";

  const thinFruits = () => {
    setFruitCount((prev) => Math.max(1, prev - 2));
  };

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-emerald-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl shadow-lg shadow-emerald-200/50">
              <Scale className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">ميزانية الكربون (Source-Sink)</h3>
              <p className="text-xs text-slate-500">توازن المصدر والمصرف في النبات</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isDeficit
                ? "bg-red-50 border-red-300 text-red-700"
                : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
            animate={isDeficit ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isDeficit ? "⚠ عجز كربوني" : "✅ فائض كربوني"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <radialGradient id="skyGradSrc" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#d1fae5" />
                </radialGradient>
                <filter id="glowFruit">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="200" height="280" fill="url(#skyGradSrc)" rx="8" />

              {/* === الميزان (Scale) === */}
              <g transform="translate(100, 245)">
                {/* قاعدة الميزان */}
                <rect x="-4" y="-5" width="8" height="10" fill="#475569" rx="2" />
                <path d="M-60,0 L60,0" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

                {/* كفة اليسار (المصدر = الأوراق) */}
                <motion.path
                  d={isDeficit ? "M-60,0 Q-70,30 -90,0" : "M-60,0 Q-70,-10 -90,0"}
                  stroke="#475569"
                  strokeWidth="3"
                  fill="none"
                  animate={{ d: isDeficit ? "M-60,0 Q-70,30 -90,0" : "M-60,0 Q-70,-10 -90,0" }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <motion.g
                  animate={{ x: isDeficit ? -30 : -10, y: isDeficit ? 25 : -5 }}
                  transition={{ type: "spring", stiffness: 60 }}
                >
                  <Leaf size={14} className="text-emerald-500" x="-105" y="-10" />
                </motion.g>

                {/* كفة اليمين (المصرف = الثمار) */}
                <motion.path
                  d={isDeficit ? "M60,0 Q70,-30 90,0" : "M60,0 Q70,10 90,0"}
                  stroke="#475569"
                  strokeWidth="3"
                  fill="none"
                  animate={{ d: isDeficit ? "M60,0 Q70,-30 90,0" : "M60,0 Q70,10 90,0" }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <motion.g
                  animate={{ x: isDeficit ? 30 : 10, y: isDeficit ? -25 : 5 }}
                  transition={{ type: "spring", stiffness: 60 }}
                >
                  <Apple size={14} className="text-red-500" x="95" y="-10" />
                </motion.g>
              </g>

              {/* === الشجرة (فوق) === */}
              {/* الجذع */}
              <rect x="90" y="130" width="20" height="70" fill="#78350f" rx="3" />

              {/* تاج الشجرة (الأوراق) */}
              <g transform="translate(100, 100)">
                {Array.from({ length: Math.min(leafCount, 30) }).map((_, i) => {
                  const angle = (i / 30) * Math.PI * 2;
                  const r = 30 + Math.random() * 20;
                  return (
                    <circle
                      key={`leaf-${i}`}
                      cx={Math.cos(angle) * r}
                      cy={Math.sin(angle) * r - 10}
                      r="8"
                      fill="#22c55e"
                      opacity="0.7"
                    />
                  );
                })}

                {/* الثمار على الشجرة */}
                {Array.from({ length: Math.min(fruitCount, 15) }).map((_, i) => {
                  const angle = (i / 15) * Math.PI * 2 + 0.5;
                  const r = 25 + Math.random() * 15;
                  return (
                    <motion.circle
                      key={`fruit-${i}`}
                      cx={Math.cos(angle) * r}
                      cy={Math.sin(angle) * r + 10}
                      fill={fruitColor}
                      animate={{
                        r: isDeficit ? 4 : 6 * fruitScale,
                        fill: isDeficit ? "#fde047" : fruitColor,
                      }}
                      filter="url(#glowFruit)"
                      transition={{ type: "spring", stiffness: 60 }}
                    />
                  );
                })}
              </g>

              {/* مؤشر الميزانية */}
              <g transform="translate(10, 260)">
                <rect x="0" y="0" width="180" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="0" y="0" height="6" rx="3"
                  fill={isDeficit ? "#ef4444" : "#22c55e"}
                  animate={{ width: `${(sugarPerFruit / 12) * 100}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </g>

              {/* تسميات */}
              <text x="30" y="230" fontSize="10" fill="#16a34a" fontWeight="bold" textAnchor="middle">مصدر</text>
              <text x="170" y="230" fontSize="10" fill="#dc2626" fontWeight="bold" textAnchor="middle">مصرف</text>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Slider
                label="عدد الأوراق (المصدر)"
                value={leafCount}
                min={5}
                max={40}
                unit="ورقة"
                color="emerald"
                onChange={(e) => setLeafCount(Number(e.target.value))}
              />
              <Slider
                label="عدد الثمار (المصرف)"
                value={fruitCount}
                min={1}
                max={25}
                unit="ثمرة"
                color="rose"
                onChange={(e) => setFruitCount(Number(e.target.value))}
              />
            </div>

            {/* الميزانية الرقمية */}
            <div className="bg-slate-800 text-white rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400 font-bold">السكر المتاح لكل ثمرة</span>
                <span className={`font-mono font-black text-2xl ${isDeficit ? "text-red-400" : "text-emerald-400"}`}>
                  {sugarPerFruit.toFixed(1)}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isDeficit ? "bg-red-500" : "bg-emerald-500"}`}
                  animate={{ width: `${(sugarPerFruit / 12) * 100}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>محتاج: {requiredSugar}</span>
                <span>متاح: {totalSugar}</span>
                <span>{isDeficit ? `عجز: ${-surplus}` : `فائض: ${surplus}`}</span>
              </div>
            </div>

            {/* زر الخف السريع */}
            <button
              onClick={thinFruits}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all active:scale-[0.97] shadow-lg flex items-center justify-center gap-2"
            >
              <Scissors size={18} /> خف الثمار (أزل 2)
            </button>

            {/* التشخيص */}
            <motion.div
              key={`ss-${sugarPerFruit.toFixed(1)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isDeficit ? (
                <Alert type="danger" title="🚨 عجز كربوني!">
                  {fruitCount} ثمرة تستهلك {requiredSugar} وحدة، والأوراق {leafCount} تنتج {totalSugar} فقط.
                  الاحتياجات تتجاوز الإنتاج. الثمار صغيرة الحجم (Brix منخفض).
                  استخدم المقص لخف الثمار — إزالة ثمرتين سترفع السكر المتاح للثمار المتبقية من {sugarPerFruit.toFixed(1)} إلى {((totalSugar) / Math.max(fruitCount - 2, 1)).toFixed(1)}.
                </Alert>
              ) : sugarPerFruit > 10 ? (
                <Alert type="success" title="✅ فائض كبير — ثمار عملاقة!">
                  الأوراق {leafCount} تنتج أكثر مما تستهلكه الثمار {fruitCount}. الثمار ستنمو كبيرة جداً ذات جودة عالية (Brix عالي). كل ثمرة تحصل على {sugarPerFruit.toFixed(1)} من أصل 12 المثالية.
                </Alert>
              ) : (
                <Alert type="success" title="✅ توازن ممتاز">
                  {leafCount} ورقة تنتج {totalSugar} وحدة سكر تكفي {fruitCount} ثمرة. كل ثمرة تحصل على {sugarPerFruit.toFixed(1)} من أصل 12 المثالية. مستوى سكر مثالي لنمو متوازن.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

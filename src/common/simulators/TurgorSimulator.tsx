import { useState } from "react";
import { Droplets, AlertTriangle, CheckCircle, Sprout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const TurgorSimulator = () => {
  const [waterLevel, setWaterLevel] = useState(50);

  // === حسابات الفيزياء الحيوية ===
  // حجم الفجوة يتغير خطياً
  const vacuoleScale = 0.4 + (waterLevel / 100) * 0.6;
  const cellColor = waterLevel > 50 ? "#4ade80" : "#a3e635";

  // معامل الذبول (1 = ذابلة تماماً، 0 = منتصبة)
  const wiltFactor = 1 - waterLevel / 100;

  // إحداثيات رأس الساق
  const stemTipX = 100 + wiltFactor * 60;
  const stemTipY = 50 + wiltFactor * 80;
  const curveControlX = 100 + wiltFactor * 20;
  const curveControlY = 120;
  const leafDroop = wiltFactor * 40;

  const isWilting = waterLevel < 30;
  const isHealthy = waterLevel > 70;
  const isModerate = waterLevel >= 30 && waterLevel <= 70;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg shadow-emerald-200/50">
              <Droplets className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">مختبر ضغط الامتلاء — Turgor</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">قوة الماء داخل الخلية تمنع النبات من الذبول</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isWilting
                ? "bg-red-50 border-red-300 text-red-700"
                : isModerate
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
            animate={isWilting ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isWilting ? "⚠ ذبول — فقدان الضغط" : isHealthy ? "✅ منتصب — ضغط ممتاز" : "🌱 ضغط متوسط"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري المزدوج ===== */}
          <div className="w-full lg:w-80 shrink-0 space-y-2">
            {/* الخلية (المجهر) */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-2 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">
              <svg viewBox="0 0 200 180" className="w-full h-full">
                <defs>
                  <radialGradient id="cellBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0fdf4" />
                    <stop offset="100%" stopColor="#dcfce7" />
                  </radialGradient>
                  <filter id="cellGlow">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>
                <rect width="200" height="180" fill="url(#cellBg)" rx="8" />

                {/* الجدار الخلوي */}
                <path
                  d="M100,15 C155,15 185,60 185,100 C185,145 155,165 100,165 C45,165 15,145 15,100 C15,60 45,15 100,15 Z"
                  fill="#ecfccb"
                  stroke="#3f6212"
                  strokeWidth="5"
                />
                {/* الفجوة العصارية */}
                <motion.path
                  d="M100,25 C135,25 175,60 175,100 C175,135 135,165 100,165 C65,165 25,135 25,100 C25,60 65,25 100,25 Z"
                  fill="#3b82f6"
                  fillOpacity="0.7"
                  animate={{ scale: vacuoleScale }}
                  style={{ transformOrigin: "100px 95px" }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="100" y="100" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                  {waterLevel > 30 ? "ماء" : "⚠ جفاف"}
                </text>
                <text x="100" y="175" textAnchor="middle" fontSize="8" fill="#64748b">داخل الخلية (المسبب)</text>
              </svg>
            </div>

            {/* النبتة (الحقل) */}
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-2 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <radialGradient id="plantBg" cx="50%" cy="80%" r="60%">
                    <stop offset="0%" stopColor="#f0fdf4" />
                    <stop offset="100%" stopColor="#d1fae5" />
                  </radialGradient>
                </defs>
                <rect width="200" height="200" fill="url(#plantBg)" rx="8" />

                {/* التربة */}
                <path d="M20,190 Q100,180 180,190" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* الساق: منحنى بيزيه ديناميكي */}
                <motion.path
                  d={`M 100,190 Q ${curveControlX},${curveControlY} ${stemTipX},${stemTipY}`}
                  stroke={cellColor}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ d: `M 100,190 Q ${curveControlX},${curveControlY} ${stemTipX},${stemTipY}` }}
                  transition={{ type: "spring", stiffness: 50 }}
                />

                {/* ورقة يمنى */}
                <motion.g
                  animate={{ transform: `translate(${100 + wiltFactor * 10}px, ${130 + wiltFactor * 20}px)` }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  <path d={`M 0,0 Q 20,-20 30,${-10 + leafDroop} Q 10,${10 + leafDroop} 0,0`} fill={cellColor} />
                </motion.g>

                {/* ورقة يسرى */}
                <motion.g
                  animate={{ transform: `translate(${100 + wiltFactor * 5}px, ${100 + wiltFactor * 30}px)` }}
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  <path d={`M 0,0 Q -20,-20 -30,${-10 + leafDroop} Q -10,${10 + leafDroop} 0,0`} fill={cellColor} />
                </motion.g>

                {/* الزهرة في القمة */}
                <motion.circle
                  cx={stemTipX} cy={stemTipY} r="8"
                  fill={isWilting ? "#fde047" : "#fbbf24"}
                  animate={{ cx: stemTipX, cy: stemTipY }}
                  transition={{ type: "spring", stiffness: 50 }}
                />

                <text x="100" y="198" textAnchor="middle" fontSize="8" fill="#64748b">في الحقل (النتيجة)</text>
              </svg>
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="مستوى الماء في الخلية"
              value={waterLevel}
              min={0}
              max={100}
              unit="%"
              color={waterLevel < 20 ? "rose" : waterLevel < 50 ? "amber" : "emerald"}
              onChange={(e) => setWaterLevel(Number(e.target.value))}
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium -mt-2">
              <span className="text-red-500">ذبول وانحناء</span>
              <span className="text-emerald-500">انتصاب وقوة</span>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`turgor-${waterLevel}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isWilting ? (
                <Alert type="danger" title={`⚠ ذبول — فقدان ضغط الامتلاء (${waterLevel}%)`}>
                  انخفاض الماء يفقد الخلايا ضغطها، فتخضع النبتة للجاذبية وتنحني.
                  الفجوة العصارية تقلصت إلى {Math.round(vacuoleScale * 100)}% من حجمها الأقصى.
                  الثغور أغلقت، النتح توقف، النبتة في حالة إنقاذ ذاتي.
                  اسقِ فوراً لاستعادة الانتصاب!
                </Alert>
              ) : isHealthy ? (
                <Alert type="success" title={`✅ ضغط امتلاء ممتاز — نبتة منتصبة (${waterLevel}%)`}>
                  الفجوة العصارية ممتلئة بالماء ({Math.round(vacuoleScale * 100)}% من الحجم الأقصى).
                  ضغط الماء يدفع جدار الخلية للخارج محافظاً على صلابة النبتة وانتصابها.
                  الثغور مفتوحة والتمثيل الضوئي في ذروته!
                </Alert>
              ) : (
                <Alert type="info" title={`🌱 ضغط متوسط (${waterLevel}%)`}>
                  الفجوة في منتصف الامتلاء. النبتة منتصبة لكن بدون احتياطي.
                  راقب حالة التربة — إذا انخفض الماء أكثر، ستبدأ أعراض الذبول.
                  الفجوة العصارية الآن عند {Math.round(vacuoleScale * 100)}% من حجمها.
                </Alert>
              )}
            </motion.div>

            <div className="p-4 rounded-xl border text-sm bg-white shadow-sm text-slate-600 text-center">
              <p className="font-bold">💡 التورغر (Turgor):</p>
              <p>انخفاض الماء يفقد الخلايا ضغطها، فتخضع النبتة للجاذبية وتنحني.<br />
              عندما يمتلئ الماء، تنتصب وكأنها تضخ بالهواء!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

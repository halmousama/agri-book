import { useState } from "react";
import { Thermometer, CloudFog, Droplets, AlertTriangle, CheckCircle, Wind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const StateChange = () => {
  const [heat, setHeat] = useState(20); // 0 (frozen) -> 100 (boiling)

  // عدد الجزيئات المتطايرة (البخار) يعتمد على الحرارة
  const steamCount = Math.floor((heat / 100) * 20);

  // لون الماء (أزرق بارد -> أحمر ساخن)
  const waterColor = heat > 80 ? "#ef4444" : (heat > 50 ? "#f59e0b" : "#3b82f6");

  const isFrozen = heat < 10;
  const isBoiling = heat > 80;
  const isEvaporating = heat >= 30 && heat <= 80;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-cyan-200 dark:border-cyan-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg shadow-cyan-200/50">
              <CloudFog className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">مختبر التبخر — حالات الماء</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">صلب ↔ سائل ↔ غاز — دورة الماء في الطبيعة</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isBoiling
                ? "bg-red-50 border-red-300 text-red-700"
                : isEvaporating
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-blue-50 border-blue-300 text-blue-700"
            )}
            animate={isBoiling ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isFrozen ? "❄ متجمد (صلب)" : isBoiling ? "♨ غاز (بخار)" : isEvaporating ? "💧 تبخر نشط" : "🌊 سائل (بارد)"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="waterGradState" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={waterColor} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={waterColor} stopOpacity="0.3" />
                </linearGradient>
                <filter id="steamBlur">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              <rect width="200" height="280" fill="#f8fafc" rx="8" />

              {/* الغطاء الزجاجي (السقف) */}
              <rect x="20" y="10" width="160" height="8" rx="4" fill="#cbd5e1" opacity="0.8" />
              <text x="100" y="8" textAnchor="middle" fontSize="7" fill="#64748b" fontWeight="bold">سقف بارد (تكثف)</text>

              {/* قطرات التكثف على السقف */}
              <AnimatePresence>
                {heat > 60 && (
                  <g>
                    {[40, 80, 120, 160].map((x, i) => (
                      <motion.g key={`drop-${i}`}>
                        <Droplets
                          size={10}
                          x={x}
                          y={16}
                          className="text-blue-400"
                          style={{ animationDelay: `${i * 0.5}s` }}
                        />
                      </motion.g>
                    ))}
                  </g>
                )}
              </AnimatePresence>

              {/* بخار الماء (جزيئات متحركة) */}
              <AnimatePresence>
                {Array.from({ length: steamCount }).map((_, i) => (
                  <motion.circle
                    key={`steam-${i}`}
                    r="4"
                    fill="white"
                    opacity="0.5"
                    filter="url(#steamBlur)"
                    initial={{ x: 40 + Math.random() * 120, y: 200, opacity: 0.4 }}
                    animate={{
                      y: [200, 60 + Math.random() * 40],
                      x: 40 + Math.random() * 120,
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* الماء السائل (القاع) */}
              <motion.rect
                x="30"
                y={200}
                width="140"
                height={80}
                rx="6"
                fill="url(#waterGradState)"
                animate={{ fill: waterColor }}
                transition={{ duration: 0.5 }}
              />
              <text x="100" y={240} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold" opacity="0.8">ماء سائل</text>

              {/* فقاعات الغليان */}
              <AnimatePresence>
                {isBoiling && (
                  <g>
                    {[60, 90, 120, 150].map((x, i) => (
                      <motion.circle
                        key={`bub-${i}`}
                        cx={x}
                        cy={200}
                        r="3"
                        fill="white"
                        opacity="0.6"
                        animate={{ cy: [200, 170, 150], opacity: [0.6, 0.3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </g>
                )}
              </AnimatePresence>

              {/* مصدر الحرارة (نار/شمس) في القاع */}
              <motion.rect
                x="60"
                y="258"
                width="80"
                height="8"
                rx="4"
                fill="#ef4444"
                opacity={heat / 100}
                animate={{ opacity: heat / 100 }}
                transition={{ duration: 0.3 }}
              />
              <motion.rect
                x="65"
                y="262"
                width="70"
                height="4"
                rx="2"
                fill="#f59e0b"
                opacity={heat > 50 ? (heat - 50) / 50 : 0}
                animate={{ opacity: heat > 50 ? (heat - 50) / 50 : 0 }}
              />

              {/* مؤشر الحالة */}
              <g transform="translate(10, 250)">
                <rect x="0" y="0" width="180" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="0" y="0" height="6" rx="3"
                  fill={isBoiling ? "#ef4444" : isEvaporating ? "#f59e0b" : "#3b82f6"}
                  animate={{ width: `${heat}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="90" y="-4" textAnchor="middle" fontSize="6" fill="#64748b">{heat}°C</text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="الحرارة (الطاقة)"
              value={heat}
              min={0}
              max={100}
              unit="°C"
              color={heat > 80 ? "rose" : heat > 50 ? "amber" : "blue"}
              onChange={(e) => setHeat(Number(e.target.value))}
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-medium -mt-2 px-1">
              <span className="text-blue-500">❄ متجمد</span>
              <span className="text-amber-500">☀ تبخر</span>
              <span className="text-red-500">♨ غليان</span>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`state-${heat}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isBoiling ? (
                <Alert type="danger" title="♨ غليان — تحول سريع إلى بخار!">
                  الحرارة {heat}°C. جزيئات الماء تكتسب طاقة هائلة وتتحرر كبخار متصاعد.
                  في الدفيئة الزراعية، هذا يعني فقدان سريع للمياه. التكثف على السقف يعيد الماء
                  عندما يبرد. رطوبة الجو ترتفع بشدة — احذر الأمراض الفطرية.
                </Alert>
              ) : isEvaporating ? (
                <Alert type="warning" title="💧 تبخر نشط — دورة الماء">
                  الحرارة {heat}°C تدعم التبخر المنتظم. جزيئات الماء تكتسب طاقة وتصعد كبخار.
                  هذا هو النطاق المثالي للنتح في النباتات — الثغور مفتوحة والسحب مستمر.
                  عندما يلامس البخار السقف البارد، يتكثف على شكل قطرات ندى.
                </Alert>
              ) : (
                <Alert type="info" title="🌊 ماء سائل بارد — نشاط منخفض">
                  الحرارة {heat}°C. جزيئات الماء هادئة ومتماسكة. لا يحدث تبخر تقريباً.
                  إذا كان الجو مشبعاً بالرطوبة، قد يتكون الندى صباحاً على الأوراق.
                  النباتات في هذه الحالة تمتص الماء لكن النتح ضعيف جداً.
                </Alert>
              )}
            </motion.div>

            <div className="p-4 rounded-xl border text-sm bg-white shadow-sm text-slate-600">
              <p className="font-bold mb-1">💡 لاحظ:</p>
              <p>عندما يسخن الماء، يكتسب طاقة ويتحول لغاز خفي (بخار) ويطير للأعلى.
              عندما يلامس السطح البارد (السقف)، يفقد طاقته ويعود ماءً (قطرات).
              هذا هو سر الندى والمطر.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

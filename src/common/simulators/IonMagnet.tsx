import { useState, useCallback } from "react";
import {
  Magnet,
  CloudRain,
  Shield,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Info,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const IonMagnet = () => {
  const [rain, setRain] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // الفيزياء: التربة سالبة (-) تجذب الموجب (+) وتطرد السالب (-)
  // K+ موجب ← ينجذب للتربة
  // NO₃- سالب ← يتنافر مع التربة ويغسل بالمطر

  const nitrateY = Math.min(250, 100 + rain * 1.2);
  const nitrateOpacity = Math.max(0.1, 1 - rain / 120);
  const potassiumY = Math.min(140, 100 + rain * 0.15);

  const isLeaching = rain > 50;
  const isSevereLeaching = rain > 100;
  const isPotassiumStable = potassiumY < 140;

  // تشغيل تلقائي
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => {
      if (prev) return false;
      return true;
    });
  }, []);

  // إعادة
  const reset = useCallback(() => {
    setRain(0);
    setIsAutoPlay(false);
  }, []);

  // محاكاة المطر في الوضع التلقائي
  // يتم التعامل معها عبر useEffect في نسخة كاملة، لكن هنا نستخدم Slider فقط للتحكم

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Magnet className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مغناطيس التربة — الأيونات
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                شحنة التربة تحدد مصير العناصر الغذائية
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isSevereLeaching
                ? "bg-red-100 text-red-700 border-red-300"
                : isLeaching
                  ? "bg-amber-100 text-amber-700 border-amber-300"
                  : "bg-emerald-100 text-emerald-700 border-emerald-300"
            )}
          >
            {isSevereLeaching
              ? "🔴 غسيل شديد!"
              : isLeaching
                ? "🟡 غسيل نيتروجين"
                : "✅ تربة مستقرة"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="soilBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fefce8" />
                  <stop offset="60%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <linearGradient id="soilDepth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#78350f" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.2" />
                </linearGradient>
                <filter id="ionGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#soilBg)" rx="12" />

              {/* طبقات التربة */}
              <rect x="0" y="180" width="260" height="140" fill="#78350f" opacity="0.15" />
              <rect x="0" y="200" width="260" height="120" fill="#451a03" opacity="0.12" />
              <rect x="0" y="230" width="260" height="90" fill="#270b02" opacity="0.10" />

              {/* خطوط التربة */}
              <path d="M0,180 Q130,175 260,180" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M0,200 Q130,195 260,200" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.3" />

              {/* حبيبة الطين المركزية (المغناطيس) */}
              <g transform="translate(130, 150)">
                <circle cx="0" cy="0" r="50" fill="#78350f" opacity="0.8" />
                <circle cx="0" cy="0" r="50" fill="url(#soilDepth)" />
                <circle cx="0" cy="0" r="50" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.3" />
                <text x="0" y="-5" textAnchor="middle" fontSize="28" fill="white" opacity="0.3" fontWeight="black">
                  −
                </text>
                <text x="0" y="50" textAnchor="middle" fontSize="6" fill="#92400e" fontWeight="bold">
                  حبيبة طين (شحنة سالبة)
                </text>
              </g>

              {/* البوتاسيوم K+ (ينجذب للتربة) */}
              <motion.g
                animate={{
                  y: isPotassiumStable ? [0, 2, 0] : [0, -2, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <g transform={`translate(70, ${potassiumY})`}>
                  <circle cx="0" cy="0" r="18" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2" />
                  <circle cx="0" cy="0" r="18" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
                  <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">K⁺</text>
                  {isLeaching && (
                    <motion.text
                      x="0" y="-24" textAnchor="middle" fontSize="6"
                      fill="#7c3aed" fontWeight="bold"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      متمسك! 🧲
                    </motion.text>
                  )}
                </g>
              </motion.g>

              {/* النترات NO₃- (يتنافر ويغسل) */}
              <motion.g
                animate={isLeaching ? { x: [0, rain > 100 ? 15 : 8, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <g transform={`translate(190, ${nitrateY})`} opacity={nitrateOpacity}>
                  <circle cx="0" cy="0" r="20" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
                  <text x="0" y="4" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">NO₃⁻</text>
                  {isLeaching && (
                    <motion.text
                      x="0" y="-26" textAnchor="middle" fontSize="6"
                      fill="#2563eb" fontWeight="bold"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      هارب! 💧
                    </motion.text>
                  )}
                </g>
              </motion.g>

              {/* قطرات المطر */}
              <AnimatePresence>
                {rain > 0 &&
                  Array.from({ length: Math.min(20, Math.round(rain / 5)) }).map(
                    (_, i) => (
                      <motion.line
                        key={`rain-${i}`}
                        x1={10 + Math.random() * 240}
                        y1={-10}
                        x2={10 + Math.random() * 240}
                        y2={30}
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        opacity={0.3 + (rain / 200)}
                        initial={{ y1: -10, y2: 10 }}
                        animate={{
                          y1: [0, 250],
                          y2: [20, 270],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "linear",
                        }}
                      />
                    )
                  )}
              </AnimatePresence>

              {/* خط تسرب المياه (غسيل) */}
              {isLeaching && (
                <g>
                  <motion.path
                    d="M170,200 Q175,220 180,260 Q185,280 190,300"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.3"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -16] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path
                    d="M200,200 Q195,230 205,270"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.2"
                    strokeDasharray="3 3"
                    animate={{ strokeDashoffset: [0, -12] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </g>
              )}

              {/* مؤشرات حية */}
              <g transform="translate(10, 250)">
                <rect
                  x="0" y="0" width="240" height="55" rx="8"
                  fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"
                />

                <text x="10" y="14" fontSize="6" fill="#64748b">الغسيل</text>
                <rect x="10" y="18" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="5" rx="2.5"
                  fill={isSevereLeaching ? "#ef4444" : isLeaching ? "#f59e0b" : "#22c55e"}
                  animate={{ width: `${(rain / 150) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="85" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {rain.toFixed(0)}%
                </text>

                <text x="120" y="14" fontSize="6" fill="#64748b">عمق NO₃⁻</text>
                <rect x="120" y="18" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="120" y="18" height="5" rx="2.5" fill="#3b82f6"
                  animate={{ width: `${Math.min(70, ((nitrateY - 100) / 150) * 70)}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="195" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {nitrateY.toFixed(0)}
                </text>

                <text x="10" y="42" fontSize="6" fill="#64748b">K⁺ ثابت</text>
                <rect x="10" y="46" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="46" height="5" rx="2.5" fill="#7c3aed"
                  animate={{ width: `${Math.min(70, (potassiumY / 150) * 70)}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="85" y="51" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {potassiumY.toFixed(0)}
                </text>

                <text x="130" y="42" fontSize="6" fill="#64748b">فقدان N</text>
                <text x="210" y="51" fontSize="7" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {nitrateOpacity > 0.8 ? "قليل" : nitrateOpacity > 0.4 ? "متوسط" : "شديد!"}
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="شدة المطر (الغسيل)"
              value={rain}
              min={0}
              max={150}
              unit="%"
              color={isSevereLeaching ? "rose" : isLeaching ? "amber" : "blue"}
              onChange={(e) => setRain(Number(e.target.value))}
            />

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                  <div className="text-[10px] font-bold text-purple-700">
                    K⁺ (بوتاسيوم)
                  </div>
                  <div className="text-lg font-black text-purple-600 font-mono mt-1">
                    {isPotassiumStable ? "🟢 ثابت" : "🟡 يتحرك"}
                  </div>
                  <div className="text-[9px] text-purple-500 mt-1">
                    ينجذب للتربة السالبة
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-xl p-3 border",
                    isSevereLeaching
                      ? "bg-red-50 border-red-200"
                      : isLeaching
                        ? "bg-amber-50 border-amber-200"
                        : "bg-blue-50 border-blue-200"
                  )}
                >
                  <div className="text-[10px] font-bold text-blue-700">
                    NO₃⁻ (نيترات)
                  </div>
                  <div
                    className={cn(
                      "text-lg font-black font-mono mt-1",
                      isSevereLeaching
                        ? "text-red-600"
                        : isLeaching
                          ? "text-amber-600"
                          : "text-blue-600"
                    )}
                  >
                    {isSevereLeaching
                      ? "🔴 غسيل!"
                      : isLeaching
                        ? "🟡 يتسرب"
                        : "🟢 مستقر"}
                  </div>
                  <div className="text-[9px] text-blue-500 mt-1">
                    يتنافر مع التربة
                  </div>
                </div>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`ion-${rain.toFixed(0)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isSevereLeaching ? (
                <Alert type="danger" title="🚨 غسيل نيتروجين كارثي!">
                  المطر الغزير ({rain.toFixed(0)}%) يغسل النيتروجين إلى عمق{" "}
                  {nitrateY.toFixed(0)}px تحت السطح. النترات (NO₃⁻) تتنافر مع
                  التربة السالبة وتتسرب بسهولة إلى المياه الجوفية. خسارة مالية
                  للمزارع وتلوث بيئي خطير! الحل: استخدم سماداً بطيء الإطلاق أو
                  غطِّ التربة.
                </Alert>
              ) : isLeaching ? (
                <Alert type="warning" title="⚠ غسيل نيتروجين — خسارة تغذية!">
                  النترات تتحرك للأسفل (عمق {nitrateY.toFixed(0)}) بفعل المطر
                  ({rain.toFixed(0)}%). البوتاسيوم (K⁺) ما زال متمسكاً بحبيبات
                  الطين. النترات تخسر من منطقة الجذور. النيتروجين الذي اشتريته
                  سيذهب للمياه الجوفية بدلاً من النبات!
                </Alert>
              ) : (
                <Alert type="success" title="✅ تربة مستقرة — لا غسيل!">
                  المطر خفيف ({rain.toFixed(0)}%). النترات (NO₃⁻) في متناول
                  الجذور والبوتاسيوم (K⁺) ممسوك بالتربة. هذه هي الظروف المثالية
                  للتغذية. استفد من النيتروجين قبل أن يهرب مع الأمطار القادمة!
                </Alert>
              )}
            </motion.div>

            {/* شرح علمي */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3">
              <div className="flex gap-2 text-xs text-amber-800">
                <Info size={14} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">🧲 كيف يعمل المغناطيس؟</p>
                  <p>
                    التربة مشحونة سالباً (−). البوتاسيوم (K⁺) موجب ← ينجذب
                    ويتمسك. النترات (NO₃⁻) سالب ← يتنافر ويغسل مع الماء. هذه
                    هي مشكلة النيتروجين الأساسية في التربة!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

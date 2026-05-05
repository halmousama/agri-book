import { useState, useCallback, useEffect, useRef } from "react";
import {
  Dna,
  Sprout,
  Scissors,
  Apple,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Play,
  Pause,
  TestTube,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

const MOTHER_FRUIT = "🍎";
const FRUIT_POOL = ["🍏", "🍋", "🍅", "🍒", "🥝", "🍊", "🍑", "🍇"];
const MAX_ITEMS = 12;

export const GeneticSeed = () => {
  const [seedResults, setSeedResults] = useState<string[]>([]);
  const [cloneResults, setCloneResults] = useState<string[]>([]);
  const [seedCount, setSeedCount] = useState(5);
  const [cloneCount, setCloneCount] = useState(5);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const uniqueSeeds = new Set(seedResults);
  const diversityIndex =
    seedResults.length > 0 ? (uniqueSeeds.size / seedResults.length) * 100 : 0;
  const cloneUniformity = cloneResults.length > 0 ? 100 : 0;
  const totalPlants = seedResults.length + cloneResults.length;

  const plantSeeds = useCallback(() => {
    if (seedResults.length >= MAX_ITEMS) {
      setMessage("⚠ السعة القصوى! أعد تعيين التجربة.");
      return;
    }
    const newSeeds = [...seedResults];
    const space = MAX_ITEMS - newSeeds.length;
    const toAdd = Math.min(seedCount, space);
    for (let i = 0; i < toAdd; i++) {
      newSeeds.push(FRUIT_POOL[Math.floor(Math.random() * FRUIT_POOL.length)]);
    }
    setSeedResults(newSeeds);
    setGeneration((g) => g + 1);
    setMessage(`🌱 زرعت ${toAdd} بذرة — تنوع وراثي ${diversityIndex.toFixed(0)}%`);
  }, [seedCount, seedResults, diversityIndex]);

  const takeCuttings = useCallback(() => {
    if (cloneResults.length >= MAX_ITEMS) {
      setMessage("⚠ السعة القصوى! أعد تعيين التجربة.");
      return;
    }
    const newClones = [...cloneResults];
    const space = MAX_ITEMS - newClones.length;
    const toAdd = Math.min(cloneCount, space);
    for (let i = 0; i < toAdd; i++) {
      newClones.push(MOTHER_FRUIT);
    }
    setCloneResults(newClones);
    setGeneration((g) => g + 1);
    setMessage(`✂️ أخذت ${toAdd} عقلة — نسخ مطابق للأم (${MOTHER_FRUIT})`);
  }, [cloneCount, cloneResults]);

  const reset = useCallback(() => {
    setSeedResults([]);
    setCloneResults([]);
    setGeneration(0);
    setMessage(null);
    setIsAutoPlay(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        const action = Math.random() > 0.5 ? "seed" : "clone";
        if (action === "seed" && seedResults.length < MAX_ITEMS) {
          setSeedResults((prev) => {
            if (prev.length >= MAX_ITEMS) return prev;
            const newSeeds = [...prev];
            newSeeds.push(
              FRUIT_POOL[Math.floor(Math.random() * FRUIT_POOL.length)]
            );
            return newSeeds;
          });
        } else if (cloneResults.length < MAX_ITEMS) {
          setCloneResults((prev) => {
            if (prev.length >= MAX_ITEMS) return prev;
            const newClones = [...prev];
            newClones.push(MOTHER_FRUIT);
            return newClones;
          });
        }
        setGeneration((g) => g + 1);
      }, 1500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlay, seedResults.length, cloneResults.length]);

  const getStatus = () => {
    if (seedResults.length === 0 && cloneResults.length === 0)
      return {
        label: "⚪ المختبر فارغ",
        color: "bg-slate-100 text-slate-600 border-slate-300",
      };
    if (diversityIndex > 50 && cloneResults.length > 0)
      return {
        label: "✅ استراتيجية متوازنة",
        color: "bg-emerald-100 text-emerald-700 border-emerald-300",
      };
    if (seedResults.length > 0 && diversityIndex < 30)
      return {
        label: "⚠ تنوع وراثي ضعيف",
        color: "bg-amber-100 text-amber-700 border-amber-300",
      };
    if (cloneResults.length === 0 && seedResults.length > 0)
      return {
        label: "ℹ بذور فقط",
        color: "bg-blue-100 text-blue-700 border-blue-300",
      };
    return {
      label: "ℹ تجربة قيد التشغيل",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    };
  };
  const status = getStatus();

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-emerald-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-emerald-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl shadow-lg shadow-emerald-200/50">
              <Dna className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                مختبر الوراثة — بذرة أم عُقلة؟
              </h3>
              <p className="text-xs text-slate-500">
                مقارنة الإكثار الجنسي (بذور) واللاجنسي (عقل)
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              status.color
            )}
          >
            {status.label}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="genBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#ecfdf5" />
                </linearGradient>
                <radialGradient id="dnaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
                <filter id="genGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#genBg)" rx="12" />

              {/* الشجرة الأم */}
              <g transform="translate(130, 28)">
                <rect x="-4" y="10" width="8" height="35" fill="#78350f" rx="2" />
                <ellipse cx="0" cy="0" rx="35" ry="25" fill="#22c55e" opacity="0.8" />
                <ellipse cx="-10" cy="-5" rx="20" ry="18" fill="#16a34a" opacity="0.6" />
                <ellipse cx="10" cy="3" rx="18" ry="15" fill="#15803d" opacity="0.4" />
                <text x="0" y="5" textAnchor="middle" fontSize="20" filter="url(#genGlow)">
                  {MOTHER_FRUIT}
                </text>
                <text
                  x="0" y="-25" textAnchor="middle" fontSize="7" fill="#166534" fontWeight="bold"
                >
                  الشجرة الأم
                </text>
                <text x="0" y="55" textAnchor="middle" fontSize="5" fill="#6b7280">
                  الصنف التجاري الممتاز
                </text>
              </g>

              {/* حلزون DNA زخرفي */}
              <g opacity="0.12">
                {[0, 1, 2].map((i) => (
                  <motion.path
                    key={`dna-${i}`}
                    d={`M${25 + i * 100},85 Q${35 + i * 100},95 ${25 + i * 100},105 Q${15 + i * 100},115 ${25 + i * 100},125`}
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </g>

              {/* خط فاصل */}
              <line x1="130" y1="85" x2="130" y2="92" stroke="#d1d5db" strokeWidth="1.5" />
              <path
                d="M70,92 Q130,102 190,92"
                stroke="#d1d5db" strokeWidth="1.5" fill="none" strokeDasharray="3 3"
              />

              {/* مسار البذور (يسار) */}
              <g transform="translate(65, 100)">
                <rect x="-45" y="-8" width="90" height="16" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                <text x="0" y="4" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">
                  🌱 بذور (تنوع)
                </text>

                <AnimatePresence>
                  {seedResults.slice(0, 7).map((fruit, i) => (
                    <motion.g
                      key={`seed-${i}`}
                      initial={{ scale: 0, y: -15, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: i * 0.05,
                      }}
                    >
                      <rect
                        x={-40 + i * 12}
                        y={18}
                        width="11"
                        height="11"
                        rx="3"
                        fill="white"
                        stroke="#fde68a"
                        strokeWidth="1"
                      />
                      <text x={-34.5 + i * 12} y={27} textAnchor="middle" fontSize="7">
                        {fruit}
                      </text>
                    </motion.g>
                  ))}
                </AnimatePresence>

                {seedResults.length === 0 && (
                  <text x="0" y="28" textAnchor="middle" fontSize="6" fill="#94a3b8">
                    لم تزرع بذوراً بعد
                  </text>
                )}
              </g>

              {/* مسار العقل (يمين) */}
              <g transform="translate(195, 100)">
                <rect x="-45" y="-8" width="90" height="16" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
                <text x="0" y="4" textAnchor="middle" fontSize="9" fill="#065f46" fontWeight="bold">
                  ✂️ عقل (استنساخ)
                </text>

                <AnimatePresence>
                  {cloneResults.slice(0, 7).map((fruit, i) => (
                    <motion.g
                      key={`clone-${i}`}
                      initial={{ scale: 0, y: -15, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: i * 0.05,
                      }}
                    >
                      <rect
                        x={-40 + i * 12}
                        y={18}
                        width="11"
                        height="11"
                        rx="3"
                        fill="white"
                        stroke="#a7f3d0"
                        strokeWidth="1"
                      />
                      <text x={-34.5 + i * 12} y={27} textAnchor="middle" fontSize="7">
                        {fruit}
                      </text>
                    </motion.g>
                  ))}
                </AnimatePresence>

                {cloneResults.length === 0 && (
                  <text x="0" y="28" textAnchor="middle" fontSize="6" fill="#94a3b8">
                    لم تأخذ عقلاً بعد
                  </text>
                )}
              </g>

              {/* مؤشرات حية */}
              <g transform="translate(10, 250)">
                <rect
                  x="0" y="0" width="240" height="60" rx="8"
                  fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"
                />

                <text x="10" y="14" fontSize="6" fill="#64748b">
                  التنوع الوراثي
                </text>
                <rect x="10" y="18" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="5" rx="2.5"
                  fill={
                    diversityIndex > 50
                      ? "#22c55e"
                      : diversityIndex > 20
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  animate={{ width: `${(diversityIndex / 100) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="85" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {diversityIndex.toFixed(0)}%
                </text>

                <text x="120" y="14" fontSize="6" fill="#64748b">
                  التجانس
                </text>
                <rect x="120" y="18" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="120" y="18" height="5" rx="2.5"
                  fill={cloneUniformity > 90 ? "#22c55e" : "#f59e0b"}
                  animate={{ width: `${(cloneUniformity / 100) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="195" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {cloneUniformity.toFixed(0)}%
                </text>

                <text x="10" y="40" fontSize="6" fill="#64748b">
                  الجيل
                </text>
                <rect x="10" y="44" width="50" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="44" height="5" rx="2.5" fill="#8b5cf6"
                  animate={{ width: `${Math.min(50, generation * 5)}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="65" y="49" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  #{generation}
                </text>

                <text x="120" y="40" fontSize="6" fill="#64748b">
                  الإجمالي
                </text>
                <text x="195" y="49" fontSize="8" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {totalPlants}
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Slider
                label="عدد البذور للزراعة"
                value={seedCount}
                min={1}
                max={10}
                unit="بذرة"
                color="amber"
                onChange={(e) => setSeedCount(Number(e.target.value))}
              />
              <Slider
                label="عدد العقل للأخذ"
                value={cloneCount}
                min={1}
                max={10}
                unit="عقلة"
                color="emerald"
                onChange={(e) => setCloneCount(Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={plantSeeds}
                disabled={seedResults.length >= MAX_ITEMS}
                className={cn(
                  "py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm",
                  seedResults.length >= MAX_ITEMS
                    ? "bg-amber-200 text-amber-500 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-200"
                )}
              >
                <Sprout size={18} />
                ازرع بذرة
              </button>
              <button
                onClick={takeCuttings}
                disabled={cloneResults.length >= MAX_ITEMS}
                className={cn(
                  "py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm",
                  cloneResults.length >= MAX_ITEMS
                    ? "bg-emerald-200 text-emerald-500 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
                )}
              >
                <Scissors size={18} />
                خذ عُقلة
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsAutoPlay((p) => !p)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 text-xs",
                  isAutoPlay
                    ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                )}
              >
                {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
                {isAutoPlay ? "إيقاف المحاكاة" : "تشغيل تلقائي"}
              </button>
              <button
                onClick={reset}
                className="px-5 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                إعادة
              </button>
            </div>

            {/* مربعات المقاييس */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={cn(
                  "rounded-lg p-3 border",
                  diversityIndex > 50
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-amber-50 border-amber-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-500">تنوع</div>
                <div
                  className={cn(
                    "text-lg font-black font-mono",
                    diversityIndex > 50 ? "text-emerald-600" : "text-amber-600"
                  )}
                >
                  {diversityIndex.toFixed(0)}%
                </div>
              </div>
              <div
                className={cn(
                  "rounded-lg p-3 border",
                  cloneUniformity > 90
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <div className="text-[9px] font-bold text-slate-500">تجانس</div>
                <div className="text-lg font-black font-mono text-emerald-600">
                  {cloneUniformity.toFixed(0)}%
                </div>
              </div>
              <div className="rounded-lg p-3 border bg-slate-50 border-slate-200">
                <div className="text-[9px] font-bold text-slate-500">جيل</div>
                <div className="text-lg font-black font-mono text-purple-600">
                  #{generation}
                </div>
              </div>
            </div>

            {/* التشخيص الذكي */}
            <motion.div
              key={`gen-${seedResults.length}-${cloneResults.length}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {seedResults.length === 0 && cloneResults.length === 0 ? (
                <Alert type="info" title="🧪 المختبر في انتظارك">
                  ابدأ بتجربة الطريقتين: زراعة البذور (تنوع وراثي) أو أخذ العقل
                  (نسخ مطابق). لاحظ كيف تختلف النتائج!
                </Alert>
              ) : diversityIndex > 50 && cloneResults.length > 0 ? (
                <Alert type="success" title="✅ استراتيجية متكاملة">
                  لديك تنوع وراثي ({diversityIndex.toFixed(0)}%) من البذور
                  واستقرار من العقل ({cloneResults.length} نسخة مطابقة). هذه
                  أفضل ممارسة في الإكثار: التنوع للأمان المستقبلي والنسخ
                  للإنتاج التجاري الموحد.
                </Alert>
              ) : diversityIndex < 30 && seedResults.length > 0 ? (
                <Alert type="warning" title="⚠ تنوع وراثي منخفض">
                  البذور أنتجت {uniqueSeeds.size} صنفاً فقط من أصل{" "}
                  {seedResults.length} نبتة (تنوع {diversityIndex.toFixed(0)}%).
                  في الطبيعة، هذا يضعف مقاومة الأمراض. أضف المزيد من البذور
                  لزيادة التنوع.
                </Alert>
              ) : cloneResults.length === 0 && seedResults.length > 0 ? (
                <Alert type="info" title="🌱 بذور بدون عقل">
                  البذور وحدها تعطي تنوعاً عالياً ({diversityIndex.toFixed(0)}
                  %) لكن فقدان الصفات التجارية للأم. جرب أخذ عقل للحفاظ على
                  الجودة العالية.
                </Alert>
              ) : (
                <Alert type="success" title="🧬 تجربة نشطة">
                  {seedResults.length} بذرة + {cloneResults.length} عقلة ={" "}
                  {totalPlants} نبتة. التنوع: {diversityIndex.toFixed(0)}%،
                  التجانس: {cloneUniformity.toFixed(0)}%.
                </Alert>
              )}
            </motion.div>

            {/* رسالة منبثقة */}
            <AnimatePresence>
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold"
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

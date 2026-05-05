import { useState, useEffect, useRef, useCallback } from "react";
import {
  Microscope,
  ShieldPlus,
  Bug,
  Skull,
  AlertTriangle,
  Activity,
  Droplets,
  RotateCcw,
  Play,
  Pause,
  FlaskConical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

interface Microbe {
  id: number;
  x: number;
  y: number;
  size: number;
}

const randomInCircle = (radius: number) => {
  const angle = Math.random() * 2 * Math.PI;
  const r = Math.sqrt(Math.random()) * radius;
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
};

const generateMicrobes = (count: number, startId: number): Microbe[] => {
  const radius = 80;
  return Array.from({ length: Math.min(count, 80) }).map((_, i) => {
    const pos = randomInCircle(radius);
    return {
      id: startId + i,
      x: pos.x,
      y: pos.y,
      size: 3 + Math.random() * 4,
    };
  });
};

export const MicrobePetri = () => {
  const [goodCount, setGoodCount] = useState(10);
  const [badCount, setBadCount] = useState(5);
  const [goodMicrobes, setGoodMicrobes] = useState<Microbe[]>([]);
  const [badMicrobes, setBadMicrobes] = useState<Microbe[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [addAmount, setAddAmount] = useState(15);
  const idRef = useRef(0);

  const total = goodCount + badCount;
  const isBalanced = goodCount > badCount && badCount > 0;
  const isOverrun = badCount > goodCount && goodCount > 0;
  const isSterile = total === 0;
  const isThriving = goodCount >= 60 && badCount === 0;
  const isEqual = goodCount === badCount && goodCount > 0;

  useEffect(() => {
    setGoodMicrobes(generateMicrobes(goodCount, idRef.current));
    idRef.current += goodCount;
  }, [goodCount]);

  useEffect(() => {
    setBadMicrobes(generateMicrobes(badCount, idRef.current));
    idRef.current += badCount;
  }, [badCount]);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setGoodCount((prev) => {
        if (prev <= 0) return 0;
        if (prev > badCount && prev < 100)
          return prev + Math.ceil(prev / 20);
        return prev;
      });
      setBadCount((prev) => {
        if (prev <= 0) return 0;
        if (prev >= goodCount && prev < 100)
          return prev + Math.ceil(prev / 15);
        return prev;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [goodCount, badCount, isActive]);

  const addGood = useCallback(() => {
    setIsActive(true);
    setGoodCount((prev) => Math.min(prev + addAmount, 100));
  }, [addAmount]);

  const addBad = useCallback(() => {
    setIsActive(true);
    setBadCount((prev) => Math.min(prev + addAmount, 100));
  }, [addAmount]);

  const nuke = useCallback(() => {
    setGoodCount(0);
    setBadCount(0);
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setGoodCount(10);
    setBadCount(5);
    setIsActive(true);
  }, []);

  const getDiagnosis = () => {
    if (isSterile)
      return {
        icon: Skull,
        title: "🧫 تربة ميتة (معقمة)",
        desc: "المبيد قتل كل الكائنات الحية. التربة أصبحت فارغة تماماً. أي ميكروب يدخل أولاً سيحتكر المساحة بلا منافس — غالباً ستكون ميكروبات ضارة! أعد إدخال الميكروبات النافعة فوراً.",
        color: "text-slate-700",
        bg: "bg-slate-50",
        border: "border-slate-200",
        action: "أضف ميكروبات نافعة (كومبوست) فوراً لإعادة الحياة للتربة.",
        type: "danger" as const,
      };
    if (isThriving)
      return {
        icon: Activity,
        title: "🛡️ مناعة حيوية قوية!",
        desc: `الميكروبات النافعة (${goodCount}) سيطرت بالكامل على التربة دون وجود ميكروبات ضارة. التربة محصنة طبيعياً ضد الأمراض. هذا هو الهدف الأسمى للمكافحة الحيوية — تربة ذات مناعة ذاتية!`,
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        action: "استمر في إضافة المواد العضوية (كومبوست) للحفاظ على المناعة.",
        type: "success" as const,
      };
    if (isOverrun)
      return {
        icon: AlertTriangle,
        title: "🚨 اجتياح ميكروبي ضار!",
        desc: `الميكروبات الضارة (${badCount}) تفوقت على النافعة (${goodCount})! خطر انتشار الأمراض مرتفع جداً (تعفن جذور، ذبول، بياض دقيقي). نسبة الضار: ${((badCount / total) * 100).toFixed(0)}%.`,
        color: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-200",
        action: "أضف ميكروبات نافعة بكميات كبيرة (على الأقل 30 وحدة) لاستعادة التوازن.",
        type: "danger" as const,
      };
    if (isEqual)
      return {
        icon: AlertTriangle,
        title: "⚖️ تعادل خطير",
        desc: `الميكروبات النافعة (${goodCount}) والضارة (${badCount}) متعادلة عددياً. أي خلل بسيط سيرجح الكفة للضارة. عزز الميكروبات النافعة فوراً لكسر التعادل.`,
        color: "text-amber-700",
        bg: "bg-amber-50",
        border: "border-amber-200",
        action: "أضف 15-20 وحدة من الميكروبات النافعة لترجيح الكفة.",
        type: "warning" as const,
      };
    if (isBalanced)
      return {
        icon: ShieldPlus,
        title: "✅ توازن حيوي ممتاز",
        desc: `الميكروبات النافعة (${goodCount}) تتفوق على الضارة (${badCount}) بنسبة ${((goodCount / total) * 100).toFixed(0)}%. التربة محمية طبيعياً والأمراض تحت السيطرة.`,
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        action: "استمر في إضافة الكومبوست لدعم المناعة الحيوية.",
        type: "success" as const,
      };
    return {
      icon: Bug,
      title: "🌱 بداية المنافسة",
      desc: `الميكروبات تتنافس على المساحة والغذاء. النافعة: ${goodCount}، الضارة: ${badCount}. نسبة النافعة: ${((goodCount / total) * 100).toFixed(0)}%. راقب التطورات بعناية.`,
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      action: "ادعم الميكروبات النافعة بإضافة الكومبوست لتضمن تفوقها.",
      type: "info" as const,
    };
  };

  const diagnosis = getDiagnosis();
  const DiagnosisIcon = diagnosis.icon;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-rose-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl shadow-lg shadow-rose-200/50">
              <Microscope className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                طبق بتري — صراع الميكروبات
              </h3>
              <p className="text-xs text-slate-500">
                المكافحة الحيوية: النافع ضد الضار
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-bold shadow-sm">
            <div className="flex items-center gap-1 text-emerald-600">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{goodCount}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-red-600">
              <div className="w-2 h-2 rounded-sm bg-red-500 rotate-45" />
              <span>{badCount}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== طبق بتري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <radialGradient id="petriBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="70%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </radialGradient>
                <radialGradient id="petriGlow" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <filter id="petriShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
                </filter>
                <clipPath id="petriClip">
                  <circle cx="130" cy="160" r="95" />
                </clipPath>
              </defs>

              <rect
                width="260" height="320" rx="12"
                fill="#f8fafc"
              />

              <g transform="translate(0, 10)">
                {/* الظل الخارجي */}
                <circle
                  cx="130" cy="150" r="100"
                  fill="none" stroke="#e2e8f0" strokeWidth="8"
                  filter="url(#petriShadow)"
                />
                <circle
                  cx="130" cy="150" r="96"
                  fill="url(#petriBg)" stroke="#d1d5db" strokeWidth="2"
                />
                <circle
                  cx="130" cy="150" r="96"
                  fill="url(#petriGlow)"
                />

                {/* وسط الآجار */}
                <circle cx="130" cy="150" r="88" fill="#fef3c7" opacity="0.3" />

                {/* الميكروبات داخل الطبق */}
                <g clipPath="url(#petriClip)">
                  {/* النافعة (خضراء) */}
                  <AnimatePresence>
                    {goodMicrobes.map((m) => (
                      <motion.circle
                        key={m.id}
                        cx={130 + m.x}
                        cy={150 + m.y}
                        r={m.size}
                        fill="#22c55e"
                        opacity={0.7}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: 0.7,
                          cx: 130 + m.x + Math.sin(m.id) * 5,
                          cy: 150 + m.y + Math.cos(m.id * 1.3) * 5,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          cx: {
                            duration: 3 + (m.id % 3),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: m.id * 0.1,
                          },
                          cy: {
                            duration: 4 + (m.id % 4),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: m.id * 0.1,
                          },
                          default: { duration: 0.3 },
                        }}
                      />
                    ))}
                  </AnimatePresence>

                  {/* الضارة (حمراء) */}
                  <AnimatePresence>
                    {badMicrobes.map((m) => (
                      <motion.path
                        key={m.id}
                        d={`M ${130 + m.x},${150 + m.y - m.size} L ${130 + m.x + m.size * 0.7},${150 + m.y} L ${130 + m.x},${150 + m.y + m.size} L ${130 + m.x - m.size * 0.7},${150 + m.y} Z`}
                        fill="#ef4444"
                        opacity={0.8}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: 0.8,
                          x: Math.sin(m.id * 0.7) * 4,
                          y: Math.cos(m.id * 0.5) * 4,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          scale: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          x: {
                            duration: 2.5 + (m.id % 3),
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          y: {
                            duration: 3 + (m.id % 2),
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          default: { duration: 0.3 },
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </g>

                {/* مقياس النسبة */}
                <g transform="translate(10, 260)">
                  <rect
                    x="0" y="0" width="240" height="50" rx="8"
                    fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"
                  />

                  <text x="10" y="14" fontSize="6" fill="#64748b">
                    الميكروبات النافعة
                  </text>
                  <rect x="10" y="18" width="100" height="5" rx="2.5" fill="#e2e8f0" />
                  <motion.rect
                    x="10" y="18" height="5" rx="2.5" fill="#22c55e"
                    animate={{ width: `${(goodCount / 100) * 100}px` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                  <text
                    x="115" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b"
                  >
                    {goodCount}
                  </text>

                  <text x="130" y="14" fontSize="6" fill="#64748b">
                    الميكروبات الضارة
                  </text>
                  <rect x="130" y="18" width="100" height="5" rx="2.5" fill="#e2e8f0" />
                  <motion.rect
                    x="130" y="18" height="5" rx="2.5" fill="#ef4444"
                    animate={{ width: `${(badCount / 100) * 100}px` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                  <text
                    x="235" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b"
                  >
                    {badCount}
                  </text>

                  <text x="10" y="40" fontSize="6" fill="#64748b">
                    المجموع: {total}
                  </text>
                  <text x="170" y="40" fontSize="6" fill="#64748b">
                    النسبة:{" "}
                    {total > 0
                      ? `${((goodCount / total) * 100).toFixed(0)}% نافع`
                      : "—"}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label="كمية الإضافة"
              value={addAmount}
              min={5}
              max={30}
              unit="وحدة"
              color="purple"
              onChange={(e) => setAddAmount(Number(e.target.value))}
            />

            <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
              <button
                onClick={addGood}
                disabled={goodCount >= 100}
                className={cn(
                  "w-full py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm",
                  goodCount >= 100
                    ? "bg-emerald-200 text-emerald-500 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200"
                )}
              >
                <ShieldPlus size={18} />
                إضافة {addAmount} كومبوست (نافع)
              </button>

              <button
                onClick={addBad}
                disabled={badCount >= 100}
                className={cn(
                  "w-full py-3 rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2 text-sm",
                  badCount >= 100
                    ? "bg-red-200 text-red-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
                )}
              >
                <Bug size={18} />
                إضافة {addAmount} ممرض (ضار)
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={nuke}
                  className="py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Skull size={16} />
                  تعقيم كامل
                </button>
                <button
                  onClick={reset}
                  className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-md"
                >
                  <RotateCcw size={16} />
                  إعادة تشغيل
                </button>
              </div>
            </div>

            {/* عدادات سريعة */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  goodCount > badCount
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <div className="text-[10px] font-bold text-slate-500">
                  النافعة (+)
                </div>
                <motion.div
                  className="text-2xl font-black font-mono text-emerald-600"
                  key={goodCount}
                >
                  {goodCount}
                </motion.div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    animate={{ width: `${goodCount}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  badCount > goodCount
                    ? "bg-red-50 border-red-200"
                    : "bg-slate-50 border-slate-200"
                )}
              >
                <div className="text-[10px] font-bold text-slate-500">
                  الضارة (−)
                </div>
                <motion.div
                  className="text-2xl font-black font-mono text-red-600"
                  key={badCount}
                >
                  {badCount}
                </motion.div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500 rounded-full"
                    animate={{ width: `${badCount}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />
                </div>
              </div>
            </div>

            {/* التشخيص الذكي */}
            <motion.div
              key={`microbe-${goodCount}-${badCount}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert type={diagnosis.type} title={diagnosis.title}>
                <p className="mb-2">{diagnosis.desc}</p>
                <div
                  className={cn(
                    "p-2 rounded-lg text-xs font-bold mt-2",
                    diagnosis.color
                  )}
                >
                  💡 {diagnosis.action}
                </div>
              </Alert>
            </motion.div>

            {/* تلميح */}
            {isBalanced && !isThriving && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-2 text-center text-xs text-emerald-700 font-bold">
                💡 التربة الحية توفر 80% من مناعة النبات طبيعياً — لا حاجة
                للمبيدات!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

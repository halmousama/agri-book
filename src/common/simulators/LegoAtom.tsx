import { useState, useCallback } from "react";
import {
  Atom,
  RotateCcw,
  CheckCircle2,
  Plus,
  Minus,
  FlaskConical,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const LegoAtom = () => {
  const [hCount, setHCount] = useState(0);
  const [oCount, setOCount] = useState(0);

  const isWater = hCount === 2 && oCount === 1;
  const isTooManyH = hCount > 2 && oCount === 1;
  const isTooManyO = oCount > 1;
  const isBoth = isTooManyH || isTooManyO;
  const isEmpty = hCount === 0 && oCount === 0;
  const hasExcess = (hCount > 2 && oCount >= 1) || (oCount > 1 && hCount >= 1);

  const reset = useCallback(() => {
    setHCount(0);
    setOCount(0);
  }, []);

  const addH = useCallback(() => {
    if (hCount < 6) setHCount((h) => h + 1);
  }, [hCount]);

  const addO = useCallback(() => {
    if (oCount < 4) setOCount((o) => o + 1);
  }, [oCount]);

  const removeH = useCallback(() => {
    setHCount((h) => Math.max(0, h - 1));
  }, []);

  const removeO = useCallback(() => {
    setOCount((o) => Math.max(0, o - 1));
  }, []);

  const moleculeCount = Math.min(
    Math.floor(hCount / 2),
    oCount
  );

  const getDiagnosis = () => {
    if (isEmpty)
      return {
        title: "🧪 المختبر فارغ",
        desc: "أضف هيدروجين (H) وأكسجين (O) لتكوين جزيء ماء. التحدي: احصل على H₂O!",
        type: "info" as const,
      };
    if (isWater)
      return {
        title: "🎉 نجاح! جزيء ماء (H₂O)",
        desc: `2 ذرة هيدروجين + 1 ذرة أكسجين = ${moleculeCount} جزيء ماء. الروابط التساهمية تجمعهما معاً!`,
        type: "success" as const,
      };
    if (hCount >= 2 && oCount >= 1 && !isWater)
      return {
        title: `⚠ فائض من العناصر`,
        desc: `لديك ${hCount}H و ${oCount}O. يمكن تكوين ${moleculeCount} جزيء ماء، لكن هناك ${hCount - (moleculeCount * 2)} هيدروجين و ${oCount - moleculeCount} أكسجين زائد.`,
        type: "warning" as const,
      };
    if (hCount > 0 && oCount === 0)
      return {
        title: "💨 هيدروجين فقط!",
        desc: `${hCount} ذرات هيدروجين تطفو في الفراغ. تحتاج إلى أكسجين لتكوين الماء.`,
        type: "info" as const,
      };
    if (oCount > 0 && hCount === 0)
      return {
        title: "💨 أكسجين فقط!",
        desc: `${oCount} ذرات أكسجين وحيدة. تحتاج إلى هيدروجين (2:1) لتكوين الماء.`,
        type: "info" as const,
      };
    return {
      title: "🧪 تجربة قيد التشغيل",
      desc: `H: ${hCount} | O: ${oCount}. استمر في الإضافة حتى 2H + 1O = H₂O`,
      type: "info" as const,
    };
  };

  const diagnosis = getDiagnosis();

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-purple-200 dark:border-purple-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl shadow-lg shadow-purple-200/50">
              <Atom className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر الليغو — بناء الماء
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                2 هيدروجين + 1 أكسجين = H₂O
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isWater
                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                : hasExcess
                  ? "bg-amber-100 text-amber-700 border-amber-300"
                  : "bg-blue-100 text-blue-700 border-blue-300"
            )}
          >
            {isWater
              ? "✅ H₂O مكتمل!"
              : `H:${hCount} O:${oCount}`}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="labBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#faf5ff" />
                  <stop offset="100%" stopColor="#f3e8ff" />
                </linearGradient>
                <radialGradient id="oxygenGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="100%" stopColor="#dc2626" />
                </radialGradient>
                <radialGradient id="hydrogenGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#64748b" />
                </radialGradient>
                <filter id="atomGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="successGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#labBg)" rx="12" />

              {/* خلفية شبكية */}
              <g opacity="0.05">
                {Array.from({ length: 22 }).map((_, i) => (
                  <line key={`gvl-${i}`} x1={i * 12} y1="0" x2={i * 12} y2="320" stroke="#7c3aed" strokeWidth="1" />
                ))}
              </g>

              {/* منصة المختبر */}
              <rect x="10" y="240" width="240" height="8" rx="4" fill="#a78bfa" opacity="0.3" />
              <rect x="20" y="248" width="220" height="6" rx="3" fill="#8b5cf6" opacity="0.15" />

              {/* عند نجاح الماء */}
              {isWater ? (
                <g transform="translate(130, 125)">
                  {/* هالة النجاح */}
                  <motion.circle
                    cx="0" cy="0" r="70"
                    fill="none" stroke="#22c55e" strokeWidth="1"
                    opacity="0.3"
                    animate={{ r: [70, 85], opacity: [0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="0" cy="0" r="55"
                    fill="#22c55e"
                    opacity="0.08"
                    animate={{ r: [55, 65], opacity: [0.08, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />

                  {/* روابط تساهمية */}
                  <line x1="0" y1="0" x2="-38" y2="-28" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="38" y2="-28" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

                  {/* الأكسجين */}
                  <circle cx="0" cy="0" r="32" fill="url(#oxygenGrad)" filter="url(#successGlow)" />
                  <text x="0" y="8" textAnchor="middle" fill="white" fontWeight="bold" fontSize="20">O</text>

                  {/* الهيدروجين */}
                  <circle cx="-38" cy="-28" r="18" fill="url(#hydrogenGrad)" />
                  <text x="-38" y="-22" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="12">H</text>
                  <circle cx="38" cy="-28" r="18" fill="url(#hydrogenGrad)" />
                  <text x="38" y="-22" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="12">H</text>

                  {/* علامة + على الروابط */}
                  <text x="-19" y="-8" fontSize="8" fill="#6b7280" fontWeight="bold" transform="rotate(-35, -19, -8)">—</text>
                  <text x="19" y="-8" fontSize="8" fill="#6b7280" fontWeight="bold" transform="rotate(35, 19, -8)">—</text>

                  <text x="0" y="50" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="bold">
                    H₂O — جزيء الماء
                  </text>
                </g>
              ) : (
                <g>
                  {/* عناصر مبعثرة */}
                  {isEmpty && (
                    <text x="130" y="130" textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="bold">
                      🧪 منطقة التفاعل
                    </text>
                  )}

                  {/* ذرات الأكسجين */}
                  <AnimatePresence>
                    {Array.from({ length: oCount }).map((_, i) => (
                      <motion.g
                        key={`o-${i}`}
                        initial={{ scale: 0, opacity: 0, x: 130, y: 130 }}
                        animate={{
                          scale: 1,
                          opacity: 0.9,
                          x: 80 + i * 40,
                          y: 120 + (i % 2) * 30,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: i * 0.1,
                        }}
                      >
                        <circle cx="0" cy="0" r="28" fill="url(#oxygenGrad)" filter="url(#atomGlow)" />
                        <text x="0" y="6" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">O</text>
                      </motion.g>
                    ))}
                  </AnimatePresence>

                  {/* ذرات الهيدروجين */}
                  <AnimatePresence>
                    {Array.from({ length: hCount }).map((_, i) => (
                      <motion.g
                        key={`h-${i}`}
                        initial={{ scale: 0, opacity: 0, x: 130, y: 130 }}
                        animate={{
                          scale: 1,
                          opacity: 0.9,
                          x: 140 + (i % 3) * 35,
                          y: 100 + Math.floor(i / 3) * 40,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: 0.05 + i * 0.08,
                        }}
                      >
                        <circle cx="0" cy="0" r="16" fill="url(#hydrogenGrad)" />
                        <text x="0" y="4" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="10">H</text>
                      </motion.g>
                    ))}
                  </AnimatePresence>
                </g>
              )}

              {/* {} مؤشر العد */}
              <g transform="translate(10, 270)">
                <rect x="0" y="0" width="240" height="40" rx="8" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />

                <text x="10" y="16" fontSize="6" fill="#64748b">الهيدروجين</text>
                <rect x="10" y="20" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="20" height="5" rx="2.5" fill="#64748b"
                  animate={{ width: `${(hCount / 6) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="85" y="25" fontSize="7" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {hCount} H
                </text>

                <text x="120" y="16" fontSize="6" fill="#64748b">الأكسجين</text>
                <rect x="120" y="20" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="120" y="20" height="5" rx="2.5" fill="#dc2626"
                  animate={{ width: `${(oCount / 4) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="195" y="25" fontSize="7" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {oCount} O
                </text>

                <text x="10" y="35" fontSize="5" fill="#94a3b8">
                  {isWater ? "✅ مكتمل!" : `تحتاج: ${Math.max(0, 2 - hCount)}H + ${Math.max(0, 1 - oCount)}O`}
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            {/* أزرار الإضافة */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-300 to-slate-500" />
                    هيدروجين (H)
                  </span>
                  <span className="text-xl font-black font-mono text-slate-700">{hCount}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addH}
                    disabled={hCount >= 6}
                    className={cn(
                      "flex-1 py-2 rounded-xl font-bold transition-all active:scale-[0.95] text-sm flex items-center justify-center gap-1",
                      hCount >= 6
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-slate-600 hover:bg-slate-700 text-white shadow-md"
                    )}
                  >
                    <Plus size={16} /> إضافة
                  </button>
                  <button
                    onClick={removeH}
                    disabled={hCount === 0}
                    className={cn(
                      "py-2 px-3 rounded-xl font-bold transition-all active:scale-[0.95]",
                      hCount === 0
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-red-100 hover:bg-red-200 text-red-700"
                    )}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
              <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-red-700 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
                    أكسجين (O)
                  </span>
                  <span className="text-xl font-black font-mono text-red-700">{oCount}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addO}
                    disabled={oCount >= 4}
                    className={cn(
                      "flex-1 py-2 rounded-xl font-bold transition-all active:scale-[0.95] text-sm flex items-center justify-center gap-1",
                      oCount >= 4
                        ? "bg-red-200 text-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white shadow-md"
                    )}
                  >
                    <Plus size={16} /> إضافة
                  </button>
                  <button
                    onClick={removeO}
                    disabled={oCount === 0}
                    className={cn(
                      "py-2 px-3 rounded-xl font-bold transition-all active:scale-[0.95]",
                      oCount === 0
                        ? "bg-red-100 text-red-300 cursor-not-allowed"
                        : "bg-red-100 hover:bg-red-200 text-red-700"
                    )}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* عدادات الصيغة */}
            <div className="bg-white rounded-xl border border-slate-200 p-3">
              <div className="text-center">
                <span className="text-sm font-bold text-slate-600">الصيغة الحالية: </span>
                <span className="text-lg font-black font-mono text-slate-800">
                  {hCount > 0 || oCount > 0
                    ? `H${hCount > 0 ? hCount : ""} O${oCount > 0 ? oCount : ""}`
                    : "—"}
                </span>
                {isWater && (
                  <motion.span
                    className="mr-2 text-emerald-600 font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    ✅ H₂O!
                  </motion.span>
                )}
              </div>
            </div>

            {/* زر إعادة */}
            <button
              onClick={reset}
              className="w-full py-2.5 bg-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl font-bold text-sm transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-md"
            >
              <RotateCcw size={16} />
              تفريغ المختبر وإعادة المحاولة
            </button>

            {/* التشخيص */}
            <motion.div
              key={`atom-${hCount}-${oCount}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert type={diagnosis.type} title={diagnosis.title}>
                {diagnosis.desc}
              </Alert>
            </motion.div>

            {/* تلميح */}
            {!isWater && hCount + oCount > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-2 text-center text-xs text-purple-700 font-bold">
                💡 تذكر: الماء يتكون من ذرتي هيدروجين (H) وذرة أكسجين (O) واحدة
                — النسبة 2:1. لا أكثر ولا أقل!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

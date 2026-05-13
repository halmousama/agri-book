import { useState, useCallback, useEffect, useRef } from "react";
import {
  Shield,
  Bug,
  Search,
  Leaf,
  Timer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Radio,
  Drone,
  Zap,
  RotateCcw,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

/* ───── Types ───── */
type PestType = "aphids" | "mildew" | "caterpillars" | "mealybugs" | "root_rot";
type RemedyType = "neem" | "garlic" | "chili";

interface PestOutbreak {
  pest: PestType;
  pestLabel: string;
  pestIcon: string;
  correctRemedy: RemedyType;
  description: string;
}

interface RoundResult {
  round: number;
  correct: boolean;
  pest: string;
}

/* ───── Data ───── */
const PEST_SCENARIOS: PestOutbreak[] = [
  { pest: "aphids", pestLabel: "حشرة المن", pestIcon: "🐜", correctRemedy: "neem", description: "حشرة المن تمتص عصارة الأوراق وتسبب تشوهها" },
  { pest: "mildew", pestLabel: "البياض الدقيقي", pestIcon: "🍄", correctRemedy: "garlic", description: "فطر أبيض يغطي الأوراق ويمنع التمثيل الضوئي" },
  { pest: "caterpillars", pestLabel: "اليرقات", pestIcon: "🐛", correctRemedy: "chili", description: "يرقات تأكل الأوراق وتحدث ثقوبًا في المحصول" },
  { pest: "mealybugs", pestLabel: "البق الدقيقي", pestIcon: "🦟", correctRemedy: "neem", description: "حشرات صغيرة مغطاة بطبقة شمعية تمتص العصارة" },
  { pest: "root_rot", pestLabel: "عفن الجذور", pestIcon: "🦠", correctRemedy: "garlic", description: "فطريات تصيب الجذور وتسبب ذبول النبات" },
];

const REMEDY_META: Record<RemedyType, { label: string; icon: string; description: string }> = {
  neem: { label: "النيم (مبيد حشري طبيعي)", icon: "🌿", description: "مستخلص شجرة النيم — يربك دورة حياة الحشرات" },
  garlic: { label: "الثوم (مضاد فطري)", icon: "🧄", description: "مركبات كبريتية طبيعية مقاومة للفطريات والبكتيريا" },
  chili: { label: "الفلفل الحار (طارد للحشرات)", icon: "🌶️", description: "الكابسايسين يطرد الحشرات ويمنع التغذي على الأوراق" },
};

const TOTAL_ROUNDS = 5;
const TIMER_SECONDS = 5;

/* ───── Component ───── */
export const FarmHealthSim = () => {
  /* Prevention toggles */
  const [preventionClean, setPreventionClean] = useState(false);
  const [preventionQuarantine, setPreventionQuarantine] = useState(false);
  const [preventionNutrition, setPreventionNutrition] = useState(false);

  /* Monitoring */
  const [isMonitoring, setIsMonitoring] = useState(false);

  /* Game state */
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentPest, setCurrentPest] = useState<PestOutbreak | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [gamePhase, setGamePhase] = useState<"idle" | "outbreak" | "answered" | "finished">("idle");
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showScanAnim, setShowScanAnim] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const outbreakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Derived values */
  const shieldLevel = [preventionClean, preventionQuarantine, preventionNutrition].filter(Boolean).length;
  const immunityScore = Math.max(0, Math.min(100,
    (shieldLevel / 3) * 30 + (preventionNutrition ? 10 : 0) + (isMonitoring ? 15 : 0) - (100 - score) * 0.1
  ));

  const preventionActive = preventionClean || preventionQuarantine || preventionNutrition;

  /* Cleanup timers on unmount */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (outbreakTimerRef.current) clearTimeout(outbreakTimerRef.current);
    };
  }, []);

  /* Timer countdown during outbreak */
  useEffect(() => {
    if (gamePhase === "outbreak" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
    if (gamePhase === "outbreak" && timeLeft === 0) {
      /* Time's up — auto wrong answer */
      handleAnswer(null);
    }
  }, [gamePhase, timeLeft]);

  /* Random pest outbreak */
  const triggerOutbreak = useCallback(() => {
    const available = PEST_SCENARIOS.filter(
      (s) => !roundResults.find((r) => r.pest === s.pest)
    );
    if (available.length === 0) return;
    const picked = available[Math.floor(Math.random() * available.length)];
    setCurrentPest(picked);
    setTimeLeft(TIMER_SECONDS);
    setGamePhase("outbreak");
  }, [roundResults]);

  /* Handle player answer */
  const handleAnswer = useCallback((remedy: RemedyType | null) => {
    if (gamePhase !== "outbreak" || !currentPest) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = remedy === currentPest.correctRemedy;
    if (isCorrect) setScore((s) => s + 20);

    const result: RoundResult = {
      round: currentRound + 1,
      correct: isCorrect,
      pest: currentPest.pestLabel,
    };
    setRoundResults((prev) => [...prev, result]);
    setLastAnswerCorrect(isCorrect);
    setGamePhase("answered");

    /* Move to next round or finish */
    outbreakTimerRef.current = setTimeout(() => {
      const nextRound = currentRound + 1;
      if (nextRound >= TOTAL_ROUNDS) {
        setGamePhase("finished");
      } else {
        setCurrentRound(nextRound);
        setCurrentPest(null);
        setLastAnswerCorrect(null);
        setGamePhase("idle");
        setShowScanAnim(true);
        setTimeout(() => {
          setShowScanAnim(false);
          triggerOutbreak();
        }, 2000);
      }
    }, 2000);
  }, [gamePhase, currentPest, currentRound, triggerOutbreak]);

  /* Start game */
  const startGame = useCallback(() => {
    setGameStarted(true);
    setCurrentRound(0);
    setScore(0);
    setRoundResults([]);
    setLastAnswerCorrect(null);
    setGamePhase("idle");
    setShowScanAnim(true);
    setTimeout(() => {
      setShowScanAnim(false);
      triggerOutbreak();
    }, 2000);
  }, [triggerOutbreak]);

  /* Reset entire sim */
  const resetSim = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (outbreakTimerRef.current) clearTimeout(outbreakTimerRef.current);
    setPreventionClean(false);
    setPreventionQuarantine(false);
    setPreventionNutrition(false);
    setIsMonitoring(false);
    setGameStarted(false);
    setCurrentRound(0);
    setCurrentPest(null);
    setTimeLeft(TIMER_SECONDS);
    setScore(0);
    setRoundResults([]);
    setGamePhase("idle");
    setLastAnswerCorrect(null);
    setShowScanAnim(false);
  }, []);

  const isGameRunning = gamePhase === "outbreak" || gamePhase === "answered";

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="px-5 py-3 border-b border-amber-500/10 bg-gradient-to-r from-amber-900/30 to-emerald-900/30 rounded-t-2xl -mx-6 -mt-6 md:-mx-8 md:-mt-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-amber-400/80 tracking-wider uppercase">Farm Health Simulator</span>
          </div>
          <h3 className="text-sm font-bold text-white mt-1">🛡️ النظام الصحي — مناعة المزرعة الطبيعية</h3>
        </div>

        {/* ── Immunity Score Bar ── */}
        <div className="mt-5 mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-amber-50 dark:from-slate-800/80 dark:to-amber-900/20 border border-amber-200/50 dark:border-amber-700/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Shield size={14} className="text-amber-500" /> مناعة المزرعة
            </span>
            <motion.span
              key={Math.round(immunityScore)}
              className={cn(
                "text-lg font-black font-mono",
                immunityScore > 70 ? "text-emerald-600" : immunityScore > 40 ? "text-amber-600" : "text-red-600"
              )}
            >
              {Math.round(immunityScore)}%
            </motion.span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full",
                immunityScore > 70 ? "bg-gradient-to-r from-emerald-400 to-emerald-600" :
                immunityScore > 40 ? "bg-gradient-to-r from-amber-400 to-amber-600" :
                "bg-gradient-to-r from-red-400 to-red-600"
              )}
              animate={{ width: `${Math.round(immunityScore)}%` }}
              transition={{ type: "spring", stiffness: 40 }}
            />
          </div>
        </div>

        {/* ── LINE 1: الوقاية (Prevention) ── */}
        <div className="mb-5 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/30">
          <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
            <Shield size={14} /> خط الدفاع الأول: الوقاية
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPreventionClean((v) => !v)}
              className={cn(
                "py-2.5 px-1 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97]",
                preventionClean
                  ? "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300"
                  : "bg-white border-slate-300 text-slate-500 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-600"
              )}
            >
              <span className="block text-lg mb-0.5">🧹</span>
              نظافة حية
            </button>
            <button
              onClick={() => setPreventionQuarantine((v) => !v)}
              className={cn(
                "py-2.5 px-1 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97]",
                preventionQuarantine
                  ? "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300"
                  : "bg-white border-slate-300 text-slate-500 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-600"
              )}
            >
              <span className="block text-lg mb-0.5">🚧</span>
              حجر صحي
            </button>
            <button
              onClick={() => setPreventionNutrition((v) => !v)}
              className={cn(
                "py-2.5 px-1 rounded-xl text-xs font-bold border-2 transition-all active:scale-[0.97]",
                preventionNutrition
                  ? "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300"
                  : "bg-white border-slate-300 text-slate-500 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-600"
              )}
            >
              <span className="block text-lg mb-0.5">🥗</span>
              تغذية متوازنة
            </button>
          </div>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  i < shieldLevel ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                )}
                animate={i < shieldLevel ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                🛡
              </motion.div>
            ))}
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mr-2">
              درع {shieldLevel}/3 نشط
            </span>
          </div>
        </div>

        {/* ── LINE 2: المراقبة (Monitoring) ── */}
        <div className="mb-5 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/30">
          <h4 className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-1.5">
            <Search size={14} /> خط الدفاع الثاني: المراقبة
          </h4>
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              {[
                { icon: "👁️", label: "جولات المزارع", active: true },
                { icon: "📡", label: "مستشعرات", active: isMonitoring },
                { icon: "🛸", label: "طائرات درون", active: isMonitoring },
              ].map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all",
                    item.active
                      ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300"
                      : "bg-white border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-600"
                  )}
                >
                  <span className="block text-center text-sm">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsMonitoring((v) => !v)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-bold border-2 transition-all active:scale-[0.97]",
                isMonitoring
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white border-slate-300 text-slate-500 hover:border-blue-300 dark:bg-slate-800 dark:border-slate-600"
              )}
            >
              {isMonitoring ? "🟢 نشط" : "⏸ غير نشط"}
            </button>
          </div>

          {/* Scanning animation */}
          <div className="relative h-10 rounded-lg bg-slate-900/5 dark:bg-slate-800/50 overflow-hidden border border-blue-200/50 dark:border-blue-700/30">
            <div className="absolute inset-0 flex items-center justify-around text-[8px] text-slate-400 dark:text-slate-500 px-2">
              <span>👁️ جولة صباحية</span>
              <span>📡 مستشعرات</span>
              <span>🛸 درون أسبوعي</span>
            </div>
            {isMonitoring && (
              <motion.div
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
            {showScanAnim && (
              <motion.div
                className="absolute inset-0 bg-blue-400/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2 }}
              >
                <span className="text-xs font-bold text-blue-600">🔍 فحص المزرعة...</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── LINE 3: العلاج الطبيعي / Game Zone ── */}
        <div className="mb-5 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-700/30">
          <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-1.5">
            <Leaf size={14} /> خط الدفاع الثالث: العلاج الطبيعي
          </h4>

          {!gameStarted ? (
            <div className="text-center py-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                اختبر قدرتك على حماية المزرعة! واجه 5 هجمات آفات واختر العلاج الطبيعي الصحيح.
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.97] shadow-lg shadow-amber-200/50"
              >
                🎮 ابدأ التحدي (5 جولات)
              </button>
            </div>
          ) : gamePhase === "finished" ? (
            /* ── Results ── */
            <div className="text-center py-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                <span className="text-4xl block mb-2">{score >= 80 ? "🏆" : score >= 60 ? "🌟" : "💪"}</span>
              </motion.div>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                النتيجة: {score} / 100
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {score >= 80 ? "مزارع محترف! مناعتك قوية!" : score >= 60 ? "أداء جيد! واصل التعلم." : "حاول مرة أخرى لتحسين مناعتك."}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {roundResults.map((r, i) => (
                  <div
                    key={i}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold border",
                      r.correct
                        ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                        : "bg-red-100 border-red-300 text-red-700"
                    )}
                  >
                    جولة {r.round}: {r.correct ? "✅" : "❌"} {r.pest}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={startGame}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.97]"
                >
                  🔄 أعد التحدي
                </button>
                <button
                  onClick={resetSim}
                  className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold text-sm transition-all active:scale-[0.97] flex items-center gap-1"
                >
                  <RotateCcw size={14} /> إعادة
                </button>
              </div>
            </div>
          ) : (
            /* ── Active Game ── */
            <div>
              {/* Round info */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  الجولة {currentRound + 1} / {TOTAL_ROUNDS}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Star size={12} /> {score} نقطة
                </span>
              </div>

              <AnimatePresence mode="wait">
                {/* Outbreak alert */}
                {gamePhase === "outbreak" && currentPest && (
                  <motion.div
                    key={`outbreak-${currentRound}`}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl p-4 mb-3 text-center">
                      <motion.span
                        className="text-3xl block mb-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        🚨
                      </motion.span>
                      <p className="text-sm font-bold text-red-700 dark:text-red-300">
                        {currentPest.pestIcon} {currentPest.pestLabel}!
                      </p>
                      <p className="text-[11px] text-red-600/70 dark:text-red-400/70 mt-1">
                        {currentPest.description}
                      </p>
                      <div className="flex items-center justify-center gap-1.5 mt-2">
                        <Timer size={14} className="text-red-500" />
                        <span className={cn(
                          "font-mono font-bold text-lg",
                          timeLeft <= 2 ? "text-red-600" : "text-amber-600"
                        )}>
                          {timeLeft}
                        </span>
                        <span className="text-[10px] text-slate-500">ثوانٍ متبقية</span>
                      </div>
                      {/* Timer bar */}
                      <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-600"
                          animate={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Remedy cards */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 text-center">
                      اختر العلاج الطبيعي المناسب:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.entries(REMEDY_META) as [RemedyType, typeof REMEDY_META[RemedyType]][]).map(([key, meta]) => (
                        <motion.button
                          key={key}
                          onClick={() => handleAnswer(key)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          className="py-3 px-1 rounded-xl border-2 border-amber-300/60 bg-white dark:bg-slate-800 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all text-center"
                        >
                          <span className="text-xl block mb-1">{meta.icon}</span>
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight block">
                            {meta.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Answer feedback */}
                {gamePhase === "answered" && (
                  <motion.div
                    key={`answer-${currentRound}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    {lastAnswerCorrect ? (
                      <div>
                        <motion.span
                          className="text-3xl block mb-1"
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          ✅
                        </motion.span>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">إجابة صحيحة!</p>
                        <p className="text-[11px] text-emerald-600/60">+20 نقطة — مناعة المزرعة قوية!</p>
                      </div>
                    ) : (
                      <div>
                        <motion.span
                          className="text-3xl block mb-1"
                          animate={{ rotate: [0, -15, 15, -15, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          ❌
                        </motion.span>
                        <p className="text-sm font-bold text-red-600 dark:text-red-400">إجابة خاطئة!</p>
                        <p className="text-[11px] text-red-600/60">
                          العلاج الصحيح: {currentPest && (() => {
                            const r = REMEDY_META[currentPest.correctRemedy];
                            return `${r.icon} ${r.label}`;
                          })()}
                        </p>
                      </div>
                    )}
                    <div className="mt-2 w-16 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
                      <motion.div
                        className="h-full bg-amber-500 rounded-full"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, ease: "linear" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scan between rounds */}
              {gamePhase === "idle" && showScanAnim && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-2"
                  >
                    <Radio size={24} className="text-blue-500" />
                  </motion.div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">🔍 جاري مسح المزرعة...</p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* ── Status summary during game ── */}
        {gameStarted && gamePhase !== "finished" && (
          <div className="bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-900/20 dark:to-emerald-900/20 border border-amber-200/50 dark:border-amber-700/30 rounded-xl p-2 text-center text-[10px] text-slate-500 dark:text-slate-400 font-bold shadow-sm">
            🛡️ مناعة {Math.round(immunityScore)}% | 🎯 {score} نقطة | 🔄 جولة {currentRound + 1}/{TOTAL_ROUNDS}
            {!preventionActive && " | ⚠ فعّل الوقاية لتعزيز المناعة"}
          </div>
        )}

        {/* Reset button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetSim}
            className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold transition-all active:scale-[0.97] flex items-center gap-1"
          >
            <RotateCcw size={12} /> إعادة المحاكاة
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmHealthSim;

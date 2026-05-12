import { useState } from "react";
import { Anchor, ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

const steps = [
  { title: "مرر الخيط من العين", desc: "أدخل الخيط الرئيسي في عين الصنارة أو المشبك الدوار. اترك 10 سم من الطرف الحر.", tip: "بلل طرف الخيط لتسهيل المرور." },
  { title: "لف الخيط حول نفسه", desc: "لف الطرف الحر حول الخيط الرئيسي 5-6 لفات باتجاه عقارب الساعة. اللفات المنتظمة توزع القوى بالتساوي.", tip: "حافظ على اللفات متجاورة ومتساوية." },
  { title: "أعد الخيط من الفتحة الأولى", desc: "مرر الطرف الحر من الفراغ الأول فوق عين الصنارة (من الأمام بين الخيط الرئيسي والعين).", tip: "لا تترك مسافة كبيرة بين العين واللفات." },
  { title: "أعد الخيط من الحلقة الكبيرة", desc: "مرر الطرف الحر مرة أخرى من الحلقة الكبيرة التي كوّنتها اللفات (عكس الاتجاه).", tip: "هذه الخطوة تثبت العقدة وتمنع انزلاقها." },
  { title: "اشد الخيط بقوة", desc: "اشد الخيط الرئيسي بقوة. العقدة ستتصف وتستقر. قص الطرف الزائد تاركاً 2-3 مم.", tip: "بلل العقدة بقليل من الماء قبل الشد لتجنب احتكاك الخيط." },
];

export const MarineKnotsSim = () => {
  const [step, setStep] = useState(1);
  const [tightness, setTightness] = useState(30);

  const index = Math.min(step - 1, steps.length - 1);
  const currentStep = steps[index];

  const isComplete = step > 5;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <Anchor className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">مدرب العقد البحرية — Marine Knots</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">عقدة بالومار المحسّنة (Improved Clinch Knot)</p>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
            isComplete ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-blue-50 border-blue-300 text-blue-700"
          )}>
            {isComplete ? "✅ العقدة مكتملة!" : `الخطوة ${step} من 5`}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 shrink-0 space-y-2">
            <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-2">
              <svg viewBox="0 0 240 200" className="w-full h-full">
                <defs>
                  <radialGradient id="knotBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0f9ff" />
                    <stop offset="100%" stopColor="#e0f2fe" />
                  </radialGradient>
                  <filter id="knotShadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#3b82f6" floodOpacity="0.2" />
                  </filter>
                </defs>

                <rect width="240" height="200" fill="url(#knotBg)" rx="8" />

                <AnimatePresence mode="wait">
                  <motion.g
                    key={step}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step >= 1 && (
                      <>
                        <line x1="30" y1="40" x2="80" y2="40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        <line x1="80" y1="40" x2="100" y2="40" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 2" />
                        <line x1="100" y1="40" x2="210" y2="40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="100" cy="40" r="6" fill="#3b82f6" opacity="0.3" />
                        {step >= 2 && Array.from({ length: 5 }).map((_, i) => (
                          <motion.path
                            key={i}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            d={`M${110 + i * 15},40 Q${115 + i * 15},${35 - i * 2} ${120 + i * 15},40`}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        ))}
                        {step >= 3 && (
                          <path d="M100,40 Q90,55 85,70" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
                        )}
                        {step >= 4 && (
                          <path d="M100,40 Q115,55 120,70" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
                        )}
                        {step >= 5 && (
                          <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                            <circle cx="120" cy="42" r="8" fill="#10b981" opacity={0.2} />
                            <circle cx="120" cy="42" r="4" fill="#10b981" opacity={0.4} />
                          </motion.g>
                        )}
                      </>
                    )}

                    {isComplete && (
                      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                        <text x="120" y="110" textAnchor="middle" fontSize="24">✅</text>
                        <text x="120" y="130" textAnchor="middle" fontSize="8" fill="#10b981" fontWeight="bold">عقدة مكتملة — قوة ربط ممتازة</text>
                      </motion.g>
                    )}

                    <text x="120" y="180" textAnchor="middle" fontSize="7" fill="#64748b">قوة الربط: {tightness}%</text>
                  </motion.g>
                </AnimatePresence>
              </svg>
            </div>

            <div className={cn(
              "p-3 rounded-xl text-center font-bold text-sm border-2",
              isComplete ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-blue-50 border-blue-300 text-blue-700"
            )}>
              {isComplete ? "🎣 عقدة جاهزة! قص الطرف الزائد." : steps[index].title}
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{currentStep.desc}</p>
            </div>

            <Slider
              label="قوة الشد (Tightness)"
              value={tightness}
              min={0}
              max={100}
              unit="%"
              color="blue"
              onChange={(e) => setTightness(Number(e.target.value))}
            />

            <div className="flex gap-2">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step <= 1}
                className={cn(
                  "flex-1 p-3 rounded-xl font-bold text-sm border-2 transition-all",
                  step <= 1 ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-white text-slate-700 border-blue-200 hover:bg-blue-50"
                )}
              >
                ← الخطوة السابقة
              </button>
              <button
                onClick={() => setStep(Math.min(6, step + 1))}
                disabled={isComplete}
                className={cn(
                  "flex-1 p-3 rounded-xl font-bold text-sm border-2 transition-all",
                  isComplete ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed" : "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                )}
              >
                {isComplete ? "✅ اكتملت" : "الخطوة التالية →"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Alert type="info" title={`💡 نصيحة: ${currentStep.tip}`}>
            {step < 5 ? "اتبع الخطوات بالترتيب. بلل الخيط قبل الشد النهائي." : "اختبر العقدة بشد جاف قبل الرمي. قص الطرف الزائد بدقة."}
          </Alert>
          {tightness < 50 && (
            <Alert type="warning" title="⚠️ الشد ضعيف">
              قوة الربط منخفضة. اشد الخيط بقوة أكبر لتثبيت العقدة. العقدة المرتخية تنفك تحت ضغط السمكة.
            </Alert>
          )}
          {tightness >= 80 && isComplete && (
            <Alert type="success" title="✅ عقدة مثالية!">
              العقدة محكمة ومثبتة بشكل ممتاز. قص الطرف الزائد وأنت جاهز للرمي!
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

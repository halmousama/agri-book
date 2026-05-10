import { useState } from "react";
import {
  Shield,
  Bug,
  Search,
  Droplets,
  Skull,
  AlertOctagon,
  Leaf,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

type InfectionType = "healthy" | "fungus" | "bacteria" | "insect";

const INFECTION_META: Record<
  InfectionType,
  { label: string; colorClass: string; textColor: string; btnClass: string; icon: string }
> = {
  healthy: {
    label: "سليم",
    colorClass: "bg-emerald-100 text-emerald-700 border-emerald-300",
    textColor: "text-emerald-700",
    btnClass:
      "border-green-500 bg-green-50 text-green-700",
    icon: "🛡",
  },
  fungus: {
    label: "إصابة فطرية",
    colorClass: "bg-purple-100 text-purple-700 border-purple-300",
    textColor: "text-purple-700",
    btnClass:
      "border-purple-500 bg-purple-50 text-purple-700",
    icon: "🍄",
  },
  bacteria: {
    label: "إصابة بكتيرية",
    colorClass: "bg-amber-100 text-amber-800 border-amber-300",
    textColor: "text-amber-800",
    btnClass:
      "border-amber-500 bg-amber-50 text-amber-700",
    icon: "🦠",
  },
  insect: {
    label: "إصابة حشرية",
    colorClass: "bg-red-100 text-red-700 border-red-300",
    textColor: "text-red-700",
    btnClass:
      "border-red-500 bg-red-50 text-red-700",
    icon: "🐛",
  },
};

export const ProtectionSimulator = () => {
  const [infection, setInfection] = useState<InfectionType>("healthy");

  const meta = INFECTION_META[infection];

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-rose-200 dark:border-rose-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-lg shadow-rose-200/50">
              <Search className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                المجهر التشخيصي
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تشخيص الأمراض النباتية — فطر، بكتيريا، حشرات
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              meta.colorClass
            )}
            animate={infection !== "healthy" ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {meta.icon} {meta.label}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== SVG Panel ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-80 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <filter id="blurProt">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                </filter>
                <filter id="glowProt">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="leafGradProt" cx="50%" cy="50%" r="60%">
                  <stop
                    offset="0%"
                    stopColor={
                      infection === "bacteria" ? "#4ade80" : "#22c55e"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      infection === "bacteria" ? "#22c55e" : "#16a34a"
                    }
                  />
                </radialGradient>
              </defs>

              {/* Background — microscope lens effect */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="6"
              />
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Leaf base */}
              <path
                d="M100,180 Q170,100 100,20 Q30,100 100,180"
                fill="url(#leafGradProt)"
                stroke="#16a34a"
                strokeWidth="2"
              />
              <path
                d="M100,180 L100,30"
                stroke="#15803d"
                strokeWidth="1.2"
                opacity="0.4"
              />

              {/* === Infection layers === */}

              {/* Fungus */}
              <AnimatePresence>
                {infection === "fungus" && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Powdery mildew spots */}
                    <circle
                      cx="60"
                      cy="80"
                      r="14"
                      fill="white"
                      opacity="0.55"
                      filter="url(#blurProt)"
                    />
                    <circle
                      cx="130"
                      cy="110"
                      r="18"
                      fill="white"
                      opacity="0.45"
                      filter="url(#blurProt)"
                    />
                    <circle
                      cx="100"
                      cy="55"
                      r="9"
                      fill="white"
                      opacity="0.6"
                      filter="url(#blurProt)"
                    />
                    <circle
                      cx="75"
                      cy="130"
                      r="11"
                      fill="white"
                      opacity="0.5"
                      filter="url(#blurProt)"
                    />

                    {/* Dry ring spots */}
                    <motion.circle
                      cx="80"
                      cy="135"
                      r="10"
                      fill="#713f12"
                      opacity="0.7"
                      animate={{ r: [10, 11, 10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <circle
                      cx="80"
                      cy="135"
                      r="6"
                      fill="#a16207"
                      opacity="0.9"
                    />
                    <circle
                      cx="80"
                      cy="135"
                      r="3"
                      fill="#713f12"
                      opacity="1"
                    />

                    {/* Fungal mycelium threads */}
                    <motion.path
                      d="M60,80 Q55,70 50,75"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.8"
                      animate={{ d: ["M60,80 Q55,70 50,75", "M60,80 Q58,68 52,72"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.path
                      d="M130,110 Q135,100 128,95"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.8"
                      animate={{ d: ["M130,110 Q135,100 128,95", "M130,110 Q132,98 126,92"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Bacteria */}
              <AnimatePresence>
                {infection === "bacteria" && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Greasy spots */}
                    <path
                      d="M55,95 Q65,85 75,105 Q55,115 55,95"
                      fill="#3f6212"
                      opacity="0.85"
                    />
                    <path
                      d="M135,75 Q145,65 155,85 Q130,95 135,75"
                      fill="#3f6212"
                      opacity="0.85"
                    />

                    {/* Wet sheen */}
                    <ellipse
                      cx="65"
                      cy="100"
                      rx="5"
                      ry="2"
                      fill="white"
                      opacity="0.35"
                      transform="rotate(-15, 65, 100)"
                    />
                    <ellipse
                      cx="145"
                      cy="80"
                      rx="5"
                      ry="2"
                      fill="white"
                      opacity="0.35"
                      transform="rotate(-15, 145, 80)"
                    />

                    {/* Bacterial ooze drip */}
                    <motion.path
                      d="M70,105 Q70,115 68,120"
                      stroke="#3f6212"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.6"
                      animate={{ d: ["M70,105 Q70,115 68,120", "M70,105 Q70,118 70,125"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Smell indicator */}
                    <text
                      x="100"
                      y="175"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#78350f"
                      fontWeight="bold"
                    >
                      رائحة عفن!
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Insects */}
              <AnimatePresence>
                {infection === "insect" && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Holes in leaf */}
                    <circle
                      cx="45"
                      cy="90"
                      r="7"
                      fill="#f8fafc"
                      stroke="#16a34a"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M150,95 Q140,105 150,115"
                      fill="#f8fafc"
                      stroke="#16a34a"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="120"
                      cy="150"
                      r="5"
                      fill="#f8fafc"
                      stroke="#16a34a"
                      strokeWidth="1.5"
                    />

                    {/* Insects crawling */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.g
                        key={`bug-${i}`}
                        animate={{
                          x: [0, 5, -3, 2, 0],
                          y: [0, 3, -2, -4, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      >
                        {/* Bug body */}
                        <ellipse
                          cx={70 + i * 20}
                          cy={60 + i * 15}
                          rx="4"
                          ry="3"
                          fill="#1e293b"
                        />
                        {/* Legs */}
                        <line
                          x1={68 + i * 20}
                          y1={58 + i * 15}
                          x2={66 + i * 20}
                          y2={54 + i * 15}
                          stroke="#1e293b"
                          strokeWidth="0.8"
                        />
                        <line
                          x1={72 + i * 20}
                          y1={58 + i * 15}
                          x2={74 + i * 20}
                          y2={54 + i * 15}
                          stroke="#1e293b"
                          strokeWidth="0.8"
                        />
                      </motion.g>
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Microscope rim shadow */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="black"
                strokeWidth="1"
                opacity="0.05"
              />
            </svg>
          </div>

          {/* ===== Controls Panel ===== */}
          <div className="flex-1 space-y-3">
            {/* Diagnosis buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInfection("healthy")}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all flex items-center gap-2 justify-center text-xs font-bold",
                  infection === "healthy"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-slate-100 text-slate-500 hover:bg-slate-50"
                )}
              >
                <Shield size={16} />
                سليم
              </button>
              <button
                onClick={() => setInfection("fungus")}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all flex items-center gap-2 justify-center text-xs font-bold",
                  infection === "fungus"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-slate-100 text-slate-500 hover:bg-slate-50"
                )}
              >
                <Droplets size={16} />
                فطر
              </button>
              <button
                onClick={() => setInfection("bacteria")}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all flex items-center gap-2 justify-center text-xs font-bold",
                  infection === "bacteria"
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-slate-100 text-slate-500 hover:bg-slate-50"
                )}
              >
                <Skull size={16} />
                بكتيريا
              </button>
              <button
                onClick={() => setInfection("insect")}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all flex items-center gap-2 justify-center text-xs font-bold",
                  infection === "insect"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-100 text-slate-500 hover:bg-slate-50"
                )}
              >
                <Bug size={16} />
                حشرة
              </button>
            </div>

            {/* Quick reference */}
            <div className="bg-white rounded-xl border border-slate-200 p-2">
              <div className="grid grid-cols-4 gap-1 text-center text-[9px] font-bold text-slate-500">
                <span>🛡 سليم</span>
                <span>🍄 فطر</span>
                <span>🦠 بكتيريا</span>
                <span>🐛 حشرة</span>
              </div>
            </div>

            {/* Diagnosis */}
            <motion.div
              key={`prot-${infection}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {infection === "healthy" ? (
                <Alert type="success" title="✅ نبات سليم — لا توجد إصابة">
                  الورقة سليمة، خضراء، نظيفة. لا توجد بقع ولا ثقوب. استمر في
                  العناية المتوازنة (الري والتسميد). الوقاية خير من العلاج —
                  حافظ على التهوية الجيدة والري المناسب.
                </Alert>
              ) : infection === "fungus" ? (
                <Alert type="warning" title="🍄 إصابة فطرية (Fungal)">
                  العلامة: نمو زغبي أبيض (مثل القطن أو الدقيق) أو بقع جافة ذات
                  حلقات دائرية. الفطر يحب الرطوبة لكن أثره جاف. الحل: مبيد فطري
                  (Fungicide) + تقليل الرطوبة الجوية وتحسين التهوية. لا تبل
                  الأوراق عند الري.
                </Alert>
              ) : infection === "bacteria" ? (
                <Alert type="danger" title="🦠 إصابة بكتيرية (Bacterial)">
                  العلامة: بقع مائية (زيتية) رطبة، غالباً لها رائحة كريهة
                  (عفن). الأنسجة تذوب وتصبح لزجة. الحل: صعب جداً! استخدم مركبات
                  النحاس (مثل بوردو ميكس)، واقلم الأفرع المصابة واحرقها فوراً
                  لمنع انتشارها.
                </Alert>
              ) : (
                <Alert type="danger" title="🐛 إصابة حشرية (Insect)">
                  العلامة: ضرر فيزيائي واضح (ثقوب أكل، أو ورقة مجعدة)، ووجود
                  الحشرة نفسها أو فضلاتها. الحل: مبيد حشري (Insecticide) مناسب،
                  أو استخدام المكافحة الحيوية (الحشرات النافعة مثل الدعسوقة).
                </Alert>
              )}
            </motion.div>

            {infection !== "healthy" && (
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-2 text-center text-xs text-rose-700 font-bold">
                💡 التشخيص المبكر يمنع انتشار المرض. افحص نباتاتك أسبوعياً
                بحثاً عن أي أعراض غير طبيعية.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

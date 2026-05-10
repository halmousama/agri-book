import { useState } from "react";
import {
  Sun,
  Zap,
  Info,
  Sprout,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

const LIGHT_COLORS = [
  {
    key: "white",
    label: "أبيض (شمس)",
    val: 100,
    desc: "الطيف الكامل — مثالي لجميع مراحل النمو",
    color: "#fcd34d",
    bg: "bg-yellow-50 border-yellow-200 text-yellow-700",
    btnBorder: "border-yellow-400",
    efficiency: "ممتازة",
  },
  {
    key: "red",
    label: "أحمر",
    val: 90,
    desc: "660nm — يحفز الإزهار وتكوين الثمار",
    color: "#ef4444",
    bg: "bg-red-50 border-red-200 text-red-700",
    btnBorder: "border-red-400",
    efficiency: "ممتازة",
  },
  {
    key: "blue",
    label: "أزرق",
    val: 85,
    desc: "450nm — يحفز النمو الخضري وتكوين الأوراق",
    color: "#3b82f6",
    bg: "bg-blue-50 border-blue-200 text-blue-700",
    btnBorder: "border-blue-400",
    efficiency: "جيدة جداً",
  },
  {
    key: "green",
    label: "أخضر",
    val: 20,
    desc: "550nm — يعكسه النبات (لذلك نراه أخضر)، كفاءة تمثيل ضوئي ضعيفة",
    color: "#22c55e",
    bg: "bg-green-50 border-green-200 text-green-700",
    btnBorder: "border-green-400",
    efficiency: "ضعيفة",
  },
];

export const LightPrism = () => {
  const [selectedColor, setSelectedColor] = useState(LIGHT_COLORS[0]);
  const [lightIntensity, setLightIntensity] = useState(100);

  const effectivePAR = Math.round(
    (selectedColor.val * lightIntensity) / 100
  );

  const getStatus = () => {
    if (effectivePAR > 80)
      return {
        label: "✅ تمثيل ضوئي ممتاز",
        color: "bg-emerald-100 text-emerald-700 border-emerald-300",
      };
    if (effectivePAR > 50)
      return {
        label: "🟡 كفاءة جيدة",
        color: "bg-amber-100 text-amber-700 border-amber-300",
      };
    return {
      label: "🔴 كفاءة ضعيفة",
      color: "bg-red-100 text-red-700 border-red-300",
    };
  };
  const status = getStatus();

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-200 dark:border-amber-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl shadow-lg shadow-amber-200/50">
              <Sun className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                مختبر الطيف — ألوان الضوء
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                كيف تؤثر ألوان الضوء على التمثيل الضوئي؟
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
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="darkBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="60%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <radialGradient id="lightGlow" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor={selectedColor.color} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={selectedColor.color} stopOpacity="0" />
                </radialGradient>
                <filter id="lightFilter">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#darkBg)" rx="12" />

              {/* مصدر الضوء */}
              <g transform="translate(130, 25)">
                {/* وهج المصدر */}
                <motion.circle
                  cx="0" cy="0" r="35"
                  fill={selectedColor.color}
                  opacity="0.15"
                  animate={{ r: [35, 45, 35] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* لمبة */}
                <path
                  d="M-12,0 Q-12,-18 0,-22 Q12,-18 12,0 Q12,8 8,12 Q4,16 4,20 L-4,20 Q-4,16 -8,12 Q-12,8 -12,0 Z"
                  fill={selectedColor.color}
                  opacity={0.9}
                  filter="url(#lightFilter)"
                />
                <rect x="-6" y="20" width="12" height="4" rx="1" fill="#94a3b8" />
                <text x="0" y="-30" textAnchor="middle" fontSize="6" fill="#94a3b8" fontWeight="bold">
                  {selectedColor.label}
                </text>
              </g>

              {/* مخروط الضوء */}
              <path
                d="M105,30 Q80,90 60,180 L200,180 Q180,90 155,30 Z"
                fill="url(#lightGlow)"
                opacity={0.3 + effectivePAR / 300}
              />

              {/* الأشعة الضوئية */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.line
                  key={`ray-${i}`}
                  x1={110 + i * 10}
                  y1={40}
                  x2={60 + i * 30}
                  y2={170}
                  stroke={selectedColor.color}
                  strokeWidth="1"
                  opacity="0.2"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{
                    duration: 1.5 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* التربة */}
              <path d="M20,280 Q130,270 240,280" stroke="#78350f" strokeWidth="8" fill="none" />
              <path d="M20,285 Q130,275 240,285" stroke="#451a03" strokeWidth="15" fill="none" opacity="0.5" />

              {/* ساق النبات */}
              <path d="M130,275 L130,180" stroke="#16a34a" strokeWidth="5" fill="none" strokeLinecap="round" />

              {/* الأوراق — تستجيب للضوء */}
              <g
                style={{
                  transformOrigin: "130px 275px",
                }}
              >
                <motion.g
                  animate={{
                    scale: 0.5 + effectivePAR / 200,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {/* الورقة اليمنى السفلية */}
                  <path
                    d="M130,230 Q170,200 185,230 Q160,250 130,230"
                    fill={effectivePAR > 50 ? "#22c55e" : "#86efac"}
                    opacity={0.9}
                  />
                  {/* الورقة اليسرى السفلية */}
                  <path
                    d="M130,210 Q90,180 75,210 Q100,230 130,210"
                    fill={effectivePAR > 50 ? "#16a34a" : "#86efac"}
                    opacity={0.9}
                  />
                  {/* الورقة القمية */}
                  <path
                    d="M130,180 Q160,140 130,110 Q100,140 130,180"
                    fill={effectivePAR > 50 ? "#22c55e" : "#a3e635"}
                  />
                  {/* عرق الورقة القمية */}
                  <line x1="130" y1="180" x2="130" y2="120" stroke="#15803d" strokeWidth="1.5" />
                </motion.g>
              </g>

              {/* فقاعات أكسجين — دليل التمثيل الضوئي */}
              <AnimatePresence>
                {effectivePAR > 50 &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <motion.circle
                      key={`o2-${i}`}
                      cx={110 + i * 15}
                      cy={170 + i * 5}
                      r="2"
                      fill="white"
                      opacity="0.6"
                      animate={{
                        cy: [170 + i * 5, 70 + i * 10],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 2.5 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut",
                      }}
                    />
                  ))}
              </AnimatePresence>

              {/* مؤشرات */}
              <g transform="translate(10, 250)">
                <rect
                  x="0" y="0" width="240" height="55" rx="8"
                  fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"
                />

                <text x="10" y="14" fontSize="6" fill="#64748b">كفاءة التمثيل الضوئي</text>
                <rect x="10" y="18" width="140" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="6" rx="3"
                  fill={effectivePAR > 80 ? "#22c55e" : effectivePAR > 50 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(effectivePAR / 100) * 140}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="155" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {effectivePAR}%
                </text>

                <text x="10" y="42" fontSize="6" fill="#64748b">شدة الإضاءة</text>
                <rect x="10" y="46" width="70" height="5" rx="2.5" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="46" height="5" rx="2.5" fill="#f59e0b"
                  animate={{ width: `${(lightIntensity / 100) * 70}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="85" y="51" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {lightIntensity}%
                </text>

                <text x="130" y="42" fontSize="6" fill="#64748b">لون الضوء</text>
                <text x="210" y="51" fontSize="7" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {selectedColor.efficiency}
                </text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            {/* أزرار اختيار اللون */}
            <div className="bg-white rounded-xl border border-slate-200 p-3">
              <label className="text-xs font-bold text-slate-600 block mb-2">
                اختر لون الإضاءة:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {LIGHT_COLORS.map((lc) => (
                  <button
                    key={lc.key}
                    onClick={() => setSelectedColor(lc)}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold border-2 transition-all",
                      selectedColor.key === lc.key
                        ? `${lc.bg} ${lc.btnBorder}`
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-1"
                      style={{ backgroundColor: lc.color }}
                    />
                    {lc.label}
                  </button>
                ))}
              </div>
            </div>

            <Slider
              label="شدة الإضاءة"
              value={lightIntensity}
              min={0}
              max={100}
              unit="%"
              color="amber"
              onChange={(e) => setLightIntensity(Number(e.target.value))}
            />

            {/* عدادات */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl p-4 border",
                  effectivePAR > 80
                    ? "bg-emerald-50 border-emerald-200"
                    : effectivePAR > 50
                      ? "bg-amber-50 border-amber-200"
                      : "bg-red-50 border-red-200"
                )}
              >
                <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Zap size={12} className="text-yellow-500" /> PAR فعال
                </div>
                <div
                  className={cn(
                    "text-2xl font-black font-mono",
                    effectivePAR > 80
                      ? "text-emerald-600"
                      : effectivePAR > 50
                        ? "text-amber-600"
                        : "text-red-600"
                  )}
                >
                  {effectivePAR}%
                </div>
              </div>
              <div className="rounded-xl p-4 border bg-slate-50 border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <Sprout size={12} className="text-green-500" /> الطول الموجي
                </div>
                <div className="text-lg font-black font-mono text-slate-700">
                  {selectedColor.key === "white"
                    ? "400-700nm"
                    : selectedColor.key === "red"
                      ? "660nm"
                      : selectedColor.key === "blue"
                        ? "450nm"
                        : "550nm"}
                </div>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`light-${selectedColor.key}-${lightIntensity}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {effectivePAR > 80 ? (
                <Alert type="success" title="✅ تمثيل ضوئي ممتاز!">
                  {selectedColor.key === "white"
                    ? `الضوء الأبيض الطبيعي يعطي ${effectivePAR}% كفاءة — أفضل خيار لجميع مراحل النمو. النبات يمتص الأحمر (660nm) والأزرق (450nm) بكفاءة عالية.`
                    : `الضوء ${selectedColor.label} ${selectedColor.desc}. الكفاءة ${effectivePAR}% — ممتاز! ${selectedColor.key === "red" ? "هذا هو الطول الذي تحتاجه للإزهار والإثمار." : "هذا هو الطول الذي تحتاجه للنمو الخضري وتكوين الأوراق."}`}
                </Alert>
              ) : effectivePAR > 50 ? (
                <Alert type="warning" title="🟡 كفاءة مقبولة — يمكن التحسين">
                  الضوء {selectedColor.label} يعطي {effectivePAR}% كفاءة.
                  {selectedColor.key === "green"
                    ? " الضوء الأخضر معكوس (النبات لا يمتصه جيداً). استخدم مزيجاً من الأحمر والأزرق للحصول على طيف كامل."
                    : ` أضف شدة إضاءة أعلى أو استخدم طيفاً كاملاً لزيادة الكفاءة.`}
                </Alert>
              ) : (
                <Alert type="danger" title="🔴 كفاءة ضعيفة جداً!">
                  {selectedColor.key === "green"
                    ? `الضوء الأخضر (550nm) — كفاءة ${effectivePAR}% فقط! النبات يعكس الأخضر (لذلك نراه أخضر) ولا يمتصه في التمثيل الضوئي. استخدم الضوء الأبيض أو الأحمر أو الأزرق بدلاً من ذلك.`
                    : `شدة الإضاءة منخفضة جداً (${lightIntensity}%) — النبات لا يحصل على طاقة كافية للتمثيل الضوئي. ارفع شدة الإضاءة إلى 80% على الأقل.`}
                </Alert>
              )}
            </motion.div>

            {/* تلميح */}
            {selectedColor.key === "white" && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-2 text-center text-xs text-amber-700 font-bold">
                💡 الشمس الطبيعية تمنح طيفاً كاملاً — هذا هو السبب في أن النباتات
                تنمو أفضل تحت الشمس من أي مصدر صناعي!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

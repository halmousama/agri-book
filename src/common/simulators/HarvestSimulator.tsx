import { useState } from "react";
import {
  Calendar,
  Truck,
  ShoppingBasket,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Apple,
  Grape,
  Calculator,
  Timer,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

type FruitType = "tomato" | "grape";

export const HarvestSimulator = () => {
  const [fruitType, setFruitType] = useState<FruitType>("tomato");
  const [maturity, setMaturity] = useState(50);
  const [trees, setTrees] = useState(100);
  const [yieldPerTree, setYieldPerTree] = useState(50);
  const [price, setPrice] = useState(2);

  const totalRevenue = trees * yieldPerTree * price;

  const getTomatoStatus = (val: number) => {
    if (val < 20)
      return {
        msg: "خضراء جداً — لم تكتمل، غير صالحة للحصاد",
        color: "#4ade80",
        darkColor: "#166534",
        status: "bad" as const,
        quality: 10,
      };
    if (val < 45)
      return {
        msg: "خضراء ناضجة — مثالية للتصدير والشحن الطويل (MG)",
        color: "#fbbf24",
        darkColor: "#854d0e",
        status: "export" as const,
        quality: 60,
      };
    if (val < 70)
      return {
        msg: "بداية تلوين (Breaker/Turning) — مثالية للشحن المتوسط",
        color: "#fb923c",
        darkColor: "#9a3412",
        status: "export" as const,
        quality: 80,
      };
    if (val < 90)
      return {
        msg: "حمراء كاملة — ممتازة للأكل فوراً، سوق محلي",
        color: "#ef4444",
        darkColor: "#7f1d1d",
        status: "local" as const,
        quality: 100,
      };
    return {
      msg: "تالفة (طرية جداً) — فقط للعصر أو التصنيع",
      color: "#991b1b",
      darkColor: "#450a0a",
      status: "bad" as const,
      quality: 20,
    };
  };

  const getGrapeStatus = (val: number) => {
    if (val < 60)
      return {
        msg: "حامض (غير ناضج) — يبقى حامضاً للأبد! لا يقطف أبداً",
        color: "#a3e635",
        darkColor: "#3f6212",
        status: "bad" as const,
        quality: 5,
      };
    if (val < 80)
      return {
        msg: "بداية حلاوة — ما زال يحتاج وقتاً على الكرمة",
        color: "#d9f99d",
        darkColor: "#4d7c0f",
        status: "bad" as const,
        quality: 30,
      };
    if (val < 95)
      return {
        msg: "حلو وجاهز — وقت الحصاد المثالي! لا تتأخر!",
        color: "#8b5cf6",
        darkColor: "#4c1d95",
        status: "perfect" as const,
        quality: 100,
      };
    return {
      msg: "تخمر وتلف — بدأ يتحول إلى خل/نبيذ",
      color: "#581c87",
      darkColor: "#2e1065",
      status: "bad" as const,
      quality: 10,
    };
  };

  const status =
    fruitType === "tomato"
      ? getTomatoStatus(maturity)
      : getGrapeStatus(maturity);

  const harvestReadiness =
    status.status === "perfect" || status.status === "local"
      ? 100
      : status.status === "export"
        ? 65
        : 15;

  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-white to-orange-50/40 p-6 md:p-8 rounded-3xl shadow-xl border border-orange-100/60 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-200/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-200/50">
              <Apple className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                حاسبة الحصاد — توقيت القطف
              </h3>
              <p className="text-xs text-slate-500">
                نوع الثمرة يحدد متى وكيف تقطف
              </p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5",
              status.status === "bad"
                ? "bg-red-100 text-red-700 border-red-300"
                : status.status === "export"
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-emerald-100 text-emerald-700 border-emerald-300"
            )}
          >
            {status.status === "bad" ? (
              <XCircle size={12} />
            ) : status.status === "export" ? (
              <Truck size={12} />
            ) : (
              <CheckCircle size={12} />
            )}
            {status.quality > 80 ? "جاهز!" : status.quality > 50 ? "ممكن" : "غير جاهز"}
          </motion.div>
        </div>

        {/* أزرار نوع الثمرة */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setFruitType("tomato");
              setMaturity(50);
            }}
            className={cn(
              "flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition-all",
              fruitType === "tomato"
                ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
            )}
          >
            🍅 طماطم (تكمل نضجها)
          </button>
          <button
            onClick={() => {
              setFruitType("grape");
              setMaturity(50);
            }}
            className={cn(
              "flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition-all",
              fruitType === "grape"
                ? "bg-purple-50 border-purple-400 text-purple-700 shadow-sm"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
            )}
          >
            🍇 عنب (لا يكمل نضجه)
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 320" className="w-full h-full">
              <defs>
                <linearGradient id="harvestBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fefce8" />
                  <stop offset="100%" stopColor="#fffbeb" />
                </linearGradient>
                <radialGradient id="tomatoGrad" cx="40%" cy="35%" r="60%">
                  <stop offset="0%" stopColor={status.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={status.darkColor} stopOpacity="0.9" />
                </radialGradient>
                <filter id="harvestGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="260" height="320" fill="url(#harvestBg)" rx="12" />

              {fruitType === "tomato" ? (
                <g>
                  {/* ساق */}
                  <rect x="125" y="20" width="10" height="60" fill="#166534" rx="3" />
                  <path
                    d="M120,30 Q90,40 80,60"
                    stroke="#166534" strokeWidth="4" fill="none" strokeLinecap="round"
                  />
                  <path
                    d="M140,25 Q170,35 180,55"
                    stroke="#166534" strokeWidth="4" fill="none" strokeLinecap="round"
                  />
                  {/* Calyx */}
                  <path
                    d="M130,80 L110,95 L125,100 L130,110 L135,100 L150,95 Z"
                    fill="#15803d"
                  />
                  {/* Tomato body */}
                  <motion.ellipse
                    cx="130" cy="155" rx="55" ry="60"
                    fill="url(#tomatoGrad)"
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Shine */}
                  <ellipse
                    cx="110" cy="130" rx="15" ry="8"
                    fill="white" opacity="0.25"
                    transform="rotate(-30 110 130)"
                  />
                  {/* مقطع عرضي توضيحي (إن ناضج) */}
                  {maturity > 60 && (
                    <g transform="translate(195, 230)">
                      <circle cx="0" cy="0" r="20" fill={status.color} opacity="0.7" />
                      <circle cx="0" cy="0" r="10" fill="#dc2626" opacity="0.5" />
                      <text x="0" y="-25" textAnchor="middle" fontSize="5" fill="#6b7280">
                        مقطع عرضي
                      </text>
                    </g>
                  )}
                  {/* Label */}
                  <text
                    x="130" y="235" textAnchor="middle" fontSize="10"
                    fill={status.darkColor} fontWeight="bold"
                  >
                    {status.quality > 80
                      ? "🍅 طماطم ناضجة!"
                      : status.quality > 50
                        ? "🍅 في مرحلة النضج"
                        : "🍅 غير ناضجة"}
                  </text>
                </g>
              ) : (
                <g>
                  {/* ساق العنب */}
                  <path
                    d="M130,20 Q130,40 130,55"
                    stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round"
                  />
                  <path
                    d="M130,55 Q100,50 80,65"
                    stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round"
                  />
                  <path
                    d="M130,55 Q160,50 180,65"
                    stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round"
                  />
                  {/* عنقود العنب */}
                  <g>
                    {[
                      [130, 75],
                      [105, 90],
                      [155, 90],
                      [90, 110],
                      [130, 115],
                      [170, 110],
                      [100, 135],
                      [145, 140],
                      [120, 160],
                    ].map(([cx, cy], i) => (
                      <motion.circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="16"
                        fill={status.color}
                        opacity={0.85}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.85, 1, 0.85],
                        }}
                        transition={{
                          duration: 2 + (i % 3),
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                    {/* shine */}
                    {[
                      [125, 70],
                      [100, 85],
                      [150, 85],
                    ].map(([cx, cy], i) => (
                      <ellipse
                        key={`shine-${i}`}
                        cx={cx - 4}
                        cy={cy - 4}
                        rx="4"
                        ry="2"
                        fill="white"
                        opacity="0.2"
                        transform={`rotate(-20 ${cx - 4} ${cy - 4})`}
                      />
                    ))}
                  </g>
                  <text
                    x="130" y="200" textAnchor="middle" fontSize="10"
                    fill={status.darkColor} fontWeight="bold"
                  >
                    {status.quality > 80
                      ? "🍇 عنب حلو وجاهز!"
                      : status.quality > 30
                        ? "🍇 ينضج على الكرمة"
                        : "🍇 حامض — لا تقطف!"}
                  </text>
                </g>
              )}

              {/* شريط تقدم النضج */}
              <g transform="translate(10, 250)">
                <rect x="0" y="0" width="240" height="55" rx="8" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />

                <text x="10" y="14" fontSize="6" fill="#64748b">
                  نضج الثمرة
                </text>
                <rect x="10" y="18" width="140" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="18" height="6" rx="3"
                  fill={status.quality > 80 ? "#22c55e" : status.quality > 50 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(maturity / 100) * 140}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="155" y="22" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {maturity}%
                </text>

                <text x="10" y="40" fontSize="6" fill="#64748b">
                  جاهزية الحصاد
                </text>
                <rect x="10" y="44" width="100" height="6" rx="3" fill="#e2e8f0" />
                <motion.rect
                  x="10" y="44" height="6" rx="3"
                  fill={harvestReadiness > 80 ? "#22c55e" : harvestReadiness > 50 ? "#f59e0b" : "#ef4444"}
                  animate={{ width: `${(harvestReadiness / 100) * 100}px` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
                <text x="115" y="49" fontSize="6" fontFamily="monospace" fill="#1e293b">
                  {harvestReadiness}%
                </text>

                <text x="170" y="40" fontSize="6" fill="#64748b">
                  الجودة
                </text>
                <text x="220" y="49" fontSize="8" fontFamily="monospace" fill="#1e293b" fontWeight="bold">
                  {status.quality}%
                </text>
              </g>

              {/* {} تحذير إذا كان العنب غير ناضج */}
              <AnimatePresence>
                {fruitType === "grape" && maturity < 80 && (
                  <motion.rect
                    x="0" y="0" width="260" height="320" rx="12"
                    fill="none" stroke="#f59e0b" strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <Slider
              label={fruitType === "tomato" ? "مرحلة النضج" : "مرحلة النضج على الكرمة"}
              value={maturity}
              min={0}
              max={100}
              unit="%"
              color={
                status.status === "bad"
                  ? "rose"
                  : status.status === "export"
                    ? "amber"
                    : "emerald"
              }
              onChange={(e) => setMaturity(Number(e.target.value))}
            />

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
                <Calculator size={18} />
                حاسبة الغلة والإيرادات
              </h4>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <label className="text-[10px] font-bold text-emerald-700 block mb-1">
                    عدد الأشجار
                  </label>
                  <input
                    type="number"
                    value={trees}
                    min={1}
                    onChange={(e) => setTrees(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 rounded-lg border border-emerald-200 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-emerald-700 block mb-1">
                    إنتاج (كغ/شجرة)
                  </label>
                  <input
                    type="number"
                    value={yieldPerTree}
                    min={1}
                    onChange={(e) =>
                      setYieldPerTree(Math.max(1, Number(e.target.value)))
                    }
                    className="w-full p-2 rounded-lg border border-emerald-200 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-emerald-700 block mb-1">
                    السعر (د.ت/كغ)
                  </label>
                  <input
                    type="number"
                    value={price}
                    min={0.1}
                    step={0.1}
                    onChange={(e) =>
                      setPrice(Math.max(0.1, Number(e.target.value)))
                    }
                    className="w-full p-2 rounded-lg border border-emerald-200 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-emerald-100">
                <span className="text-sm font-bold text-slate-600">
                  العائد الإجمالي:
                </span>
                <span className="text-xl font-black text-emerald-600 font-mono">
                  {totalRevenue.toLocaleString()}{" "}
                  <span className="text-xs">د.ت</span>
                </span>
              </div>
            </div>

            {/* مربع التشخيص */}
            <motion.div
              key={`harvest-${fruitType}-${maturity}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {status.status === "bad" ? (
                <Alert type="danger" title="⛔ ليس وقت الحصاد!">
                  {fruitType === "grape" && maturity < 80
                    ? `العنب عند ${maturity}% نضج — لا يزال حامضاً! العنب لا يكمل نضجه بعد القطف، فإذا قطفته الآن سيبقى حامضاً للأبد. انتظر حتى 80% على الأقل.`
                    : `الثمرة في حالة غير قابلة للتسويق (جودة ${status.quality}%). ${
                        maturity > 90
                          ? "تجاوزت مرحلة النضج المثالية. استخدمها للتصنيع أو العصر فوراً."
                          : "لم تصل إلى مرحلة النضج بعد. الصبر مفتاح الحصاد!"
                      }`}
                </Alert>
              ) : status.status === "export" ? (
                <Alert type="warning" title="🚛 مناسبة للتصدير والشحن">
                  {fruitType === "tomato"
                    ? `الطماطم عند ${maturity}% — في مرحلة التلوين (Breaker). مثالية للتصدير لأنها ستكمل نضجها في الطريق. جودة ${status.quality}%. السعر المتوقع: ${(
                        price * 1.2
                      ).toFixed(1)} د.ت للتصدير.`
                    : `العنب عند ${maturity}% — يقترب من الحلاوة. انتظر قليلاً للوصول إلى الجودة المثالية (80-95%).`}
                </Alert>
              ) : (
                <Alert type="success" title="✅ وقت الحصاد المثالي!">
                  {fruitType === "tomato"
                    ? `الطماطم ناضجة تماماً (${maturity}%) — جودة ${status.quality}%. مثالية للسوق المحلي. $
                        {
                          maturity >= 90
                            ? "تنبيه: ستتلف قريباً، بيعها اليوم!"
                            : "قطفها الآن لأفضل نكهة وقيمة."
                        } العائد المتوقع: ${totalRevenue.toLocaleString()} د.ت`
                    : `العنب حلو وجاهز (${maturity}%) — الجودة ${status.quality}%. هذا هو وقت الحصاد المثالي! لا تتأخر وإلا سيبدأ التخمر. العائد المتوقع: ${totalRevenue.toLocaleString()} د.ت`}
                </Alert>
              )}
            </motion.div>

            {/* نصيحة */}
            {fruitType === "grape" && maturity >= 80 && maturity < 95 && (
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-2 text-center text-xs text-purple-700 font-bold">
                💡 العنب لا يكمل نضجه بعد القطف. ما تقطفه اليوم هو ما ستأكله.
                تأكد من الحلاوة قبل القطف!
              </div>
            )}
            {fruitType === "tomato" && maturity >= 45 && maturity < 70 && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-2 text-center text-xs text-blue-700 font-bold">
                💡 الطماطم من الفواكه Climaetric — تكمل نضجها بعد القطف! يمكن
                شحنها في مرحلة التلوين وتنضج في الطريق.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

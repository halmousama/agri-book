import { useState, useMemo } from "react";
import {
  Droplets,
  FlaskConical,
  ScrollText,
  TrendingUp,
  CircleDot,
  ShoppingCart,
  Star,
  CheckCircle2,
  Package,
  Truck,
  Award,
  BarChart4,
  Euro,
  DollarSign,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

type Currency = "eur" | "usd" | "tnd";
type MarketLevel = "local" | "regional" | "export";

interface ToggleItem {
  key: string;
  label: string;
  labelEn: string;
  icon: typeof Droplets;
  cost: number;
  revenue: number;
  description: string;
  stage: number;
}

const CURRENCIES = { eur: "€", usd: "$", tnd: "د.ت" } as const;

const TOGGLES: ToggleItem[] = [
  { key: "sorting", label: "فرز وتدريج", labelEn: "Sorting", icon: CheckCircle2, cost: 2, revenue: 4, description: "يزيد التوحيد والجودة", stage: 1 },
  { key: "coldPress", label: "عصر بارد سريع", labelEn: "Cold Press", icon: Droplets, cost: 3, revenue: 6, description: "يحافظ على الجودة والطعم", stage: 2 },
  { key: "premiumPackaging", label: "تعبئة زجاجية فاخرة", labelEn: "Premium Packaging", icon: Package, cost: 5, revenue: 12, description: "يزيد القيمة السوقية", stage: 3 },
  { key: "organicCert", label: "شهادة عضوية", labelEn: "Organic Cert", icon: ScrollText, cost: 8, revenue: 25, description: "يفتح أسواقاً أوروبية", stage: 4 },
  { key: "branding", label: "تسويق وعلامة تجارية", labelEn: "Branding", icon: Award, cost: 6, revenue: 18, description: "يبني ولاء للعلامة", stage: 5 },
  { key: "logistics", label: "سلسلة تبريد مبردة", labelEn: "Cold Chain", icon: Truck, cost: 7, revenue: 14, description: "يوسع نطاق التوزيع", stage: 6 },
];

const BASE_COST = 10;
const BASE_REVENUE = 15;

const MARKET_MULTIPLIER: Record<MarketLevel, { label: string; costMul: number; revMul: number }> = {
  local: { label: "سوق محلي", costMul: 0.7, revMul: 0.5 },
  regional: { label: "سوق إقليمي", costMul: 1, revMul: 1 },
  export: { label: "تصدير (اتحاد أوروبي)", costMul: 1.4, revMul: 2 },
};

const COLORS = { cost: "#ef4444", revenue: "#22c55e", roi: "#0ea5e9", profit: "#8b5cf6" };
const PIE_COLORS = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#22c55e", "#10b981", "#06b6d4", "#3b82f6"];

const QUALITY_SCORE = {
  all: { label: "عضوي فاخر — جاهز للتصدير ✨", stars: 5, minToggles: 6 },
  high: { label: "ممتاز — قيمة مضافة عالية 📈", stars: 4, minToggles: 4 },
  medium: { label: "جيد — تحسّن ملحوظ 👍", stars: 3, minToggles: 2 },
  low: { label: "خام — هامش ربح ضئيل ⚠", stars: 1, minToggles: 0 },
};

export const ValueAdditionRoiSim = () => {
  const [activeToggles, setActiveToggles] = useState<Set<string>>(new Set());
  const [currency, setCurrency] = useState<Currency>("eur");
  const [marketLevel, setMarketLevel] = useState<MarketLevel>("regional");
  const [showBreakEven, setShowBreakEven] = useState(false);

  const toggleItem = (key: string) => {
    setActiveToggles((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const symbol = CURRENCIES[currency];
  const market = MARKET_MULTIPLIER[marketLevel];

  const { totalCost, totalRevenue, roi, profit, costBreakdown, valueByStage } = useMemo(() => {
    let baseCost = BASE_COST * market.costMul;
    let baseRevenue = BASE_REVENUE * market.revMul;
    let cost = baseCost;
    let revenue = baseRevenue;

    const breakdown: { name: string; value: number; color: string }[] = [
      { name: `خام (${marketLevel === "local" ? "محلي" : marketLevel === "regional" ? "إقليمي" : "تصدير"})`, value: baseCost, color: PIE_COLORS[0] },
    ];

    const stages: { name: string; cost: number; revenue: number; active: boolean }[] = [
      { name: "الخام", cost: baseCost, revenue: baseRevenue, active: true },
    ];

    for (const t of TOGGLES) {
      const active = activeToggles.has(t.key);
      if (active) {
        const c = t.cost * market.costMul;
        const r = t.revenue * market.revMul;
        cost += c;
        revenue += r;
        breakdown.push({ name: t.label, value: c, color: PIE_COLORS[TOGGLES.indexOf(t) + 1] });
      }
      stages.push({ name: t.label, cost: active ? t.cost * market.costMul : 0, revenue: active ? t.revenue * market.revMul : 0, active });
    }

    const roiVal = ((revenue - cost) / cost) * 100;
    const profitVal = revenue - cost;

    return { totalCost: cost, totalRevenue: revenue, roi: roiVal, profit: profitVal, costBreakdown: breakdown, valueByStage: stages };
  }, [activeToggles, currency, marketLevel]);

  const barData = [
    { name: "التكلفة", value: totalCost, fill: COLORS.cost },
    { name: "الإيراد", value: totalRevenue, fill: COLORS.revenue },
    { name: "الربح", value: profit, fill: COLORS.profit },
  ];

  const toggleCount = activeToggles.size;
  const quality = toggleCount >= 6 ? QUALITY_SCORE.all : toggleCount >= 4 ? QUALITY_SCORE.high : toggleCount >= 2 ? QUALITY_SCORE.medium : QUALITY_SCORE.low;
  const productScore = toggleCount;

  const stages = [
    { key: "raw", label: "خام", icon: CircleDot, active: true },
    { key: "sorting", label: "فرز", icon: CheckCircle2, active: activeToggles.has("sorting") },
    { key: "coldPress", label: "عصر", icon: Droplets, active: activeToggles.has("coldPress") },
    { key: "packaging", label: "تعبئة", icon: Package, active: activeToggles.has("premiumPackaging") },
    { key: "cert", label: "شهادة", icon: ScrollText, active: activeToggles.has("organicCert") },
    { key: "branding", label: "تسويق", icon: Award, active: activeToggles.has("branding") },
    { key: "logistics", label: "توزيع", icon: Truck, active: activeToggles.has("logistics") },
    { key: "market", label: "السوق", icon: ShoppingCart, active: true },
  ];

  const breakEvenData = useMemo(() => {
    return Array.from({ length: 21 }).map((_, i) => {
      const units = i + 1;
      return {
        units,
        cost: totalCost * units,
        revenue: totalRevenue * units,
      };
    });
  }, [totalCost, totalRevenue]);

  const isProfitable = roi > 50;
  const isHighValue = roi > 100;
  const isPremium = roi > 150;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200 dark:border-indigo-700/30 my-10 font-cairo relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-2xl shadow-lg shadow-indigo-200/50">
              <TrendingUp className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
                القيمة المضافة — ROI وسلسلة التوريد
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">من زيتون خام إلى علامة تجارية عالمية</p>
            </div>
          </div>
          <motion.div
            className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2 flex items-center gap-1.5",
              isPremium ? "bg-emerald-100 text-emerald-700 border-emerald-300" :
              isHighValue ? "bg-indigo-100 text-indigo-700 border-indigo-300" :
              isProfitable ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-amber-100 text-amber-700 border-amber-300")}
          >
            {isPremium ? "🌟 قيمة مضافة فائقة" : isHighValue ? "✅ قيمة مضافة عالية" : isProfitable ? "📈 ربحية جيدة" : "⚠ هامش منخفض"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري المطور ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full relative">
            <svg viewBox="0 0 260 350" className="w-full h-full">
              <defs>
                <linearGradient id="stageActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0fdf4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#dcfce7" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="stageInactive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f1f5f9" stopOpacity="1" />
                </linearGradient>
              </defs>

              <rect width="260" height="350" fill="#f8fafc" rx="12" />

              {/* === سلسلة التوريد === */}
              {stages.map((stage, i) => {
                const x = 3 + i * 31;
                const isActive = stage.active;
                const isRaw = stage.key === "raw";
                const isMarket = stage.key === "market";

                return (
                  <g key={stage.key} transform={`translate(${x}, 20)`}>
                    <motion.rect
                      x="0" y="0" width="28" height="28" rx="6"
                      fill={isActive ? "url(#stageActive)" : "url(#stageInactive)"}
                      stroke={isActive ? "#22c55e" : "#cbd5e1"}
                      strokeWidth={isActive ? 2 : 1.5}
                      animate={{
                        boxShadow: isActive ? "0 0 12px rgba(34,197,94,0.25)" : "0 0 0px rgba(0,0,0,0)",
                      }}
                    />

                    {stage.key === "raw" && <ellipse cx="14" cy="14" rx="8" ry="10" fill={isActive ? "#16a34a" : "#94a3b8"} />}
                    {stage.key === "sorting" && <g transform="translate(8, 8)"><circle cx="6" cy="6" r="4" fill={isActive ? "#22c55e" : "#94a3b8"} /><circle cx="6" cy="6" r="1.5" fill="white" /></g>}
                    {stage.key === "coldPress" && <g transform="translate(7, 7)"><rect x="0" y="3" width="14" height="14" rx="2" fill={isActive ? "#0ea5e9" : "#94a3b8"} opacity="0.5" /><line x1="7" y1="0" x2="7" y2="17" stroke={isActive ? "#0284c7" : "#94a3b8"} strokeWidth="2" /></g>}
                    {stage.key === "packaging" && <g transform="translate(8, 6)"><rect x="0" y="0" width="12" height="16" rx="2" fill="none" stroke={isActive ? "#22c55e" : "#94a3b8"} strokeWidth="2" /><rect x="1" y="2" width="10" height="3" fill={isActive ? "#22c55e" : "#94a3b8"} /></g>}
                    {stage.key === "cert" && <g transform="translate(8, 6)"><rect x="0" y="0" width="12" height="16" rx="2" fill={isActive ? "#fbbf24" : "#94a3b8"} /><text x="6" y="12" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">✓</text></g>}
                    {stage.key === "branding" && <g transform="translate(8, 7)"><polygon points="6,0 12,4 12,12 6,16 0,12 0,4" fill={isActive ? "#8b5cf6" : "#94a3b8"} /><text x="6" y="11" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">★</text></g>}
                    {stage.key === "logistics" && <g transform="translate(9, 8)"><rect x="0" y="2" width="10" height="7" rx="1" fill={isActive ? "#3b82f6" : "#94a3b8"} /><circle cx="3" cy="12" r="2" fill={isActive ? "#3b82f6" : "#94a3b8"} /><circle cx="7" cy="12" r="2" fill={isActive ? "#3b82f6" : "#94a3b8"} /></g>}
                    {stage.key === "market" && <g transform="translate(7, 7)"><rect x="0" y="0" width="14" height="14" rx="2" fill={isActive ? "#f97316" : "#94a3b8"} /><text x="7" y="11" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">{symbol}</text></g>}

                    <text x="14" y="38" textAnchor="middle" fontSize="5" fill={isActive ? "#16a34a" : "#94a3b8"} fontWeight="bold">
                      {stage.label}
                    </text>

                    {i < stages.length - 1 && (
                      <g transform="translate(28, 12)">
                        <line x1="0" y1="2" x2="3" y2="2" stroke="#94a3b8" strokeWidth="1.5" />
                        <polygon points="3,0 5,2 3,4" fill="#94a3b8" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* === خط القيمة المضافة — كل مرحلة تظهر الزيادة === */}
              <g transform="translate(5, 77)">
                {TOGGLES.filter((t) => activeToggles.has(t.key)).map((t, i) => (
                  <g key={`value-${t.key}`} transform={`translate(${i * 35}, 0)`}>
                    <rect x="0" y="0" width="32" height="16" rx="4" fill="#d1fae5" stroke="#22c55e" strokeWidth="1" />
                    <text x="16" y="11" textAnchor="middle" fontSize="5" fill="#16a34a" fontWeight="bold">+{symbol}{(t.revenue * market.revMul).toFixed(0)}</text>
                  </g>
                ))}
              </g>

              {/* === شريط التكلفة === */}
              <g transform="translate(5, 110)">
                <text x="0" y="0" fontSize="7" fill="#64748b" fontWeight="bold">التكلفة: {totalCost.toFixed(0)}{symbol}</text>
                <rect x="0" y="5" width="250" height="10" rx="5" fill="#e2e8f0" />
                <motion.rect x="0" y="5" height="10" rx="5" fill={COLORS.cost}
                  animate={{ width: `${(totalCost / 50) * 100}%` }} transition={{ type: "spring", stiffness: 60 }}
                />
              </g>

              {/* === شريط الإيراد === */}
              <g transform="translate(5, 140)">
                <text x="0" y="0" fontSize="7" fill="#64748b" fontWeight="bold">الإيراد: {totalRevenue.toFixed(0)}{symbol}</text>
                <rect x="0" y="5" width="250" height="10" rx="5" fill="#e2e8f0" />
                <motion.rect x="0" y="5" height="10" rx="5" fill={COLORS.revenue}
                  animate={{ width: `${(totalRevenue / 90) * 100}%` }} transition={{ type: "spring", stiffness: 60 }}
                />
              </g>

              {/* === الربح وصافي === */}
              <g transform="translate(5, 170)">
                <text x="0" y="0" fontSize="7" fill="#64748b" fontWeight="bold">الربح الصافي: {profit.toFixed(0)}{symbol}</text>
                <rect x="0" y="5" width="250" height="10" rx="5" fill="#e2e8f0" />
                <motion.rect x="0" y="5" height="10" rx="5" fill={COLORS.profit}
                  animate={{ width: `${Math.max(2, (profit / 60) * 100)}%` }} transition={{ type: "spring", stiffness: 60 }}
                />
              </g>

              {/* === ROI كبير === */}
              <g transform="translate(5, 205)">
                <motion.text
                  x="125" y="0" textAnchor="middle"
                  fontSize="28" fontWeight="bold"
                  fill={roi > 150 ? "#16a34a" : roi > 100 ? "#0ea5e9" : roi > 50 ? "#f59e0b" : "#ef4444"}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {roi.toFixed(0)}%
                </motion.text>
                <text x="125" y="16" textAnchor="middle" fontSize="8" fill="#64748b">ROI</text>
              </g>

              {/* === تقييم الجودة === */}
              <g transform="translate(5, 245)">
                <rect x="0" y="0" width="250" height="22" rx="6" fill="white" opacity="0.9" stroke="#e2e8f0" strokeWidth="1" />
                <text x="8" y="15" fontSize="7" fill="#64748b" fontWeight="bold">{quality.label}</text>
                <text x="245" y="15" textAnchor="end" fontSize="7">
                  {Array.from({ length: 5 }).map((_, i) => i < quality.stars ? "⭐" : "☆").join("")}
                </text>
              </g>

              {/* === السوق المستهدف === */}
              <g transform="translate(5, 275)">
                <rect x="0" y="0" width="250" height="18" rx="6" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />
                <text x="8" y="12" fontSize="6" fill="#64748b">السوق: {market.label}</text>
                <text x="245" y="12" textAnchor="end" fontSize="6" fill="#64748b">ضرب السوق: ×{market.revMul.toFixed(1)}</text>
              </g>

              {/* === تلميحات === */}
              <g transform="translate(5, 310)">
                {toggleCount === 0 && (
                  <text x="0" y="0" fontSize="6" fill="#f59e0b">⬆ شغّل خيارات القيمة المضافة لترى الفرق!</text>
                )}
                {toggleCount > 0 && toggleCount < 4 && (
                  <text x="0" y="0" fontSize="6" fill="#0ea5e9">💡 جرّب إضافة المزيد من المراحل لزيادة الـ ROI</text>
                )}
                {toggleCount >= 4 && toggleCount < 6 && (
                  <text x="0" y="0" fontSize="6" fill="#16a34a">🔥 أنت قريب من القيمة القصوى! فعّل الكل للوصول لـ Premium</text>
                )}
                {toggleCount === 6 && (
                  <text x="0" y="0" fontSize="6" fill="#8b5cf6" fontWeight="bold">🏆 سلسلة كاملة! هذا هو معيار التصدير العالمي</text>
                )}
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم المطورة ===== */}
          <div className="flex-1 space-y-3">
            {/* شريط أدوات — العملة والسوق */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <label className="text-xs font-bold text-slate-600 block mb-1.5 px-1">العملة</label>
                <div className="flex gap-1">
                  {(["eur", "usd", "tnd"] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={cn("flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all",
                        currency === c ? "bg-indigo-50 border-indigo-400 text-indigo-700" : "bg-slate-50 border-slate-200 text-slate-500"
                      )}
                    >
                      {CURRENCIES[c]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                <label className="text-xs font-bold text-slate-600 block mb-1.5 px-1">السوق</label>
                <div className="flex gap-1">
                  {(["local", "regional", "export"] as MarketLevel[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMarketLevel(m)}
                      className={cn("flex-1 py-1.5 rounded-lg text-[9px] font-bold border-2 transition-all leading-tight",
                        marketLevel === m ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-500"
                      )}
                    >
                      {MARKET_MULTIPLIER[m].label.substring(0, 6)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* مفاتيح القيمة المضافة */}
            <div className="bg-indigo-50 rounded-2xl p-3 border border-indigo-200">
              <h4 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <Star size={14} /> مراحل القيمة المضافة ({toggleCount}/6)
              </h4>
              <div className="space-y-1.5">
                {TOGGLES.map((item) => {
                  const isActive = activeToggles.has(item.key);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleItem(item.key)}
                      className={cn(
                        "w-full flex items-center justify-between p-2.5 rounded-xl border-2 transition-all active:scale-[0.98]",
                        isActive ? "bg-white border-indigo-400 shadow-md shadow-indigo-100" : "bg-slate-50 border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center",
                          isActive ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-400")}>
                          <Icon size={14} />
                        </div>
                        <div className="text-right">
                          <div className={cn("text-xs font-bold", isActive ? "text-indigo-800" : "text-slate-600")}>
                            {item.label}
                          </div>
                          <div className="text-[9px] text-slate-500">{item.description}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 text-xs font-bold">
                        <span className="text-red-500">+{(item.cost * market.costMul).toFixed(0)}{symbol}</span>
                        <ArrowIcon />
                        <span className="text-emerald-500">+{(item.revenue * market.revMul).toFixed(0)}{symbol}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* جدول ملخص التكاليف والإيرادات والأرباح */}
            <div className="grid grid-cols-4 gap-2">
              <div className="rounded-xl p-2.5 border border-red-200 bg-red-50">
                <div className="text-[9px] font-bold text-slate-600">التكلفة</div>
                <div className="text-base font-black font-mono text-red-600">
                  {totalCost.toFixed(0)}{symbol}
                </div>
              </div>
              <div className="rounded-xl p-2.5 border border-emerald-200 bg-emerald-50">
                <div className="text-[9px] font-bold text-slate-600">الإيراد</div>
                <div className="text-base font-black font-mono text-emerald-600">
                  {totalRevenue.toFixed(0)}{symbol}
                </div>
              </div>
              <div className={cn("rounded-xl p-2.5 border", profit > 30 ? "border-purple-200 bg-purple-50" : "border-slate-200 bg-slate-50")}>
                <div className="text-[9px] font-bold text-slate-600">الربح</div>
                <div className={cn("text-base font-black font-mono", profit > 30 ? "text-purple-600" : "text-slate-500")}>
                  {profit.toFixed(0)}{symbol}
                </div>
              </div>
              <div className={cn("rounded-xl p-2.5 border", roi > 100 ? "border-emerald-200 bg-emerald-50" : "border-blue-200 bg-blue-50")}>
                <div className="text-[9px] font-bold text-slate-600">ROI</div>
                <div className={cn("text-base font-black font-mono", roi > 100 ? "text-emerald-600" : "text-blue-600")}>
                  {roi.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* BarChart */}
            <div className="bg-white rounded-xl border border-slate-200 p-2.5">
              <h5 className="text-xs font-bold text-slate-600 mb-1.5">مقارنة التكلفة vs الإيراد vs الربح</h5>
              <div className="w-full h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 9 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={50} />
                    <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px" }}
                      formatter={(value) => `${Number(value).toFixed(0)}${symbol}`} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                      {barData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PieChart + Break-even toggle */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl border border-slate-200 p-2.5">
                <h5 className="text-xs font-bold text-slate-600 mb-1.5">توزيع التكاليف</h5>
                <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%" cy="50%" innerRadius={40} outerRadius={60}
                        paddingAngle={3} dataKey="value"
                        label={({ name, value }) => `${String(name ?? "").substring(0, 8)} ${Number(value).toFixed(0)}${symbol}`}
                        labelLine={{ strokeWidth: 1 }}
                      >
                        {costBreakdown.map((entry, index) => (
                          <Cell key={`pie-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${Number(value).toFixed(0)}${symbol}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-2.5">
                <h5 className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <ShoppingCart size={10} /> نقطة التعادل
                  <button
                    onClick={() => setShowBreakEven(!showBreakEven)}
                    className={cn("px-2 py-0.5 rounded text-[9px] font-bold border",
                      showBreakEven ? "bg-indigo-100 border-indigo-300 text-indigo-700" : "bg-slate-100 border-slate-200 text-slate-500")}
                  >
                    {showBreakEven ? "إخفاء" : "عرض"}
                  </button>
                </h5>
                <div className="w-full h-48">
                  {showBreakEven ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={breakEvenData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="units" tick={{ fontSize: 8 }} label={{ value: 'وحدات', position: 'bottom', fontSize: 8 }} />
                        <YAxis tick={{ fontSize: 8 }} label={{ value: symbol, angle: -90, position: 'insideLeft', fontSize: 8 }} />
                        <Tooltip contentStyle={{ fontSize: "10px" }}
                          formatter={(value) => `${Number(value).toFixed(0)}${symbol}`} />
                        <ReferenceLine
                          x={1}
                          stroke="#f59e0b"
                          strokeDasharray="4 4"
                          label={{ value: 'وحدة 1', position: 'top', fontSize: 8, fill: '#f59e0b' }}
                        />
                        <Line type="monotone" dataKey="cost" stroke={COLORS.cost} strokeWidth={2} dot={false} name="تكلفة" />
                        <Line type="monotone" dataKey="revenue" stroke={COLORS.revenue} strokeWidth={2} dot={false} name="إيراد" />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                      اضغط "عرض" لرؤية منحنى التعادل
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* التشخيص المتقدم */}
            <motion.div
              key={`roi-${toggleCount}-${marketLevel}-${currency}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {toggleCount === 0 ? (
                <Alert type="info" title="ℹ الوضع الخام — أقل هامش ربح">
                  السوق: {market.label}. التكلفة: {totalCost.toFixed(0)}{symbol} ← الإيراد: {totalRevenue.toFixed(0)}{symbol} ← الربح: {profit.toFixed(0)}{symbol} ← ROI: {roi.toFixed(0)}%.
                  هامش الربح ضئيل جداً. فعّل مراحل القيمة المضافة لترى كيف يرتفع الـ ROI!
                </Alert>
              ) : toggleCount >= 6 ? (
                <Alert type="success" title="🏆 القيمة المضافة القصوى — سلسلة كاملة!">
                  جميع المراحل ({toggleCount}/6) مفعلة! التكلفة: {totalCost.toFixed(0)}{symbol} ← الإيراد: {totalRevenue.toFixed(0)}{symbol} ← الربح: {profit.toFixed(0)}{symbol} ← ROI: {roi.toFixed(0)}%.
                  {marketLevel === "export" ? " سوق التصدير يضاعف الأرباح! " : " جرّب التبديل إلى سوق التصدير لمضاعفة العائد!"}
                  {isPremium ? " هذا هو معيار المنتج العالمي الفاخر 🌟" : ""}
                </Alert>
              ) : (
                <Alert
                  type={isPremium ? "success" : isHighValue ? "success" : isProfitable ? "warning" : "warning"}
                  title={isPremium ? "🌟 قيمة مضافة فائقة!" : isHighValue ? "✅ قيمة مضافة ممتازة!" : isProfitable ? "📈 ربحية جيدة — يمكن تحسينها" : "⚠ تحتاج المزيد من القيمة المضافة"}
                >
                  {isPremium
                    ? `ROI ${roi.toFixed(0)}% — أداء استثنائي! فعّلت ${toggleCount}/6 مراحل.`
                    : isHighValue
                      ? `ROI ${roi.toFixed(0)}% — أداء ممتاز! فعّلت ${toggleCount}/6 مراحل. جرّب تفعيل الباقي للوصول للقمة.`
                      : `ROI ${roi.toFixed(0)}% — ${toggleCount}/6 مراحل مفعلة. ${marketLevel !== "export" ? "التبديل إلى سوق التصدير يضاعف العائد!" : "أضف المزيد من مراحل القيمة!"}`}
                  {' '}الربح الصافي: {profit.toFixed(0)}{symbol}.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" className="text-slate-300 inline" style={{ transform: "rotate(180deg)" }}>
    <path d="M2,6 L10,6 M7,3 L10,6 L7,9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

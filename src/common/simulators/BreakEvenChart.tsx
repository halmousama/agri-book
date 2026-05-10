import { useState } from "react";
import { DollarSign, TrendingUp, PiggyBank, AlertTriangle, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const BreakEvenChart = () => {
  const [fixedCost, setFixedCost] = useState(50000);
  const [varCostPerUnit, setVarCostPerUnit] = useState(2);
  const [pricePerUnit, setPricePerUnit] = useState(5);

  const breakEvenUnits =
    pricePerUnit > varCostPerUnit
      ? Math.ceil(fixedCost / (pricePerUnit - varCostPerUnit))
      : Infinity;

  const chartData = Array.from({ length: 31 }, (_, i) => {
    const units = i * 1000;
    const totalCost = fixedCost + varCostPerUnit * units;
    const revenue = pricePerUnit * units;
    return {
      units: `${(units / 1000).toFixed(0)}k`,
      unitsRaw: units,
      totalCost: Math.round(totalCost),
      revenue: Math.round(revenue),
    };
  });

  const maxVal = Math.max(
    fixedCost + varCostPerUnit * 30000,
    pricePerUnit * 30000,
  );

  const isProfitable = pricePerUnit > varCostPerUnit;
  const profitPerUnit = isProfitable ? pricePerUnit - varCostPerUnit : 0;
  const totalProfitAt30k = isProfitable ? (pricePerUnit - varCostPerUnit) * 30000 - fixedCost : 0;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-orange-200 dark:border-orange-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-200/50">
              <PiggyBank className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">نقطة التعادل (Break-Even Point)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">تحليل التكاليف والإيرادات لتحديد نقطة الربح</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              !isProfitable
                ? "bg-red-50 border-red-300 text-red-700"
                : breakEvenUnits > 30000
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
            animate={!isProfitable ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {!isProfitable
              ? "خسارة أبدية!"
              : breakEvenUnits > 30000
                ? "تعادل بعيد"
                : `${breakEvenUnits.toLocaleString()} وحدة`}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== الرسم البياني ===== */}
          <div className="flex-1 h-80 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="units"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, maxVal]}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontFamily: "Cairo",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                />

                <ReferenceLine
                  y={fixedCost}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  label={{
                    value: "تكاليف ثابتة",
                    fill: "#64748b",
                    fontSize: 10,
                    position: "insideTopLeft",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                  name="الإيرادات"
                />

                <Line
                  type="monotone"
                  dataKey="totalCost"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={false}
                  name="التكاليف الكلية"
                />

                {isProfitable && breakEvenUnits <= 30000 && (
                  <ReferenceLine
                    x={breakEvenUnits}
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    label={{
                      value: "BEP",
                      fill: "#f59e0b",
                      fontSize: 12,
                      fontWeight: "bold",
                      position: "top",
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="w-full lg:w-72 space-y-3 shrink-0">
            <Slider
              label="التكاليف الثابتة ($)"
              value={fixedCost}
              min={10000}
              max={200000}
              step={5000}
              unit="$"
              color="amber"
              onChange={(e) => setFixedCost(Number(e.target.value))}
            />

            <Slider
              label="تكلفة متغيرة/وحدة ($)"
              value={varCostPerUnit}
              min={0.5}
              max={10}
              step={0.5}
              unit="$"
              color="rose"
              onChange={(e) => setVarCostPerUnit(Number(e.target.value))}
            />

            <Slider
              label="سعر البيع للوحدة ($)"
              value={pricePerUnit}
              min={1}
              max={20}
              step={0.5}
              unit="$"
              color="emerald"
              onChange={(e) => setPricePerUnit(Number(e.target.value))}
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">ربح الوحدة</div>
                <div className={cn("text-xl font-black font-mono", isProfitable ? "text-emerald-400" : "text-red-400")}>
                  {isProfitable ? `+$${profitPerUnit.toFixed(2)}` : `-$${(varCostPerUnit - pricePerUnit).toFixed(2)}`}
                </div>
              </div>
              <div className={cn("p-3 rounded-xl border", totalProfitAt30k > 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200")}>
                <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-400">الربح عند 30k وحدة</div>
                <div className={cn("text-xl font-black font-mono", totalProfitAt30k > 0 ? "text-emerald-600" : "text-red-600")}>
                  {totalProfitAt30k > 0 ? `+$${totalProfitAt30k.toLocaleString()}` : `-$${Math.abs(totalProfitAt30k).toLocaleString()}`}
                </div>
              </div>
            </div>

            <motion.div
              key={breakEvenUnits}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {!isProfitable ? (
                <Alert type="danger" title="🚨 سعر البيع أقل من التكلفة!">
                  تكلفة الوحدة ${varCostPerUnit.toFixed(2)} أعلى من سعر البيع ${pricePerUnit.toFixed(2)}. لا يمكن تحقيق تعادل أبداً — كل وحدة تبيعها تخسر ${(varCostPerUnit - pricePerUnit).toFixed(2)}. ارفع السعر أو اخفض التكاليف المتغيرة فوراً!
                </Alert>
              ) : breakEvenUnits > 30000 ? (
                <Alert type="warning" title="⚠ التعادل خارج النطاق">
                  تحتاج {breakEvenUnits.toLocaleString()} وحدة لتحقيق التعادل — وهذا خارج النطاق المرسوم (30,000). هامش الربح ضئيل جداً (${profitPerUnit.toFixed(2)}/وحدة). ارفع السعر أو اخفض التكاليف لتسريع الوصول للتعادل.
                </Alert>
              ) : (
                <Alert type="success" title="✅ أرباح مؤكدة">
                  تبدأ الأرباح بعد {breakEvenUnits.toLocaleString()} وحدة بهامش ربح ${profitPerUnit.toFixed(2)}/وحدة. عند 30,000 وحدة، صافي الربح ${totalProfitAt30k.toLocaleString()}. هذه نسبة جيدة — استمر في التوسع!
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

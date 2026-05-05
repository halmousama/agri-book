import { useState } from "react";
import { Map, Trees, Ruler, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const AreaCalculator = () => {
  const [area, setArea] = useState(10000);
  const [rowSpace, setRowSpace] = useState(6);
  const [plantSpace, setPlantSpace] = useState(6);

  const treeArea = rowSpace * plantSpace;
  const maxTrees = Math.floor(area / treeArea);

  const displayRows = Math.min(10, Math.floor(Math.sqrt(area) / rowSpace));
  const displayCols = Math.min(10, Math.floor(Math.sqrt(area) / plantSpace));
  const displayTrees = displayRows * displayCols;

  const density = maxTrees / (area / 10000);
  const isDense = density > 500;
  const isSparse = density < 100;

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
              <Map className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">التخطيط الهندسي للحقل</h3>
              <p className="text-xs text-slate-500">حساب المسافات والعدد الأمثل للشتلات</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isDense
                ? "bg-amber-50 border-amber-300 text-amber-700"
                : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
          >
            {maxTrees.toLocaleString()} شتلة
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري ===== */}
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center relative">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fefce8" />
                  <stop offset="100%" stopColor="#fef9c3" />
                </linearGradient>
                <filter id="treeGlow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect x="0" y="0" width="200" height="280" fill="url(#fieldGrad)" rx="12" />
              <rect x="10" y="10" width="180" height="260" rx="8" fill="#8B5A2B" opacity="0.12" />
              <rect x="10" y="10" width="180" height="260" rx="8" fill="none" stroke="#78350f" strokeWidth="1" opacity="0.15" strokeDasharray="4 4" />

              {Array.from({ length: displayRows }).map((_, r) =>
                Array.from({ length: displayCols }).map((_, c) => {
                  const x = 25 + c * (150 / Math.max(displayCols, 1));
                  const y = 30 + r * (220 / Math.max(displayRows, 1));
                  return (
                    <g key={`t-${r}-${c}`}>
                      <ellipse cx={x} cy={y + 6} rx="4" ry="2" fill="#000" opacity="0.1" />
                      <line x1={x} y1={y} x2={x} y2={y + 5} stroke="#78350f" strokeWidth="2" />
                      <motion.circle
                        cx={x} cy={y - 4} r="6"
                        fill="#22c55e"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (r * displayCols + c) * 0.005 }}
                        filter="url(#treeGlow)"
                      />
                      <circle cx={x} cy={y - 4} r="2" fill="#16a34a" opacity="0.6" />
                    </g>
                  );
                })
              )}

              <g transform="translate(10, 255)">
                <rect x="0" y="0" width="180" height="20" rx="6" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1" />
                <Ruler size={8} className="inline" />
                <text x="20" y="14" fontSize="7" fill="#64748b">شجرة في كل </text>
                <text x="74" y="14" fontSize="7" fill="#047857" fontWeight="bold">{treeArea} م²</text>
                <text x="130" y="14" fontSize="8" fill="#22c55e" fontWeight="bold">{displayTrees}</text>
              </g>
            </svg>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
              <label className="block text-sm font-bold text-emerald-800 mb-2">
                المساحة الإجمالية (متر مربع):
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Math.max(100, Number(e.target.value)))}
                className="w-full p-3 rounded-xl border border-emerald-200 font-mono text-lg focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <span className="text-xs text-emerald-600 mt-1 block">1 هكتار = 10,000 م²</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Slider
                label="بين الصفوف (م)"
                value={rowSpace}
                min={1}
                max={10}
                unit="م"
                color="emerald"
                onChange={(e) => setRowSpace(Number(e.target.value))}
              />
              <Slider
                label="بين الأشجار (م)"
                value={plantSpace}
                min={1}
                max={10}
                unit="م"
                color="emerald"
                onChange={(e) => setPlantSpace(Number(e.target.value))}
              />
            </div>

            <div className="bg-slate-800 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
              <div>
                <span className="block text-emerald-400 text-xs font-bold mb-1">الاحتياج الفعلي للشتلات:</span>
                <span className="text-2xl font-black font-mono">{maxTrees.toLocaleString()}</span>
                <span className="text-slate-400 text-sm mr-2">شتلة</span>
              </div>
              <Trees size={32} className="text-emerald-500 opacity-50" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div className="text-xs font-bold text-slate-600">مساحة الشجرة الواحدة</div>
                <div className="text-lg font-black font-mono text-emerald-600">{treeArea} م²</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div className="text-xs font-bold text-slate-600">الكثافة</div>
                <div className="text-lg font-black font-mono text-emerald-600">{density.toFixed(0)}/هكتار</div>
              </div>
            </div>

            <motion.div
              key={`${area}-${rowSpace}-${plantSpace}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isDense ? (
                <Alert type="warning" title="⚠ كثافة عالية جداً">
                  المسافة بين الأشجار {plantSpace} م وبين الصفوف {rowSpace} م تعطي {maxTrees.toLocaleString()} شتلة في {area.toLocaleString()} م². هذا يعني تنافساً شديداً على الماء والضوء — قد تحتاج لزيادة المسافات أو تقليل عدد الشتلات لتجنب التقزم.
                </Alert>
              ) : isSparse ? (
                <Alert type="info" title="ℹ كثافة منخفضة">
                  المسافات واسعة جداً ({plantSpace} م × {rowSpace} م). يمكنك زراعة {maxTrees.toLocaleString()} شتلة فقط في {area.toLocaleString()} م². فكر في تقليل المسافات لاستغلال أفضل للمساحة وزيادة الإنتاجية.
                </Alert>
              ) : (
                <Alert type="success" title="✅ تخطيط مثالي">
                  {maxTrees.toLocaleString()} شتلة في {area.toLocaleString()} م² بكثافة {density.toFixed(0)} شتلة/هكتار. المسافات متوازنة — تضمن تهوية جيدة ووصول ضوء كافٍ لكل شجرة مع استغلال أمثل للمساحة.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

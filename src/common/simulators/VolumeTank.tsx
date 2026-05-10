import { useState } from "react";
import { Cylinder, Waves, AlertTriangle, CheckCircle, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Slider } from "../components/ui/Slider";
import { Alert } from "../components/ui/Alert";

export const VolumeTank = () => {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(5);
  const [depth, setDepth] = useState(2);

  // الحسابات
  const volumeCubicMeter = length * width * depth;
  const volumeLiters = volumeCubicMeter * 1000;

  // للمحاكاة البصرية
  const scaleX = width / 10;
  const scaleY = depth / 5;
  const scaleZ = length / 20;

  const isSmall = volumeLiters < 50000;
  const isLarge = volumeLiters > 500000;

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        {/* ===== الهيدر ===== */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg shadow-blue-200/50">
              <Cylinder className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">حاسبة الأحجام — مكعب / لتر</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">حساب سعة الخزانات المائية الزراعية</p>
            </div>
          </div>
          <motion.div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold border-2",
              isLarge
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : isSmall
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-emerald-50 border-emerald-300 text-emerald-700"
            )}
          >
            {isLarge ? "🏊 خزان كبير" : isSmall ? "🪣 خزان صغير" : "✅ حجم متوسط"}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          {/* ===== المشهد البصري (3D مبسط) ===== */}
          <div className="w-full lg:w-80 h-80 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-3 flex items-center justify-center relative">
            <div className="perspective-1000 w-full h-full flex items-center justify-center">
              <motion.div
                className="relative transform-style-3d"
                animate={{
                  width: 120 * scaleX,
                  height: 120 * scaleZ,
                }}
                transition={{ type: "spring", bounce: 0.4 }}
                style={{ transform: "rotateX(60deg) rotateZ(-45deg)" }}
              >
                {/* قاع الخزان */}
                <div className="absolute inset-0 bg-blue-900 opacity-80 rounded-sm" />

                {/* الماء (متحرك) */}
                <motion.div
                  className="absolute inset-0 bg-blue-400 opacity-50 origin-bottom rounded-sm"
                  animate={{ height: `${Math.min(100 * scaleY, 100)}%` }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ type: "spring", stiffness: 40 }}
                >
                  <div className="absolute inset-0 bg-blue-300 opacity-30 rounded-sm" />
                </motion.div>

                {/* مؤشر مستوى الماء */}
                <motion.div
                  className="absolute -right-6 bottom-0 w-2 bg-blue-400 rounded-full"
                  animate={{ height: `${Math.min(100 * scaleY, 100)}%` }}
                  transition={{ type: "spring", stiffness: 40 }}
                />
              </motion.div>
            </div>

            <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 border dark:border-slate-700 shadow-sm">
              تمثيل منظور 3D
            </div>
          </div>

          {/* ===== لوحة التحكم ===== */}
          <div className="flex-1 space-y-3">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <Slider
                label="الطول"
                value={length}
                min={1}
                max={50}
                unit="م"
                color="blue"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <Slider
                label="العرض"
                value={width}
                min={1}
                max={20}
                unit="م"
                color="blue"
                onChange={(e) => setWidth(Number(e.target.value))}
              />
              <Slider
                label="العمق / الارتفاع"
                value={depth}
                min={1}
                max={10}
                step={0.5}
                unit="م"
                color="blue"
                onChange={(e) => setDepth(Number(e.target.value))}
              />
            </div>

            {/* عدادات الحجم */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-center shadow-lg border border-slate-200 dark:border-slate-700">
                <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">الحجم الهندسي</span>
                <span className="text-xl font-black text-slate-800 dark:text-white font-mono">
                  {volumeCubicMeter.toLocaleString()} m³
                </span>
              </div>
              <div className="bg-blue-600 p-4 rounded-xl text-center shadow-lg shadow-blue-500/30">
                <span className="block text-blue-200 text-xs font-bold mb-1">سعة الماء الفعالة</span>
                <span className="text-xl font-black text-white font-mono">
                  {volumeLiters.toLocaleString()} L
                </span>
              </div>
            </div>

            {/* التشخيص */}
            <motion.div
              key={`vol-${volumeLiters}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isLarge ? (
                <Alert type="info" title={`🏊 خزان كبير جداً — ${volumeLiters.toLocaleString()} لتر`}>
                  أبعاد {length}م × {width}م × {depth}م تولد سعة {volumeCubicMeter.toLocaleString()} m³.
                  هذا الحجم مناسب للمشاريع الكبيرة أو لتجميع مياه الأمطار بغرض ري مساحات واسعة.
                </Alert>
              ) : isSmall ? (
                <Alert type="warning" title={`🪣 خزان صغير — ${volumeLiters.toLocaleString()} لتر`}>
                  سعة محدودة نسبياً. أبعاد {length}م × {width}م × {depth}م.
                  هذا الحجم مناسب للحدائق المنزلية أو الاستخدامات اليومية المحدودة.
                </Alert>
              ) : (
                <Alert type="success" title={`✅ حجم مثالي — ${volumeLiters.toLocaleString()} لتر`}>
                  أبعاد {length}م × {width}م × {depth}م توازن جيد بين السعة والتكلفة.
                  سعة {volumeCubicMeter.toLocaleString()} m³ مناسبة للري التجاري المتوسط.
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

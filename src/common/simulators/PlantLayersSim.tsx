import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LayerData {
  id: string;
  label: string;
  emoji: string;
  color: string;
  lightColor: string;
  plants: string[];
  functions: string[];
  products: string[];
  detail: string;
}

const layers: LayerData[] = [
  {
    id: "tree",
    label: "الطبقة الشجرية",
    emoji: "🌴",
    color: "#15803d",
    lightColor: "#22c55e",
    plants: ["النخيل", "الزيتون", "الرمان", "التين", "التوت", "الحمضيات", "السدر", "اللوز"],
    functions: ["توفير الظل والمناخ المصغر", "إنتاج الفواكه والزيوت", "تثبيت التربة بجذور عميقة", "مصدر للأخشاب والسعف"],
    products: ["تمور فاخرة", "زيت زيتون", "فواكه طازجة", "حرير طبيعي", "عسل صحراوي"],
    detail: "العمود الفقري للمزرعة — أشجار معمرة تزرع مرة وتعطي لعقود، وتخلق مناخًا مصغرًا يخفض حرارة التربة 10-15°م",
  },
  {
    id: "ground",
    label: "الطبقة السفلى",
    emoji: "🌿",
    color: "#65a30d",
    lightColor: "#84cc16",
    plants: ["الخضروات الورقية", "البقوليات", "الحبوب", "الأعلاف الخضراء", "الغطاء الأرضي"],
    functions: ["مطبخ المزرعة اليومي", "تثبيت النيتروجين", "تغطية التربة وحمايتها", "إنتاج علف الحيوانات"],
    products: ["خضروات طازجة يوميًا", "فول وعدس وحمص", "قمح وذرة", "برسيم وفصة"],
    detail: "تحت ظل الأشجار — تطعم الإنسان والحيوان، وتغطي التربة وتحسن خصوبتها عبر الدورة الزراعية",
  },
  {
    id: "aquatic",
    label: "الطبقة المائية",
    emoji: "💧",
    color: "#0891b2",
    lightColor: "#22d3ee",
    plants: ["الطحالب (السبيرولينا)", "المحاصيل الجذرية", "النباتات المائية"],
    functions: ["إنتاج الأكسجين للماء", "امتصاص الكربون", "مصدر بروتين أخضر", "تنقية مياه الأحواض"],
    products: ["سبيرولينا (بروتين 70%)", "جزر وبنجر وفجل", "بطاطا وبصل وثوم"],
    detail: "مصنع الأكسجين والبروتين الأخضر — الطحالب تمتص CO₂ وتضخ O₂، والمحاصيل الجذرية تخزن الغذاء تحت التربة",
  },
  {
    id: "service",
    label: "النباتات الخادمة",
    emoji: "🌸",
    color: "#d97706",
    lightColor: "#f59e0b",
    plants: ["الطبية والعطرية", "مثبتات النيتروجين", "الطاردة للآفات"],
    functions: ["صيدلية المزرعة الطبيعية", "حماية المحاصيل", "جذب الملقحات", "تحسين التربة"],
    products: ["زيوت عطرية فاخرة", "أعشاب مجففة", "مبيدات طبيعية", "سماد حيوي"],
    detail: "طاقم الدعم الصامت — نباتات لا تؤكل بل تخدم: تحمي، تطهر، تطرد الآفات، وتجذب النحل",
  },
];

const PlantLayersSim = () => {
  const [activeLayer, setActiveLayer] = useState<string>("tree");
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const handleLayerSelect = useCallback((id: string) => {
    setActiveLayer(id);
    setShowDiagnosis(true);
  }, []);

  const activeData = layers.find((l) => l.id === activeLayer)!;

  // Simulated diagnosis data (changes based on selected layer)
  const diversityIndex = activeLayer === "tree" ? "0.72" : activeLayer === "ground" ? "0.85" : activeLayer === "aquatic" ? "0.48" : "0.63";
  const canopyCoverage = activeLayer === "tree" ? "65%" : activeLayer === "ground" ? "40%" : activeLayer === "aquatic" ? "15%" : "25%";
  const rootDepth = activeLayer === "tree" ? "2-8 م" : activeLayer === "ground" ? "0.3-1 م" : activeLayer === "aquatic" ? "0-0.5 م" : "0.5-2 م";

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-amber-500/10 bg-gradient-to-r from-amber-900/30 to-emerald-900/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-400/80 tracking-wider uppercase">
            Plant Layers Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          🌴 النظام النباتي — 4 طبقات في حديقة متكاملة
        </h3>
      </div>

      {/* SVG Visualization */}
      <div className="relative w-full h-[240px] bg-gradient-to-b from-amber-900/30 via-slate-900 to-slate-950 overflow-hidden">
        <svg viewBox="0 0 500 240" className="w-full h-full">
          {/* Sun */}
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#2d2d44" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="500" height="200" fill="url(#skyGrad)" />

          {/* Sun */}
          <circle cx="420" cy="35" r="22" fill="#fbbf24" opacity="0.9" />
          <circle cx="420" cy="35" r="40" fill="url(#sunGlow)" />

          {/* Sun rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 420 + Math.cos(rad) * 24;
            const y1 = 35 + Math.sin(rad) * 24;
            const x2 = 420 + Math.cos(rad) * 40;
            const y2 = 35 + Math.sin(rad) * 40;
            return (
              <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />
            );
          })}

          {/* Light rays reaching layers */}
          <line x1="420" y1="57" x2="420" y2="90" stroke="#fbbf24" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
          <line x1="380" y1="57" x2="350" y2="95" stroke="#fbbf24" strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />
          <line x1="460" y1="57" x2="480" y2="95" stroke="#fbbf24" strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />

          {/* Tree layer (top) */}
          <g opacity={activeLayer === "tree" ? "1" : "0.4"}>
            {/* Palm trees */}
            <line x1="80" y1="95" x2="80" y2="45" stroke="#92400e" strokeWidth="2" />
            <path d="M60 55 Q80 35 100 55" fill="none" stroke="#15803d" strokeWidth="2" />
            <path d="M55 65 Q80 40 105 65" fill="none" stroke="#16a34a" strokeWidth="2" />
            {/* Olive tree */}
            <line x1="180" y1="95" x2="180" y2="55" stroke="#92400e" strokeWidth="2" />
            <circle cx="180" cy="48" r="15" fill="#15803d" opacity="0.7" />
            {/* Pomegranate */}
            <line x1="280" y1="95" x2="280" y2="60" stroke="#92400e" strokeWidth="2" />
            <circle cx="280" cy="52" r="12" fill="#16a34a" opacity="0.7" />
            {/* Fig tree */}
            <line x1="380" y1="95" x2="380" y2="50" stroke="#92400e" strokeWidth="2" />
            <circle cx="380" cy="42" r="18" fill="#15803d" opacity="0.6" />
            {/* Layer label */}
            <text x="50" y="88" fill="#22c55e" fontSize="8" fontWeight="bold">🌴 طبقة شجرية</text>
          </g>

          {/* Ground layer (middle) */}
          <rect x="0" y="95" width="500" height="40" fill="#3f2e1c" opacity={activeLayer === "ground" ? "0.5" : "0.2"} />
          <g opacity={activeLayer === "ground" ? "1" : "0.4"}>
            {/* Row crops */}
            <rect x="60" y="100" width="6" height="20" rx="1" fill="#65a30d" />
            <rect x="80" y="105" width="6" height="15" rx="1" fill="#4d7c0f" />
            <rect x="150" y="98" width="6" height="22" rx="1" fill="#65a30d" />
            <rect x="170" y="103" width="6" height="17" rx="1" fill="#4d7c0f" />
            <rect x="250" y="100" width="6" height="20" rx="1" fill="#65a30d" />
            <rect x="270" y="106" width="6" height="14" rx="1" fill="#4d7c0f" />
            <rect x="350" y="99" width="6" height="21" rx="1" fill="#65a30d" />
            <rect x="370" y="104" width="6" height="16" rx="1" fill="#4d7c0f" />
            {/* Layer label */}
            <text x="50" y="118" fill="#84cc16" fontSize="8" fontWeight="bold">🌿 طبقة سفلى</text>
          </g>

          {/* Aquatic layer (lower) */}
          <rect x="0" y="135" width="500" height="25" fill="#0c4a6e" opacity={activeLayer === "aquatic" ? "0.6" : "0.2"} />
          <g opacity={activeLayer === "aquatic" ? "1" : "0.4"}>
            {/* Algae / water plants */}
            <path d="M100 145 Q110 135 120 145" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M110 145 Q120 132 130 145" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M300 145 Q310 135 320 145" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M310 145 Q320 130 330 145" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Root vegetables visible as bumps below */}
            <text x="50" y="150" fill="#22d3ee" fontSize="8" fontWeight="bold">💧 طبقة مائية</text>
          </g>

          {/* Underground / soil */}
          <rect x="0" y="160" width="500" height="80" fill="#2d1f0e" />

          {/* Root systems */}
          <g opacity="0.5">
            {/* Deep tree roots */}
            <path d="M80 160 Q75 190 70 220" fill="none" stroke="#92400e" strokeWidth="1.5" />
            <path d="M80 160 Q90 195 100 225" fill="none" stroke="#92400e" strokeWidth="1.5" />
            <path d="M280 160 Q275 185 270 210" fill="none" stroke="#92400e" strokeWidth="1.5" />
            {/* Ground crop roots */}
            <path d="M150 160 Q148 175 145 190" fill="none" stroke="#a16207" strokeWidth="1" />
            <path d="M250 160 Q253 178 255 195" fill="none" stroke="#a16207" strokeWidth="1" />
            {/* Service plant roots */}
            <path d="M420 160 Q415 185 410 210" fill="none" stroke="#a16207" strokeWidth="1" />
            {/* Horizontal root connections */}
            <path d="M70 185 Q150 180 200 190 Q270 195 350 185" fill="none" stroke="#854d0e" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>

          {/* Service plants (side area) */}
          <g opacity={activeLayer === "service" ? "1" : "0.4"}>
            <circle cx="430" cy="80" r="8" fill="#d97706" opacity="0.5" />
            <circle cx="450" cy="70" r="6" fill="#d97706" opacity="0.5" />
            <circle cx="440" cy="88" r="5" fill="#d97706" opacity="0.4" />
            <text x="410" y="68" fill="#f59e0b" fontSize="7" fontWeight="bold">🌸 نباتات خادمة</text>
          </g>
        </svg>
      </div>

      {/* Layer selector buttons */}
      <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        {layers.map((layer) => {
          const isActive = activeLayer === layer.id;
          return (
            <motion.button
              key={layer.id}
              onClick={() => handleLayerSelect(layer.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-xl p-2.5 text-right border transition-all duration-300 ${
                isActive
                  ? "border-amber-400 bg-gradient-to-br from-amber-900/50 to-slate-800/80 shadow-lg shadow-amber-900/30"
                  : "border-slate-700/50 bg-slate-800/60 hover:border-slate-500/50"
              }`}
            >
              <div className="text-lg">{layer.emoji}</div>
              <div className="text-[11px] font-bold text-white leading-tight mt-0.5">{layer.label}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Active layer detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="px-4 pb-4"
        >
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeData.emoji}</span>
              <span className="text-xs text-amber-400 font-bold">{activeData.label}</span>
            </div>

            {/* Detail */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2 rounded-lg border border-slate-700/30">
              {activeData.detail}
            </p>

            {/* Plants */}
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">🌱 النباتات</div>
              <div className="flex flex-wrap gap-1.5">
                {activeData.plants.map((plant) => (
                  <span
                    key={plant}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-900/30 text-emerald-300 border border-emerald-700/30"
                  >
                    {plant}
                  </span>
                ))}
              </div>
            </div>

            {/* Functions */}
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">⚙️ الوظائف</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {activeData.functions.map((fn) => (
                  <div key={fn} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    {fn}
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">📦 الإنتاج</div>
              <div className="flex flex-wrap gap-1.5">
                {activeData.products.map((prod) => (
                  <span
                    key={prod}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/30"
                  >
                    {prod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Diagnosis Panel */}
      <div className="px-4 pb-4">
        <button
          onClick={() => setShowDiagnosis(!showDiagnosis)}
          className="w-full rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-slate-800/40 p-3 hover:from-cyan-900/30 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-wider">📊 لوحة التشخيص</span>
              <span className="text-[10px] text-slate-500">— تقييم الطبقة الحالية</span>
            </div>
            <span className="text-cyan-400 text-xs">{showDiagnosis ? "▲" : "▼"}</span>
          </div>
          <AnimatePresence>
            {showDiagnosis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-cyan-500/10">
                  <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-700/30 text-center">
                    <div className="text-[10px] text-slate-400">مؤشر التنوع</div>
                    <div className="text-sm font-bold text-emerald-400">{diversityIndex}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-700/30 text-center">
                    <div className="text-[10px] text-slate-400">تغطية الظلة</div>
                    <div className="text-sm font-bold text-amber-400">{canopyCoverage}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-700/30 text-center">
                    <div className="text-[10px] text-slate-400">عمق الجذور</div>
                    <div className="text-sm font-bold text-cyan-400">{rootDepth}</div>
                  </div>
                </div>
                <div className="mt-2 p-2 rounded-lg bg-amber-900/20 border border-amber-500/20 text-center">
                  <p className="text-[10px] text-amber-300">
                    {activeLayer === "tree" && "🌳 غطاء شجري جيد — أضف نباتات خادمة لزيادة التنوع"}
                    {activeLayer === "ground" && "🌿 تنوع ممتاز — استمر بالدورة الزراعية لتحسين التربة"}
                    {activeLayer === "aquatic" && "💧 طبقة مائية نشطة — وسّع أحواض الطحالب لزيادة الإنتاج"}
                    {activeLayer === "service" && "🌸 نباتات خادمة قوية — زرعها حول كل حوض لحماية المحاصيل"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export { PlantLayersSim };
export default PlantLayersSim;

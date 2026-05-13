import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimalGroup {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  inputs: string[];
  outputs: string[];
  role: string;
  connections: string[];
}

const animalGroups: AnimalGroup[] = [
  {
    id: "cattle",
    emoji: "🐄",
    title: "الأبقار والجمال",
    subtitle: "عمالقة السماد والطاقة",
    color: "#b45309",
    inputs: ["الأعلاف الخضراء", "التبن والقش", "الماء"],
    outputs: ["الروث (10-20 كجم/يوم)", "الحليب", "الغاز الحيوي", "العجول واللحم"],
    role: "العمود الفقري لخصوبة التربة ومصدر الطاقة الليلية عبر تحويل الروث إلى غاز حيوي",
    connections: ["worms", "bsf", "fish"],
  },
  {
    id: "rabbits",
    emoji: "🐇",
    title: "أرانب الريكس",
    subtitle: "مهندسو التربة",
    color: "#d97706",
    inputs: ["الأعلاف الخضراء", "بقايا الخضار", "الماء"],
    outputs: ["فضلات غنية بالنيتروجين", "فراء فاخر", "لحم", "تربة مهواة"],
    role: "مهندس تربة: يحفر الجحور فيقلب الرمال ويهويها، وفضلاته تسقط مباشرةً لتغذي الديدان",
    connections: ["worms", "bsf"],
  },
  {
    id: "poultry",
    emoji: "🐔",
    title: "الدجاج والبط",
    subtitle: "جيش الحشرات",
    color: "#ca8a04",
    inputs: ["الحبوب", "يرقات الحشرات", "مخلفات المطبخ", "البزاقات"],
    outputs: ["البيض", "اللحم", "روث غني بالنيتروجين", "تربة مخربشة"],
    role: "جيش مكافحة الآفات: يأكل الحشرات وبذور الأعشاب ويخربش التربة السطحية ويهويها",
    connections: ["bsf", "fish", "worms"],
  },
  {
    id: "bsf",
    emoji: "🐛",
    title: "اليرقات والديدان",
    subtitle: "مصانع البروتين",
    color: "#65a30d",
    inputs: ["مخلفات المطبخ", "بقايا المحاصيل", "الروث", "الورق والكرتون"],
    outputs: ["بروتين للعلف (47%)", "السماد الدودي الفاخر", "الفراس السمادي"],
    role: "مصنع بروتين مصغر: يحول المخلفات العضوية إلى بروتين عالي الجودة وسماد فاخر في 14 يومًا",
    connections: ["poultry", "fish", "cattle"],
  },
  {
    id: "fish",
    emoji: "🐟",
    title: "البلطي والسلور",
    subtitle: "مملكة الماء",
    color: "#0891b2",
    inputs: ["يرقات الجندي الأسود", "ديدان الكومبوست", "الطحالب"],
    outputs: ["لحم سمكي أبيض", "ماء غني بالمغذيات", "نظام تنظيف القاع"],
    role: "منتج بروتين مائي: البلطي في الوسط والسلور في القاع، مياههما تروي وتخصب النباتات",
    connections: ["poultry", "bsf", "worms"],
  },
  {
    id: "bees",
    emoji: "🐝",
    title: "النحل ودودة القز",
    subtitle: "الأبطال الخفيون",
    color: "#eab308",
    inputs: ["أزهار النباتات", "أوراق التوت", "رحيق الأشجار"],
    outputs: ["العسل", "الشمع", "الحرير الطبيعي", "تلقيح المحاصيل"],
    role: "عامل التلقيح الأساسي: يضمن إنتاجية الأشجار المثمرة، وينتج العسل الفاخر والحرير الطبيعي",
    connections: ["cattle", "poultry", "all"],
  },
];

const foodWebText = [
  { from: "🐄 روث الأبقار", arrow: "⬇️", to: "🐛 يرقات وديدان" },
  { from: "🐛 يرقات الجندي الأسود", arrow: "⬇️", to: "🐔 الدجاج 🐟 الأسماك" },
  { from: "🐇 فضلات الأرانب", arrow: "⬇️", to: "🐛 ديدان الكومبوست" },
  { from: "🐟 ماء الأحواض", arrow: "⬇️", to: "🌱 ري وتخصيب النباتات" },
  { from: "🐔 الدجاج في الحقول", arrow: "⬇️", to: "🌾 مكافحة آفات وتسميد" },
  { from: "🐝 النحل", arrow: "⬇️", to: "🌸 تلقيح كل الأشجار" },
  { from: "🍃 مخلفات التقليم", arrow: "⬇️", to: "🐛 يرقات وديدان 🐐 الماعز" },
];

const FarmResidentsSim = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setSelectedGroup((prev) => (prev === id ? null : id));
  }, []);

  const selected = animalGroups.find((g) => g.id === selectedGroup);

  return (
    <div className="my-8 rounded-2xl bg-slate-900/90 border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-900/20">
      {/* Header */}
      <div className="px-5 py-3 border-b border-amber-500/10 bg-gradient-to-r from-amber-900/30 to-emerald-900/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-400/80 tracking-wider uppercase">
            Farm Residents Simulator
          </span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">
          🐄 سكان المزرعة — 6 وحدات وظيفية في نظام واحد
        </h3>
      </div>

      {/* Animal Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {animalGroups.map((group) => {
          const isActive = selectedGroup === group.id;
          return (
            <motion.button
              key={group.id}
              onClick={() => handleToggle(group.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-xl p-3 text-right border transition-all duration-300 ${
                isActive
                  ? "border-amber-400 bg-gradient-to-br from-amber-900/50 to-slate-800/80 shadow-lg shadow-amber-900/30"
                  : "border-slate-700/50 bg-slate-800/60 hover:border-slate-500/50"
              }`}
            >
              <div className="text-2xl mb-1">{group.emoji}</div>
              <div className="text-xs font-bold text-white leading-tight">{group.title}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{group.subtitle}</div>
              {isActive && (
                <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                  <span className="text-white text-xs">−</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Detail */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 overflow-hidden"
          >
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 space-y-4">
              {/* Title */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selected.emoji}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{selected.title}</h4>
                  <p className="text-xs text-amber-400">{selected.subtitle}</p>
                </div>
              </div>

              {/* Role */}
              <div className="p-3 rounded-lg bg-amber-900/20 border border-amber-500/20">
                <div className="text-[10px] text-amber-400/70 uppercase tracking-wider mb-1">الوظيفة</div>
                <p className="text-xs text-slate-200 leading-relaxed">{selected.role}</p>
              </div>

              {/* Inputs & Outputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-500/20">
                  <div className="text-[10px] text-emerald-400/70 uppercase tracking-wider mb-1">📥 مدخلات</div>
                  <ul className="space-y-1">
                    {selected.inputs.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-amber-900/20 border border-amber-500/20">
                  <div className="text-[10px] text-amber-400/70 uppercase tracking-wider mb-1">📤 مخرجات</div>
                  <ul className="space-y-1">
                    {selected.outputs.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connections */}
              <div className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-500/20">
                <div className="text-[10px] text-cyan-400/70 uppercase tracking-wider mb-1">🔗 روابط مع وحدات أخرى</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selected.connections.map((conn) => {
                    const linked = animalGroups.find((g) => g.id === conn || conn === "all");
                    return (
                      <span
                        key={conn}
                        className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                      >
                        {conn === "all" ? "🌐 جميع الوحدات" : `${linked?.emoji} ${linked?.title}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Web Summary */}
      <div className="px-4 pb-4">
        <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-900/20 to-emerald-900/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-amber-400/80 uppercase tracking-wider">🌐 شبكة الغذاء المتكاملة</span>
            <span className="text-[10px] text-slate-500">— كيف يغذي كل منهم الآخر</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {foodWebText.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/40 p-2 rounded-lg border border-slate-700/30"
              >
                <span className="whitespace-nowrap">{item.from}</span>
                <span className="text-amber-400">{item.arrow}</span>
                <span className="whitespace-nowrap">{item.to}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded-lg bg-emerald-900/20 border border-emerald-500/20 text-center">
            <p className="text-xs text-emerald-300">🔁 نظام الحلقات المغلقة: لا شيء يُهدر في هذه المزرعة، كل مخرج هو مدخل لشيء آخر</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FarmResidentsSim };
export default FarmResidentsSim;

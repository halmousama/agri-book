import { useState, useCallback } from "react";
import { QrCode, ScanLine, Shield, AlertTriangle, CheckCircle, TrendingUp, RefreshCw, ShoppingCart, Ship, Factory, TreePine } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Alert } from "../components/ui/Alert";

interface Block {
  id: number;
  label: string;
  icon: string;
  data: string;
  tampered: boolean;
}

const initialBlocks: Block[] = [
  { id: 1, label: "المزرعة", icon: "🌾", data: "حصاد: 2025-08-15 | عضو عضوي معتمد ✅", tampered: false },
  { id: 2, label: "المعصرة", icon: "🏭", data: "عصر بارد: 2025-08-20 | درجة حرارة 27°C", tampered: false },
  { id: 3, label: "الميناء", icon: "🚢", data: "شحن: 2025-09-01 | ميناء تونس → مرسيليا", tampered: false },
  { id: 4, label: "المتجر", icon: "🏪", data: "وصول: 2025-09-15 | سلسلة تبريد مستمرة ✅", tampered: false },
];

export const BlockchainQrSim = () => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [scanned, setScanned] = useState(false);
  const [chainBroken, setChainBroken] = useState(false);
  const [premiumPrice, setPremiumPrice] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const tamperData = useCallback((blockId: number) => {
    setBlocks((prev) => prev.map((b) =>
      b.id === blockId ? { ...b, data: b.data + " ⚠ بيانات مزورة!", tampered: true } : b
    ));
    setChainBroken(true);
    setPremiumPrice(false);
  }, []);

  const scanQR = useCallback(() => {
    setScanned(true);
    const anyTampered = blocks.some((b) => b.tampered);
    setChainBroken(anyTampered);
    setPremiumPrice(!anyTampered);
    setShowReceipt(true);
  }, [blocks]);

  const resetSim = useCallback(() => {
    setBlocks(initialBlocks.map((b) => ({ ...b, tampered: false, data: b.data.replace(" ⚠ بيانات مزورة!", "") })));
    setScanned(false);
    setChainBroken(false);
    setPremiumPrice(false);
    setShowReceipt(false);
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-indigo-200 dark:border-indigo-700/30 my-10 font-cairo relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl shadow-lg shadow-indigo-500/30">
              <QrCode className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">تتبع البلوكشين — Blockchain Traceability</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">سلسلة غذائية شفافة غير قابلة للتزوير</p>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-xl text-xs font-bold border-2", premiumPrice ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-400/50 text-emerald-600 dark:text-emerald-300" : chainBroken ? "bg-rose-50 dark:bg-rose-900/40 border-rose-400/50 text-rose-600 dark:text-rose-300" : "bg-amber-50 dark:bg-amber-900/40 border-amber-400/50 text-amber-600 dark:text-amber-300")}>
            {premiumPrice ? "سلسلة سليمة ✅" : chainBroken ? "سلسلة مكسورة ❌" : "بانتظار المسح"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
          <div className="w-full lg:w-80 h-auto sm:h-96 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-md p-3 flex items-center justify-center relative [--svg-bg:#f1f5f9] dark:[--svg-bg:#1e293b]">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <rect width="200" height="280" fill="var(--svg-bg)" rx="8" />

              {/* === Blockchain timeline === */}
              <g transform="translate(10, 20)">
                {/* Chain links */}
                {blocks.map((block, i) => {
                  const y = i * 42;
                  const color = block.tampered ? "#ef4444" : premiumPrice ? "#22c55e" : "#64748b";
                  return (
                    <g key={`block-${block.id}`}>
                      {/* Link line */}
                      {i > 0 && (
                        <motion.line x1="25" y1={y - 8} x2="25" y2={y - 22} stroke={color} strokeWidth="2"
                          animate={chainBroken && block.tampered ? { stroke: ["#64748b", "#ef4444", "#64748b"] } : {}}
                          transition={{ duration: 0.5, repeat: Infinity }} />
                      )}
                      {/* Block */}
                      <motion.rect x="5" y={y} width="40" height="16" rx="4" fill={block.tampered ? "#450a0a" : premiumPrice ? "#052e16" : "#1e293b"}
                        stroke={color} strokeWidth="1" animate={chainBroken && block.tampered ? { scale: [1, 1.05, 1] } : {}} />
                      <text x="25" y={y + 11} textAnchor="middle" fontSize="7" fill={color}>{block.id}: {block.label}</text>
                      {/* Data */}
                      <text x="60" y={y + 8} fontSize="5.5" fill={block.tampered ? "#fca5a5" : premiumPrice ? "#86efac" : "#94a3b8"}>{block.data.length > 30 ? block.data.slice(0, 28) + "..." : block.data}</text>
                      {block.tampered && <text x="60" y={y + 14} fontSize="5" fill="#ef4444">⚠ تزوير!</text>}
                    </g>
                  );
                })}

                {/* QR Code */}
                <g transform="translate(10, 180)">
                  <rect x="0" y="0" width="35" height="35" rx="3" fill="white" />
                  <rect x="3" y="3" width="7" height="7" rx="1" fill="#1e293b" />
                  <rect x="25" y="3" width="7" height="7" rx="1" fill="#1e293b" />
                  <rect x="3" y="25" width="7" height="7" rx="1" fill="#1e293b" />
                  <rect x="25" y="25" width="7" height="7" rx="1" fill="#1e293b" />
                  <rect x="14" y="14" width="7" height="7" rx="1" fill="#1e293b" />
                </g>

                {/* Phone scanning */}
                <g transform="translate(60, 180)">
                  <rect x="0" y="0" width="25" height="40" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                  <rect x="4" y="4" width="17" height="25" rx="2" fill="#0f172a" />
                  {scanned && (
                    <motion.rect x="4" y="4" width="17" height="25" rx="2" fill="#22c55e" opacity={0.3}
                      animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 1, repeat: Infinity }} />
                  )}
                  <circle cx="12" cy="33" r="2" fill="#475569" />
                </g>

                {/* Receipt popup */}
                {showReceipt && (
                  <g transform="translate(90, 175)">
                    <rect x="0" y="0" width="85" height="55" rx="6" fill="#0f172a" stroke={premiumPrice ? "#22c55e" : "#ef4444"} strokeWidth="0.5" opacity={0.95} />
                    <text x="42" y="10" textAnchor="middle" fontSize="5" fill={premiumPrice ? "#4ade80" : "#fca5a5"}>
                      {premiumPrice ? "✅ شحنة معتمدة" : "❌ شحنة مرفوضة"}
                    </text>
                    <text x="5" y="20" fontSize="4.5" fill="#94a3b8">{premiumPrice ? "سعر الـ Premium: $28.50/L" : "سبب: تزوير بيانات!"}</text>
                    <text x="5" y="28" fontSize="4.5" fill="#94a3b8">{premiumPrice ? "تم التحقق من 4/4 كتل" : "الكتلة المزورة مرفوضة"}</text>
                    {premiumPrice && <text x="5" y="38" fontSize="4.5" fill="#4ade80">سعر السوق العادي: $12.00/L</text>}
                    {premiumPrice && <text x="5" y="46" fontSize="4.5" fill="#4ade80">الفرق: +138% 👑</text>}
                  </g>
                )}
              </g>

              {!scanned && (
                <text x="100" y="265" textAnchor="middle" fontSize="6" fill="#64748b">امسح QR code لرحلة المنتج</text>
              )}
            </svg>
          </div>

          <div className="flex-1 space-y-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4 border border-indigo-200 dark:border-indigo-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-bold text-indigo-700 dark:text-indigo-200">محاولة تزوير البيانات</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {blocks.map((block) => (
                  <button key={block.id} onClick={() => tamperData(block.id)} disabled={chainBroken}
                    className={cn("py-2 px-3 rounded-xl font-bold text-xs transition-all active:scale-[0.97] flex items-center gap-2", block.tampered ? "bg-rose-600 text-white" : chainBroken ? "bg-slate-300 dark:bg-slate-700 text-zinc-500 cursor-not-allowed" : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-zinc-300")}>
                    {block.icon} {block.label} {block.tampered ? "🔴" : "🟢"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={scanQR} disabled={scanned && !chainBroken}
                className={cn("flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97]", scanned ? "bg-slate-300 dark:bg-slate-600 text-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2")}>
                <ScanLine size={16} /> مسح QR Code
              </button>
              <button onClick={resetSim}
                className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <RefreshCw size={16} /> إعادة ضبط
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">الكتل</div>
                <div className={cn("text-lg font-black font-mono", blocks.every((b) => !b.tampered) ? "text-emerald-400" : "text-rose-400")}>
                  {blocks.filter((b) => !b.tampered).length}/4 سليمة
                </div>
              </div>
              <div className="rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 p-2.5 text-center">
                <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300">حالة السلسلة</div>
                <div className={cn("text-lg font-black font-mono", premiumPrice ? "text-emerald-400" : chainBroken ? "text-rose-400" : "text-amber-400")}>
                  {premiumPrice ? "معتمدة" : chainBroken ? "مرفوضة" : "—"}
                </div>
              </div>
            </div>

            <motion.div key={`blockchain-${chainBroken}-${premiumPrice}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              {premiumPrice ? (
                <Alert type="success" title="✅ سلسلة سليمة — سعر الـ Premium! 🎉">
                  جميع الكتل الـ 4 سليمة وغير مزورة. المسح الضوئي أثبت أن زيت الزيتون هذا عضوي 100%،
                  معصور على البارد، وشحن في سلسلة تبريد مستمرة. المشتري يثق ويدفع 28.50 دولار/لتر
                  بدلاً من 12 دولار (فرق +138%). البلوكشين يضمن الثقة ويفتح أسواق الـ Premium.
                </Alert>
              ) : chainBroken ? (
                <Alert type="danger" title="🚨 تزوير مكتشف — الشحنة مرفوضة!">
                  كتلة مزورة! الروابط الكريبتوغرافية انكسرت — البلوكشين رفض الشحنة.
                  أي محاولة لتغيير تاريخ الحصاد أو نوع السماد أو سلسلة التبريد تنكشف فوراً.
                  النتيجة: خسارة الشحنة وعقوبات تجارية. الصدق والشفافية هما مفتاح التجارة الدولية.
                </Alert>
              ) : scanned ? (
                <Alert type="info" title="⏳ جاري التحقق...">
                  المسح تم. النظام يتحقق من 4 كتل... حاول تزوير إحدى الكتل قبل المسح لترى كيف تنكسر السلسلة!
                </Alert>
              ) : (
                <Alert type="info" title="📱 امسح QR Code">
                  اضغط "مسح QR Code" لرحلة زيت الزيتون التونسي من الشجرة إلى القارورة.
                  أو جرب أولاً زر "تزوير البيانات" في إحدى المراحل لترى كيف يكتشف البلوكشين التلاعب!
                </Alert>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

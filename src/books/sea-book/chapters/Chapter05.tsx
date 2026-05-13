import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, BookOpen, Fish, Anchor, Ship } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { MarineKnotsSim } from "../../../common/simulators/MarineKnotsSim";

export default function Chapter05() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/sea/book-sea" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 5 من 6</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        الملاحق: قاموس البحر، دليل الأسماك، والعقد البحرية
      </h1>

      <div className="prose-custom">
        <p>
          هذا الفصل هو <strong>مرجعك السريع</strong> في الميدان. ثلاثة أقسام مستقلة:
          قاموس للمصطلحات البحرية، دليل لأشهر أسماك تونس، ودليل تصويري لربط العقد البحرية.
        </p>

        <h2>📖 القسم الأول: قاموس المصطلحات البحرية</h2>
        <p>
          لغة البحر عالم خاص. معرفة المصطلحات تخولك فهم حديث الصيادين القدامى، وقراءة التقارير الجوية،
          والتواصل مع الصيادين الآخرين.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Bathymetry:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">خريطة قاع البحر. تعرف من خلالها على العمق والتضاريس تحت الماء.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Thermocline:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">الطبقة الفاصلة بين الماء الدافئ السطحي والماء البارد العميق.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Solunar:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">نظرية تربط نشاط الأسماك بموقع الشمس والقمر في السماء.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Swim Bladder:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">المثانة الهوائية — عضو السباحة في السمكة الذي يتأثر بالضغط الجوي.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Drop-off:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">منحدر قاري — انتقال مفاجئ من الماء الضحل إلى العميق. نقطة ساخنة.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Trolling:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">الصيد بالجر — سحب الطعم خلف القارب بسرعة بطيئة.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Jigging:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">الصيد بالرفع والتنزيل — حركة رأسية للطعم الصناعي لجذب السمك.</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Ship size={18} className="text-blue-600 inline ml-2" />
            <strong className="text-slate-800 dark:text-slate-200">Slack Tide:</strong>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">فترة ركود المد — الوقت بين المد والجزر حيث الماء ساكن تقريباً.</p>
          </div>
        </div>

        <h2>🐟 القسم الثاني: دليل أشهر أسماك تونس</h2>
        <p>
          البحر التونسي غني بأنواع متعددة من الأسماك. لكل نوع سلوكه الخاص، طعمه المفضل، وموسمه.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-right">الاسم</th>
                <th className="p-3 text-right">الاسم العلمي</th>
                <th className="p-3 text-right">الطعم</th>
                <th className="p-3 text-right">الموسم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100 dark:divide-blue-800">
              <tr className="bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">القاروص (Sea Bass)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Dicentrarchus labrax</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">سردين، حبار، دود</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full font-bold">سبتمبر–ماي</span></td>
              </tr>
              <tr className="bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">الكنعد (Jack)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Caranx spp.</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">سمك حي، إصبعيات لامعة</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full font-bold">ماي–أكتوبر</span></td>
              </tr>
              <tr className="bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">البوري (Mullet)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Mugil cephalus</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">خبز، عجين، دود</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full font-bold">طوال العام</span></td>
              </tr>
              <tr className="bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">الدنيز (Sea Bream)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Sparus aurata</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">سردين، جمبري، بلح</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full font-bold">أكتوبر–أفريل</span></td>
              </tr>
              <tr className="bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">الحبار (Squid)</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">Loligo vulgaris</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">إصبعيات، جيج رأسي</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded-full font-bold">الخريف–الشتاء</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>المشابك الدوارة والخرز المضيء</h3>
        <p>
          <strong>المشبك الدوار (Swivel):</strong> قطعة صغيرة لكنها أساسية. تمنع لف الخيط عندما يدور الطعم أو السمكة.
          استخدمه بين الخيط الرئيسي والترقيعة (Fluorocarbon).
        </p>
        <p>
          <strong>الخرز المضيء (Glowing Beads):</strong> حبات صغيرة تشحنها بالضوء (مصباح الهاتف) ثم تطلق ضوءاً خافتاً تحت الماء.
          فعالة جداً في الليل أو في المياه العميقة. ضع واحدة أو اثنتين فوق الصنارة مباشرة.
        </p>

        <h2>🪢 القسم الثالث: العقد البحرية</h2>
        <p>
          العقدة الجيدة تفرق بين سمكة في اليد وسمكة "كانت في اليد". أقل من دقيقة تربط عقدة متقنة،
          لكنها تحتاج تدريباً. هذا المحاكي سيعلمك العقدة الأكثر استخداماً: <strong>عقدة بالومار المحسّنة (Improved Clinch Knot)</strong>.
        </p>

        <div className="my-12">
          <MarineKnotsSim />
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>نصيحة ختامية عن العقد:</strong> بلل العقدة قبل الشد — دائماً. الماء يمنع الاحتكاك الذي يضعف الخيط.
          اختبر العقدة قبل الرمي — اشد بقوة جافة. تدرب في البيت — اربط كل عقدة 10 مرات حتى تصبح حركة يديك تلقائية.
          قص الأطراف بدقة — اترك 2-3 مم من الطرف بعد القص.
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 my-10 text-center">
          <Fish size={48} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
            خلاصة الدليل كاملاً
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            بدأت هذا الدليل وأنت تسأل عن أماكن السمك، وانتهيت وقد صرت <strong>"تعرف"</strong>.
            تعرف لماذا يوجد السمك هنا وليس هناك، وتعرف متى يجوع ومتى ينام،
            وتعرف كيف تقرأ البحر بعينيك وأذنيك.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            أنت الآن لا تصطاد لأن البحر "هاني"، بل تصطاد لأنك <strong>خططت، حللت، وخرجت وأنت تعرف أن اليوم هو اليوم</strong>.
            هذا هو الصياد الذكي.
          </p>
          <div className="mt-6 text-blue-600 dark:text-blue-400 font-bold text-sm">
            بحرك عامر، وصيدك دائم، ورزقك واسع. سلامة. 🤝
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/sea/book-sea/chapter04">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: التجهيزات
          </Button>
        </Link>
        <Link to="/sea/book-sea">
          <Button className="flex items-center gap-2">
            العودة إلى مقدمة الكتاب <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

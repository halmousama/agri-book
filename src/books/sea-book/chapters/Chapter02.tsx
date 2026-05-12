import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sun, Moon, Waves, Clock } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";

export default function Chapter02() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/sea/book-sea" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 2 من 5</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        علم التوقيت: متى يكون السمك جائعاً؟
      </h1>

      <div className="prose-custom">
        <p>
          تعرف الآن <strong>أين</strong> السمك. السؤال التالي: <strong>متى</strong> يكون موجوداً وجائعاً؟
          التوقيت هو نصف المعادلة. يمكنك الوقوف فوق أكبر كنز من السمك، لكن إذا كان الوقت خطأ، سترى قاعاً فارغاً.
        </p>

        <h2>قاعدة الضوء الأولى: الفجر والغسق</h2>
        <p>
          أشهر وقتين للصيد في العالم كله: <strong>الفجر (قبل شروق الشمس بساعة)</strong> و<strong>الغسق (قبل غروب الشمس بساعة)</strong>.
          لماذا؟ لأن سلسلة الغذاء بأكملها تنشط في الضوء الخافت.
        </p>
        <ul>
          <li><strong>الفجر:</strong> العوالق تصعد من القاع (هجرة عمودية). الأسماك الصغيرة تتبعها. السمك الكبير يتبع الصغير. الهرم الغذائي كله يعمل.</li>
          <li><strong>الغسق:</strong> نفس القصة باتجاه معاكس. العوالق واليرقات تنشط مع غياب الضوء القوي.</li>
          <li><strong>منتصف النهار:</strong> الشمس عمودية، الضوء قوي، السمك يتجه للعمق أو يختبئ تحت الظل. لكن استثناء: في الأيام الغائمة أو الماء العكر، يمكن أن يستمر النشاط.</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <div className="flex-1 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 text-center">
            <Sun size={32} className="text-amber-500 mx-auto mb-2" />
            <h4 className="font-bold text-amber-800 dark:text-amber-300">الفجر الذهبي</h4>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">أفضل وقت مضمون. السمك يتغذى بنهم.</p>
          </div>
          <div className="flex-1 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 text-center">
            <Waves size={32} className="text-blue-500 mx-auto mb-2" />
            <h4 className="font-bold text-blue-800 dark:text-blue-300">الغسق الفضي</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">يكاد يكون بنفس قوة الفجر.</p>
          </div>
          <div className="flex-1 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <Clock size={32} className="text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-600 dark:text-slate-400">منتصف النهار</h4>
            <p className="text-sm text-slate-500 mt-1">هادئ، إلا في الأيام الغائمة.</p>
          </div>
        </div>

        <h2>المد والجزر (Tides): قلب المحرك</h2>
        <p>
          المد والجزر يحركان كل شيء في البحر. فهمت المد، فهمت السمكة. هناك 4 مراحل رئيسية:
        </p>
        <ul>
          <li><strong>المد المتنامي (Incoming / Flood):</strong> وقت ممتاز. الماء الجديد يجلب الغذاء. السمك ينشط ويتحرك باتجاه الشاطئ.</li>
          <li><strong>أقصى مد (High Tide):</strong> السمك منتشر في كل مكان، لكنه قد يكون شبعاناً. الصيد ممكن لكنه أقل تركيزاً.</li>
          <li><strong>الجزر المتناقص (Outgoing / Ebb):</strong> وقت ممتاز أيضاً. السمك يتراجع مع الماء ويعرف أين يقف ليصطاد فريسته.</li>
          <li><strong>أقصى جزر (Low Tide):</strong> السمك متجمع في القنوات والحفر. وقت صعب لكنه يكشف أماكن الأسماك الكبيرة. استثناء: الحبار والقرنيط ينشطان في الجزر.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>القاعدة الذهبية:</strong> أفضل وقت للصيد هو <strong>الساعتين قبل وبعد أقصى مد</strong> (المد المتنامي والجزر المتناقص).
          في هذه الفترات، الماء يتحرك والسمك يتغذى. فترة الركود (Slack Tide) عند أقصى مد أو جزر هي الأقل إنتاجية.
        </div>

        <h2>نظرية سولونار (Solunar Theory)</h2>
        <p>
          هذه النظرية طورها الصياد الأمريكي John Alden Knight في الثلاثينيات. تقول إن <strong>نشاط الأسماك يزيد مع موقع الشمس والقمر</strong>.
          الشمس والقمر يسببان المد والجزر — فلماذا لا يؤثران على سلوك الأسماك مباشرة؟
        </p>
        <p>
          النظرية تقسم اليوم إلى <strong>فترات نشاط</strong> (Major Periods) و<strong>فترات نشاط ثانوية</strong> (Minor Periods):
        </p>
        <ul>
          <li><strong>الفترات الرئيسية (Major):</strong> تستمر حوالي ساعتين. تحدث عندما يكون القمر في أعلى أو أسفل نقطة في السماء. هذه هي أوقات الذروة.</li>
          <li><strong>الفترات الثانوية (Minor):</strong> تستمر حوالي ساعة. تحدث عند شروق القمر وغروبه. نشاط أقل لكنه ملحوظ.</li>
        </ul>

        <div className="flex items-start gap-4 p-4 my-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <Moon size={32} className="text-indigo-500 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">المعادلة الثلاثية</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              أفضل أيام الصيد تجمع 3 عناصر: <strong>الفجر أو الغسق</strong> + <strong>مد متحرك</strong> + <strong>فترة سولونار رئيسية</strong>.
              إذا اجتمع الاثنان معاً، فاليوم مثالي. إذا اجتمع الثلاثة، فهذا يوم لا يفوت!
            </p>
          </div>
        </div>

        <h2>أدوات التوقيت العملية</h2>
        <ul>
          <li><strong>Solunar Calendar:</strong> تطبيقات جوال تحسب فترات النشاط بناء على موقعك الجغرافي. تطبيقات: Fishbrain, Solunar Time.</li>
          <li><strong>Tide Tables:</strong> جداول المد والجزر المحلية. ضرورية قبل كل رحلة. تعرف متى سيكون أقصى مد وأقصى جزر.</li>
          <li><strong>ساعة يد:</strong> اضبط منبهات قبل ساعة من كل فترة رئيسية. هذا يمنحك وقتاً كافياً للوصول إلى النقطة وتجهيز العدة.</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>خلاصة التوقيت:</strong> اذهب للبحر عند <strong>فجر يوم يكون فيه مد صباحي قوي وفترة سولونار رئيسية</strong>.
          هذا ليس صيداً — هذا ضمان بنسبة 80% أنك ستجد السمك جائعاً ومنتظراً.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/sea/book-sea/chapter01">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: قراءة البحر
          </Button>
        </Link>
        <Link to="/sea/book-sea/chapter03">
          <Button className="flex items-center gap-2">
            التالي: الطقس <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

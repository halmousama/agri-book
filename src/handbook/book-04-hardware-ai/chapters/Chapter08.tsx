import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Ear, Volume2, Filter, TreePine, AlertTriangle, BadgeCheck, BookOpen } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { AcousticWeevilSim } from "../../../common/simulators/AcousticWeevilSim";

export default function Chapter08() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-04-hardware-ai" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 8 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🎧 المستشعرات الصوتية للآفات (Acoustic Pest Detection)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> سوسة النخيل الحمراء تأكل جذع النخلة من الداخل بصمت.
          لا تراها إلا بعد أن تسقط النخلة — وقد فات الأوان. كيف نكشف العدو الخفي قبل فوات الأوان؟
        </div>

        <h2>السمع بدلاً من البصر</h2>
        <p>
          سوسة النخيل الحمراء (Red Palm Weevil — RPW) هي أخطر آفة تصيب النخيل في العالم العربي.
          اليرقة (اليرقة) تحفر داخل الجذع وتأكل الأنسجة الوعائية. المشكلة: 
          <strong>الضرر كله داخل الجذع</strong>. لا ترى شيئاً على السطح حتى تنهار النخلة فجأة.
        </p>
        <p>
          الحل عبقري: إذا كنا لا نستطيع رؤيتها، فلنستمع إليها. يرقات السوسة تصدر 
          <strong>صوت مضغ</strong> (Munching Sound) منتظماً عندما تأكل أنسجة النخلة.
          هذه الأصوات تنتقل عبر جذع النخلة كاهتزازات دقيقة — مثل سماع الجيران من خلال الجدار.
        </p>

        <h2>نظام الكشف الصوتي — كيف يعمل؟</h2>
        <ol>
          <li>
            <strong>غرس الميكروفون:</strong> يُغرز ميكروفون بيزو-إلكتريك (Piezoelectric Sensor) 
            في جذع النخلة على عمق 5-10 سم. هذا الميكروفون حساس جداً — يلتقط اهتزازات 
            بمستوى ميكرومتر (جزء من ألف من المليمتر).
          </li>
          <li>
            <strong>التسجيل المستمر:</strong> المستشعر يسجل الصوت 24/7. في الحقل، 
            هناك ضوضاء كثيرة: الرياح، الطيور، الحشرات الأخرى، سيارات المزرعة.
          </li>
          <li>
            <strong>فلتر AI (Noise Filter):</strong> هنا يأتي دور الذكاء الاصطناعي. 
            النظام درّب على آلاف الساعات من التسجيلات ليعرف الفرق بين "صوت الريح" و"صوت المضغ".
            الفلتر يزيل كل الضوضاء غير المرغوب فيها ويترك فقط الأنماط المشبوهة.
          </li>
          <li>
            <strong>التنبيه:</strong> إذا اكتشف الفلتر نمط مضغ منتظم (نبضات متكررة بتردد 50-200 هرتز)، 
            يرسل النظام تنبيهاً فورياً للهاتف: "النخلة رقم 45 موبوءة — تدخل فوري مطلوب!"
          </li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>دقة النظام:</strong> أفضل أنظمة الكشف الصوتي التجارية تحقق دقة 95%+ 
          في تمييز صوت السوسة عن الضوضاء المحيطة. بدون الفلتر الذكي، الموجة الصوتية 
          تكون فوضوية ولا يمكن تمييز شيء منها.
        </div>

        <h2>التدخل بعد الكشف</h2>
        <p>
          اكتشاف السوسة مبكراً يسمح بعلاج <strong>موضعي دقيق</strong>:
        </p>
        <ul>
          <li>
            <strong>حقن المبيد:</strong> إبرة طويلة تحقن مبيداً جهازياً في جذع النخلة 
            عند النقطة التي سُمع فيها الصوت. كمية المبيد: 5-10 مل فقط — بدلاً من رش النخلة كلها.
          </li>
          <li>
            <strong>الحقن البيولوجي:</strong> بديل طبيعي — حقن فطر أو بكتيريا تطرد اليرقة 
            أو تقتلها بيولوجياً دون مواد كيماوية.
          </li>
          <li>
            <strong>الاستئصال:</strong> إذا كانت الإصابة متقدمة، تُزال النخلة بالكامل 
            لحماية النخيل المجاور. الكشف المبكر يمنع وصولنا لهذه المرحلة.
          </li>
        </ul>

        <h2>تطبيقات أخرى للكشف الصوتي</h2>
        <ul>
          <li>
            <strong>خنافس الحبوب المخزونة:</strong> في صوامع القمح، تضع الحشرات بيضها داخل الحبة.
            لا تراها بالعين المجردة. ميكروفونات صغيرة تسمع صوت أكل اليرقات داخل الحبوب!
          </li>
          <li>
            <strong>ديدان جذور الأشجار:</strong> بعض الديدان تأكل جذور أشجار الفاكهة من تحت الأرض.
            ميكروفون في التربة يسمع حركتها ويحدد موقعها.
          </li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Ear className="text-emerald-500" />
            المحاكي: كشف السوسة الصوتي
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            استمع داخل جذع النخلة — شغّل فلتر AI لترى الفرق بين الضوضاء العادية وصوت مضغ السوسة:
          </p>
          <AcousticWeevilSim />
        </div>

        <h2>الاقتصاديات</h2>
        <ul>
          <li>
            <strong>تكلفة المستشعر:</strong> $10-50 لكل نخلة. لمزرعة 1000 نخلة = $10,000-$50,000.
          </li>
          <li>
            <strong>تكلفة نخلة ميتة:</strong> نخلة تمر تنتج 100 كغ تمر سنوياً = $300-500 خسارة سنوية.
            10 نخلات ميتة في السنة = $3,000-$5,000 خسارة.
          </li>
          <li>
            <strong>العائد:</strong> النظام يدفع ثمنه في موسمين إذا أنقذ 20-30 نخلة من الموت.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> المستشعرات الصوتية تثبت أن <strong>أذن المهندس</strong>
          قد تكون أهم من عينه. الاستماع إلى صحة النبات عبر الاهتزازات الدقيقة هو مجال واعد 
          في الزراعة الدقيقة. المفتاح هو <strong>فلتر AI الجيد</strong> الذي يفرق 
          بين ريح عابرة وسوسة قاتلة — وينقذ النخيل قبل فوات الأوان.
        </div>
      </div>

      {/* نهاية الباب الرابع */}
      <div
        className="mt-16 bg-gradient-to-br from-purple-600 to-indigo-900 p-8 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #7c3aed, #3730a3)" }}
      >
        <BadgeCheck className="mx-auto mb-4 w-16 h-16 text-yellow-300" />
        <h2 className="text-3xl font-bold mb-4 text-white">ممتاز! 🎉</h2>
        <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
          لقد أتممت "الباب الرابع: هندسة الآلات والذكاء الاصطناعي" بفصوله الثمانية.
          أنت الآن تملك عيوناً في السماء (الأقمار الصناعية والدرونز)، وأذرعاً آلية في الحقل
          (السرب والليزر والـ VRT)، وآذاناً تسمع داخل الجذع (المستشعرات الصوتية).
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-white text-purple-800 hover:bg-purple-50 border-0 w-full md:w-auto">
              العودة للدليل الشامل
            </Button>
          </Link>
          <Link to="/agri/book-05-ecosystems-export">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white border-0 w-full md:w-auto flex items-center gap-2 justify-center">
              <BookOpen size={18} />
              الباب الخامس: الأنظمة المتكاملة وهندسة التصدير
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-04-hardware-ai/chapter07">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: تقنية المعدلات المتغيرة
          </Button>
        </Link>
        <Link to="/agri/book-05-ecosystems-export">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            الباب الخامس: الأنظمة المتكاملة <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

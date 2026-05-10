import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Recycle, BadgeCheck, BookOpen, Flame } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { CompostCycle } from "../../../common/simulators/CompostCycle";

export default function Chapter15() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          to="/book-02-science-toolbox"
          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 15 من 15 (مسك الختام)</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
        دورة التدوير: كيف نصنع "الذهب الأسود"؟
      </h1>

      <div className="prose-custom">
        <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
          في الطبيعة، لا يوجد مصطلح اسمه "قمامة". كل كائن يموت، يصبح طعاماً
          لكائن آخر. هذه هي الدورة التي تجعل الغابات خصبة لملايين السنين دون أن
          يضع فيها أحد حبة سماد.
        </p>

        <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-2xl border-r-4 border-stone-500 my-8">
          <h3 className="text-stone-800 dark:text-stone-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
            <Recycle size={20} />
            صناعة الكمبوست (السماد العضوي)
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
            المهندس الفلاحي لا يرمي بقايا التقليم أو الحشائش أو روث الحيوانات.
            هو يضعها في "مفاعل" لتأكلها البكتيريا وتحولها إلى ما يسمى{" "}
            <strong>الذهب الأسود (Compost)</strong>.
          </p>
        </div>

        <div className="my-12">
          <CompostCycle />
        </div>

        <h3>المعادلة السحرية (C:N Ratio)</h3>
        <p>
          لنجاح هذا التفاعل، البكتيريا تشترط عليك "وجبة متوازنة" تتكون من شيئين:
        </p>
        <ul>
          <li>
            <strong>كربون (C):</strong> يعطي البكتيريا الطاقة. يوجد في الأشياء
            الميتة/الجافة (التبن، أوراق الشجر اليابسة، الخشب). لونها غالباً{" "}
            <strong>بني</strong>.
          </li>
          <li>
            <strong>نيتروجين (N):</strong> يبني أجسام البكتيريا. يوجد في الأشياء
            الحية/الرطبة (الحشائش الخضراء، بقايا الخضروات، روث المواشي). لونها
            غالباً <strong>أخضر</strong>.
          </li>
        </ul>

        <div className="flex items-start gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm mt-8">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-sm text-red-600 dark:text-red-400">
            <Flame size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-0">
              دليل النجاح: الحرارة
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-0">
              إذا خلطت المواد بنسبة صحيحة (ثلثين بني وثلث أخضر) ورطبتها بالماء،
              ستبدأ البكتيريا بالعمل بجنون لدرجة أن الكومة سترتفع حرارتها لتصل
              إلى <strong>70 درجة مئوية!</strong> هذه الحرارة هي التي تعقم
              السماد وتقتل بذور الأعشاب المزعجة المخبأة فيه.
            </p>
          </div>
        </div>

        {/* الخاتمة الاحتفالية للكتاب الثاني */}
        <div
          className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-900 p-8 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #2563eb, #1e3a8a)" }}
        >
          <BadgeCheck className="mx-auto mb-4 w-16 h-16 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4 text-white">إنجاز عظيم! 🎉</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            لقد أتممت "الباب الثاني: العدة العلمية". أنت الآن لست مجرد فلاح
            يراقب الطبيعة، بل أصبحت عالِماً يمتلك أدوات الكيمياء، وموازين
            الفيزياء، ودقة الرياضيات للتحكم في هذه الطبيعة.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 border-0 w-full md:w-auto">
                العودة للدليل الشامل
              </Button>
            </Link>
            <Link to="/book-03-systems-engineering">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white border-0 w-full md:w-auto flex items-center gap-2 justify-center">
                <BookOpen size={18} />
                الباب الثالث: هندسة الأنظمة
              </Button>
            </Link>
          </div>
        </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-02-science-toolbox/chapter14">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> الفصل السابق: وصفة الحياة
          </Button>
        </Link>
        <Link to="/book-03-systems-engineering">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            الباب الثالث: هندسة الأنظمة <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
    </div>
  );
}

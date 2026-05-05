import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Droplets, Fish, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { AquaponicsCycleSim } from "../../../common/simulators/AquaponicsCycleSim";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link to="/book-05-ecosystems-export" className="hover:text-teal-600 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 1 من 4</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        🐟 أكوابونيك (Aquaponics) — مصنع الحياة المغلق
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> كيف نبني نظاماً غذائياً مكتفياً ذاتياً ينتج السمك والخضراوات معاً،
          دون تصريف للمياه الملوثة ودون أسمدة كيماوية؟
        </div>

        <h2>السر: دورة النيتروجين في حلقة مغلقة</h2>
        <p>
          الأكوابونيك هو زواج بين تربية الأسماك (Aquaculture) والزراعة المائية (Hydroponics).
          في الطبيعة، لا يوجد شيء اسمه "مخلفات" — فضلات السمك تصبح غذاءً للنباتات.
          لكن الرحلة ليست بهذه البساطة، فهي تتطلب <strong>محطة معالجة بيولوجية</strong> مصغرة.
        </p>
        <p>
          تخيل أنك تدير <strong>مصنع حياة</strong> مغلقاً: السمك يسبح في حوض، يأكل العلف، ويخرج فضلات
          غنية بالأمونيا (NH₃). الأمونيا سامة جداً للسمك — مثل عادم سام في غرفة مغلقة.
          هنا يأتي دور <strong>المرشح الحيوي (Biofilter)</strong>:
        </p>

        <h2>رحلة النيتروجين خطوة بخطوة</h2>
        <ol>
          <li>
            <strong>حوض السمك → فضلات غنية بالأمونيا:</strong> السمك يطرح الأمونيا مباشرة من الخياشيم
            (80%) والفضلات الصلبة (20%). تركيز الأمونيا يصل لمستوى قاتل خلال ساعات إذا لم يتم معالجته.
          </li>
          <li>
            <strong>المرشح الحيوي — البكتيريا المؤكسدة:</strong> هنا ثلاث كائنات دقيقة تعمل في خط إنتاج:
            <ul>
              <li><strong>Nitrosomonas:</strong> تحول الأمونيا (NH₃) → نتريت (NO₂ᐨ). النتريت أيضاً سام!</li>
              <li><strong>Nitrospira / Nitrobacter:</strong> تحول النتريت (NO₂ᐨ) → نترات (NO₃ᐨ). النترات سماد آمن للنباتات.</li>
            </ul>
          </li>
          <li>
            <strong>النباتات تمتص النترات:</strong> جذور النباتات في أحواض النمو (Grow Beds) تمتص النترات
            والمغذيات الدقيقة. النباتات تنظف الماء!
          </li>
          <li>
            <strong>الماء النظيف يعود إلى السمك:</strong> الماء الخارج من أحواض النباتات أصبح نقياً،
            فيعود إلى حوض السمك. الحلقة تغلق.
          </li>
        </ol>

        <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-6">
          <strong>توازن الكتلة الحيوية:</strong> السر الهندسي في الأكوابونيك هو النسبة بين كتلة السمك
          وكتلة النباتات. سمك أكثر = أمونيا أكثر = نباتات أكثر. إذا اختل التوازن، إما يموت السمك
          من التسمم أو تجوع النباتات. النسبة الذهبية المبدئية: 1 كغ سمك لكل 1 م² من أحواض النمو.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Droplets className="text-teal-500" />
            المحاكي: دورة الأكوابونيك التفاعلية
          </h3>
          <p className="text-slate-600 mb-4">
            تفاعل مع مكونات النظام المغلق — السمك، المرشح الحيوي، والنباتات — لترى كيف تعمل الحلقة:
          </p>
          <AquaponicsCycleSim />
        </div>

        <h2>التصميم الهندسي للأنظمة الثلاثة</h2>
        <p>النظام الأكوابونيكي الكلاسيكي يتكون من ثلاث وحدات رئيسية:</p>
        <ul>
          <li>
            <strong>حوض السمك (Fish Tank):</strong> عادة دائري لسهولة تدوير المياه وجمع الفضلات.
            حجمه يحدد كمية الإنتاج. يفضل أن يكون معزولاً حرارياً.
          </li>
          <li>
            <strong>مرشح المواد الصلبة (Solid Filter):</strong> يفصل الفضلات الصلبة قبل وصول الماء
            إلى المرشح الحيوي. الفضلات الصلبة تذهب إلى كومة كمبوست.
          </li>
          <li>
            <strong>مرشح حيوي (Biofilter):</strong> سطح كبير (كرات بلاستيكية أو صوف صخري) تعيش عليه
            البكتيريا المؤكسدة. سطح 100 م² لكل 1 كغ علف يومياً.
          </li>
          <li>
            <strong>أحواض النمو (Grow Beds):</strong> إما نظام الطوافة (RAFT) أو نظام المد والجزر (Ebb & Flow).
          </li>
        </ul>

        <div className="bg-emerald-50 border-r-4 border-emerald-400 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> الأكوابونيك ليس مجرد "سمك وخس". إنه نظام هندسي دقيق
          يعيد تدوير كل قطرة ماء وكل ذرة نيتروجين. كفاءة المياه تفوق الزراعة التقليدية بـ 10 مرات،
          ولا يحتاج أي سماد خارجي. التحدي الحقيقي هو إدارة التوازن وصحة البكتيريا.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-05-ecosystems-export">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/book-05-ecosystems-export/chapter02">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: الزراعة التجديدية <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

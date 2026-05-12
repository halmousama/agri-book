import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Gauge, Thermometer, Wind, Sun, Droplets } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { EtcWeatherSim } from "../../../common/simulators/EtcWeatherSim";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/agri/book-03-systems-engineering" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 4 من 12</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        💧 التبخر-نتح (Evapotranspiration — ETc): كم ملليمتراً تحتاج حقلاً؟
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> أنت تروي 100 هكتار من الزيتون. الفلاح المجاور يروي غداً وبعد غد. أنت تروي كل 5 أيام. من منكما على صواب؟ الجواب: لا أحد يعرف حتى تحسب ETc.
        </div>

        <h2>ما هو ETc؟</h2>
        <p>
          كل يوم، تفقد التربة والنبات ماءً بطريقتين: التبخر (Evaporation) من سطح التربة، والنتح (Transpiration) من أوراق النبات. مجموعهما = التبخر-نتح (Evapotranspiration).
        </p>
        <p>
          ETc هو <strong>الاحتياج المائي اليومي للمحصول</strong>، ويُقاس بالمليمتر (mm). إذا عرفت أن محصولك يفقد 6 mm ماء اليوم، فأنت تحتاج لتعويض 6 mm عن طريق الري — لا أكثر ولا أقل.
        </p>

        <h2>العوامل المؤثرة على ETc</h2>
        <ol>
          <li><strong>الحرارة (Temperature):</strong> كلما زادت الحرارة، زاد التبخر. كل درجة {'>'} 25°C تزيد الاستهلاك بنسبة 5-8%.</li>
          <li><strong>الرياح (Wind):</strong> الرياح تنقل بخار الماء بعيداً عن الورقة، مما يسرع النتح. في يوم عاصف، الاستهلاك يتضاعف.</li>
          <li><strong>الإشعاع الشمسي (Solar Radiation):</strong> الشمس هي المحرك الأول. يوم غائم = استهلاك أقل.</li>
          <li><strong>نوع المحصول ومرحلة النمو:</strong> الطماطم في مرحلة الإثمار تشرب ضعف ما تشربه في مرحلة البادرة.</li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>تطبيق عملي:</strong> في تونس، يوليو وأغسطس، ETc للطماطم تصل إلى 7-8 mm/يوم. إذا كان لديك هكتار (10,000 m²)، فهذا يعني 70-80 متر مكعب ماء يومياً! 70,000 لتر فقط لتعويض النتح والتبخر.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Gauge className="text-sky-500" />
            المحاكي: محطة الأرصاد الذكية
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            حرك مؤشرات الحرارة والرياح والشمس لترى كيف يحسب النظام الاحتياج المائي ويفتح المحبس تلقائياً:
          </p>
          <EtcWeatherSim />
        </div>

        <h2>كيف تستخدم ETc في قرارات الري؟</h2>
        <p>
          الأفضل هو ربط محطة أرصاد صغيرة (Weather Station) بوحدة تحكم في الري:
        </p>
        <ul>
          <li>محطة الأرصاد تقيس الحرارة، الرطوبة، الرياح، والإشعاع كل 10 دقائق.</li>
          <li>معالج دقيق يحسب ETc باستخدام معادلة Penman-Monteith (أو نسخة مبسطة).</li>
          <li>النظام يطرح الـ ETc من مخزون التربة (Soil Water Balance).</li>
          <li>عندما يصل المخزون إلى حد معين (50% من السعة الحقلية)، يفتح المحبس تلقائياً.</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> لا تروِ بالتقويم (كل 3 أيام). ارِ بالمناخ (حسب ETc). الفرق بينهما قد يكون 40% من فاتورة الماء — إما توفيراً أو هدراً.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/agri/book-03-systems-engineering/chapter03">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: C3 vs C4
          </Button>
        </Link>
        <Link to="/agri/book-03-systems-engineering/chapter05">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: الزراعة المائية <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

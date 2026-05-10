import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Satellite, AlertTriangle, Brain } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { DroneNdviSim } from "../../../common/simulators/DroneNdviSim";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-04-hardware-ai" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 1 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🛰️ العيون الفضائية: مؤشر NDVI والطائرات المسيّرة
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> كيف تعرف صحة نباتاتك في مزرعة مساحتها 100 هكتار دون أن تمشي بينها كل يوم؟ الحقول الكبيرة تحتاج عيوناً من السماء.
        </div>

        <h2>ما هو مؤشر NDVI؟</h2>
        <p>
          <strong>NDVI</strong> اختصار لـ Normalized Difference Vegetation Index، 
          وهو مؤشر رقمي يقيس مدى خضرة النبات وصحته باستخدام الأقمار الصناعية أو الطائرات المسيّرة.
        </p>
        <p>
          الفكرة بسيطة لكنها عبقرية: النباتات الصحية تمتص الضوء الأحمر (Red) لعملية التمثيل الضوئي، 
          وتعكس الضوء تحت الأحمر القريب (Near Infrared — NIR) بقوة. أما النباتات المجهدة أو المريضة، 
          فتعكس كمية أقل من NIR وتمتص كمية أقل من الأحمر.
        </p>

        <h2>المعادلة السرية</h2>
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-6 text-center">
          <span className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">
            NDVI = (NIR - Red) / (NIR + Red)
          </span>
        </div>
        <p>
          النتيجة تكون بين <strong>-1 و +1</strong>:
        </p>
        <ul>
          <li><strong>+0.8 إلى +0.9:</strong> نبات كثيف وصحي جداً (غابة استوائية، محصول في قمة الخضرة).</li>
          <li><strong>+0.5 إلى +0.8:</strong> نبات صحي ولكن أقل كثافة (حقول منتجة).</li>
          <li><strong>+0.2 إلى +0.4:</strong> نبات مجهد أو متفرق — جفاف، نقص عناصر، أو إصابة مرضية مبكرة.</li>
          <li><strong>+0.0 إلى +0.1:</strong> تربة عارية أو صخور أو مياه.</li>
          <li><strong>أقل من 0:</strong> مياه مفتوحة أو سحب أو ثلوج.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>معلومة تقنية:</strong> أول من استخدم NDVI كان <strong>NASA</strong> في السبعينيات عبر قمر Landsat-1. 
          اليوم، أي مزارع يستطيع الحصول على صور NDVI عبر طائرة درون ب 500 دولار، 
          أو حتى عبر تطبيقات مجانية تستخدم صور Sentinel-2 الأوروبي.
        </div>

        <h2>لماذا الطائرات المسيّرة (Drones)؟</h2>
        <p>
          الأقمار الصناعية ممتازة لكن لها حدود: الصورة قد تكون مرة كل 5 أيام، 
          وقد تحجبها الغيوم. هنا يأتي دور الطائرات المسيّرة:
        </p>
        <ul>
          <li><strong>دقة مكانية عالية:</strong> تصل إلى 2-5 سم لكل بكسل (مقابل 10 أمتار في Sentinel).</li>
          <li><strong>مرونة زمنية:</strong> تطير متى تريد — صباحاً، مساءً، بعد الري، بعد العاصفة.</li>
          <li><strong>حمل حساسات متعددة:</strong> كاميرا RGB عادية + كاميرا NIR + كاميرا حرارية في نفس الرحلة.</li>
          <li><strong>مسح سريع:</strong> درون احترافي يمسح 100 هكتار في أقل من ساعتين.</li>
        </ul>

        <h2>كيف تقرأ خريطة NDVI؟</h2>
        <p>
          بعد الرحلة، ينتج البرنامج خريطة ملونة للمزرعة:
        </p>
        <ul>
          <li><strong>الأخضر الغامق:</strong> نبات ممتاز — لا تفعل شيئاً.</li>
          <li><strong>الأصفر/البرتقالي:</strong> إجهاد مبكر — توجه إليها وافحص السبب (مياه؟ عناصر؟ آفات؟).</li>
          <li><strong>الأحمر:</strong> مشكلة حادة — قد تحتاج لري فوري أو تدخل علاجي.</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>التطبيق العملي:</strong> مزارع قمح في السعودية استخدم درون NDVI واكتشف أن رقعة كاملة من الحقل 
          (20%) لا تحصل على كفايتها من المياه بسبب خلل في الرشاش المحوري. 
          في موسم واحد، وفر 30% من مياه الري وزاد الإنتاج 12%.
        </div>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Satellite className="text-emerald-500" />
            المحاكي: درون NDVI التفاعلي
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            حرك المؤشر لترى كيف تتغير ألوان NDVI مع صحة النبات، 
            وكيف تكتشف المشكلة قبل أن تراها العين المجردة:
          </p>
          <DroneNdviSim />
        </div>

        <h2>مستقبل العيون الفضائية</h2>
        <p>
          التقنية تتطور بسرعة. اليوم، هناك شركات تقدم:
        </p>
        <ul>
          <li><strong>NDVI التنبؤي:</strong> ذكاء اصطناعي يحلل صور 5 سنوات ماضية ويتوقع أين ستظهر المشاكل هذا الموسم.</li>
          <li><strong>دمج مع حساسات التربة:</strong> خريطة NDVI + خريطة رطوبة التربة + خريطة التوصيل الكهربائي = وصفة دقيقة لكل متر مربع.</li>
          <li><strong>طائرات ذاتية القيادة:</strong> تخرج من محطتها تلقائياً كل 3 أيام، تمسح الحقل، وترسل التقرير لهاتفك.</li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> NDVI هو أداة التشخيص المبكر الأقوى في الزراعة الحديثة. 
          لا تنتظر حتى ترى النبات يذبل بعينك — العين البشرية ترى المشكلة بعد فوات الأوان. 
          العين الفضائية تراها قبل 7-10 أيام.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-04-hardware-ai">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai/chapter02">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: الرؤية الحاسوبية وفرز المحصول <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PolarizedGlassesSim } from "../../../common/simulators/PolarizedGlassesSim";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/sea/book-sea" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 4 من 5</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        التجهيزات والتكتيك الميداني
      </h1>

      <div className="prose-custom">
        <p>
          معلوماتك عن تضاريس البحر والتوقيت والطقس صارت قوية. الآن نحتاج إلى <strong>الأدوات</strong> و<strong>الاستراتيجية</strong>
          لتحويل هذه المعرفة إلى صيد حقيقي على أرض الواقع — أو بالأحرى على <strong>ماء</strong> الواقع.
        </p>

        <h2>النظارات المستقطبة (Polarized Sunglasses)</h2>
        <p>
          أغلى قطعة في معدات الصياد الذكي. النظارة المستقطبة تحجب الضوء المنعكس عن سطح الماء (الوهج/Glare)
          وتسمح لك برؤية ما تحت السطح بوضوح. ترى الشعاب، الحفر، وحتى الأسماك تتحرك.
        </p>
        <ul>
          <li><strong>اللون:</strong> العدسات الرمادية أو البنية (Copper/Brown) هي الأفضل للصيد. تزيد التباين في الماء الأزرق.</li>
          <li><strong>الاستقطاب (Polarization):</strong> تأكد أن المكتوب عليها "Polarized". الفرق بينها وبين العادية مثل الفرق بين الليل والنهار.</li>
          <li><strong>درجة الحماية:</strong> 100% UV protection ضرورية. عيناك تشكرك بعد 10 سنوات.</li>
        </ul>

        <div className="my-12">
          <PolarizedGlassesSim />
        </div>

        <h2>التطبيقات والأجهزة</h2>
        <p>
          الهاتف الذكي هو أقوى أداة في يد الصياد الحديث. لكن يجب أن تعرف أي تطبيق يفيدك ومتى.
        </p>
        <ul>
          <li><strong>Google Earth:</strong> لدراسة تضاريس القاع من البيت. احفظ الإحداثيات قبل التوجه.</li>
          <li><strong>Navionics / iBoating:</strong> خرائط Bathymetry محمولة على هاتفك. تظهر الأعماق في الوقت الفعلي.</li>
          <li><strong>Windy / Windfinder:</strong> توقعات الرياح والأمواج والضغط. ضروري قبل كل رحلة.</li>
          <li><strong>Fishbrain / Solunar Time:</strong> تقويم سولونار + تغذية مجتمع الصيادين.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>تطبيق السونار المحمول:</strong> أجهزة مثل Deeper وiBobber سونار لاسلكي يُرمى من الشاطئ أو القارب.
          يظهر العمق ودرجة حرارة الماء ووجود الأسماك على هاتفك مباشرة.
          تحذير مهم: هذا الجهاز لا يصلح إذا كنت تريد جره خلف القارب بسرعة — صمم للرمي الثابت أو التحرك البطيء جداً.
        </div>

        <h2>تكتيك الصيد من الشاطئ (Shore Fishing)</h2>
        <p>
          ليس كل صياد يملك قارباً. ولحسن الحظ، معظم الأسماك الكبيرة تقترب من الشاطئ في أوقات معينة.
        </p>
        <ul>
          <li><strong>ابحث عن النقاط (Points):</strong> الأماكن التي تبرز في البحر. التيار يمر من هنا ويجلب الغذاء.</li>
          <li><strong>القنوات بين الشواطئ:</strong> الممرات المائية الضيقة. السمك يستخدمها للتنقل.</li>
          <li><strong>مصبات الأودية:</strong> بعد المطر، تجلب الغذاء من البر. السمك يتجمع عند فوهة المصب.</li>
          <li><strong>الأرصفة والحواجز:</strong> توفر ظلاً وملجأ. جرب الصيد عند طرف الرصيف في فترة المد.</li>
        </ul>

        <h2>تكتيك الصيد من القارب (Boat Fishing)</h2>
        <p>
          القارب يعطيك حرية الوصول إلى النقاط البعيدة. لكن مع الحرية تأتي مسؤولية السلامة.
        </p>
        <ul>
          <li><strong>المرساة:</strong> عند الارتساء فوق نقطة ساخنة، استخدم مرساة مناسبة للقاع الرملي. وخطر المرساة: إذا علقت المرساة في الصخور تحت الماء وأنت مربوط بها، قد تقلب القارب. اربط المرساة بحبل قابل للفك السريع (Trip-line) — حبل منفصل يحرر المرساة إذا علقت.</li>
          <li><strong>الانجراف (Drifting):</strong> اترك القارب ينجرف مع التيار. هذه طريقة ممتازة لتغطية مساحة واسعة من الماء.</li>
          <li><strong>الصيد بالجر (Trolling):</strong> اسحب الطعم خلف القارب بسرعة بطيئة. فعال للكنعد والتونة.</li>
        </ul>

        <h2>السلامة أولاً</h2>
        <ul>
          <li><strong>سترة النجاة (Life Jacket):</strong> ليست للعرض — ارتدها دائماً على القارب. أكثر من 80% من وفيات الصيد تكون بسبب الغرق بعد انقلاب القارب.</li>
          <li><strong>حذاء البحر (Wading Shoes):</strong> لحماية قدميك من القنافذ البحرية والشعاب الحادة والزلاقات. استثمار ضروري.</li>
          <li><strong>جهاز اتصال:</strong> هاتف محمول في حقيبة محكمة الإغلاق + راديو محمول (VHF) إذا كنت بعيداً عن الشاطئ.</li>
          <li><strong>مياه شرب + واقي شمس:</strong> الجفاف وحروق الشمس أعدى أعداء الصياد.</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>حفظ الصيد (Fish Preservation):</strong> السمك يفسد بسرعة في حر الصيف. احضر معك <strong>صندوق تبريد (Cooler)</strong> و<strong>ثلج</strong> كافٍ.
          نظف السمك فور اصطياده: أزل الأحشاء والخياشيم، ثم ضعه في الثلج مباشرة. هذا يحفظ الطعم والنضارة لساعات.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/sea/book-sea/chapter03">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: الطقس
          </Button>
        </Link>
        <Link to="/sea/book-sea/chapter05">
          <Button className="flex items-center gap-2">
            التالي: الملاحق <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

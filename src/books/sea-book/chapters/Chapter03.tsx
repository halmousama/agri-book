import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { SolunarWeatherSim } from "../../../common/simulators/SolunarWeatherSim";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/sea/book-sea" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 3 من 5</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        الطقس ومزاج السمكة
      </h1>

      <div className="prose-custom">
        <p>
          السمكة ليست آلة — هي كائن حي يتأثر <strong>بالطقس</strong> مثلنا تماماً.
          الفرق أننا نشعر بتغير الطقس على جلدنا، أما السمكة فتشعر به على <strong>مثانتها الهوائية</strong>.
        </p>

        <h2>الضغط الجوي (Barometric Pressure): مقياس شهية السمكة</h2>
        <p>
          هذا هو العامل الأهم. السمكة تمتلك <strong>مثانة هوائية</strong> (Swim Bladder) تتحكم في طفوها.
          تغير الضغط الجوي يؤثر على هذه المثانة مباشرة، ويؤثر على راحة السمكة وبالتالي على شهيتها.
        </p>
        <ul>
          <li><strong>ضغط مرتفع ومستقر (1020 hPa+):</strong> السمكة نشيطة ولكنها حذرة. الجو صافٍ، السمكة ترى الخيوط والمعدات. استخدم طعماً طبيعياً وخيوطاً رفيعة.</li>
          <li><strong>ضغط متوسط ومستقر (1010–1020 hPa):</strong> أفضل حالة. السمكة مرتاحة، المثانة الهوائية متوازنة، وقت ممتاز للصيد.</li>
          <li><strong>ضغط منخفض (أقل من 1010 hPa):</strong> السمكة غير مرتاحة. المثانة الهوائية تتوسع، السمكة تشعر بعدم التوازن. توقف عن الأكل أو تأكل بشكل ضعيف.</li>
          <li><strong>الضغط يهبط فجأة:</strong> قبل العاصفة. السمكة تدخل في "هوس تغذية" (Feeding Frenzy). هذا وقت استثنائي — السمك يأكل بشراهة قبل أن تسوء الأحوال.</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>مقياس الضغط الجوي المثالي للصيد:</strong> 1013–1025 hPa مع اتجاه مستقر أو صاعد ببطء.
          إذا رأيت الضغط يهبط 3-4 hPa في 6 ساعات، استعد — العاصفة قادمة، والسمكة على وشك أن تأكل كالمجنونة.
        </div>

        <h2>الرياح: صديق أم عدو؟</h2>
        <p>
          الرياح تؤثر على الصيد بثلاث طرق: <strong>التيار السطحي</strong> (الرياح تحرك الماء السطحي وتخلق تياراً)،
          <strong>الأمواج</strong> (الأمواج تكسر الضوء وتقلل رؤية السمكة)،
          <strong>العكارة</strong> (الأمواج تثير الرواسب وتجعل الماء عكراً).
        </p>
        <ul>
          <li><strong>رياح خفيفة (0–10 km/h):</strong> مثالية. سطح البحر أملس، السمكة ترى الطعم بوضوح.</li>
          <li><strong>رياح معتدلة (10–20 km/h):</strong> جيدة. تموجات على السطح تخفي الخيوط وتحسن فرصك.</li>
          <li><strong>رياح قوية (20–30 km/h):</strong> صعبة لكن ممكنة. ابحث عن الجانب المحمي من الجزيرة أو الرأس.</li>
          <li><strong>رياح عاصفة (30+ km/h):</strong> خطرة. ابق في البيت أو القناة المحمية.</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>ملاحظة مهمة:</strong> الرياح الشمالية الغربية في تونس غالباً ما تكون باردة وجافة. 
          في الشتاء، ابتعد عن السواحل الشمالية المكشوفة. الرياح البرية (التي تهب من البر نحو البحر) 
          تسبب أمواجاً خطرة على القوارب الصغيرة — لا تخاطر.
        </div>

        <h2>حرارة الماء والترموكلين</h2>
        <p>
          السمكة من ذوات الدم البارد — حرارة جسمها تتغير مع حرارة الماء.
          كل نوع له نطاق حراري مفضل. القاروص يحب الماء بين 18 و24°C، والكنعد بين 24 و30°C.
        </p>
        <p>
          <strong>الترموكلين (Thermocline)</strong> هي الطبقة الفاصلة بين الماء السطحي الدافئ والماء العميق البارد.
          تحت هذه الطبقة، الأوكسجين يقل. فوقها، الضوء يخترق. السمك يتجمع غالباً فوق الترموكلين مباشرة —
          هذا هو العمق الذي يجب أن تصيد فيه.
        </p>

        <div className="my-12">
          <SolunarWeatherSim />
        </div>

        <h3>المطر والغطاء السحابي</h3>
        <p>
          <strong>المطر الخفيف:</strong> يخفي وجودك، يبرد السطح، ويزيد الأوكسجين. السمك يصبح أقل حذراً. وقت ممتاز.
        </p>
        <p>
          <strong>الغطاء السحابي الكثيف:</strong> يقلل الضوء ويطيل فترة نشاط السمك. في يوم غائم، السمك ينشط طوال النهار وليس فقط عند الفجر والغسق. السبب ليس تغير الملوحة بل <strong>الصدمة الحرارية والعكارة الطينية</strong> التي يسببها المطر الغزير.
        </p>

        <h3>القمر وأثره على الصيد</h3>
        <p>
          القمر يؤثر على المد والجزر (جاذبية)، وعلى سلوك الأسماك (إضاءة ليلية).
          <strong>القمر المكتمل:</strong> ليالٍ مضيئة. السمك يتغذى ليلاً ويكون كسولاً نهاراً.
          <strong>القمر الجديد:</strong> ليالٍ مظلمة. السمك يتغذى نهاراً بنشاط.
        </p>
        <p>
          القاعدة: <strong>إذا أردت الصيد نهاراً، اختر أيام القمر الجديد. إذا أردت الصيد ليلاً، اختر القمر المكتمل.</strong>
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>الخلاصة:</strong> تحقق من تطبيق الطقس قبل كل رحلة. ابحث عن: ضغط مستقر (1013–1025)،
          رياح خفيفة إلى معتدلة، غطاء سحابي جزئي، وحرارة ماء مناسبة لنوع السمك المستهدف.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/sea/book-sea/chapter02">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: علم التوقيت
          </Button>
        </Link>
        <Link to="/sea/book-sea/chapter04">
          <Button className="flex items-center gap-2">
            التالي: التجهيزات والتكتيك <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

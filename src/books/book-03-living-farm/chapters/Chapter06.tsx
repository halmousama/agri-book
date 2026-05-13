import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { PlantLayersSim } from "../../../common/simulators/PlantLayersSim";

export default function Chapter06() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      {/* Top navigation */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/farm/book-03-living-farm/chapter05" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> الفصل الخامس
        </Link>
        <span>الفصل 6 من 10</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        النظام النباتي — من السعف إلى الطحالب، حديقة متعددة الطبقات
      </h1>

      <div className="prose-custom">
        <h3>تمهيد: لماذا الطبقات؟</h3>

        <p>
          عزيزي القارئ، في الطبيعة، النباتات لا تنمو كلها في مستوى واحد. الغابة الطبيعية لها طبقات: أشجار عالية، أشجار متوسطة، شجيرات، أعشاب، غطاء أرضي. كل طبقة تستغل جزءًا مختلفًا من ضوء الشمس، وكل طبقة تؤدي وظيفة بيئية مختلفة.
        </p>

        <p>
          في مزرعتنا، سنحاكي هذا الذكاء الطبيعي ونضغطه في مساحة صغيرة. زرعنا سيكون في أربع طبقات رئيسية فقط، لتسهيل الإدارة مع الحفاظ على التنوع. الطبقات هي:
        </p>

        <ol>
          <li className="text-lg"><strong>الطبقة الشجرية</strong>: كل الأشجار المعمرة، من النخيل العالي إلى الرمان والزيتون.</li>
          <li className="text-lg"><strong>الطبقة السفلى</strong>: المحاصيل الحولية والأعشاب والغطاء الأرضي.</li>
          <li className="text-lg"><strong>الطبقة المائية وما تحت التربة</strong>: الطحالب والمحاصيل الجذرية.</li>
          <li className="text-lg"><strong>القسم الخاص</strong>: النباتات الخادمة (الطبية، مثبتات النيتروجين، طاردة الآفات).</li>
        </ol>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الأول: الطبقة الشجرية — العمود الفقري للمزرعة</h2>

        <p>
          هذه الطبقة هي وجه المزرعة. هي التي تُرى من بعيد، وتُعطي الظل، وتُنتج الجزء الأكبر من الفواكه والمواد الخام. وقد دمجنا فيها كل الأشجار المعمرة، عاليها ومتوسطها، لأنها تشترك في كونها خشبية معمرة تزرع مرة واحدة وتعطي لعقود.
        </p>

        <h4>النخيل — ملك الصحراء بلا منازع</h4>

        <p>
          النخلة هي العمود الفقري. تتحمل الملوحة، تتحمل الحرارة، وتعيش لعشرات السنين. سنزرع منها عدة أصناف، لكل منها مزاياه:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>المجدول</strong>: تمر طري فاخر، كبير الحجم، ذو سعر مرتفع جدًا في الأسواق العالمية. يحتاج إلى عناية أكثر في التلقيح والتقليم، لكن عائده المالي يبرر ذلك.</li>
          <li className="text-lg"><strong>الخلاص</strong>: تمر أصفر ذهبي، متوسط الحلاوة، ناعم الملمس. ممتاز للأكل الطازج والتخزين، وسعره جيد.</li>
          <li className="text-lg"><strong>البرحي</strong>: يؤكل طازجًا في مرحلته الرطبة (الرطب) قبل أن يصبح تمرًا. مقرمش وحلو، وعليه طلب كبير.</li>
          <li className="text-lg"><strong>الصقعي</strong>: تمر جاف يتحمل التخزين الطويل جدًا، مثالي للتصدير وللأمن الغذائي.</li>
          <li className="text-lg"><strong>السكري</strong>: تمر حلو جدًا وطري، مفضل في أسواق الخليج، وسعره مرتفع.</li>
        </ul>

        <p>
          كل نخلة تنتج حوالي 80-100 كجم من التمر سنويًا حين تبلغ. لكن النخلة لا تعطي فقط التمر. سعفها يُستخدم في صناعة السلال والحصر، أو يُطحن ويُحول إلى بيوتشار. جذوعها بعد عمر طويل تُستخدم كأخشاب بناء. والنخلة نفسها، بارتفاعها، تخلق مناخًا مصغرًا تحتها: ظل يخفض حرارة التربة 10-15 درجة مئوية.
        </p>

        <h4>الأشجار المظللة الكبيرة — مظلات الصحراء</h4>

        <p>
          بين النخيل، سنزرع أشجارًا مظللة كبيرة لا تنتج ثمارًا للإنسان بالضرورة، لكنها تخدم النظام:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>السدر (النبق)</strong>: شجرة صحراوية أصيلة. تتحمل الجفاف والملوحة، وتنتج ثمار النبق (ثمرة حلوة مغذية). أزهارها مرعى ممتاز للنحل، وأوراقها علف للماعز والجمال، وخشبها صلب جيد للنجارة.</li>
          <li className="text-lg"><strong>اللبخ (الأكاسيا بأنواعها)</strong>: شجرة سريعة النمو، تثبت النيتروجين في التربة (لأنها بقولية). أوراقها علف ممتاز، وأزهارها مرعى للنحل، وخشبها وقود جيد. إنها "مصنع نيتروجين" حي.</li>
          <li className="text-lg"><strong>النيم</strong>: شجرة هندية الأصل، لكنها تحب المناخات الحارة. أوراقها وبذورها مبيد حشري طبيعي قوي، وظلها كثيف. زراعتها استثمار في الصحة النباتية للمزرعة كلها.</li>
        </ul>

        <h4>أشجار الزيتون — ذهب البحر المتوسط في الصحراء</h4>

        <p>
          الزيتون قادر على تحمل الجفاف والملوحة المعتدلة، مما يجعله مثاليًا لحواف المزرعة. سنزرع أصنافًا مزدوجة الغرض:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>النبالي البلدي</strong>: صنف محلي مقاوم، يُعطي زيتًا وزيتون مائدة معًا.</li>
          <li className="text-lg"><strong>الصوراني</strong>: إنتاجيته عالية، زيتونه كبير، مناسب للتخليل.</li>
          <li className="text-lg"><strong>القيسي</strong>: زيتون زيتي بامتياز، نسبة الزيت فيه عالية جدًا، والزيت الناتج ممتاز.</li>
        </ul>

        <p>
          بين أشجار الزيتون، العشب الذي ينمو طبيعيًا يُرعى بالماعز والأغنام. أوراق الزيتون نفسها يمكن أن تكون علفًا إضافيًا بعد التقليم. وتفل الزيتون (ما يتبقى بعد العصر) يذهب مباشرة إلى أحواض ديدان الكومبوست.
        </p>

        <h4>الرمان — فاكهة الصحة والجمال</h4>

        <p>
          الرمان يتحمل الملوحة أفضل من معظم الفواكه، ويحب الحرارة. سنزرع أصنافًا متنوعة:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>الرمان اليمني (الطائفي)</strong>: حلو كبير الحبة، عصيره غني.</li>
          <li className="text-lg"><strong>الرمان الحامض</strong>: للطبخ وصناعة الدبس.</li>
          <li className="text-lg"><strong>رمان البذور الناعمة (Wonderful)</strong>: صنف عالمي عليه طلب تصديري كبير.</li>
        </ul>

        <p>
          قشور الرمان التي لا تؤكل تُجفف وتُستخدم في الصباغة الطبيعية، أو تُطحن وتُضاف إلى علف الدواجن (لأنها غنية بمضادات الأكسدة).
        </p>

        <h4>التين — كنز الظل والفاكهة المجففة</h4>

        <p>
          التين شجرة متواضعة، تحتاج ماء أقل مما تتوقع. سنزرع:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>تين السلطاني (الأصفر)</strong>: حلو جدًا، ممتاز للتجفيف والتصدير.</li>
          <li className="text-lg"><strong>تين الحمري (الأسود)</strong>: طازج يؤكل فورًا، وعليه طلب في الأسواق المحلية.</li>
          <li className="text-lg"><strong>تين البناتي (الأخضر)</strong>: كبير الحجم، مثالي للمربيات.</li>
        </ul>

        <p>
          أوراق التين الكبيرة توفر ظلًا كثيفًا للطبقة السفلى. والأوراق المتساقطة تتحلل وتُثري التربة. لكن التين له عدو: ذبابة الفاكهة. لذلك سنزرع حوله القطيفة والريحان لطردها.
        </p>

        <h4>التوت — مصنع الحرير الخفي</h4>

        <p>
          شجرة التوت ليست فقط للثمر الحلو. هي حجر الزاوية في صناعة الحرير داخل المزرعة:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>التوت الأبيض</strong>: أوراقه هي الغذاء الوحيد لدودة القز. نزرعه بكثافة على حواف الأحواض المائية.</li>
          <li className="text-lg"><strong>التوت الأسود</strong>: ثمره للإنسان (طازج ومربيات)، وأوراقه أيضًا تُطعم دودة القز لكن بجودة أقل.</li>
          <li className="text-lg"><strong>التوت البري (العليق)</strong>: شجيرة شائكة، تزرع كسياج طبيعي على حدود المزرعة، وثمرها يباع بسعر مرتفع.</li>
        </ul>

        <p>
          خشب التوت صلب ويمكن استخدامه في صناعات صغيرة بعد تقليمه.
        </p>

        <h4>الحمضيات — في الواحة المحمية</h4>

        <p>
          الحمضيات تحتاج ماء أكثر ولا تتحمل الملوحة العالية. لذلك سنزرعها في "الواحة المحمية" وسط المزرعة، حيث المناخ ألطف والتربة أغنى:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>الليمون البلدي</strong>: للأكل والعصير.</li>
          <li className="text-lg"><strong>البرتقال الفالنسيا</strong>: للعصير الطازج.</li>
          <li className="text-lg"><strong>اليوسفي (المندرين)</strong>: للتصدير والأكل الطازج.</li>
        </ul>

        <h4>أشجار أخرى تستحق مكانًا</h4>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>اللوز</strong>: شجرة تتحمل الجفاف، تزهر مبكرًا فتُبشر بالربيع، وثمرها غالي ومطلوب. أزهارها مرعى مبكر للنحل.</li>
          <li className="text-lg"><strong>المشمش</strong>: يتحمل الحرارة، ثمره طازج ويُجفف (قمر الدين)، ونواته تُستخدم في صناعة مستحضرات التجميل.</li>
          <li className="text-lg"><strong>الخوخ (الدراق)</strong>: يحتاج إلى شتاء بارد نسبيًا، لكن بعض الأصناف منخفضة الاحتياج للبرودة تنجح في الصحراء تحت الظل الجزئي.</li>
        </ul>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الثاني: الطبقة السفلى — المحاصيل الحولية والغطاء الأرضي</h2>

        <p>
          تحت ظل الأشجار، وفي الأحواض المفتوحة والدفيئات، تنمو الطبقة السفلى. هذه الطبقة هي مطبخ المزرعة اليومي، وعلف الحيوانات، وغطاء التربة الحي.
        </p>

        <h4>الخضروات الورقية — الحصاد اليومي</h4>

        <p>
          هذه تزرع في الدفيئات المبردة وفي أحواض الزراعة المائية المرتبطة بأحواض الأسماك:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>السبانخ</strong>: سريع النمو، يُحصد خلال 40 يومًا، غني بالحديد.</li>
          <li className="text-lg"><strong>الخس بأنواعه</strong>: الخس الرومي، الخس الملفوف، الخس الورقي. يزرع بالتتابع ليُحصد على مدار السنة.</li>
          <li className="text-lg"><strong>الكرنب (الملفوف)</strong>: يتحمل الحرارة أكثر من الخس، ويُخزن لفترة طويلة بعد الحصاد.</li>
          <li className="text-lg"><strong>البقدونس والكزبرة</strong>: أعشاب يومية للمطبخ، وطاردة للحشرات في نفس الوقت.</li>
          <li className="text-lg"><strong>النعناع</strong>: غطاء أرضي عطري ينتشر بسرعة، يُقطف يوميًا للشاي والنكهة، ويردع الحشرات.</li>
        </ul>

        <h4>البقوليات — مثبتات النيتروجين التي تُطعمنا</h4>

        <p>
          البقوليات هي "مصنع السماد الطبيعي". جذورها تتعاون مع بكتيريا خاصة لتأخذ نيتروجين الهواء وتثبته في التربة. لذلك نزرعها في دورة زراعية مع الخضروات والحبوب:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>الفول البلدي</strong>: يُزرع شتاءً، يُثبت النيتروجين، ويُعطي محصولًا غنيًا بالبروتين للإنسان. قشوره علف للماشية.</li>
          <li className="text-lg"><strong>العدس</strong>: محصول شتوي قصير، غني بالبروتين، يُخزن لسنوات، وأحد أعمدة الأمن الغذائي.</li>
          <li className="text-lg"><strong>الحمص</strong>: يتحمل البرد النسبي، ويدر دخلًا جيدًا.</li>
          <li className="text-lg"><strong>اللوبيا (Cowpea)</strong>: بقل صيفي يتحمل الحرارة، يُزرع بين الذرة، يُثبت النيتروجين ويُعطي قرونًا خضراء وحبوبًا جافة.</li>
        </ul>

        <h4>الحبوب — خبز المزرعة اليومي</h4>

        <p>
          الحبوب هي أساس الأمن الغذائي. سنزرع ما يكفي احتياجاتنا أولاً، ثم الفائض للبيع:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>القمح</strong>: محصول شتوي. سنزرع أصنافًا مقاومة للجفاف (مثل القمح الصلب). التبن (القش) بعد الحصاد علف ممتاز للماشية.</li>
          <li className="text-lg"><strong>الذرة</strong>: محصول صيفي. الذرة الصفراء علف مركز ممتاز للدواجن والماشية. الذرة البيضاء غذاء للإنسان (خبز، عصيدة).</li>
          <li className="text-lg"><strong>الشعير</strong>: محصول شتوي سريع، يتحمل الملوحة أفضل من القمح. علف ممتاز، ويمكن تحويله إلى برسيم شعيري (Fodder) في صوانٍ داخلية.</li>
        </ul>

        <h4>الأعلاف الخضراء — مطعم الحيوانات الدائم</h4>

        <p>
          لضمان أن علف حيواناتنا منتج محليًا 100%، نزرع مساحات مخصصة للأعلاف:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>البرسيم الحجازي (Alfalfa)</strong>: ملكة الأعلاف. غني بالبروتين، يُحش 6-8 مرات في السنة، ويُجفف أو يُقدم طازجًا. جذوره العميقة تُحسن التربة وتمنع تملحها.</li>
          <li className="text-lg"><strong>الفصة (Clover)</strong>: غطاء أرضي نيتروجيني، علف ناعم ممتاز للدواجن والأرانب.</li>
          <li className="text-lg"><strong>الجت (Rhodes Grass)</strong>: عشب صيفي يتحمل الحرارة الشديدة، ممتاز للأبقار والجمال.</li>
        </ul>

        <h4>الغطاء الأرضي الحي — درع التربة</h4>

        <p>
          بين صفوف الأشجار، وفي المساحات المفتوحة، نزرع غطاءً أرضيًا يحمي التربة من الشمس المباشرة ويحفظ رطوبتها:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>القرع (Pumpkin)</strong>: أوراقه العريضة تغطي مساحات كبيرة، تظلل التربة وتمنع التبخر. ثمره يُخزن لأشهر ويُطعم الإنسان والحيوان. بذوره غنية بالزنك وتُباع بسعر جيد.</li>
          <li className="text-lg"><strong>البطيخ والشمام</strong>: محاصيل صيفية تنتشر على الأرض، تُغطيها وتُعطي ثمارًا حلوة تخزن الماء. تُزرع على حواف الأحواض حيث تصلها الرطوبة.</li>
          <li className="text-lg"><strong>البطاطا الحلوة</strong>: تنمو في التربة الرملية، أوراقها تغطي الأرض بكثافة (ويمكن أن تؤكل كخضار)، ودرناتها تحت التربة غذاء ممتاز للإنسان والحيوان.</li>
        </ul>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الثالث: الطبقة المائية وما تحت التربة</h2>

        <h4>الطحالب — مصنع الأكسجين والبروتين الأخضر</h4>

        <p>
          في أحواض مخصصة بجانب أحواض الأسماك، نزرع الطحالب. الطحلب ليس نباتًا مزعجًا، بل هو:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>منتج أكسجين</strong>: يضخ الأكسجين في الماء، مما يحسن جودة المياه للأسماك.</li>
          <li className="text-lg"><strong>ممتص كربون</strong>: يستهلك ثاني أكسيد الكربون من الجو والماء، مما يساعد في تنظيف البيئة.</li>
          <li className="text-lg"><strong>علف بروتيني</strong>: طحلب السبيرولينا (Spirulina) تحديدًا هو "سوبر فود" يحتوي على بروتين بنسبة 60-70%. يمكن تجفيفه وإضافته إلى علف الأسماك والدواجن، أو بيعه كمكمل غذائي بشري بسعر مرتفع.</li>
          <li className="text-lg"><strong>مادة خام</strong>: بعض الطحالب تُستخدم في إنتاج الوقود الحيوي أو مستحضرات التجميل.</li>
        </ul>

        <p>
          أحواض الطحالب ضحلة، معرضة للشمس، ويُضخ إليها الماء الغني بفضلات الأسماك (مغذيات)، فتنمو الطحالب بسرعة.
        </p>

        <h4>المحاصيل الجذرية — كنوز تحت الأرض</h4>

        <p>
          هذه المحاصيل تنمو تحت التربة، تخزن غذاءها في درنات وجذور، وتُعطي تنوعًا غذائيًا ممتازًا:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>الجزر</strong>: يتحمل الظل الجزئي، يُزرع بين صفوف الأشجار الصغيرة. يُخزن جيدًا ويُباع طازجًا أو يُجفف.</li>
          <li className="text-lg"><strong>الشمندر (البنجر)</strong>: جذره يُخزن ويُؤكل مسلوقًا أو مخللاً، وأوراقه تؤكل طازجة كسلطة. يُزرع شتاءً.</li>
          <li className="text-lg"><strong>الفجل</strong>: سريع جدًا (25-30 يومًا)، يُزرع كحشو بين المحاصيل البطيئة.</li>
          <li className="text-lg"><strong>البطاطا (Irish Potatoes)</strong>: محصول شتوي، يحتاج تربة خفيفة (ورمادنا مثالي). تُخزن طويلاً وتُطعم الإنسان.</li>
          <li className="text-lg"><strong>البصل والثوم</strong>: ليسا فقط غذاءً، بل هما أيضًا طاردان للآفات. يُزرعان على حواف الأحواض وفي الدفيئات لحماية النباتات الأخرى.</li>
        </ul>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الرابع: النباتات الخادمة — صيدلية المزرعة وحماتها</h2>

        <p>
          في هذا القسم الخاص، نستعرض النباتات التي لا تُزرع أساسًا للأكل، بل للخدمات البيئية والصحية التي تقدمها. هي "طاقم الدعم" الصامت الذي يجعل النظام كله يعمل بتناغم.
        </p>

        <h4>أولاً: النباتات الطبية والعطرية — صيدلية المزرعة</h4>

        <p>
          هذه النباتات تُستخدم في علاج أمراض النبات والحيوان والإنسان بطرق طبيعية (كما سيأتي في باب النظام الصحي لاحقًا)، ويمكن تجفيفها أو استخلاص زيوتها وبيعها بأسعار عالية:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">النبات</th>
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">استخداماته في المزرعة</th>
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">قيمته السوقية</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>النعناع</strong></td>
                <td className="p-3">شاي يومي، طارد للحشرات، مهدئ معوي للإنسان والحيوان</td>
                <td className="p-3">أوراق طازجة ومجففة، زيت عطري</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الريحان</strong></td>
                <td className="p-3">طارد للذباب والبعوض، مضاد بكتيري، منكه طعام</td>
                <td className="p-3">أوراق طازجة، زيت الريحان</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الشيح</strong></td>
                <td className="p-3">طارد للديدان المعوية في الماشية، مبيد حشري طبيعي</td>
                <td className="p-3">عشبة مجففة، زيت الشيح</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الخزامى (اللافندر)</strong></td>
                <td className="p-3">مهدئ، طارد للعث والناموس، مرعى للنحل</td>
                <td className="p-3">زهور مجففة، زيت عطري فاخر</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الألوفيرا (الصبار الطبي)</strong></td>
                <td className="p-3">جل الأوراق يعالج الحروق والجروح في الإنسان والحيوان</td>
                <td className="p-3">جل طازج، منتجات تجميل</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>البابونج</strong></td>
                <td className="p-3">شاي مهدئ، مضاد التهاب، غسول للعيون الملتهبة للحيوان</td>
                <td className="p-3">أزهار مجففة، زيت البابونج</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الميرمية</strong></td>
                <td className="p-3">مطهر طبيعي، شاي صحي، طارد للحشرات</td>
                <td className="p-3">أوراق مجففة</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الزعتر</strong></td>
                <td className="p-3">مضاد حيوي طبيعي قوي، منكه طعام، مرعى للنحل</td>
                <td className="p-3">أوراق طازجة ومجففة، زيت الزعتر</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>ثانيًا: النباتات المثبتة للنيتروجين</h4>

        <p>
          شرحنا مبدأها في الطبقة السفلى، لكن نخصص لها هذا الذكر لأنها تُزرع أيضًا بين الأشجار وحول الحقول كخدمة بيئية مستمرة:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li className="text-lg"><strong>البرسيم الحجازي</strong>: جذوره العميقة تجلب المعادن من باطن الأرض وتثبت النيتروجين.</li>
          <li className="text-lg"><strong>الفصة</strong>: غطاء أرضي نيتروجيني سريع الانتشار.</li>
          <li className="text-lg"><strong>اللوبيا</strong>: تُزرع كمحصول بيني مع الذرة، تثبت النيتروجين وتُعطي غذاءً.</li>
          <li className="text-lg"><strong>السنط (الأكاسيا)</strong>: شجرة بقولية تثبت النيتروجين وتُعطي ظلًا وعلفًا.</li>
          <li className="text-lg"><strong>اللوز الهندي (Moringa)</strong>: شجرة سريعة النمو، أوراقها غنية بالبروتين والفيتامينات (علف ومكمل غذائي بشري)، وتثبت النيتروجين.</li>
        </ul>

        <h4>ثالثًا: النباتات الطاردة للآفات — جيش الحماية الطبيعي</h4>

        <p>
          هذه النباتات تُزرع على حواف الأحواض، مداخل الدفيئات، وحول الأشجار المثمرة. هي خط الدفاع الأول الذي يمنع الآفات قبل أن تصل إلى محاصيلنا الثمينة:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">النبات</th>
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">كيف يحمي المزرعة</th>
                <th className="p-3 font-bold text-slate-700 dark:text-slate-300">أين يُزرع</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>القطيفة (Marigold)</strong></td>
                <td className="p-3">تفرز مواد تطرد النيماتودا (ديدان التربة الضارة) والحشرات الطائرة</td>
                <td className="p-3">حواف كل حوض خضروات، مداخل الدفيئات</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الثوم</strong></td>
                <td className="p-3">رائحته تطرد المن (الأرق) والحشرات الثاقبة الماصة</td>
                <td className="p-3">تحت أشجار الفاكهة، بين صفوف الخضروات</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>البصل</strong></td>
                <td className="p-3">مثل الثوم، طارد قوي للحشرات</td>
                <td className="p-3">نفس الأماكن</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>النيم</strong></td>
                <td className="p-3">مبيد حشري وفطري طبيعي شامل. تُنقع أوراقه أو بذوره في الماء ويُرش المستخلص</td>
                <td className="p-3">شجرة واحدة كبيرة تكفي المزرعة كلها</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>الريحان</strong></td>
                <td className="p-3">يطرد الذباب والبعوض ويُربك حشرة التوتا (آفة الطماطم)</td>
                <td className="p-3">بجانب الطماطم، مداخل الدفيئات</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-3"><strong>حشيشة الدود (Tansy)</strong></td>
                <td className="p-3">تطرد النمل، الخنافس، والذباب</td>
                <td className="p-3">على حدود المزرعة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <div className="my-12"><PlantLayersSim /></div>

        <h3>💎 الخلاصة: النبات شريك، لا مجرد محصول</h3>

        <p>
          عزيزي القارئ، في هذه المزرعة، كل نبات له عنوان ووظيفة. النخلة تظلل وتُعطي تمرًا وسعفًا. الزيتون يُعطي زيتًا وعلفًا. البرسيم يُثبت النيتروجين ويُطعم الأبقار. القطيفة تحرس الطماطم. التوت يُطعم دودة القز فتُعطينا حريرًا.
        </p>

        <p>
          لا يوجد نبات مزروع "لأجل نفسه فقط". كل واحد منهم يخدم شيئًا آخر، ويُخدم بشيء آخر. هذه هي الطبقات الأربع التي تشكل جسد المزرعة النباتي: أشجار عالية، محاصيل سفلى، طحالب وجذور، ونباتات خادمة.
        </p>
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-8">
        <Link to="/farm/book-03-living-farm/chapter05">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/farm/book-03-living-farm/chapter07">
          <Button className="flex items-center gap-2">
            التالي: باب السيمفونيات <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

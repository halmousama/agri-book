import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { EnergyWaterSim } from "../../../common/simulators/EnergyWaterSim";

export default function Chapter04() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      {/* Top navigation */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/farm/book-03-living-farm/chapter03" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> الفصل الثالث
        </Link>
        <span>الفصل 4 من 10</span>
      </div>

      {/* Chapter Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        الفصل الرابع: قلب المزرعة النابض — الشمس، الماء، والطاقة
      </h1>

      {/* Prose content */}
      <div className="prose-custom">
        <h2>تمهيد: المعادلة التي لا تقبل الخطأ</h2>

        <p>
          عزيزي القارئ، بعد أن حولنا الرمال الميتة إلى تربة حية في الفصل الثالث، نسأل أنفسنا: ما الذي سيبقي هذه التربة حية؟ ما الذي سيروي النخيل ويملأ أحواض الأسماك ويسقي المراعي؟
        </p>

        <p>
          الجواب ينقسم إلى شقين: <strong>ماء</strong> و <strong>طاقة</strong>. بدونهما، حتى أخصب تربة في العالم ستعود صحراء في غضون أسابيع.
        </p>

        <p>
          لكن الصحراء، التي تبدو بخيلة، تمنحنا بوفرةٍ شيئًا واحدًا لا يُقدّر بثمن: <strong>الشمس</strong>. شمس لا ترحم، تضرب الأرض بلا هوادة من الفجر حتى الغسق. هذه الشمس هي مفتاح كل شيء. هي التي ستستخرج لنا الماء من باطن الأرض. هي التي ستدير مضخاتنا. هي التي ستمنحنا الظل الذي تنمو تحته الحياة. وفي الليل، حين تغيب، تستلم المهمةَ كائناتٌ حيةٌ لا تُرى بالعين المجردة، فتحول مخلفات حيواناتنا إلى طاقةٍ نظيفة.
        </p>

        <p>
          هذا الفصل سيشرح كيف بنينا "جهاز الدوران" في مزرعتنا، حيث تسري الطاقة والماء في عروقها كدمٍ واحد.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الأول: الشمس — محطة الطاقة الصامتة</h2>

        <p>
          تخيل أن لديك موردًا للطاقة لا ينضب، لا يصدر صوتًا، لا يحتاج إلى وقود، ولا يرسل لك فاتورة شهرية. هذا هو واقعنا.
        </p>

        <h3>لماذا الشمس وليس الديزل؟</h3>

        <p>
          في المزارع التقليدية النائية، تُشغّل مضخات المياه بمولدات الديزل. هذا الخيار له ثلاث مشكلات قاتلة:
        </p>

        <ol className="list-decimal pr-6 space-y-1">
          <li><strong>التكلفة التشغيلية</strong>: الديزل باهظ الثمن، ويحتاج إلى نقله وتخزينه.</li>
          <li><strong>الصيانة</strong>: مولدات الديزل تتعطل وتحتاج إلى قطع غيار وزيوت.</li>
          <li><strong>التبعية</strong>: أنت تحت رحمة سعر النفط العالمي وسلسلة التوريد.</li>
        </ol>

        <p>
          في مزرعتنا، الشمس هي الحل. العائق الوحيد هو التكلفة الأولية لشراء الألواح الشمسية والبطاريات، وهذه التكلفة تنخفض عامًا بعد عام. بمجرد تركيب النظام، تكون تكلفة التشغيل السنوية شبه معدومة لعشرين عامًا قادمة.
        </p>

        <h3>مكونات محطتنا الشمسية</h3>

        <p>
          محطتنا صُممت لتغذي المزرعة بأكملها، نهارًا وليلًا:
        </p>

        <ol className="list-decimal pr-6 space-y-1">
          <li>
            <strong>الألواح الشمسية (Solar Panels)</strong>: تغطي مساحة 5 هكتارات على الحافة الشمالية للمزرعة. لماذا الشمالية؟ لأنها لن تظلل أي أرض صالحة للزراعة. هذه الألواح ترتفع عن الأرض بمقدار 3 أمتار، مما يسمح بتربية الدواجن تحتها. الدواجن تستفيد من الظل، وفضلاتها تُسمد التربة تحت الألواح. هذه هي "الزراعة الفولتية" (Agrivoltaics): استخدام الأرض مرتين.
          </li>
          <li>
            <strong>البطاريات (Batteries)</strong>: الشمس لا تشرق ليلاً. لذلك نخزن فائض طاقة النهار في بنك ضخم من بطاريات فوسفات حديد الليثيوم (LiFePO4). هذه البطاريات آمنة، عمرها الافتراضي يتجاوز 15 عامًا، وتكفي لتشغيل المزرعة طوال الليل.
          </li>
          <li>
            <strong>المتحكمات (Inverters & Controllers)</strong>: هي عقل المحطة. تحول تيار الألواح المستمر (DC) إلى تيار متناوب (AC) يصلح لتشغيل المضخات والأجهزة، وتدير عملية الشحن والتفريغ بذكاء.
          </li>
        </ol>

        <h3>ماذا تشغل هذه المحطة؟</h3>

        <ul>
          <li>مضخات المياه الجوفية والسطحية.</li>
          <li>محطة تحلية المياه (إن احتجناها).</li>
          <li>أجهزة التكييف والتبريد في مخازن التمور والبيض.</li>
          <li>غرفة الخوادم والعقل الرقمي (الذي سنشرحه لاحقًا).</li>
          <li>إنارة المزرعة والمباني.</li>
          <li>أجهزة توليد المياه من الجو (AWG) لتأمين مياه الشرب.</li>
        </ul>

        <p>
          جدول بسيط يوضح كفاية النظام:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">العنصر</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">الاستهلاك اليومي التقريبي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">مضخات المياه</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">1,200 كيلوواط/ساعة</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">التبريد والتخزين</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">800 كيلوواط/ساعة</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">الإنارة والتشغيل العام</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">300 كيلوواط/ساعة</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">العقل الرقمي والمستشعرات</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">100 كيلوواط/ساعة</td>
              </tr>
              <tr className="font-bold bg-amber-50 dark:bg-amber-900/30">
                <td className="p-3 border border-slate-200 dark:border-slate-700">الإجمالي</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">2,400 كيلوواط/ساعة</td>
              </tr>
              <tr className="bg-emerald-50 dark:bg-emerald-900/30">
                <td className="p-3 border border-slate-200 dark:border-slate-700"><em>إنتاج المحطة الشمسية (5 ميجاوات)</em></td>
                <td className="p-3 border border-slate-200 dark:border-slate-700"><em>حتى 25,000 كيلوواط/ساعة يوميًا</em></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          الفائض الهائل من الطاقة ليس مشكلة، بل فرصة. يمكن استخدامه في مشاريع مستقبلية، أو تحويله إلى هيدروجين أخضر، أو حتى بيعه للشبكة العامة إن كانت قريبة. في مزرعتنا، الطاقة ليست نادرة أبدًا.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الثاني: الماء — كل قطرة في حلقة مغلقة</h2>

        <p>
          كما تعلمنا من التقرير الذي درسناه، الماء ليس مجرد مورد نضخه من الأرض، بل هو نظام متكامل. في مزرعتنا، لكل قطرة ماء رحلة طويلة ومتعددة المراحل قبل أن تغادر.
        </p>

        <h3>مصادرنا الأربعة للماء</h3>

        <p>
          نحن لا نعتمد على مصدر واحد أبدًا. مصادرنا أربعة، مرتّبة حسب الأولوية والتكلفة:
        </p>

        <h4>1. حصاد مياه الأمطار (الأولوية القصوى)</h4>
        <p>
          حتى لو كانت أمطار الصحراء قليلة (150-350 ملم سنويًا)، فإن كل قطرة منها تُجمع. كيف؟
        </p>
        <ul>
          <li><strong>أسطح المباني والدفيئات</strong>: كلها مصممة بميول توجه المياه نحو خزانات أرضية مغلقة (لمنع التبخر).</li>
          <li><strong>أحواض تجميع صغيرة</strong>: في الحقول المكشوفة، صممنا تضاريس الأرض بحيث تتدفق مياه الأمطار النادرة نحو أحواض صغيرة تتسرب ببطء إلى باطن الأرض، مغذية المياه الجوفية.</li>
          <li><strong>غطاء الخزانات</strong>: كما ينصح التقرير، نستخدم أغطية عائمة تقلل تبخر المياه المخزنة بنسبة تصل إلى 50%.</li>
        </ul>

        <h4>2. البئر الجوفية (المصدر الأساسي المستدام)</h4>
        <p>
          بئر عميقة تصل إلى طبقة مياه جوفية مستقرة. لكننا نتعامل معها بحذر شديد:
        </p>
        <ul>
          <li><strong>الضخ بالطاقة الشمسية فقط</strong>: لا ديزل، لا فواتير.</li>
          <li><strong>الضخ بقدر الحاجة فقط</strong>: العقل الرقمي يحسب احتياجات الري ويمنع الضخ الجائر.</li>
          <li><strong>إعادة التغذية الاصطناعية (MAR)</strong>: في مواسم الأمطار، نضخ فائض المياه السطحية المجمعة إلى آبار تغذية خاصة، لنعيد ملء الطبقة الجوفية بدل استنزافها فقط.</li>
        </ul>

        <h4>3. المكثفات الجوية (مصدر تكميلي ثمين)</h4>
        <p>
          في ساعات الفجر الباردة، نشغّل مكثفات مياه جوية تعمل بالطاقة الشمسية المخزنة. هذه الأجهزة تستخلص الرطوبة من الهواء حتى في الصحارى الجافة. لا تنتج كميات هائلة (200-500 لتر يوميًا)، لكنها كافية تمامًا لتوفير مياه الشرب النقية لسكان المزرعة وعمالها، دون الحاجة لشراء مياه معبأة أو استنزاف البئر.
        </p>

        <h4>4. المياه المعاد تدويرها (الذهب السائل)</h4>
        <p>
          هذه ليست "مياه صرف" بالمعنى التقليدي. كل الماء الذي استُخدم في الأحواض السمكية أو غسل الخضروات يُعاد جمعه، ويمر عبر ثلاث مراحل:
        </p>
        <ul>
          <li><strong>ترسيب</strong>: لإزالة المواد الصلبة العالقة.</li>
          <li><strong>ترشيح حيوي</strong>: عبر أحواض من الحصى والنباتات المائية التي تمتص المغذيات.</li>
          <li><strong>تعقيم</strong>: بالأشعة فوق البنفسجية (تعمل بالطاقة الشمسية).</li>
        </ul>
        <p>
          بعدها، يعود الماء إلى خطوط الري، محملاً ببقايا نيتروجين طبيعي من الأسماك. إنه سماد سائل مجاني.
        </p>

        <h3>كيف نوزع الماء؟ الري بالتنقيط تحت السطحي</h3>

        <p>
          لا نستخدم الري بالغمر أبدًا. ولا حتى الري بالتنقيط السطحي. نستخدم <strong>الري بالتنقيط تحت السطحي (Subsurface Drip Irrigation)</strong>. الأنابيب مدفونة على عمق 20-30 سم تحت التربة، حيث تضع الماء مباشرة في منطقة الجذور. النتيجة:
        </p>

        <ul>
          <li><strong>صفر تبخر</strong>: الماء لا يرى الشمس أبدًا.</li>
          <li><strong>توفير يصل إلى 50%</strong> مقارنة بالري السطحي.</li>
          <li><strong>توصيل السماد</strong>: يمكن حقن السماد العضوي السائل (من الهاضم الحيوي أو أحواض السمك) مباشرة مع ماء الري. هذه تقنية تسمى "التسميد مع الري" (Fertigation)، وهي تضاعف الكفاءة.</li>
        </ul>

        <h3>المواد النانوية: البنك الخفي تحت الأرض</h3>

        <p>
          قبل زراعة أي شجرة أو محصول، كنا قد خلطنا التربة بـ <strong>الهيدروجيل</strong> كما شرحنا. هذه الحبيبات البوليمرية تمتص الماء الزائد أثناء الري وتخزنه، ثم تطلقه ببطء للجذور بين الريات. هي بمثابة "تأمين ضد الجفاف". لو تعطلت مضخة ليوم كامل، النبات لن يذبل. التربة تحتفظ برطوبتها لأيام أطول بفضل هذه المواد.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الثالث: الغاز الحيوي — طاقة الليل من مخلفات النهار</h2>

        <p>
          والآن نأتي إلى سؤالك المهم، عزيزي القارئ. الشمس تشرق نهارًا، لكن ماذا عن الليل؟ ماذا لو كانت السماء غائمة لعدة أيام؟ هنا يأتي دور "محطة الطاقة الليلية".
        </p>

        <h3>كيف نحول الروث إلى كهرباء؟</h3>

        <p>
          العملية بسيطة ومجربة في ملايين المزارع حول العالم، من الهند إلى ألمانيا. اسمها "الهضم اللاهوائي". إليك الخطوات كما نطبقها في مزرعتنا:
        </p>

        <ol className="list-decimal pr-6 space-y-1">
          <li><strong>التجميع اليومي</strong>: كل صباح، تُجمع مخلفات الحيوانات (روث الأبقار والجمال، فضلات الدواجن، وبقايا العلف من أحواض الأسماك) وتُنقل إلى خزان خلط قرب وحدة الغاز الحيوي.</li>
          <li><strong>الهضم اللاهوائي</strong>: يُضخ الخليط إلى خزان كبير محكم الإغلاق ومدفون جزئيًا تحت الأرض (للحفاظ على حرارة ثابتة). داخل هذا الخزان، في عالم بلا أكسجين، تعمل جيوش من البكتيريا اللاهوائية على تفكيك المادة العضوية. هذه البكتيريا تنتج غاز الميثان (CH₄) كفضلات لعملية الهضم.</li>
          <li><strong>تجميع الغاز</strong>: يرتفع الغاز إلى أعلى الخزان ويُسحب عبر أنابيب إلى وحدة تنقية بسيطة تزيل الرطوبة وكبريتيد الهيدروجين (الذي يسبب الرائحة).</li>
          <li><strong>توليد الكهرباء</strong>: الغاز النظيف يُغذي مولدًا كهربائيًا معدّلًا خصيصًا للعمل بالغاز الحيوي. يحترق الغاز في المولد، فيدير محركًا ينتج الكهرباء.</li>
        </ol>

        <h3>الأرقام في مزرعتنا</h3>

        <p>
          لنأخذ مثالاً ملموسًا بناءً على قطيع المزرعة:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">الحيوان</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">العدد</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">الروث اليومي للحيوان الواحد (كجم)</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">إجمالي الروث اليومي (كجم)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">أبقار</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">30</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">15</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">450</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">جمال</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">20</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">12</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">240</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">دواجن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">500</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">0.1</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">50</td>
              </tr>
              <tr className="font-bold bg-amber-50 dark:bg-amber-900/30">
                <td className="p-3 border border-slate-200 dark:border-slate-700">الإجمالي</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700"></td>
                <td className="p-3 border border-slate-200 dark:border-slate-700"></td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">740 كجم/يوم</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul>
          <li><strong>إنتاج الغاز</strong>: 740 كجم من الروث تنتج حوالي 30-35 مترًا مكعبًا من الغاز الحيوي يوميًا.</li>
          <li><strong>توليد الكهرباء</strong>: كل متر مكعب يولد حوالي 2 كيلوواط/ساعة. إذن، نحصل على <strong>60-70 كيلوواط/ساعة يوميًا</strong> من الكهرباء.</li>
          <li><strong>ماذا يكفي هذا؟</strong>
            <ul>
              <li>يكفي لتشغيل ثلاجات تخزين البيض والتمور طوال الليل.</li>
              <li>يكفي لإنارة كامل مباني المزرعة والممرات.</li>
              <li>يكفي لتشغيل غرفة الخوادم والعقل الرقمي (الذي يستهلك 100 كيلوواط/ساعة يوميًا، فتُغطى 70% من احتياجاته ليلاً).</li>
            </ul>
          </li>
        </ul>

        <p>
          هذه الكهرباء "المجانية" تأتي من مورد كان سيُعتبر مشكلة صحية وبيئية لولا هذا النظام.
        </p>

        <h3>المنتج الثانوي الأعظم: السماد العضوي الفاخر</h3>

        <p>
          بعد أن تستخرج البكتيريا الغاز من الروث، تبقى مادة سائلة داكنة غنية جدًا بالعناصر الغذائية. هذا "الهضم" (Digestate) هو أفضل سماد عضوي يمكن أن نحصل عليه. هو:
        </p>

        <ul>
          <li><strong>سريع الامتصاص</strong>: لأن العناصر فيه في صورة سائلة وسهلة.</li>
          <li><strong>غني بالنيتروجين</strong>: الذي تحتاجه النباتات الورقية.</li>
          <li><strong>خالٍ من البكتيريا الضارة</strong>: لأن عملية الهضم اللاهوائي تقضي على معظم مسببات الأمراض.</li>
        </ul>

        <p>
          هذا السماد يُضخ مباشرة إلى حقولنا عبر شبكة الري بالتنقيط (Fertigation). فتحصل النباتات على الماء والغذاء في آن واحد، وتُغلق حلقة النيتروجين بالكامل داخل المزرعة.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-500 p-4 my-6 rounded">
          <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mt-0">💎 الخلاصة: الدورة المغلقة للطاقة والماء</h3>
          <p>
            عزيزي القارئ، في هذه المزرعة، الطاقة والماء ليسا منفصلين، بل هما وجهان لعملة واحدة. الشمس تسحب الماء من الباطن. الماء يبني التربة ويُطعم الحيوانات. الحيوانات تُعطي روثًا يتحول إلى طاقة ليلاً. والطاقة تعود لتضخ الماء من جديد.
          </p>
          <p className="mb-0">
            هكذا نتحرر من الوقود الأحفوري. هكذا نتحرر من فاتورة الكهرباء. هكذا ننظر إلى السماء نهارًا ونقول: شمسنا تكفينا. وننظر إلى الأرض ليلاً ونقول: بكتيريانا الصغيرة تكمل ما بدأته الشمس.
          </p>
        </div>

        <div className="my-12"><EnergyWaterSim /></div>
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-8">
        <Link to="/farm/book-03-living-farm/chapter03">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/farm/book-03-living-farm/chapter05">
          <Button className="flex items-center gap-2">
            التالي: سكان المزرعة <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

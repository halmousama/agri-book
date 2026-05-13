import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { SoilGenesisSim } from "../../../common/simulators/SoilGenesisSim";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      {/* Top navigation */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/farm/book-03-living-farm/chapter02" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> الفصل الثاني
        </Link>
        <span>الفصل 3 من 10</span>
      </div>

      {/* Chapter Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        الفصل الثالث: من الموت إلى الحياة — رحلة تحويل الرمال إلى تربة
      </h1>

      {/* Prose content */}
      <div className="prose-custom">
        <h2>المشهد الافتتاحي: الأرض قبل أن نلمسها</h2>

        <p>
          قف في منتصف القطعة الأرضية التي اخترتها. لا توجد ظلال، لا صوت ريح بين أغصان، ولا رائحة أرض مبلولة بعد مطر. هذه صحراء بالمفهوم المطلق: رمال ناعمة ساخنة، ملوحة كامنة في الأعماق، ومادة عضوية تقترب نسبتها من الصفر. لا شيء ينمو هنا إلا نباتات شوكية متفرقة تتنازع البقاء.
        </p>

        <p>
          هدفنا: تحويل هذا الفراغ إلى تربة داكنة، حية، قادرة على احتضان جذور النخيل والزيتون والخضروات، خلال خمس سنوات فقط.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>المرحلة الأولى: كسر الحلقة المفرغة (السنة 1-2)</h2>

        <h3>ما هي المشكلة حقًا؟</h3>
        <p>
          التربة ليست مجرد "رمل". التربة الحقيقية هي مجتمع حي من المعادن والمواد العضوية والكائنات الدقيقة. الرمل يفتقد لشيئين أساسيين: الكربون العضوي الذي يغذي الحياة، والقدرة على الاحتفاظ بالماء. أي قطرة ماء تسقط هنا إما أن تتبخر فورًا أو تتسرب إلى أعماق لا تصلها الجذور.
        </p>

        <h3>ماذا سنفعل؟</h3>

        <h4>1. البيوتشار (Biochar) — الإسفنج الأسود</h4>

        <p>
          فكر في البيوچار كفحم نباتي مسامي. نأخذ أي مادة عضوية متاحة (سعف نخيل قديم من واحة مجاورة، أغصان أشجار ميتة، حتى قش الأرز المستورد مرة واحدة)، ونحرقها في أفران خاصة بدون أكسجين. النتيجة: مادة سوداء مسامية. الجرام الواحد من البيوچار له مساحة سطحية تعادل ملعب تنس صغير. وظيفته: الإسفنج الذي يحتفظ بالماء والمغذيات في منطقة الجذور لمئات السنين.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-500 p-4 my-6 rounded">
          <p className="mb-0"><strong>الدليل:</strong> استخدمت الحضارات الأصلية في الأمازون البيوچار (Terra Preta) لتحويل تربة الغابات المطيرة الفقيرة إلى أراضٍ زراعية لا تزال خصبة بعد 2000 عام.</p>
        </div>

        <h4>2. الفطريات الجذرية (Mycorrhizal Fungi) — شبكة الإنترنت الطبيعية</h4>

        <p>
          إذا كان البيوچار هو الإسفنج، فالفطريات الجذرية هي الأسلاك التي تنقل المعلومات والغذاء. نخلط مسحوق الفطريات مع جذور أول نباتات مقاومة سنزرعها (كالنباتات البقولية الفقيرة التي تتحمل الملوحة). الفطريات تكون شبكة خفية تحت الأرض تربط جذور النباتات ببعضها، تنقل لها الماء والفوسفور من أعماق لا تصلها، وتحميها من الملوحة.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-500 p-4 my-6 rounded">
          <p className="mb-0"><strong>الدليل:</strong> أكدت دراسات حديثة (2025) أن تلقيح التربة بالفطريات الجذرية في البيئات القاحلة يزيد من قدرة النباتات على مقاومة الجفاف والملوحة بنسب تتجاوز 60%.</p>
        </div>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>المرحلة الثانية: النباتات الرائدة والكائنات المهندسة (السنة 2-3)</h2>

        <p>
          بعد أن وضعنا "البنية التحتية" للتربة، نحتاج لمن يسكنها ويبدأ دورة الحياة.
        </p>

        <h3>1. المهندسون الصغار: أرنب الريكس</h3>

        <p>
          هنا ندخل أرانب الريكس إلى المشهد، ليس كحيوانات إنتاج فقط، بل كمهندسين زراعيين. نخصص لها مساحات انتقالية بين الرمل والمناطق المزروعة حديثًا. الأرانب تحفر الجحور (تهوية التربة وتقليبها)، تاركة فضلاتها الغنية بالنيتروجين والبوتاسيوم مباشرة في باطن الرمل. هذه الفضلات تتحلل بسرعة وتتحول إلى أول طبقة حقيقية من المادة العضوية. في تجربة صحراء كوبوكي في منغوليا الداخلية، كانت أرانب الريكس هي الخطوة الأولى في تحويل الرمال إلى مراعٍ.
        </p>

        <h3>2. النباتات الرائدة (Pioneer Plants)</h3>

        <p>
          لا نبدأ بزراعة النخيل مباشرة. نبدأ بالنباتات المقاومة للملوحة (Halophytes) مثل بعض أنواع القطف (Atriplex) والبقوليات الصحراوية (مثل السنط أو الأكاسيا القزمة). هذه النباتات:
        </p>

        <ul>
          <li>تثبت النيتروجين من الجو في التربة.</li>
          <li>تظلل الرمال وتمنع تطايرها.</li>
          <li>تسقط أوراقها وتخلق أول "فرش" عضوي طبيعي يتحلل ببطء.</li>
        </ul>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-500 p-4 my-6 rounded">
          <p className="mb-0"><strong>الدليل:</strong> في جنوب تونس، استخدمت مشاريع مكافحة التصحر نبات القطف لتحويل أراضٍ رملية مالحة إلى مراعٍ قابلة للرعي في غضون 3 سنوات.</p>
        </div>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>المرحلة الثالثة: دورة المغذيات الحية (السنة 3-5)</h2>

        <p>
          بعد ثلاث سنوات، لم تعد أرضنا "رمالاً". صارت مزيجًا هشًا لكنه حي: 60% رمل، 15% بيوتشار، 15% فضلات ومواد عضوية متحللة، و10% طمي وطين.
        </p>

        <p>
          الآن نبدأ بإغلاق الحلقات:
        </p>

        <h3>1. السماد الدودي (Vermicompost)</h3>

        <p>
          ننشئ أحواض ديدان حمراء (Eisenia fetida) تتغذى على فضلات المطبخ وبقايا المحاصيل الأولى. تنتج "الذهب الأسود": سماد دودي مركز مليء بالبكتيريا النافعة والإنزيمات. نخلطه بمياه الري ليصل مباشرة إلى الجذور.
        </p>

        <h3>2. فراس يرقة الجندي الأسود</h3>

        <p>
          فضلات اليرقات التي أطعمناها للدواجن (في الفصل الثاني) نأتي بها الآن ونخلطها في التربة. هذا الفراس غني بالنيتروجين سريع التحلل، مما يعطي دفعة نمو هائلة للنباتات الأكثر تطلبًا.
        </p>

        <h3>3. زراعة الغطاء الدائم (Cover Cropping)</h3>

        <p>
          بين صفوف الأشجار الصغيرة، نزرع غطاءً نباتيًا دائمًا من البقوليات (كالبرسيم الحجازي أو الفصة). هذا الغطاء:
        </p>

        <ul>
          <li>يثبت النيتروجين باستمرار.</li>
          <li>يحمي التربة من أشعة الشمس المباشرة (يخفض حرارة السطح 15 درجة).</li>
          <li>يُجز دوريًا ويُترك ليتحلل في مكانه، مضيفًا طبقة جديدة من المادة العضوية كل موسم.</li>
        </ul>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>المشهد الختامي: خمس سنوات ونحن نقف على أرض حية</h2>

        <p>
          تعال لنقف معًا على نفس البقعة التي بدأنا منها. أغمض عينيك وتذكر الرمال الميتة. الآن افتحهما.
        </p>

        <p>
          الأرض تحت قدميك داكنة، تكاد تكون سوداء في بعض المواضع. إنها باردة رغم الشمس الحارقة فوقك. لو حفرت بيدك، ستجد ديدانًا، خنافس، وشبكات بيضاء رقيقة من الفطريات تنسج بين الحبيبات. الرائحة تغيرت: لم تعد رائحة الغبار الساخن، بل رائحة غابة بعد مطر خفيف.
        </p>

        <p>
          نسبة المادة العضوية في التربة وصلت إلى 3-5%. هذه هي العتبة السحرية التي تبدأ عندها التربة بالاحتفاظ بالماء لأسابيع بدل ساعات، وتصبح قادرة على دعم أشجار مثمرة معمرة.
        </p>

        <p>
          الآن فقط، عزيزي القارئ، نحن مستعدون لزراعة النخيل والزيتون. الآن فقط، يمكننا الحديث عن الطاقة والماء، لأن لدينا أرضًا تستحق أن نستثمر فيها.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-500 p-4 my-6 rounded">
          <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mt-0">💎 الخلاصة: وصفة التربة الحية</h3>
        </div>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">المكون</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">الوظيفة</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">متى يُضاف</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">البيوتشار</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">إسفنج الماء والمغذيات، مأوى للبكتيريا</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 1، مرة واحدة</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">الفطريات الجذرية</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">شبكة نقل غذاء وماء للنباتات</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 1، مع كل شتلة</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">فضلات أرنب الريكس</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">مادة عضوية + نيتروجين + تقليب التربة</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 2-3، دوريًا</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">النباتات الرائدة</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">تثبيت النيتروجين، حماية السطح</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 1-3</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السماد الدودي</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">إنزيمات وبكتيريا نافعة</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 3-5، مع كل ري</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">فراس اليرقات</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">دفعة نيتروجين سريعة</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 3-5، بين المواسم</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">الغطاء النباتي الدائم</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">حماية دائمة، إضافة مستمرة للعضوية</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">السنة 3 فما فوق</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SoilGenesisSim - placed after the conclusion table */}
        <div className="my-12"><SoilGenesisSim /></div>

        <p>
          بهذا نكون قد حولنا الأرض الميتة إلى تربة حية.
        </p>
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-8">
        <Link to="/farm/book-03-living-farm/chapter02">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/farm/book-03-living-farm/chapter04">
          <Button className="flex items-center gap-2">
            التالي: قلب المزرعة النابض <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

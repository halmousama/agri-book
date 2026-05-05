import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Tractor, AlertTriangle, Weight } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { TractorCompactionSim } from "../../../common/simulators/TractorCompactionSim";

export default function Chapter03() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      {/* Navigation Top */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500">
        <Link to="/book-04-hardware-ai" className="hover:text-amber-600 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 3 من 4</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
        🚜 ميكانيكا التربة وانضغاطها (Soil Compaction)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 border-r-4 border-amber-400 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> حقل خصب، تسميد ممتاز، ري منتظم — ولكن المحصول ضعيف. 
          الجذر لا يستطيع النمو لأن التربة تحولت إلى "خرسانة" تحت سطحها بفعل الجرارات الثقيلة.
        </div>

        <h2>التربة ليست مجرد تراب</h2>
        <p>
          لفهم الانضغاط، يجب أولاً أن تفهم مما تتكون التربة:
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-6">
          <ul className="space-y-2">
            <li><strong>50% مواد صلبة:</strong> رمل، طمي، طين، مواد عضوية.</li>
            <li><strong>25% ماء:</strong> في المسام بين حبيبات التربة.</li>
            <li><strong>25% هواء:</strong> في باقي المسام.</li>
          </ul>
        </div>
        <p>
          هذ الـ 50% من المسام (الماء + الهواء) هي بالضبط ما يحتاجه الجذر. 
          المسام تسمح بمرور الماء والهواء والأملاح المعدنية، وتترك مساحة للجذر ليمتد ويبحث عن الغذاء.
        </p>

        <h2>ماذا يفعل الجرار الثقيل؟</h2>
        <p>
          عندما تمر عجلة جرار وزنه 8-10 أطنان على تربة رطبة، يحدث الآتي:
        </p>
        <ol>
          <li>
            <strong>الضغط (Stress Application):</strong> 
            وزن الجرار يوزع على مساحة صغيرة من التربة (مساحة التلامس بين الإطار والأرض). 
            الضغط = القوة ÷ المساحة. إطار ضيق يضغط بتركيز أعلى من إطار عريض.
          </li>
          <li>
            <strong>انهيار المسام (Pore Collapse):</strong> 
            تحت الضغط، تنهار المسامات الكبيرة (Macropores) التي تحمل الهواء والماء. 
            تتحول التربة من "إسفنجة" إلى "كتلة مضغوطة".
          </li>
          <li>
            <strong>طبقة الانضغاط (Hardpan / Plow Pan):</strong> 
            تتكون طبقة صلبة على عمق 20-40 سم تحت السطح مباشرة. 
            هذه الطبقة هي القاتل الصامت للمحصول — الجذور لا تستطيع اختراقها.
          </li>
        </ol>

        <h2>تأثير الانضغاط على النبات</h2>
        <ul>
          <li>
            <strong>تقزم الجذور:</strong> 
            الجذور لا تستطيع النمو أعمق من 20-30 سم. تبقى سطحية، 
            مما يجعل النبات أكثر حساسية للجفاف — لأن الماء العميق غير متاح.
          </li>
          <li>
            <strong>تشبع بالمياه (Waterlogging):</strong> 
            انعدام المسامات الكبيرة يمنع تصريف الماء الزائد. التربة تبقى رطبة لفترة أطول، 
            مما يخنق الجذور ويسبب تعفن الجذور وأمراض فطرية.
          </li>
          <li>
            <strong>نقص الأكسجين:</strong> 
            تحتاج الجذور إلى أكسجين للتنفس. في التربة المضغوطة، نسبة الأكسجين تنخفض إلى أقل من 5% 
            (الطبيعي 15-20%). الجذور تختنق.
          </li>
          <li>
            <strong>نقص العناصر:</strong> 
            حتى لو أضفت سماداً، الجذور القصيرة لا تصل إلى العناصر المضافة في العمق، 
            والميكروبات النافعة تموت لغياب الأكسجين.
          </li>
        </ul>

        <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-6">
          <strong>معلومة بحثية:</strong> دراسة من جامعة Aarhus الدنماركية (2021) أظهرت أن 
          الانضغاط الناتج عن الجرارات يخفض إنتاج القمح بنسبة 15-25% سنوياً. 
          في الحقول التي تعاني من انضغاط مزمن، قد يخترق جذر واحد فقط من كل 10 جذور طبقة الهاردبان.
        </div>

        <h2>الحلول الهندسية</h2>
        <p>كمهندس زراعي، لديك 4 استراتيجيات رئيسية:</p>

        <h3>الحل 1: إطارات عريضة — ضغط منخفض</h3>
        <p>
          استخدم إطارات عريضة جداً (منخفضة الضغط — LPT أو Terra Tires). 
          إطار بعرض 90 سم يوزع وزن الجرار على مساحة أكبر بكثير من إطار بعرض 30 سم. 
          الضغط على التربة يقل 3 مرات. هذه الإطارات تشبه أحذية الثلج — تمنعك من الغوص.
        </p>

        <h3>الحل 2: ازدواج الإطارات (Dual Wheels / Tandem)</h3>
        <p>
          تركيب إطارين مزدوجين على كل جانب يضاعف مساحة التلامس ويخفض الضغط. 
          شائع في الحقول الكبيرة في أوروبا وأمريكا.
        </p>

        <h3>الحل 3: لا تدخل الحقل وهو مبلل</h3>
        <p>
          أخطر شيء هو المرور على تربة رطبة. الماء بين حبيبات التربة يعمل كـ"مزلق" 
          — الحبيبات تنزلق فوق بعضها تحت الضغط وتتراص بشكل كثيف. 
          القاعدة الذهبية: إذا أخذت حفنة من التراب وشكلتها ككرة وبقيت متماسكة، 
          فالتربة رطبة جداً ولا يجب أن يدخلها الجرار.
        </p>

        <h3>الحل 4: الزراعة بدون حرث (No-Till)</h3>
        <p>
          الحراثة المتكررة تكسر بنية التربة وتزيد الانضغاط على المدى الطويل. 
          الزراعة بدون حرث تقلل عدد مرات مرور الجرار في الحقل بنسبة 50-70%.
        </p>

        {/* المحاكي */}
        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Weight className="text-orange-500" />
            المحاكي: انضغاط التربة
          </h3>
          <p className="text-slate-600 mb-4">
            اختر أنواع الإطارات ورطوبة التربة لترى كيف يؤثر وزن الجرار على بنية التربة ونمو الجذور:
          </p>
          <TractorCompactionSim />
        </div>

        <h2>كيف تكتشف الانضغاط في حقلك؟</h2>
        <ul>
          <li>
            <strong>بينيتومتر (Penetrometer):</strong> 
            أداة رخيصة تشبه مقياس الحرارة. تغرزها في الأرض وتقرأ المقاومة. 
            فوق 300 PSI = انضغاط شديد. فوق 200 PSI = يحتاج تدخل.
          </li>
          <li>
            <strong>حفر شق (Soil Pit):</strong> 
            احفر حفرة بعمق 50-60 سم وانظر إلى جدار الحفرة. 
            إذا رأيت طبقة أفقية صلبة تختلف عن التربة فوقها وتحتها، هذا هو الهاردبان.
          </li>
          <li>
            <strong>مراقبة الجذور:</strong> 
            اقلع نباتاً وانظر إلى الجذور. إذا كانت ملتفة أفقياً على عمق 20-30 سم 
            وكأنها أصيص — هذا دليل قاطع على الانضغاط.
          </li>
        </ul>

        <div className="bg-emerald-50 border-r-4 border-emerald-400 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> أخطر ما في انضغاط التربة أنك لا تراه. 
          الأرض تبدو طبيعية من فوق، لكن المشكلة تحت السطح. 
          استخدم إطارات عريضة، لا تدخل الحقل وهو مبلل، وافحص التربة بالبينيتومتر سنوياً. 
          تذكر: كل كيلوغرام من وزن الجرار فوق أرض رطبة هو استثمار في فقر المحصول القادم.
        </div>
      </div>

      {/* Navigation Bottom */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-100 pt-8">
        <Link to="/book-04-hardware-ai/chapter02">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: الرؤية الحاسوبية وفرز المحصول
          </Button>
        </Link>
        <Link to="/book-04-hardware-ai/chapter04">
          <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
            التالي: الري الآلي المحوري <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

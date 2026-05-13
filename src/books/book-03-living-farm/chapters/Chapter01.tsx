import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { EcoCycleSim } from "../../../common/simulators/EcoCycleSim";

export default function Chapter01() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      {/* Top navigation */}
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/farm/book-03-living-farm" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 1 من 10</span>
      </div>

      {/* Chapter Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        الفصل الأول: كيف تعيش هذه المزرعة؟
      </h1>

      {/* Prose content */}
      <div className="prose-custom">
        <h2>المقدمة</h2>

        <p>
          تصور أنك تملك مزرعة حجمها 100 هكتار في قلب الصحراء. تحتوي هذه المزرعة على:
        </p>

        <ul>
          <li>20 هكتارًا من النخيل وأشجار الفاكهة</li>
          <li>15 هكتارًا من الأحواض المائية لتربية الأسماك</li>
          <li>10 هكتارات من الدفيئات المبردة لزراعة الخضروات الورقية</li>
          <li>5 هكتارات من أحواض الطحالب والبكتيريا النافعة</li>
          <li>40 هكتارًا من المراعي المظللة لتربية الماشية والدواجن</li>
          <li>محطة طاقة شمسية بقدرة 5 ميجاوات</li>
          <li>محطة تحلية مياه جوفية ومكثفات مياه جوية</li>
          <li>مصنع صغير لتحويل المخلفات إلى علف حيواني وسماد عضوي</li>
          <li>شبكة من المستشعرات والكاميرات تغطي كل متر مربع</li>
        </ul>

        <p>
          ولكن الأهم من كل هذا هو أن هذه المكونات لا تعمل بشكل منفصل. إنها تعمل كجسد واحد.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الأول: كيف تعيش هذه المزرعة؟</h2>

        <p>
          السر في هذه المزرعة هو أن كل شيء فيها مرتبط بكل شيء آخر، تمامًا مثل جسم الإنسان.
        </p>

        <h3>القلب الذي يضخ الحياة</h3>
        <p>
          محطة الطاقة الشمسية هي القلب. تضخ الكهرباء لكل شيء: مضخات المياه، المكثفات الجوية، الدفيئات المبردة، وأجهزة المراقبة. لا تحتاج المزرعة إلى وقود خارجي ولا إلى شبكة كهرباء حكومية. الشمس وحدها تكفي لتشغيل كل شيء.
        </p>

        <h3>الجهاز الهضمي الذي لا يرمي شيئًا</h3>
        <p>
          كل ما تنتجه المزرعة من مخلفات يتحول إلى شيء مفيد:
        </p>

        <ul>
          <li>فضلات الأسماك تتحول إلى سماد سائل للنباتات</li>
          <li>أوراق النخيل المتساقطة تتحول إلى فحم حيوي (بيوچار) يُحسن التربة</li>
          <li>مخلفات المطبخ والحقول تتحول إلى علف ليرقات ذبابة الجندي الأسود</li>
          <li>اليرقات نفسها تصبح علفًا عالي البروتين للدواجن والأسماك</li>
          <li>فضلات الدواجن والماشية تتحول إلى غاز حيوي وسماد عضوي</li>
        </ul>

        <p>
          لا يوجد شيء اسمه "نفايات" في هذه المزرعة. كل شيء يدور في حلقة مغلقة.
        </p>

        <h3>الرئتان اللتان تتنفسان الماء</h3>
        <p>
          في الصحراء، الماء هو التحدي الأكبر. لذلك صممت المزرعة لتتنفس الماء من مصدرين:
        </p>

        <ul>
          <li>بئر جوفية عميقة تمدها بالماء المالح</li>
          <li>مكثفات جوية تلتقط الرطوبة من الهواء في ساعات الصباح الباكر</li>
          <li>محطة تحلية تعمل بالطاقة الشمسية لتحويل الماء المالح إلى عذب</li>
          <li>شبكة ري تحت سطحية تصل الماء إلى الجذور مباشرة دون تبخر</li>
        </ul>

        <p>
          كل قطرة ماء تمر بدورة كاملة: تُستخدم، تُجمع، تُعالج، وتُستخدم مرة أخرى.
        </p>

        <h3>الجهاز العصبي الذي لا ينام</h3>
        <p>
          في كل ركن من المزرعة، هناك عيون وآذان إلكترونية:
        </p>

        <ul>
          <li>مستشعرات في التربة تقيس الرطوبة والحرارة والملوحة</li>
          <li>كاميرات على الأعمدة تراقب نمو النباتات وتكتشف الآفات</li>
          <li>أجهزة استشعار في أحواض الأسماك تقيس الأكسجين والأمونيا</li>
          <li>طائرات درون صغيرة تمسح الحقول يوميًا وتلتقط صورًا حرارية</li>
        </ul>

        <p>
          كل هذه البيانات تذهب إلى غرفة خادم صغيرة في طرف المزرعة. هناك، يقوم برنامج ذكي بتحليل كل شيء.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الثاني: من يتخذ القرارات في هذه المزرعة؟</h2>

        <p>
          هنا تأتي النقلة النوعية. في المزرعة التقليدية، المزارع هو من يقرر كل شيء. في هذه المزرعة، هناك شريك آخر يساعد المزارع: <strong>العقل الرقمي</strong>.
        </p>

        <p>
          هذا العقل ليس إنسانًا، بل برنامج ذكاء اصطناعي يعمل على خادم عادي موجود في غرفة مكيفة داخل المزرعة. هذا البرنامج:
        </p>

        <ul>
          <li>يقرأ بيانات المستشعرات كل دقيقة</li>
          <li>يشاهد صور الكاميرات ويرى النباتات التي بدأت تذبل أو تصفر</li>
          <li>يعرف توقعات الطقس للأيام القادمة</li>
          <li>يتذكر كل ما حدث في المزرعة خلال السنوات الماضية</li>
        </ul>

        <p>
          وعندما يلاحظ شيئًا غير طبيعي، يتصرف. مثلاً:
        </p>

        <ul>
          <li>إذا اكتشف أن القطاع 4 بدأ يجف، يُشغل له الري تلقائيًا</li>
          <li>إذا رأى حشرة ضارة على ورقة، يُخطر المزارع ويقترح العلاج الطبيعي المناسب</li>
          <li>إذا توقع عاصفة رملية، يُغلق فتحات الدفيئات مسبقًا</li>
          <li>إذا لاحظ أن الأسماك تحتاج غذاء إضافيًا، يُطلق العلف تلقائيًا</li>
        </ul>

        <p>
          المزارع ليس مضطرًا للمراقبة طوال الوقت. العقل الرقمي يقوم بـ 80% من العمل اليومي. المزارع يتدخل فقط في القرارات الكبيرة أو عندما يطلب منه العقل الرقمي المساعدة في أمر غير معتاد.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الثالث: ماذا تنتج هذه المزرعة؟</h2>

        <p>
          المزرعة لا تنتج شيئًا واحدًا، بل عدة منتجات في نفس الوقت:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">المنتج</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">الكمية السنوية</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700 font-bold">كيف يُنتج</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">تمور عضوية فاخرة</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">200 طن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">من النخيل المروي بماء معاد تدويره</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">خضروات ورقية</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">150 طن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">من الدفيئات المبردة صيفًا والمدفأة شتاءً</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">أسماك بلطي</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">80 طن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">من الأحواض المائية المغلقة</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">بيض ودواجن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">50 طن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">تتغذى على اليرقات والعلف المنتج محليًا</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">زيت زيتون</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">20 طن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">من أشجار الزيتون المزروعة بين النخيل</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700">سماد عضوي فاخر</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">500 طن</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">من تخمير المخلفات النباتية والحيوانية</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 dark:border-slate-700">أرصدة كربونية</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">10,000 طن CO₂</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">لأن المزرعة تمتص كربون أكثر مما تُصدر</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          كل منتج يبيع نفسه بنفسه لأن عليه قصة: "هذه التمور نمت في صحراء بدون أسمدة كيماوية وبدون إهدار قطرة ماء واحدة".
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>القسم الرابع: كيف يعمل كل هذا معًا؟</h2>

        <p>
          لنأخذ مثالاً واحدًا يوضح الترابط:
        </p>

        <ol className="list-decimal pr-6 space-y-1">
          <li>الشمس تشرق على الألواح الشمسية فتنتج كهرباء</li>
          <li>الكهرباء تشغل مضخة الماء الجوفي ومحطة التحلية</li>
          <li>الماء يذهب إلى أحواض الأسماك</li>
          <li>الأسماك تنتج فضلات غنية بالأمونيا</li>
          <li>البكتيريا النافعة تحول الأمونيا إلى نترات (سماد)</li>
          <li>الماء المحمل بالسماد يروي النخيل والخضروات</li>
          <li>النباتات تمتص السماد وتنقي الماء</li>
          <li>الماء النظيف يعود إلى أحواض الأسماك</li>
          <li>أوراق النخيل المتساقطة تُجمع وتُحرق بلا أكسجين (بيوچار)</li>
          <li>البيوچار يخلط بالتربة لتحسينها</li>
          <li>الخضروات غير القابلة للتسويق تذهب إلى يرقات الجندي الأسود</li>
          <li>اليرقات تصبح علفًا للدواجن والأسماك</li>
          <li>فضلات الدواجن تدخل في المخمر الحيوي لتوليد الغاز</li>
          <li>الغاز يستخدم للطهي في مطبخ المزرعة</li>
        </ol>

        <div className="my-12"><EcoCycleSim /></div>

        <p>
          وهكذا، في دورة لا تنتهي. كل خطوة تخدم الخطوة التي بعدها، وكل شيء يعود إلى نقطة البداية.
        </p>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <h2>خاتمة الفصل الأول</h2>

        <p>
          هذه المزرعة ليست خيالًا علميًا. إنها حقيقة تقنية ممكنة اليوم، وكل ما تحتاجه موجود بالفعل ومتوفر بشكل مفتوح ومجاني. في الفصول القادمة، سنشرح بالتفصيل كيفية بناء كل جزء من هذه المزرعة، من تركيب أول لوحة شمسية إلى برمجة العقل الرقمي.
        </p>

        <p>
          ولكن قبل أن ندخل في التفاصيل التقنية، تذكر دائمًا الصورة الكبيرة: <strong>أنت تبني كائنًا حيًا واحدًا، لا مجرد قطعة أرض فيها نباتات وحيوانات.</strong>
        </p>
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-8">
        <Link to="/farm/book-03-living-farm">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق
          </Button>
        </Link>
        <Link to="/farm/book-03-living-farm/chapter02">
          <Button className="flex items-center gap-2">
            التالي: دليل الإمكان <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

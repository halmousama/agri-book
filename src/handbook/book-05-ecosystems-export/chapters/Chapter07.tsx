import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, QrCode, Shield, ScanLine, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { BlockchainQrSim } from "../../../common/simulators/BlockchainQrSim";

export default function Chapter07() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo overflow-x-hidden">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/book-05-ecosystems-export" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 7 من 8</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        🔗 تكنولوجيا البلوكشين في الغذاء (Blockchain Traceability)
      </h1>

      <div className="prose-custom">
        <div className="bg-amber-50 dark:bg-amber-900/30 border-r-4 border-amber-400 dark:border-amber-500 p-4 my-6">
          <strong>المشكلة الهندسية:</strong> المستهلك الأوروبي مستعد لدفع ضعف السعر إذا تأكد 
          أن زيت الزيتون التونسي عضوي 100% وتم شحنه بطريقة أخلاقية. كيف نمنحه الثقة المطلقة؟
        </div>

        <h2>أزمة الثقة في سلسلة الغذاء</h2>
        <p>
          تخيل أنك تشتري زجاجة زيت زيتون مكتوب عليها "عضوي فاخر — معصور على البارد".
          هل تصدق؟ كيف تتأكد أن الزيت فعلاً عضوي ولم يُغشّ؟ 
          حالياً، الجواب هو: <strong>لا تستطيع</strong>. تعتمد على الشعارات والوعود.
        </p>
        <p>
          <strong>البلوكشين (Blockchain)</strong> يحل هذه الأزمة. هو دفتر أستاذ رقمي لا يمكن 
          تعديله أو تزويره. كل خطوة في رحلة المنتج تُسجل كـ "كتلة" (Block) مرتبطة 
          cryptographically بالكتلة السابقة. أي محاولة تزوير في أي كتلة تكسر السلسلة كلها.
        </p>

        <h2>كيف يعمل تتبع البلوكشين الغذائي؟</h2>
        <ol>
          <li>
            <strong>المزرعة:</strong> المزارع يمسح QR Code عند الحصاد. التاريخ، الموقع (GPS)، 
            نوع السماد المستخدم يُسجل في البلوكشين. لا يمكن تغييره لاحقاً.
          </li>
          <li>
            <strong>المعصرة:</strong> عند وصول الزيتون، تُسجل درجة حرارة العصر، التاريخ، 
            والكمية. البلوكشين يتحقق من أن الختم الرقمي للمزرعة يتطابق.
          </li>
          <li>
            <strong>المختبر:</strong> تحليل كيميائي يثبت أن الزيت بكر ممتاز (Acidity &lt; 0.8%). 
            النتيجة تُرفع ككتلة جديدة — مرتبطة بكتلة المعصرة.
          </li>
          <li>
            <strong>الميناء:</strong> الحاوية تُختَم بختم رقمي. سلسلة التبريد تُسجل كل 5 دقائق.
          </li>
          <li>
            <strong>المتجر:</strong> المستهلك يمسح QR Code على الزجاجة. يرى كل الرحلة 
            — من الشجرة في تونس إلى الرف في برلين. شفافية كاملة.
          </li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-r-4 border-blue-400 dark:border-blue-500 p-4 my-6">
          <strong>ماذا لو حاول أحد تزوير البيانات؟</strong> تخيل أن تاجراً غير أمين حاول تغيير 
          تاريخ الحصاد من "أغسطس" (موسم غير مناسب) إلى "أكتوبر" (الموسم المثالي). 
          البلوكشين يرفض: الكتلة الجديدة لا تتطابق مع "هاش" (Hash) الكتلة السابقة. 
          السلسلة تنكسر — الشحنة مرفوضة فوراً.
        </div>

        <h2>سعر الـ Premium — لماذا يدفع الأوروبي أكثر؟</h2>
        <ul>
          <li>
            <strong>الثقة ترفع السعر:</strong> المستهلك الأوروبي يدفع 28 دولاراً للتر 
            زيت زيتون عضوي مُوَثَّق بالبلوكشين، بينما الزيت التقليدي بسعر 12 دولاراً. 
            فرق +138%!
          </li>
          <li>
            <strong>الأخلاق والاستدامة:</strong> جيل الشباب في أوروبا يريد معرفة أن 
            المنتج لم يُنتَج بعمالة أطفال أو بتدمير غابات. البلوكشين يثبت ذلك.
          </li>
          <li>
            <strong>اللوائح الأوروبية:</strong> الاتحاد الأوروبي يتجه لإلزام المستوردين 
            بتقديم "إثبات رقمي" للمنشأ (Digital Product Passport). البلوكشين هو الحل الجاهز.
          </li>
        </ul>

        <div className="my-12">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <QrCode className="text-indigo-500" />
            المحاكي: تتبع البلوكشين و QR Code
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            جرب رحلة زيت الزيتون من المزرعة إلى المتجر — واكتشف كيف تنكشف محاولات التزوير:
          </p>
          <BlockchainQrSim />
        </div>

        <h2>تقنيات التشفير المستخدمة</h2>
        <ul>
          <li>
            <strong>Hashing (SHA-256):</strong> كل كتلة تحتوي على "بصمة" رياضية (Hash) 
            للكتلة السابقة. تغيير أي حرف في البيانات القديمة يغير الـ Hash بالكامل.
          </li>
          <li>
            <strong>التوقيع الرقمي (Digital Signature):</strong> كل مشارك (مزرعة، معصرة، ميناء) 
            لديه مفتاح خاص يوقع به بياناته. التوقيع يثبت هوية المسجل.
          </li>
          <li>
            <strong>IoT + Oracle:</strong> مستشعرات درجة الحرارة والرطوبة في حاوية الشحن 
            تسجل البيانات تلقائياً في البلوكشين — بدون تدخل بشري يمنع التزوير.
          </li>
        </ul>

        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-r-4 border-emerald-400 dark:border-emerald-500 p-4 my-6">
          <strong>الخلاصة الهندسية:</strong> البلوكشين هو <strong>"ختم الثقة"</strong> الرقمي 
          لسلسلة الغذاء العالمية. المزارع التونسي الذي يوثق منتجه بالبلوكشين يفتح له 
          أبواب أسواق الـ Premium في أوروبا وآسيا. الثمن: التزام بالجودة والشفافية. 
          العائد: سعر مضاعف + ولاء المستهلك + حماية من المنافسة غير الشريفة.
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
        <Link to="/book-05-ecosystems-export/chapter06">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: زراعة الكربون
          </Button>
        </Link>
        <Link to="/book-05-ecosystems-export/chapter08">
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700">
            التالي: الزراعة الملحية <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

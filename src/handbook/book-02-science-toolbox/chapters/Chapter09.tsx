import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Zap, Battery } from "lucide-react";
import { Button } from "../../../common/components/ui/Button";
import { EnergyTransform } from "../../../common/simulators/EnergyTransform";

export default function Chapter09() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32 font-cairo">
        <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/agri/book-02-science-toolbox" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                <ArrowRight size={16} /> مقدمة الكتاب
            </Link>
            <span>الفصل 9 من 15</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            حفظ الطاقة: لا شيء يضيع
        </h1>

        <div className="prose-custom">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium">
                في الكون، الطاقة لا تفنى ولا تُستحدث من عدم. هي فقط "تغير ملابسها".
                ضوء الشمس $\rightarrow$ سكر في التفاحة $\rightarrow$ حركة عضلاتك وأنت تجري.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl border-r-4 border-yellow-500 my-8">
                <h3 className="text-yellow-800 dark:text-yellow-200 font-bold text-lg mt-0 mb-2 flex items-center gap-2">
                    <Battery size={20} />
                    المزرعة = محطة طاقة
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-0">
                    انظر لمزرعتك بعين المهندس: هي مساحة واسعة من "الألواح الشمسية" (الأوراق).
                    مهمتك هي التقاط أكبر قدر من الفوتونات (الضوء) وتخزينها في "بطاريات" (الثمار).
                    كلما كبرت الأوراق (الألواح)، زاد الشحن!
                </p>
            </div>

            <div className="my-12">
                <EnergyTransform />
            </div>

            <h3>لماذا هذا مهم؟</h3>
            <p>
                لأن أي ظل يقع على حقلك هو "هدر للطاقة".
                وأي ورقة صفراء مريضة هي "لوح شمسي مكسور".
                حافظ على مصانع الطاقة (الأوراق) نظيفة ومعرضة للشمس لتحصل على أقصى شحن لبطارياتك (المحصول).
            </p>
        </div>

        <div className="mt-16 flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-8">
            <Link to="/agri/book-02-science-toolbox/chapter08">
                <Button variant="outline" className="flex items-center gap-2">
                    <ArrowRight size={18} /> السابق
                </Button>
            </Link>
            <Link to="/agri/book-02-science-toolbox/chapter10">
                <Button className="flex items-center gap-2">
                    التالي: قياس الأرض (المساحات) <ArrowLeft size={18} />
                </Button>
            </Link>
        </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Atom, Droplets, Sun, Ruler, Microscope, BookOpen } from "lucide-react";
import { Button } from "../../common/components/ui/Button";

export default function Book02Intro() {
  // بيانات الأقسام الخمسة
  const sections = [
    {
      id: 1,
      title: "القسم الأول: عالم المادة (الكيمياء)",
      icon: <Atom className="text-purple-500" />,
      desc: "كيف نرى العالم كـ 'مكعبات ليغو' ووصفات طبخ.",
      chapters: ["المكعبات الصغيرة (الذرة)", "الشحنات الخفية (الأيون)", "عصير الطبيعة (المحاليل)"]
    },
    {
      id: 2,
      title: "القسم الثاني: قوى الطبيعة (الموائع)",
      icon: <Droplets className="text-blue-500" />,
      desc: "فهم حركة الماء والضغط كأننا 'سباكون'.",
      chapters: ["الدفع والشفط (الضغط)", "الأنابيب والجريان", "حالات الماء (التبخر)"]
    },
    {
      id: 3,
      title: "القسم الثالث: الطاقة والضوء (الفيزياء)",
      icon: <Sun className="text-amber-500" />,
      desc: "الشمس ليست مجرد لمبة، والحرارة ليست مجرد نار.",
      chapters: ["ألوان الطيف (الضوء)", "الحرارة والطاقة", "حفظ الطاقة (التحولات)"]
    },
    {
      id: 4,
      title: "القسم الرابع: لغة الأرقام (الرياضيات)",
      icon: <Ruler className="text-emerald-500" />,
      desc: "الحساب ليس لتعقيد الأمور، بل لعدم ضياع الحقوق.",
      chapters: ["قياس الأرض (المساحات)", "قياس الخزان (الأحجام)", "النسب والخلط"]
    },
    {
      id: 5,
      title: "القسم الخامس: العالم الخفي (الأحياء)",
      icon: <Microscope className="text-rose-500" />,
      desc: "جيوش لا نراها بالعين المجردة تدير المزرعة.",
      chapters: ["الأصدقاء والأعداء", "وصفة الحياة (الوراثة)", "دورة التدوير"]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen font-cairo pb-20">
      {/* Header Navigation */}
      <div className="mb-12">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium">
            <ArrowRight size={18} className="ml-2" /> العودة للمكتبة
        </Link>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4 border border-blue-100">
            <Wrench size={48} className="text-blue-700" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
          العدة العلمية
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          انتهى زمن "التجربة والخطأ". لكي تتقن الفلاحة، يجب أن تمتلك أدوات العالِم: الكيمياء، الفيزياء، والرياضيات (ببساطة شديدة).
        </p>
      </div>

      {/* Philosophy Box */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
        <div className="prose-custom">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">لماذا هذا الكتاب؟</h3>
            <p>
                في الكتاب الأول، تعلمنا كيف "يفكر" النبات. لكن لكي نلبي طلباته، نحتاج لاستخدام أدوات.
                <br />
                السماد هو "كيمياء". الري هو "فيزياء". وتخطيط الأرض هو "رياضيات".
            </p>
            <p>
                لا تقلق من الأسماء الكبيرة. <strong>نحن نبدأ من الصفر.</strong>
                سنشرح الذرة كأنها "مكعب بناء"، والضغط كأنه "حقنة طبية".
                هذا الكتاب هو صندوق أدواتك لتفهم لغة الكون.
            </p>
        </div>
      </div>

      {/* The 5 Sections Roadmap */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <BookOpen className="text-blue-600" />
            خارطة الطريق (5 أقسام - 15 فصلاً)
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
            {sections.map((section) => (
                <div key={section.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-blue-300 transition-all">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* الأيقونة والعنوان */}
                        <div className="flex items-center gap-4 min-w-[250px]">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                {section.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">{section.title}</h4>
                                <span className="text-xs font-bold text-slate-400">3 فصول</span>
                            </div>
                        </div>

                        {/* الوصف والفصول */}
                        <div className="flex-1">
                            <p className="text-slate-600 mb-4 font-medium">{section.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {section.chapters.map((chapter, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-500">
                                        {idx + 1}. {chapter}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-16">
          <Link to="/book-02-science-toolbox/chapter01">
            <Button className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200/50 flex items-center gap-3 w-full md:w-auto">
                <Atom size={24} />
                ابدأ رحلة العلم (الفصل الأول)
            </Button>
          </Link>
          <Link to="/book-03-systems-engineering">
            <Button variant="outline" className="text-lg px-8 py-4 flex items-center gap-3 w-full md:w-auto border-amber-500 text-amber-600 hover:bg-amber-50">
                <BookOpen size={24} />
                اذهب للكتاب الثالث: هندسة الأنظمة
            </Button>
          </Link>
      </div>
    </div>
  );
}
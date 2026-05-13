import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../../../common/components/ui/Button";
import smartFarmMd from "../../../content/SmartFarm.md?raw";

export default function Chapter11() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link
          to="/farm/book-03-living-farm"
          className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1"
        >
          <ArrowRight size={16} /> مقدمة الكتاب
        </Link>
        <span>الفصل 11 من 11 — النسخة المرجعية</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={28} className="text-amber-600 dark:text-amber-400" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          الدليل المرجعي الشامل (النص الأصلي)
        </h1>
      </div>

      <hr className="my-8 border-slate-200 dark:border-slate-700" />

      <div
        className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-h1:text-3xl prose-h1:font-extrabold prose-h1:text-slate-900 dark:prose-h1:text-slate-100 prose-h1:border-b prose-h1:border-slate-200 dark:prose-h1:border-slate-700 prose-h1:pb-4 prose-h1:mb-6
        prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-800 dark:prose-h2:text-slate-200 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800 prose-h2:pb-2 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:text-slate-700 dark:prose-h3:text-slate-300
        prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
        prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-800 dark:prose-strong:text-slate-200
        prose-ul:list-disc prose-ul:pr-6
        prose-ol:list-decimal prose-ol:pr-6
        prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-li:my-1
        prose-table:w-full prose-table:border-collapse prose-table:text-sm prose-table:my-6
        prose-th:bg-amber-600 prose-th:text-white prose-th:p-3 prose-th:text-right
        prose-td:p-3 prose-td:border-b prose-td:border-slate-100 dark:prose-td:border-slate-800
        prose-tr:bg-white dark:prose-tr:bg-slate-900
        prose-tr:even:bg-amber-50 dark:prose-tr:even:bg-amber-900/10
        prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:text-amber-700 dark:prose-code:text-amber-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-hr:border-slate-200 dark:prose-hr:border-slate-700 prose-hr:my-8
        prose-blockquote:border-r-4 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/20 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:my-4 prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{smartFarmMd}</ReactMarkdown>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-8">
        <Link to="/farm/book-03-living-farm/chapter10">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight size={18} /> السابق: المائدة وحنفية المال
          </Button>
        </Link>
        <Link to="/farm/book-03-living-farm">
          <Button className="flex items-center gap-2">
            العودة إلى مقدمة الكتاب <ArrowLeft size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

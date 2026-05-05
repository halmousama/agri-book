import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronDown,
  ChevronLeft,
  Sprout,
  Wrench,
  Tractor,
  Cpu,
  Globe,
  BookOpen,
  Home,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { BOOKS } from "../../constants/books";
import { cn } from "../../utils/cn";
import { useProgress } from "../../contexts/ProgressContext";

const PART_ICONS: Record<string, React.ReactNode> = {
  "book-01-nature-logic": <Sprout size={20} className="text-emerald-600" />,
  "book-02-science-toolbox": <Wrench size={20} className="text-blue-600" />,
  "book-03-systems-engineering": <Tractor size={20} className="text-amber-600" />,
  "book-04-hardware-ai": <Cpu size={20} className="text-purple-600" />,
  "book-05-ecosystems-export": <Globe size={20} className="text-teal-600" />,
};

const PART_COLORS: Record<string, string> = {
  "book-01-nature-logic": "emerald",
  "book-02-science-toolbox": "blue",
  "book-03-systems-engineering": "amber",
  "book-04-hardware-ai": "purple",
  "book-05-ecosystems-export": "teal",
};

const COLOR_CLASSES: Record<string, Record<string, string>> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", ring: "ring-emerald-500", bar: "bg-emerald-600", activeBg: "bg-emerald-50", activeText: "text-emerald-700", activeBorder: "border-emerald-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", ring: "ring-blue-500", bar: "bg-blue-600", activeBg: "bg-blue-50", activeText: "text-blue-700", activeBorder: "border-blue-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", ring: "ring-amber-500", bar: "bg-amber-600", activeBg: "bg-amber-50", activeText: "text-amber-700", activeBorder: "border-amber-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", ring: "ring-purple-500", bar: "bg-purple-600", activeBg: "bg-purple-50", activeText: "text-purple-700", activeBorder: "border-purple-100" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", ring: "ring-teal-500", bar: "bg-teal-600", activeBg: "bg-teal-50", activeText: "text-teal-700", activeBorder: "border-teal-100" },
};

export const MasterLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openParts, setOpenParts] = useState<Record<string, boolean>>(() => ({
    "book-01-nature-logic": true,
    "book-02-science-toolbox": false,
    "book-03-systems-engineering": false,
    "book-04-hardware-ai": false,
    "book-05-ecosystems-export": false,
  }));
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const { markVisited, isCompleted, lastVisited } = useProgress();

  const currentPath = location.pathname;
  const currentBook = Object.values(BOOKS).find((b) =>
    currentPath.includes(b.id),
  );
  const currentChapter = currentBook
    ? currentBook.chapters.find((c) => currentPath.includes(c.path))
    : null;
  const isHome = currentPath === "/";

  useEffect(() => {
    setIsSidebarOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    if (currentBook && currentChapter) {
      markVisited(currentBook.id, currentChapter.id);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentBook) {
      setOpenParts((prev) => ({ ...prev, [currentBook.id]: true }));
    }
  }, [currentBook?.id]);

  const togglePart = (id: string) => {
    setOpenParts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalChapters = currentBook?.chapters.length ?? 0;
  const currentChapterIndex = currentChapter
    ? (currentBook?.chapters.findIndex((c) => c.id === currentChapter.id) ?? 0) + 1
    : 0;
  const progressPct = totalChapters > 0 ? (currentChapterIndex / totalChapters) * 100 : 0;

  const color = currentBook
    ? PART_COLORS[currentBook.id] ?? "emerald"
    : "emerald";
  const accent = COLOR_CLASSES[color] ?? COLOR_CLASSES.emerald;

  return (
    <div className="min-h-screen bg-surface-50 font-cairo flex isolate overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== Unified Sidebar ===== */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex w-72 flex-col bg-white border-l border-slate-200 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none",
          !isSidebarOpen && "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 shrink-0">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-lg">
            <BookOpen size={20} className="text-emerald-700" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">الدليل الشامل</h2>
            <span className="text-xs text-slate-500">المهندس الفلاحي</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar">
          {/* Home link */}
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-4",
              isHome
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50",
            )}
          >
            <Home size={18} /> الرئيسية
          </Link>

          {/* 3 Parts with accordion */}
          <nav className="space-y-4">
            {Object.values(BOOKS).map((book) => {
              const isActive = currentBook?.id === book.id;
              const isOpen = openParts[book.id] ?? false;
              const bookColor = PART_COLORS[book.id] ?? "emerald";
              const bookAccent = COLOR_CLASSES[bookColor] ?? COLOR_CLASSES.emerald;

              return (
                <div key={book.id} className="rounded-xl overflow-hidden border border-slate-200">
                  {/* Part Header Button */}
                  <button
                    onClick={() => togglePart(book.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 text-sm font-bold transition-all",
                      isActive && !isHome
                        ? cn(bookAccent.activeBg, bookAccent.activeText, bookAccent.activeBorder)
                        : "text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <div className="shrink-0">{PART_ICONS[book.id]}</div>
                    <span className="flex-1 text-right truncate">{book.title}</span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "shrink-0 transition-transform text-slate-400",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Chapters (collapsible) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`chapters-${book.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-2 space-y-0.5">
                          {/* Intro link */}
                          <Link
                            to={`/${book.id}`}
                            onClick={() => setIsSidebarOpen(false)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all",
                              currentPath === `/${book.id}`
                                ? cn(bookAccent.activeBg, bookAccent.activeText, "font-bold border", bookAccent.activeBorder)
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                            )}
                          >
                            <BookOpen size={14} /> مقدمة {book.title}
                          </Link>

                          {/* Chapters */}
                          {(book.sections ?? []).length > 0
                            ? // With section grouping
                              book.sections!.map((section, sIdx) => (
                                <div key={sIdx} className="mt-2">
                                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {section.title}
                                  </div>
                                  {section.chapters.map((ch) => {
                                    const isChActive = currentPath.includes(ch.path);
                                    const chCompleted = isCompleted(book.id, ch.id);
                                    const isLastVisited = lastVisited?.bookId === book.id && lastVisited?.chapterId === ch.id;
                                    return (
                                      <Link
                                        key={ch.id}
                                        to={ch.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={cn(
                                          "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all",
                                          isChActive
                                            ? cn(bookAccent.activeBg, bookAccent.activeText, "font-bold border shadow-sm", bookAccent.activeBorder)
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                        )}
                                      >
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          {chCompleted && !isChActive && (
                                            <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                                          )}
                                          <span className="truncate">{ch.title}</span>
                                          {isLastVisited && !isChActive && (
                                            <span className="shrink-0 text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                              تابع
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          {isChActive && <ChevronLeft size={14} className={bookAccent.activeText} />}
                                          {chCompleted && isChActive && (
                                            <CheckCircle2 size={12} className={bookAccent.activeText} />
                                          )}
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              ))
                            : // Flat list
                              book.chapters.map((ch) => {
                                const isChActive = currentPath.includes(ch.path);
                                const chCompleted = isCompleted(book.id, ch.id);
                                const isLastVisited = lastVisited?.bookId === book.id && lastVisited?.chapterId === ch.id;
                                return (
                                  <Link
                                    key={ch.id}
                                    to={ch.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all mt-0.5",
                                      isChActive
                                        ? cn(bookAccent.activeBg, bookAccent.activeText, "font-bold border shadow-sm", bookAccent.activeBorder)
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      {chCompleted && !isChActive && (
                                        <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                                      )}
                                      <span className="truncate">{ch.title}</span>
                                      {isLastVisited && !isChActive && (
                                        <span className="shrink-0 text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                          تابع
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {isChActive && <ChevronLeft size={14} className={bookAccent.activeText} />}
                                      {chCompleted && isChActive && (
                                        <CheckCircle2 size={12} className={bookAccent.activeText} />
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ===== Main Content Area ===== */}
      <div className="flex-1 flex flex-col min-w-0 bg-white shadow-xl isolate">
        {/* Unified Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between px-4 h-16 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-slate-500 hover:text-slate-600 lg:hidden p-2 rounded-md hover:bg-slate-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span className="sr-only">فتح القائمة</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Breadcrumbs */}
              {!isHome && (
                <nav className="hidden sm:flex" aria-label="Breadcrumb">
                  <ol role="list" className="flex items-center gap-2">
                    <li>
                      <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">
                        الدليل الشامل
                      </Link>
                    </li>
                    {currentBook && (
                      <li>
                        <div className="flex items-center">
                          <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                          <Link
                            to={`/${currentBook.id}`}
                            className="mr-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                          >
                            {currentBook.title}
                          </Link>
                        </div>
                      </li>
                    )}
                    {currentChapter && (
                      <li>
                        <div className="flex items-center">
                          <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                          <span
                            className="mr-2 text-sm font-bold text-slate-900 truncate max-w-[200px]"
                            aria-current="page"
                          >
                            {currentChapter.title}
                          </span>
                        </div>
                      </li>
                    )}
                  </ol>
                </nav>
              )}
            </div>

            {/* Progress indicator */}
            {currentChapter && (
              <div className={cn("flex items-center gap-3 px-3 py-1.5 rounded-full border", accent.bg, accent.border)}>
                <Activity size={16} className={cn("hidden sm:block", accent.text)} />
                <div className="flex flex-col items-end">
                  <span className={cn("text-xs font-bold", accent.text)}>
                    تقدم ({currentChapterIndex}/{totalChapters})
                  </span>
                  <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000 ease-out", accent.bar)}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main ref={mainRef} className="flex-1 relative overflow-y-auto custom-scrollbar bg-surface-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

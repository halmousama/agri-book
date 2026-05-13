import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  Ship,
} from "lucide-react";
import { LIBRARY } from "../../constants/books";
import { cn } from "../../utils/cn";
import { useProgress } from "../../contexts/ProgressContext";
import { ThemeToggle } from "../ui/ThemeToggle";

const PART_ICONS: Record<string, React.ReactNode> = {
  "book-01-nature-logic": <Sprout size={20} className="text-emerald-600 dark:text-emerald-400" />,
  "book-02-science-toolbox": <Wrench size={20} className="text-blue-600 dark:text-blue-400" />,
  "book-03-systems-engineering": <Tractor size={20} className="text-amber-600 dark:text-amber-400" />,
  "book-04-hardware-ai": <Cpu size={20} className="text-purple-600 dark:text-purple-400" />,
  "book-05-ecosystems-export": <Globe size={20} className="text-teal-600 dark:text-teal-400" />,
  "book-sea": <Ship size={20} className="text-blue-600 dark:text-blue-400" />,
};

const PART_COLORS: Record<string, string> = {
  "book-01-nature-logic": "emerald",
  "book-02-science-toolbox": "blue",
  "book-03-systems-engineering": "amber",
  "book-04-hardware-ai": "purple",
  "book-05-ecosystems-export": "teal",
  "book-sea": "blue",
};

const COLOR_CLASSES: Record<string, Record<string, string>> = {
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", ring: "ring-emerald-500", bar: "bg-emerald-600", activeBg: "bg-emerald-50 dark:bg-emerald-900/40", activeText: "text-emerald-700 dark:text-emerald-300", activeBorder: "border-emerald-100 dark:border-emerald-800" },
  blue: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", ring: "ring-blue-500", bar: "bg-blue-600", activeBg: "bg-blue-50 dark:bg-blue-900/40", activeText: "text-blue-700 dark:text-blue-300", activeBorder: "border-blue-100 dark:border-blue-800" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", ring: "ring-amber-500", bar: "bg-amber-600", activeBg: "bg-amber-50 dark:bg-amber-900/40", activeText: "text-amber-700 dark:text-amber-300", activeBorder: "border-amber-100 dark:border-amber-800" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", ring: "ring-purple-500", bar: "bg-purple-600", activeBg: "bg-purple-50 dark:bg-purple-900/40", activeText: "text-purple-700 dark:text-purple-300", activeBorder: "border-purple-100 dark:border-purple-800" },
  teal: { bg: "bg-teal-50 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", ring: "ring-teal-500", bar: "bg-teal-600", activeBg: "bg-teal-50 dark:bg-teal-900/40", activeText: "text-teal-700 dark:text-teal-300", activeBorder: "border-teal-100 dark:border-teal-800" },
};

const LIBRARY_COLORS: Record<string, { gradient: string; iconGrad: string; iconColor: string; logoText: string; homeHover: string }> = {
  agri: { gradient: "from-emerald-100 to-amber-100 dark:from-emerald-900/40 dark:to-amber-900/30", iconGrad: "from-emerald-100 to-amber-100 dark:from-emerald-800/60 dark:to-amber-800/50", iconColor: "text-emerald-700 dark:text-emerald-300", logoText: "hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400", homeHover: "dark:bg-emerald-600" },
  sea: { gradient: "from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/30", iconGrad: "from-blue-100 to-cyan-100 dark:from-blue-800/60 dark:to-cyan-800/50", iconColor: "text-blue-700 dark:text-blue-300", logoText: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:hover:text-blue-400", homeHover: "dark:bg-blue-600" },
};

export const MasterLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openParts, setOpenParts] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const { markVisited, isCompleted, lastVisited } = useProgress();

  const currentPath = location.pathname;

  const libraryEntry = LIBRARY.find(lib => currentPath.startsWith(lib.path));
  const libraryPrefix = libraryEntry?.id ?? '';
  const availableBooks = libraryEntry ? Object.values(libraryEntry.books) : [];
  const libColors = LIBRARY_COLORS[libraryEntry?.id ?? 'agri'] ?? LIBRARY_COLORS.agri;

  const currentBook = libraryEntry
    ? Object.values(libraryEntry.books).find((b) => currentPath.includes(b.id))
    : null;
  const currentChapter = currentBook
    ? currentBook.chapters.find((c) => currentPath.includes(c.path))
    : null;

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.scrollTop = 0;
    main.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const onNavClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (link && link.getAttribute("href")?.startsWith("#")) {
        main.scrollTop = 0;
      }
    };
    main.addEventListener("click", onNavClick);
    return () => main.removeEventListener("click", onNavClick);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
    if (currentBook && currentChapter) {
      markVisited(currentBook.id, currentChapter.id);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (currentBook) {
      setOpenParts((prev) => ({ ...prev, [currentBook.id]: true }));
    }
  }, [currentBook?.id]);

  const onSidebarLinkClick = () => {
    setIsSidebarOpen(false);
    mainRef.current?.scrollTo(0, 0);
  };

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
    <div className="min-h-screen bg-surface-50 dark:bg-slate-950 font-cairo flex isolate overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex w-72 flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none",
          !isSidebarOpen && "translate-x-full",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className={`p-2 bg-gradient-to-br ${libColors.iconGrad} rounded-lg`}>
            <BookOpen size={20} className={libColors.iconColor} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              {libraryEntry?.title ?? 'المكتبة'}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {libraryEntry?.subtitle ?? ''}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar">
          {/* Back to Library */}
          <Link
            to="/"
            onClick={onSidebarLinkClick}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-4 text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
          >
            <Home size={18} /> العودة إلى المكتبة
          </Link>

          {/* Books accordion */}
          <nav className="space-y-4">
            {availableBooks.map((book) => {
              const isActive = currentBook?.id === book.id;
              const isOpen = openParts[book.id] ?? false;
              const bookColor = PART_COLORS[book.id] ?? color;
              const bookAccent = COLOR_CLASSES[bookColor] ?? COLOR_CLASSES.emerald;

              return (
                <div key={book.id} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => togglePart(book.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 text-sm font-bold transition-all",
                      isActive
                        ? cn(bookAccent.activeBg, bookAccent.activeText, bookAccent.activeBorder)
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
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
                          <Link
                            to={`/${libraryPrefix}/${book.id}`}
                            onClick={onSidebarLinkClick}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all",
                              currentPath === `/${libraryPrefix}/${book.id}`
                                ? cn(bookAccent.activeBg, bookAccent.activeText, "font-bold border", bookAccent.activeBorder)
                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200",
                            )}
                          >
                            <BookOpen size={14} /> مقدمة {book.title}
                          </Link>

                          {(book.sections ?? []).length > 0
                            ? book.sections!.map((section, sIdx) => (
                                <div key={sIdx} className="mt-2">
                                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    {section.title}
                                  </div>
                                  {section.chapters.map((ch) => {
                                    const chLinkPath = `/${libraryPrefix}/${book.id}/${ch.id}`;
                                    const isChActive = currentPath.includes(ch.path);
                                    const chCompleted = isCompleted(book.id, ch.id);
                                    const isLastVisited = lastVisited?.bookId === book.id && lastVisited?.chapterId === ch.id;
                                    return (
                                      <Link
                                        key={ch.id}
                                        to={chLinkPath}
                                        onClick={onSidebarLinkClick}
                                        className={cn(
                                          "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all",
                                          isChActive
                                            ? cn(bookAccent.activeBg, bookAccent.activeText, "font-bold border shadow-sm", bookAccent.activeBorder)
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200",
                                        )}
                                      >
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          {chCompleted && !isChActive && (
                                            <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                                          )}
                                          <span className="truncate">{ch.title}</span>
                                          {isLastVisited && !isChActive && (
                                            <span className="shrink-0 text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
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
                            : book.chapters.map((ch) => {
                                const chLinkPath = `/${libraryPrefix}/${book.id}/${ch.id}`;
                                const isChActive = currentPath.includes(ch.path);
                                const chCompleted = isCompleted(book.id, ch.id);
                                const isLastVisited = lastVisited?.bookId === book.id && lastVisited?.chapterId === ch.id;
                                return (
                                  <Link
                                    key={ch.id}
                                    to={chLinkPath}
                                    onClick={onSidebarLinkClick}
                                    className={cn(
                                      "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all mt-0.5",
                                      isChActive
                                        ? cn(bookAccent.activeBg, bookAccent.activeText, "font-bold border shadow-sm", bookAccent.activeBorder)
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200",
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      {chCompleted && !isChActive && (
                                        <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                                      )}
                                      <span className="truncate">{ch.title}</span>
                                      {isLastVisited && !isChActive && (
                                        <span className="shrink-0 text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
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
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 shadow-xl isolate">
        {/* Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 h-16 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span className="sr-only">فتح القائمة</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Breadcrumbs */}
              <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center gap-2">
                  <li>
                    <Link to="/" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                      المكتبة
                    </Link>
                  </li>
                  {currentBook && (
                    <li>
                      <div className="flex items-center">
                        <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                        <Link
                          to={`/${libraryPrefix}/${currentBook.id}`}
                          className="mr-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
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
                          className="mr-2 text-sm font-bold text-slate-900 dark:text-slate-100 truncate max-w-[200px]"
                          aria-current="page"
                        >
                          {currentChapter.title}
                        </span>
                      </div>
                    </li>
                  )}
                </ol>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {currentChapter && (
                <div className={cn("flex items-center gap-3 px-3 py-1.5 rounded-full border", accent.bg, accent.border)}>
                  <Activity size={16} className={cn("hidden sm:block", accent.text)} />
                  <div className="flex flex-col items-end">
                    <span className={cn("text-xs font-bold", accent.text)}>
                      تقدم ({currentChapterIndex}/{totalChapters})
                    </span>
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-1000 ease-out", accent.bar)}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main id="main-scroll-container" ref={mainRef} className="flex-1 relative overflow-y-auto custom-scrollbar bg-surface-50 dark:bg-slate-950">
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

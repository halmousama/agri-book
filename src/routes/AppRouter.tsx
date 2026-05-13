import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from '../common/components/ScrollToTop';
import App from '../App';
import { MasterLayout } from '../common/components/layout/MasterLayout';
import { BOOKS, SEA_BOOKS, FARM_BOOKS } from '../common/constants/books';

const handbookIntros = import.meta.glob('../handbook/*/index.tsx');
const handbookChapters = import.meta.glob('../handbook/*/chapters/*.tsx');
const seaIntros = import.meta.glob('../books/sea-book/index.tsx');
const seaChapters = import.meta.glob('../books/sea-book/chapters/*.tsx');
const farmIntros = import.meta.glob('../books/book-03-living-farm/index.tsx');
const farmChapters = import.meta.glob('../books/book-03-living-farm/chapters/*.tsx');

const lazyComponents: Record<string, any> = {};

Object.entries(handbookIntros).forEach(([path, loader]) => {
  lazyComponents[path] = lazy(loader as any);
});
Object.entries(handbookChapters).forEach(([path, loader]) => {
  lazyComponents[path] = lazy(loader as any);
});
Object.entries(seaIntros).forEach(([path, loader]) => {
  lazyComponents[path] = lazy(loader as any);
});
Object.entries(seaChapters).forEach(([path, loader]) => {
  lazyComponents[path] = lazy(loader as any);
});
Object.entries(farmIntros).forEach(([path, loader]) => {
  lazyComponents[path] = lazy(loader as any);
});
Object.entries(farmChapters).forEach(([path, loader]) => {
  lazyComponents[path] = lazy(loader as any);
});

export const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={
      <div className="flex h-screen items-center justify-center font-cairo">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
          <p className="text-blue-700 font-bold animate-pulse">جاري تحميل المنصة...</p>
        </div>
      </div>
    }>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>

          {/* Library Home */}
          <Route path="/" element={<App />} />

          {/* Redirect bare library paths */}
          <Route path="/agri" element={<Navigate to="/agri/book-01-nature-logic" replace />} />
          <Route path="/sea" element={<Navigate to="/sea/book-sea" replace />} />
          <Route path="/farm" element={<Navigate to="/farm/book-03-living-farm" replace />} />

          {/* Agri Books (5 books from handbook/) */}
          {Object.values(BOOKS).map((book) => (
            <Route key={book.id} path={`/agri/${book.id}`} element={<MasterLayout />}>
              <Route
                index
                element={(() => {
                  const Intro = lazyComponents[`../handbook/${book.id}/index.tsx`];
                  return Intro ? <Intro /> : <div>مقدمة غير موجودة</div>;
                })()}
              />
              {book.chapters.map((chapter) => {
                const fileId = chapter.id.charAt(0).toUpperCase() + chapter.id.slice(1);
                const chapterPath = `../handbook/${book.id}/chapters/${fileId}.tsx`;
                const ChapterComp = lazyComponents[chapterPath];
                return (
                  <Route
                    key={chapter.id}
                    path={chapter.id}
                    element={ChapterComp ? <ChapterComp /> : <div>فصل غير موجود</div>}
                  />
                );
              })}
            </Route>
          ))}

          {/* Sea Book (single book from books/sea-book/) */}
          {Object.values(SEA_BOOKS).map((book) => (
            <Route key={book.id} path={`/sea/${book.id}`} element={<MasterLayout />}>
              <Route
                index
                element={(() => {
                  const Intro = lazyComponents[`../books/sea-book/index.tsx`];
                  return Intro ? <Intro /> : <div>مقدمة غير موجودة</div>;
                })()}
              />
              {book.chapters.map((chapter) => {
                const fileId = chapter.id.charAt(0).toUpperCase() + chapter.id.slice(1);
                const chapterPath = `../books/sea-book/chapters/${fileId}.tsx`;
                const ChapterComp = lazyComponents[chapterPath];
                return (
                  <Route
                    key={chapter.id}
                    path={chapter.id}
                    element={ChapterComp ? <ChapterComp /> : <div>فصل غير موجود</div>}
                  />
                );
              })}
            </Route>
          ))}

          {/* Farm Book (standalone SmartFarm book) */}
          {Object.values(FARM_BOOKS).map((book) => (
            <Route key={book.id} path={`/farm/${book.id}`} element={<MasterLayout />}>
              <Route
                index
                element={(() => {
                  const Intro = lazyComponents[`../books/book-03-living-farm/index.tsx`];
                  return Intro ? <Intro /> : <div>مقدمة غير موجودة</div>;
                })()}
              />
              {book.chapters.map((chapter) => {
                const fileId = chapter.id.charAt(0).toUpperCase() + chapter.id.slice(1);
                const chapterPath = `../books/book-03-living-farm/chapters/${fileId}.tsx`;
                const ChapterComp = lazyComponents[chapterPath];
                return (
                  <Route
                    key={chapter.id}
                    path={chapter.id}
                    element={ChapterComp ? <ChapterComp /> : <div>فصل غير موجود</div>}
                  />
                );
              })}
            </Route>
          ))}

          {/* 404 */}
          <Route path="*" element={
            <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 font-cairo text-center p-6">
              <div>
                <h1 className="text-6xl font-extrabold text-slate-300 dark:text-slate-600 mb-4">404</h1>
                <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">هذا الكتاب لم يُنشر بعد!</p>
                <p className="text-slate-500 dark:text-slate-400 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
                <a href="/" className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold transition-colors">
                  العودة إلى المكتبة
                </a>
              </div>
            </div>
          } />
        </Routes>
      </AnimatePresence>
    </Suspense>
    </>
  );
};

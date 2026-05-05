import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { ProgressData, ChapterProgressData } from "../types/progress";
import { makeChapterKey } from "../types/progress";

const STORAGE_KEY = "agribooks_progress";

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ProgressData;
  } catch {
    /* empty */
  }
  return { chapters: {}, lastVisited: null };
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* localStorage might be full */
  }
}

interface ProgressContextValue {
  lastVisited: ProgressData["lastVisited"];
  markVisited: (bookId: string, chapterId: string) => void;
  toggleCompleted: (bookId: string, chapterId: string) => void;
  isCompleted: (bookId: string, chapterId: string) => boolean;
  isVisited: (bookId: string, chapterId: string) => boolean;
  getCompletedCount: () => number;
  getVisitedCount: () => number;
  getChapterProgress: (bookId: string, chapterId: string) => ChapterProgressData | undefined;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    saveProgress(data);
  }, [data]);

  const markVisited = useCallback((bookId: string, chapterId: string) => {
    setData((prev) => {
      const key = makeChapterKey(bookId, chapterId);
      const existing = prev.chapters[key];
      return {
        ...prev,
        chapters: {
          ...prev.chapters,
          [key]: {
            visited: true,
            completed: existing ? existing.completed : true,
            lastVisit: Date.now(),
          },
        },
        lastVisited: { bookId, chapterId },
      };
    });
  }, []);

  const toggleCompleted = useCallback((bookId: string, chapterId: string) => {
    setData((prev) => {
      const key = makeChapterKey(bookId, chapterId);
      const existing = prev.chapters[key];
      return {
        ...prev,
        chapters: {
          ...prev.chapters,
          [key]: {
            visited: existing?.visited ?? true,
            completed: !(existing?.completed ?? false),
            lastVisit: existing?.lastVisit ?? Date.now(),
          },
        },
      };
    });
  }, []);

  const isCompleted = useCallback(
    (bookId: string, chapterId: string) => {
      return data.chapters[makeChapterKey(bookId, chapterId)]?.completed ?? false;
    },
    [data],
  );

  const isVisited = useCallback(
    (bookId: string, chapterId: string) => {
      return data.chapters[makeChapterKey(bookId, chapterId)]?.visited ?? false;
    },
    [data],
  );

  const getCompletedCount = useCallback(() => {
    return Object.values(data.chapters).filter((c) => c.completed).length;
  }, [data]);

  const getVisitedCount = useCallback(() => {
    return Object.values(data.chapters).filter((c) => c.visited).length;
  }, [data]);

  const getChapterProgress = useCallback(
    (bookId: string, chapterId: string) => {
      return data.chapters[makeChapterKey(bookId, chapterId)];
    },
    [data],
  );

  return (
    <ProgressContext.Provider
      value={{
        lastVisited: data.lastVisited,
        markVisited,
        toggleCompleted,
        isCompleted,
        isVisited,
        getCompletedCount,
        getVisitedCount,
        getChapterProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

export interface ChapterProgressData {
  visited: boolean;
  completed: boolean;
  lastVisit: number;
}

export interface ProgressData {
  chapters: Record<string, ChapterProgressData>;
  lastVisited: { bookId: string; chapterId: string } | null;
}

export function makeChapterKey(bookId: string, chapterId: string): string {
  return `${bookId}/${chapterId}`;
}

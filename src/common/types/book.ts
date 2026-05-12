export interface Chapter {
    id: string;
    title: string;
    path: string;
}

export interface Section {
    title: string;
    chapters: Chapter[];
}

export interface Book {
    id: string;
    title: string;
    path: string;
    chapters: Chapter[];
    sections?: Section[];
}

export interface LibraryEntry {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    path: string;
    icon: string;
    books: Record<string, Book>;
}

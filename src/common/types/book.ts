export interface Chapter {
    id: string; // e.g., "chapter01"
    title: string;
    path: string;
}

export interface Section {
    title: string;
    chapters: Chapter[];
}

export interface Book {
    id: string; // e.g., "book-01-nature-logic"
    title: string;
    path: string;
    chapters: Chapter[];
    sections?: Section[];
}

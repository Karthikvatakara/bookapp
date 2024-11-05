export interface Book {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
    description?: string;
    thumbnail?: string;
}
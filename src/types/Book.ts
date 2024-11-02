export interface Book {
    _id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
    description?: string;
    thumbnail?: string;
}
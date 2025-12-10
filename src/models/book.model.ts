export interface Book {
    id: number;
    title: string;
    img: number;
    category_id: number;
    form: string;
    isbn: string
    summary: string
    detail: string
    author: string
    pages: number
    contents: string;
    price: number;
    likes: number;
    pubDate: string
}

export interface BookDetail extends Book {
    categoryName: string;
    liked: boolean;
}

export interface BookReviewItem {
    id: number;
    userName: string;
    createdAt: string;
    content: string;
    score: number;
}

export type BookReviewItemWrite = Pick<BookReviewItem, "content" | "score">;
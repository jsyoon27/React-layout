import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}


export const fetchBooks = async (params:FetchBooksParams) => {
    try{
        const response = await httpClient.get<FetchBooksResponse>("/books", { 
            params: params, 
        });
        return response.data;
    } catch (error){
        return{
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};

export const fetchBook = async (bookId: string) => {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    const data = response.data as BookDetail & {
        category_name?: string;
        pub_date?: string;
    };

    return {
        ...data,
        categoryName: data.categoryName ?? data.category_name ?? "",
        pubDate: data.pubDate ?? data.pub_date ?? "",
        liked: Boolean((data as { liked?: number | boolean }).liked),
    };
};

export const likeBook = async (bookId: number) => {
    // 백엔드 라우터: POST /likes/:id
    const response = await httpClient.post(`/likes/${bookId}`);
    return response.data;
};

export const unlikeBook = async (bookId: number) => {
    // 백엔드 라우터: DELETE /likes/:id
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;
};

export const fetchBestBooks = async () => {
    const response = await httpClient.get<Book[]>("/books/best");
    return response.data;
};
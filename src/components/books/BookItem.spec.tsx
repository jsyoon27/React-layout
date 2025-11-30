import React from "react";
import { render } from "@testing-library/react";
import BooksItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";

const dummyBook = {
    id: 1,
    title: "Dummy Book",
    img: 5,
    category_id: 1,
    isbn: "Dummy ISBN",
    summary: "Dummy Summary",
    detail: "Dummy Detail",
    author: "Dummy Author",
    form: "paperback",
    pages: 100,
    contents: "Dummy Contents",
    price: 10000,
    likes: 1,
    pubDate: "2021-01-01",
};

describe("BooksItem", () => {
    it("렌더 여부", () => {
        const { getByText,getByAltText } = render(
            <BookStoreThemeProvider>
                <BooksItem book={dummyBook} />
            </BookStoreThemeProvider>
        );
        expect(getByText(dummyBook.title)).toBeInTheDocument();
        expect(getByText(dummyBook.summary)).toBeInTheDocument();
        expect(getByText(dummyBook.author)).toBeInTheDocument();
        expect(getByText("10,000원")).toBeInTheDocument();
        expect(getByText(dummyBook.likes)).toBeInTheDocument();
        expect(getByAltText(dummyBook.title)).toHaveAttribute
        ("src",`https://picsum.photos/id/${dummyBook.img}/600/600`);
    
    })
});
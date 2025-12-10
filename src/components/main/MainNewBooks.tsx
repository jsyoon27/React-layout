import { Book } from "@/models/book.model";
import styled from "styled-components";
import BooksItem from "../books/BookItem";

interface Props {
    books: Book[];
}

function MainNewBooks({books}: Props) {
  return (
    <MainNewBooksStyle>
        {
            books.map((book)=>(
                <BooksItem key={book.id} book={book} view="grid"/>
            ))
        }
    </MainNewBooksStyle>
  );
}

const MainNewBooksStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media screen and ${({theme})=> theme.mediaQuery.mobile} {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default MainNewBooks;
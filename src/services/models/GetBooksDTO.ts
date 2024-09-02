import { Book } from "./Book";

export interface GetBooksDTO {
    totalPageNumber: number;
    books: Book[];
}


import db  from './connect'
import BookModel  from './books'
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from './dbUtils';

export default {
    db,
    BookModel,
    books: {
        getBookById,
        getAllBooks,
        createBook,
        updateBook,
        deleteBook
    }
};

// const booksData = require('./data')
import db from '../db/'

const query = {
    books: async ({limit}: { limit: number }, context: any) => {
        // return limit ? booksData.slice(0, limit) : booksData;
        return await db.books.getAllBooks(limit)
    },
    book: async ({id}: { id: string }, context: any) => {
        // return booksData.find(book => book.id === id);
        return await db.books.getBookById(id)
    }
};

export default query
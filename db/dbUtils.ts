import BookModel from './books';

export const getAllBooks = async (limit: number) => {
    return await BookModel.find({}).limit(limit);
}

export const getBookById = async (id: string) => {
    return await BookModel.findById(id);
}

export const createBook = async ({ title, description, author }: { title: string, description: string, author: string }) => {
    return await BookModel.create({ title, description, author });
}

export const updateBook = async (id: string, { title, description, author }: { title: string, description: string, author: string }) => {
    const update: { title?: string, description?: string, author?: string } = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (author) update.author = author;
    return await BookModel.findByIdAndUpdate(id, update);
}

export const deleteBook = async (id: string) => {
    return await BookModel.findByIdAndDelete(id);
}

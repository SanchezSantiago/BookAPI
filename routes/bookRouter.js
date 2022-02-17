const express = require('express');
const booksController = require('../controllers/bookController');
const {bookRequeriments} = require('../Validate_schema/schemaRequeriments');
const validator = require('express-joi-validation').createValidator();



const routes = (Book) => {
    const bookRouter = express.Router();

    const {
        getBooks,
        postBooks,
        getBookById,
        putBooks,
        deleteBooks,
        getBookByName,
        getBookByAuthor
    } = booksController(Book);

    bookRouter.route('/books')
        .get(getBooks)
        .post(validator.body(bookRequeriments), postBooks)

    bookRouter.route('/books/searchByName')
        .get(getBookByName)

    bookRouter.route('/books/searchByAuthor')
        .get(getBookByAuthor)

    bookRouter.route('/books/:bookId')
        .get(getBookById)
        .put(putBooks)
        .delete(deleteBooks)



    return bookRouter;
}


module.exports = routes;
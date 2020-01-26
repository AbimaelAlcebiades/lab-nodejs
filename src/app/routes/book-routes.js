
const BookController = require("../controllers/book-controller");
const bookController = new BookController();
const bookRoutes = BookController.routes();
const BookModel = require("../models/book-model");
const bookModel = new BookModel();

module.exports = (app) => {

    app.route(bookRoutes.books)
        .get(bookController.list())
        .post(bookModel.validacoes(), bookController.save())
        .put(bookController.update());

    app.get(bookRoutes.bookForm, bookController.form());

    app.get(bookRoutes.bookFormEdit, bookController.edit());

    app.delete(bookRoutes.booksDelete, bookController.delete());
};
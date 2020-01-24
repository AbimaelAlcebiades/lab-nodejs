const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator');
const BookController = require("../controllers/book-controller");
const BaseController = require("../controllers/base-controller");
const bookController = new BookController();
const baseController = new BaseController();
const bookRoutes = BookController.routes();

module.exports = (app) => {
    app.get('/', baseController.home());

    app.get(bookRoutes.books, bookController.list());

    app.get(bookRoutes.bookForm, bookController.form());

    app.get('/livros/form/:id', bookController.edit());

    app.post(bookRoutes.books, [
        check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no minímo 5 caractéres"),
        check('preco').isCurrency().withMessage("Valor de moeda inválido")
    ], bookController.save());

    app.put(bookRoutes.books, bookController.update());

    app.delete('/livros/:id', bookController.delete());
};
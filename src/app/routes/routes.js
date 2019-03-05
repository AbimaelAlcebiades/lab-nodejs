const db = require('../../config/database');
const BookDao = require('../infra/book-dao');

const bookDao = new BookDao(db);

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.marko(
            require('../views/home/home.marko')
        )
    });

    app.get('/books', function (req, res) {

        bookDao.list()
            .then(books => res.marko(
                require('../views/books/list/list.marko'),
                {
                    books: books
                }
            )).catch(error => console.log(error));

        bookDao.list(function (error, results) {
            res.marko(
                require('../views/books/list/list.marko'),
                {
                    books: results
                }
            );
        });
    });

    app.get('/books', function (req, res) {

        bookDao.list()
            .then(books => res.marko(
                require('../views/books/list/list.marko'),
                {
                    books: books
                }
            )).catch(error => console.log(error));

        bookDao.list(function (error, results) {
            res.marko(
                require('../views/books/list/list.marko'),
                {
                    books: results
                }
            );
        });
    });

    app.get('/books/form', function (req, res) {
        res.marko(
            require('../views/books/form/form.marko')
        );
    });

    app.post('/books', function (req, res) {
        bookDao.add(req.body)
            .then(res.redirect('/books'))
            .catch(error => console.log(error));
    });
}



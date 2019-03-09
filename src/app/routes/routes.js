const db = require('../../config/database');
const BookDao = require('../infra/book-dao');

const bookDao = new BookDao(db);

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.marko(
            require('../views/home/home.marko')
        );
    });

    app.get('/books', function (req, res) {

        bookDao.list()
            .then(books => res.marko(
                require('../views/books/list/list.marko'),
                {
                    books: books
                }
            )).catch(error => console.log(error));

        /*bookDao.list(function (error, results) {
            res.marko(
                require('../views/books/list/list.marko'),
                {
                    books: results
                }
            );
        });*/
    });

    app.post('/books', function (req, res) {
        bookDao.add(req.body)
            .then(res.redirect('/books'))
            .catch(error => console.log(error));
    });

    app.put('/books', function (req, res) {
        bookDao.update(req.body)
            .then(res.redirect('/books'))
            .catch(error => console.log(error));
    });

    app.delete('/books/:id', function (req, res) {
        const id = req.params.id;
        bookDao.remove(id)
            .then(() => { res.status(200).end() })
            .catch(error => { console.log(error) });
    });

    app.get('/books/form', function (req, res) {
        res.marko(
            require('../views/books/form/form.marko'),
            { book: {} }
        );
    });

    app.get('/books/form/:id', function (req, res) {
        const { id } = req.params; // Aprendendo a usar o destructuring assignment ou object destructuring (ES6).
            bookDao.getById(id)
                .then(book => {
                    res.marko(
                        require('../views/books/form/form.marko'),
                        {
                            book: book
                        }
                    );
                }).catch(error => {
                    console.log(error);
                });
    });

    app.put('/books/form/:id', function (req, res) {
        const { id } = req.params; // Aprendendo a usar o destructuring assignment ou object destructuring (ES6).
            bookDao.update(id)
                .then(book => {
                    res.marko(
                        require('../views/books/form/form.marko'),
                        {
                            book: book
                        }
                    );
                }).catch(error => {
                    console.log(error);
                });
    });
}



const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    app.get('/', (req, resp) => {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });

    app.get('/livros', (req, resp) => {

        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', (req, resp) => {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', (req, resp) => {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    });

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no minímo 5 caractéres"),
        check('preco').isCurrency().withMessage("Valor de moeda inválido")
    ], (req, resp) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(422).marko(
                require('../views/livros/form/form.marko'),
                {
                    errors: errors.array(),
                    livro: req.body
                }
            );
        }

        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(() => {
                return resp.redirect('/livros')
            }).catch((erro) => {
                console.log(erro);
            });
    });

    app.put('/livros', (req, resp) => {
        console.log(req.body);
        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, resp) => {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
};
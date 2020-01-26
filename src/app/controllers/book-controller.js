const LivroDao = require("../infra/livro-dao");
const { validationResult } = require("express-validator");
const db = require("../../config/database");
const templates = require("../views/templates");

class BookController {

    static routes() {
        return {
            books: "/livros",
            booksDelete: "/livros/:id",
            bookForm: "/livros/form",
            bookFormEdit: "/livros/form/:id"
        }
    }

    list() {
        return (req, resp) => {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => resp.marko(
                    templates.books.list,
                    {
                        livros: livros
                    }
                ))
                .catch((erro) => {
                    console.log(erro)
                });
        }
    }

    form() {
        return (req, resp) => {
            resp.marko(
                templates.books.form,
                {
                    livro: {
                        titulo: "",
                        preco: ""
                    }
                }
            );
        }
    }

    edit() {
        return (req, resp) => {
            const id = req.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro =>
                    resp.marko(
                        templates.books.form,
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
        }
    }

    save() {
        return (req, resp) => {
            console.log('uhaushdaushd');
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resp.status(422).marko(
                    templates.books.form,
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
        }
    }

    update() {
        return (req, resp) => {
            const livroDao = new LivroDao(db);

            livroDao.atualiza(req.body)
                .then(() => {
                    resp.redirect('/livros')
                }).catch((erro) => {
                    console.log(erro)
                });
        }
    }

    delete() {
        return (req, resp) => {
            const id = req.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = BookController;
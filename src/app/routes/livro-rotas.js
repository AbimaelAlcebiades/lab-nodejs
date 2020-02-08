const LivroControlador = require('../controllers/livro-controlador');
const BaseControlador = require("../controllers/base-controlador");
const Livro = require('../models/livro');

const livroControlador = new LivroControlador();


module.exports = (app) => {
    const rotasLivro = LivroControlador.rotas();

    app.use(rotasLivro.autenticadas, function(req, resp, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            resp.redirect(BaseControlador.rotas().login);
        }
    });
    
    app.get(rotasLivro.lista, livroControlador.lista());

    app.route(rotasLivro.cadastro)
        .get(livroControlador.formularioCadastro())
        .post(Livro.validacoes(), livroControlador.cadastra())
        .put(livroControlador.edita());

    app.get(rotasLivro.edicao, livroControlador.formularioEdicao());

    app.delete(rotasLivro.delecao, livroControlador.remove());
};
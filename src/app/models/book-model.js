const { check } = require('express-validator');

class BookModel {
    validacoes() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no minímo 5 caractéres"),
            check('preco').isCurrency().withMessage("Valor de moeda inválido")
        ];
    }
}

module.exports = BookModel;
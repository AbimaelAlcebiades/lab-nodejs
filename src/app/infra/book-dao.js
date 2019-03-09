class BookDao {

    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (error, results) => {
                    if (error) {
                        return reject('Não foi possível listar os livros');
                    }
                    return resolve(results);
                }
            )
        });
    }

    getById(bookId) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT 
                    * 
                FROM 
                    livros 
                WHERE 
                    id = ?`,
                [bookId],
                (error, results) => {
                    if (error) {
                        return reject('Não foi possível listar os livros');
                    }
                    return resolve(results);
                }
            )
        });
    }

    add(book) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO
                    livros(titulo, preco, descricao)
                VALUES
                    (?, ?, ?)`,
                [book.titulo, book.preco, book.descricao],
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                }
            )
        });
    }

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE 
                    livros
                SET 
                    (titulo, preco, descricao) = (?, ?, ?)
                WHERE
                    id = ?`,
                [book.titulo, book.preco, book.descricao, book.id],
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Não foi possível atualizar o livro!');
                    }
                    resolve();
                }
            )
        });
    }

    remove(bookId) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `DELETE FROM
                    livros
                WHERE
                    id = ?`,
                [bookId],
                (error) => {
                    if (error) {
                        console.log(error);
                        return reject('Não foi possível remover o livro!');
                    }
                    resolve();
                }
            )
        });
    }
}

module.exports = BookDao;
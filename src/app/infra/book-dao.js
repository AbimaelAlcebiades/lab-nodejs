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

    add(book) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO
                    livros(titulo, preco, descricao)
                VALUES
                    (?, ?, ?)`,
                [book.titulo, book.preco, book.descricao],
                (error) => {
                    if(error){
                        console.log(error);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                }
            )
        });
    }
}

module.exports = BookDao;
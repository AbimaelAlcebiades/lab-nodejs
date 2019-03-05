module.exports = (app) => {
    app.get('/', function(req, res){
        res.send('Home');
    });
    
    app.get('/books', function(req, res){
        res.marko(
            require('../views/books/list/list.marko'),
            {
                books: [
                    {
                        id: 1,
                        title: 'título 1'
                    },
                    {
                        id: 2,
                        title: 'título 2'
                    }
                ]
            }
        );
    });
}



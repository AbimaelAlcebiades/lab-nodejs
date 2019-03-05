module.exports = (app) => {
    app.get('/', function(req, res){
        res.end('raiz');
    });
    
    app.get('/outra', function(req, res){
        res.end('outra URL');
    });
}



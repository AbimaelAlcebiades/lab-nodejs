const app = require('./src/config/custom-express');

app.listen(3000, function(){
    console.log('Servidor rodando');
});

app.get('/', function(req, res){
    res.end(
        'Página'
    )
});
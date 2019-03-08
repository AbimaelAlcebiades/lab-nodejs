const app = require('./src/config/custom-express');
const hostName = "localhost";
const port = 3000;

app.listen(port, hostName,  function(){
    console.log(`Servidor rodando em http://${hostName}:${port}`);
});

app.get('/', function(req, res){
    res.end(
        'Página'
    );
});

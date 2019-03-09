const routes = require('../app/routes/routes.js');
const express = require('express');
require('marko/node-require').install();
require('marko/express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(
    '/static',
    express.static('src/app/public')
);

app.use(
    '*',
    bodyParser.urlencoded({ extended: true })
);

app.use(
    methodOverride((req, res) => {
        if(req.body && typeof req.body === 'object' && '_method' in req.body){
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);
routes(app);

module.exports = app;
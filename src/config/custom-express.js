const routes = require('../app/routes/routes.js');
const express = require('express');
require('marko/node-require').install();
require('marko/express');
const bodyParser = require('body-parser');

const app = express();

app.use(
    '/static',
    express.static('src/app/public')
);

app.use(
    '*',
    bodyParser.urlencoded({ extended: true })
);

routes(app);

module.exports = app;
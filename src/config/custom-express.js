const routes = require('../app/routes/routes.js');
const express = require('express');
require('marko/node-require').install();
require('marko/express');

const app = express();
routes(app);

module.exports = app;
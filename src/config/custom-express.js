const routes = require('../app/routes/routes.js');
const express = require('express');

const app = express();
routes(app);

module.exports = app;
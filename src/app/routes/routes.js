const bookRoutes = require("./book-routes");
const baseRoutes = require("./base-routes");

module.exports = (app) => {
    baseRoutes(app);
    bookRoutes(app);
};
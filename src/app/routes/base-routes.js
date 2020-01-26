
const BaseController = require("../controllers/base-controller");
const baseController = new BaseController();
const baseRoutes = BaseController.routes();

module.exports = (app) => {
    app.get(baseRoutes.home, baseController.home());
};
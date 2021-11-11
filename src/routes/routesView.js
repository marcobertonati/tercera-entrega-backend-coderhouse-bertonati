/*Requiero controladores de productos */
const ProductService = require("../services/productService");
const product = new ProductService();

/*Controladores de Auth */
const { checkAuthentication } = require("../auth/checkAuth");

/*Controladores de Productos */
const productController = require("../controller/product");

/*Controladores de Mensajes de chat */
const chatController = require("../controller/messagesChat");

module.exports = (router) => {
  router
    .get("/", checkAuthentication, (req, res, next) => {
      res.render("./pages/login");
    })
    .get("/productos/vista", checkAuthentication, productController.findAll)

    .get("/productos/agregar", (req, res, next) => {
      res.render("./pages/agregar");
    })

    .get("/chat-view", checkAuthentication, chatController.getAllMsgChat)

    .get("/login", (req, res, next) => {
      res.render("./pages/login");
    })

    .get("/signup", (req, res, next) => {
      res.render("./pages/signup");
    })

    .get("/welcome", checkAuthentication, (req, res, next) => {
      const data = req.session.passport;
      res.render("./pages/welcome", { data });
    })
    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    })

    .get("/error-login", (req, res, next) => {
      res.render("./pages/error-login");
    })
    .get("/error-signup", (req, res, next) => {
      res.render("./pages/error-signup");
    });
  return router;
};

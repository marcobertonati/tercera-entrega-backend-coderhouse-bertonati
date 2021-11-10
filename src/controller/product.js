const ProductService = require("../services/productService");
const product = new ProductService();

// const log4js = require("../logger/log4js");
// const loggerError = log4js.getLogger("myError");
// const loggerWarn = log4js.getLogger("myWarn");
// const loggerDefault = log4js.getLogger();
// const loggerTrace = log4js.getLogger("myTrace");

const {
  loggerWarn,
  loggerTrace,
  loggerDefault,
  loggerError,
} = require("../logger/log4js");

exports.createProduct = async (req, res, next) => {
  loggerTrace.trace("Ingresó a createProduct");

  /*Si el usuario se olvidó de agregar un stock aparecerá un WARN y se le dirá que se le puso stock 0 para evitar que se vendan productos, pero si que se visutalicen */

  if (req.body.stock === "") {
    loggerWarn.warn(
      `El usuario ingresó ${req.body.stock} como valor de stock. Se seteará en 0.`
    );

    req.body.stock = 0;
  }

  /*Agrego la hora en que se agregó el producto */
  const timestamp = new Date().toLocaleString();
  req.body.timestamp = timestamp;

  /*Chequeo el producto que agregamos */
  loggerDefault.info(req.body);

  try {
    loggerTrace.trace("Ingresó al try");
    const productCreated = await product.createProduct(req.body);
    res.json({ msg: "Product Created!", product: productCreated });
    // res.render('./pages/agregar')
    // res.redirect('/productos/agregar');
  } catch (error) {
    loggerTrace.trace("Ingresó al catch");
    loggerError.error(error);
    res.json(error);
  }
};

exports.findAll = async (req, res, next) => {
  loggerTrace.trace("Ingresó a findAll");
  try {
    const products = await product.getAllProducts();
    // loggerDefault.info(products);
    res.render("./pages/lista", {products});
    // res.json(allProducts);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.getOne = async (req, res, next) => {
  loggerTrace.trace("Ingresó a getOne");

  try {
    const id = req.params.id;
    loggerDefault.info(`El id ingresado es ${id}`);
    const productRetrieved = await product.getProduct(id);
    res.json(productRetrieved);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  loggerTrace.trace("Ingresó a updateProduct");

  try {
    const body = req.body;
    const id = req.params.id;
    const updateProduct = await product.updateProduct(id, body);
    loggerDefault.info(
      "El producto actualizado quedó de la siguiente manera: " + updateProduct
    );
    res.json(updateProduct);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  loggerTrace.trace("Ingresó a deleteOne");

  try {
    const id = req.params.id;
    loggerDefault.info(`El id ingresado es ${id}`);
    await product.deleteProduct(id);
    res.json({ msg: "Product deleted!" });
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.getByName = async (req, res, next) => {
  loggerTrace.trace("Ingreso a getOneByName");

  try {
    const title = req.params.title;
    loggerDefault.info(`El nombre del producto ingresado es ${title}`);

    const productsRetrieved = await product.getProductByTitle(title);
    res.json(productsRetrieved);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.getByCode = async (req, res, next) => {
  loggerTrace.trace("Ingreso a getOneByCode");

  try {
    const code = req.params.code;
    loggerDefault.info(`El codigo del producto ingresado es ${code}`);

    const productsRetrieved = await product.getProductByCode(code);
    res.json(productsRetrieved);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.getByPrice = async (req, res, next) => {
  loggerTrace.trace("Ingreso a getOneByPrice");

  try {
    const pricemin = parseInt(req.query.pricemin);
    const pricemax = parseInt(req.query.pricemax);
    loggerDefault.info(
      `El usuario quiere productos entre precio: ${pricemin} y ${pricemax}`
    );

    const productsRetrieved = await product.getProductByPrice(
      pricemin,
      pricemax
    );
    res.json(productsRetrieved);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

exports.getByStock = async (req, res, next) => {
  loggerTrace.trace("Ingreso a getOneByStock");

  try {
    const stockmin = parseInt(req.query.stockmin);
    const stockmax = parseInt(req.query.stockmax);
    loggerDefault.info(
      `El usuario quiere productos entre stock: ${stockmin} y ${stockmax}`
    );
    const productsRetrieved = await product.getProductByStock(
      stockmin,
      stockmax
    );
    res.json(productsRetrieved);
  } catch (error) {
    loggerError.error(error);
    res.json(error);
  }
};

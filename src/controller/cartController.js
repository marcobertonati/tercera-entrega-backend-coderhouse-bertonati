const CartService = require('../services/cartService');
const cart = new CartService();

exports.createCart = async (req,res,next) => {
    console.log('Entró a cartController => createCart');
    try {
        const cartBody = req.body;
        const cartCreated = await cart.createCart(cartBody);
        res.json(cartCreated)
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.getProductOnCart = async (req,res,next) => {
    console.log('Entró a cartController => getProductOnCart');
    try {
        const idCart = req.query.idCart;
        const idProduct = req.query.idProduct;
        const productsOnCart = await cart.getProductOnCart(idCart);
        if (idProduct) {
            const productFinded = productsOnCart.product.find(product=> product.code == idProduct);
            res.json(productFinded);
        } else {
            res.json(productsOnCart);
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.deleteProductOnCart = async (req,res,next) => {
    console.log('Entró a cartController => deleteProductOnCart');
    try {
        const idCartQuery = req.query.idCart;
        const idProductQuery = req.query.idProduct;
        const productToBeDeletedOnCart = {idCart: idCartQuery, idProduct: idProductQuery};
        const productsOnCart = await cart.deleteProductOnCart(productToBeDeletedOnCart);
        res.json(productsOnCart)
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.getAllCarts = async (req,res,next) => {
    try {
        const carts = await cart.getAllCarts();
        res.json(carts)
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}
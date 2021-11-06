/*Requiero controladores de productos */
const cartController = require('../controller/cartController');

module.exports = (router) => {

    router
        .get('/api/cart/', cartController.getAllCarts)
        .post('/api/cart/create', cartController.createCart)
        .get('/api/cart/search', cartController.getProductOnCart)
        .delete('/api/cart/delete/search', cartController.deleteProductOnCart)
    return router   
}
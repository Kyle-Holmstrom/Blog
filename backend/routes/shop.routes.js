const express = require('express');
const shopRouter = express.Router();

const {
    getAllProducts,
    findOneProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/shopController');

shopRouter.get('/shop', getAllProducts);
shopRouter.get('/shop/:id', findOneProductById);
shopRouter.post('/shop/add', addProduct);
shopRouter.post('/shop-update/:id', updateProduct);
shopRouter.delete('/:id', deleteProduct);

module.exports = shopRouter;
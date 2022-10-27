const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: false },
    mensProduct: { type: String, required: true },
    womensProduct: { type: String, required: true }
});

module.exports = mongoose.model('Shop', ShopSchema);
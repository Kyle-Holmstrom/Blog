const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    fileUpload: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: false },
    mensProduct: { type: Boolean, required: true },
    womensProduct: { type: Boolean, required: true }
});

module.exports = mongoose.model('Shop', ShopSchema);
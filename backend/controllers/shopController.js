const dbo = require('../database/db');
const Shop = require('../models/Shop');
// This will help convert the id from string to ObjectId for the _id
const ObjectId = require('mongodb').ObjectId;

// Get all products
async function getAllProducts(req, res) {
    let db_connect = dbo.getDb('Blog');
    db_connect
        .collection('shop')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
};

// Get a single product by id
async function findOneProductById(req, res) {
    let db_connect = dbo.getDb('Blog');
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection('shop')
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
};

// Add a product to the shop
async function addProduct(req, response) {
    let db_connect = dbo.getDb('Blog');
    
    let newShopItem = new Shop({
        fileUpload: req.body.fileUpload,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
        mensProduct: req.body.mensProduct,
        womensProduct: req.body.womensProduct,
    });

    db_connect.collection('shop').insertOne(newShopItem, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
};

// Update a product by id
async function updateProduct(req, response) {
    let db_connect = dbo.getDb('Blog');
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            fileUpload: req.body.fileUpload,
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            inStock: req.body.inStock,
            mensProduct: req.body.mensProduct,
            womensProduct: req.body.womensProduct,
        },
    };
    db_connect
        .collection('shop')
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log('1 document updated');
            response.json(res);
        });
};

// Delete a product by id
async function deleteProduct(req, response) {
    let db_connect = dbo.getDb('Blog');
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection('shop')
        .deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log('1 document deleted');
            response.json(obj);
        });
};

module.exports = {
    getAllProducts,
    findOneProductById,
    addProduct,
    updateProduct,
    deleteProduct
}
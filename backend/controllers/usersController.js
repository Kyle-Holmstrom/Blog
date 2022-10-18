const dbo = require('../database/db');
const User = require('../models/User');
// This will help convert the id from string to ObjectId for the _id
const ObjectId = require('mongodb').ObjectId;

// Get all users
async function getAllUsers(req, res) {
    let db_connect = dbo.getDb("Blog");
    db_connect
        .collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
};

// Get user by id
async function findOneUserById(req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection('users')
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
};

// Create a new user
async function addUser(req, response) {
    let db_connect = dbo.getDb();
    /**
     * Try to get the new User() to work when coding the frontend
     * this is the schema and will reinforce properties...
     */
    
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        avatar: req.body.avatar,
        isAdmin: req.body.isAdmin,
    });

    // let newUser = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     userName: req.body.userName,
    //     password: req.body.password,
    //     avatar: req.body.avatar,
    //     isAdmin: req.body.isAdmin,
    // };
    db_connect.collection('users').insertOne(newUser, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
};

// Update a user by id
async function updateUser(req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            isAdmin: req.body.avatar,
        },
    };
    db_connect
        .collection('users')
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log('1 document updated');
            response.json(res);
        });
};

// Delete a user by id
async function deleteUser(req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection('users')
        .deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log('1 document deleted');
            response.json(obj);
        });
};

module.exports = {
    getAllUsers,
    findOneUserById,
    addUser,
    updateUser,
    deleteUser
}
const dbo = require('../database/db');
const BlogPost = require('../models/Blog');
// This will help convert the id from string to ObjectId for the _id
const ObjectId = require('mongodb').ObjectId;

// Get all blog posts
async function getAllBlogPost(req, res) {
    let db_connect = dbo.getDb('Blog');
    db_connect
        .collection('posts')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
};

// Get a single blog post by id
async function findOneBlogPostById(req, res) {
    let db_connect = dbo.getDb('Blog');
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection('posts')
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
};

// Create a new blog post
async function addBlogPost(req, response) {
    let db_connect = dbo.getDb('Blog');
    
    let newBlogPost = new BlogPost({
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments,
        fileUpload: req.body.fileUpload,
        upvote: req.body.upvote,
        creator: req.body.creator,
        createdAt: req.body.createdAt,
    });

    db_connect.collection('posts').insertOne(newBlogPost, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
};

// Update blog post by id
async function updateBlogPost(req, response) {
    let db_connect = dbo.getDb('Blog');
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            title: req.body.title,
            description: req.body.description,
            comments: req.body.comments,
            fileUpload: req.body.fileUpload,
            upvote: req.body.upvote,
            creator: req.body.creator,
            createdAt: req.body.createdAt,
        },
    };
    db_connect
        .collection('posts')
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log('1 document updated');
            response.json(res);
        });
};

// Delete a blog post by id
async function deleteBlogPost(req, response) {
    let db_connect = dbo.getDb('Blog');
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection('posts')
        .deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log('1 document deleted');
            response.json(obj);
        });
};

// Create a comment on a blog post
async function createBlogComment() {
    return 0;
}

module.exports = {
    getAllBlogPost,
    findOneBlogPostById,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    createBlogComment
}
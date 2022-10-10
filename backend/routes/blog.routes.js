const express = require('express');
const blogRouter = express.Router();

// Load User model
const blogPost = require('../models/BlogPost');

// Get all users
blogRouter.get('/', (req, res) => {
    blogPost.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nousersfound: 'No blog post found' }));
});

// Get single user by id
blogRouter.get('/:id', (req, res) => {
    blogPost.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nouserfound: 'No blog post found.' }));
});

// Add/Save user
blogRouter.post('/', (req, res) => {
    blogPost.create(req.body)
        .then(user => res.json({ msg: 'Blog post added successfully'}))
        .catch(err => res.status(404).json({ error: 'Unable to add blog post.' }));
});

// Update a user
blogRouter.put('/:id', (req, res) => {
    blogPost.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({ msg: 'Successfully updated!.'}))
        .catch(err => res.status(404).json({ error: 'Unable to update the Database for blog post.'}));
});

// Delete a user
blogRouter.delete('/:id', (req, res) => {
    blogPost.findByIdAndRemove(req.params.id)
        .then(user => res.json({ msg: 'Successfully deleted blog post.'}))
        .catch(err => res.status(404).json({ error: 'Unable to delete blog post from database.'}));
});

module.exports = blogRouter;
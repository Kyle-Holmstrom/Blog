const express = require('express');
const blogRouter = express.Router();

const {
    getAllBlogPost,
    findOneBlogPostById,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    createBlogComment
} = require('../controllers/usersController');

blogRouter.get('/blog', getAllBlogPost);
blogRouter.get('/blog/:id', findOneBlogPostById);
blogRouter.post('/blog/add', addBlogPost);
blogRouter.post('/blog/:id', updateBlogPost);
blogRouter.delete('/:id', deleteBlogPost);
blogRouter.post('/blog/create-comment', createBlogComment);

module.exports = blogRouter;
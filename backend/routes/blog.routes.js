const express = require('express');
const blogRouter = express.Router();

const {
    getAllBlogPost,
    findOneBlogPostById,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    createComment
} = require('../controllers/blogController');

blogRouter.get('/', getAllBlogPost);
blogRouter.get('/blog/:id', findOneBlogPostById);
blogRouter.post('/blog/add', addBlogPost);
blogRouter.post('/blog-update/:id', updateBlogPost);
blogRouter.delete('/:id', deleteBlogPost);
blogRouter.post('/blog/add-comment', createComment);

module.exports = blogRouter;
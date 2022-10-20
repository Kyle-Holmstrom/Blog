const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: String, required: true },
    fileUpload: { type: String, required: false },
    upvote: { type: Number, required: false, default: 0 },
    creator: { type: String, required: true },
    createdAt: { type: Date, default: new Date(), required: true }
});

module.exports = mongoose.model('BlogPost', BlogSchema);
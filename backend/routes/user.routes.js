const express = require('express');
const userRouter = express.Router();

// Load User model
const User = require('../models/User');

// test routing for users.
userRouter.get('/test', (req, res) => {
    res.send('user route testing!.');
});

userRouter.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

module.exports = userRouter;
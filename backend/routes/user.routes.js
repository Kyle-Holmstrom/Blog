const express = require('express');
const userRouter = express.Router();

// Load User model
const User = require('../models/User');

// Test routing for users.
userRouter.get('/test', (req, res) => {
    res.send('user route testing!.');
});

// Get all users
userRouter.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

// Get single user by id
userRouter.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nouserfound: 'No user found.' }));
});

// Add/Save user
userRouter.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json({ msg: 'User added successfully'}))
        .catch(err => res.status(404).json({ error: 'Unable to add user.' }));
});

// Update a user
userRouter.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({ msg: 'Successfully updated!.'}))
        .catch(err => res.status(404).json({ error: 'Unable to update the Database.'}));
});

// Delete a user
userRouter.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => res.json({ msg: 'Successfully deleted user.'}))
        .catch(err => res.status(404).json({ error: 'Unable to delete user from database.'}));
});

module.exports = userRouter;
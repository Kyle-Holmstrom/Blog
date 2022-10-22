const express = require('express');
const userRouter = express.Router();

const {
    getAllUsers,
    findOneUserById,
    addUser,
    updateUser,
    deleteUser,
    countDocumentsInCollection
} = require('../controllers/usersController');

userRouter.get('/users', getAllUsers);
userRouter.get('/user/:id', findOneUserById);
userRouter.get('/user-count', countDocumentsInCollection);
userRouter.post('/user/add', addUser);
userRouter.post('/user-update/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
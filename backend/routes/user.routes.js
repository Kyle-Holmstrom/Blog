const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUser
} = require('../controllers/usersController');

router.get('/user', getAllUsers);
router.put('/user/:id', updateUser);


module.exports = router;
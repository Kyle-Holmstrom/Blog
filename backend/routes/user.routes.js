const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    findOneUserByName,
    updateUser,
    upsertUser,
    deleteUser
} = require('../controllers/usersController');

router.get('/', getAllUsers);
router.get('/find-user/:id', findOneUserByName);
router.put('/update-user/:id', updateUser);
router.post('create-user/:id', upsertUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
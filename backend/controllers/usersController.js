const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { findById } = require('../models/User');

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users) {
        return res.status(400).json({ message: 'No users found.'});
    }
    res.json(users);
});

// create new user
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    // confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ messages: 'All fields are required'});
    }

    // Check for duplicate data
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'duplicate username'});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = { username, "password": hashedPwd, roles};

    // Create and store new user
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created`});
    } else {
        res.status(400).json({ message: 'Invalid user data.'});
    }
});

// update a user
const updateUser = asyncHandler(async (req, res) => {
    const { id, firstName, lastName, username, password, admin } = req.body;

    // confirm data
    if (!id || !firstName || !lastName || !username || !password || !admin) {
        return res.status(400).json({ message: 'All field are required.'});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found'});
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();

    // Allow updates to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username'});
    }

    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.admin = admin;

    if (password) {
        //Hash the password
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated`});

});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID Required.'});
    }

    const user = findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'user not found'});
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result_id} deleted`;

    res.json(reply);
    
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
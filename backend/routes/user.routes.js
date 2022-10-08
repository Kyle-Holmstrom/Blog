const express = require('express');
const app = express();

const userRoute = express.Router();
let User = require('../models/user');

// Get all Users

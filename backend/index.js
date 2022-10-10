const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');

const app = express();

connectDB();

app.get('/blog', (req, res) => {
    res.send('Sent from home route...');
});

// User routing

app.get('/user', userRouter, (req, res) => {});

app.get('/user/:id', userRouter, (req, res) => {});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
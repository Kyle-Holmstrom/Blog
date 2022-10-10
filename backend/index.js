const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connectDB();

app.get('/', (req, res) => {
    res.status('Sent from home route...');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
const express = require('express');
const db = require('./database/db');
const router = require('./routes/user.routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/blog', (req, res) => {
    res.send('Sent from home route...');
});

// User routing
app.use('/api/all-user', router);
app.use('/api/user/:id', router)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
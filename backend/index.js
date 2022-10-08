const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.send('Express Sever is working..');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
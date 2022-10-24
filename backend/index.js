const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// require in the different routes from the routing folder
app.use(require('./routes/user.routes'));
app.use(require('./routes/blog.routes'));
app.use(require('./routes/shop.routes'));

// get driver connection
const dbo = require("./database/db");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
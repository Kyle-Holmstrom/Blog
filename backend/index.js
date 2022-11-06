const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//log out a user by creating button that calls localStorage.removeItem('token')

// middleware to verify token
function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']?.split('')[1];

  if (token) {
    jwt.verify(token, process.env.PASSPORT_SECRET, (err, decoded) => {
      if (err) return res.json({
        isLoggedIn: false,
        message: 'Failed To Authenticate'
      });
      req.user = {};
      req.user.id = decoded.id;
      req.user.userName = decoded.userName;
      next();
    });
  } else {
    res.json({
      message: 'Incorrect Token Given', isLoggedIn: false
    });
  }
}

// handle register auth
app.post('/register', async (req, res) => {
  const user = reg.body;

  //check if username or email has been taken by another user already
  const takenUsername = await User.findOne({userName: user.userName});
  const takenEmail = await User.findOne({email: user.email});

  if (takenUsername || takenEmail) {
    res.json({message: 'Username or email has already been taken'});
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: user.firstName.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
      email: user.email.toLowerCase(),
      userName: user.userName.toLowerCase(),
      password: user.password
    });
    newUser.save();
  }
});

// handle login auth
app.post('/login', (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({userName: userLoggingIn.userName})
  .then(newUser => {
    if (!newUser) {
      return res.json({
        message: 'Invalid Username or Password'
      });
    }
    bcrypt.compare(userLoggingIn.password, newUser.password)
    .then(isCorrect => {
      if (isCorrect) {
        const payload = {
          id: newUser._id,
          userName: newUser.userName,
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn: 86000},
          (err, token) => {
            if (err) throw err;
            return res.json({
              message: 'Success',
              token: 'Bearer ' + token
            });
          }
        )
      } else {
        return res.json({
          message: 'Invalid Username or Password'
        });
      }
    });
  });
});

// Access the current user
app.get('/getUsername', verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, userName: req.user.userName})
});

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
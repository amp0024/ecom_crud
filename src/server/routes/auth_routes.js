var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');

var cart = require('../db/shopping_cart_queries.js');

function ensureAuthenticated(req, res, next) {
  // check if user is authenticated
  if(req.user) {
    // if so -> call next()
    return next();
  } else {
    // if not -> redirect to login
    return res.redirect('/login');
  }
}
function loginRedirect(req, res, next) {
  // check if user is authenticated
  if(req.user) {
    // if so -> redirect to main route
    return res.redirect('/');
  } else {
    // if not -> call next()
    return next();
  }
}
function hashing (password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
  // Needs promises otherwise it will not wait to return the newPassword which
  // will make it undefined
  // var newPassword = '';
  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash(password, salt, function(err, hash) {
  //       newPassword = hash;
  //   });
  // });
  // return newPassword;
}
function comparePassword(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}
// Create username and Password Account
router.post('/register', function(req, res, next) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  // check if username is unique
  knex('users').where('username', username)
    .then(function(data){
      // if username is in the database send an error
      if(data.length) {
          console.log('message', {
            status: 'danger',
            message: 'username already exists.!'
          });
          return res.redirect('/register');
      } else {
        // hash and salt the password
        var hashedPassword = hashing(password);
        // if username is not in the database insert it
        console.log("username: ", username, "hashed ", hashedPassword);
        knex('users').insert({
          username: username,
          password: hashedPassword
        })
        .then(function(data) {
          // req.flash('message', {
          //   status: 'success',
          //   message: 'Welcome!'
          // });

          // return res.redirect('/login');
          res.json({
            message: "You've registered",
            status: "Success"
          });
        })
        .catch(function(err) {
          console.log(err);
          return res.send("wrong!");
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});
// Login with username and password
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  knex('users').where('username', username)
      .then(function(data) {
        // username does not exist. return error.
        if (!data.length) {
          return done('Incorrect username.');
        }
        var user = data[0];
        // username found but do the passwords match?
        if (comparePassword(password, user.password)) {
          // passwords match! return user
          var token = jwt.sign(user, 'superSecret', {
            expiresIn: 6000 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
          // return done(null, user);
        } else {
          // passwords don't match! return error
          return done('Incorrect password.');
        }
      })
      .catch(function(err) {
        // issue with SQL/nex query
        return done('Incorrect username and/or password.');
      });
});

module.exports = router;
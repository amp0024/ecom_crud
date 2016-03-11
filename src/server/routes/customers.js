var express = require('express');
var router = express.Router();
var query = require('../db/customers_queries');
var passport = require('../lib/auth');
var helpers = require('../lib/helpers');

var knex = require('../db/knex');
function Customers(){
  return knex('customers');
}


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/customerlogin', function(req, res, next){
  res.render('customerLogin', { title: 'Login' });
});

router.post('/customerlogin', function(req, res, next){
  passport.authenticate('local', function(err, customer) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      req.logIn(customer, function(err) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  })(req, res, next);
});

router.get('/customerregister', function(req, res, next){
  res.render('customerRegister', { title: 'Register' });
});

router.post('/customerregister', function(req, res, next){
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  console.log(req.body);
  Customers().where('email', email).then(function(customer){
    console.log('Customer', customer);
       if(customer.length) {
        return res.send('Already taken');
      } else {
        console.log('Inserting!');
        Customers().insert({name: name, email: email, password: password}).then(function(){
          res.redirect('/');
        }).catch(function(err){
          console.log('other error-9');
          return next(err);
        });
      }
    })
    .catch(function(err){
      console.log('other error2');
      return next(err);
    });
});

router.get('/logout', helpers.isAuthenticated, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', helpers.isAuthenticated, function(req, res, next){
  res.render('customerProfile', {title: 'Profile'});
});

module.exports = router;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../db/knex');
function Customers() {
    return knex('customers');
}

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(email, password, done) {
    console.log("RUNNING");
    Customers().where('email', email).then(function(data){
      console.log(data);
      if (!data.length){
        console.log('incorrect email')
        return done('Incorrect email');
      }
      var customer = data[0];
      if (password === customer.password) {
        console.log('worked');
        return done(null, customer);
      } else {
        console.log('incorrect pw');
        return done('Incorrect password');
      }
    })
    .catch(function(err){
      console.log('other error');
      return done('Incorrect email and/or password')
    });
  }
));

// sets the customer to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
});

// used on subsequent requests to update 'req.user' and update session
passport.deserializeUser(function(id, done) {
  Customers().where('id', id)
  .then(function(data) {
    return done(null, data[0]);
  })
  .catch(function(err) {
    return done(err);
  });
});

module.exports = passport;
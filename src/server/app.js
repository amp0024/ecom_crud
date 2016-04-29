require('dotenv').config();
// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var session = require('express-session');
var passport = require('./lib/auth');
var flash = require('connect-flash');
var routerProtect = express.Router();
var adminProtect = express.Router();
var jwt    = require('jsonwebtoken');


// *** routes *** //
var routes = require('./routes/index.js');
var customers = require('./routes/customers.js');
var manufacturers = require('./routes/manufacturers.js');
var admins = require('./routes/admins.js');
var products = require('./routes/products.js');
var carts = require('./routes/shoppingCart.js');
var authRoutes = require('./routes/auth_routes.js');
var charge = require('./routes/charge.js');
var purchases = require('./routes/purchases.js');
var images = require('./routes/images.js');

// *** express instance *** //
var app = express();

routerProtect.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;

        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

adminProtect.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        if (decoded.is_admin === true){
          req.decoded = decoded;

          next();
        } else {
          return res.json({success: false, message: 'Not Authorized'});
        }
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());



app.use(session({
  secret: process.env.SECRET_KEY || 'change_me',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.get('/', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        if (decoded.is_admin === true){
          res.sendFile(path.join(__dirname, '../client/app/views', 'adminlayout.html'));
        } else {
          res.sendFile(path.join(__dirname, '../client/app/views', 'index.html'));
        }
      }
    });
  }
  res.sendFile(path.join(__dirname, '../client/app/views', 'index.html'));
});
app.use('/api/safe/', routerProtect);
app.use('/api/admin/', adminProtect);
app.use('/auth', authRoutes);
app.use('/api/products', products);
app.use('/api/manufacturers', manufacturers);
app.use('/api/admin/admins', admins);
app.use('/api/safe/customers', customers);
app.use('/api/safe/carts', carts);
app.use('/api/charge', charge);
app.use('/api/safe/purchases', purchases);
app.use('/api/image', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;

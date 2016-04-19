var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var pw = process.env.GMAIL_PW;
var transporter = nodemailer.createTransport('smtps://dannyrobinsontestmail%40gmail.com:'+pw+'@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptionsCustomer = {
    from: '"Big Dan" <danny.robinson111@gmail.com>', // sender address
    to: 'daniel@djrobinson.me', // list of receivers
    subject: 'Your order is inbound!', // Subject line
    text: 'Order Order!', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

var mailOptionsMfc = {
    from: '"Big Dan <danny.robinson111@gmail.com>', // sender address
    to: 'daniel@djrobinson.me', // list of receivers
    subject: 'You have a new order!', // Subject line
    text: 'Order Order!', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var query = require('../db/purchases_queries.js');
var cart = require('../db/shopping_cart_queries.js');
var purchase = require('../db/purchases_queries.js');


router.post("/", function(req, res) {
  var token = req.body.token;
  cart.getCheckout(req.body.cart).then(function(data){
    total = data.reduce(function(prev, curr){
      return prev + parseFloat(curr.price);
    }, 0)
    var charge = stripe.charges.create({
      amount: parseInt(parseFloat(total * 100), 10),
      source: token,
      currency: "usd",
      description: 'TEST'
    }, function(err, charge) {
      if(err) {
        return res.json({ message: err })
      }
      cart.deactivateCart(req.body.cart).then(function(data){
        transporter.sendMail(mailOptionsCustomer, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        transporter.sendMail(mailOptionsMfc, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        res.status(200).json({ message: "Payment successful" });
      });
    });

    data.forEach(function(item){
      item.ship = req.body.ship;
      item.user_id = req.body.user;
      purchase.createPurchase(item).then(function(data){
        console.log('yay!');
      })
    })
  })
});


module.exports = router;

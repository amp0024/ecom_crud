var express = require('express');
var router = express.Router();

var stripeApiKey = "...";
var stripeApiKeyTesting = "..."
var stripe = require('stripe')(stripeApiKey);


router.post("/api/charge", function(req, res) {
  stripe.customers.create({
    card : req.body.stripeToken,
    email : "...", // customer's email (get it from db or session)
    plan : "browserling_developer"
  }, function (err, customer) {
    if (err) {
      var msg = customer.error.message || "unknown";
      res.send("Error while processing your payment: " + msg;
    }
    else {
      var id = customer.id;
      console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
      // save this customer to your database here!
      res.send('ok');
    }
  });
}
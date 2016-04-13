var express = require('express');
var router = express.Router();

var stripe = require('stripe')("sk_test_M68Y8QkeAR5Q7wHo6GITOKqZ");

var query = require('../db/purchases_queries.js');


router.post("/", function(req, res) {
  console.log("CHARGING!");
  var token = req.body.token;

  var charge = stripe.charges.create({
    amount: parseInt(parseFloat(req.body.amount * 100), 10),
    source: token,
    currency: "usd",
    description: 'TEST'
  }, function(err, charge) {
    if(err) {
      return res.json({ message: err })
    }
    res.status(200).json({ message: "Payment successful" });
  });
});


module.exports = router;

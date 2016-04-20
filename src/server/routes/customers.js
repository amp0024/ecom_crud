var express = require('express');
var router = express.Router();
var query = require('../db/customers_queries');

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/stripe/customer', function(req, res, next){
  console.log(req.body);
  var token = req.body.token;


})

router.get('/profile/:customer_id', function(req, res, next){
  query.getCustomer(req.params.customer_id).then(function(customer){
    res.json(customer);
  });
});

router.post('/profile', function(req, res, next){
  console.log("Profile is running");
  var token = req.body.token;
  console.log(req.body);
  stripe.customers.create({
    description: 'Customer for test@example2.com',
    source: token
  }, function(err, customer) {
    console.log(customer);
    stripe.customers.createSource(
      customer.id,
      {source: token},
      function(err, card) {
        console.log("card?", card);
      }
    );
  })
})

router.post('/update', function(req, res, next){
  query.updateCustomer(req.body).then(function(customer){
    res.json(customer);
  })
})



module.exports = router;

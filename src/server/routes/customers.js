var express = require('express');
var router = express.Router();
var query = require('../db/customers_queries');



// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/profile/:customer_id', function(req, res, next){
  query.getCustomer(req.params.customer_id).then(function(customer){
    res.json(customer);
  });
});

router.post('/profile', function(req, res, next){
  console.log("REq ", req.body);
  query.createCustomer(req.body).then(function(customer){
    res.json(customer);
  })
})

router.post('/update', function(req, res, next){
  query.updateCustomer(req.body).then(function(customer){
    res.json(customer);
  })
})



module.exports = router;

var express = require('express');
var router = express.Router();
var query = require('../db/shopping_cart_queries');

router.post('/:cart_id/:product_id', function(req, res, next){
  query.addToCart({cart_id: req.params.cart_id, product_id: req.params.product_id}).then(function(data){
    res.json({status: "Success!"});
  });
});

router.post('/', function(req, res, next){
  query.createCart(req.body.token).then(function(data){
    console.log(data);
    res.json({'token': data[0]});
  });
});

router.get('/cart', function(req, res, next){
  console.log("runrinoweroinsdoif");
  console.log(req.headers['x-access-token']);
  var cart = req.headers['x-access-token'];
  console.log(cart);
  query.getCartProducts(cart).then(function(data){
    console.log("lakjsdflkajsdflkjasdf");
    console.log(data);
    res.json(data);
  }, function(err){
    res.json(err);
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var query = require('../db/shopping_cart_queries');

router.post('/:cart_id/:product_id', function(req, res, next){
  query.addToCart({cart_id: req.params.cart_id, product_id: req.params.product_id}).then(function(data){
    res.json({status: "Success!"});
  });
});

router.post('/', function(req, res, next){
  query.createCart(req.body.user).then(function(data){
    res.json({'cart': data[0]});
  });
});

router.get('/cart/:cart_id', function(req, res, next){
  var cart = req.params.cart_id;
  query.getCartProducts(cart).then(function(data){
    res.json(data);
  }, function(err){
    res.json(err);
  });
});

router.get('/checkout/:cart_id', function(req, res, next){
  var cart = req.params.cart_id;
  query.getCheckout(cart).then(function(data){
    res.json(data);
  }, function(err){
    res.json(err);
  });
});

module.exports = router;
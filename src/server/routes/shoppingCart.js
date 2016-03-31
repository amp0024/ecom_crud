var express = require('express');
var router = express.Router();
var query = require('../db/shopping_cart_queries');

router.get('/:cart_id', function(req, res, next) {
  query.getCart(req.params.cart_id).then(function(cart){
    res.json(cart);
  });
});

router.post('/:cart_id/:product_id', function(req, res, next){
  query.addToCart({cart_id: req.params.cart_id, product_id: req.params.product_id}).then(function(data){
    res.json({status: "Success!"});
  });
});

module.exports = router;
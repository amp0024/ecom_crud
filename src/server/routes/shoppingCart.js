var express = require('express');
var router = express.Router();
var query = require('../db/shopping_cart_queries');

router.get('/:cart_id', function(req, res, next) {
  query.getCart(req.params.cart_id).then(function(cart){
    res.json(cart);
  });
});
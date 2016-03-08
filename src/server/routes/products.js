var express = require('express');
var router = express.Router();
var query = require('../db/product_queries');

router.get('/', function(req, res, next) {
  query.getProducts().then(function(products){
    res.render('product', { products: products })
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();

var prodQueries = require('../db/product_queries');


router.get('/', function(req, res, next) {
  prodQueries.getProducts().then(function(products){
    res.render('index', { products: products });
  })
});

module.exports = router;

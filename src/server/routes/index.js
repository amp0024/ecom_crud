var express = require('express');
var router = express.Router();

var prodQueries = require('../db/product_queries');
var manuQueries = require('../db/manufacturers_queries');


router.get('/', function(req, res, next) {
  prodQueries.getProducts().then(function(products){
    manuQueries.getManufacturers().then(function(mfc){
      console.log(mfc);
      console.log(products);
      res.render('index', { products: products, manufacturers: mfc });
    });
  });
});

module.exports = router;

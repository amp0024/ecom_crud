var express = require('express');
var router = express.Router();
var query = require('../db/product_queries');

router.get('/', function(req, res, next) {
  query.getProducts().then(function(products){
    //TODO convert to res.render
    res.json(products)
  })
});

router.get('/:product_id', function(req, res, next){
  query.getProduct(req.params.product_id).then(function(product){
    res.json(product)
  })
})

router.post('/', function(req, res, next){
  query.createProduct(req.body).then(function(data){
    console.log("inserted!");
    res.json(data[0]);
  })
})

module.exports = router;

var express = require('express');
var router = express.Router();
var query = require('../db/product_queries');
var manquery = require('../db/manufacturers_queries');

router.get('/', function(req, res, next) {
  query.getProducts().then(function(products){
    res.json(products);
  });
});

router.get('/product/:product_id', function(req, res, next){
  query.getProduct(req.params.product_id).then(function(product){
    res.json(product);
  });
});

router.get('/mfc/:mfc_id', function(req, res, next){
  query.getProductsByMfc(req.params.mfc_id).then(function(products){
    res.json(products);
  });
});

router.post('/update/:product_id', function(req, res, next){
  console.log("Running!!!");
  query.updateProduct(req.body, req.params.product_id).then(function(product){
    res.json(product);
  })
})

router.post('/', function(req, res, next){
  console.log(req.body);
  query.createProduct(req.body).then(function(data){
    res.json(data[0]);
  });
});

router.delete('/:product_id', function(req, res, next){
  query.deleteProduct(req.params.product_id).then(function(){
    res.json({ status: "Deleted"});
  });
});


module.exports = router;


function filterManufacturer(products, name){
  return products.filter(function(el){
    return (el.name).toLowerCase() === name;
  });
}
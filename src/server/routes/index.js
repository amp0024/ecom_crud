var express = require('express');
var router = express.Router();

var prodQueries = require('../db/product_queries');
var manuQueries = require('../db/manufacturers_queries');


// router.get('/', function(req, res, next) {
//     manuQueries.getManufacturers().then(function(mfc){
//       res.render('index', { manufacturers: mfc });
//   });
// });

router.get('/', function(req, res, next) {
  prodQueries.getProducts().then(function(products){
      res.render('index', { products: products });
  });
});

router.get('/cart', function(req, res, next){
  res.render('shoppingCart');
});



// router.get('/avery', function(req, res, next) {
//   prodQueries.getProducts().then(function(products){
//   	var avery = filterManufacture(products, 'avery')
//     console.log('list of man products: ', avery);
//       res.render('index', { products: avery });
  // });
// });

// router.get('/odell', function(req, res, next) {
//   prodQueries.getProducts().then(function(products){
//   	var odell = filterManufacture(products, 'odell')
//     console.log('list of man products: ', odell);
//       res.render('index', { products: odell });
//   });
// });
module.exports = router;


// function filterManufacture(products, name){
// 	return products.filter(function(el){
// 		return (el.name).toLowerCase() === name
// 	});
// };
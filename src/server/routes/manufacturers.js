var express = require('express');
var router = express.Router();
var query = require('../db/manufacturers_queries');

router.get('/', function(req, res, next) {
  query.getManufacturers().then(function(manufacturers){
    res.render()
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;

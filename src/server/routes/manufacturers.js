var express = require('express');
var router = express.Router();
var query = require('../db/manufacturers_queries');

router.get('/', function(req, res, next) {
  query.getManufacturers().then(function(manufacturers){
    res.json(manufacturers)
  })
});

router.get('/:mfc_id', function(req, res, next){
  query.getManufacturer(req.params.mfc_id).then(function(product){
    console.log(req.params.mfc_id);
    res.json(product);
  })
})

router.post('/', function(req, res, next){
  query.createManufacturer(req.body).then(function(data){
    console.log("inserted!");
    res.json(data[0]);
  })
})

router.delete('/:mfc_id', function(req, res, next){
  query.deleteManufacturer(req.params.mfc_id).then(function(){
    res.json({ status: "Deleted"});
  })
})

module.exports = router;

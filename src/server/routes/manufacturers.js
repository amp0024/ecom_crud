var express = require('express');
var router = express.Router();
var query = require('../db/manufacturers_queries');
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  query.getManufacturers().then(function(manufacturers){
    res.json(manufacturers);
  });
});

router.get('/:mfc_id', function(req, res, next){
  query.getManufacturer(req.params.mfc_id).then(function(product){
    console.log(req.params.mfc_id);
    res.json(product);
  });
});

router.post('/', function(req, res, next){
  query.createManufacturer(req.body.mfc).then(function(data){
    knex('users').insert({
          username: req.body.username,
          password: req.body.password,
          is_admin: true,
          site_id: data[0]
        })
    .then(function(user){
      console.log("inserted!");
      res.json(data[0]);
    });
  });
});

router.delete('/:mfc_id', function(req, res, next){
  query.deleteManufacturer(req.params.mfc_id).then(function(){
    res.json({ status: "Deleted"});
  });
});

module.exports = router;

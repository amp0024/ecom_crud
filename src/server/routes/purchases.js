var express = require('express');
var router = express.Router();
var query = require('../db/purchases_queries.js');

router.get('/mfc/:mfc_id', function(req, res, next){
  query.getPurchByMfc(req.params.mfc_id).then(function(data){
    res.json(data);
  });
});

router.get('/user/:user_id', function(req, res, next){
  query.getPurchByCust(req.params.user_id).then(function(data){
    res.json(data);
  }).catch(function(err){
    res.json(err);
  })
});

module.exports = router;
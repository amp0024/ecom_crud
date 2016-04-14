var express = require('express');
var router = express.Router();
var query = require('../db/purchases_queries.js');

router.get('/:mfc_id', function(req, res, next){
  query.getPurchByMfc(req.params.mfc_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;
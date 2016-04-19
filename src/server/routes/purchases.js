var express = require('express');
var router = express.Router();
var query = require('../db/purchases_queries.js');
var _ = require('lodash');

router.get('/mfc/:mfc_id', function(req, res, next){
  query.getPurchByMfc(req.params.mfc_id).then(function(data){
    res.json(data);
  });
});

router.get('/mfc/:mfc_id/individual', function(req, res, next){
  query.getSalesTotals(req.params.mfc_id).then(function(data){
    var total = 0;
    var count = 0;
    console.log(data);
    var returnData = data.reduce(function(prev, curr){
      if (!prev[curr.name]){
        prev[curr.name] = {};
        prev[curr.name].product_id = curr.product_id;
        prev[curr.name].name = curr.name;
        prev[curr.name].total = curr.price * curr.quantity;
        prev[curr.name].quantity = curr.quantity;
        return prev;
      } else {
        prev[curr.name].total += curr.price * curr.quantity;
        prev[curr.name].quantity += curr.quantity;
        return prev;
      }
    }, {})
    var keys = Object.keys(returnData);
    var finalVal = keys.map(function(key){
      total += returnData[key].total;
      count += returnData[key].quantity;
      return returnData[key];
    });
    var returner = {
      total: total,
      count: count,
      top: _.maxBy(finalVal, function(obj){ return obj.total }),
      data: finalVal
    }
    res.json(returner);
  })
})

router.get('/user/:user_id', function(req, res, next){
  query.getPurchByCust(req.params.user_id).then(function(data){
    res.json(data);
  }).catch(function(err){
    res.json(err);
  })
});

router.post('/order/:order_id', function(req, res, next){
  query.changeOrderStatus(req.params.order_id).then(function(data){
    console.log(data);
  }).catch(function(err){
    console.log(err);
  });
})

module.exports = router;
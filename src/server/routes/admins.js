var express = require('express');
var router = express.Router();
var query = require('../db/admin_queries');

router.get('/test', function(req, res, next) {
  res.json({ message: 'Admin Route worked!!!' });
});



module.exports = router;

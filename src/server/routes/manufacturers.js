var express = require('express');
var router = express.Router();
var query = require('../db/manufacturers_queries');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

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

function hashing (password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

router.post('/', function(req, res, next){
  query.createManufacturer(req.body.mfc).then(function(mfcdata){
    var hashedPassword = hashing(req.body.password);
    knex('users').where('username', req.body.username)
    .then(function(data){
      // if username is in the database send an error
      if(data.length) {
          console.log('message', {
            status: 'danger',
            message: 'username already exists.!'
          });
          return res.redirect('/register');
      } else {
        // hash and salt the password
        var hashedPassword = hashing(req.body.password);
        // if username is not in the database insert it
        console.log("username: ", req.body.username, "hashed ", hashedPassword);
        knex('users').insert({
          username: req.body.username,
          password: hashedPassword,
          is_admin: true,
          site_id: mfcdata[0]
        })
        .then(function(user){
          console.log("inserted!");
          res.json(data[0]);
        })
        .catch(function(err) {
          console.log(err);
          return res.send("wrong!");
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
  });
});

router.delete('/:mfc_id', function(req, res, next){
  query.deleteManufacturer(req.params.mfc_id).then(function(){
    res.json({ status: "Deleted"});
  });
});

module.exports = router;

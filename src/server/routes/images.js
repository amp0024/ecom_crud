var express = require('express');
var router = express.Router();

var http = require('http');
var path = require('path');
var multer = require('multer');
var AWS = require('aws-sdk');
var fs = require('fs');

var S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

router.post('/upload', upload.single('product'), function (req, res, next) {
  console.log("Running!!!!");
  // get file info from form upload
  console.log(req.file);
  var uploadedFile = req.file;
  console.log(uploadedFile);
  var filePath = path.join(__dirname, '../../client/uploads/', uploadedFile.originalname);
  console.log(filePath);
  // read file, send to s3
  fs.readFile(filePath, function (err, fileBuffer) {
    var params = {
      Bucket: S3_BUCKET,
      Key: uploadedFile.filename,
      Body: fileBuffer,
      ACL:'public-read-write'
    };
    s3.putObject(params, function (err, data) {
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log(data);
      }
    });
  });

  // remove file
  fs.unlink(filePath, function(err){
    console.log(filePath);
    if(err) {
      console.log(err);
      return next(err);
    }
    // res.redirect('/');
  });

});


module.exports = router;
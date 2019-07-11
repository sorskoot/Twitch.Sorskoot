var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/alert', function(req, res, next) {
  res.render('alert');
});

router.get('/emotes', function(req, res, next) {
  res.render('emotes');
});
router.get('/speech', function(req, res, next) {
    res.render('speech');
  });
module.exports = router;

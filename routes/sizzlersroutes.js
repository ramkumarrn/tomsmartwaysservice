'use strict';

var express = require('express');
var router = express.Router();
var controller = require(rootdir+'/controllers/sizzlerscontroller.js');

router.get('/testjson', function(req, res, next){
  controller.testjson(req, res, next);
});
router.post('/pushtoqueue/', function(req, res,next) {
  
  controller.pushToRabbitQueue(req, res, next);
});

module.exports = router;


'use strict';
var _ = require('lodash');
var fileService = require(rootdir+'/services/fileservice.js');
var Channel = require(rootdir+'/services/channel.js');
var util = require(rootdir+'/utils/util.js');

module.exports = {
    
    testjson: function(req, res, next){
        fileService.getJsonData('leaves.json', function(jsonResponse){
            res.status(200).json(jsonResponse);
        });
    },

    pushToRabbitQueue: function(req,res,next){

      var queue = 'testQueue';
      var msg = req.body.msg;
      var lang = req.body.lang;
      var lat = req.body.lat;
      console.log('message='+msg);
      Channel(queue, function(err, channel, conn) {  
        if (err) {
          console.error(err.stack);
        }
        else {
          console.log('channel and queue created');
          var work =  req.body
          channel.sendToQueue(queue,util.encode(work), {
            persistent: true
          });
          setImmediate(function() {
            channel.close();
            conn.close();
            res.status(200).json("Successfully pushed to queue");
          });
        }
      });
      
    }
    
    


};
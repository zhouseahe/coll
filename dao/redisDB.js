var redis   = require('redis');
var config   = require('../config');

var clientGenerator = {
    getClient : function(){
        var gclient = redis.createClient(config.redisPORT, config.redisURL);
        gclient.on("error", function(error) {
            console.log(error);
        });
        return gclient;
    }
}

exports.clientGenerator = clientGenerator;
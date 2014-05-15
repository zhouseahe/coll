var redis  = require("redis"),
    client = redis.createClient(), multi;
var config   = require('../../config');

var clientGenerator = {
    getClient : function(){
        var gclient = redis.createClient(config.redisPORT, config.redisURL);
        gclient.on("error", function(error) {
            console.log(error);
        });
        return gclient;
    }
}
function openClient(){
    return clientGenerator.getClient();
}

exports.openClient = openClient;
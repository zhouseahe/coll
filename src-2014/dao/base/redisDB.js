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

// transaction can exe by this way . it should use service to share client , then it's ok
function multiExec(){
    var clientshare = clientGenerator.getClient();

    clientshare.close();
}

exports.openClient = openClient;
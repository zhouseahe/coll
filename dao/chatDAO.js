/**
 * Created by acer on 14-5-20.
 */

var redisDB = require('../dao/base/redisDB');

var clientPub = redisDB.openClient();
var clientSub = redisDB.openClient();

exports.publish = function(userid,msg,callback){
    clientPub.publish("chatroom",userid + " : " + msg);
}

exports.subscribe = function(){

}

/*
client1.on("subscribe", function (channel, count) {
    client2.publish("a nice channel", "I am sending a message.");
    client2.publish("a nice channel", "I am sending a second message.");
    client2.publish("a nice channel", "I am sending my last message.");
});

client1.on("message", function (channel, message) {
    console.log("client1 channel " + channel + ": " + message);
    msg_count += 1;
    if (msg_count === 3) {
        client1.unsubscribe();
        client1.end();
        client2.end();
    }
});

client1.incr("did a thing");
client1.subscribe("a nice channel");
    */
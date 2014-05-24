/**
 * Created by acer on 14-5-20.
 * leave:username
 *      list
 *          ' sender : msg '
 *      hash
 *          sender , msg
 *
 */

var redisDB = require('../dao/base/redisDB');
var MsgList = "msg:";
var client ;

exports.fetchMsg = function(username,callback){
    client = redisDB.openClient();
    client.lrange(MsgList+username , 0 ,-1  ,function(error, data){
        if(error) {
            console.log(error);
        } else {
            callback(data);
        }
        client.del(MsgList+username);
        client.end();
    });
}

exports.leaveMsg = function(reciever,msg){
    client = redisDB.openClient();
    client.lpush(MsgList+reciever,msg, function(error, data){
        if(error) {
            console.log(error);
        } else {
        }
        client.end();
    });
}
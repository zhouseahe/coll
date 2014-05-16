/**
 * Created by acer on 14-5-14.
 */
var redisDB = require('../dao/base/redisDB');
var client  = null;

var commentHash = "comments:";
var commentKeyPrefix =  'comment:';
var commentSeq =  'commentSeq:';

exports.setComment =  function(articleKey,userId ,comment , callback){
    client = redisDB.openClient();
    var multi = client.multi();
    multi.incr(commentSeq+articleKey);
    multi.exec(function (err, value){
        var commentKey =  commentKeyPrefix + value;
        //JSON.stringify( obj )
        client.hset(commentHash+articleKey,commentKey,userId + comment , function(error, data){
            if(error) {
                console.log(error);
            } else {
                callback(data);
            }
            client.end();
        });
    });
}

exports.queryComments = function (ariclekey ,callback){
    client = redisDB.openClient();
    client.hgetall(commentHash + ariclekey, function(error, data){
        if(error) {
            console.log(error);
        } else {
            callback(data);
        }
        client.end();
    });
}
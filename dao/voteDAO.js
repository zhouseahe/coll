/**
 * Created by acer on 14-5-14.
 * 每个文章 对应一个vote：id 集合
 */

var redisDB = require('../dao/redisDB');
var client  = null;

exports.vote = function (articleId , user){

    client = redisDB.openClient();
    client.sadd('vote:' + articleId ,user, function(error, data){
        if(error) {
            console.log(error);
        } else {
            console.log(' vote succeed ');
        }
        client.end();
    });
}

exports.unvote= function (articleId , user ,callback){

    client = redisDB.openClient();
    client.srem('vote' + articleId ,user, function(error, data){
        if(error) {
            console.log(error);
        } else {
            callback(data);
        }
        client.end();
    });
}

exports.isvoted = function (articleId , user ){
    client = redisDB.openClient();
    client.sismember('vote' + articleId ,user, function(error, data){
        if(error) {
            console.log(error);
        } else {
           console.log(' is vote ');
        }
        client.end();
    });
}
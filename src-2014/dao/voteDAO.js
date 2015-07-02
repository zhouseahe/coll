/**
 * Created by acer on 14-5-14.
 * 每个文章 对应一个vote：id 集合
 */

var redisDB = require('../dao/base/redisDB');
var client  = null;
var voteKeyPrefix = "vote:";

exports.setVote = function (articleId , userId ,callback){
    client = redisDB.openClient();
    client.sadd(voteKeyPrefix + articleId ,userId, function(error, data){
        if(error) {
            console.log(error);
        } else {
            //直接统计次数 , there is a bug
            //this.countVote(articleId,callback);
            callback(data);
        }
        client.end();
    });
}

exports.remVote= function (articleId , userId ,callback){

    client = redisDB.openClient();
    client.srem(voteKeyPrefix + articleId ,userId, function(error, data){
        if(error) {
            console.log(error);
        } else {
            callback(data);
        }
        client.end();
    });
}

exports.isVoted = function (articleId , userId,callback ){
    client = redisDB.openClient();
    client.sismember(voteKeyPrefix + articleId ,userId, function(error, data){
        if(error) {
            console.log(error);
        } else {
            //callback(data);
        }
        client.end();
    });
}


exports.queryVote = function (articleId,callback){
    client = redisDB.openClient();
    client.smembers(voteKeyPrefix + articleId , function(error, data){
        if(error) {
            console.log(error);
        } else {
            callback(data);
        }
        client.end();
    });
}

exports.countVote = function (articleId,callback){
    client = redisDB.openClient();
    client.scard(voteKeyPrefix + articleId , function(error, data){
        if(error) {
            console.log(error);
        } else {
            callback(data);
        }
        client.end();
    });
}
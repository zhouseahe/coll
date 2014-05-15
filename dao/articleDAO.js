/**
 * Created by acer on 14-5-14.

var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
client.on("error", function(error) {
    console.log(error);
});

var crud = {



}
 */
var redisDB = require('../dao/base/redisDB');
var client  = null;

var articleHash =  'articles';
var articleKeyPrefix =  'article:';
var articleSeq =  'articleSeq';

var crud = {
    set_article : function(article , callback){
        client = redisDB.openClient();
        var multi = client.multi();
        multi.incr(articleKeyPrefix);
        multi.exec(function (err, value){
            var articleKey =  articleKeyPrefix + value;
            //JSON.stringify( obj )
            client.hset(articleHash,articleKey,article , function(error, data){
                if(error) {
                    console.log(error);
                } else {
                    callback(data);
                }
                client.end();
            });
        });

    },
    get_article : function (articleKey,callback){
        client = redisDB.openClient();
        client.hget(articleHash,articleKey, function(error, data){
            if(error) {
                console.log(error);
            } else {
                console.log(data);
                callback(data);
            }
            client.end();
        });
    },
    query_article : function (callback){
        client = redisDB.openClient();
        client.hgetall(articleHash, function(error, data){
            if(error) {
                console.log(error);
            } else {
                callback(data);
            }
            client.end();
        });
    }

}

exports.set_article = crud.set_article;
exports.query_article = crud.query_article;
exports.get_article = crud.get_article;
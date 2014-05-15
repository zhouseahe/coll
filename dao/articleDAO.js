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
var redisDB = require('../dao/redisDB');
var client  = null;

var crud = {
    set_article : function(article , callback){
        client = redisDB.openClient();
        var articleKey =  "article:0011";
        client.hset("articles",articleKey,article , function(error, data){
            if(error) {
                console.log(error);
            } else {
                callback(data);
            }
            client.end();
        });
    },
    get_article : function (articleKey,callback){
        client = redisDB.openClient();
        client.hget("articles",articleKey, function(error, data){
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
        client.hgetall("articles", function(error, data){
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
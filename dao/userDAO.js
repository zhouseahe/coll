/**
 * Created by acer on 14-5-14.
 */
var redisDB = require('../dao/base/redisDB');
var client  = null;
var userHash = 'users';

var user = {};
var crud = {
    get_user : function (key,password ,callback){
        client = redisDB.openClient();
        client.hget(userHash,key, function(error, data){
            if(error) {
                console.log(error);
            } else {
                console.log(data);
                callback(data == password);
            }
            client.end();
        });
    },
    set_user : function (key,value,callback){
        client = redisDB.openClient();
        client.hset(userHash ,key,value , function(error, data) {
            if(error) {
                console.log(error);
            } else {
                callback(data);
            }
            client.end();
        });
    },
    del_user : function(key,callback){
        client =redisDB.openClient();
        client.hdel(userHash, key , function(error, data) {
            if(error) {
                console.log(error);
            } else {
                callback(data);
            }
            client.end();
        });
    },
    query_user :  function (callback){
        client = redisDB.openClient();
        client.hgetall(userHash, function(error, users) {
            if(error) {
                console.log(error);
            } else {
                callback(users);
            }
            client.end();
        });
    }
}

exports.get_user = crud.get_user;
exports.set_user = crud.set_user;
exports.del_user = crud.del_user;
exports.query_user = crud.query_user;
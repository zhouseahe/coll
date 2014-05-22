/**
 * Created by acer on 14-5-22.
 */
// 管理 key -value :  username , connection
var map = {};

exports.put =function(username,connection){
    map[username] =connection;
}

exports.remove =function(username){
    delete map.username;
}

exports.isLive = function (username){
    map.hasOwnProperty(username);
}

exports.getOneConnection =function (){

}

exports.getUCMap = function(){
    return map;
}
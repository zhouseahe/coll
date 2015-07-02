/**
 * Created by acer on 14-5-22.
 */
// 管理 key -value :  username , connection
var chatService = require('../service/chatService');
var map = {};

// next time this function will be refined
exports.onlineUsers = function(){
    var online = new Array();
    for(var key in map ){
        online.push(key);
    }
    return online;
}
exports.put =function(username,connection){
    map[username] =connection;
    chatService.fetchMsg(username,function(data){
        for(var idx in  data){
            connection.sendUTF(data[idx]);
        }
    })
}
exports.remove =function(username){
    delete map[username];
}
exports.isLive = function (username){
    map.hasOwnProperty(username);
}
exports.getOneConnection =function (username){
    return map[username];
}
exports.getUCMap = function(){
    return map;
}
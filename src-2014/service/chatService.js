/**
 * Created by acer on 14-5-20.
 */

var chatDao = require('../dao/chatDAO');

exports.fetchMsg = function (username,callback){
    chatDao.fetchMsg(username,callback);
}

exports.leaveMsg = function (reciever,msg){
    chatDao.leaveMsg(reciever,msg);
}
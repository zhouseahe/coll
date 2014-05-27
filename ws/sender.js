/**
 * Created by acer on 14-5-22.
 */

var resolveProtocol = require('../common/resolveProtocol');
var chatService = require('../service/chatService');

exports.broadcast = function(map,msg){
    for(var key in map ){
            map[key].sendUTF(msg);
    }
}

exports.send2username = function(map,sender ,reciever ,msg){
    var rec_conn =  map[reciever];
    if(rec_conn!=undefined){
        map[reciever].sendUTF(sender+":"+msg+resolveProtocol.privateMsg);
        map[sender].sendUTF(sender+":"+msg+resolveProtocol.privateMsg);
    }else{
        chatService.leaveMsg(reciever,sender+":"+msg +resolveProtocol.offlineMsg);
        map[sender].sendUTF(sender+":"+ resolveProtocol.sendOffline);
    }
}
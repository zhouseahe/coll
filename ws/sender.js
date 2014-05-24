/**
 * Created by acer on 14-5-22.
 */
var chatService = require('../service/chatService');

exports.broadcast = function(map,msg){
    for(var key in map ){
            map[key].sendUTF(msg);
    }
}

exports.send2username = function(map,sender ,reciever ,msg){
    var rec_conn =  map[reciever];
    if(rec_conn!=undefined){
        map[reciever].sendUTF(sender+":"+msg);
        map[sender].sendUTF(sender+":"+msg);
    }else{
        chatService.leaveMsg(reciever,sender+":"+msg);
        map[sender].sendUTF("  send offline msg  ");
    }
}
/**
 * Created by acer on 14-5-22.
 */

exports.broadcast = function(map,msg){
    for(var key in map ){
            map[key].sendUTF(msg);
    }
}

exports.send2username = function(map,sender ,reciever ,msg){
    console.log(sender + " : " + reciever);
    map[reciever].sendUTF(sender+":"+msg);
    map[sender].sendUTF(sender+":"+msg);
   // connection.sendUTF(msg);
}
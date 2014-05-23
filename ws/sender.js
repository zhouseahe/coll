/**
 * Created by acer on 14-5-22.
 */

exports.broadcast = function(map,msg){
    for(var key in map ){
            map[key].sendUTF(msg);
    }
}

exports.send2username = function(map,username ,msg){
    map[username].sendUTF(msg);
   // connection.sendUTF(msg);
}
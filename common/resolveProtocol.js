/**
 * Created by acer on 14-5-27.
 */

//@@ is send to peer
exports.checkPeerSend = function (msg){
    return msg.indexOf('@@')>0;
}
exports.getPeerContent = function (arg){
    if(arguments.length<1){
        console.log(' failed : invalid args ');
    }else{
        return arg.split("@@");
    }
}

// msg  ： all online users send  ， client parse users
exports.onlineUsers = "@wsXXon";
// msg  ： leave user send  ， client parse user
exports.offlineUser ="@wsXXdn";

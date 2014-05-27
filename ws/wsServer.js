/**
 * Created by acer on 14-5-23.
 */
var WebSocketServer = require('websocket').server;

var manager = require('../ws/manager');
var sender = require('../ws/sender');

var app = require('../app.js');
var util = require('../common/util');
var resolveProtocol = require('../common/resolveProtocol');

wsServer = new WebSocketServer({
    httpServer: app.httpServer,
    autoAcceptConnections: false
});

function originIsAllowed(request) {
    if ( request.httpRequest.headers['sec-websocket-protocol'].indexOf('seahe')==-1 ) {
        //request.reject();
    }
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request)) {
        request.reject();
        return;
    }
    var connection = request.accept('seahe', request.origin);
    var username = util.getCookieKey(request.httpRequest.headers.cookie,'username');
    connection.username=username;
    manager.put(username,connection);
    //上线时，1、推送所有在线用户   2、仅推送上线用户
    var users = manager.onlineUsers();
    wsServer.broadcast(resolveProtocol.onlineUsers+users);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            var msg = message.utf8Data;
            if(resolveProtocol.checkPeerSend(msg)){
                var content = resolveProtocol.getPeerContent(msg);
                sender.send2username(manager.getUCMap(),connection.username,content[1],content[0]);
            }else{
                wsServer.broadcast( connection.username +" : " + msg);
                //sender.broadcast(manager.getUCMap(), connection.username +" : " + message.utf8Data);
            }
        }
        else if (message.type === 'binary') {
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        manager.remove(connection.username);
        //下线时，推送下线用户 , 客户端主动关闭 或 断网
        wsServer.broadcast(resolveProtocol.offlineUser + connection.username);
    });
});



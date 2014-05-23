/**
 * Created by acer on 14-5-23.
 */
var WebSocketServer = require('websocket').server;

var manager = require('../ws/manager');
var sender = require('../ws/sender');

var app = require('../app.js');
var util = require('../common/util');

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
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            sender.broadcast(manager.getUCMap(), connection.username +" : " + message.utf8Data);
        }
        else if (message.type === 'binary') {
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
        // manager.remove();
        console.log('closed');
    });
});



/**
 * Created by acer on 14-5-23.
 */
var SingletonWebSocket = (function () {
    var instance;
    function createInstance() {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        var wsServer = 'ws://'+ document.location.hostname +":" + window.location.port + "/";
        var connection = new WebSocket(wsServer,'seahe');
        return connection;
    }
    return {
        getConnection: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();//  单例 ，匿名
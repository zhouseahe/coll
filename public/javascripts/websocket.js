/**
 * Created by acer on 14-5-23.
 */
var SingletonWebSocket = (function () {
    var instance;
    function createInstance() {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        var connection = new WebSocket('ws://192.168.9.58:1988/','seahe');
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
})();
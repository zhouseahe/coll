/**
 * Module dependencies.
 */
var cluster = require('cluster');
var numCpus = require('os').cpus().length;
var http = require('http');
var app = require('./dispatcher.js').app;

/*
var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};*/

// start httpServer
httpServer = http.createServer(app);
if(cluster.isMaster){
    console.log(' cluster master working ....');
    for(var i = 0 ; i < numCpus; i++){
        cluster.fork();
    }
    cluster.on('death',function(worker){
        console.log('core worker ' + worker.pid + ' died');
    });
}else{
    console.log('start http servers ...');
    httpServer.listen(app.get('port'),function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
    httpServer.listen(app.post('port'),function(){
        console.log('Express server listening on port ' + app.get('port'));
        //console.log(process.env);//NODE_CLUSTER_ID
    });
}

exports.httpServer = httpServer;

//start wsServer
var wsServer = require('./ws/wsServer.js');

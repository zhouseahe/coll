/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// pass the express to the connect redis module
// allowing it to inherit from session.Store
var RedisStore = require('connect-redis')(session);
var http = require('http');
var path = require('path');

var routes = require('./routes');
var user = require('./routes/user');
var article = require('./routes/article');
var vote = require('./routes/vote');
var comment = require('./routes/comment');
var chat = require('./routes/chat');
var login = require('./routes/login');

var manager = require('./ws/manager');
var sender = require('./ws/sender');
var util = require('./common/util');

var WebSocketServer = require('websocket').server;


var config   = require('./config');
var oauth   = require('./common/oauth');
var app = express();

// all environments
app.set('port', config.listenerPort ||process.env.PORT );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(cookieParser('zhoushaohe'));
app.use(session({ store: new RedisStore }));
/* something not config properly
var myStore = new RedisStore({ url: "redis://127.0.01:6379" });
app.use(session({ cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
}, store: myStore, secret: 'zhoushaohe' }));
*/
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get("*",function(req,res ,next){
    res.locals.session  = req.session;
    next();
});

app.post("*",function(req,res ,next){
    res.locals.session  = req.session;
    next();
});
// request url , oauth.requireUser
app.get('/' ,routes.index);

app.get('/chathall' ,chat.reghall);

//user crud
app.get('/user/userList', user.userList);
app.get('/user/userForm', user.userForm);
app.get('/user/userSet',oauth.requirePoster, user.userSet);
app.get('/user/userDel', user.userDel);
app.get('/user', user.userList);

//article crud
app.get('/article/articleList', article.articleList);
app.get('/article', article.articleList);
app.get('/article/articleSet', oauth.requirePoster,article.articleSet);
app.get('/article/articleForm', article.articleForm);
app.get('/article/articleGet', article.articleGet);

// vote
app.post('/vote/vote', vote.vote);
app.post('/vote/countVote', vote.countVote);

// comment
app.post('/comment/comment',oauth.requireUser, comment.comment);
app.post('/comment/queryComment', comment.queryComment);
app.post('/comment/queryCommentJade', comment.queryCommentJade);


// log
app.get('/login', login.login);
app.get('/toLogin', login.toLogin);
app.get('/logout', login.logout);


httpServer = http.createServer(app);
httpServer.listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});
httpServer.listen(app.post('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});

wsServer = new WebSocketServer({
    httpServer: httpServer,
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
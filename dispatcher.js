/**
 * Created by acer on 14-5-23.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// pass the express to the connect redis module
// allowing it to inherit from session.Store
var RedisStore = require('connect-redis')(session);
var path = require('path');

var routes = require('./routes');
var user = require('./routes/user');
var article = require('./routes/article');
var vote = require('./routes/vote');
var comment = require('./routes/comment');
var chat = require('./routes/chat');
var login = require('./routes/login');

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

app.get('/chathall' ,oauth.requireUser,chat.reghall);

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
app.get('/article/articleForm',oauth.requireUser, article.articleForm);
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

exports.app = app;
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var article = require('./routes/article');
var http = require('http');
var path = require('path');
var config   = require('./config');

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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// request url
app.get('/', routes.index);

//user crud
app.get('/user/userForm', user.userForm);
app.get('/user/userSet', user.userSet);
app.get('/user/userDel', user.userDel);
app.get('/user/userList', user.userList);

//article crud
app.get('/article/articleSet', article.articleSet);
app.get('/article/articleForm', article.articleForm);
app.get('/article/articleGet', article.articleGet);
app.get('/article/articleList', article.articleList);

// vote
app.get('/article/vote', article.vote);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

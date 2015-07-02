var express = require('express');
var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.get('/app/phones', function (req, res) {
});

app.listen(8000);

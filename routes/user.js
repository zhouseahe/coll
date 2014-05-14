/*
 * GET users listing.
 */

var URL = require('url');
var querystring = require('querystring');
var userDao = require('../dao/userDAO');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.userForm = function(req,res){
    var arg = URL.parse(req.url).query;
    var username = querystring.parse(arg).username;
    if(username==undefined){
        res.render('user/userForm', { title: 'add user' });
    }else{
        userDao.get_user(username,function(user){
            res.render('user/userView', { title: 'view user',user:user });
        });
    }

}

exports.userDel = function(req,res){
    var arg = URL.parse(req.url).query;
    var username = querystring.parse(arg).username;
    userDao.del_user(username,function(data){
        res.render('user/result', { title: 'remove',result:data });
    });

}

exports.userSet = function(req,res){
    var arg = URL.parse(req.url).query;
    var username = querystring.parse(arg).username;
    var pwd = querystring.parse(arg).pwd;
    userDao.set_user(username,pwd,function(data){
         res.render('user/result', { title: " result ",result : data });
    });
}

exports.userList = function(req,res){
    console.log(" userlist ");
    userDao.query_user(function(data){
        res.render('user/userList', { title: 'all users', users :data });
    });
}

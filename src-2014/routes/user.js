/*
 * GET users listing.
 */

var URL = require('url');
var querystring = require('querystring');
var userDao = require('../dao/userDAO');

exports.userForm = function(req,res){
    var arg = URL.parse(req.url).query;
    var username = querystring.parse(arg).username;
    if(username==undefined){
        res.render('user/userForm', { title: 'add user' });
    }else{
        userDao.get_user(username,function(user){
            res.render('user/userView', { title: '浏览',user:user });
        });
    }

}

exports.userDel = function(req,res){
    var arg = URL.parse(req.url).query;
    var username = querystring.parse(arg).username;
    userDao.del_user(username,function(data){
        res.render('result', { title: '操作结果：',result:data });
    });

}

exports.userSet = function(req,res){
    var username =  req.param('username');
    var pwd =  req.param('pwd');
    userDao.set_user(username,pwd,function(data){
         res.render('result', { title: " 操作结果： ",result : data });
    });
}

exports.userList = function(req,res){
    userDao.query_user(function(data){
        res.render('user/userList', { title: '用户列表：', users :data });
    });
}

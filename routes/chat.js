/**
 * Created by acer on 14-5-20.
 */

var http = require("http");
var URL = require('url');
var querystring = require('querystring');
var chatService = require('../service/chatService');

exports.reghall = function (req,res){
    // 注册chanel

    //chatService
    res.render('room/chathall', { title : ' say what you want' });
}


exports.leavehall = function (req,res){
    // 注册chanel

    //chatService
    res.render('index', { title : ' say what you want' });
}

exports.queryChat =  function (req,res){

}

exports.sendMsg =  function (req,res){

}
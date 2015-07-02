/**
 * Created by acer on 14-5-16.
 */
var http = require("http");
var URL = require('url');
var querystring = require('querystring');
var commentService = require('../service/commentService');

exports.comment = function (req,res){
    var articleKey =  req.param('articleKey');
    var comment =  req.param('comment');
    var username =  req.session.username;
    commentService.comment(articleKey,username ,comment , function(data){
        res.json({ msg : data });
    });
}

exports.queryComment = function (req,res){
    var articleKey =  req.param('articleKey');
    var comment =  req.param('comment');
    commentService.queryComment(articleKey, function(data){
       // console.log(JSON.stringify(data));
        res.json({ result : data});
    });
}

exports.queryCommentJade = function (req,res){
    var articleKey =  req.param('articleKey');
    var comment =  req.param('comment');
    commentService.queryComment(articleKey, function(data){
        res.render('comment/comments', { comments : data });
    });
}
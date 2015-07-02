/**
 * Created by acer on 14-5-15.
 */
var http = require("http");
var URL = require('url');
var querystring = require('querystring');
var voteService = require('../service/voteService');


exports.countVote = function (req,res){
    var articleKey =  req.param('articleKey');
    voteService.countVote(articleKey,function(data){
        res.json({ result : data});
    });
}

exports.vote = function (req,res){
    var articleKey =  req.param('articleKey');
    var username =  req.session.username;
    putVoteUser(articleKey,username,function(data){
        res.json({ result : data});
    });
}

function calScore(){
    //TODO
}

function incVotes(){
    //TODO
}

function putVoteUser(id,user,callback){
    voteService.vote(id, user ,callback);
}

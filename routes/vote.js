/**
 * Created by acer on 14-5-15.
 */
var http = require("http");
var URL = require('url');
var querystring = require('querystring');
var voteService = require('../service/voteService');


exports.vote = function (req,res){
    var articleKey =  req.param('articleKey');
    putVoteUser(articleKey,'jry',function(data){
        res.send(data);
    });
}

function calScore(){

}

function incVotes(){

}

function putVoteUser(id,user,callback){
    voteService.vote(id, user ,callback);
}

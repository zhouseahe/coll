/**
 * Created by acer on 14-5-15.
 */

var URL = require('url');
var querystring = require('querystring');
var voteDao = require('../dao/voteDAO');

var util = require('../common/util');

exports.vote = function (req,res){
    var arg = URL.parse(req.url).query;
    var articleKey = querystring.parse(arg).articleKey;
    var id = util.getId(articleKey);
    incVotes();
    calScore();
    putVoteUser(id,'shaohe');
    //res.render('result', { title: " 操作结果： ",result : data });
}

function calScore(){

}

function incVotes(){

}

function putVoteUser(id,user){
    voteDao.vote(id, user );
}

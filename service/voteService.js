/**
 * Created by acer on 14-5-15.
 */
var voteDao = require('../dao/voteDAO');
var util = require('../common/util');

exports.queryVote = function (articleId,callback){
    voteDao.queryVote(articleId,callback);
}

exports.vote = function (articleKey,userId ,callback){
    var key = util.getId(articleKey);
    voteDao.setVote(key,userId ,callback);
}
exports.remVote = function (articleId,userId ,callback){
    voteDao.remVote(articleId,userId ,callback);
}
exports.isVote = function (articleId,userId ,callback){
    voteDao.isVoted(articleId,userId ,callback);
}
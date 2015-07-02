/**
 * Created by   on 14-5-16.
 */
var commentDAO = require('../dao/commentDAO');
var util = require('../common/util');

exports.comment = function (articleKey,userId,comment ,callback){
    var key = util.getId(articleKey);
    commentDAO.setComment(key,userId , comment ,callback);
}

exports.queryComment = function (articlekey ,callback){
    var key = util.getId(articlekey);
    commentDAO.queryComments(key,callback);
}

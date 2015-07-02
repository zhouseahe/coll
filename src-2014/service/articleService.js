/**
 * Created by acer on 14-5-15.
 */
var articleDao = require('../dao/articleDAO');
var util = require('../common/util');

exports.queryArticle = function (callback){
    articleDao.query_article(callback);
}

exports.setArticle = function (article,callback){
    articleDao.set_article(article,callback);
}

exports.getArticle = function (articleKey , callback){
    var key = util.getId(articleKey);
    articleDao.get_article(articleKey,callback);
}

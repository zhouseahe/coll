/**
 * Created by acer on 14-5-14.
 */
var URL = require('url');
var querystring = require('querystring');
var articleService = require('../service/articleService');

exports.articleForm = function(req,res){
    res.render('article/articleForm', { title: 'post article' });
}

exports.articleSet = function(req,res){
    var arg = URL.parse(req.url).query;
    var title = querystring.parse(arg).title;
    var link =  querystring.parse(arg).link;
    var poster =  querystring.parse(arg).poster;
    var article = 'title:'+title +',link:'+link +",poster:" + poster;
    articleService.setArticle(article,function(data){
        res.render('result', { title: " 操作结果： ",result : data });
    });
}

exports.articleList = function(req,res){
    articleService.queryArticle(function(data){
        res.render('article/articleList', { title: " 所有文章： ",articles : data });
    });
}

exports.articleGet = function(req,res){
    var arg = URL.parse(req.url).query;
    var articleKey = querystring.parse(arg).articleKey;
    articleService.getArticle(articleKey,function(data){
        res.render('article/articleView', { title: " 文章 ",result : data ,articleKey :articleKey });
    });
}

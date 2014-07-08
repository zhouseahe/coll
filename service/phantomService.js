var fs = require("fs");
var phantom=require('node-phantom');
var Service = {};

Service.phantomJqplot = function (filepath ,callback){
    phantom.create(function(error,ph){
        if(error){
            console.log('phantom.create error happened !....');
        }
        ph.createPage(function(err, page){
            if(err){
                console.log('ph.createPage error happened !....');
            }
            page.onConsoleMessage = function (msg) {
                console.log('page console.log :  ' + msg);
            };
            page.onCallback = function(data){
                page.render(filepath);
                ph.exit();
                if(callback!=undefined){
                    callback(filepath);
                }
            };
            page.open("http://localhost:1988/phpage", function(err,status) {
                if(err){
                    console.log('open error : ' + err);
                }
                page.evaluate(function() {
                    return 'jqplot ok ';
                }, function(err,result) {
                });
            });
        });
    },{phantomPath:require('phantomjs').path});
}

module.exports = Service;
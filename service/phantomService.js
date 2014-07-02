var fs = require("fs");
var phantom=require('node-phantom');
var Service = {};

Service.phantomJqplot = function (callback){
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
            //page.viewportSize = { width: 400, height : 400 };
            //page.content = '<html><body><canvas id="surface"></canvas></body></html>'
            page.open("http://localhost:1988/", function(err,status) {
                if(err){
                    console.log('open error : ' + err);
                }
                setTimeout(function() {//加载页面上的js , 执行js
                    page.evaluate(function() {
                        //A good way is to populate an object with all the jQuery commands that you need and then return the object.
                        try{
                            //$("body").html('<div id="jqplotchart"></div>');
                            return 'jqplot ok ';
                        }catch(ex){
                            return 'error';
                        }
                    }, function(err,result) {
                        console.log('evaluate : ' + result);
                        page.render('export/ph/jqplot.png');
                        ph.exit();
                        if(callback!=undefined){
                            callback('export/ph/jqplot.png');
                        }
                    });
                },3000);
            });
        });
    });
}

module.exports = Service;
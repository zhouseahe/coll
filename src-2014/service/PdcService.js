var fs = require('fs');
var pdc = require('pdc');
var https = require('https');
var http = require('http');
// optional, if pandoc is not in PATH ,如果不配置环境变量， 可以指定到pandoc 可执行文件
//var path = require('path');
//pdc.path = path.resolve(process.env.HOME, '.cabal/bin/pandoc');
var Service = {};
//pandoc -o html.docx -t docx http://www.baidu.com  // docx 输出类型

Service.https2Docx = function(url,targetpath,callback){
    https.get(url).on('response', function(resp) {
        var pandoc = pdc.stream('html', 'docx', [ '-o',targetpath ]);
        resp.pipe(pandoc.stdin);
        callback();
    });
}

Service.http2Docx = function(url,targetpath,callback){
    http.get(url).on('response', function(resp) {
        var pandoc = pdc.stream('html', 'docx', [ '-o',targetpath ]);
        resp.pipe(pandoc.stdin);
        callback();
    });
}

Service.html2Docx = function(filepath,targetpath,callback){
    var rs = fs.createReadStream(filepath);
    var pandoc = pdc.stream('html', 'docx', [ '-o', targetpath ]);
    rs.pipe(pandoc.stdin);
}

Service.http2Docx('http://www.baidu.com','result.docx',function(){
    console.log(' ok ! ');
});

module.exports = Service;


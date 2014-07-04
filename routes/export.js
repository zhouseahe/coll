var http = require("http");
var fs = require("fs");
var docxService = require('../service/docxService');
var phantomService = require('../service/phantomservice/phantomService');

exports.docxStream = function (req, res, next) {
    var chart = req.param('chart') || 'chart';
    var filename = chart +'.docx';
    res.writeHead ( 200, {
        "Content-Type": "application/application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-disposition': 'attachment; filename='+filename
    });
    docxService.generatorDocxStream(res);

}

exports.phantomImage = function (req, res, next) {
    var chart = req.param('chart') || 'chart';
    var filename = chart +'.png';
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', 'image/png');
    phantomService.phantomJqplot(chart,filename,function(path){
        setTimeout(function(){
            var filestream = fs.createReadStream(path);
            filestream.on('data', function(chunk) {
                res.write(chunk);
            });
            filestream.on('end', function() {
                res.end();
            });
        },500);
    });
}

exports.jqplot = function(req,res){
    res.render('jqplot', {});
}

exports.phpage = function(req,res){
    res.render('phantom', { });
}
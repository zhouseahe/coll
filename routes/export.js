var http = require("http");
var fs = require("fs");
var docxService = require('../service/docxService');
var phantomService = require('../service/phantomService');

exports.docxStream = function (req, res, next) {
    var chart = req.param('chart') || 'chart';
    var filename = chart +'.docx';
    res.writeHead ( 200, {
        "Content-Type": "application/application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-disposition': 'attachment; filename='+filename
    });
    var fpath = 'export/ph/' + filename;
    docxService.generatorDocxStream(res,fpath);

}

exports.phantomImage = function (req, res, next) {
    var chart = req.param('chart') || 'chart';
    var filename = chart +'.png';
    /* 启用下载文件， 否则直接展现图片
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', 'image/png');
    */
    var fpath = 'export/ph/' + filename;
    phantomService.phantomJqplot(fpath,function(path){
        var filestream = fs.createReadStream(fpath);
        filestream.on('data', function(chunk) {
            res.write(chunk);
        });
        filestream.on('end', function() {
            res.end();
        });
    });
}

exports.jqplot = function(req,res){
    res.render('jqplot', {});
}

exports.phpage = function(req,res){
    res.render('phantom', { });
}
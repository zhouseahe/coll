var http = require("http");
var fs = require("fs");
var docxService = require('../service/docxService');
var phantomService = require('../service/phantomService');

exports.docxStream = function (req, res, next) {
    res.writeHead ( 200, {
        "Content-Type": "application/application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        'Content-disposition': 'attachment; filename=word.docx'
    });
    docxService.generatorDocxStream(res);

}

exports.pngFile = function (req, res, next) {
    res.setHeader('Content-disposition', 'attachment; filename=web.png');
    res.setHeader('Content-type', 'image/png');
    phantomService.phantomJqplot(function(path){
        var filestream = fs.createReadStream(path);
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
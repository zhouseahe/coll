var fs = require('fs');
var path = require('path');
var officegen = require('officegen');
var Service = {};

function insertHeader(docx ,head,style){
    var header = docx.createP ();
    header.options.align = 'center';
    if(style){
        header.addText (head, style );
    }else{
        header.addText (head,{ font_face: 'Arial', font_size: 40 } );
    }
}

function insertContentNumber(docx ,items  ){
    var body = docx.createP ();
    body.options.align = 'left';
    for(var idx in items){
        var item = items[idx];
        if(item.style){
            body.addText (item.text,item.style );
        }else{
            body.addText (item.text,{ font_face: 'Arial', font_size: 16 } );
        }
    }
}
function insertContent(docx ,content ,style ){
    var body = docx.createP ();
    body.options.align = 'left';
    if(style){
        body.addText (content, style );
    }else{
        body.addText (content,{ font_face: 'Arial', font_size: 16 } );
    }
}
function insertImg(docx,fpath,filename){
    var img = docx.createP ();
    img.addImage ( path.resolve( fpath ,filename ) );
}

/**
 *  docx 写入到磁盘， callback 读取返回到浏览器
 * @param callback
 */
Service.generatorDocxFile = function (callback){
    var docx = officegen ( 'docx' );
    docx.on ( 'finalize', function ( written ) {// 完成时 ，调用下载功能
        callback('export/feed.docx');
    });
    docx.on ( 'error', function ( err ) {// 错误时，callback 返回错误提示
        console.log ( err );
    });
    insertHeader(docx,'每日反馈',{ font_face: 'Arial', font_size: 40 });
    insertContent(docx , 'vps同学你好1：', { bold: true, underline: true , color: 'red'});
    insertContent(docx , '  经过一段时间的学习，您的成绩飞速提高，不过不要骄傲哦，继续努力！');
    //docx.putPageBreak ();
    insertImg(docx ,'export/',  'xdf.jpg');
    var out = fs.createWriteStream ( 'export/feed.docx' );// 打开可写入文件，
    out.on ( 'error', function ( err ) {
        console.log ( err );
    });
    docx.generate (out); //docx 写入文件
}

/**
 * 返回stream ， 不生成服务端文件
 * @param callback
 */
Service.generatorDocxStream = function (res){
    var docx = officegen ( 'docx' );
    docx.on ( 'finalize', function ( written ) {// 完成时 ，调用下载功能
        console.log('finished...');
    });
    docx.on ( 'error', function ( err ) {// 错误时，callback 返回错误提示
        console.log ( err );
    });
    insertHeader(docx,'每日反馈',{ font_face: 'Arial', font_size: 40 });
    insertContent(docx , '同学你好：', { bold: true, underline: true , color: 'red'});
    insertContent(docx , '  经过一段时间的学习，您的成绩飞速提高，不过不要骄傲哦，继续努力！');
    insertImg(docx ,'export/',  'xdf.jpg');
    docx.generate (res);
}
module.exports = Service;
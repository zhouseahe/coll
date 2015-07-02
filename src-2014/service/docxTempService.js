var DocXTemplater= require('docxtemplater');
var fs = require('fs');
var Service  = {};

function createDocx(template,target ,callback){
    //加载模板
    var docx=new DocXTemplater().loadFromFile(template);
    //结束事件
    docx.finishedCallback=function () {
        docx.output({name:target});
        callback();
    }
    return docx;
}

function docxTag(docx ,tags){
    //设置tag , 只能一次写入
    docx.setTags(tags);
}

function applyTags(docx){
    //替换tag
    docx.applyTags();
}

function docxImg(docx ,image,idx) {
    DocUtils.loadDoc(image,{docx:false});
    var imgData = docXData[image];
    var imageList=docx.getImageList();
    docx.setImage(imageList[idx].path,imgData); //change the first image to imgData
    //docXData["image.png"]=null;
}

function docxXML(docx ,target ,xml){
    docx.applyTags({complexXml:xml});
}

Service.generatorDocx = function(template,target ,callback){
    var tags ={};
    tags.class='初一二班';
    tags.times ='10';
    tags.student = 'zhoush';
    tags.teacher='ymh';
    tags.hd_rank='1/100';
    tags.bj_rank='1/10000';
    tags.advicea='1. You have do a good job in choice.';
    tags.adviceb='2. Your hands writing is poor.';

    /*// array ， if loop
     var adviceArr = new Array();
     adviceArr[0] = {advice:'1. You have do a good job in choice. '};
     adviceArr[1] = {advice:'2. Your hands writing is poor.'};
     tags.advices= adviceArr;


     */

    var image ="export/image/image.png";

    var docx = createDocx(template,target,callback);
    docxTag(docx,tags);
    docxImg(docx ,image , 1);
    applyTags(docx);

}

module.exports = Service;
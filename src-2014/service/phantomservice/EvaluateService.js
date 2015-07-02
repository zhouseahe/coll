var path = require('path');
var Service = {};

function evaluateBack(ph,page,filename ,callback){
    var imagepath ='export/ph/'+filename;
    page.render(imagepath);
    ph.exit();
    if(callback!=undefined){
        callback(imagepath);
    }
}

/**
 *  evalute 执行jqplot 脚本 生成图表 保存
 * @param ph
 * @param page
 * @param callback 插入图片的回调
 * @param filename 临时文件名称
 */
Service.chartHistogram = function (ph,page ,filename,callback){
    page.evaluate(function() {
        try{
            //  上下文不同， 无法抽取js 逻辑到模块 , 回调已经离开执行上下文 故可以回调，
            var line1= $("#pageArgs").val();
            var line = new Array();
            var items = line1.split('|');
            for(var idx in items){
                var item = items[idx];
                var pare = item.split(',');
                var l = new Array();
                l.push(pare[0],pare[1]);
                line.push(l);
            }
            line = [['Cup Holder Pinion Bob', 7], ['Generic Fog Lamp', 9], ['HDTV Receiver', 15],
                ['8 Track Control Module', 12], [' Sludge Pump Fourier Modulator', 3],
                ['Transcender/Spice Rack', 6], ['Hair Spray Danger Indicator', 18]];

            var plot = $.jqplot('jqplotchart', [line], {
                title: 'Concern vs. Occurrance',
                series:[{renderer:$.jqplot.BarRenderer}],
                axesDefaults: {
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                    tickOptions: {
                        fontFamily: 'Georgia',
                        fontSize: '10pt',
                        angle: -30
                    }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer
                    }
                }
            });
            return  'chart gen ok ';
        }catch(ex){
            return 'error : ' + ex;
        }
    }, function(err,result) {
        evaluateBack(ph,page,filename ,callback);
    });
}

Service.chartPie = function  (ph,page ,filename,callback){
    page.evaluate(function() {
        try{
            var data = [
                ['SAT', 12],['BEC', 9], ['GMAT', 14],
                ['GRE', 16],['CET', 7], ['IELTS', 9]
            ];
            var plot = $.jqplot('jqplotchart', [data],
                {
                    seriesDefaults: {
                        // Make this a pie chart.
                        renderer: $.jqplot.PieRenderer,
                        rendererOptions: {
                            // Put data labels on the pie slices.
                            // By default, labels show the percentage of the slice.
                            showDataLabels: true
                        }
                    },
                    legend: { show:true, location: 'e' }
                }
            );
            return  'chart gen ok ';
        }catch(ex){
            return 'error : ' + ex;
        }
    }, function(err,result) {
        evaluateBack(ph,page,filename ,callback);
    });
}

Service.chartDefault = function  (ph,page ,filename,callback){
    page.evaluate(function() {
        try{
            var cosPoints = [];
            for (var i=0; i<2*Math.PI; i+=0.1){
                cosPoints.push([i, Math.cos(i)]);
            }
            var plot = $.jqplot('jqplotchart', [cosPoints], {
                series:[{showMarker:false}],
                axes:{
                    xaxis:{
                        label:'Angle (radians)'
                    },
                    yaxis:{
                        label:'Cosine'
                    }
                }
            });

            return  'chart gen ok ';
        }catch(ex){
            return 'error : ' + ex;
        }
    }, function(err,result) {
        evaluateBack(ph,page,filename ,callback);
    });
}

module.exports = Service;

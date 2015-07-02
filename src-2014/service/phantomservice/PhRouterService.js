var evaluateService = require('../../service/phantomservice/EvaluateService');
var Service = {};

Service.router = function(ph ,page,chart ,filename,callback){
    switch(chart){
        case 'his':
            console.log( 'his');
            evaluateService.chartHistogram(ph ,page ,filename,callback);
            break;
        case 'pie':
            console.log( 'pie');
            evaluateService.chartPie(ph ,page ,filename,callback);
            break;
        default:
            console.log('default');
            evaluateService.chartDefault(ph ,page ,filename,callback);
    }
}

module.exports = Service;

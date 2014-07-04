var Service  = {}

Service.string2Array = function (pageArgs){
    var items = pageArgs.split('|');
    var line = new Array();
    for(var idx in items){
        var item = items[idx];
        var pare = item.split(',');
        var l = new Array();
        l.push(pare[0],pare[1]);
        line.push(l);
    }
    return line;
}

module.exports = Service;
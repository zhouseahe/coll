/**
 * Created by acer on 14-5-15.
 */

exports.getId = function (arg , sperator){
    if(arguments.length<2){
        return arg.split( ':')[1];
    }else{
        return arg.split(sperator)[1];
    }
}

exports.getCookieKey = function(cookies , key){
    var map =  cookies.split(';');
    var username ;
    for(var kv  in map){
        var p = map[kv].split('=');
        if(key==p[0].trim()){
           username = p[1];
        }
    }
    return username;
}
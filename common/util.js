/**
 * Created by acer on 14-5-15.
 */

exports.getId = function (arg , sperator){
    if(arguments.length<2){
        return arg.split( ':') [1];
    }else{
        return arg.split(sperator) [1];
    }

}
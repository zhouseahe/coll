/**
 * Created by acer on 14-5-22.
 */

exports.broadcast = function(map,msg){
    console.log('broadcast ....')
    for(var key in map ){
            map[key].sendUTF(msg);
    }
}
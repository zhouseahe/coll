/**
 * Created by acer on 14-5-18.
 */
 function refresh_(){
    window.location.reload();
}
// check data is online users
function isBroadUsers(msg){
    return msg.indexOf("wsXXon")>0;
}
//get all users
function parseUsers(msg){
    var list =  msg.split("wsXXon")[1];
    return list.split(',');
}
// user leave
function isLeaveUser(msg){
    return msg.indexOf("wsXXdn")>0;
}
function parseUser(msg){
    return msg.split("wsXXdn")[1];
}
function generatorList(users){
    var list = "" ;
    for(var idx in users){
        list += createItem(users[idx]);
    }
    return list;
}
//online user item
function createItem(username){
    return  "<li id='"+ username   +"' ><a href='#'" + "  id='"+ username   +"' >" + username +  "</a></li>";
}

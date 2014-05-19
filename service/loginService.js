/**
 * Created by acer on 14-5-19.
 */

var userDAO = require('../dao/userDAO');
var util = require('../common/util');

exports.addUser = function (username, password , callback){
    userDAO.set_user(username, password, callback);
}


exports.validUser = function (username, password , callback){
    userDAO.get_user(username, password, callback);
}
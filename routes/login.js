/**
 * Created by acer on 14-5-15.
 */
var loginService = require('../service/loginService');

exports.login = function (req, res){
    var username =  req.param('username');
    var password =  req.param('password');

    loginService.validUser(username,password , function (data){
        if(data == true){
            req.session.username = username;
            res.render('index', { title: ' Seahe Club' });
        }else {
            res.render('login', { title: ' Seahe Club' })
        }
    });


}

exports.toLogin = function(req, res){
    res.render('login', { title: ' Seahe Club' });
}

exports.logout = function(req, res){
    // it doesn't work ,  clear session should be done
    req.session.destroy();
    res.render('login', { title: ' Seahe Club' });
}
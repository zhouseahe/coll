/**
 * Created by acer on 14-5-15.
 */

exports.login = function (req, res){
    var username =  req.param('username');
    req.session.username = username;
    res.render('index', { title: ' Seahe Club' });
}

exports.toLogin = function(req, res){
    res.render('login', { title: ' Seahe Club' });
}

exports.logout = function(req, res){
    // it doesn't work ,  clear session should be done
    req.session.destroy();
    res.render('login', { title: ' Seahe Club' });
}
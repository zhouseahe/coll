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



exports.gen_session = function gen_session(user, res) {
    var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}
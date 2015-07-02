/**
 * Created by acer on 14-5-15.
 * more method should add
 */

exports.requirePoster = function checkAuth(req, res, next) {
    if (!req.session) {
        res.render('login', { title: 'login' });
    } else {
        next();
    }
}

exports.requireAdmin = function checkAuth(req, res, next) {
    if (!req.session) {
        res.render('login', { title: 'login' });
    } else {
        next();
    }
}


exports.requireUser = function checkAuth(req, res, next) {
    if (!req.session.username) {
        res.render('login', { title: 'login' });
    } else {
        next();
    }
}
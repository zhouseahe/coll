/**
 * Created by acer on 14-5-15.
 * more method should add
 */

exports.requirePoster = function checkAuth(req, res, next) {
    if (!req.session) {
        res.send(' you are not editor ' );
    } else {
        next();
    }
}

exports.requireAdmin = function checkAuth(req, res, next) {
    if (!req.session) {
        res.send(' you are not admin ' );
    } else {
        next();
    }
}


exports.requireUser = function checkAuth(req, res, next) {
    if (!req.session.username) {
        res.json({ login : '/toLogin'} );
    } else {
        next();
    }
}
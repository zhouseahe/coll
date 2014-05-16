/**
 * Created by acer on 14-5-15.
 */

exports.requirePoster = function checkAuth(req, res, next) {
    console.log(!req.session);
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
    if (!req.session) {
        res.render('login', { title: ' Seahe Club login' } );
    } else {
        next();
    }
}
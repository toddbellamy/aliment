var passport = require('passport');

exports.authenticate = function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function(err, user) {
        if(err) {return next(err);}
        if(!user) { res.send({success:false})}
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            res.send({success:true, user: user});
        })
    })
    auth(req, res, next);
};

exports.requiresApiLogin = function() {
    return function(req, res, next) {
        if (!req.isAuthenticated() && (
             req.path.indexOf('/account') < 0 && req.path.indexOf('/main') < 0
            )) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};

exports.requiresRole = function(roles) {
    return function(req, res, next) {
        var inrole = false;
        roles.forEach(function(role) {
            if(req.user.roles.indexOf(role) >= 0) {
                inrole = true;
            }
        });

        if(!req.isAuthenticated() || !inrole) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
}
var User = require('mongoose').model('User'),
    encrypt = require('../util/encryption');

exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};


exports.getUser = function(req, res) {
    var query = (req.params.id == 0 ? {} : {_id:req.params.id});

    User.find(query).exec(function(err, collection) {
        res.send(collection[0]);
    });

    return {};
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.userName = userData.userName.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(user);
    })
};

exports.updateUser = function(req, res) {
    var updateUser = req.body;

    if(req.user._id != updateUser._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    if(updateUser.password && updateUser.password.length > 0) {
        updateUser.salt = encrypt.createSalt();
        updateUser.hashed_pwd = encrypt.hashPwd(updateUser.salt, updateUser.password);
    }
    User.update({_id:updateUser._id}, updateUser, function(err) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(updateUser);
    });
};
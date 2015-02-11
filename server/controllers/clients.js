
var Client = require('mongoose').model('Client');

exports.getClient = function(req, res) {
     var query = (req.params.id == 0 ? {} : {_id:req.params.id});

     Client.find(query).exec(function(err, collection) {
        res.send(collection[0]);
    });

    return {};
};

exports.getClients = function(req, res) {

    if(req.query.id) {
        Client.find({_id:req.query.id}).exec(function(err, collection) {
            res.send(collection);
        });
    }
    else {
        Client.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    }

    return {};
};

exports.saveClient = function(req, res) {
    var clientData = req.body;
    var updateData = {
        lastName:clientData.lastName,
        firstName:clientData.firstName,
        dateOfBirth:clientData.dateOfBirth
    };

    if (!clientData._id) {
        Client.create(updateData, function(err, client) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate Client');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }
            return res.send(client);
        });
    }
    else {
        Client.update({_id: clientData._id}, updateData, function (err) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate Client');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }
            return res.status(200).end();
        });
    }
};

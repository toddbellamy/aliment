
var Client = require('mongoose').model('Client');

exports.getClient = function(req, res) {
     var query = (req.params.id == 0 ? {} : {_id:req.params.id});

     Client.find(query).exec(function(err, collection) {
        res.send(collection[0]);
    });

    return {};
};

var getClientsPaged = function(req, res) {
    var page = req.query.page, size = req.query.size;
    var query, innerQuery;

    if(req.query.filter) {
        query = Client.find({ lastName: { $regex : req.query.filter }});
        innerQuery = Client.find({ lastName: { $regex : req.query.filter }});
    }
    else {
        query = Client.find({});
        innerQuery = Client.find({});
    }

    if(req.query.sort == 'name') {
      innerQuery = innerQuery.sort( { "lastName":1, "firstName":1} );
    }
    else if(req.query.sort == 'dateOfBirth') {
        innerQuery = innerQuery.sort( { "dateOfBirth":1} );
    }

    query.count(function(err, count) {
        innerQuery.skip((page-1) * size).limit(size)
            .populate('family', 'address1 city')
            .exec(function(err, collection) {
                res.set({ TotalRowCount:count });
                res.send(collection);
            });
    });


};

exports.getClients = function(req, res) {

    if(req.query.id) {
        Client.find({_id:req.query.id}).exec(function(err, collection) {
            res.send(collection);
        });
    }
    else if (req.query.page && req.query.size) {
        getClientsPaged(req, res);
    }
    else {
        Client.find({})
        .populate('family', 'address1 city')
        .exec(function(err, collection) {
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

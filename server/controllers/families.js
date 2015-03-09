
var Family = require('mongoose').model('Family');
var Client = require('mongoose').model('Client');

exports.getFamily = function(req, res) {
    var query = (req.params.id == 0 ? {} : {_id:req.params.id});

    Family.findOne(query)
        .populate('primaryClient')
        .populate('clients')
        .exec(function(err, document) {

            res.send(document);
    });

    return {};
};

exports.getFamilies = function(req, res) {

    if(req.query.id) {
        Family.find({_id:req.query.id})
            .populate('primaryClient')
            .exec(function(err, collection) {
            res.send(collection);
        });
    }
    else if (req.query.page && req.query.size) {
        getFamiliesPaged(req, res);
    }
    else {
        Family.find({}).populate('primaryClient')
            .exec(function (err, collection) {
            res.send(collection);
        });
    }

    return {};
};


var getFamiliesPaged = function(req, res) {
    var page = req.query.page, size = req.query.size;
    var query, innerQuery;

    if(req.query.filter) {

        Client.find({ lastName: { $regex : req.query.filter }})
            .select('_id')
            .exec(function(err, clients) {

                query = Family.find({}).where('primaryClient').in(clients);
                innerQuery = Family.find({}).where('primaryClient').in(clients);
                getFamilies();
            });

    }
    else {
        query = Family.find({});
        innerQuery = Family.find({});
        getFamilies();
    }

    function getFamilies() {

        if (req.query.sort == 'lastName') {
            innerQuery = innerQuery.sort({"lastName": 1});
        }
        else if (req.query.sort == 'dateAdded') {
            innerQuery = innerQuery.sort({"dateAdded": 1});
        }
        else if (req.query.sort == 'address1') {
            innerQuery = innerQuery.sort({"address1": 1});
        }
        else if (req.query.sort == 'phone1') {
            innerQuery = innerQuery.sort({"phone1": 1});
        }

        query.count(function (err, count) {
            innerQuery.skip((page - 1) * size).limit(size)
                .populate('primaryClient')
                .exec(function (err, collection) {
                    res.set({TotalRowCount: count});
                    res.send(collection);
                });
        });
    };
};

exports.saveFamily = function(req, res) {

    var data = req.body;

    var family = {
        familyStatus:data.familyStatus,
        lastName:data.primaryClient.lastName,
        dateAdded:data.dateAdded,
        address1:data.address1,
        address2:data.address2,
        city:data.city,
        province:data.province,
        postal:data.postal,
        phone1:data.phone1,
        totalMonthlyExpenses:data.totalMonthlyExpenses,
        totalMonthlyIncome:data.totalMonthlyIncome,
        proofOfIncomeProvided:data.proofOfIncomeProvided,
        proofOfExpensesProvided:data.proofOfExpensesProvided,
        proofOfAddressProvided:data.proofOfAddressProvided,
        registeredDate:data.registeredDate,
        clients:[]
    };

    var handleError = function(err) {
        if (err.toString().indexOf('E11000') > -1) {
            err = new Error('Duplicate Family');
        }
        res.status(400);
        return res.send({reason: err.toString()});
    };

    var saveFamily = function() {
        if (data._id) {

            Family.update({_id: data._id}, family, function (err) {
                if (err) {
                    return handleError(err);
                }
                Family.findOne({_id:data._id})
                    .populate('primaryClient')
                    .populate('clients')
                    .exec(function(err, savedFamily) {
                        res.status(200);
                        res.send(savedFamily);
                    });

            });
        }
        else {
            Family.create(family, function(err, savedFamily) {
                if (err) {
                    return handleError(err);
                }
                savedFamily.populate('clients primaryClient', function(err, doc) {

                    savedFamily.clients.forEach(function(client) {
                        client.family = savedFamily._id;
                        client.save(function(err) {
                            var e = err;
                        });
                    });

                    return res.send(savedFamily);
                });

            });
        }
    };

    data.clients.forEach(function(client) {

        if (!client._id || client._id == 0) {
            Client.create({family:data._id, lastName:client.lastName, firstName:client.firstName, dateOfBirth:client.dateOfBirth}, function(err, savedClient) {
                if (err) {
                    return handleError(err);
                }

                if(data.primaryClient._id  == 0 &&
                    data.primaryClient.lastName == client.lastName && data.primaryClient.firstName == client.firstName) {
                    family.primaryClient = savedClient._id;
                }
                family.clients.push(savedClient._id);
                if(family.clients.length === data.clients.length) {
                    saveFamily();
                }
            });
        }
        else {
            Client.update({_id: client._id}, client, function (err) {
                if (err) {
                    handleError(err);
                }

                if(data.primaryClient._id  == client._id) {
                    family.primaryClient = client._id;
                }
                family.clients.push(client._id);
                if(family.clients.length === data.clients.length) {
                    saveFamily();
                }
            });
        }
    });

};

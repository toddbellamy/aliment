
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
    else {
        Family.find({}).populate('primaryClient')
            .exec(function (err, collection) {
            res.send(collection);
        });
    }

    return {};
};

exports.saveFamily = function(req, res) {

    var data = req.body;

    var family = {
        familyStatus:data.familyStatus,
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


var Family = require('mongoose').model('Family');

exports.getFamily = function(req, res) {
    var query = (req.params.id == 0 ? {} : {_id:req.params.id});

    Family.find(query).exec(function(err, collection) {
        res.send(collection[0]);
    });

    return {};
};

exports.getFamilies = function(req, res) {

    if(req.query.id) {
        Family.find({_id:req.query.id}).exec(function(err, collection) {
            res.send(collection);
        });
    }
    else {
        Family.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    }

    return {};
};

exports.saveFamily = function(req, res) {
    var familyData = req.body;
    var updateData = {
        familyStatus:familyData.familyStatus,
        dateAdded:familyData.dateAdded,
        address1:familyData.address1,
        address2:familyData.address2,
        city:familyData.city,
        province:familyData.province,
        postal:familyData.postal,
        phone1:familyData.phone1,
        totalMonthlyExpenses:familyData.totalMonthlyExpenses,
        totalMonthlyIncome:familyData.totalMonthlyIncome,
        proofOfIncomeProvided:familyData.proofOfIncomeProvided,
        proofOfExpensesProvided:familyData.proofOfExpensesProvided,
        proofOfAddressProvided:familyData.proofOfAddressProvided,
        registeredDate:familyData.registeredDate
    };

    if (!familyData._id) {
        Family.create(updateData, function(err, family) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate Family');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }
            return res.send(family);
        });
    }
    else {
        Family.update({_id: familyData._id}, updateData, function (err) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate Family');
                }
                res.status(400);
                return res.send({reason: err.toString()});
            }
            return res.status(200).end();
        });
    }
};

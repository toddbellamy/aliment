
var Family = require('mongoose').model('Family');
var Visit = require('mongoose').model('Visit');

var loadAndSendFamily = function(res, query) {

    return Family.findOne(query)
        .populate('primaryClient')
        .populate('clients')
        .populate('visits')
        .exec(function(err, family) {
            if(family.visits && family.visits.length > 0) {
                var popCount = 0;
                family.visits.forEach(function (visit) {
                    visit.populate(['verification', 'client', 'approvedBy'], function (err) {
                        popCount += 1;
                        if (popCount == family.visits.length) {
                            res.send(family);
                        }
                    });
                });
            }
            else {
                res.send(family);
            }
        });
};


exports.getFamilyWithVisits = function(req, res) {
    var query = (req.params.id == 0 ? {} : {_id:req.params.id});
    loadAndSendFamily(res, query);

    return {};
};

exports.saveVisits = function(req, res) {

    var handleError = function (err) {
        if (err.toString().indexOf('E11000') > -1) {
            err = new Error('Duplicate Family');
        }
        res.status(400);
        return res.send({reason: err.toString()});
    };

    try {
        var data = req.body;

        var family = {
            visits: []
        };

        var saveFamily = function (res) {

            Family.update({_id: data._id}, family, function (err) {
                if (err) {
                    return handleError(err);
                }

                loadAndSendFamily(res, {_id: data._id});
            });
        };

        data.visits.forEach(function (visitData) {

            var visit = {
                date: visitData.date,
                value: visitData.value,
                storeVoucher: visitData.storeVoucher,
                reusableBagGiven: visitData.reusableBagGiven,
                comments: visitData.comments,
                verification: visitData.verification._id,
                foodVoucher: visitData.foodVoucher,
                client: visitData.client._id
            };

            if (visitData.approvedBy) {
                visit.approvedBy = visitData.approvedBy._id;
            }

            if (!visitData._id || visitData._id == 0) {
                Visit.create(visit, function (err, savedVisit) {

                    if (err) {
                        handleError(err);
                    }

                    family.visits.push(savedVisit._id);
                    if (family.visits.length == data.visits.length) {
                        saveFamily(res);
                    }
                });
            }
            else {
                Visit.update({_id: visitData._id}, visit, function (err) {

                    if (err) {
                        handleError(err);
                    }

                    family.visits.push(visitData._id);
                    if (family.visits.length == data.visits.length) {
                        saveFamily(res);
                    }
                });
            }
        });
    }
    catch(e) {
        handleError(e);
    }
};

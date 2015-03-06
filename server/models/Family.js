var mongoose = require('mongoose'),
    seedmock = require('../util/seedmock');

var familySchema = mongoose.Schema({
    familyStatus: {type:String, required:'{PATH} is required!' },
    dateAdded: {type: Date, required: '{PATH} is required!' },
    address1: {type: String, required: '{PATH} is required' },
    address2: {type: String, default:'' },
    city: {type: String },
    province: {type: String },
    postal: {type: String, required:'{PATH} is required', match: /([ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9])/ },
    phone1: {type: String },
    phone2: {type: String },
    totalMonthlyExpenses: {type: Number, min:0, max:4000 },
    totalMonthlyIncome: {type: Number, min:0, max:4000 },
    proofOfIncomeProvided: {type: Boolean, required: '{PATH} is required!'},
    proofOfExpensesProvided: {type: Boolean, Boolean: '{PATH} is required!'},
    proofOfAddressProvided: {type: Boolean, required: '{PATH} is required!'},
    registeredDate: {type: Date },
    clients: [{ type: mongoose.Schema.ObjectId, ref: 'Client' }],
    primaryClient: { type: mongoose.Schema.ObjectId, ref: 'Client'},
    visits: [{ type:mongoose.Schema.ObjectId, ref:'Visit' }]
});

var Family = mongoose.model('Family', familySchema);
var Visit = mongoose.model('Visit');
var Client = mongoose.model('Client');


function buildMockData() {

    Family.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            var familyData = seedmock.getdata();
            familyData.forEach(function (fd) {

                Family.create(fd, function (err, family) {
                    if (family) {

                        family.clients = [];


                        Client.create(fd.clientData, function (err) {
                            for(var i=1; i<arguments.length; i++) {
                                var client = arguments[i];
                                family.clients.push(client);
                                client.family = family;
                                client.save();
                            }
                            var primaryClient = arguments[1];
                            family.primaryClient = primaryClient;

                            family.save(function (err, family) {
                                fd.visitData.forEach(function(v) {
                                    v.client = primaryClient;
                                });

                                Visit.create(fd.visitData, function (err) {
                                    for(var i=1; i<arguments.length; i++) {
                                        var visit = arguments[i];
                                        family.visits.push(visit);
                                    }

                                    family.save(function(err) {
                                        var e = err;
                                    });
                                });
                            });
                        });
                    }
                });
            });
        }
    });
}
exports.buildMockData = buildMockData;

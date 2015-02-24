var mongoose = require('mongoose'),
    seedmock = require('../util/seedmock');

var familySchema = mongoose.Schema({
    familyStatus: {type:String, required:'{PATH} is required!'},
    dateAdded: {type: Date, required: '{PATH} is required!'},
    address1: {type: String, required: '{PATH} is required' },
    address2: {type: String, default:'' },
    city: {type: String },
    province: {type: String },
    postal: {type: String },
    phone1: {type: String },
    phone2: {type: String, default:'' },
    totalMonthlyExpenses: {type: Number },
    totalMonthlyIncome: {type: Number },
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

                               // fd.visitData.forEach(function (vd) {
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
                               // });
                            });
                        });
                    }
                });
            });
        }
    });
}
exports.buildMockData = buildMockData;

function createMockFamilies() {
    Family.find({}).exec(function(err, collection) {
        if(collection.length === 0) {

            Family.create({
                familyStatus: 'Family',
                dateAdded: new Date('10/5/2013').toISOString(),
                address1: '10 Maple St',
                address2: 'Apt A',
                city: 'Oshawa',
                province: 'ON',
                postal: 'L1L 1L1',
                phone1: '9057771234',
                totalMonthlyExpenses: 1150.00,
                totalMonthlyIncome: 1275.00,
                proofOfIncomeProvided: true,
                proofOfExpensesProvided: true,
                proofOfAddressProvided: true,
                registeredDate: new Date('10/5/2013').toISOString()
            }, function(err, family) {
                if(family) {

                    var clients = [{
                        firstName: 'John', lastName: 'Smith', dateOfBirth: new Date('10/10/1977').toISOString()
                    }, {
                        firstName: 'Jane', lastName: 'Smith', dateOfBirth: new Date('9/5/1979').toISOString()
                    },{
                        firstName: 'Billy', lastName: 'Smith', dateOfBirth: new Date('5/5/2010').toISOString()
                    }];

                    Client.create(clients, function (err) {
                        family.clients = [];
                        for(var i=1; i<arguments.length; i++) {
                            var client = arguments[i];
                            family.clients.push(client);
                            client.family = family;
                            client.save();
                        }
                        var primaryClient = arguments[1];
                        family.primaryClient = arguments[1];
                        family.save(function(err, family) {
                            var error = err;


                            var visits = [{
                                    date: new Date('1/12/2013').toISOString(), value: 18.00, reusableBagGiven:false, verification: 'Joan', storeVoucher:'', comments:'', foodVoucher:'', approvedBy:'',
                                    client: primaryClient //, family:family
                                }, {
                                    date: new Date('3/8/2012').toISOString(), value: 12.00, reusableBagGiven:false, verification: 'Mary', storeVoucher:'', comments:'', foodVoucher:'', approvedBy:'',
                                    client: primaryClient //, family:family
                                }, {
                                    date: new Date('7/15/2013').toISOString(), value: 20.00, reusableBagGiven:false, verification: 'Joan', storeVoucher:'', comments:'', foodVoucher:'', approvedBy:'',
                                    client: primaryClient //, family:family
                                }];

                            Visit.create(visits, function(err) {
                                family.visits = [];
                                primaryClient.visits = [];
                                for(var i=1; i<arguments.length; i++) {
                                    var visit = arguments[i];
                                    family.visits.push(visit);
                                    //primaryClient.visits.push(visit);
                                }

                                family.save(function(err) {
                                    var e = err;
                                });

                                //primaryClient.save(function(err) {
                                //    var e = err;
                                //});
                            });
                        });
                    });
                }
            });
        }
    });
}

exports.createMockFamilies = createMockFamilies;
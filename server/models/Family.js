var mongoose = require('mongoose');

var familySchema = mongoose.Schema({
    familyStatus: {type:String, required:'{PATH} is required!'},
    dateAdded: {type: Date, required: '{PATH} is required!'},
    address1: {type: String },
    address2: {type: String },
    city: {type: String },
    province: {type: String },
    postal: {type: String },
    phone1: {type: String },
    phone2: {type: String },
    totalMonthlyExpenses: {type: Number },
    totalMonthlyIncome: {type: Number },
    proofOfIncomeProvided: {type: Boolean, required: '{PATH} is required!'},
    proofOfExpensesProvided: {type: Boolean, Boolean: '{PATH} is required!'},
    proofOfAddressProvided: {type: Boolean, required: '{PATH} is required!'},
    registeredDate: {type: Date },
    clients: [{ type: mongoose.Schema.ObjectId, ref: 'Client' }],
    primaryClient: { type: mongoose.Schema.ObjectId, ref: 'Client'}
});

var Family = mongoose.model('Family', familySchema);
var Client = mongoose.model('Client');

function createMockFamilies() {
    Family.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Client.where({lastName:'Smith', firstName:'John'}).findOne(function(error, primaryClient) {
                Client.where({lastName:'Smith'}).find(function(error, famClients) {

                    Family.create({
                        familyStatus: 'Family',
                        dateAdded: new Date('10/5/2013'),
                        address1: '10 Maple St',
                        address2: 'Apt A',
                        city: 'Oshawa',
                        province: 'ON',
                        postal: 'L1L 1L1',
                        phone1: '905 777 1234',
                        totalMonthlyExpenses: 1150.00,
                        totalMonthlyIncome: 1275.00,
                        proofOfIncomeProvided: true,
                        proofOfExpensesProvided: true,
                        proofOfAddressProvided: true,
                        registeredDate: Date('10/5/2013'),
                        clients: [famClients[0]._id, famClients[1]._id, famClients[2]._id ],
                        primaryClient: primaryClient._id
                    });
                });
            });
        }
    });
}

exports.createMockFamilies = createMockFamilies;
var mongoose = require('mongoose');

var visitSchema = mongoose.Schema({
    date: {type: Date, required: '{PATH} is required!'},
    value: {type: Number },
    storeVoucher: {type: String },
    reusableBagGiven: {type: Boolean },
    comments: {type: String },
    verification: {type: String, required: '{PATH} is required!'},
    foodVoucher: {type: String },
    approvedBy: {type: String },
    client : { type: mongoose.Schema.ObjectId, ref: 'Client' }
    //family: { type: mongoose.Schema.ObjectId, ref: 'Family' }
});

var Visit = mongoose.model('Visit', visitSchema);

//var Client = mongoose.model('Client');
//
//function createMockVisits() {
//    Visit.find({}).exec(function(err, collection) {
//       if(collection.length === 0) {
//           Client.where({lastName: 'Smith', firstName: 'John'}).findOne(function (error, visitClient) {
//               Visit.create({
//                   date: Date('1/12/2013'),
//                   value: 18.00,
//                   reusableBagGiven:false,
//                   verification: 'Joan',
//                   client: visitClient._id
//               });
//               Visit.create({
//                   date: Date('3/8/2012'),
//                   value: 12.00,
//                   reusableBagGiven:false,
//                   verification: 'Mary',
//                   client: visitClient._id
//               });
//               Visit.create({
//                   date: Date('7/15/2013'),
//                   value: 20.00,
//                   reusableBagGiven:false,
//                   verification: 'Joan',
//                   client: visitClient._id
//               });
//
//           });
//       }
//    });
//}
//
//exports.createMockVisits = createMockVisits;
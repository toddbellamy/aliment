var mongoose = require('mongoose');

var visitSchema = mongoose.Schema({
    date: {type: Date, required: '{PATH} is required!'},
    value: {type: Number },
    storeVoucher: {type: String },
    reusableBagGiven: {type: Boolean },
    comments: {type: String },
    verification: { type: mongoose.Schema.ObjectId, ref: 'User', required: '{PATH} is required!'},
    foodVoucher: {type: String },
    approvedBy: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    client : { type: mongoose.Schema.ObjectId, ref: 'Client' }

});

var Visit = mongoose.model('Visit', visitSchema);

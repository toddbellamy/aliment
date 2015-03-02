var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    dateOfBirth: {type: Date },
    family: { type:mongoose.Schema.ObjectId, ref:'Family' }
});

var Client = mongoose.model('Client', clientSchema);

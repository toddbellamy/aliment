var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    dateOfBirth: {type: Date },
    visits: [{ type:mongoose.Schema.ObjectId, ref:'Visit' }]
});

var Client = mongoose.model('Client', clientSchema);

function createMockClients() {
    Client.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            console.log('Attempting to create mock clients...');
            Client.create({
                firstName: 'John',
                lastName: 'Smith',
                dateOfBirth: Date('10/10/1977')
            });
            Client.create({
                firstName: 'Jane',
                lastName: 'Smith',
                dateOfBirth: Date('9/5/1979')
            });
            Client.create({
                firstName: 'Billy',
                lastName: 'Smith',
                dateOfBirth: Date('5/5/2010')
            });
        }
    });
}

exports.createMockClients = createMockClients;
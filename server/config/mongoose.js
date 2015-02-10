var mongoose = require('mongoose'),
    clientModel = require('../models/Client'),
    familyModel = require('../models/Family'),
    visitModel = require('../models/Visit');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('aliment db opened');
    });

    clientModel.createMockClients();
    familyModel.createMockFamilies();
    visitModel.createMockVisits();
};


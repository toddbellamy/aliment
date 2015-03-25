
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/aliment',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        demoMode:process.env.DEMO
    },
    production: {
        db: 'mongodb://neilpeart:Anthem74@ds051831.mongolab.com:51831/aliment',
        rootPath: rootPath,
        port: process.env.PORT || 80,
        demoMode:process.env.DEMO
    }
}
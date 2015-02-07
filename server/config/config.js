
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/alimen',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://toddbellamy:alimen@ds000000.mongolab.com:00000/alimen',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
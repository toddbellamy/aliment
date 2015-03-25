var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];
var appserver;

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, config);

var boot = function() {
    appserver = app.listen(config.port);
    console.log('Listening on port ' + config.port + '...');
    console.log('DEMO:' + process.env.DEMO);
    app.demoMode = process.env.DEMO;
};

var shutdown = function() {
    appserver.close();
};

if(require.main === module) {
    boot();
}
else {
    console.log('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = config.port;
}
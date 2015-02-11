//var auth = require('./auth'),
//    users = require('../controllers/users'),
var clients = require('../controllers/clients'),
    families = require('../controllers/families');
//    mongoose = require('mongoose'),
//    User = mongoose.model('User');

module.exports = function(app) {

    //app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    //app.post('/api/users', users.createUser);
    //app.put('/api/users', users.updateUser);

    app.get('/api/clients/:id', clients.getClient);
    app.get('/api/clients/', clients.getClients);
    app.post('/api/clients/:id', clients.saveClient);

    app.get('/api/families/:id', families.getFamily);
    app.get('/api/families/', families.getFamilies);
    app.post('/api/families/:id', families.saveFamily);


    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

//    app.post('/login', auth.authentication);
    app.post('logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};

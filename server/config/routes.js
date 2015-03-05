var mongoose = require('mongoose'),
    auth = require('../config/auth'),
    users = require('../controllers/users'),
    clients = require('../controllers/clients'),
    families = require('../controllers/families');
    visits = require('../controllers/visits');
    User = mongoose.model('User');

module.exports = function(app, req, res) {

    app.get('/api/users/:id', auth.requiresRole('admin'), users.getUser);
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/clients/:id', clients.getClient);
    app.get('/api/clients/', clients.getClients);
    app.post('/api/clients/:id', clients.saveClient);
    app.post('/api/clients/', clients.saveClient);


    app.get('/api/families/:id', auth.requiresApiLogin(), families.getFamily);
    app.get('/api/families/', auth.requiresApiLogin(), families.getFamilies);
    app.post('/api/families/:id', families.saveFamily);
    app.post('/api/families/', families.saveFamily);

    app.get('/api/visits/:id', visits.getFamilyWithVisits);
    app.post('/api/visits/:id', visits.saveVisits);


    app.get('/partials/*', auth.requiresApiLogin(), function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
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

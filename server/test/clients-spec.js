var boot = require('../../server').boot,
    shutdown = require('../../server').shutdown,
    port = require('../../server').port,
    superagent = require('superagent'),
    expect = require('expect.js'),
    basepath = 'http://localhost:' + port;

describe('server', function() {
    before(function () {
        boot();
    });

    describe('getClient', function () {
        it('should get return ok response with a single client object', function (done) {
            superagent
                .get(basepath + '/api/clients/0')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body._id.length).to.eql(24);
                    done();
                });
        });
    });

    describe('getClients', function () {
        it('should get a array of client objects', function (done) {
            superagent
                .get(basepath + '/api/clients/')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.not.be.empty();
                    expect(res.body[0]._id.length).to.eql(24);

                    done();
                });
        });
    });

    describe('getClientsPaged', function() {
        it('should get a page worth of client objects', function(done) {
            superagent
                .get(basepath + '/api/clients?page=3&size=12')
                .end(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.not.be.empty();
                    expect(res.body.length).to.eql(12);

                    done();
                });
        });
    });


    describe('saveClient', function() {
        var client = null;
        before(function(done) {
            superagent
                .get(basepath + '/api/clients/0')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(typeof res.body).to.eql('object');
                    client = res.body;
                    done();
                });
        });

        it('should accept client update and return ok response', function(done) {
            console.log('dob was: ' + client.dateOfBirth);
            var dob = new Date(client.dateOfBirth);
            dob.setFullYear(dob.getFullYear() - 1);
            client.dateOfBirth = dob;
            console.log('dob is now: ' + client.dateOfBirth);
            var updatedDateOfBirth = client.dateOfBirth;
            superagent
                .post(basepath + '/api/clients/')
                .send(client)
                .end(function (res) {
                    expect(res.status).to.equal(200);

                    superagent
                        .get(basepath + '/api/clients/' + client._id)
                        .end(function (res) {
                            expect(res.status).to.equal(200);
                            expect(typeof res.body).to.eql('object');
                            var updatedClient = res.body;
                            expect(updatedClient.dateOfBirth === updatedDateOfBirth)
                            done();
                        });
                });
        });
    });

    after(function () {
        shutdown();
    });
});
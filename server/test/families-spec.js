var boot = require('../../server').boot,
    shutdown = require('../../server').shutdown,
    port = require('../../server').port,
    superagent = require('superagent'),
    expect = require('expect.js'),
    basepath = 'http://localhost:' + port,
    now = new Date();

describe('server', function() {
    before(function () {
        boot();
    });

    describe('getFamily', function () {
        it('should get a single family that has visits and clients', function (done) {
            superagent
                .get(basepath + '/api/families/0')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body._id.length).to.eql(24);
                    expect(res.body).to.have.property('visits');
                    expect(res.body).to.have.property('clients');

                    done();
                });
        });
    });

    describe('getFamilies', function () {
        it('should get a array of family objects', function (done) {
            superagent
                .get(basepath + '/api/families/')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.not.be.empty();
                    expect(res.body[0]._id.length).to.eql(24);

                    done();
                });
        });
    });

    describe('getFamiliesPaged', function() {
        it('should get a page worth of family objects', function(done) {
            superagent
                .get(basepath + '/api/families?page=3&size=12')
                .end(function(res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.not.be.empty();
                    expect(res.body.length).to.eql(12);

                    done();
                });
        });
    });

    describe('getFamiliesFiltered', function () {
        var term = 'S';
        it('should get a array of family objects filtered by primaryClient lastName', function (done) {
            superagent
                .get(basepath + "/api/families?page=1&size=12&filter=" + term)
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.not.be.empty();
                    var family  = res.body[0];
                    expect(family.primaryClient.lastName.indexOf(term) === 0);

                    done();
                });
        });
    });

    describe('saveFamily', function() {
        var family = null;
        before(function(done) {
            superagent
                .get(basepath + '/api/families/0')
                .end(function (res) {
                    expect(typeof res.body).to.eql('object');
                    family = res.body;
                    done();
                });
        });

        it('should accept family update and return ok response with updated value', function(done) {
            family.totalMonthlyExpenses += 1;
            var updatedValue = family.totalMonthlyExpenses;
            superagent
                .post(basepath + '/api/families/')
                .send(family)
                .end(function (res) {
                    expect(res.status).to.equal(200);

                    superagent
                        .get(basepath + '/api/families/' + family._id)
                        .end(function (res) {
                            expect(typeof res.body).to.eql('object');
                            var updatedFamily = res.body;
                            expect(updatedFamily.totalMonthlyExpenses === updatedValue)
                            done();
                        });
                });
        });
    });

    describe('saveFamilyWithAddedClient', function() {
        var family = null;
        before(function(done) {
            superagent
                .get(basepath + '/api/families/0')
                .end(function (res) {
                    expect(typeof res.body).to.eql('object');
                    family = res.body;
                    done();
                });
        });

        it('should accept family updated with added client and return ok response', function(done) {

            var prevClientCount = family.clients.length;
            var newClient = {
                _id:'000000000000000000000000',
                firstName: 'Jane_' + now.getHours() + now.getMinutes() + now.getSeconds(),
                lastName: family.primaryClient.lastName,
                dateOfBirth: new Date()
            };
            family.clients.push(newClient);

            superagent
                .post(basepath + '/api/families/')
                .send(family)
                .end(function (res) {
                    expect(res.status).to.equal(200);

                    superagent
                        .get(basepath + '/api/families/' + family._id)
                        .end(function (res) {
                            expect(typeof res.body).to.eql('object');
                            var updatedFamily = res.body;
                            expect(updatedFamily.clients.length === (prevClientCount + 1));
                            done();
                        });
                });
        });
    });

    describe('saveFamilyWithChangedPrimaryClient', function() {
        var family = null, pageIndex = 1;

        var getAFamily = function(gotFamily) {

            return superagent
                .get(basepath + '/api/families?page=' + pageIndex + '&size=3')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.not.be.empty();
                    var famTemp = res.body[0];
                    if(famTemp.clients.length < 3 || (famTemp.primaryClient._id == famTemp.clients[famTemp.clients.length-1])) {
                        pageIndex++;
                        getAFamily(gotFamily);
                    }
                    else {
                        var fid = res.body[0]._id;
                        superagent
                            .get(basepath + '/api/families/' + fid)
                            .end(function (res) {
                                expect(res.status).to.equal(200);
                                expect(res.body._id.length).to.eql(24);
                                family = res.body;
                                gotFamily();
                            });
                    }
                });
        };

        before(function(done) {

            getAFamily(function() {
                console.log('got fam!');
                done();
            });

        });

        it('should accept family updated with changed primary client and return ok response', function(done) {
            var prevPrimaryClient = family.primaryClient;
            family.primaryClient = family.clients[family.clients.length-1];
            console.log('primary changing from ' + prevPrimaryClient._id + ' to ' + family.primaryClient._id);

            superagent
                .post(basepath + '/api/families/')
                .send(family)
                .end(function (res) {
                    expect(res.status).to.equal(200);

                    superagent
                        .get(basepath + '/api/families/' + family._id)
                        .end(function (res) {
                            expect(typeof res.body).to.eql('object');
                            var updatedFamily = res.body;

                            expect(updatedFamily.primaryClient._id != prevPrimaryClient._id);
                            done();
                        });

                });
        });

    });

    after(function () {
        shutdown();
    });

});
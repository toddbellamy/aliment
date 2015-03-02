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
                            family = res.body;
                            expect(family.totalMonthlyExpenses === updatedValue)
                            done();
                        });

                });
        })

    });

});
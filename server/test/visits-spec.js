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

    describe('visitsget', function () {
        it('should get return ok response with a family object that contains visits', function (done) {
            superagent
                .get(basepath + '/api/visits/0')
                .end(function (res) {
                    expect(res.status).to.equal(200);
                    expect(res.body._id.length).to.eql(24);
                    expect(res.body).to.have.property('visits');
                    expect(res.body.visits).to.not.be.empty();
                    done();
                });
        });
    });

    describe('visitupdate', function() {
        var family = null;
        before(function(done) {
            superagent
                .get(basepath + '/api/visits/0')
                .end(function (res) {
                    expect(typeof res.body).to.eql('object');
                    family = res.body;
                    done();
                });
            });

        it('should accept visit update and return ok response with updated value', function(done) {
            family.visits[0].value += 1;
            var updatedVisitValue = family.visits[0].value;
            superagent
                .post(basepath + '/api/visits/' + family._id)
                .send(family)
                .end(function (res) {
                    expect(res.status).to.equal(200);

                    superagent
                        .get(basepath + '/api/visits/0')
                        .end(function (res) {
                            expect(typeof res.body).to.eql('object');
                            family = res.body;
                            expect(family.visits[0].value === updatedVisitValue)
                            done();
                        });

                });
            })
    });

    describe('visitcreate', function() {
        var family = null;
        before(function(done) {
            superagent
                .get(basepath + '/api/visits/0')
                .end(function (res) {
                    expect(typeof res.body).to.eql('object');
                    family = res.body;
                    done();
                });
        });

        it('should accept new visit and return ok response with visit added to family', function(done) {
            var visitCount = family.visits.length;
            var visitToAdd = {

                date: new Date(),
                value: 10.00,
                storeVoucher: '',
                reusableBagGiven: false,
                comments: '',
                verification: 'Mary',
                foodVoucher: '',
                approvedBy: '',
                client: family.primaryClient
            };
            family.visits.push(visitToAdd);

            superagent
                .post(basepath + '/api/visits/' + family._id)
                .send(family)
                .end(function (res) {
                    expect(res.status).to.equal(200);

                    superagent
                        .get(basepath + '/api/visits/0')
                        .end(function (res) {
                            expect(typeof res.body).to.eql('object');
                            family = res.body;
                            expect(family.visits.length === (visitCount + 1));
                            done();
                        });

                });
        })
    });



    after(function () {
        shutdown();
    });

})
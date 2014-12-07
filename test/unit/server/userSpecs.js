(function userSpecsScope() {
  'use strict';

  describe('user resource specs', function userResourceSpecs() {

    var chai = require("chai");
    var sinon = require("sinon");
    var sinonChai = require("sinon-chai");
    var expect = chai.expect;
    chai.use(sinonChai);

    var mongoose = require('mongoose');
    var mockgoose = require('mockgoose');
    mockgoose(mongoose);

    var queue = require('q');
    var path = require('path');
    var user = require('../../../server/user');

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    describe('user login', function login() {
      it('should login with credentials', function getRegisteredAPICalls(done) {
        var req;
        var res;
        queue().
          then(function given() {
            req = {
              body: {
                userName: 'EnoF',
                password: 'secret'
              }
            };
            res = {};
            res.send = sinon.spy();
          }).
          then(function when() {
            return user.login(req, res);
          }).
          then(function then() {
            var response = res.send.args[0][0];
            expect(response.authToken).to.be.a('string');
            expect(response.user.userName).to.equal(req.body.userName);
          }).
          then(done).
          catch(done);
      });
    });
  });

}());
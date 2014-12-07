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
    var AES = require('crypto-js/aes');
    var CryptoJS = require('crypto-js');

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
                password: 'someEncryptedPassword'
              }
            };
            res = {};
            res.send = sinon.spy();
          }).
          then(function when() {
            return user.login(req, res);
          }).
          then(function then() {
            expect(res.send).to.have.been.called;
            var response = res.send.args[0][0];
            var decrypted = AES.decrypt(response.authToken, process.env.IMBER_AES_KEY);
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            expect(message).to.have.string('EnoF;');
            expect(response.user.userName).to.equal(req.body.userName);
          }).
          then(done).
          catch(done);
      });

      it('should reauthenticate with an previous given authToken', function authToken(done) {
        var req;
        var res;
        var oldAuth = AES.encrypt('EnoF;' + new Date().getTime(), process.env.IMBER_AES_KEY);
        queue().
          then(function given() {
            req = {
              body: {
                authToken: oldAuth.toString()
              }
            };
            res = {};
            res.send = sinon.spy();
          }).
          then(function when() {
            return user.reauthenticate(req, res);
          }).
          then(function then() {
            expect(res.send).to.have.been.called;
            var response = res.send.args[0][0];
            var decrypted = AES.decrypt(response.authToken, process.env.IMBER_AES_KEY);
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            expect(message).to.have.string('EnoF;');
            expect(response.user.userName).to.equal(response.user.userName);
            expect(response.authToken).not.to.equal(oldAuth);
          }).
          then(done).
          catch(done);
      });

      it('should return a 401 when the user could not authenticate', function badCredentials(done) {
        var req;
        var res;
        queue().
          then(function given() {
            req = {
              body: {
                userName: 'someonewhodoesnotexist',
                password: 'some unknown password that will not work'
              }
            };
            res = {};
            res.send = sinon.spy();
            res.status = sinon.stub();
            res.status.returns({
              send: res.send
            });
          }).
          then(function when() {
            return user.login(req, res);
          }).
          then(function then() {
            expect(res.status).to.have.been.called.once;
            expect(res.send).to.have.been.called.once;
            var status = res.status.args[0][0];
            var response = res.send.args[0][0];
            expect(status).to.equal(401);
            expect(response).to.equal('bad credentials');
          }).
          then(done).
          catch(done);
      });

      it('should fail the authentication if the token is older then 10 days', function failAuth(done) {
        var req;
        var res;
        var tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        var oldAuth = AES.encrypt('EnoF;' + tenDaysAgo.getTime(), process.env.IMBER_AES_KEY);
        queue().
          then(function given() {
            req = {
              body: {
                authToken: oldAuth.toString()
              }
            };
            res = {};
            res.send = sinon.spy();
            res.status = sinon.stub();
            res.status.returns({
              send: res.send
            });
          }).
          then(function when() {
            return user.reauthenticate(req, res);
          }).
          fail(function then() {
            expect(res.status).to.have.been.called.once;
            expect(res.send).to.have.been.called.once;
            var status = res.status.args[0][0];
            var response = res.send.args[0][0];
            expect(status).to.equal(401);
            expect(response).to.equal('old token');
          }).
          then(done).
          catch(done);
      });
    });
  });

}());
(function authorizationSpecsScope() {
  'use strict';

  describe('authorization specs', function authorizationSpecs() {

    var chai = require('chai');
    var sinon = require('sinon');
    var sinonChai = require('sinon-chai');
    var expect = chai.expect;
    chai.use(sinonChai);
    var test = require('./testHelper.js');

    var path = require('path');
    var mongoose = require('mongoose');
    var mockgoose = require('mockgoose');
    mockgoose(mongoose);

    var authorization = require('../../../server/authorization');
    var AES = require('crypto-js/aes');
    var CryptoJS = require('crypto-js');

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    it('should authorize any call before calling the caller', function authorize(done) {
      var authToken = AES.encrypt('EnoF;' + new Date().getTime(), process.env.IMBER_AES_KEY).toString();
      test(done)
        .givenHeader({
          authorization: authToken
        })
        .when(authorization)
        .then(function assert(next) {
          expect(next).to.have.been.called;
        });
    });

    it('should send a 401 when not authorized succesful', function notAuthorized(done) {
      var authToken = 'fakeToken;123';
      test(done)
        .givenHeader({
          authorization: authToken
        })
        .when(authorization)
        .then(function assert(response, status, next) {
          expect(response).to.equal('old token');
          expect(status).to.equal(401);
          expect(next).not.to.have.been.called;
        });
    });

    it('should directly forward calls when going to login', function unsecure(done) {
      test(done)
        .givenPath('/api/login')
        .givenMethod('POST')
        .when(authorization)
        .then(function assert(next) {
          expect(next).to.have.been.called;
        });
    });

    it('should limit the unsecure resources to the POSTS', function limitToPosts(done) {
      test(done)
        .givenPath('/api/login')
        .givenMethod('ANY OTHER METHOD')
        .when(authorization)
        .then(function assert(response, status, next) {
          expect(response).to.equal('old token');
          expect(status).to.equal(401);
          expect(next).not.to.have.been.called;
        });
    });
  });
}());

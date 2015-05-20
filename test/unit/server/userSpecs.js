(function userSpecsScope() {
  'use strict';

  describe('user resource specs', function userResourceSpecs() {

    var chai = require('chai');
    var sinon = require('sinon');
    var sinonChai = require('sinon-chai');
    var expect = chai.expect;
    chai.use(sinonChai);
    var test = require('./testHelper.js');

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
        test(done)
          .given({
            userName: 'EnoF',
            password: 'someEncryptedPassword'
          })
          .when(user.login)
          .then(function assert(response, req) {
            var decrypted = AES.decrypt(response.authToken, process.env.IMBER_AES_KEY);
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            expect(message).to.have.string('EnoF;');
            expect(response.user._id.toString()).to.equal('545726928469e940235ce769');
            expect(response.user.userName).to.equal(req.body.userName);
          });
      });

      it('should reauthenticate with an previous given authToken', function authToken(done) {
        var oldAuth = AES.encrypt('EnoF;' + new Date().getTime(), process.env.IMBER_AES_KEY);
        test(done)
          .given({
            authToken: oldAuth.toString()
          })
          .when(user.reauthenticate)
          .then(function assert(response) {
            var decrypted = AES.decrypt(response.authToken, process.env.IMBER_AES_KEY);
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            expect(message).to.have.string('EnoF;');
            expect(response.user._id.toString()).to.equal('545726928469e940235ce769');
            expect(response.user.userName).to.equal('EnoF');
            expect(response.authToken).not.to.equal(oldAuth);
          });
      });

      it('should return a 401 when the user could not authenticate', function badCredentials(done) {
        test(done)
          .given({
            userName: 'someonewhodoesnotexist',
            password: 'some unknown password that will not work'
          })
          .when(user.login)
          .then(function assert(response, status) {
            expect(status).to.equal(401);
            expect(response).to.equal('bad credentials');
          });
      });

      it('should fail the authentication if the token is older then 10 days', function failAuth(done) {
        var tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        var oldAuth = AES.encrypt('EnoF;' + tenDaysAgo.getTime(), process.env.IMBER_AES_KEY);
        test(done)
          .given({
            authToken: oldAuth.toString()
          })
          .when(user.reauthenticate)
          .then(function assert(response, status) {
            expect(status).to.equal(401);
            expect(response).to.equal('old token');
          });
      });

      it('should login with an case insensitive usename', function insensitive(done) {
        test(done)
          .given({
            userName: 'enof',
            password: 'someEncryptedPassword'
          })
          .when(user.login)
          .then(function assert(response) {
            var decrypted = AES.decrypt(response.authToken, process.env.IMBER_AES_KEY);
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            expect(message).to.have.string('EnoF;');
            expect(response.user.userName).to.equal('EnoF');
          });
      });
    });

    describe('user registration', function registration() {
      it('should register a new user', function registerNewUser(done) {
        test(done)
          .given({
            userName: 'Rina',
            password: 'someEncryptedPassword',
            email: 'rina@rini.ichi'
          })
          .when(user.register)
          .then(function assert(response, req) {
            var decrypted = AES.decrypt(response.authToken, process.env.IMBER_AES_KEY);
            var message = decrypted.toString(CryptoJS.enc.Utf8);
            expect(message).to.have.string('Rina;');
            expect(response.user._id).to.be.defined;
            expect(response.user.userName).to.equal(req.body.userName);
          });
      });

      it('should abort a registration when username is in use', function usernameInUse(done) {
        test(done)
          .given({
            userName: 'EnoF',
            password: 'someEncryptedPassword',
            email: 'somenotfound@email.com'
          })
          .when(user.register)
          .then(function assert(response) {
            expect(response.userName).to.be.true;
          });
      });

      it('should abort a registration when email has been registered', function emailRegistered(done) {
        test(done)
          .given({
            userName: 'someNoneExistingUsername',
            password: 'someEncryptedPassword',
            email: 'andyt@live.nl'
          })
          .when(user.register)
          .then(function assert(response) {
            expect(response.email).to.be.true;
          });
      });

      it('should abort a registration when userName is empty', function emailRegistered(done) {
        test(done)
          .given({
            userName: '',
            password: 'someEncryptedPassword',
            email: 'somenotfound@email.com'
          })
          .when(user.register)
          .then(function assert(response) {
            expect(response.email).to.be.true;
          });
      });

      it('should abort a registration when password is empty', function emailRegistered(done) {
        test(done)
          .given({
            userName: 'someNoneExistingUsername',
            password: '',
            email: 'somenotfound@email.com'
          })
          .when(user.register)
          .then(function assert(response) {
            expect(response.email).to.be.true;
          });
      });

      it('should abort a registration when email is empty', function emailRegistered(done) {
        test(done)
          .given({
            userName: 'someNoneExistingUsername',
            password: 'someEncryptedPassword',
            email: ''
          })
          .when(user.register)
          .then(function assert(response) {
            expect(response.email).to.be.true;
          });
      });
    });

    describe('user search', function() {
      it('should be able to search for a user', function searchUser(done) {
        test(done)
          .given({
            search: 'eno'
          })
          .when(user.search)
          .then(function assert(response) {
            expect(response).to.be.an.instanceof(Array);
            expect(response[0].userName).to.equal('EnoF');
            expect(response[0].password).to.be.undefined;
          });
      });

      it('should only search for users starting with the provided name', function limitToProvidedName(done) {
        test(done)
          .given({
            search: 'nof'
          })
          .when(user.search)
          .then(function assert(response, status) {
            expect(response).to.equal('not found');
            expect(status).to.equal(404);
          });
      });

      it('should be able to find a user by name', function findByName(done) {
        test(done)
          .given({
            find: 'EnoF'
          })
          .when(user.searchFor)
          .then(function assert(response) {
            expect(response.userName).to.equal('EnoF');
            expect(response.password).to.be.undefined;
          });
      });

      it('should only find the user when the full name is given', function findByFullName(done) {
        test(done)
          .given({
            find: 'Eno'
          })
          .when(user.find)
          .then(function assert(response, status) {
            expect(response).to.equal('not found');
            expect(status).to.equal(404);
          });
      });
    });
  });

}());

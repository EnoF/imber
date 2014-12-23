(function gameSpecsScope() {
  'use strict';

  describe('game resrouce specs', function gameSpecs() {

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
    var game = require('../../../server/game');
    var AES = require('crypto-js/aes');
    var CryptoJS = require('crypto-js');

    beforeEach(function resetMongo(done) {
      mockgoose.reset();
      require(path.join(__dirname, 'mocks'))(done);
    });

    describe('game creation', function gameCreationSpecs() {
      it('should register a new game', function registerNewGame(done) {
        test(done)
          .given({
            challenger: '545726928469e940235ce769',
            opponent: '545726928469e940235ce853'
          })
          .givenHeader({
            authorization: createAuthToken('EnoF')
          })
          .when(game.challenge)
          .then(function assert(response) {
            expect(response).to.equal('ok');
          });
      });

      it('should reject a challenge when the challenger can not be found', function challengerNotFound(done) {
        test(done)
          .given({
            challenger: '000000000000e000035ce769',
            opponent: '545726928469e940235ce853'
          })
          .givenHeader({
            authorization: createAuthToken('EnoF')
          })
          .when(game.challenge)
          .then(function assert(response, status) {
            expect(response).to.equal('challenger not found');
            expect(status).to.equal(404);
          });
      });

      it('should reject a challenge when the challenger and auth token mismatch',
        function authTokenMisMatch(done) {
          test(done)
            .given({
              challenger: '545726928469e940235ce769',
              opponent: '545726928469e940235ce853'
            })
            .givenHeader({
              authorization: createAuthToken('Rina')
            })
            .when(game.challenge)
            .then(function assert(response, status) {
              expect(response).to.equal('not authorized');
              expect(status).to.equal(403);
            });
        });

      it('should be able to accept a challenge', function acceptChallenge(done) {
        test(done)
          .givenParams({
            id: '548726928469e940235ce769'
          })
          .when(game.accept)
          .then(function assert(response) {
            expect(response).to.equal('ok');
          });
      });
    });

    function createAuthToken(name) {
      return AES.encrypt(name + ';' + new Date().getTime(), process.env.IMBER_AES_KEY).toString();
    }
  });
}());

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
    });

    describe('game acceptance', function gameAcceptanceSpecs() {
      it('should be able to get a challenge by id', function getChallengeById(done) {
        test(done)
          .givenParams({
            id: '548726928469e940235ce769'
          })
          .when(game.getGame)
          .then(function assert(response) {
            expect(response._id.toString()).to.equal('548726928469e940235ce769');
            expect(response.challenger._id.toString()).to.equal('545726928469e940235ce769');
            expect(response.challenger.userName).to.equal('EnoF');
            expect(response.opponent._id.toString()).to.equal('545726928469e940235ce853');
            expect(response.opponent.userName).to.equal('Banana');
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

    describe('games retrieval', function gamesRetrievalSpecs() {
      it('should return last active games limited to 100', function lastActiveGames(done) {
        test(done)
          .given({
            // no params required
          })
          .when(game.getLatestGames)
          .then(function assert(response) {
            expect(response).to.be.instanceof(Array);
            expect(response).to.have.length.above(1);
          });
      });

      it('should return the last 100 active games of a given user', function gamesOfUser(done) {
        test(done)
          .given({
            user: '545726928469e940235ce769'
          })
          .when(game.getLatestGames)
          .then(function assert(response) {
            expect(response).to.containUser('545726928469e940235ce769');
          });
      });

      it('should return the last 100 active games of a given user as challenger', function gamesAsChallenger() {

      });

      it('should return the last 100 active games of a given user as opponent', function gamesAsOpponent() {

      });
    });

    function createAuthToken(name) {
      return AES.encrypt(name + ';' + new Date().getTime(), process.env.IMBER_AES_KEY).toString();
    }
  });
}());

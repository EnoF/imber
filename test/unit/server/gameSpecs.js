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
    var Character = require('../../../server/resources/Character');
    var CharacterTypes = require('../../../server/resources/CharacterType').CharacterTypes;

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
          .then(function assert(response, next, data) {
            var deferred = queue.defer();
            expect(response).to.equal('ok');
          });
      });

      describe('character position', function characterPositionSpecs() {
        var challengerTeam, opponentTeam;

        // Board representation:
        // [l][k][a][m][h][s][m][a][k][l]
        // [s][s][s][s][s][s][s][s][s][s]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
        // [s][s][s][s][s][s][s][s][s][s]
        // [l][k][a][m][h][s][m][a][k][l]

        before(function beforeExecution(done) {
          test(done)
            .given({
              challenger: '545726928469e940235ce769',
              opponent: '545726928469e940235ce853'
            })
            .givenHeader({
              authorization: createAuthToken('EnoF')
            })
            .when(game.challenge)
            .then(function assert(response, next, data) {
              var deferred = queue.defer();
              Character.find({
                  game: data._id,
                  player: data.challenger
                })
                .exec()
                .then(function setChallengerTeam(foundCharacters) {
                  challengerTeam = foundCharacters;
                  return Character.find({
                    game: data._id,
                    player: data.opponent
                  }).exec();
                })
                .then(function setOpponentTeam(foundCharacters) {
                  opponentTeam = foundCharacters;
                  deferred.resolve();
                });
              return deferred.promise;
            });
        });

        describe('soldiers', function soldiersSpecs() {
          var amountOfSoldiers = 10;

          it('should create 10 soldiers for the challenger', function registerNewGame() {
            for (var i = 0; i < amountOfSoldiers; i++) {
              expect(challengerTeam[i].type).to.equal(CharacterTypes.SOLDIER);
            }
          });

          it('should create 10 soldiers for the opponent', function registerNewGame() {
            for (var i = 0; i < amountOfSoldiers; i++) {
              expect(opponentTeam[i].type).to.equal(CharacterTypes.SOLDIER);
            }
          });

          it('should position them on the 2nd row', function registerNewGame() {
            for (var i = 0; i < amountOfSoldiers; i++) {
              expect(challengerTeam[i].position.x).to.equal(i);
              expect(challengerTeam[i].position.y).to.equal(1);
            }
          });

          it('should position the opponent soldiers', function opponentSoldiers() {
            for (var i = 0; i < amountOfSoldiers; i++) {
              expect(opponentTeam[i].position.x).to.equal(i);
              expect(opponentTeam[i].position.y).to.equal(8);
            }
          });
        });

        describe('knights', function knightsSpecs() {
          it('should create 2 knights for the challenger', function create2Knights() {
            for (var i = 10; i < 10 + 2; i++) {
              expect(challengerTeam[i].type).to.equal(CharacterTypes.KNIGHT);
            }
          });

          it('should create 2 knights for the opponent', function create2Knights() {
            for (var i = 10; i < 10 + 2; i++) {
              expect(opponentTeam[i].type).to.equal(CharacterTypes.KNIGHT);
            }
          });

          it('should create 2 knights for the challenger asymetricly', function create2Knights() {
            expect(challengerTeam[10].position.x).to.equal(2);
            expect(challengerTeam[10].position.y).to.equal(0);
            expect(challengerTeam[11].position.x).to.equal(7);
            expect(challengerTeam[11].position.y).to.equal(0);
          });

          it('should create 2 knights for the opponent asymetricly', function create2Knights() {
            expect(opponentTeam[10].position.x).to.equal(2);
            expect(opponentTeam[10].position.y).to.equal(9);
            expect(opponentTeam[11].position.x).to.equal(7);
            expect(opponentTeam[11].position.y).to.equal(9);
          });
        });
      });

      describe('archers', function archersSpecs() {
        it('should create 2 archers for the challenger', function create2Archers() {

        });

        it('should create 2 archers for the opponent', function create2Archers() {

        });

        it('should position the archers for the challenger', function position2Archers() {

        });

        it('should position the archers for the opponent', function position2Archers() {

        });
      });

      describe('mages', function magesSpecs() {
        it('should create 2 mages for the challenger', function create2Mages() {

        });

        it('should create 2 mages for the opponent', function create2Mages() {

        });

        it('should position the mages for the challenger', function position2Mages() {

        });

        it('should position the mages for the opponent', function position2Mages() {

        });
      });

      describe('challenge', function challengeSpecs() {
        it('should reject a challenge when the challenger can not be found', function challengerNotFound(
          done) {
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

      it('should receive the teams present in a game', function getPlayersInGame(done) {
        test(done)
          .givenParams({
            id: '548726928469e940235ce769'
          })
          .when(game.getGame)
          .then(function assert(response) {
            expect(response.challenger.team).to.be.instanceof(Array);
            expect(response.opponent.team).to.be.instanceof(Array);
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
            expect(response).to.contain.user('545726928469e940235ce769');
          });
      });

      it('should return active games of a given user as challenger', function gamesAsChallenger(done) {
        test(done)
          .given({
            challenger: '545726928469e940235ce769'
          })
          .when(game.getLatestGames)
          .then(function assert(response) {
            expect(response).to.contain.challenger('545726928469e940235ce769');
            expect(response).not.to.contain.opponent('545726928469e940235ce769');
          });
      });

      it('should return active games of a given user as opponent', function gamesAsOpponent(done) {
        test(done)
          .given({
            opponent: '545726928469e940235ce769'
          })
          .when(game.getLatestGames)
          .then(function assert(response) {
            expect(response).not.to.contain.challenger('545726928469e940235ce769');
            expect(response).to.contain.opponent('545726928469e940235ce769');
          });
      });
    });

    function createAuthToken(name) {
      return AES.encrypt(name + ';' + new Date().getTime(), process.env.IMBER_AES_KEY).toString();
    }
  });
}());

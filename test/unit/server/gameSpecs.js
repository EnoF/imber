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
          .when(game.challenge)
          .then(function assert(response) {
            expect(response).to.equal('ok');
          });
      });
    });
  });
}());

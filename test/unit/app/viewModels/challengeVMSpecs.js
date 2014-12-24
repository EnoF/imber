(function challengeVMSpecsScope() {
  'use strict';

  describe('challenge view model specs', function challengeVMSpecs() {
    var testGlobals, $scope, $httpBackend, Game;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_) {
      testGlobals = testSetup.setupControllerTest('challengeVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      Game = _Game_;
    }));

    it('should load the challenge details', function loadChallengeDetails() {
      // given
      $scope.id = 'a1b2c3d4e5f6g7';
      var response = testGlobals.createDefaultGameResponse();

      // predict
      $httpBackend.expect('GET', '/games/a1b2c3d4e5f6g7')
        .respond(200, response);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.game.getChallenger()).to.equal('userid1');
      expect($scope.game.getOpponent()).to.equal('userid2');
      expect($scope.game.isStarted()).to.equal(false);
    });

    it('should load a started challenge', function loadChallengeDetails() {
      // given
      $scope.id = 'a1b2c3d4e5f6g7';
      var response = testGlobals.createDefaultGameResponse();
      response.started = true;

      // predict
      $httpBackend.expect('GET', '/games/a1b2c3d4e5f6g7')
        .respond(200, response);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.game.getChallenger()).to.equal('userid1');
      expect($scope.game.getOpponent()).to.equal('userid2');
      expect($scope.game.isStarted()).to.equal(true);
    });

    it('should accept the challenge', function acceptChallenge() {
      // given

      // when

      // then

    });
  });
}());

(function challengeVMSpecsScope(sinon) {
  'use strict';

  describe('challenge view model specs', function challengeVMSpecs() {
    var testGlobals, $scope, $httpBackend, Game, events;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_) {
      testGlobals = testSetup.setupControllerTest('challengeVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      Game = _Game_;
    }));

    it('should load the challenge details', loadChallengeDetails);

    function loadChallengeDetails() {
      // given
      $scope.id = 'a1b2c3d4e5f6g7';
      var response = testGlobals.createDefaultGameResponse();

      // predict
      $httpBackend.expect('GET', '/api/games/a1b2c3d4e5f6g7')
        .respond(200, response);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.game.getChallenger()).to.equal('userid1');
      expect($scope.game.getOpponent()).to.equal('userid2');
      expect($scope.game.isStarted()).to.equal(false);
    }

    it('should load a started challenge', function loadChallengeDetails() {
      // given
      $scope.id = 'a1b2c3d4e5f6g7';
      var response = testGlobals.createDefaultGameResponse();
      response.started = true;

      // predict
      $httpBackend.expect('GET', '/api/games/a1b2c3d4e5f6g7')
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
      loadChallengeDetails();
      expect($scope.game.isStarted()).to.equal(false);
      $scope.$emit = sinon.spy();

      // predict
      $httpBackend.expect('POST', '/api/games/a1b2c3d4e5f6g7/accept')
        .respond(200, 'ok');

      // when
      $scope.accept();
      $httpBackend.flush();

      // then
      expect($scope.game.isStarted()).to.equal(true);
      expect($scope.$emit).to.have.been.calledWith(events.ACCEPTED);
    });
  });
}(window.sinon));

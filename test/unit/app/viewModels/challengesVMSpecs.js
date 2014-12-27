(function challengesVMSpecsScope() {
  'use strict';

  describe('challenges view model specs', function challengesVMSpecs() {
    var testGlobals, $scope, $httpBackend, Game, defaultGames, defaultUser;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_, User) {
      testGlobals = testSetup.setupControllerTest('challengesVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      Game = _Game_;
      defaultUser = testGlobals.createDefaultUser();
      defaultGames = testGlobals.createDefaultGamesResponse();
    }));

    it('should retrieve all latest challenges from any user', function anyUser() {
      // given
      expect($scope.challenges).to.be.empty;

      // predict
      $httpBackend.expect('GET', '/api/games')
        .respond(200, defaultGames);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.challenges[0]).to.be.instanceof(Game);
      expect($scope.challenges[0].getId()).to.equal('game1');
      expect($scope.challenges[1]).to.be.instanceof(Game);
      expect($scope.challenges[1].getId()).to.equal('game2');
    });

    it('should retrieve all latest challenges where a user is involved', function involvedUser() {
      // given
      $scope.user = defaultUser;

      // predict
      $httpBackend.expect('GET', '/api/games?user=' + defaultUser.getId())
        .respond(200, defaultGames);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.challenges[0]).to.be.instanceof(Game);
      expect($scope.challenges[0].getId()).to.equal('game1');
      expect($scope.challenges[1]).to.be.instanceof(Game);
      expect($scope.challenges[1].getId()).to.equal('game2');
    });

    it('should retrieve all latest games of a user as challenger', function userAsChallenger() {
      // given
      $scope.challenger = defaultUser;

      // predict
      $httpBackend.expect('GET', '/api/games?challenger=' + defaultUser.getId())
        .respond(200, defaultGames);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.challenges[0]).to.be.instanceof(Game);
      expect($scope.challenges[0].getId()).to.equal('game1');
      expect($scope.challenges[1]).to.be.instanceof(Game);
      expect($scope.challenges[1].getId()).to.equal('game2');
    });

    it('should retrieve all latest games of a user as opponent', function userAsOpponent() {
      // given
      $scope.opponent = defaultUser;

      // predict
      $httpBackend.expect('GET', '/api/games?opponent=' + defaultUser.getId())
        .respond(200, defaultGames);

      // when
      $scope.load();
      $httpBackend.flush();

      // then
      expect($scope.challenges[0]).to.be.instanceof(Game);
      expect($scope.challenges[0].getId()).to.equal('game1');
      expect($scope.challenges[1]).to.be.instanceof(Game);
      expect($scope.challenges[1].getId()).to.equal('game2');
    });
  });
}());

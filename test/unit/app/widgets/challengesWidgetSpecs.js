(function challengesWidgetSpecsScope(angular) {
  'use strict';

  describe('<challenges> specs', function challengesWidgetSpecs() {
    var testGlobals, parentScope, $httpBackend, defaultGames, defaultUser, Game;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      $httpBackend = testGlobals.$httpBackend;
      defaultUser = testGlobals.createDefaultUser();
      defaultGames = testGlobals.createDefaultGamesResponse();
      Game = _Game_;
    }));

    it('should initialize with latest games of any user', function anyUser() {
      // given
      var directive = angular.element('<challenges></challenges>');

      // predict
      $httpBackend.expect('GET', '/api/games')
        .respond(200, defaultGames);

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.games[0]).to.be.instanceof(Game);
      expect($scope.games[0].getId()).to.equal('game1');
      expect($scope.games[1]).to.be.instanceof(Game);
      expect($scope.games[1].getId()).to.equal('game2');
    });

    it('should initialize with latest games with user', function withUser() {
      // given
      parentScope.user = defaultUser;
      var directive = angular.element('<challenges user="user"></challenges>');

      // predict
      $httpBackend.expect('GET', '/api/games?user=' + defaultUser.getId())
        .respond(200, defaultGames);

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.games[0]).to.be.instanceof(Game);
      expect($scope.games[0].getId()).to.equal('game1');
      expect($scope.games[1]).to.be.instanceof(Game);
      expect($scope.games[1].getId()).to.equal('game2');
    });

    it('should initialize with latest games with challenger', function withChallenger() {
      // given
      parentScope.user = defaultUser;
      var directive = angular.element('<challenges challenger="user"></challenges>');

      // predict
      $httpBackend.expect('GET', '/api/games?challenger=' + defaultUser.getId())
        .respond(200, defaultGames);

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.games[0]).to.be.instanceof(Game);
      expect($scope.games[0].getId()).to.equal('game1');
      expect($scope.games[1]).to.be.instanceof(Game);
      expect($scope.games[1].getId()).to.equal('game2');
    });

    it('should initialize with latest games with opponent', function withOpponent() {
      // given
      parentScope.user = defaultUser;
      var directive = angular.element('<challenges opponent="user"></challenges>');

      // predict
      $httpBackend.expect('GET', '/api/games?opponent=' + defaultUser.getId())
        .respond(200, defaultGames);

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.games[0]).to.be.instanceof(Game);
      expect($scope.games[0].getId()).to.equal('game1');
      expect($scope.games[1]).to.be.instanceof(Game);
      expect($scope.games[1].getId()).to.equal('game2');
    });
  });
}(window.angular));

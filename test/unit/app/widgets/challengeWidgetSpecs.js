(function challengeWidgetSpecsScope(angular) {
  'use strict';

  describe('<challenge> specs', function challengeWidgetSpecs() {
    var testGlobals, parentScope, defaultGame, defaultGameResponse, $httpBackend, events;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, Game) {
      testGlobals = testSetup.setupDirectiveTest();
      testGlobals.loginDefaultUser();
      parentScope = testGlobals.parentScope;
      $httpBackend = testGlobals.$httpBackend;
      defaultGameResponse = testGlobals.createDefaultGamesResponse()[0];
      defaultGame = new Game(defaultGameResponse);
      events = testGlobals.events;
    }));

    it('should initialize with a provided id', function providedId() {
      // given
      parentScope.id = defaultGameResponse._id;
      var directive = angular.element('<challenge id="id"></challenge>');

      // predict
      $httpBackend.expect('GET', '/api/games/' + parentScope.id)
        .respond(200, defaultGameResponse);

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.id).to.equal(defaultGameResponse._id);
      expect($scope.game.getId()).to.equal($scope.id);
    });

    it('should initialize with a provided model', providedModel);

    function providedModel() {
      // given
      parentScope.game = defaultGame;
      var directive = angular.element('<challenge game="game"></challenge>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.game).to.equal(parentScope.game);
      expect($scope.id).to.equal(parentScope.game.getId());
      return $scope;
    }

    it('should request to open games view with given id', function requestGameView() {
      // given
      var $scope = providedModel();
      sinon.spy($scope, '$emit');

      // when
      $scope.requestGame();

      // then
      expect($scope.$emit).to.have.been.calledWith(events.REQUEST_GAME, $scope.id);
    });
  });
}(window.angular));

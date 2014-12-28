(function gameBoardWidgetSpecsScope(angular) {
  'use strict';

  describe('<game-board> specs', function gameBoardWidgetSpecs() {
    var testGlobals, parentScope, Game, defaultGameResponse, $httpBackend;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Game_) {
      testGlobals = testSetup.setupDirectiveTest();
      testGlobals.loginDefaultUser();
      parentScope = testGlobals.parentScope;
      $httpBackend = testGlobals.$httpBackend;
      defaultGameResponse = testGlobals.createDefaultGameResponse();
      Game = _Game_;
    }));

    it('should load with provided id', function providedId() {
      // given
      parentScope.id = defaultGameResponse._id;
      var directive = angular.element('<game-board id="id"></game-board>');

      // predict
      $httpBackend.expect('GET', '/api/games/' + parentScope.id)
        .respond(200, defaultGameResponse);

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      $httpBackend.flush();

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.game.getId()).to.equal(parentScope.id);
    });

    it('should load with provided model', function providedModel() {
      // given
      parentScope.game = new Game(defaultGameResponse);
      var directive = angular.element('<game-board game="game"></game-board>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.game).to.be.instanceof(Game);
      expect($scope.id).to.equal(defaultGameResponse._id);
    });
  });
}(window.angular));

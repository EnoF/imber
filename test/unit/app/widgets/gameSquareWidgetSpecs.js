(function gameSquareWidgetSpecsScope(angular) {
  'use strict';

  describe('<game-square> specs', function gameSquareWidgetSpecs() {
    var testGlobals, parentScope, defaultCharacter, Character;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _Character_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      Character = _Character_;
      defaultCharacter = new Character(testGlobals.createDefaultCharacterResponse());
    }));

    it('should set the provided character model', function providedModel() {
      // given
      parentScope.character = defaultCharacter;
      var directive = angular.element('<game-square character="character"></game-square>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.character).to.be.instanceof(Character);
      expect($scope.character).to.equal(defaultCharacter);
    });

    it('should set occupied by opponent', function occupiedByOpponent() {
      // given
      parentScope.isOpponent = true;
      var directive = angular.element('<game-square is-opponent="isOpponent"></game-square>')

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.isOpponent).to.equal(true);
    });
  });
}(window.angular));

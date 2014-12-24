(function challengeWidgetSpecsScope(angular) {
  'use strict';

  describe('<challenge> specs', function challengeWidgetSpecs() {
    var testGlobals, parentScope;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
    }));

    it('should initialize with a provided id', function providedId() {
      // given
      parentScope.id = '123abc';
      var directive = angular.element('<challenge id="id"></challenge>');

      // when
      var $scope = testGlobals.initializeDirective(parentScope, directive);

      // then
      expect($scope.id).to.equal('123abc');
    });
  });
}(window.angular));

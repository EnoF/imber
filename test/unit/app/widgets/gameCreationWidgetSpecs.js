(function gameCreationWidgetSpecsScope(angular) {
  'use strict';

  describe('<game-creation> specs', function gameCreationSpecs() {
    var testGlobals, parentScope, events, User;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _User_) {
      testGlobals = testSetup.setupDirectiveTest();
      parentScope = testGlobals.parentScope;
      events = testGlobals.events;
      User = _User_;
    }));

    function createDefaultUser() {
      return new User({
        _id: 'a1b2c3d4e5f6g7h8',
        userName: 'EnoF'
      });
    }

    it('should listen to the opponent selected', function listenToSelectedOpponent() {
      // given
      var directive = angular.element('<game-creation></game-creation>');
      var $scope = testGlobals.initializeDirective(parentScope, directive);
      var child = $scope.$$childHead;
      var user = createDefaultUser();

      // when
      child.$emit(events.USER_SELECTED, user);

      // then
      expect($scope.opponent).to.equal(user);
    });
  });
}(window.angular));

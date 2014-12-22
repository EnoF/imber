(function gameCreationSpecsScope(sinon) {
  'use strict';

  describe('gameCreationVMSpecs', function gameCreationVMSpecs() {
    var testGlobals, $scope, $q, $httpBackend, User;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _$q_, _User_) {
      testGlobals = testSetup.setupControllerTest('gameCreationVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      $q = _$q_;
      User = _User_;
      testGlobals.loginDefaultUser();
    }));

    function createDefaultUser() {
      return new User({
        userName: 'EnoF'
      });
    }

    it('should receive the opponent', function receiveOpponent() {
      // given
      var opponent = createDefaultUser();
      var event = {
        stopPropagation: sinon.spy()
      };

      // when
      $scope.assignOpponent(event, opponent);

      // then
      expect(event.stopPropagation).to.have.been.called;
      expect($scope.opponent).to.equal(opponent);
    });

    it('should create a new game challenge', function newGameChallenge() {
      // given
      var loggedInUser = testGlobals.getLoggedInUser();
      $scope.opponent = createDefaultUser();
      $scope.$emit = sinon.spy();

      // predict
      $httpBackend.expect('POST', '/games', {
        challenger: loggedInUser.getId(),
        opponent: $scope.opponent.getId()
      }).respond(200, 'ok');

      // when
      $scope.challenge();

      // then
      expect($scope.$emit).to.have.been.called;
    });

    it('should provide feedback the challenge is pending', function challengePending() {
      // given

      // when

      // then

    });
  });
}(window.sinon));

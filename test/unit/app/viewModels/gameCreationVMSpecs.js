(function gameCreationSpecsScope(sinon) {
  'use strict';

  describe('gameCreationVMSpecs', function gameCreationVMSpecs() {
    var testGlobals, $scope, $q, $httpBackend, User, events;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _$q_, _User_) {
      testGlobals = testSetup.setupControllerTest('gameCreationVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      $q = _$q_;
      User = _User_;
      events = testGlobals.events;
    }));

    function createDefaultUser() {
      return new User({
        _id: 'a1b2c3d4e5f6g7h8',
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

    it('should create a new game challenge', newGameChallenge);

    function newGameChallenge() {
      // given
      var loggedInUser = testGlobals.getLoggedInUser();
      $scope.opponent = createDefaultUser();
      $scope.$emit = sinon.spy();

      // predict
      $httpBackend.expect('POST', '/api/games', {
        challenger: loggedInUser.getId(),
        opponent: $scope.opponent.getId()
      }).respond(200, 'ok');

      // when
      $scope.challenge();
      $httpBackend.flush();

      // then
      expect($scope.$emit).to.have.been.calledWith(events.CHALLENGED);
    }

    it('should provide feedback the challenge is pending', function challengePending() {
      // given
      expect($scope.challenged).to.be.false;

      // when
      newGameChallenge();

      // then
      expect($scope.challenged).to.be.true;
    });
  });
}(window.sinon));

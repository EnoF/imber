(function playerSearchVMSpecsScope(sinon) {
  'use strict';

  describe('playerSearchVM specs', function playerSearchVMSpecs() {
    var $scope, testGlobals, $httpBackend, User, events;

    beforeEach(module('imber-test'));

    beforeEach(inject(function setupTest(testSetup, _User_, _events_) {
      testGlobals = testSetup.setupControllerTest('playerSearchVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      User = _User_;
      events = _events_;
    }));

    it('should search for a player', function searchPlayer() {
      // given
      var searchCriteria = 'ban';

      // predict
      $httpBackend.expect('GET', '/user?search=' + searchCriteria)
        .respond(200, ['banana', 'banana king', 'ban hammer']);

      // when
      var promise = $scope.searchPlayer(searchCriteria);
      $httpBackend.flush();

      // then
      promise.then(function expectList(list) {
        expect(list).to.include('banana');
        expect(list).to.include('banana king');
        expect(list).to.include('ban hammer');
      });
    });

    it('should provide the selected player model', function selectedPlayerModel() {
      // given
      var selectedPlayerName = 'banana king';
      $scope.$emit = sinon.spy();

      // predict
      $httpBackend.expect('GET', '/user?name=banana+king')
        .respond(200, {
          userName: 'Banana King'
        });

      // when
      $scope.onSelect(selectedPlayerName);
      $httpBackend.flush();

      // then
      expect($scope.$emit).to.have.been.called;
      var event = $scope.$emit.getCall(0).args[0];
      expect(event).to.equal(events.USER_SELECTED);
      var userModel = $scope.$emit.getCall(0).args[1];
      expect(userModel).to.be.instanceof(User);
    });

    it('should notify with an error when the user could not be found', function userNotFound() {
      // given
      var selectedPlayerName = 'banana king';
      $scope.$emit = sinon.spy();

      // predict
      $httpBackend.expect('GET', '/user?name=banana+king')
        .respond(404, 'not found');

      // when
      $scope.onSelect(selectedPlayerName);
      $httpBackend.flush();

      // then
      expect($scope.$emit).to.have.been.called;
      var event = $scope.$emit.getCall(0).args[0];
      expect(event).to.equal(events.USER_NOT_FOUND);
    });
  });
}(window.sinon));

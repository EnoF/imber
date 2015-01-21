(function actionPanelVMSpecsScope(sinon) {
  'use strict';

  describe('actionPanelVM specs', function actionPanelVMSpecs() {
    var $scope, $httpBackend, events, testGlobals;
    beforeEach(module('imber-test'));

    beforeEach(inject(function(testSetup) {
      testGlobals = testSetup.setupControllerTest('actionPanelVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should request move mode', function requestMoveMode() {
      // given
      $scope.character = {
        mocked: 'character'
      };
      sinon.spy($scope, '$emit');

      // when
      $scope.actions.move();

      // then
      expect($scope.$emit).to.have.been.calledWith(events.REQUEST_MOVE, $scope.character);
    });
  })
}(window.sinon));

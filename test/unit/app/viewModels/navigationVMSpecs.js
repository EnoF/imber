(function navigationVMSpecsScope(sinon) {
  'use strict';

  describe('navigationVMSpecs', function navigationVMSpecs() {

    var $scope, $httpBackend, events, testGlobals, $mdSidenav, userDAO, $cookies;
    beforeEach(module('imber-test'));

    beforeEach(inject(function (testSetup) {
      testGlobals = testSetup.setupControllerTest('navigationVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
    }));

    it('should open the navigation', function openNavigation() {
      // given
      sinon.spy($scope.navigation, 'open');

      // when
      $scope.showNavigation();

      // then
      expect($scope.navigation.open).to.have.been.called;
    });

    it('should close the navigation', function closeNavigation() {
      // given
      sinon.spy($scope.navigation, 'close');

      // when
      $scope.hideNavigation();

      // then
      expect($scope.navigation.close).to.have.been.called;
    })
  });
}(window.sinon));
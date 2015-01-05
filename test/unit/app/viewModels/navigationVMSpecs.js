(function navigationVMSpecsScope(sinon) {
  'use strict';

  describe('navigationVMSpecs', function navigationVMSpecs() {

    var $scope, $httpBackend, events, testGlobals, $mdSidenav, userDAO, $location;
    beforeEach(module('imber-test'));

    beforeEach(inject(function(testSetup, _userDAO_, _$location_) {
      testGlobals = testSetup.setupControllerTest('navigationVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      userDAO = _userDAO_;
      $location = _$location_;
    }));

    it('should open the navigation', function openNavigation() {
      // given
      $scope.getNavigation();
      sinon.spy($scope.navigation, 'open');

      // when
      $scope.showNavigation();

      // then
      expect($scope.navigation.open).to.have.been.called;
    });

    it('should close the navigation', function closeNavigation() {
      // given
      $scope.getNavigation();
      sinon.spy($scope.navigation, 'close');

      // when
      $scope.hideNavigation();

      // then
      expect($scope.navigation.close).to.have.been.called;
    });

    it('should proxy the userDAO functions', function proxyUserDAO() {
      // given
      sinon.spy(userDAO, 'getCurrentUser');
      sinon.spy(userDAO, 'loggedIn');

      // when
      $scope.getLoggedInUser();
      $scope.isLoggedIn();

      // then
      expect(userDAO.getCurrentUser).to.have.been.called;
      expect(userDAO.loggedIn).to.have.been.called;
    });

    it('should navigate to the games with provided id', function navigateToGames() {
      // given
      var id = 'gameId1';
      sinon.spy($location, 'url');

      // when
      $scope.$emit(events.REQUEST_GAME, id);

      // then
      expect($location.url).to.have.been.calledWith('/games?gameId=' + id);
    });
  });
}(window.sinon));

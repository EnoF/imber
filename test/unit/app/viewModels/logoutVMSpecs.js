(function logoutVMSpecsScope(sinon) {
  'use strict';

  describe('logout view model specs', function logoutVMSpecs() {
    var $scope, $httpBackend, testGlobals, userDAO, ipCookie, events;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_, _ipCookie_) {
      testGlobals = testSetup.setupControllerTest('logoutVM');
      $scope = testGlobals.$scope;
      events = testGlobals.events;
      $httpBackend = testGlobals.$httpBackend;
      userDAO = _userDAO_;
      ipCookie = _ipCookie_;
    }));

    describe('logout the current user', function logoutCurrentUser() {
      it('logout the current user', logoutCurrentUser);

      function logoutCurrentUser() {
        // given
        ipCookie('authToken', 'someauthtoken');
        $scope.user = {};

        // when
        $scope.logout();

        // then
        expect(ipCookie('authToken')).to.be.undefined;
        expect($scope.user).to.be.null;
      }

      it('should notify the parent the user has been logged out', function notifyLogout() {
        // given
        sinon.spy($scope, '$emit');

        // when
        logoutCurrentUser();

        // then
        expect($scope.$emit).to.have.been.calledWith(events.LOGGED_OUT);
      });
    });
  });
}(window.sinon));

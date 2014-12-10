(function logoutVMSpecsScope() {
  'use strict';

  describe('logout view model specs', function logoutVMSpecs() {
    var $scope, $httpBackend, testGlobals, userDAO, $cookies;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_, _$cookies_) {
      testGlobals = testSetup.setupControllerTest('logoutVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      userDAO = _userDAO_;
      $cookies = _$cookies_;
    }));

    describe('logout the current user', function logoutCurrentUser() {
      it('logout the current user', function logoutCurrentUser() {
        // given
        $cookies.authToken = 'someauthtoken';
        $scope.user = {};

        // predict
        $httpBackend.expect('POST', '/logout', {
          authToken: $cookies.authToken
        }).respond(200, 'ok');

        // when
        $scope.logout();
        $httpBackend.flush();

        // then
        expect($cookies.authToken).to.be.undefined;
        expect($scope.user).to.be.null;
      });
    });

    it('load the user model', function loggedIn() {

    });
  });
}());
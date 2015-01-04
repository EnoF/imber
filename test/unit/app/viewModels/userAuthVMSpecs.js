(function userAuthVMSpecsScope(sinon) {
  'use strict';

  describe('userAuthVMSpecs', function userAuthVMSpecs() {

    var $scope, $httpBackend, testGlobals, userDAO, ipCookie, events, $mdToast;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_, _ipCookie_, _$mdToast_) {
      testGlobals = testSetup.setupControllerTest('userAuthVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      userDAO = _userDAO_;
      ipCookie = _ipCookie_;
      $mdToast = _$mdToast_;
    }));

    describe('login', function loginScope() {
      it('should login an existing user', function login() {
        // given
        $scope.userName = 'enof';
        $scope.password = 'secret';

        // predict
        var expectedResponse = testGlobals.createDefaultUserAuthResponse();
        $httpBackend.expect('POST', '/api/login', {
          userName: $scope.userName,
          password: $scope.password
        }).respond(200, expectedResponse);

        // when
        $scope.login();
        $httpBackend.flush();

        // then
        expect($scope.loggedIn()).to.be.true;
        expect(ipCookie('authToken')).to.equal(expectedResponse.authToken);
        expect(userDAO.getCurrentUser().getId()).to.equal(expectedResponse.user._id);
        expect(userDAO.getCurrentUser().getUserName()).to.equal(expectedResponse.user.userName);
      });

      it('should not attempt to login a user with empty values', function empty() {
        // given
        expect($scope.userName).to.be.null;
        expect($scope.password).to.be.null;
        ipCookie.remove('authToken');
        sinon.spy(userDAO, 'login');

        // when
        $scope.login();

        // then
        expect(userDAO.login).not.to.have.been.called;
      });

      it('should login with the authToken in the cookies', loginWithCookies);

      function loginWithCookies() {
        // given
        ipCookie('authToken', 'abcxyz');

        // predict
        var expectedResponse = testGlobals.createDefaultUserAuthResponse();
        $httpBackend.expect('POST',
          '/api/reauthenticate', {
            authToken: ipCookie('authToken')
          }).respond(200, expectedResponse);

        // when
        $scope.login();
        $httpBackend.flush();

        // then
        expect($scope.loggedIn()).to.be.true;
        expect(ipCookie('authToken')).to.equal(expectedResponse.authToken);
      }

      it('should notify parent when user is logged in', function notifyLoggedIn() {
        // given
        sinon.spy($scope, '$emit');

        // when
        loginWithCookies();

        // then
        expect($scope.$emit).to.have.been.calledWith(events.LOGGED_IN);
      });

      it('should show an error when the user can not be logged in', function canNotLoggin() {
        // given
        sinon.spy($mdToast, 'show');
        ipCookie('authToken', 'abcxyz');

        // predict
        $httpBackend.expect('POST', '/api/reauthenticate', {
          authToken: ipCookie('authToken')
        }).respond(401, 'Unauthorized');

        // when
        $scope.login();
        $httpBackend.flush();

        // then
        expect($mdToast.show).to.have.been.called;
      });
    });

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
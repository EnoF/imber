(function loginVMSpecsScope(sinon) {
  'use strict';

  describe('loginVMSpecs', function loginVMSpecs() {

    var $scope, $httpBackend, testGlobals, userDAO, $cookies, events, $mdToast;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_, _$cookies_, _$mdToast_) {
      testGlobals = testSetup.setupControllerTest('loginVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      userDAO = _userDAO_;
      $cookies = _$cookies_;
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
        expect($cookies.authToken).to.equal(expectedResponse.authToken);
        expect(userDAO.getCurrentUser().getUserName()).to.equal(expectedResponse.user.userName);
      });

      it('should not attempt to login a user with empty values', function empty() {
        // given
        expect($scope.userName).to.be.null;
        expect($scope.password).to.be.null;
        sinon.spy(userDAO, 'login');

        // when
        $scope.login();

        // then
        expect(userDAO.login).not.to.have.been.called;
      });

      it('should login with the authToken in the cookies', loginWithCookies);

      function loginWithCookies() {
        // given
        $cookies.authToken = 'abcxyz';

        // predict
        var expectedResponse = testGlobals.createDefaultUserAuthResponse();
        $httpBackend.expect('POST', '/api/reauthenticate', {
          authToken: $cookies.authToken
        }).respond(200, expectedResponse);

        // when
        $scope.login();
        $httpBackend.flush();

        // then
        expect($scope.loggedIn()).to.be.true;
        expect($cookies.authToken).to.equal(expectedResponse.authToken);
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
        $cookies.authToken = 'abcxyz';

        // predict
        $httpBackend.expect('POST', '/api/reauthenticate', {
          authToken: $cookies.authToken
        }).respond(401, 'Unauthorized');

        // when
        $scope.login();
        $httpBackend.flush();

        // then
        expect($mdToast.show).to.have.been.called;
      });
    });
  });
}(window.sinon));

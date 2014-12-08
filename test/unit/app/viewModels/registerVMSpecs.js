(function registerVMSpecsScope() {
  'use strict';

  describe('registerVMSpecs', function registerVMSpecs() {
    var $scope, $httpBackend, testGlobals, userDAO, $cookies;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_, _$cookies_) {
      testGlobals = testSetup.setupControllerTest('registerVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      userDAO = _userDAO_;
      $cookies = _$cookies_;
    }));

    describe('register', function registerScope() {
      it('should register an new user', function registerNewUser() {
        // given
        $scope.email = 'andyt@live.nl';
        $scope.userName = 'EnoF';
        $scope.password = 'SomeUberSpecialPassword1!';

        // predict
        var expectedResponse = testGlobals.createDefaultUserAuthResponse();
        $httpBackend.expect('POST', '/user', {
          userName: $scope.userName,
          password: $scope.password,
          email: $scope.email
        }).respond(200, expectedResponse);

        // when
        $scope.register();
        $httpBackend.flush();

        // then
        expect($cookies.authToken).to.equal(expectedResponse.authToken);
        expect($scope.email).to.be.null;
        expect($scope.userName).to.be.null;
        expect($scope.password).to.be.null;
      });

      it('should reject registering multiple users under the same name', function uniqueName() {
        // given
        $scope.email = 'andyt@live.nl';
        $scope.userName = 'EnoF';
        $scope.password = 'SomeUberSpecialPassword1!';

        // predict
        var expectedResponse = {
          userName: true
        };
        $httpBackend.expect('POST', '/user', {
          userName: $scope.userName,
          password: $scope.password,
          email: $scope.email
        }).respond(410, expectedResponse);

        // when
        $scope.register();
        $httpBackend.flush();

        // then
        expect($scope.email).to.equal('andyt@live.nl');
        expect($scope.userName).to.be.null;
        expect($scope.password).to.equal('SomeUberSpecialPassword1!');
      });

      it('should reject registering multiple users under the same email', function sameEmail() {

      });
    });
  })
}());
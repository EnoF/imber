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
        // given
        $scope.email = 'andyt@live.nl';
        $scope.userName = 'EnoF';
        $scope.password = 'SomeUberSpecialPassword1!';

        // predict
        var expectedResponse = {
          email: true
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
        expect($scope.email).to.be.null;
        expect($scope.userName).to.equal('EnoF');
        expect($scope.password).to.equal('SomeUberSpecialPassword1!');
      });
    });

    describe('error message builder', function errorMessageBuilder() {
      it('should add a . at the end of the message', function dot() {
        // given
        var errors = ['userName'];

        // when
        var message = $scope.buildErrorMessage(errors);

        // then
        expect(message.substr(message.length - 1, 1)).to.equal('.');
      });

      it('should add ` and ` before the last word', function and() {
        // given
        var errors = ['userName', 'email'];

        // when
        var message = $scope.buildErrorMessage(errors);

        // then
        var andPosition = message.length - 1 - errors[1].length - ' and '.length;
        expect(message.substr(andPosition, ' and '.length)).to.equal(' and ');
      });

      it('should add `, ` between the first and second word', function and() {
        // given
        var errors = ['userName', 'email', 'password'];

        // when
        var message = $scope.buildErrorMessage(errors);

        // then
        var commaPosition = message.length - 1 - errors[2].length - ' and '.length -
          errors[1].length - ', '.length;
        expect(message.substr(commaPosition, ', '.length)).to.equal(', ');
      });
    });
  })
}());
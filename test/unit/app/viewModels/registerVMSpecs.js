(function registerVMSpecsScope(sinon) {
  'use strict';

  describe('registerVMSpecs', function registerVMSpecs() {
    var $scope, $httpBackend, testGlobals, userDAO, ipCookie, events;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_, _ipCookie_) {
      testGlobals = testSetup.setupControllerTest('registerVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      userDAO = _userDAO_;
      ipCookie = _ipCookie_;
    }));

    describe('register', function registerScope() {
      it('should register an new user', registerNewUser);

      function registerNewUser() {
        // given
        $scope.email = 'andyt@live.nl';
        $scope.userName = 'EnoF';
        $scope.password = 'SomeUberSpecialPassword1!';

        // predict
        var expectedResponse = testGlobals.createDefaultUserAuthResponse();
        $httpBackend.expect('POST', '/api/user', {
          userName: $scope.userName,
          password: $scope.password,
          email: $scope.email
        }).respond(200, expectedResponse);

        // when
        $scope.register();
        $httpBackend.flush();

        // then
        expect(ipCookie('authToken')).to.equal(expectedResponse.authToken);
        expect($scope.email).to.be.null;
        expect($scope.userName).to.be.null;
        expect($scope.password).to.be.null;
      }

      it('should reject registering multiple users under the same name', function uniqueName() {
        // given
        $scope.email = 'andyt@live.nl';
        $scope.userName = 'EnoF';
        $scope.password = 'SomeUberSpecialPassword1!';

        // predict
        var expectedResponse = {
          userName: true
        };
        $httpBackend.expect('POST', '/api/user', {
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
        $httpBackend.expect('POST', '/api/user', {
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

      it('should notify the parent the user has loggedin successfully', function loggedinSuccess() {
        // given
        sinon.spy($scope, '$emit');

        // when
        registerNewUser();

        // then
        expect($scope.$emit).to.have.been.calledWith(events.LOGGED_IN);
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
}(window.sinon));

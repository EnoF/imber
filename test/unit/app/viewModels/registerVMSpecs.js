(function registerVMSpecsScope() {
  'use strict';

  describe('registerVMSpecs', function registerVMSpecs() {
    var $scope, $httpBackend, testGlobals, userDAO;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_) {
      testGlobals = testSetup.setupControllerTest('loginVM');
      $scope = testGlobals.$scope;
      $httpBackend = testGlobals.$httpBackend;
      userDAO = _userDAO_;
    }));

    describe('register', function registerScope() {
      it('should register an new user', function registerNewUser() {

      });

      it('should reject registering multiple users under the same name', function uniqueName() {

      });

      it('should reject registering multiple users under the same email', function sameEmail() {

      });
    });
  })
}());
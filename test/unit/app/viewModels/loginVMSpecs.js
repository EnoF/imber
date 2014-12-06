(function loginVMSpecsScope(sinon) {
  'use strict';

  describe('loginVMSpecs', function loginVMSpecs() {

    var scope, $httpBackend, events, testGlobals, $mdSidenav;
    beforeEach(module('imber-test'));

    beforeEach(inject(function (testSetup, _$mdSidenav_) {
      testGlobals = testSetup.setupControllerTest('loginVM');
      scope = testGlobals.scope;
      $httpBackend = testGlobals.$httpBackend;
      events = testGlobals.events;
      $mdSidenav = _$mdSidenav_;
    }));

    describe('login', function loginScope() {
      it('should login an existing user', function login() {
        // given

        // when

        // then
      });

      it('should login a user with cookies', function loginWithCookies() {
        // given

        // when

        // then
      });
    });
  });
}(window.sinon));
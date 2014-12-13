(function logoutWidgetSpecsScope(angular, sinon) {
  'use strict';

  describe('<logout> specs', function logoutWidgetSpecs() {
    var $httpBackend, testGlobals, parentScope, userDAO;
    beforeEach(module('imber-test'));

    beforeEach(inject(function injector(testSetup, _userDAO_) {
      testGlobals = testSetup.setupDirectiveTest();
      $httpBackend = testGlobals.$httpBackend;
      parentScope = testGlobals.parentScope;
      userDAO = _userDAO_;
    }));

    it('should load the user model', function() {
      // given
      var mockUser = {};
      sinon.stub(userDAO, 'getCurrentUser').returns(mockUser);
      var directive = angular.element('<logout></logout>')

      // when
      var scope = testGlobals.initializeDirective(parentScope,
        directive);

      // then
      expect(scope.user).to.equal(mockUser);
    });
  });
}(window.angular, window.sinon));

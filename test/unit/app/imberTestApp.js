(function imberTestAppScope(angular) {
  'use strict';

  var app = angular.module('imber-test', ['imber']);

  app.factory('testSetup', function testSetupScope($rootScope, $httpBackend, $compile, $controller, events) {

    function initializeDirective(scope, directive) {
      $compile(directive)(scope);
      $rootScope.$digest();
      // Expose the scope to run tests on
      return directive.children().scope();
    }

    function createDefaultTestGlobals() {
      return {
        $httpBackend: $httpBackend,
        createDefaultUserAuthResponse: createDefaultUserAuthResponse,
        events: events
      };
    }

    function createDefaultUserAuthResponse() {
      return {
        authToken: 'returnedAuthToken',
        user: {
          _id: 'a1b2c3d4e5f6g7',
          userName: 'EnoF'
        }
      };
    }

    function setupDirectiveTest() {
      var testGlobals = createDefaultTestGlobals();

      testGlobals.parentScope = $rootScope.$new();
      testGlobals.initializeDirective = initializeDirective;

      return testGlobals;
    }

    function setupControllerTest(controllerName) {
      var testGlobals = createDefaultTestGlobals();

      testGlobals.$scope = $rootScope.$new();

      $controller(controllerName, {
        $scope: testGlobals.$scope
      });
      return testGlobals;
    }

    return {
      setupDirectiveTest: setupDirectiveTest,
      setupControllerTest: setupControllerTest
    };
  });
}(window.angular));

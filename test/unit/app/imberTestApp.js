(function imberTestAppScope(angular) {
  'use strict';

  var app = angular.module('imber-test', ['imber']);

  app.factory('testSetup', function testSetupScope($rootScope, $httpBackend, $compile, $controller, events, userDAO) {

    function initializeDirective(scope, directive) {
      $compile(directive)(scope);
      $rootScope.$digest();
      // Expose the scope to run tests on
      return directive.children().scope();
    }

    function loginDefaultUser() {
      // setup a test user
      var response = {
        authToken: 'someubercooltoken',
        user: {
          _id: 'a1b2c3d4e5f6g7h8',
          userName: 'EnoF'
        }
      };
      // setup a call intercepter
      $httpBackend.when('POST', '/api/login')
        .respond(200, response);
      // trigger the login call
      userDAO.login();
      $httpBackend.flush();
    }

    function createDefaultTestGlobals() {
      return {
        $httpBackend: $httpBackend,
        createDefaultUserAuthResponse: createDefaultUserAuthResponse,
        createDefaultGameResponse: createDefaultGameResponse,
        events: events,
        loginDefaultUser: loginDefaultUser,
        getLoggedInUser: function getCurrentUserProxy() {
          return userDAO.getCurrentUser();
        }
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

    function createDefaultGameResponse() {
      return {
        challenger: {
          _id: 'userid1',
          userName: 'EnoF'
        },
        opponent: {
          _id: 'userid2',
          userName: 'Rina'
        },
        started: false
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

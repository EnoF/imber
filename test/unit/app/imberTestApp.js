(function imberTestAppScope(angular) {
  'use strict';

  var app = angular.module('imber-test', ['imber']);

  app.factory('testSetup', function testSetupScope($rootScope, $httpBackend, $compile, $controller, events, userDAO,
    User) {

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
        createDefaultUser: createDefaultUser,
        createDefaultUserAuthResponse: createDefaultUserAuthResponse,
        createDefaultGameResponse: createDefaultGameResponse,
        createDefaultGamesResponse: createDefaultGamesResponse,
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
        _id: 'gameId1',
        board: {
          _id: 0,
          x: 10,
          y: 10
        },
        challenger: {
          _id: 'userid1',
          userName: 'EnoF',
          team: [{
            _id: 'charid11',
            player: 'userid1',
            type: {
              _id: 0,
              name: 'Soldier'
            }
          }]
        },
        opponent: {
          _id: 'userid2',
          userName: 'Rina',
          team: [{
            _id: 'charid21',
            player: 'userid2',
            type: {
              _id: 0,
              name: 'Soldier'
            }
          }]
        },
        started: false
      };
    }

    function createDefaultGamesResponse() {
      return [{
        _id: 'game1',
        board: {
          _id: 0,
          x: 10,
          y: 10
        },
        challenger: {
          _id: 'id1',
          userName: 'EnoF'
        },
        opponent: {
          _id: 'id2',
          userName: 'Rina'
        }
      }, {
        _id: 'game2',
        board: {
          _id: 0,
          x: 10,
          y: 10
        },
        challenger: {
          _id: 'id1',
          userName: 'EnoF'
        },
        opponent: {
          _id: 'id2',
          userName: 'Rina'
        }
      }];
    }

    function createDefaultUser() {
      return new User({
        _id: 'id1',
        userName: 'EnoF'
      });
    }

    function setupDirectiveTest() {
      var testGlobals = createDefaultTestGlobals();

      testGlobals.parentScope = $rootScope.$new();
      testGlobals.initializeDirective = initializeDirective;

      return testGlobals;
    }

    function setupControllerTest(controllerName) {
      var testGlobals = createDefaultTestGlobals();
      loginDefaultUser();

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

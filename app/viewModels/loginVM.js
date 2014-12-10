(function loginVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('loginVM',
    function loginVMScope($scope, userDAO, $cookies, events, $q, $mdToast) {
      $scope.userName = null;
      $scope.password = null;

      $scope.login = function login() {
        var promise;
        if ($scope.userName && $scope.password) {
          promise = userDAO.login($scope.userName, $scope.password);
        } else if ($cookies.authToken) {
          promise = userDAO.reauthenticate($cookies.authToken);
        } else {
          promise = $q.defer().promise;
        }
        promise.then($scope.notifyLoggedIn,
          $scope.notifyFailedLogin);
      };

      $scope.notifyLoggedIn = function notifyLoggedIn() {
        $scope.$emit(events.LOGGED_IN);
        $mdToast.show($mdToast.simple().
          content('Welcome ' + $scope.userName + '!'));
      };

      $scope.notifyFailedLogin = function notifyFailedLogin() {
        $mdToast.show($mdToast.simple().
          content('Login incorrect! Please try again.'));
      };

      $scope.loggedIn = userDAO.loggedIn;
    });
}(window.angular));
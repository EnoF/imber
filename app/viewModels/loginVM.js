(function loginVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('loginVM', function loginVMScope($scope, userDAO, $cookies, events, $q) {
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
      promise.then($scope.notifyLoggedIn);
    };

    $scope.notifyLoggedIn = function notifyLoggedIn() {
      $scope.$emit(events.LOGGEDIN);
    };

    $scope.loggedIn = userDAO.loggedIn;
  });
}(window.angular));
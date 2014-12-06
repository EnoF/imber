(function loginVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('loginVM', function loginVMScope($scope, userDAO, $cookies) {
    $scope.userName = null;
    $scope.password = null;

    $scope.login = function login() {
      if ($scope.userName && $scope.password) {
        userDAO.login($scope.userName, $scope.password);
      } else if ($cookies.authToken) {
        userDAO.reauthenticate($cookies.authToken);
      }
    };

    $scope.loggedIn = userDAO.loggedIn;
  });
}(window.angular));
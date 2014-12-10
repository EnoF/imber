(function logoutVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('logoutVM', function logoutVMScope($scope, userDAO, events) {
    $scope.user = null;

    $scope.logout = function logout() {
      userDAO.logout().then($scope.loggedOut);
    };

    $scope.loggedOut = function loggedOut() {
      $scope.user = null;
      $scope.$emit(events.LOGGED_OUT);
    };
  });
}(window.angular));
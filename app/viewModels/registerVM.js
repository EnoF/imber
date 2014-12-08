(function registerVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('registerVM', function registerVMScope($scope, userDAO, $mdToast) {
    $scope.userName = null;
    $scope.password = null;
    $scope.email = null;

    $scope.register = function register() {
      userDAO.registerUser($scope.userName, $scope.password, $scope.email).
        then($scope.registrationSuccessfull);
    };

    $scope.registrationSuccessfull = function registrationSuccessfull() {
      $mdToast.show($mdToast.simple().
        content('Welcome ' + $scope.userName + '!'));
      $scope.reset();
    };

    $scope.reset = function reset() {
      $scope.email = null;
      $scope.userName = null;
      $scope.password = null;
    };
  });
}(window.angular));
(function registerVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('registerVM', function registerVMScope($scope) {
    $scope.userName = null;
    $scope.password = null;
    $scope.email = null;

    $scope.register = function register() {

    };
  });
}(window.angular));
(function logoutVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('logoutVM', function logoutVMScope($scope) {
    $scope.user = null;
  });
}(window.angular));
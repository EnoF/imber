(function challengeVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('challengeVM', function challengeVM($scope) {
    $scope.id = null;
  });
}(window.angular));

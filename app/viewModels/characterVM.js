(function characterVMVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('characterVM', function characterVM($scope, events) {
    $scope.character = $scope.character || null;

    $scope.openActionPanel = function openActionPanel() {
      $scope.$emit(events.REQUEST_OPEN_ACTIONS, $scope.character);
    };
  });
}(window.angular));

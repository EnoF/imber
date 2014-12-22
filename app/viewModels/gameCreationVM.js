(function gameCreationVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('gameCreationVM', function gameCreationVM($scope) {
    $scope.opponent = null;

    $scope.assignOpponent = function assignOpponent(event, opponent) {
      event.stopPropagation();
      $scope.opponent = opponent;
    };
  });
}(window.angular));

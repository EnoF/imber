(function gameCreationVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('gameCreationVM', function gameCreationVM($scope) {
    $scope.playerToChallenge = null;
  });
}(window.angular));

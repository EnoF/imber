(function gameCreationVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('gameCreationVM', function gameCreationVM($scope, gameDAO, events) {
    $scope.opponent = null;
    $scope.challenged = false;

    $scope.assignOpponent = function assignOpponent(event, opponent) {
      event.stopPropagation();
      $scope.opponent = opponent;
    };

    $scope.challenge = function challenge() {
      gameDAO.challenge($scope.opponent)
        .then(function notifyChallenged() {
          $scope.challenged = true;
          $scope.$emit(events.CHALLENGED);
        });
    };
  });
}(window.angular));

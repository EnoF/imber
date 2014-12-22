(function gameCreationVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('gameCreationVM', function gameCreationVM($scope, userDAO, events) {
    $scope.opponent = null;
    $scope.challenged = false;

    $scope.assignOpponent = function assignOpponent(event, opponent) {
      event.stopPropagation();
      $scope.opponent = opponent;
    };

    $scope.challenge = function challenge() {
      userDAO.challenge($scope.opponent)
        .then(function notifyChallenged() {
          $scope.challenged = true;
          $scope.$emit(events.CHALLENGED);
        });
    };
  });
}(window.angular));

(function gameCreationVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  // The `gameCreationVM` is for the creation of new `games`.
  app.controller('gameCreationVM', function gameCreationVM($scope, gameDAO, events) {
    // To create a new game, we will need an opponent.
    $scope.opponent = null;
    // For some quick feedback we will use this property to show when the game has been
    // created.
    $scope.challenged = false;

    $scope.assignOpponent = function assignOpponent(event, opponent) {
      event.stopPropagation();
      // We are expecting an other `VM` to emit the opponent. This allows us
      // to have the selection of the opponent completely controllable via
      // an other widget.
      $scope.opponent = opponent;
    };

    $scope.challenge = function challenge() {
      gameDAO.challenge($scope.opponent)
        .then(function notifyChallenged() {
          // When the challenge has been created, we will provide the view
          // quick feedback. Also the parent will be notified, incase more
          // feedback is desired.
          $scope.challenged = true;
          $scope.$emit(events.CHALLENGED);
        });
    };
  });
}(window.angular));

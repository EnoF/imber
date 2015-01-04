(function gameVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  // The `gameVM` is a `VM` for existing `Games`.
  app.controller('gameVM', function gameVM($scope, events, userDAO, gameDAO) {
    // The `Game` can be loaded via `id`.
    $scope.id = $scope.id || null;
    // Or the `Game` can also be provided.
    $scope.game = $scope.game || null;
    // The `loggedInId` can be used in the `view` to show actions specific for
    // a challenger or the challenged player.
    $scope.loggedInId = userDAO.getCurrentUser().getId();
    // A simple representation of the board.
    $scope.board = null;

    $scope.accept = function accept() {
      gameDAO.accept($scope.game)
        .then(function gameAccepted() {
          // Notify the parents the game has been accepted.
          $scope.$emit(events.ACCEPTED);
        });
    };

    $scope.load = function load() {
      var promise = gameDAO.getGame($scope.id);
      promise.then(function setGame(game) {
        // Load the game onto the scope, so that we can use it in the view.
        $scope.game = game;
      });
      return promise;
    };
  });
}(window.angular));

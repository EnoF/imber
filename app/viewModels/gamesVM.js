(function gamesVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  // The `gamesVM` is the collection holding existing `games`.
  app.controller('gamesVM', function gamesVM($scope, gameDAO) {
    $scope.games = [];
    // The games can be loaded based on any relation to a `user`,
    $scope.user = $scope.user || null;
    // a given `challenger`
    $scope.challenger = $scope.challenger || null;
    // or a given `opponent`.
    $scope.opponent = $scope.opponent || null;

    $scope.load = function load() {
      var promise;
      // Determine based on what the games should be retrieved.
      if (!!$scope.user) {
        promise = gameDAO.getGamesOfUser($scope.user);
      } else if (!!$scope.challenger) {
        promise = gameDAO.getGamesWithChallenger($scope.challenger);
      } else if (!!$scope.opponent) {
        promise = gameDAO.getGamesWithOpponent($scope.opponent);
      } else {
        // When nothing is provided, we will retrieve the last games
        // of any user.
        promise = gameDAO.getGames();
      }
      promise.then(function setGames(games) {
        // When retrieved, expose the games on the scope.
        $scope.games = games;
      });
    };
  });
}(window.angular));

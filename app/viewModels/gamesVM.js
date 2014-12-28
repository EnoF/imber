(function gamesVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('gamesVM', function gamesVM($scope, gameDAO) {
    $scope.games = [];
    $scope.user = $scope.user || null;
    $scope.challenger = $scope.challenger || null;
    $scope.opponent = $scope.opponent || null;

    $scope.load = function load() {
      var promise;
      if (!!$scope.user) {
        promise = gameDAO.getGamesOfUser($scope.user);
      } else if (!!$scope.challenger) {
        promise = gameDAO.getGamesWithChallenger($scope.challenger);
      } else if (!!$scope.opponent) {
        promise = gameDAO.getGamesWithOpponent($scope.opponent);
      } else {
        promise = gameDAO.getGames();
      }
      promise.then(function setGames(games) {
        $scope.games = games;
      });
    };
  });
}(window.angular));

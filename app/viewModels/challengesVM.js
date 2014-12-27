(function challengesVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('challengesVM', function challengesVM($scope, gameDAO) {
    $scope.challenges = [];
    $scope.user = null;
    $scope.challenger = null;
    $scope.opponent = null;

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
      promise.then(function setChallenges(challenges) {
        $scope.challenges = challenges;
      });
    };
  });
}(window.angular));

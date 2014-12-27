(function challengesVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('challengesVM', function challengesVM($scope, gameDAO) {
    $scope.challenges = [];

    $scope.load = function load() {
      gameDAO.getGames()
        .then(function setChallenges(challenges) {
          $scope.challenges = challenges;
        });
    };
  });
}(window.angular));

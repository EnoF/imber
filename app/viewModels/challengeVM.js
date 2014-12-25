(function challengeVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('challengeVM', function challengeVM($scope, events, gameDAO) {
    $scope.id = $scope.id || null;
    $scope.game = null;

    $scope.accept = function accept() {
      gameDAO.accept($scope.id)
        .then(function startGame() {
          $scope.game.setStarted(true);
          $scope.$emit(events.ACCEPTED);
        });
    };

    $scope.load = function load() {
      gameDAO.getGame($scope.id)
        .then(function setGame(game) {
          $scope.game = game;
        });
    };
  });
}(window.angular));

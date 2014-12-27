(function challengeVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('challengeVM', function challengeVM($scope, events, userDAO, gameDAO) {
    $scope.id = $scope.id || null;
    $scope.game = $scope.game || null;
    $scope.loggedInId = userDAO.getCurrentUser().getId();

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

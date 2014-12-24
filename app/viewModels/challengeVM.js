(function challengeVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('challengeVM', function challengeVM($scope, userDAO) {
    $scope.id = $scope.id || null;
    $scope.game = null;

    $scope.load = function load() {
      userDAO.getGame($scope.id)
        .then(function setGame(game) {
          $scope.game = game;
        });
    };
  });
}(window.angular));

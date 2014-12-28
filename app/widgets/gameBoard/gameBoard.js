(function gameBoardScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('gameBoard', function gameBoardDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'gameBoardVM',
      templateUrl: 'gameBoard'
    };
  });
}(window.angular));

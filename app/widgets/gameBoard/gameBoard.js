(function gameBoardScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('gameBoard', function gameBoardDirective() {
    return {
      restrict: 'E',
      scope: {
        id: '=?id',
        game: '=?game'
      },
      controller: 'gameVM',
      templateUrl: 'gameBoard',
      link: function gameBoardConstructor(scope) {
        if (!!scope.id) {
          scope.load();
        } else {
          scope.id = scope.game.getId();
        }
      }
    };
  });
}(window.angular));

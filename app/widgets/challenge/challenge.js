(function challengeWidgetScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('challenge', function challengeDirective() {
    return {
      restrict: 'E',
      scope: {
        id: '=?id',
        game: '=?game'
      },
      controller: 'challengeVM',
      templateUrl: 'challenge',
      link: function challengeConstructor(scope) {
        if (!!scope.game) {
          scope.id = scope.game.getId();
        } else if (!!scope.id) {
          scope.load();
        }
      }
    };
  });
}(window.angular));

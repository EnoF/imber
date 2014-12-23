(function gameCreationScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('gameCreation', function gameCreationDirective(events) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'gameCreationVM',
      templateUrl: 'gameCreation',
      link: function gameCreationConstructor(scope) {
        scope.$on(events.USER_SELECTED, scope.assignOpponent);
      }
    };
  });
}(window.angular));

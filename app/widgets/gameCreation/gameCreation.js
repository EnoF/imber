(function gameCreationScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('gameCreation', function gameCreationDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'gameCreationVM',
      templateUrl: 'gameCreation'
    };
  });
}(window.angular));

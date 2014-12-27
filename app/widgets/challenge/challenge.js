(function challengeWidgetScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('challenge', function challengeDirective() {
    return {
      restrict: 'E',
      scope: {
        id: '=?id'
      },
      controller: 'challengeVM',
      templateUrl: 'challenge'
    };
  });
}(window.angular));

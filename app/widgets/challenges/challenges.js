(function challengesScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('challenges', function challengesDirective() {
    return {
      restrict: 'E',
      scope: {
        user: '=?user',
        challenger: '=?challenger',
        opponent: '=?opponent'
      },
      controller: 'challengesVM',
      templateUrl: 'challenges',
      link: function challengesConstructor(scope) {
        // load the challenges.
        scope.load();
      }
    };
  });
}(window.angular));

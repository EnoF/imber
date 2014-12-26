(function challengesScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('challenges', function challengesDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'challengesVM',
      templateUrl: 'challenges'
    };
  });
}(window.angular));

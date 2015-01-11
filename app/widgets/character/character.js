(function characterDirectiveScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('character', function characterDirective() {
    return {
      restrict: 'E',
      scope: {
        character: '=?character'
      },
      controller: 'characterVM',
      templateUrl: 'character'
    };
  });
}(window.angular));

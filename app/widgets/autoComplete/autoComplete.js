(function autoCompleteScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('autoComplete', function autoCompleteDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'autoCompleteVM',
      templateUrl: 'autoComplete'
    };
  });
}(window.angular));

(function autoCompleteScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('autoComplete', function autoCompleteDirective() {
    return {
      restrict: 'E',
      scope: {
        delay: '=?delay',
        label: '@label',
        minSearch: '=?minSearch',
        value: '=?value',
        loadFunction: '=?load',
        options: '=?options',
        onSelect: '=?onSelect'
      },
      controller: 'autoCompleteVM',
      templateUrl: 'autoComplete',
      link: function onInitialize(scope, element) {
        if (scope.loadFunction === null) {
          scope.load = angular.noop;
        }
        element.on('keyup', function determineAction(event) {
          if (event) {

          }
          scope.load();
        });
      }
    };
  });
}(window.angular));

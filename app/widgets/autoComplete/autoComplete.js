(function autoCompleteScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('autoComplete', function autoCompleteDirective($timeout) {
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
        element.on('keydown', function determineAction(event) {
          if (event.which === 40) {
            scope.$evalAsync(scope.focusDown);
          } else if (event.which === 38) {
            scope.$evalAsync(scope.focusUp);
          } else if (event.which === 13) {
            scope.$evalAsync(scope.select(scope.suggestions[scope.focus]));
          } else {
            scope.load();
          }
        });

        element.find('input').on('blur', function closeAndApply() {
          // Since the blur is an non angular event, it clashes with any other
          // event send async with this event, i.e. the on click.
          $timeout(scope.closeSuggestions, 100);
        });
      }
    };
  });
}(window.angular));

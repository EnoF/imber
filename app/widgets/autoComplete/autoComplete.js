(function autoCompleteScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('autoComplete', function autoCompleteDirective() {
    return {
      restrict: 'E',
      scope: {
        delay: '=?delay',
        minSearch: '=?minSearch',
        value: '=?value',
        loadFunction: '=?load',
        options: '=?options',
        onSelect: '=?onSelect'
      },
      controller: 'autoCompleteVM',
      templateUrl: 'autoComplete'
    };
  });
}(window.angular));

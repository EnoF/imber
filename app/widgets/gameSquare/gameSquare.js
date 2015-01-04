(function gameSquare(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('gameSquare', function gameSquareDirective() {
    return {
      restrict: 'E',
      require: '^gameBoard',
      templateUrl: 'gameSquare',
      link: function gameSquareConstructor(scope) {
        scope.x = scope.$index;
        scope.y = scope.$parent.$index;
      }
    };
  });
}(window.angular));

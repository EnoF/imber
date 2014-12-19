(function playerSearch(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('playerSearch', function playerSearchDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'playerSearchVM',
      templateUrl: 'playerSearch'
    };
  });
}(window.angular));

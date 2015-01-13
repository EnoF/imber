(function menuPanelDirectiveScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('menuPanel', function menuPanelDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: 'navigationVM',
      templateUrl: 'menuPanel'
    };
  });
}(window.angular));

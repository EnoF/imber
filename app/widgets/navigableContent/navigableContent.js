(function navigableContentDirectiveScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('navigableContent', function navigableContentDirective(events) {
    return {
      restrict: 'E',
      scope: {},
      controller: 'navigationVM',
      templateUrl: 'navigableContent',
      transclude: true,
      link: function actionPanelConstructor(scope) {
        scope.$on(events.REQUEST_OPEN_ACTIONS, scope.openActionPanel);
      }
    };
  });
}(window.angular));

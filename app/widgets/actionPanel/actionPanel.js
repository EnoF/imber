(function actionPanelDirectiveScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('actionPanel', function actionPanelDirective(events) {
    return {
      restrict: 'E',
      controller: 'actionPanelVM',
      scope: {
        character: '=character'
      },
      templateUrl: 'actionPanel',
      link: function actionPanelConstructor(scope) {
        scope.$on(events.REQUEST_OPEN_ACTIONS, scope.openActionPanel);
      }
    };
  });
}(window.angular));

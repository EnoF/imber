(function actionPanelVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('actionPanelVM', function actionPanelVM($scope) {
    $scope.actions = ['attack', 'move'];
  });
}(window.angular));

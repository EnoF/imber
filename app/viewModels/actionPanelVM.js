(function actionPanelVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('actionPanelVM', function actionPanelVM($scope, events) {
    $scope.actions = {
      attack: function attack() {

      },
      move: function move() {
        $scope.$emit(events.REQUEST_MOVE, $scope.character);
      }
    };
    $scope.character = $scope.character || null;
  });
}(window.angular));

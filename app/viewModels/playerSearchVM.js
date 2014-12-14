(function playerSearchVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('playerSearchVM', function playerSearchVM($scope) {
    $scope.value = '';
  });
}(window.angular));

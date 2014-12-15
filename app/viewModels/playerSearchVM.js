(function playerSearchVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('playerSearchVM', function playerSearchVM($scope, userDAO) {
    $scope.value = '';
    $scope.searchPlayer = function searchPlayer(name) {
      return userDAO.search(name);
    };
  });
}(window.angular));

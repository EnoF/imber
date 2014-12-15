(function playerSearchVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('playerSearchVM', function playerSearchVM($scope, events, userDAO) {
    $scope.value = '';

    $scope.onSelect = function onSelect(userName) {
      userDAO.getByName(userName).then(function notifyUserFound(user) {
        $scope.$emit(events.USER_SELECTED, user);
      }, function notifyUserNotFound() {
        $scope.$emit(events.USER_NOT_FOUND);
      });
    };

    $scope.searchPlayer = function searchPlayer(name) {
      return userDAO.search(name);
    };
  });
}(window.angular));

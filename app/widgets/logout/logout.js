(function logoutScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('logout', function logoutDirective(userDAO) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'logout',
      controller: 'userAuthVM',
      link: function getUser(scope) {
        scope.user = userDAO.getCurrentUser();
      }
    };
  });
}(window.angular));

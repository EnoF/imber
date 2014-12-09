(function logoutScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('logout', function logoutDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'logout',
      controller: 'logoutVM'
    };
  });
}(window.angular));
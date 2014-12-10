(function loginScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('login', function loginDirective() {
    return {
      controller: 'loginVM',
      restrict: 'E',
      scope: {},
      templateUrl: 'login'
    };
  });
}(window.angular));
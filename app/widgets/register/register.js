(function registerScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('register', function registerDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'register',
      controller: 'registerVM'
    };
  });
}(window.angular));
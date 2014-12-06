(function navigationVM(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('navigationVM', function navigationVMScope($scope, $mdSidenav, sitemap) {
    $scope.menu = sitemap;

    $scope.showNavigation = function showNavigation() {
      $mdSidenav('navigation').open();
    };

    $scope.hideNavigation = function hideNavigation() {
      $mdSidenav('navigation').close();
    };
  });
}(window.angular));
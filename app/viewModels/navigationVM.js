(function navigationVM(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('navigationVM', function navigationVMScope($scope, $mdSidenav, sitemap) {
    $scope.menu = sitemap;

    $scope.navigation = $mdSidenav('navigation');

    $scope.showNavigation = function showNavigation() {
      $scope.navigation.open();
    };

    $scope.hideNavigation = function hideNavigation() {
      $scope.navigation.close();
    };
  });
}(window.angular));
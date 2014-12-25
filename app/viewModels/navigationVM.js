(function navigationVM(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('navigationVM', function navigationVMScope($scope, $mdSidenav, sitemap, userDAO) {
    $scope.menu = sitemap;

    $scope.getNavigation = function getNavigation() {
      $scope.navigation = $scope.navigation || $mdSidenav('navigation');
      return $scope.navigation;
    };

    $scope.showNavigation = function showNavigation() {
      $scope.getNavigation().open();
    };

    $scope.hideNavigation = function hideNavigation() {
      $scope.getNavigation().close();
    };

    $scope.isLoggedIn = function isLoggedInProxy() {
      return userDAO.loggedIn();
    };
  });
}(window.angular));

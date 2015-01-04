(function navigationVM(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('navigationVM', function navigationVMScope($scope, $mdSidenav, $routeParams, sitemap, userDAO) {
    $scope.menu = sitemap;
    $scope.$routeParams = $routeParams;

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

    $scope.getLoggedInUser = function getLoggedInUserProxy() {
      return userDAO.getCurrentUser();
    };

    $scope.isLoggedIn = function isLoggedInProxy() {
      return userDAO.loggedIn();
    };
  });
}(window.angular));

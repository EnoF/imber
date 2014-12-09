(function appScope(angular) {
  'use strict';

  var app = angular.module('imber', ['ngMaterial', 'ngRoute', 'ngCookies']);

  var sitemap = [
    {
      url: '/login',
      templateUrl: 'pages/login.html',
      label: 'login'
    },
    {
      url: '/dashboard',
      templateUrl: 'pages/dashboard.html',
      label: 'dashboard'
    },
    {
      url: '/games',
      templateUrl: 'pages/games.html',
      label: 'games'
    }
  ];

  app.factory('sitemap', function siteMap() {
    return sitemap;
  });

  app.config(function appRouting($routeProvider) {
    for (var i = 0; i < sitemap.length; i++) {
      var page = sitemap[i];
      $routeProvider.when(page.url, {
        templateUrl: page.templateUrl
      });
    }

    $routeProvider.otherwise({
      redirectTo: '/login'
    });
  }).run(function forceLogin($rootScope, $location, $cookies) {
    // register listener to watch route changes
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (!$cookies.authToken) {
        // no logged user, we should be going to #login
        if (next.templateUrl === 'pages/login.html') {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path('/login');
        }
      } else {
        // redirect to the dashboard
        $location.path('/dashboard');
      }
    });
  });
}(window.angular));
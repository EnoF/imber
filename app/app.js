(function appScope(angular) {
  'use strict';

  var app = angular.module('imber', ['ngMaterial', 'ngRoute', 'ipCookie']);

  var sitemap = [{
    url: '/dashboard',
    templateUrl: 'pages/dashboard.html',
    label: 'dashboard'
  }, {
    url: '/games',
    templateUrl: 'pages/games.html',
    label: 'games'
  }];

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
    // The login is added seperately since it will not be a clickable link
    // in the menu.
    $routeProvider.when('/login', {
      templateUrl: 'pages/login.html'
    });

    $routeProvider.otherwise({
      redirectTo: '/login'
    });
  }).run(function forceLogin($rootScope, $location, ipCookie, events) {
    // register listener to watch route changes
    function redirects(event, next) {
      var loginPage = 'pages/login.html';
      if (!ipCookie('authToken')) {
        // no logged user, we should be going to #login
        if (next && next.templateUrl === loginPage) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path('/login');
        }
      } else if (!next || next.templateUrl === loginPage) {
        // prevent navigating to the login page when logged in,
        // redirect to the dashboard instead
        $location.path('/dashboard');
      }
    }

    $rootScope.$on('$routeChangeStart', redirects);
    $rootScope.$on(events.LOGGED_IN, redirects);
    $rootScope.$on(events.LOGGED_OUT, redirects);
  });
}(window.angular));

(function authInterceptorScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.factory('authInterceptor', function authInterceptor($q, $window, ipCookie) {
    return {
      request: function(config) {
        config.headers = config.headers;
        if (!!ipCookie('authToken')) {
          config.headers.authorization = ipCookie('authToken');
        }
        return config;
      }
    };
  });

  app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
}(window.angular));

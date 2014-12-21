(function authInterceptorScope(angular){
    'use strict';

    var app = angular.module('imber');

    app.factory('authInterceptor', function ($q, $window, $cookies) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if (!!$cookies.authToken) {
            config.headers.authorization = $cookies.authToken;
          }
          return config;
        }
      };
    });

    app.config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });
}(window.angular));

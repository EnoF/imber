(function userDAO(angular) {
  'use strict';

  var app = angular.module('imber');

  app.factory('userDAO', function userDAOFactory($http, $q, $cookies) {

    var currentUser = null;

    function getCurrentUser() {
      return currentUser;
    }

    function handleAuthentication(authDeferred) {
      var deferred = $q.defer();
      authDeferred.then(function returnUser(response) {
        $cookies.authToken = response.data.authToken;
        currentUser = response.data.user;
        deferred.resolve(currentUser);
      }).catch(function error() {
        currentUser = null;
        deferred.reject();
      });
      return deferred.promise;
    }

    function login(userName, password) {
      return handleAuthentication($http.post('/login', {
        userName: userName,
        password: password
      }));
    }

    function reauthenticate(token) {
      return handleAuthentication($http.post('/reauthenticate', {
        authToken: token
      }));
    }

    function loggedIn() {
      return !!currentUser;
    }

    return {
      getCurrentUser: getCurrentUser,
      login: login,
      loggedIn: loggedIn,
      reauthenticate: reauthenticate
    };
  });
}(window.angular));
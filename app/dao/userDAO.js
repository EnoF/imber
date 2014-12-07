(function userDAO(angular) {
  'use strict';

  var app = angular.module('imber');

  app.factory('userDAO', function userDAOFactory($http, $q, $cookies, User) {

    var currentUser = null;

    // The cached logged in user.
    function getCurrentUser() {
      return currentUser;
    }

    // Login in with the provided `username` and `password`.
    function login(userName, password) {
      // Use the common handler for the authentication process.
      return handleAuthentication($http.post('/login', {
        userName: userName,
        password: password
      }));
    }

    // Login with the provided `authToken`.
    function reauthenticate(token) {
      // Use the common handler for the authentication process.
      return handleAuthentication($http.post('/reauthenticate', {
        authToken: token
      }));
    }

    // The handler for both login and reauthentication.
    function handleAuthentication(authDeferred) {
      // The deferred to be returned to the caller.
      var deferred = $q.defer();
      authDeferred.then(function returnUser(response) {
        // Set the newly created auth token on the cookie.
        $cookies.authToken = response.data.authToken;
        // The returned user data will be held in cache.
        currentUser = new User(response.data.user);
        // Return the `user` model.
        deferred.resolve(currentUser);
      }).catch(function error() {
        // Clean the user out of cache.
        currentUser = null;
        deferred.reject();
      });
      return deferred.promise;
    }

    function loggedIn() {
      return !!currentUser;
    }

    // Return the `DAO` as a singleton.
    return {
      getCurrentUser: getCurrentUser,
      login: login,
      loggedIn: loggedIn,
      reauthenticate: reauthenticate
    };
  });
}(window.angular));
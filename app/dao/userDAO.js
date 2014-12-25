(function userDAO(angular, JSON) {
  'use strict';

  var app = angular.module('imber');

  app.factory('userDAO', function userDAOFactory($http, $q, ipCookie, User, Game, $log) {
    var currentUser = null;
    var expiry = {
      expires: 10
    };
    if (ipCookie('currentUser')) {
      currentUser = new User(ipCookie('currentUser'));
    }

    // The cached logged in user.
    function getCurrentUser() {
      return currentUser;
    }

    // Get the user by name
    function getByName(name) {
      var deferred = $q.defer();
      $http.get('/api/user', {
        params: {
          find: name
        }
      }).then(function createUserModel(response) {
        deferred.resolve(new User(response.data));
      }, function throwError() {
        $log.error('user has not been found');
        deferred.reject();
      });
      return deferred.promise;
    }

    // Login in with the provided `username` and `password`.
    function login(userName, password) {
      // Use the common handler for the authentication process.
      return handleAuthentication($http.post('/api/login', {
        userName: userName,
        password: password
      }));
    }

    // Login with the provided `authToken`.
    function reauthenticate(token) {
      // Use the common handler for the authentication process.
      return handleAuthentication($http.post('/api/reauthenticate', {
        authToken: token
      }));
    }

    // The handler for both login and reauthentication.
    function handleAuthentication(authDeferred) {
      // The deferred to be returned to the caller.
      var deferred = $q.defer();
      authDeferred.then(function returnUser(response) {
        // Set the newly created auth token on the cookie.
        ipCookie('authToken', response.data.authToken, expiry);
        // The returned user data will be held in cache.
        currentUser = new User(response.data.user);
        ipCookie('currentUser', response.data.user, expiry);
        // Return the `user` model.
        deferred.resolve(currentUser);
      }).catch(function thrownError(error) {
        // Clean the user out of cache.
        currentUser = null;
        ipCookie.remove('currentUser');
        ipCookie.remove('authToken');
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function registerUser(userName, password, email) {
      // When successfully registered, log the user in.
      return handleAuthentication($http.post('/api/user', {
        userName: userName,
        password: password,
        email: email
      }));
    }

    function loggedIn() {
      return !!currentUser;
    }

    function logout() {
      ipCookie.remove('authToken');
      ipCookie.remove('currentUser');
      currentUser = null;
    }

    function search(name) {
      var deferred = $q.defer();

      $http.get('/api/user', {
        params: {
          search: name
        }
      }).then(function resolveWithData(response) {
        deferred.resolve(convertToNames(response.data));
      }, deferred.reject);

      return deferred.promise;
    }

    function convertToNames(users) {
      var names = [];
      for (var i = 0; i < users.length; i++) {
        names[i] = users[i].userName;
      }
      return names;
    }

    // Return the `DAO` as a singleton.
    return {
      getCurrentUser: getCurrentUser,
      getByName: getByName,
      login: login,
      loggedIn: loggedIn,
      logout: logout,
      reauthenticate: reauthenticate,
      registerUser: registerUser,
      search: search
    };
  });
}(window.angular, window.JSON));

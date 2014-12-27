(function userDAOModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('userDAO', function userDAOScope($http, $q, ipCookie, User, $log) {
    function userDAO() {
      this.private = {
        currentUser: {
          get: null
        },
        expiry: {
          expires: 10
        },

        convertToNames: function convertToNames(users) {
          var names = [];
          for (var i = 0; i < users.length; i++) {
            names[i] = users[i].userName;
          }
          return names;
        },

        // The handler for both login and reauthentication.
        handleAuthentication: function handleAuthentication(authDeferred) {
          // The deferred to be returned to the caller.
          var deferred = $q.defer();
          var thisPrivate = this.private;
          authDeferred.then(function returnUser(response) {
            // Set the newly created auth token on the cookie.
            ipCookie('authToken', response.data.authToken, thisPrivate.expiry);
            // The returned user data will be held in cache.
            thisPrivate.currentUser = new User(response.data.user);
            ipCookie('currentUser', response.data.user, thisPrivate.expiry);
            // Return the `user` model.
            deferred.resolve(thisPrivate.currentUser);
          }).catch(function thrownError(error) {
            // Clean the user out of cache.
            thisPrivate.currentUser = null;
            ipCookie.remove('currentUser');
            ipCookie.remove('authToken');
            deferred.reject(error);
          });
          return deferred.promise;
        }
      };

      this.public = {
        // Get the user by name
        getByName: function getByName(name) {
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
        },

        loggedIn: function loggedIn() {
          return !!this.private.currentUser;
        },

        // Login in with the provided `username` and `password`.
        login: function login(userName, password) {
          // Use the common handler for the authentication process.
          return this.private.handleAuthentication($http.post('/api/login', {
            userName: userName,
            password: password
          }));
        },

        logout: function logout() {
          ipCookie.remove('authToken');
          ipCookie.remove('currentUser');
          this.private.currentUser = null;
        },

        // Login with the provided `authToken`.
        reauthenticate: function reauthenticate(token) {
          // Use the common handler for the authentication process.
          return this.private.handleAuthentication($http.post('/api/reauthenticate', {
            authToken: token
          }));
        },
        registerUser: function registerUser(userName, password, email) {
          // When successfully registered, log the user in.
          return this.private.handleAuthentication($http.post('/api/user', {
            userName: userName,
            password: password,
            email: email
          }));
        },
        search: function search(name) {
          var deferred = $q.defer();
          var thisPrivate = this.private;
          $http.get('/api/user', {
            params: {
              search: name
            }
          }).then(function resolveWithData(response) {
            deferred.resolve(thisPrivate.convertToNames(response.data));
          }, deferred.reject);

          return deferred.promise;
        }
      };

      this.constructor = function constructor() {
        // Retrieve the current user from the cookies if available.
        if (ipCookie('currentUser')) {
          this.private.currentUser = new User(ipCookie('currentUser'));
        }
      };
    }

    var UserDAO = clazz(userDAO);
    return new UserDAO();
  });
}(window.angular, window.enofjs.clazz));

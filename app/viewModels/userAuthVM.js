(function userAuthVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  // The `userAuthVM` is to access all authorizations possibilities of an user.
  app.controller('userAuthVM',
    function userAuthVMScope($scope, userDAO, ipCookie, events, $q, $mdToast) {
      $scope.userName = null;
      $scope.password = null;
      // The user will be loaded only when the widget assigns it.
      $scope.user = null;

      $scope.login = function login() {
        var promise, deferred;
        // Only when the `userName` and `password` are provided.
        if (!!$scope.userName && !!$scope.password) {
          promise = userDAO.login($scope.userName, $scope.password);
        } else if (ipCookie('authToken')) {
          // It could be that the user already loggedin before.
          promise = userDAO.reauthenticate(ipCookie('authToken'));
        } else {
          // Since the user can't login with the provided information,
          // notify the user the login failed.
          deferred = $q.defer();
          deferred.reject();
          promise = deferred.promise;
        }
        promise.then($scope.notifyLoggedIn,
          $scope.notifyFailedLogin);
      };

      $scope.notifyLoggedIn = function notifyLoggedIn() {
        // Notify the parent the user has `logged in`.
        $scope.$emit(events.LOGGED_IN);
        // Notify the user with a toast message with a welcome message.
        $mdToast.show($mdToast.simple().content('Welcome ' + $scope.userName + '!'));
      };

      $scope.notifyFailedLogin = function notifyFailedLogin() {
        // Notify the user login was not successful.
        $mdToast.show($mdToast.simple().content('Login incorrect! Please try again.'));
      };

      $scope.loggedIn = function loggedInProxy() {
        return userDAO.loggedIn();
      };

      $scope.logout = function logout() {
        // `userDAO` will handle the logout process.
        userDAO.logout();
        // To make sure the current view can't display anything of the user,
        // we clear it out of memory.
        $scope.user = null;
        $scope.$emit(events.LOGGED_OUT);
      };
    });
}(window.angular));

(function registerVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('registerVM', function registerVMScope($scope, userDAO, $mdToast, events) {
    $scope.userName = null;
    $scope.password = null;
    $scope.email = null;

    $scope.register = function register() {
      userDAO.registerUser($scope.userName, $scope.password, $scope.email).
        then($scope.registrationSuccessfull,
        $scope.notifyError);
    };

    $scope.registrationSuccessfull = function registrationSuccessfull() {
      $mdToast.show($mdToast.simple().
        content('Welcome ' + $scope.userName + '!'));
      $scope.$emit(events.LOGGEDIN);
      $scope.reset();
    };

    $scope.notifyError = function notifyError(errorResponse) {
      var errors = errorResponse.data;
      var errorsFound = [];
      if (errors.userName) {
        errorsFound.push('username');
        $scope.userName = null;
      }
      if (errors.email) {
        $scope.email = null;
        errorsFound.push('email');
      }
      $scope.toastError(errorsFound);
    };

    $scope.toastError = function toastError(errors) {

      $mdToast.show($mdToast.simple().
        content($scope.buildErrorMessage(errors)));
    };

    $scope.buildErrorMessage = function buildErrorMessage(errors) {
      var errorMessage = 'Please use a different ';

      for (var i = 0; i < errors.length; i++) {
        errorMessage += errors[i];
        if (i === errors.length - 1) {
          errorMessage += '.';
        } else if (i === errors.length - 2) {
          errorMessage += ' and ';
        } else {
          errorMessage += ', ';
        }
      }

      return errorMessage;
    };

    $scope.reset = function reset() {
      $scope.email = null;
      $scope.userName = null;
      $scope.password = null;
    };
  });
}(window.angular));
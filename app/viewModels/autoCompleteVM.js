(function autoCompleteVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('autoCompleteVM', function autoCompleteVM($scope) {
    $scope.options = [];
  });
}(window.angular));

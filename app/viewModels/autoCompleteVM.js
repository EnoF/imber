(function autoCompleteVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('autoCompleteVM', function autoCompleteVM($scope, $filter) {
    var genericFilter = $filter('filter');
    $scope.value = null;
    $scope.options = [];
    $scope.suggestions = [];

    $scope.suggest = function suggest() {
      $scope.suggestions = genericFilter($scope.options, $scope.value);
    };
  });
}(window.angular));

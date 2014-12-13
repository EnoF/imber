(function autoCompleteVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('autoCompleteVM', function autoCompleteVM($scope, $filter) {
    var genericFilter = $filter('filter');
    $scope.value = $scope.value || null;
    $scope.options = $scope.options || [];
    $scope.loadFunction = $scope.loadFunction || angular.noop;
    $scope.suggestions = [];

    function populateOptions(options) {
      $scope.options = options;
    }

    $scope.load = function load() {
      $scope.loadFunction($scope.value).then(populateOptions);
    };

    $scope.suggest = function suggest() {
      $scope.suggestions = genericFilter($scope.options, $scope.value);
    };
  });
}(window.angular));

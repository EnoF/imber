(function autoCompleteVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('autoCompleteVM', function autoCompleteVM($scope, $filter, $timeout) {
    var genericFilter = $filter('filter');
    var lastExecution = null;
    $scope.value = $scope.value || '';
    $scope.options = $scope.options || [];
    $scope.delay = $scope.delay || 0;
    $scope.minSearch = $scope.minSearch || 0;
    $scope.loadFunction = $scope.loadFunction || null;
    $scope.onSelect = $scope.onSelect || angular.noop;
    $scope.suggestions = [];

    function populateOptions(options) {
      $scope.options = options;
    }

    $scope.load = function load() {
      $timeout.cancel(lastExecution);
      lastExecution = $timeout($scope.executeLoad, $scope.delay);
    };

    $scope.executeLoad = function executeLoad() {
      if ($scope.value.length > $scope.minSearch) {
        $scope.loadFunction($scope.value).then(populateOptions);
      }
    };

    $scope.select = function select(selection) {
      $scope.onSelect(selection);
    };

    $scope.suggest = function suggest() {
      $scope.suggestions = genericFilter($scope.options, $scope.value);
    };
  });
}(window.angular));

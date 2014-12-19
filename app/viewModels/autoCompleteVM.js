(function autoCompleteVMScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.controller('autoCompleteVM', function autoCompleteVM($scope, $filter, $timeout) {
    var genericFilter = $filter('filter');
    var lastExecution = null;
    $scope.value = $scope.value || '';
    $scope.options = $scope.options || [];
    $scope.delay = $scope.delay || 0;
    $scope.minSearch = parseInt($scope.minSearch, 10) || 0;
    $scope.loadFunction = $scope.loadFunction || null;
    $scope.onSelect = $scope.onSelect || angular.noop;
    $scope.suggestions = [];
    $scope.focus = 0;

    function optionsHasBeenLoaded(options) {
      $scope.options = options;
      $scope.suggest();
    }

    $scope.load = function load() {
      $timeout.cancel(lastExecution);
      lastExecution = $timeout($scope.executeLoad, $scope.delay);
    };

    $scope.executeLoad = function executeLoad() {
      if ($scope.value.length > $scope.minSearch) {
        $scope.loadFunction($scope.value).then(optionsHasBeenLoaded);
      }
    };

    $scope.select = function select(selection) {
      $scope.value = selection;
      $scope.closeSuggestions();
      $scope.onSelect(selection);
    };

    $scope.suggest = function suggest() {
      $scope.focus = 0;
      $scope.suggestions = genericFilter($scope.options, $scope.value);
    };

    $scope.focusUp = function focusUp() {
      if ($scope.focus > 0) {
        $scope.focus--;
      }
    };

    $scope.focusDown = function focusDown() {
      if ($scope.focus < $scope.options.length - 1) {
        $scope.focus++;
      }
    };

    $scope.closeSuggestions = function closeSuggestions() {
      $timeout.cancel(lastExecution);
      $scope.suggestions = [];
    };
  });
}(window.angular));

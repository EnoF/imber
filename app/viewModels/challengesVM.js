(function challengesVMScope(angular){
  'use strict';

  var app = angular.module('imber');

  app.controller('challengesVM', function challengesVM($scope){
    $scope.challenges = [];
  });
}(window.angular));

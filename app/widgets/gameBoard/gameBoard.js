(function gameBoardScope(angular) {
  'use strict';

  var app = angular.module('imber');

  app.directive('gameBoard', function gameBoardDirective($q) {
    return {
      restrict: 'E',
      scope: {
        id: '=?id',
        game: '=?game'
      },
      controller: 'gameVM',
      templateUrl: 'gameBoard',
      link: function gameBoardConstructor(scope) {
        var promise, deferred;
        if (!!scope.id) {
          promise = scope.load();
        } else {
          deferred = $q.defer();
          promise = deferred.promise;
          deferred.resolve();
          scope.id = scope.game.getId();
        }
        promise.then(function exposeLocations() {
          scope.board = scope.game.getBoard().getLocations();
        });
      }
    };
  });
}(window.angular));

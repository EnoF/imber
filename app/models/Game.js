(function GameModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Game', function GameScope() {
    function Game() {
      this.private = {
        challenger: {
          getSet: null
        },
        opponent: {
          getSet: null
        },
        started: {
          isSet: false
        }
      };

      this.constructor = function constructor(game) {
        this.private.challenger = game.challenger;
        this.private.opponent = game.opponent;
        this.private.started = game.started;
      };
    }

    return clazz(Game);
  });
}(window.angular, window.enofjs.clazz));

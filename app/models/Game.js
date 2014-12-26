(function GameModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Game', function GameScope(User) {
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
        this.private.challenger = new User(game.challenger);
        this.private.opponent = new User(game.opponent);
        this.private.started = game.started;
      };
    }

    return clazz(Game);
  });
}(window.angular, window.enofjs.clazz));

(function GameModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Game', function GameScope(Board, User) {
    function Game() {
      this.private = {
        id: {
          get: null
        },
        board: {
          get: null
        },
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
        this.private.id = game._id;
        this.private.board = new Board(game.board);
        this.private.challenger = new User(game.challenger);
        this.private.opponent = new User(game.opponent);
        this.private.started = game.started;
      };
    }

    return clazz(Game);
  });
}(window.angular, window.enofjs.clazz));

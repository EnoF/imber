(function BoardModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Board', function BoardScope(Location) {
    function Board() {
      this.private = {
        id: {
          get: null
        },
        locations: {
          get: null
        },
        createLocations: function createLocations(x, y) {
          var locations = [];
          for (var i = 0; i < x; i++) {
            locations[i] = [];
            for (var j = 0; j < y; j++) {
              locations[i][j] = new Location(i, j);
            }
          }
          this.private.locations = locations;
        }
      };

      this.constructor = function constructor(board) {
        this.private.id = board._id;
        this.private.createLocations(board.x, board.y);
      };
    }

    return clazz(Board);
  });
}(window.angular, window.enofjs.clazz));

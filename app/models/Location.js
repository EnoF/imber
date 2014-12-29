(function LocationModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Location', function LocationScope() {
    function Location() {
      this.private = {
        x: {
          get: null
        },
        y: {
          get: null
        }
      };

      this.constructor = function constructor(x, y) {
        this.private.x = x;
        this.private.y = y;
      };
    }

    return clazz(Location);
  });
}(window.angular, window.enofjs.clazz));

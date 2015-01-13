(function CharacterModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Character', function CharacterScope() {
    function Character() {
      this.private = {
        id: {
          get: null
        },
        name: {
          get: null
        },
        type: {
          get: null
        },
        x: {
          getSet: null
        },
        y: {
          getSet: null
        }
      };

      this.constructor = function constructor(character) {
        this.private.id = character._id;
        this.private.name = character.type.name;
        this.private.type = character.type._id;
        this.private.x = character.position.x;
        this.private.y = character.position.y;
      };
    }

    return clazz(Character);
  });
}(window.angular, window.enofjs.clazz));

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
        }
      };

      this.constructor = function constructor(character) {
        this.private.id = character._id;
        this.private.name = character.type.name;
        this.private.type = character.type._id;
      };
    }

    return clazz(Character);
  });
}(window.angular, window.enofjs.clazz));

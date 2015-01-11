(function TeamModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Team', function TeamScope(Character) {
    function Team() {
      this.private = {
        team: {
          get: []
        }
      };

      this.public = {
        get: function get(id) {
          return this.private.team[id];
        }
      };

      this.constructor = function constructor(team) {
        // Make sure we aren't modifying the prototype instance array.
        this.private.team = [];
        team = team || [];
        team.forEach(function addCharacter(character) {
          this.push(new Character(character));
        }, this.private.team);
      };
    }

    return clazz(Team);
  });
}(window.angular, window.enofjs.clazz));

(function CharacterModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('Character', function CharacterScope() {
    function Character() {

    }

    return clazz(Character);
  });
}(window.angular, window.enofjs.clazz));
